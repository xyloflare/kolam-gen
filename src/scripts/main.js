import { initCanvas } from "./canvas_utils";
import renderKolam from "./render";

let ctx, size, ogsize;
export let canvasColor = "oklch(21% 0.034 264.665)";

window.addEventListener("load", () => {
  [ctx, size, ogsize] = initCanvas("canvas");
  if (document.documentElement.classList.contains("dark"))
    canvasColor = "white";

  renderKolam({
    ctx,
    canvasSize: size,
    kolamData: [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    colorAll: canvasColor,
  });
});

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      if (document.documentElement.classList.contains("dark")) {
        canvasColor = "white";
        renderKolam({colorAll: canvasColor});
      } else {
        canvasColor = "oklch(20% 0.034 264.665)";
        renderKolam({colorAll: canvasColor})
      }
    }
  }
});
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});
