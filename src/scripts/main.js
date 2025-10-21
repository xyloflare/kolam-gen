import { initCanvas } from "./init";
import kolam_shapes_1 from "./kolam_shapes_1";
import kolam_shapes_2 from "./kolam_shapes_2";
import { drawDot } from "./raw_shapes";
import renderKolam from "./render";

let ctx, size, ogsize, defaultColor = 'oklch(21% 0.034 264.665)';
window.addEventListener("load", () => {
  [ctx, size, ogsize] = initCanvas("canvas");
  //const canvas = document.getElementById('canvas');
  //ctx = canvas.getContext("2d");
  //size = canvas.clientWidth;
  //ogsize = size;
  ctx.lineWidth = 3;
  ctx.strokeStyle = defaultColor;
  ctx.fillStyle = defaultColor;
  renderKolam(ctx, size, defaultColor);
});

const tiltCanvas = (ctx) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ogsize, ogsize);
  ctx.translate(0, ogsize / 2);
  ctx.rotate(-Math.PI / 4); 
  size = Math.floor(Math.sqrt(Math.pow(size / 2, 2) * 2));
}
const undoTiltCanvas = (ctx) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ogsize, ogsize);
  ctx.translate(0, 0);
  ctx.rotate(0); 
  size = ogsize;
}
const testCalibration = (ctx) => {
  drawDot(ctx, 0, 0, 10)
  drawDot(ctx, 0, size, 10);
  drawDot(ctx, size, size, 10);
  drawDot(ctx, size, 0, 10);
  drawDot(ctx, size / 2, size / 2, 6, 'red');
  kolam_shapes_1[0x0](ctx, 0, 0, 30)
  kolam_shapes_1[0x0](ctx, size, 0, 30)
  kolam_shapes_1[0x0](ctx, 0, size, 30)
  kolam_shapes_1[0x0](ctx, size, size, 30)
  kolam_shapes_1[0x0](ctx, size/2, size/2, 30)
}
