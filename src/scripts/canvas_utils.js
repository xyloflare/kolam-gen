import { drawDot } from "./raw_shapes";
import kolam_shapes_1 from "./kolam_shapes_1";

export function initCanvas(id, mw = 600) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  let CANVAS_WIDTH =
    (canvas.width =
      canvas.style.width =
      Math.min((Math.floor(window.visualViewport.width / 32) - 1) * 32, mw));
  let CANVAS_HEIGHT = (canvas.height = canvas.style.height = CANVAS_WIDTH);
  //ctx.imageSmoothingEnabled = false;
  return [ctx, CANVAS_WIDTH, CANVAS_HEIGHT];
}

export const tiltCanvas = (ctx, size, ogsize) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ogsize, ogsize);
  ctx.translate(0, ogsize / 2);
  ctx.rotate(-Math.PI / 4);
  size = Math.floor(Math.sqrt(Math.pow(size / 2, 2) * 2));
};
export const undoTiltCanvas = (ctx, size, ogsize) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ogsize, ogsize);
  ctx.translate(0, 0);
  ctx.rotate(0);
  size = ogsize;
};
export const testCalibration = (ctx) => {
  drawDot(ctx, 0, 0, 10);
  drawDot(ctx, 0, size, 10);
  drawDot(ctx, size, size, 10);
  drawDot(ctx, size, 0, 10);
  drawDot(ctx, size / 2, size / 2, 6, "red");
  kolam_shapes_1[0x0](ctx, 0, 0, 30);
  kolam_shapes_1[0x0](ctx, size, 0, 30);
  kolam_shapes_1[0x0](ctx, 0, size, 30);
  kolam_shapes_1[0x0](ctx, size, size, 30);
  kolam_shapes_1[0x0](ctx, size / 2, size / 2, 30);
};
