import React from 'react';
import { Cell } from '../utils/mazeGenerator';

interface MazeProps {
  maze: Cell[][];
  cellSize: number;
}

export const Maze: React.FC<MazeProps> = ({ maze, cellSize }) => {
  if (maze.length === 0) return null;

  const gridSize = maze.length;
  const mazeWidth = gridSize * cellSize;
  const mazeHeight = gridSize * cellSize;

  return (
    <div className="w-full max-w-full">
      <div
        className="relative bg-gray-900 rounded-lg shadow-2xl border-4 border-red-500"
        style={{
          width: mazeWidth,
          height: mazeHeight,
          minWidth: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.5), inset 0 0 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        <svg width={mazeWidth} height={mazeHeight} className="absolute inset-0">
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const cx = x * cellSize;
              const cy = y * cellSize;

              return (
                <g key={`${x}-${y}`}>
                  {cell.walls.top && (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={cx + cellSize}
                      y2={cy}
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  {cell.walls.right && (
                    <line
                      x1={cx + cellSize}
                      y1={cy}
                      x2={cx + cellSize}
                      y2={cy + cellSize}
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  {cell.walls.bottom && (
                    <line
                      x1={cx}
                      y1={cy + cellSize}
                      x2={cx + cellSize}
                      y2={cy + cellSize}
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  {cell.walls.left && (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={cx}
                      y2={cy + cellSize}
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>

        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
        />
      </div>
    </div>
  );
};