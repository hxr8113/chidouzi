import React from 'react';

interface FoodProps {
  x: number;
  y: number;
  cellSize: number;
}

export const Food: React.FC<FoodProps> = ({ x, y, cellSize }) => {
  const left = x * cellSize;
  const top = y * cellSize;
  const size = cellSize * 0.8;
  const offset = (cellSize - size) / 2;

  return (
    <div
      className="absolute z-10"
      style={{
        left: left + offset,
        top: top + offset,
        width: size,
        height: size,
      }}
    >
      <div className="w-full h-full relative">
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
            animationDuration: '3s',
          }}
        />
        <div
          className="absolute inset-2 rounded-full animate-pulse-fast"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          }}
        />
        <img
          src="./food.png"
          alt="Food"
          className="w-full h-full object-contain rounded-lg"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.9))',
            animation: 'bounce 2s infinite',
          }}
        />
      </div>
    </div>
  );
};
