import { initCanvas } from "./init";
import kolam_shapes_1 from "./kolam_shapes_1";
import kolam_shapes_2 from "./kolam_shapes_2";
import { drawDot } from "./raw_shapes";
import renderKolam from "./render";

let ctx, size, ogsize;
window.addEventListener("load", () => {
  [ctx, size, ogsize] = initCanvas("canvas");
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  //ctx.save();
  //kolam_shapes_1.shape0(ctx, 100, 100, 30)
  
  //tiltCanvas(ctx)

  drawDot(ctx, 0, 0, 20);
  drawDot(ctx, 0, size, 20);
  drawDot(ctx, size, size, 20);
  drawDot(ctx, size, 0, 20);
  drawDot(ctx, size / 2, size / 2, 10);
  
  renderKolam();
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
