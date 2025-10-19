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

  // loop through cells
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

      // random decisions for bottom/right (to allow creative patterning)
      const cBit = Math.random() < 0.5 ? 1 : 0;
      const bBit = Math.random() < 0.5 ? 1 : 0;

      // combine into a 4-bit value
      const val = (a << 3) | (bBit << 2) | (cBit << 1) | d;
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
    startpx =
      canvasSize / 2 -
      kolamData[0].length * kolamShapeSize +
      kolamShapeSize / 2,
    startpy =
      canvasSize / 2 - kolamData.length * kolamShapeSize + kolamShapeSize / 2,
*/
let kolamData = generateKolamGrid(8,8);

let kolamShapeSize = 70;

export default function renderKolam(ctx, canvasSize) {
  let centerX = canvasSize / 2,
    centerY = canvasSize / 2,
    startpx = centerX - ((kolamData[0].length/2) *kolamShapeSize) + kolamShapeSize/2,
    startpy = centerY - ((kolamData.length/2) *kolamShapeSize) + kolamShapeSize/2,
    ogstartpx = startpx;

  if (kolamData[0].length == 0) return;

  console.log(canvasSize);
  console.log("spy", startpx, startpy);
  for (let i = 0; i < kolamData.length; i++) {
    for (let j = 0; j < kolamData[i].length; j++) {
      if (kolam_shapes_1[kolamData[i][j]]) {
        kolam_shapes_1[kolamData[i][j]](
          ctx,
          startpx,
          startpy,
          kolamShapeSize/1.4 // + kolamShapeSize * 0.05,
        );
        //drawDot(ctx, startpx, startpy, kolamShapeSize*0.1)
      }
      drawDot(ctx, startpx, startpy, kolamShapeSize * 0.1);
      startpx += kolamShapeSize// + kolamShapeSize / 2;
    }
    startpy += kolamShapeSize// + kolamShapeSize / 2;
    startpx = ogstartpx;
    console.log(startpx, startpy);
  }
}
