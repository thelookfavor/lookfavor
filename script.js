const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const stage = document.querySelector('.cinematic-stage');
const book = document.querySelector('.book-object');
const copyBlocks = document.querySelectorAll('.scene-copy');

function updateCinematicScene() {
  if (!stage || !book) return;

  const rect = stage.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = clamp(-rect.top / scrollable, 0, 1);

  const rotate = -34 + progress * 104;
  const tilt = 8 - progress * 12;
  const scale = 0.78 + progress * 0.34;
  const y = Math.sin(progress * Math.PI) * -28;

  book.style.setProperty('--book-rotate', `${rotate}deg`);
  book.style.setProperty('--book-tilt', `${tilt}deg`);
  book.style.setProperty('--book-scale', `${scale}`);
  book.parentElement.style.transform = `translate3d(0, ${y}px, 0)`;

  copyBlocks.forEach((copy, index) => {
    const start = index * 0.25 + 0.08;
    const end = start + 0.28;
    const local = clamp((progress - start) / (end - start), 0, 1);
    const fadeOut = clamp((progress - end) / 0.12, 0, 1);
    const opacity = local * (1 - fadeOut);
    const translate = 30 - local * 30 + fadeOut * -18;
    copy.style.setProperty('--copy-opacity', opacity.toFixed(3));
    copy.style.setProperty('--copy-y', `${translate}px`);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('scroll', updateCinematicScene, { passive: true });
window.addEventListener('resize', updateCinematicScene);
updateCinematicScene();
