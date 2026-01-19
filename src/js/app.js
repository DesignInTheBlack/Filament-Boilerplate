if (import.meta.hot) {
  import.meta.hot.accept();
  console.log("Hot Module Replacement Occurred");
}

import Glide from "@glidejs/glide";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import Lenis from "lenis";

// Paint Effects
import "./paint.js";
import "./paintflood.js";

//Navigation Handling
import "./navigation.js";

// Elevate CSS
import "../styles/elevate.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";

const slideGap = 30;
let glideInstance = null;

// Masonry instances for HMR cleanup
const masonryInstances = [];

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

function initLenis() {
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.08,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}



function initMasonry() {
  document.querySelectorAll("[data-masonry]").forEach((grid) => {
    // prevent double init (HMR safe)
    if (grid.dataset.masonryInit === "1") return;
    grid.dataset.masonryInit = "1";

    const minCol = 260; // <-- choose what "requires it" means
    const getGap = () =>
      parseFloat(getComputedStyle(grid).getPropertyValue("--gap")) || 16;

    const msnry = new Masonry(grid, {
      itemSelector: ".masonry-item",
      columnWidth: ".masonry-sizer",
      percentPosition: true,
      gutter: getGap(),
      transitionDuration: 0, // remove if you want animation
    });

    // Decide 3 -> 2 -> 1 purely from available width
    const setCols = () => {
      const gap = getGap();
      const w = grid.clientWidth;

      // How many min-width columns fit, capped to 3
      const cols = Math.max(1, Math.min(3, Math.floor((w + gap) / (minCol + gap))));

      grid.style.setProperty("--cols", cols);

      // keep gutter in sync with CSS var
      msnry.options.gutter = gap;

      msnry.reloadItems();
      msnry.layout();
    };

    // Debounced relayout for resize changes
    let raf = 0;
    const requestSetCols = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setCols);
    };

    // Recompute when container size changes (better than window resize)
    const ro = new ResizeObserver(requestSetCols);
    ro.observe(grid);

    // Layout as images load (lazy loading, slow connections)
    const il = imagesLoaded(grid);
    il.on("progress", () => msnry.layout());
    il.on("always", () => msnry.layout());

    // Initial pass
    setCols();
  });
}

function initGalleryDrawers() {
  document.querySelectorAll(".gallery-drawer").forEach((drawer) => {
    if (drawer.dataset.drawerAnimInit === "1") return;
    drawer.dataset.drawerAnimInit = "1";

    const content = drawer.querySelector(":scope > div");
    if (!content) return;

    if (drawer.open) {
      content.style.height = "auto";
    } else {
      content.style.height = "0px";
    }

    drawer.addEventListener("toggle", () => {
      const isOpen = drawer.open;
      const startHeight = content.getBoundingClientRect().height;
      const endHeight = isOpen ? content.scrollHeight : 0;

      content.style.height = `${startHeight}px`;
      content.getBoundingClientRect();
      content.style.height = `${endHeight}px`;

      const onEnd = (event) => {
        if (event.propertyName !== "height") return;
        content.removeEventListener("transitionend", onEnd);
        if (isOpen) {
          content.style.height = "auto";
        }
      };

      content.addEventListener("transitionend", onEnd);
    });
  });
}




// Handle both normal load and Vite / HMR reloads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initGlide();
    initLenis();
    initMasonry();
    initGalleryDrawers();
  });
} else {
  initGlide();
  initLenis();
  initMasonry();
  initGalleryDrawers();
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

// Masonry HMR cleanup only (does not touch Glide)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    masonryInstances.forEach((m) => m.destroy());
    masonryInstances.length = 0;

    document.querySelectorAll("[data-masonry]").forEach((grid) => {
      delete grid.dataset.masonryInit;
    });
  });
}
