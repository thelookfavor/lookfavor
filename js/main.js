/* ════════════════════════════════════════════
   LOOKFAVOR — main.js
════════════════════════════════════════════ */

/* ── CURSOR ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
  rx += (mx - rx) * .14; ry += (my - ry) * .14;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
})();


/* ── NAV compact on scroll ── */
const nav = document.getElementById('nav');
const navChapter = document.getElementById('nav-chapter');

window.addEventListener('scroll', () => {
  nav.classList.toggle('compact', window.scrollY > 60);
  updateChapter();
}, { passive: true });


/* ── CHAPTER TRACKER ── */
const scenes = document.querySelectorAll('[data-chapter-fr]');
function updateChapter() {
  let current = '';
  scenes.forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.top <= window.innerHeight * .5) {
      current = s.getAttribute(`data-chapter-${currentLang}`) || '';
    }
  });
  if (navChapter) navChapter.textContent = current;
}


/* ── LANGUAGE SYSTEM ── */
let currentLang = 'fr';

const translations = {
  fr: {
    calTitle: 'Sortie du livre « Entre Flammes & Silences »',
    calDesc:  'Nouveau livre de Gaétan Vermeire (LOOKFAVOR) — Prochainement disponible. lookfavor.com',
    book1CoverTitle: 'L\'ART DE<br>L\'INSTANT',
    book1CoverSub:   'Chronique d\'un pompier-photographe belge',
    modalPreTab: 'fr-links',
  },
  nl: {
    calTitle: 'Boekuitgave « Tussen Vlammen & Stiltes »',
    calDesc:  'Nieuw boek van Gaétan Vermeire (LOOKFAVOR) — Binnenkort beschikbaar. lookfavor.com',
    book1CoverTitle: 'DE KUNST VAN<br>HET OGENBLIK',
    book1CoverSub:   'Kronieken van een Belgische brandweerman-fotograaf',
    modalPreTab: 'nl-links',
  },
  en: {
    calTitle: 'Book Release « Between Flames & Silences »',
    calDesc:  'New book by Gaétan Vermeire (LOOKFAVOR) — Coming soon. lookfavor.com',
    book1CoverTitle: 'THE ART OF<br>THE INSTANT',
    book1CoverSub:   'Chronicle of a Belgian Firefighter-Photographer',
    modalPreTab: 'en-links',
  }
};

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Button states
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('on', b.dataset.lang === lang);
  });

  // data-XX attributes on all elements
  document.querySelectorAll(`[data-${lang}]`).forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  // Cover fallback
  const cft = document.getElementById('cf-title');
  const cfs = document.getElementById('cf-sub');
  if (cft) cft.innerHTML = translations[lang].book1CoverTitle;
  if (cfs) cfs.innerHTML = translations[lang].book1CoverSub;

  // Narrative panels — re-apply current step text
  applyStepLang(currentStep);

  // Nav chapter
  updateChapter();
}

// Language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});


/* ══════════════════════════════════════════
   SCROLL NARRATIVE — sticky book sequence
══════════════════════════════════════════ */
const stickyWrap  = document.getElementById('scene-narrative');
const stickyStage = document.querySelector('.sticky-stage');
const bookScene   = document.getElementById('book-scene');
const book3d      = document.getElementById('book-3d');
const bookShadow  = document.getElementById('book-shadow');
const sbgLight    = document.getElementById('sbg-light');
const stepDots    = document.querySelectorAll('.sdot');

const STEPS = 4;
let currentStep = -1;

// All narrative panels
const panels = {};
for (let i = 0; i < STEPS; i++) {
  panels[i] = document.getElementById(`np-${i}`);
}

function showStep(step) {
  if (step === currentStep) return;
  currentStep = step;

  // Update panels
  for (let i = 0; i < STEPS; i++) {
    const p = panels[i];
    if (!p) continue;
    if (i === step) {
      p.classList.remove('hidden');
      // Force reflow for transition
      p.offsetHeight;
      p.classList.add('visible');
    } else {
      p.classList.remove('visible');
      p.classList.add('hidden');
    }
  }

  // Dots
  stepDots.forEach(d => d.classList.toggle('active', +d.dataset.step === step));

  // Book transform
  applyBookTransform(step);
}

