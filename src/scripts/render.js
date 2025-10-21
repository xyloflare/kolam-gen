import kolam_shapes_1 from "./kolam_shapes_1";
import { drawDot } from "./raw_shapes";

/*
const kolamData = [
  [0b1101, 0b1001, 0b1100],
  [0b0001, 0, 0b0100],
  [0b0011, 0b0110, 0b0111],
];
*/

function generateKolamGrid(rows, cols) {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  // helper to get bits from a number
  const bit = (n, pos) => (n >> pos) & 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let a = 0,
        b = 0,
        d = 0,
        e = 0;

      // connect with top neighbor
      if (r > 0)
        a = bit(grid[r - 1][c], 1); // top = bottom of neighbor
      else a = 0;

      // connect with left neighbor
      if (c > 0)
        d = bit(grid[r][c - 1], 2); // left = right of neighbor
      else d = 0;

      // random decisions for bottom/right
      const cBit = Math.random() < 0.5 ? 1 : 0;
      const bBit = Math.random() < 0.5 ? 1 : 0;

      // combine into a 4-bit value
      const val = (a << 3) | (bBit << 2) | (cBit << 1) | d;
      grid[r][c] = val;
    }
  }
  return grid;
}
function fixKolamConnections(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const setBit = (n, pos, val) => (val ? n | (1 << pos) : n & ~(1 << pos));
  const bit = (n, pos) => (n >> pos) & 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = grid[r][c];

      // right neighbor
      if (c < cols - 1) {
        const b = bit(val, 2);
        const right = grid[r][c + 1];
        grid[r][c + 1] = setBit(right, 0, b); // set its left bit
      }

      // bottom neighbor
      if (r < rows - 1) {
        const cbit = bit(val, 1);
        const below = grid[r + 1][c];
        grid[r + 1][c] = setBit(below, 3, cbit); // set its top bit
      }
    }
  }
  return grid;
}

function generateSymmetricKolam(rows, cols) {
  // make sure we handle odd/even grid sizes gracefully
  const halfRows = Math.ceil(rows / 2);
  const halfCols = Math.ceil(cols / 2);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  const setBit = (n, pos, val) => (val ? n | (1 << pos) : n & ~(1 << pos));
  const bit = (n, pos) => (n >> pos) & 1;

  // --- STEP 1: build top-left quadrant only ---
  for (let r = 0; r < halfRows; r++) {
    for (let c = 0; c < halfCols; c++) {
      let a = r === 0 ? 1 : 0;          // top edge always curved
      let d = c === 0 ? 1 : 0;          // left edge always curved
      let b = (c === halfCols - 1 && cols % 2 === 0) ? 1 : 0; // if touching center on even grids
      let cBit = (r === halfRows - 1 && rows % 2 === 0) ? 1 : 0;

      // create alternating pattern to simulate flow
      if ((r + c) % 2 === 0) {
        b = 1;
        cBit = 0;
      } else {
        b = 0;
        cBit = 1;
      }

      grid[r][c] = (a << 3) | (b << 2) | (cBit << 1) | d;
    }
  }

  // --- STEP 2: mirror horizontally & vertically ---
  for (let r = 0; r < halfRows; r++) {
    for (let c = 0; c < halfCols; c++) {
      const val = grid[r][c];
      const mirrorR = rows - 1 - r;
      const mirrorC = cols - 1 - c;

      // vertical mirror (flip top<->bottom)
      const vMirror =
        ((bit(val, 1) << 3) | // bottom → top
         (bit(val, 2) << 2) | // right stays right
         (bit(val, 3) << 1) | // top → bottom
         bit(val, 0));        // left stays left

      // horizontal mirror (flip left<->right)
      const hMirror =
        ((bit(val, 3) << 3) | // top stays top
         (bit(val, 0) << 2) | // left → right
         (bit(val, 1) << 1) | // bottom stays bottom
         bit(val, 2));        // right → left

      grid[r][mirrorC] = hMirror;
      grid[mirrorR][c] = vMirror;
      grid[mirrorR][mirrorC] = ((bit(val, 1) << 3) | (bit(val, 0) << 2) | (bit(val, 3) << 1) | bit(val, 2)); // both flipped
    }
  }

  // --- STEP 3: fix connections ---
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = grid[r][c];
      const b = bit(val, 2);
      const cBit = bit(val, 1);

      if (c < cols - 1) grid[r][c + 1] = setBit(grid[r][c + 1], 0, b);
      if (r < rows - 1) grid[r + 1][c] = setBit(grid[r + 1][c], 3, cBit);
    }
  }

  // --- STEP 4: ensure border sides curved ---
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let val = grid[r][c];
      if (r === 0) val = setBit(val, 3, 1); // top
      if (r === rows - 1) val = setBit(val, 1, 1); // bottom
      if (c === 0) val = setBit(val, 0, 1); // left
      if (c === cols - 1) val = setBit(val, 2, 1); // right
      grid[r][c] = val;
    }
  }

  return grid;
}

/*
let kolamData = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
*/
let gridSize = 6;
let kolamData = generateKolamGrid(gridSize, gridSize)//generateSymmetricKolam(gridSize, gridSize)//generateKolamGrid(gridSize, gridSize);
kolamData = fixKolamConnections(kolamData)
export default function renderKolam(ctx, canvasSize, color) {
  let kolamShapeSize = canvasSize / (gridSize + 0.5),
    centerX = canvasSize / 2,
    centerY = canvasSize / 2,
    startpx =
      centerX - (kolamData[0].length / 2) * kolamShapeSize + kolamShapeSize / 2,
    startpy =
      centerY - (kolamData.length / 2) * kolamShapeSize + kolamShapeSize / 2,
    ogstartpx = startpx;

  if (kolamData[0].length == 0) return;

  console.log('canvas size', canvasSize);
  console.log("spy", startpx, startpy);
  for (let i = 0; i < kolamData.length; i++) {
    for (let j = 0; j < kolamData[i].length; j++) {
      if (kolam_shapes_1[kolamData[i][j]]) {
        kolam_shapes_1[kolamData[i][j]](
          ctx,
          startpx,
          startpy,
          kolamShapeSize / 1.4,
        );
        //drawDot(ctx, startpx, startpy, kolamShapeSize*0.1)
      }
      drawDot(ctx, startpx, startpy, kolamShapeSize * 0.08, color);
      startpx += kolamShapeSize;
    }
    startpy += kolamShapeSize;
    startpx = ogstartpx;
    console.log(startpx, startpy);
  }
}
