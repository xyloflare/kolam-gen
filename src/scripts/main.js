import { initCanvas } from "./init";
import kolam_shapes_1 from "./kolam_shapes_1";
import kolam_shapes_2 from "./kolam_shapes_2";

let ctx, size;
window.addEventListener("load", () => {
  [ctx, ...size] = initCanvas("canvas");
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.fillStyle = 'white';
  ctx.save();
  kolam_shapes_1.shape0(ctx, 100, 100, 30)
});
