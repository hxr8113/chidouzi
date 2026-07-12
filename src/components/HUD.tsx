import React from 'react';
import { GameState } from '../hooks/useGame';
import { getLevelConfig, getTotalLevels } from '../utils/levelConfig';

interface HUDProps {
  gameState: GameState;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const HUD: React.FC<HUDProps> = ({ gameState }) => {
  const config = getLevelConfig(gameState.level);
  const totalLevels = getTotalLevels();

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-lg border border-gray-700 shadow-lg">
        <div className="text-gray-400 text-xs mb-1">关卡</div>
        <div className="text-green-400 font-bold text-lg">
          {gameState.level} / {totalLevels}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-lg border border-gray-700 shadow-lg">
        <div className="text-gray-400 text-xs mb-1">难度</div>
        <div className="text-yellow-400 font-bold text-lg">{config.difficulty}</div>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-lg border border-gray-700 shadow-lg">
        <div className="text-gray-400 text-xs mb-1">时间</div>
        <div className="text-blue-400 font-bold text-lg">{formatTime(gameState.timer)}</div>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-lg border border-gray-700 shadow-lg">
        <div className="text-gray-400 text-xs mb-1">步数</div>
        <div className="text-purple-400 font-bold text-lg">{gameState.moveCount}</div>
      </div>
    </div>
  );
};
