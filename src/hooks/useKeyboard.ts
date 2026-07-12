import { useEffect, useCallback } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface UseKeyboardOptions {
  onMove: (direction: Direction) => void;
  enabled?: boolean;
}

export const useKeyboard = ({ onMove, enabled = true }: UseKeyboardOptions) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        W: 'up',
        s: 'down',
        S: 'down',
        a: 'left',
        A: 'left',
        d: 'right',
        D: 'right',
      };

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        onMove(direction);
      }
    },
    [onMove, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
