import React from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface GameControlsProps {
  onMove: (direction: Direction) => void;
  enabled?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onMove, enabled = true }) => {
  const handleClick = (direction: Direction) => {
    if (enabled) {
      onMove(direction);
    }
  };

  const buttonClass = `
    w-16 h-16 sm:w-20 sm:h-20
    bg-gradient-to-br from-gray-700 to-gray-800
    border-2 border-gray-600
    rounded-xl
    flex items-center justify-center
    text-white
    text-2xl sm:text-3xl
    shadow-lg
    active:scale-95
    active:bg-gradient-to-br from-gray-600 to-gray-700
    active:border-gray-500
    transition-all duration-100
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:shadow-red-500/30
    hover:border-red-400
  `;

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <button
        className={buttonClass}
        onClick={() => handleClick('up')}
        disabled={!enabled}
        aria-label="Move Up"
      >
        ↑
      </button>
      <div className="flex gap-2">
        <button
          className={buttonClass}
          onClick={() => handleClick('left')}
          disabled={!enabled}
          aria-label="Move Left"
        >
          ←
        </button>
        <button
          className={buttonClass}
          onClick={() => handleClick('down')}
          disabled={!enabled}
          aria-label="Move Down"
        >
          ↓
        </button>
        <button
          className={buttonClass}
          onClick={() => handleClick('right')}
          disabled={!enabled}
          aria-label="Move Right"
        >
          →
        </button>
      </div>
      <div className="mt-4 text-gray-400 text-xs text-center hidden sm:block">
        <p>使用键盘方向键或 WASD 控制</p>
      </div>
    </div>
  );
};
