const canvas = document.querySelector('#myCanvas');
canvas.width = 900;
canvas.height = 900;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'grey';
let grid = [];
const gridOrigin = [];
let cellSize = 3;
let pause = true;
for (let y = 0; y <= canvas.width / cellSize; y++) {
  for (let x = 0; x <= canvas.height / cellSize; x++) {
    if (grid[y] != null) {
      if (
        x == 900 / 2 / cellSize ||
        y == 900 / 2 / cellSize ||
        y == x ||
        y == x + 1 ||
        y == x - 1 ||
        Math.max(x, y) + Math.min(x, y) == 900 / cellSize ||
        Math.max(x, y) + Math.min(x, y) == 900 / cellSize + 1 ||
        Math.max(x, y) + Math.min(x, y) == 900 / cellSize - 1
      ) {
        grid[y].push(1);
      } else {
        grid[y].push(0);
      }
      gridOrigin[y].push(0);
    } else {
      grid.push([]);
      gridOrigin.push([]);
    }
  }
}
let gridCopy = JSON.parse(JSON.stringify(gridOrigin));

const loop = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  drawGrid();
  if (!pause) {
    calculateGrid();
  }
};

const calculateGrid = () => {
  grid.forEach((col, y) => {
    col.forEach((val, x) => {
      const liveNeighbors = getLiveNeighborCount(y, x);
      if (val === 0 && liveNeighbors === 3) {
        gridCopy[y][x] = 1;
      } else if (val === 1 && liveNeighbors < 2) {
        gridCopy[y][x] = 0;
      } else if (val === 1 && liveNeighbors > 3) {
        gridCopy[y][x] = 0;
      } else {
        gridCopy[y][x] = val;
      }
    });
  });
  grid = JSON.parse(JSON.stringify(gridCopy));
  gridCopy = JSON.parse(JSON.stringify(gridOrigin));
};

const getLiveNeighborCount = (y, x) => {
  let count = 0;
  if (grid[y - 1] && grid[y - 1][x] === 1) {
    count++;
  }
  if (grid[y + 1] && grid[y + 1][x] === 1) {
    count++;
  }
  if (grid[y - 1] && grid[y - 1][x - 1] && grid[y - 1][x - 1] === 1) {
    count++;
  }
  if (grid[y + 1] && grid[y + 1][x - 1] && grid[y + 1][x - 1] === 1) {
    count++;
  }
  if (grid[y - 1] && grid[y - 1][x + 1] && grid[y - 1][x + 1] === 1) {
    count++;
  }
  if (grid[y + 1] && grid[y + 1][x + 1] && grid[y + 1][x + 1] === 1) {
    count++;
  }
  if (grid[y][x - 1] && grid[y][x - 1] === 1) {
    count++;
  }
  if (grid[y][x + 1] && grid[y][x + 1] === 1) {
    count++;
  }
  return count;
};

const drawGrid = () => {
  grid.forEach((col, y) => {
    col.forEach((val, x) => {
      if (val === 1) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  });
};

function merge(piece, mouseY, mouseX) {
  piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        grid[y + mouseY][x + mouseX] = value;
      }
    });
  });
}
let interval = setInterval(loop, 100);
window.addEventListener('keypress', (e) => {
  if (e.key === 'a') {
    pause = !pause;
  }
});

window.addEventListener('mousedown', (e) => {
  let box = canvas.getBoundingClientRect();
  let mouseX = Math.floor((e.clientX - box.x) / cellSize);
  let mouseY = Math.floor((e.clientY - box.y) / cellSize);
  // merge(
  //   floatGenerator,
  //   Math.round(mouseY - floatGenerator.length / 2),
  //   Math.round(mouseX - floatGenerator[0].length / 2)
  // );
  // grid[mouseY][mouseX] = grid[mouseY][mouseX] === 1 ? 0 : 1;
  window.onmousemove = (ev) => {
    let box = canvas.getBoundingClientRect();
    let mouseX = Math.floor((ev.clientX - box.x) / cellSize);
    let mouseY = Math.floor((ev.clientY - box.y) / cellSize);
    grid[mouseY][mouseX] = 1;
  };
  window.onmouseup = () => {
    window.onmousemove = null;
    window.onmouseup = null;
  };
});

var floater = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
];
var floatGenerator = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
  ],
  [
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];
// for (let i = 0; i < 3; i++) {
//   merge(floatGenerator, i * 25 + 10, 10);
// }
