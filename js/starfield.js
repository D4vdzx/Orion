/* =====================================================================
   Fondo de estrellas sutil con parpadeo, inspirado en la imagen "estetica".
   Ligero, sin dependencias, y respeta prefers-reduced-motion.
   ===================================================================== */
(() => {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let stars = [];
  let width, height;

  const STAR_DENSITY = 9000; // 1 estrella cada N px² aprox.

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.round((width * height) / STAR_DENSITY);
    stars = Array.from({ length: count }, createStar);
  }

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.004,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      const alpha = reduceMotion
        ? star.baseAlpha
        : star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(202, 197, 235, ${Math.max(alpha, 0)})`;
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();
