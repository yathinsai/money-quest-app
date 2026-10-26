import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage with defensive error handling.
 * @template T
 * @param {string} key 
 * @param {T} initialValue 
 * @returns {[T, (val: T | ((prev: T) => T)) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`MoneyQuest: Error reading key "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`MoneyQuest: Error setting key "${key}" to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
