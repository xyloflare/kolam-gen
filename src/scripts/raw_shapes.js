/**
 * Draws a quarter superellipse (corner) on a canvas.
 * @param {CanvasRenderingContext2D} ctx - CanvasRenderingContext2D
 * @param {number} x - x of the rectangle's top-left
 * @param {number} y - y of the rectangle's top-left
 * @param {number} width - width of the rectangle containing the corner
 * @param {number} height - height of the rectangle containing the corner
 * @param {'tl'|'tr'|'br'|'bl'} corner - which corner: 'tl'|'tr'|'br'|'bl'
 * @param {number} a - radius along x-axis (px) for the corner superellipse
 * @param {number} b - radius along y-axis (px) for the corner superellipse
 * @param {number} n - exponent (2 for ellipse, larger -> closer to rectangle; <2 -> rounder)
 * @param {Object} [opts] - options: {segments=64, fill=true, stroke=false, closeToCorner=true}
 */
export function drawCornerSuperellipse(
  ctx,
  x,
  y,
  width,
  height,
  corner,
  a,
  b,
  n,
  opts = {},
) {
  const {
    segments = 64,
    fill = false,
    stroke = true,
    closeToCorner = true,
  } = opts;

  // Clamp radii so they don't exceed rectangle edges
  a = Math.min(Math.abs(a), width);
  b = Math.min(Math.abs(b), height);
  if (a === 0 || b === 0) return;

  // Base corner point and direction flips
  let baseX, baseY, signX, signY;
  switch (corner) {
    case "tl":
      baseX = x;
      baseY = y;
      signX = +1;
      signY = +1;
      break;
    case "tr":
      baseX = x + width;
      baseY = y;
      signX = -1;
      signY = +1;
      break;
    case "br":
      baseX = x + width;
      baseY = y + height;
      signX = -1;
      signY = -1;
      break;
    case "bl":
      baseX = x;
      baseY = y + height;
      signX = +1;
      signY = -1;
      break;
    default:
      throw new Error("corner must be 'tl','tr','br' or 'bl'");
  }

  // Parametric function for quarter superellipse in first quadrant (t from 0 -> PI/2)
  const px = (t) => a * Math.pow(Math.cos(t), 2 / n); // 0..a
  const py = (t) => b * Math.pow(Math.sin(t), 2 / n); // 0..b

  // Helper: transform local (px,py) into canvas coords depending on corner
  const toCanvas = (localX, localY) => {
    return [baseX + signX * localX, baseY + signY * localY];
  };

  // Points at the straight edges where curve meets rectangle edges
  const [startX, startY] = toCanvas(px(0), py(0)); // t = 0 -> (a, 0)
  const [endX, endY] = toCanvas(px(Math.PI / 2), py(Math.PI / 2)); // t = PI/2 -> (0, b)
  const cornerX = baseX,
    cornerY = baseY;

  ctx.beginPath();

  if (fill) {
    // Build a closed polygon that includes the actual rectangle corner
    // Order: startEdgePoint -> corner -> cornerEdgePoint -> (curve from end back to start)
    ctx.moveTo(startX, startY);
    if (closeToCorner) ctx.lineTo(cornerX, cornerY); // straight to actual corner
    ctx.lineTo(endX, endY);

    // Draw the curved arc from t = PI/2 back to 0
    for (let i = 0; i <= segments; i++) {
      const t = Math.PI / 2 - (i / segments) * (Math.PI / 2);
      const [cx, cy] = toCanvas(px(t), py(t));
      ctx.lineTo(cx, cy);
    }

    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  } else {
    // Stroke-only curve from start to end
    ctx.moveTo(startX, startY);
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * (Math.PI / 2);
      const [cx, cy] = toCanvas(px(t), py(t));
      ctx.lineTo(cx, cy);
    }
    if (stroke) ctx.stroke();
  }
}

export function drawPartialCircle(ctx, x, y, r, options = {}) {
  // options: { start: 0, end: 0.25, cut: 'X' | '+' }
  // 'X' means quarters are diagonally divided (45°, 135°, etc.)
  // '+' means quarters are top/bottom/left/right (0°, 90°, etc.)

  const { start = 0, end = 1, cut = "X" } = options;
  const offset = cut === "X" ? Math.PI / 4 : 0;
  const startAngle = 2 * Math.PI * start + offset;
  const endAngle = 2 * Math.PI * end + offset;

  ctx.beginPath();
  ctx.arc(x, y, r, startAngle, endAngle);
  ctx.stroke();
}

export function drawTiltedSquare(ctx, x, y, size, options = {}) {
  const s2 = size / Math.sqrt(2); // offset from center to corners
  const points = [
    { name: "top", x: x, y: y - s2 },
    { name: "right", x: x + s2, y: y },
    { name: "bottom", x: x, y: y + s2 },
    { name: "left", x: x - s2, y: y },
  ];

  const sideNames = ["topRight", "bottomRight", "bottomLeft", "topLeft"];
  const { sides = {}, fractions = {}, positions = {} } = options;

  ctx.beginPath();

  for (let i = 0; i < 4; i++) {
    const a = points[i];
    const b = points[(i + 1) % 4];
    const sideName = sideNames[i];

    if (!sides[sideName]) continue;

    // Determine fraction of line to draw (default full line)
    let fraction = Math.min(Math.max(fractions[sideName] ?? 1, 0), 1);

    // Determine position range
    let startFrac = 0;
    let endFrac = fraction;

    const pos = positions[sideName];
    if (pos === "end") {
      startFrac = 1 - fraction;
      endFrac = 1;
    } else if (Array.isArray(pos) && pos.length === 2) {
      // explicit [start, end] fraction range
      startFrac = Math.min(Math.max(pos[0], 0), 1);
      endFrac = Math.min(Math.max(pos[1], 0), 1);
    }

    const dx = b.x - a.x;
    const dy = b.y - a.y;

    ctx.moveTo(a.x + dx * startFrac, a.y + dy * startFrac);
    ctx.lineTo(a.x + dx * endFrac, a.y + dy * endFrac);
  }
  ctx.stroke();
}

export function drawDot(ctx, x, y, size = 3, color = 'white') {
  ctx.fillStyle = color; 
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, false); // Draw a full circle
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'white';
}

// -----
function drawDia(ctx, x, y, size) {
  const angleRadians = (45 * Math.PI) / 180;
  ctx.fillStyle = "white"; // Set fill color for the square
  //ctx.save(); // Save the current canvas state
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI, true); // Create a circle path
  ctx.arc(x, y, 4, 0, 2 * Math.PI, true); // Create a circle path
  ctx.fillStyle = "red"; // Set the fill color
  ctx.fill(); // Fill the circle

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  const linesize = size - Math.PI * 9.5;
  const linesizeneg = linesize / 3.5;
  ctx.beginPath();
  ctx.moveTo(x + radius, y - linesizeneg);
  ctx.lineTo(x - linesizeneg, centerY);
  ctx.closePath();
  ctx.stroke();
}
