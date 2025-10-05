import { initCanvas } from "./init";

let ctx, size;
window.addEventListener("load", () => {
  [ctx, ...size] = initCanvas('canvas');
  mainLoop(performance.now())
})

let lastTime = performance.now();
function mainLoop(currentTime) {
  let deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  ctx.clearRect(0, 0, ...size);

  requestAnimationFrame(mainLoop);
} 
