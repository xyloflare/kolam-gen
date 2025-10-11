import { drawTiltedSquare, drawPartialCircle } from "./raw_shapes";

export default {
  shape0: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
    });
  },
  shape1: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { topLeft: 0.5, bottomLeft: 0.5 },
      positions: { topLeft: "end", bottomLeft: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.25,
      end: 0.5,
      cut: "X",
    });
  },
  shape2: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { bottomLeft: 0.5, bottomRight: 0.5 },
      positions: { bottomLeft: "end", bottomRight: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 1,
      end: 0.25,
      cut: "X",
    });
  },
  shape3: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        topRight: true,
      },
      fractions: { topLeft: 0.5, bottomRight: 0.5 },
      positions: { topLeft: "end", bottomRight: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0,
      end: 0.5,
      cut: "X",
    });
  },
  shape4: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { bottomRight: 0.5, topRight: 0.5 },
      positions: { bottomRight: "end", topRight: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.75,
      end: 1,
      cut: "X",
    });
  },
  shape5: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: {
        bottomRight: 0.5,
        topRight: 0.5,
        topLeft: 0.5,
        bottomLeft: 0.5,
      },
      positions: {
        bottomRight: "end",
        topRight: "start",
        topLeft: "end",
        bottomLeft: "start",
      },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.75,
      end: 1,
      cut: "X",
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.25,
      end: 0.5,
      cut: "X",
    });
  },
  shape6: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { bottomLeft: 0.5, topRight: 0.5 },
      positions: { bottomLeft: "end", topRight: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.75,
      end: 1.25,
      cut: "X",
    });
  },
  shape7: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        topRight: true,
      },
      fractions: { topLeft: 0.5, topRight: 0.5 },
      positions: { topLeft: "end", topRight: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.75,
      end: 1.5,
      cut: "X",
    });
  },
  shape8: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { topLeft: 0.5, topRight: 0.5 },
      positions: { topLeft: "start", topRight: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.5,
      end: 0.75,
      cut: "X",
    });
  },
  shape9: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: { bottomLeft: 0.5, topRight: 0.5 },
      positions: { topLeft: "start", topRight: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.25,
      end: 0.75,
      cut: "X",
    });
  },
  shapeA: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
      },
      fractions: {
        topLeft: 0.5,
        topRight: 0.5,
        bottomLeft: 0.5,
        bottomRight: 0.5,
      },
      positions: { topLeft: "start", topRight: "end", bottomLeft: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.5,
      end: 0.75,
      cut: "X",
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 1,
      end: 0.25,
      cut: "X",
    });
  },
  shapeB: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topRight: true,
        bottomRight: true,
      },
      fractions: { bottomRight: 0.5, topRight: 0.5 },
      positions: { bottomRight: "start", topRight: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0,
      end: 0.75,
      cut: "X",
    });
  },
  shapeC: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
      },
      fractions: { topLeft: 0.5, bottomRight: 0.5 },
      positions: { topLeft: "start", bottomRight: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.5,
      end: 1,
      cut: "X",
    });
  },
  shapeD: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        bottomLeft: true,
        bottomRight: true,
      },
      fractions: { bottomRight: 0.5, bottomLeft: 0.5 },
      positions: { bottomRight: "end", bottomLeft: "start" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.25,
      end: 1,
      cut: "X",
    });
  },
  shapeE: (ctx, x, y, size) => {
    drawTiltedSquare(ctx, x, y, size, {
      sides: {
        bottomLeft: true,
        topLeft: true,
      },
      fractions: { topLeft: 0.5, bottomLeft: 0.5 },
      positions: { topLeft: "start", bottomLeft: "end" },
    });
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0.5,
      end: 1.25,
      cut: "X",
    });
  },
  shapeF: (ctx, x, y, size) => {
    drawPartialCircle(ctx, x, y, size / 2, {
      start: 0,
      end: 1,
      cut: "X",
    });
  },
};
