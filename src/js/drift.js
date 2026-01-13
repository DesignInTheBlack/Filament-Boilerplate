(() => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const CLASS = "-bg-drift";
  const els = Array.from(document.querySelectorAll(`.${CLASS}`));
  if (!els.length) return;

  // Defaults: very subtle and very slow
  const defaults = {
    min: 100,       // % background-size at zoomed-out
    max: 115,       // % background-size at zoomed-in
    period: 75000, // ms for a full in+out cycle (5 minutes)
    ease: 1.25      // >1 = slower near ends, more "breathing"
  };

  const parseBgSizePercent = (el) => {
    const cs = getComputedStyle(el);
    const bs = (cs.backgroundSize || "").trim();

    // If it's already percent like "120%" or "120% 120%"
    const m = bs.match(/^([\d.]+)%/);
    return m ? parseFloat(m[1]) : null;
  };

  const items = els.map((el) => {
    // Per-element overrides:
    // data-min="112" data-max="116" data-period="240000" data-ease="1.4"
    const min = parseFloat(el.dataset.min ?? defaults.min);
    const max = parseFloat(el.dataset.max ?? defaults.max);
    const period = parseFloat(el.dataset.period ?? defaults.period);
    const ease = parseFloat(el.dataset.ease ?? defaults.ease);

    // If element already has background-size in %, use that as baseline for min/max
    const existing = parseBgSizePercent(el);
    const minFinal = existing != null ? existing : min;
    const maxFinal = existing != null ? Math.max(existing, max) : max;

    // Helps smooth updates
    el.style.willChange = "background-size";

    // Make sure there's a background to animate (no-op otherwise)
    // Also set an initial size so there’s no pop
    el.style.backgroundSize = `${minFinal}%`;

    return { el, min: minFinal, max: maxFinal, period, ease, active: true };
  });

  // Pause offscreen for perf
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const it = items.find((x) => x.el === e.target);
      if (it) it.active = e.isIntersecting;
    }
  }, { threshold: 0.01 });

  items.forEach((it) => io.observe(it.el));

  const t0 = performance.now();

  // 0..1..0 "breathing" curve using cosine, optionally sharpened with ease power
  const breathe = (u, easePow) => {
    const c = 0.5 - 0.5 * Math.cos(u * 2 * Math.PI); // 0..1
    return Math.pow(c, easePow);
  };

  const tick = (t) => {
    const dt = t - t0;

    for (const it of items) {
      if (!it.active) continue;

      const u = (dt % it.period) / it.period;     // 0..1 over full cycle
      const b = breathe(u, it.ease);              // 0..1 eased
      const size = it.min + (it.max - it.min) * b;

      it.el.style.backgroundSize = `${size.toFixed(3)}%`;
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
})();
