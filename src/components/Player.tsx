import React from 'react';

interface PlayerProps {
  x: number;
  y: number;
  cellSize: number;
}

export const Player: React.FC<PlayerProps> = ({ x, y, cellSize }) => {
  const left = x * cellSize;
  const top = y * cellSize;
  const size = cellSize * 0.8;
  const offset = (cellSize - size) / 2;

  return (
    <div
      className="absolute transition-all duration-200 ease-out z-20"
      style={{
        left: left + offset,
        top: top + offset,
        width: size,
        height: size,
      }}
    >
      <div className="w-full h-full relative">
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.6) 0%, transparent 70%)',
          }}
        />
        <img
          src="/player.png"
          alt="Player"
          className="w-full h-full object-contain rounded-lg drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.8))',
          }}
        />
      </div>
    </div>
  );
};
