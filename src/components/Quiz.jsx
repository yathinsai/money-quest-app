import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

/**
 * Reusable Quiz Component fulfilling FR-6.
 * @param {{
 *   moduleId: 'budgeting' | 'inflation' | 'businessProfit',
 *   moduleTitle: string,
 *   questions: Array<{
 *     id: string,
 *     question: string,
 *     options: string[],
 *     correctIndex: number,
 *     explanation: string
 *   }>
 * }} props
 */
export default function Quiz({ moduleId, moduleTitle, questions }) {
  const { recordQuizScore, progress } = useProgress();
  const savedModuleData = progress.modules[moduleId];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [answersLog, setAnswersLog] = useState([]); // Array of { questionId, selectedIndex, isCorrect }
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Handle selecting an option before submission
  const handleSelectOption = (index) => {
    if (isAnswerRevealed) return; // Prevent changing after revealing
    setSelectedOption(index);
  };

  // Submit and reveal explanation
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerRevealed(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setAnswersLog((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: selectedOption,
        isCorrect,
      },
    ]);
  };

  // Advance to next question or complete quiz
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      // Calculate final score
      const finalAnswers = [
        ...answersLog,
      ];
      // Note: the last answer was already appended in handleCheckAnswer
      const correctCount = finalAnswers.filter((a) => a.isCorrect).length;

      // Save to localStorage via ProgressContext
      recordQuizScore(moduleId, correctCount, questions.length);
      setIsFinished(true);
    }
  };

  // Reset quiz state to start fresh
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setAnswersLog([]);
    setIsFinished(false);
  };

  // --- Completed Summary Screen ---
  if (isFinished) {
    const totalCorrect = answersLog.filter((a) => a.isCorrect).length;
    const scorePercent = Math.round((totalCorrect / questions.length) * 100);
    const passed = scorePercent >= 70;

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="text-center max-w-md mx-auto">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
              passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            <Award className="w-8 h-8" />
          </div>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
              passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {passed ? 'Quiz Passed!' : 'Keep Practicing'}
          </span>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">{moduleTitle} Quiz Results</h3>

          <p className="text-4xl font-extrabold text-slate-900 my-4">
            {totalCorrect} <span className="text-xl text-slate-500 font-normal">/ {questions.length}</span>
            <span className="text-lg text-slate-600 font-semibold ml-2">({scorePercent}%)</span>
          </p>

          <p className="text-sm text-slate-600 mb-8">
            {passed
              ? 'Awesome work! You have shown a solid grasp of this concept. Your completion has been saved.'
              : 'Good effort! Review the explanations below and give it another try to secure your pass.'}
          </p>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>

        {/* Review list */}
        <div className="mt-10 pt-8 border-t border-slate-200 space-y-6">
          <h4 className="text-base font-bold text-slate-900">Review Answers & Explanations</h4>
          {questions.map((q, idx) => {
            const answer = answersLog[idx];
            const wasCorrect = answer?.isCorrect;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border text-sm ${
                  wasCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  {wasCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Your answer:{' '}
                      <span className={wasCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {q.options[answer?.selectedIndex] || 'None'}
                      </span>
                    </p>
                    {!wasCorrect && (
                      <p className="text-xs text-emerald-800 font-medium mt-0.5">
                        Correct answer: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 pl-7 pt-2 border-t border-slate-200/60 text-xs text-slate-700 leading-relaxed bg-white/60 p-2.5 rounded-lg">
                  <span className="font-semibold text-slate-900">Why: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Active Question Screen ---
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Progress header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs font-semibold text-slate-500">
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 bg-emerald-600'
                  : i < currentIndex
                  ? 'w-2 bg-emerald-300'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question title */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
        {currentQuestion.question}
      </h3>

      {/* 4 Choices */}
      <div className="space-y-3 mb-6" role="radiogroup" aria-label="Quiz Choices">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQuestion.correctIndex;

          let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';

          if (isAnswerRevealed) {
            if (isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-medium ring-1 ring-rose-400';
            } else {
              optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            optionStyle = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium ring-2 ring-emerald-600';
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isAnswerRevealed}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${optionStyle}`}
            >
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-300 bg-white text-slate-600'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="text-sm sm:text-base leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Answer Explanation Box (Revealed after check) */}
      {isAnswerRevealed && (
        <div
          className={`p-4 rounded-xl border mb-6 text-sm animate-fadeIn ${
            selectedOption === currentQuestion.correctIndex
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1 text-sm">
            {selectedOption === currentQuestion.correctIndex ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Incorrect</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed mt-1 text-slate-700">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500">
          {savedModuleData?.bestScore !== null && (
            <span>Best previous score: {savedModuleData.bestScore}/{questions.length}</span>
          )}
        </span>

        {!isAnswerRevealed ? (
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheckAnswer}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Check Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <span>{isLastQuestion ? 'See Final Score' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
