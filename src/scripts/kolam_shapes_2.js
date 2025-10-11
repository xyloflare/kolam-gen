import { drawCornerSuperellipse } from "./raw_shapes";

const superellipseSides = ['tl', 'tr', 'bl', 'br'];

export default {
  diamond: (ctx, x, y, size) => {
    for (let i = 0; i < superellipseSides.length; i++) {
      drawCornerSuperellipse(
        ctx,
        x,
        y,
        size,
        size,
        superellipseSides[i],
        size / 2,
        size / 2,
        1,
      );
    }
  },

  teardrop: (ctx, x, y, size) => {
    drawCornerSuperellipse(
      ctx,
      x,
      y,
      size,
      size,
      "tl",
      size / 2,
      size / 2,
      0.5788,
    );
    drawCornerSuperellipse(
      ctx,
      x,
      y,
      size,
      size,
      "tr",
      size / 2,
      size / 2,
      0.5788,
    );
    drawCornerSuperellipse(
      ctx,
      x,
      y,
      size,
      size,
      "br",
      size / 2,
      size / 2,
      0.9,
    );
    drawCornerSuperellipse(
      ctx,
      x,
      y,
      size,
      size,
      "bl",
      size / 2,
      size / 2,
      0.9,
    );
  },
};
