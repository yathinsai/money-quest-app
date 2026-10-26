import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadProgress, saveProgress, clearProgress, INITIAL_PROGRESS_STATE } from '../utils/progressStorage';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadProgress());

  // Save changes to localStorage whenever progress state updates
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  /**
   * Records a quiz attempt and updates completion status and scores.
   * @param {'budgeting' | 'inflation' | 'businessProfit'} moduleId 
   * @param {number} score - Correct answers count
   * @param {number} totalQuestions - Total questions in quiz
   */
  const recordQuizScore = (moduleId, score, totalQuestions) => {
    setProgress((prev) => {
      const currentMod = prev.modules[moduleId] || {
        completed: false,
        bestScore: null,
        lastScore: null,
        attempts: 0,
        lastAttemptAt: null,
      };

      const percent = Math.round((score / totalQuestions) * 100);
      const isCompleted = percent >= 70; // 70% or higher marks module completed
      const bestScore = currentMod.bestScore === null ? score : Math.max(currentMod.bestScore, score);

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            completed: currentMod.completed || isCompleted,
            bestScore,
            lastScore: score,
            attempts: (currentMod.attempts || 0) + 1,
            lastAttemptAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  /**
   * Resets all progress data back to the default empty state.
   */
  const resetAllProgress = () => {
    const fresh = clearProgress();
    setProgress(fresh);
  };

  /**
   * Calculates overall progress summary for the app.
   */
  const getOverallStats = () => {
    const modulesList = Object.values(progress.modules);
    const completedCount = modulesList.filter((m) => m.completed).length;
    const totalModules = modulesList.length;
    const totalAttempts = modulesList.reduce((acc, m) => acc + (m.attempts || 0), 0);

    return {
      completedCount,
      totalModules,
      percentage: Math.round((completedCount / totalModules) * 100),
      totalAttempts,
    };
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        recordQuizScore,
        resetAllProgress,
        getOverallStats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
