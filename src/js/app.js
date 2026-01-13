if (import.meta.hot) {
  import.meta.hot.accept();
  console.log("Hot Module Replacement Occurred");
}

import Glide from "@glidejs/glide";

// Paint Effects
import "./paint.js";
import "./paintflood.js";
import "./drift.js";

//Navigation Handling
import "./navigation.js"

// Elevate CSS
import "../styles/elevate.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";

const slideGap = 30;
let glideInstance = null;

function initGlide() {
  const root = document.querySelector(".glide");
  if (!root) {
    console.warn("No .glide root found");
    return;
  }

  const firstSlideEl = root.querySelector(".glide__slide");
  if (!firstSlideEl) {
    console.warn("No .glide__slide found");
    return;
  }

  const width = firstSlideEl.getBoundingClientRect().width || 0;
  console.log("firstwidth", width);

  glideInstance = new Glide(root, {
    type: "carousel",
    perView: 1,
    gap: slideGap,
    peek: {
      before: 0,
      // Desktop peek based on actual slide width
      after: width * 0.3,
    },
    breakpoints: {
      1024: {
        gap: 24,
        peek: { before: 0, after: 80 },
      },
      768: {
        gap: 20,
        peek: { before: 0, after: 60 },
      },
      480: {
        gap: 16,
        peek: { before: 0, after: 40 },
      },
    },
  });

  glideInstance.mount();
}

// Handle both normal load and Vite / HMR reloads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlide);
} else {
  initGlide();
}

// Optional: keep peek in sync on resize for more fluid layouts
window.addEventListener("resize", () => {
  if (!glideInstance) return;

  const firstSlideEl = document.querySelector(".glide__slide");
  if (!firstSlideEl) return;

  const w = firstSlideEl.getBoundingClientRect().width || 0;
  glideInstance.update({
    peek: {
      before: 0,
      after: w * 0.3,
    },
  });
});
