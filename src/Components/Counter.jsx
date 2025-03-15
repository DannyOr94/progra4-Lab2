import { useCounter } from "../Hooks/useCounter";
import { useState, useEffect } from "react";

export function Counter() {
  const { count, increaseCount, decreaseCount, resetCount } = useCounter();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (count > 0) {
      setAnimationClass('increase');
    } else if (count < 0) {
      setAnimationClass('decrease');
    }
    const timer = setTimeout(() => setAnimationClass(''), 500); 
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2 className={`count ${animationClass}`} style={{ fontSize: '3em', margin: '20px 0' }}>
        {count}
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        margin: '20px 0'
      }}>
        <button 
          onClick={increaseCount}
          className="counter-button"
          title="Aumentar"
          style={{ fontSize: '3em' }}
        >
          ✙
        </button>

        <button 
          onClick={resetCount}
          className="counter-button"
          title="Resetear"
        >
          ↺
        </button>

        <button 
          onClick={decreaseCount}
          className="counter-button"
          title="Disminuir"
          style={{ fontSize: '3em' }}
        >
          -
        </button>
      </div>

      {count === 6 && (
        <p className="favorite-message" style={{ 
          color: '#2ecc71',
          fontSize: '1.2em',
          marginTop: '15px',
          fontWeight: '500'
        }}>
          Felicidades, has encontrado mi número favorito
        </p>
      )}
    </div>
  );
}
