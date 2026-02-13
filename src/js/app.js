if (import.meta.hot) {
  import.meta.hot.accept();
  console.log("Hot Module Replacement Occurred");
}


import Lenis from "lenis";


// Elevate CSS
import "../styles/elevate.css";


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


// Handle both normal load and Vite / HMR reloads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initLenis();
  });

} else {
  initLenis();
}
