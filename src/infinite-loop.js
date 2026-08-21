(() => {
  let busy = false;
  const wrap = () => {
    if (busy) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max < innerHeight * 2) return;
    const y = scrollY;
    if (y > max - innerHeight * 0.35) {
      busy = true;
      scrollTo({ top: Math.round(max * 0.28), behavior: 'instant' });
      requestAnimationFrame(() => { busy = false; });
    } else if (y < innerHeight * 0.15 && performance.now() > 1200) {
      busy = true;
      scrollTo({ top: Math.round(max * 0.72), behavior: 'instant' });
      requestAnimationFrame(() => { busy = false; });
    }
  };
  addEventListener('scroll', wrap, { passive: true });
})();
