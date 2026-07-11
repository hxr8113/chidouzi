import React, { useEffect } from 'react';
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
  const config = getLevelConfig(gameState.level);

  useKeyboard({
    onMove: movePlayer,
    enabled: gameState.isPlaying && !gameState.isWin && !gameState.isCompleted,
  });

  useEffect(() => {
    startGame(1);
  }, [startGame]);

  const handleNextLevel = () => {
    nextLevel();
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
        🎮 迷宫冒险
      </h1>

      {gameState.isPlaying && (
        <>
          <HUD gameState={gameState} />

          <div className="relative">
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
        secondaryText="重新开始"
        onSecondaryClick={handleReset}
      />

      <Modal
        isOpen={gameState.isCompleted}
        title="🎉 游戏通关！"
        message={`恭喜你完成了所有 ${getTotalLevels()} 个关卡！\n总用时：${Math.floor(gameState.timer / 60)}分${gameState.timer % 60}秒\n总步数：${gameState.moveCount}`}
        buttonText="再玩一次"
        onButtonClick={handleReset}
      />
    </div>
  );
};

export default Game;
