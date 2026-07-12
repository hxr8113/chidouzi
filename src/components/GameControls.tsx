import React, { useRef, useCallback } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface GameControlsProps {
  onMove: (direction: Direction) => void;
  enabled?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onMove, enabled = true }) => {
  const intervalRefs = useRef<{ [key in Direction]: number | null }>({
    up: null,
    down: null,
    left: null,
    right: null,
  });

  const startMove = useCallback((direction: Direction) => {
    if (!enabled) return;
    
    onMove(direction);
    
    intervalRefs.current[direction] = window.setInterval(() => {
      onMove(direction);
    }, 100);
  }, [onMove, enabled]);

  const stopMove = useCallback((direction: Direction) => {
    if (intervalRefs.current[direction]) {
      clearInterval(intervalRefs.current[direction]);
      intervalRefs.current[direction] = null;
    }
  }, []);

  const handleMouseDown = (direction: Direction) => startMove(direction);
  const handleMouseUp = (direction: Direction) => stopMove(direction);
  const handleMouseLeave = (direction: Direction) => stopMove(direction);

  const handleTouchStart = (direction: Direction, e: React.TouchEvent) => {
    e.preventDefault();
    startMove(direction);
  };
  const handleTouchEnd = (direction: Direction) => stopMove(direction);
  const handleTouchCancel = (direction: Direction) => stopMove(direction);

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
    select-none
    touch-none
  `;

  const createButton = (direction: Direction, symbol: string) => (
    <button
      key={direction}
      className={buttonClass}
      onClick={() => enabled && onMove(direction)}
      onMouseDown={() => handleMouseDown(direction)}
      onMouseUp={() => handleMouseUp(direction)}
      onMouseLeave={() => handleMouseLeave(direction)}
      onTouchStart={(e) => handleTouchStart(direction, e)}
      onTouchEnd={() => handleTouchEnd(direction)}
      onTouchCancel={() => handleTouchCancel(direction)}
      disabled={!enabled}
      aria-label={`Move ${direction}`}
    >
      {symbol}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      {createButton('up', '↑')}
      <div className="flex gap-2">
        {createButton('left', '←')}
        {createButton('down', '↓')}
        {createButton('right', '→')}
      </div>
      <div className="mt-4 text-gray-400 text-xs text-center hidden sm:block">
        <p>使用键盘方向键或 WASD 控制</p>
      </div>
    </div>
  );
};