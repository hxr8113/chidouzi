import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/useGame';
import { useKeyboard } from '../hooks/useKeyboard';
import { getLevelConfig, getTotalLevels } from '../utils/levelConfig';
import { Maze } from '../components/Maze';
import { Player } from '../components/Player';
import { Food } from '../components/Food';
import { GameControls } from '../components/GameControls';
import { HUD } from '../components/HUD';
import { Modal } from '../components/Modal';

const Game: React.FC = () => {
  const { gameState, startGame, movePlayer, nextLevel, resetGame } = useGame();
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const config = getLevelConfig(gameState.level);

  useKeyboard({
    onMove: movePlayer,
    enabled: gameState.isPlaying && !gameState.isWin && !gameState.isCompleted,
  });

  useEffect(() => {
    if (!gameState.isPlaying && !showLevelSelect && !gameState.isCompleted) {
      setShowLevelSelect(true);
    }
  }, []);

  const handleNextLevel = () => {
    nextLevel();
  };

  const handleReset = () => {
    resetGame();
  };

  const handleLevelSelect = (level: number) => {
    if (gameState.completedLevels.includes(level)) {
      setShowLevelSelect(false);
      startGame(level);
    }
  };

  const handleBackToLevels = () => {
    setShowLevelSelect(true);
  };

  const levelsPerPage = 10;
  const totalLevels = getTotalLevels();
  const totalPages = Math.ceil(totalLevels / levelsPerPage);
  const startLevel = (currentPage - 1) * levelsPerPage + 1;
  const endLevel = Math.min(startLevel + levelsPerPage - 1, totalLevels);

  if (showLevelSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
          🎮 迷宫冒险
        </h1>
        
        <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 shadow-xl max-w-2xl w-full">
          <h2 className="text-xl font-bold text-green-400 mb-4 text-center">选择关卡</h2>
          
          <div className="grid grid-cols-5 gap-3 mb-6">
            {Array.from({ length: endLevel - startLevel + 1 }, (_, i) => {
              const level = startLevel + i;
              const isCompleted = gameState.completedLevels.includes(level);
              const isLocked = !isCompleted;
              
              return (
                <button
                  key={level}
                  onClick={() => handleLevelSelect(level)}
                  disabled={isLocked}
                  className={`
                    aspect-square rounded-xl font-bold text-lg transition-all duration-200
                    ${isLocked 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600' 
                      : 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 hover:scale-110 border border-green-400 shadow-lg'
                    }
                  `}
                >
                  {isLocked ? '🔒' : level}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
            >
              上一页
            </button>
            <span className="text-gray-300">
              第 {currentPage} / {totalPages} 页
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
            >
              下一页
            </button>
          </div>
          
          <div className="mt-4 text-center text-gray-400 text-sm">
            已完成: {gameState.completedLevels.filter(l => l <= totalLevels).length} / {totalLevels} 关
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <button
            onClick={handleBackToLevels}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-sm"
          >
            ← 返回关卡选择
          </button>
          <h1 className="text-2xl sm:text-4xl font-bold text-center bg-gradient-to-r from-green-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
            🎮 迷宫冒险
          </h1>
          <div className="w-24"></div>
        </div>

        {gameState.isPlaying && (
          <>
            <HUD gameState={gameState} />

            <div className="relative w-full sm:w-auto max-h-[50vh] sm:max-h-none overflow-auto">
              <Maze maze={gameState.maze} cellSize={config.cellSize} />
              <Player
                x={gameState.playerPosition.x}
                y={gameState.playerPosition.y}
                cellSize={config.cellSize}
              />
              <Food
                x={gameState.foodPosition.x}
                y={gameState.foodPosition.y}
                cellSize={config.cellSize}
              />
            </div>

            <GameControls
              onMove={movePlayer}
              enabled={gameState.isPlaying && !gameState.isWin && !gameState.isCompleted}
            />
          </>
        )}

        {!gameState.isPlaying && !gameState.isCompleted && (
          <div className="text-center">
            <button
              onClick={() => startGame(1)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold text-xl rounded-xl shadow-lg transition-all duration-200 hover:scale-110"
            >
              开始游戏
            </button>
          </div>
        )}

        <Modal
          isOpen={gameState.isWin && !gameState.isCompleted}
          title={`关卡 ${gameState.level} 完成！`}
          message={`恭喜你在 ${Math.floor(gameState.timer / 60)}分${gameState.timer % 60}秒内用 ${gameState.moveCount} 步完成了本关！`}
          buttonText="下一关"
          onButtonClick={handleNextLevel}
          showSecondary
          secondaryText="返回关卡选择"
          onSecondaryClick={handleBackToLevels}
        />

        <Modal
          isOpen={gameState.isCompleted}
          title="🎉 游戏通关！"
          message={`恭喜你完成了所有 ${getTotalLevels()} 个关卡！\n总用时：${Math.floor(gameState.timer / 60)}分${gameState.timer % 60}秒\n总步数：${gameState.moveCount}`}
          buttonText="再玩一次"
          onButtonClick={handleReset}
          showSecondary
          secondaryText="返回关卡选择"
          onSecondaryClick={handleBackToLevels}
        />
      </div>
    </div>
  );
};

export default Game;