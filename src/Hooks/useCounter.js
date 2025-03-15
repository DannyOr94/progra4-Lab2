import { useState, useEffect, useCallback } from 'react';

export function useCounter() {

  const [count, setCount] = useState(() => {
    try {
      const savedCount = window.localStorage.getItem('count');
      return savedCount !== null ? Number(savedCount) : 0; 
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return 0; 
    }
  });
  
  
  
  useEffect(() => {
    try {
      window.localStorage.setItem('count', count);
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [count]);

  
  const increaseCount = useCallback(() => setCount(prev => prev + 1), []);
  const decreaseCount = useCallback(() => setCount(prev => (prev > 0 ? prev - 1 : 0)), []);
  const resetCount = useCallback(() => setCount(0), []);

  return { 
    count, 
    increaseCount, 
    decreaseCount,
    resetCount 
  };
}
