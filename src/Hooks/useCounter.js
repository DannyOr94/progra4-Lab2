import { useState, useEffect, useCallback } from 'react';

export function useCounter() {
  // Inicializa el contador desde localStorage o establece en 0
  const [count, setCount] = useState(() => {
    try {
      const savedCount = window.localStorage.getItem('count');
      return savedCount !== null ? Number(savedCount) : 0; // Retorna 0 si no hay valor guardado
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return 0; // Retorna 0 en caso de error
    }
  });

  // Efecto para actualizar localStorage cada vez que cambia el contador
  useEffect(() => {
    try {
      window.localStorage.setItem('count', count);
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [count]);

  // Funciones para aumentar, disminuir y reiniciar el contador
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
