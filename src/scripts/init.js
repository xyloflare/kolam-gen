const maxCanvasWidth = 600;
// aspect ratio 1

export function initCanvas(id, mw) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  let CANVAS_WIDTH =
    (canvas.width =
      canvas.style.width =
      Math.min(
        (Math.floor(window.visualViewport.width / 32) - 1) * 32,
        mw || maxCanvasWidth,
      ));
  let CANVAS_HEIGHT = (canvas.height = canvas.style.height = CANVAS_WIDTH);
  //ctx.imageSmoothingEnabled = false;
  return [ctx, CANVAS_WIDTH, CANVAS_HEIGHT];
}
