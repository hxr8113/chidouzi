export interface LevelConfig {
  level: number;
  gridSize: number;
  cellSize: number;
  difficulty: string;
  description: string;
}

const difficultyLabels = ['简单', '中等', '困难', '非常困难', '专家'];
const descriptionLabels = [
  '入门级迷宫',
  '有点挑战了',
  '考验你的智慧',
  '高手进阶',
  '终极挑战',
];

export const generateLevels = (): LevelConfig[] => {
  const levels: LevelConfig[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const difficultyIndex = Math.min(Math.floor((i - 1) / 10), 4);
    const baseGridSize = 10 + Math.floor((i - 1) / 5) * 3;
    const gridSize = Math.min(baseGridSize + ((i - 1) % 5), 50);
    const cellSize = Math.max(12, Math.floor(45 - (i - 1) * 0.6));
    
    levels.push({
      level: i,
      gridSize,
      cellSize,
      difficulty: difficultyLabels[difficultyIndex],
      description: descriptionLabels[difficultyIndex],
    });
  }
  
  return levels;
};

export const levels = generateLevels();

export const getLevelConfig = (level: number): LevelConfig => {
  return levels[level - 1] || levels[levels.length - 1];
};

export const getTotalLevels = (): number => {
  return levels.length;
};