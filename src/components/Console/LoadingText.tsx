import React, { useState, useEffect } from 'react';

interface LoadingTextProps {
  text?: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({ text = 'Loading' }) => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === '...') {
          return '.';
        } else {
          return prevDots + '.';
        }
      });
    }, 500); // Intervalo de 500 milissegundos (0,5 segundos) para alternar os pontos.

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado.
  }, []);

  return <div>{text}{dots}</div>;
};

export default LoadingText;
