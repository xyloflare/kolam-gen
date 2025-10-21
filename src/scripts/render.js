import kolam_shapes_1 from "./kolam_shapes_1";
import { drawDot } from "./raw_shapes";

let lastArgs = {};

export default function renderKolam(args = {}) {
  const merged = { ...lastArgs, ...args };
  lastArgs = merged;
  const { ctx, canvasSize, kolamData, colorAll, opts = {} } = merged;
  const {
    dotColor = colorAll,
    lineColor = colorAll,
    lineWidth = 3,
  } = opts;

  if (!ctx) return;

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.fillStyle = dotColor;

  let kolamShapeSize =
    canvasSize / (Math.max(kolamData.length, kolamData[0].length) + 0.5),
    centerX = canvasSize / 2,
    centerY = canvasSize / 2,
    startpx =
      centerX - (kolamData[0].length / 2) * kolamShapeSize + kolamShapeSize / 2,
    startpy =
      centerY - (kolamData.length / 2) * kolamShapeSize + kolamShapeSize / 2,
    ogstartpx = startpx;

  if (kolamData[0].length == 0) return;

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
      drawDot(ctx, startpx, startpy, kolamShapeSize * 0.08, dotColor);
      startpx += kolamShapeSize;
    }
    startpy += kolamShapeSize;
    startpx = ogstartpx;
  }
}