function applyBookTransform(step) {
  if (!book3d || !bookScene) return;

  const isMobile = window.innerWidth < 860;

  // Step 0 : centered, flat, front-facing
  // Step 1 : shifted left, slight tilt
  // Step 2 : more tilt, showing spine
  // Step 3 : back to center, dramatic

  const configs = isMobile ? [
    { sceneLeft: '50%',  sceneTop: '35%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(900px) rotateY(0deg) scale(1)',    bgOpacity: '.7' },
    { sceneLeft: '50%',  sceneTop: '30%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(900px) rotateY(-8deg) scale(.95)', bgOpacity: '.5' },
    { sceneLeft: '50%',  sceneTop: '30%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(900px) rotateY(-22deg) scale(.9)', bgOpacity: '.4' },
    { sceneLeft: '50%',  sceneTop: '30%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(900px) rotateY(0deg) scale(1)',    bgOpacity: '.8' },
  ] : [
    { sceneLeft: '50%',  sceneTop: '50%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(1100px) rotateY(0deg) scale(1)',     bgOpacity: '1' },
    { sceneLeft: '32%',  sceneTop: '50%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(1100px) rotateY(-15deg) scale(1.05)',bgOpacity: '.7' },
    { sceneLeft: '30%',  sceneTop: '50%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(1100px) rotateY(-28deg) scale(1.08)',bgOpacity: '.5' },
    { sceneLeft: '32%',  sceneTop: '50%', sceneTransform: 'translate(-50%,-50%)',        bookTransform: 'perspective(1100px) rotateY(-8deg) scale(1.12)', bgOpacity: '.8' },
  ];

  const cfg = configs[step] || configs[0];
  bookScene.style.left      = cfg.sceneLeft;
  bookScene.style.top       = cfg.sceneTop;
  bookScene.style.transform = cfg.sceneTransform;
  book3d.style.transform    = cfg.bookTransform;
  if (sbgLight) sbgLight.style.opacity = cfg.bgOpacity;

  // Shadow follows tilt
  if (bookShadow) {
    bookShadow.style.opacity = step === 3 ? '.9' : '.6';
    bookShadow.style.transform = `translateX(-50%) scaleX(${step >= 2 ? 1.3 : 1})`;
  }
}

function applyStepLang(step) {
  // Already handled by setLang's data-XX pass, but dots/label may need update
}

function handleNarrativeScroll() {
  if (!stickyWrap || !stickyStage) return;

  const rect = stickyWrap.getBoundingClientRect();
  const totalH = stickyStage.offsetHeight - window.innerHeight;
  const scrolled = -rect.top; // how far we've scrolled into the sticky section

  if (scrolled < 0 || scrolled > totalH + window.innerHeight) return;

  const progress = Math.max(0, Math.min(1, scrolled / totalH));
  const step = Math.min(STEPS - 1, Math.floor(progress * STEPS));

  showStep(step);
}

window.addEventListener('scroll', handleNarrativeScroll, { passive: true });
window.addEventListener('resize', () => applyBookTransform(currentStep), { passive: true });


/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .urow-item');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
revealEls.forEach(el => revealObs.observe(el));


/* ── HERO PARALLAX ── */
const heroBg = document.querySelector('.hero-bg, #scene-open .scene-bg');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroBg && sy < window.innerHeight) {
    heroBg.style.transform = `translateY(${sy * .28}px)`;
  }
}, { passive: true });


/* ── MODAL ── */
const modalVeil  = document.getElementById('modal-veil');
const modalClose = document.getElementById('modal-close');
const ctaBtn     = document.getElementById('cta-open-modal');

function openModal() {
  // Pre-select tab matching site language
  const tabMap = { fr: 'fr-links', nl: 'nl-links', en: 'en-links' };
  switchModalTab(tabMap[currentLang] || 'fr-links');
  modalVeil.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalVeil.classList.remove('open');
  document.body.style.overflow = '';
}

if (ctaBtn)     ctaBtn.addEventListener('click', openModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalVeil)  modalVeil.addEventListener('click', e => { if (e.target === modalVeil) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Modal tabs
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => switchModalTab(tab.dataset.tab));
});

function switchModalTab(tabId) {
  document.querySelectorAll('.mtab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.mlinks').forEach(m => m.classList.toggle('active', m.id === tabId));
}


/* ── CALENDAR (ICS download) ── */
const calBtn = document.getElementById('cta-calendar');
if (calBtn) {
  calBtn.addEventListener('click', () => {
    const t = translations[currentLang];
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LOOKFAVOR//Gaetan Vermeire//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:lookfavor-flammes-silences@lookfavor.com',
      'DTSTART;VALUE=DATE:20260101',
      'DTEND;VALUE=DATE:20260102',
      'SUMMARY:' + t.calTitle,
      'DESCRIPTION:' + t.calDesc,
      'URL:https://lookfavor.github.io',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'lookfavor-entre-flammes-silences.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}


/* ── INIT ── */
setLang('fr');
showStep(0);
