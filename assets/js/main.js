(function () {
  const c = document.getElementById("bg");
  const ctx = c.getContext("2d");
  let W, H, dots;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  function resize() {
    W = c.width = innerWidth * dpr;
    H = c.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  function reset() {
    dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    dots.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 120);
      g.addColorStop(0, "rgba(88,166,255,0.08)");
      g.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 120, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  addEventListener("resize", resize);
  resize();
  reset();
  frame();
})();
