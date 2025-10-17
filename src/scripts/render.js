const kolamData = [[]];
let canvasSize = 512;
let size = 600;

export default function renderKolam(ctx) {
  let centerX = canvasSize / 2,
    centerY = canvasSize / 2,
    kolamShapeSize = 32,
    startpx = (size - kolamData[0].length * kolamShapeSize) / 2,
    startpy = (size - kolamData.length * kolamShapeSize) / 2;

  console.log("startpx, py: ", startpx, startpy)
  for (let i = 0; i < kolamData.length; i++) {
    for (let j = 0; j < kolamData[i].length; j++) {
      startpx += kolamShapeSize;
    }
    startpy += kolamShapeSize;
  }
  console.log("end px, py: ", startpx, startpy)
  
}
