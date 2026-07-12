export interface Cell {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export const generateMaze = (gridSize: number): Cell[][] => {
  const maze: Cell[][] = [];

  for (let y = 0; y < gridSize; y++) {
    maze[y] = [];
    for (let x = 0; x < gridSize; x++) {
      maze[y][x] = {
        x,
        y,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
        visited: false,
      };
    }
  }

  const stack: Cell[] = [];
  const startCell = maze[0][0];
  startCell.visited = true;
  stack.push(startCell);

  const getUnvisitedNeighbors = (cell: Cell): Cell[] => {
    const neighbors: Cell[] = [];
    const { x, y } = cell;

    if (y > 0 && !maze[y - 1][x].visited) {
      neighbors.push(maze[y - 1][x]);
    }
    if (x < gridSize - 1 && !maze[y][x + 1].visited) {
      neighbors.push(maze[y][x + 1]);
    }
    if (y < gridSize - 1 && !maze[y + 1][x].visited) {
      neighbors.push(maze[y + 1][x]);
    }
    if (x > 0 && !maze[y][x - 1].visited) {
      neighbors.push(maze[y][x - 1]);
    }

    return neighbors;
  };

  const removeWalls = (current: Cell, next: Cell): void => {
    const dx = next.x - current.x;
    const dy = next.y - current.y;

    if (dx === 1) {
      current.walls.right = false;
      next.walls.left = false;
    } else if (dx === -1) {
      current.walls.left = false;
      next.walls.right = false;
    } else if (dy === 1) {
      current.walls.bottom = false;
      next.walls.top = false;
    } else if (dy === -1) {
      current.walls.top = false;
      next.walls.bottom = false;
    }
  };

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      next.visited = true;
      removeWalls(current, next);
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  maze[0][0].walls.left = false;
  maze[gridSize - 1][gridSize - 1].walls.right = false;

  return maze;
};

export const canMove = (
  maze: Cell[][],
  x: number,
  y: number,
  direction: 'up' | 'down' | 'left' | 'right'
): boolean => {
  const cell = maze[y]?.[x];
  if (!cell) return false;

  switch (direction) {
    case 'up':
      return !cell.walls.top;
    case 'down':
      return !cell.walls.bottom;
    case 'left':
      return !cell.walls.left;
    case 'right':
      return !cell.walls.right;
    default:
      return false;
  }
};
