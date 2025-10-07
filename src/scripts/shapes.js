export function drawDia(ctx, x, y, size) {
  const angleRadians = (45 * Math.PI) / 180;
  ctx.fillStyle = "white"; // Set fill color for the square
  //ctx.save(); // Save the current canvas state
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2;
  //ctx.translate(centerX, centerY); // Translate to the center of the square
  //ctx.rotate(angleRadians); // Rotate the canvas
  //ctx.strokeRect(-size / 2, -size / 2, size, size); // Draw the square
  //ctx.restore(); // Restore the canvas state
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI, true); // Create a circle path
  ctx.arc(x, y, 4, 0, 2 * Math.PI, true); // Create a circle path
  ctx.fillStyle = "red"; // Set the fill color
  ctx.fill(); // Fill the circle

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke()

  const linesize = size - Math.PI * 9.5;
  const linesizeneg = linesize/3.5
  ctx.beginPath()
  ctx.moveTo(x + radius, y - linesizeneg)
  ctx.lineTo(x -linesizeneg, centerY)
  ctx.closePath();
  ctx.stroke();

  //drawShapeB(ctx, centerX, centerY, size - Math.PI * 9.5)
}


/**
 * Draws a quarter superellipse (corner) on a canvas.
 *
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
export function drawCornerSuperellipse(ctx, x, y, width, height, corner, a, b, n, opts = {}) {
  const { segments = 64, fill = false, stroke = true, closeToCorner = true } = opts;

  // Clamp radii so they don't exceed rectangle edges
  a = Math.min(Math.abs(a), width);
  b = Math.min(Math.abs(b), height);
  if (a === 0 || b === 0) return;

  // Base corner point and direction flips
  let baseX, baseY, signX, signY;
  switch (corner) {
    case 'tl': baseX = x;         baseY = y;         signX = +1; signY = +1; break;
    case 'tr': baseX = x + width; baseY = y;         signX = -1; signY = +1; break;
    case 'br': baseX = x + width; baseY = y + height;signX = -1; signY = -1; break;
    case 'bl': baseX = x;         baseY = y + height;signX = +1; signY = -1; break;
    default: throw new Error("corner must be 'tl','tr','br' or 'bl'");
  }

  // Parametric function for quarter superellipse in first quadrant (t from 0 -> PI/2)
  const px = (t) => a * Math.pow(Math.cos(t), 2 / n); // 0..a
  const py = (t) => b * Math.pow(Math.sin(t), 2 / n); // 0..b

  // Helper: transform local (px,py) into canvas coords depending on corner
  const toCanvas = (localX, localY) => {
    return [ baseX + signX * localX, baseY + signY * localY ];
  };

  // Points at the straight edges where curve meets rectangle edges
  const [startX, startY] = toCanvas(px(0), py(0));             // t = 0 -> (a, 0)
  const [endX, endY]     = toCanvas(px(Math.PI/2), py(Math.PI/2)); // t = PI/2 -> (0, b)
  const cornerX = baseX, cornerY = baseY;

  ctx.beginPath();

  if (fill) {
    // Build a closed polygon that includes the actual rectangle corner
    // Order: startEdgePoint -> corner -> cornerEdgePoint -> (curve from end back to start)
    ctx.moveTo(startX, startY);
    if (closeToCorner) ctx.lineTo(cornerX, cornerY); // straight to actual corner
    ctx.lineTo(endX, endY);

    // Draw the curved arc from t = PI/2 back to 0
    for (let i = 0; i <= segments; i++) {
      const t = Math.PI/2 - (i / segments) * (Math.PI/2);
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
      const t = (i / segments) * (Math.PI/2);
      const [cx, cy] = toCanvas(px(t), py(t));
      ctx.lineTo(cx, cy);
    }
    if (stroke) ctx.stroke();
  }
}





// shape A: teardrop
export function drawShapeA(ctx, x, y, size, fill = false) {
  const cx = x,
    cy = y;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size); // top center
  // right side curve to bottom point
  ctx.bezierCurveTo(
    cx + size * 1.05,
    cy - size * 0.15,
    cx + size * 0.45,
    cy + size * 1.05,
    cx,
    cy + size,
  );
  // left side back to top
  ctx.bezierCurveTo(
    cx - size * 0.45,
    cy + size * 1.05,
    cx - size * 1.05,
    cy - size * 0.15,
    cx,
    cy - size,
  );
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  ctx.stroke();
}

// Shape B: diamond
export function drawShapeB(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size); // top
  ctx.lineTo(x + size, y); // right
  ctx.lineTo(x, y + size); // bottom
  ctx.lineTo(x - size, y); // left
  ctx.closePath();
  ctx.stroke();
}

// Shape C: semicircle + line
export function drawShapeC(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, Math.PI * 1.5, Math.PI * 0.5, false); // right semicircle
  ctx.lineTo(x, y - size);
  ctx.closePath();
  ctx.stroke();
}

// Shape D: mirrored version of C
export function drawShapeD(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, Math.PI, 0, false); // top semicircle
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.stroke();
}

// Shape E: rotated semicircle + straight side
export function drawShapeE(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, Math.PI * 0.25, Math.PI * 1.25, false);
  ctx.lineTo(x, y - size);
  ctx.closePath();
  ctx.stroke();
}

// Shape F: circle
export function drawShapeF(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}

// Shape G: rotated square with curved top
export function drawShapeG(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y);
  ctx.arcTo(x, y - size, x - size, y, size);
  ctx.closePath();
  ctx.stroke();
}

// Shape H: diamond with arc top
export function drawShapeH(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y);
  ctx.arcTo(x, y - size, x - size, y, size);
  ctx.closePath();
  ctx.stroke();
}

// Shape I: leaf (two arcs)
export function drawShapeI(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.arc(x, y, size, Math.PI * 1.5, Math.PI * 0.5, false);
  ctx.arc(x, y, size, Math.PI * 0.5, Math.PI * 1.5, false);
  ctx.closePath();
  ctx.stroke();
}

// Shape J: diamond
export function drawShapeJ(ctx, x, y, size) {
  drawShapeB(ctx, x, y, size); // same as shape B
}
