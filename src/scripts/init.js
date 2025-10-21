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
