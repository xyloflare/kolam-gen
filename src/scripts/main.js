import { initCanvas } from "./init";
import * as shape from "./shapes";

let ctx, size;
window.addEventListener("load", () => {
  [ctx, ...size] = initCanvas("canvas");
  //mainLoop(performance.now())
  ctx.lineWidth = 5; // Sets the line thickness to 10 pixels
  ctx.strokeStyle = 'white';

  //ctx.clearRect(0, 0, ...size);
  //shape.drawDia(ctx, 250, 150, 100);
  //shape.drawShapeB(ctx, 100, 100, 50);
  let n = 0.6;
  shape.drawCornerSuperellipse(ctx, 100, 100, 200, 200, 'tl', 100, 100, n)
  shape.drawCornerSuperellipse(ctx, 100, 100, 200, 200, 'tr', 100, 100, n)
  shape.drawCornerSuperellipse(ctx, 100, 100, 200, 200, 'br', 100, 100, n)
  shape.drawCornerSuperellipse(ctx, 100, 100, 200, 200, 'bl', 100, 100, n)
});

let lastTime = performance.now();
function mainLoop(currentTime) {
  let deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  ctx.clearRect(0, 0, ...size);
  shape.drawShapeB(ctx, 100, 100, 20);

  requestAnimationFrame(mainLoop);
}
