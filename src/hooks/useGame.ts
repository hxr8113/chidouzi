import { useState, useCallback, useEffect, useRef } from 'react';
import { Cell, generateMaze, canMove } from '../utils/mazeGenerator';
import { getLevelConfig, getTotalLevels } from '../utils/levelConfig';

export interface GameState {
  level: number;
  playerPosition: { x: number; y: number };
  foodPosition: { x: number; y: number };
  maze: Cell[][];
  isPlaying: boolean;
  isCompleted: boolean;
  isWin: boolean;
  timer: number;
  moveCount: number;
}

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    playerPosition: { x: 0, y: 0 },
    foodPosition: { x: 0, y: 0 },
    maze: [],
    isPlaying: false,
    isCompleted: false,
    isWin: false,
    timer: 0,
    moveCount: 0,
  });

  const timerRef = useRef<number | null>(null);

  const startGame = useCallback((level: number = 1) => {
    const config = getLevelConfig(level);
    const maze = generateMaze(config.gridSize);
    const foodX = config.gridSize - 1;
    const foodY = config.gridSize - 1;

    setGameState({
      level,
      playerPosition: { x: 0, y: 0 },
      foodPosition: { x: foodX, y: foodY },
      maze,
      isPlaying: true,
      isCompleted: false,
      isWin: false,
      timer: 0,
      moveCount: 0,
    });
  }, []);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setGameState((prev) => {
      if (!prev.isPlaying || prev.isCompleted) return prev;

      const { playerPosition, maze } = prev;
      const { x, y } = playerPosition;

      if (!canMove(maze, x, y, direction)) return prev;

      let newX = x;
      let newY = y;

      switch (direction) {
        case 'up':
          newY -= 1;
          break;
        case 'down':
          newY += 1;
          break;
        case 'left':
          newX -= 1;
          break;
        case 'right':
          newX += 1;
          break;
      }

      const config = getLevelConfig(prev.level);
      const isWin = newX === config.gridSize - 1 && newY === config.gridSize - 1;
      const totalLevels = getTotalLevels();
      const isCompleted = isWin && prev.level >= totalLevels;

      return {
        ...prev,
        playerPosition: { x: newX, y: newY },
        moveCount: prev.moveCount + 1,
        isWin,
        isCompleted,
      };
    });
  }, []);

  const nextLevel = useCallback(() => {
    setGameState((prev) => {
      const nextLevelNum = prev.level + 1;
      const config = getLevelConfig(nextLevelNum);
      const maze = generateMaze(config.gridSize);
      const foodX = config.gridSize - 1;
      const foodY = config.gridSize - 1;

      return {
        level: nextLevelNum,
        playerPosition: { x: 0, y: 0 },
        foodPosition: { x: foodX, y: foodY },
        maze,
        isPlaying: true,
        isCompleted: false,
        isWin: false,
        timer: 0,
        moveCount: 0,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startGame(1);
  }, [startGame]);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.isWin && !gameState.isCompleted) {
      timerRef.current = window.setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timer: prev.timer + 1,
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isWin, gameState.isCompleted]);

  return {
    gameState,
    startGame,
    movePlayer,
    nextLevel,
    resetGame,
  };
};
