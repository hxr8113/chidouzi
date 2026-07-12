export interface LevelConfig {
  level: number;
  gridSize: number;
  cellSize: number;
  difficulty: string;
  description: string;
}

export const levels: LevelConfig[] = [
  {
    level: 1,
    gridSize: 10,
    cellSize: 40,
    difficulty: '简单',
    description: '入门级迷宫',
  },
  {
    level: 2,
    gridSize: 13,
    cellSize: 35,
    difficulty: '中等',
    description: '有点挑战了',
  },
  {
    level: 3,
    gridSize: 16,
    cellSize: 30,
    difficulty: '困难',
    description: '考验你的智慧',
  },
  {
    level: 4,
    gridSize: 19,
    cellSize: 28,
    difficulty: '非常困难',
    description: '高手进阶',
  },
  {
    level: 5,
    gridSize: 22,
    cellSize: 25,
    difficulty: '专家',
    description: '终极挑战',
  },
];

export const getLevelConfig = (level: number): LevelConfig => {
  return levels[level - 1] || levels[levels.length - 1];
};

export const getTotalLevels = (): number => {
  return levels.length;
};
