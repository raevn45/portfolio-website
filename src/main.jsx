import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './experience.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';

const projects = [
  { number: '01', title: 'CanBook', type: 'PRODUCT / WEB', text: 'A canteen problem turned into a real product people can use.', href: 'https://canbook.vercel.app/', accent: 'coral' },
  { number: '02', title: 'BridgeAI', type: 'AI / RESEARCH', text: 'Exploring how AI can make difficult information easier to understand.', href: 'https://bridge-ai-research--raevn.replit.app/', accent: 'violet' },
];

const tabs = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'DESIGN', 'RESEARCH', 'QUESTIONS', 'BUILDING'];
const navItems = [['01', 'HOME', 'home'], ['02', 'ABOUT', 'about'], ['03', 'BUILD', 'build'], ['04', 'TABS', 'tabs'], ['05', 'NOW', 'now'], ['06', 'TALK', 'talk']];

function App() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState('MOVE');
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const shell = useRef(null);

  const nav = useMemo(() => navItems, []);

  useEffect(() => {
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const sections = [...document.querySelectorAll('[data-section]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site" ref={shell}>
      <div className="grain" aria-hidden="true" />
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><span>{cursorLabel}</span></div>
      <div className="scroll-meter"><i style={{ transform: `scaleY(${progress})` }} /></div>

      <header className="topbar">
        <button className="logo" onClick={() => go('home')} onMouseEnter={() => setCursorLabel('HOME')} onMouseLeave={() => setCursorLabel('MOVE')} aria-label="Back to home">
          <span className="logo-mark">PS</span><span className="logo-name">PRESHITA<br />SHINDE</span>
        </button>
        <div className="top-center">A PERSONAL WEBSITE / 2026</div>
        <button className="menu-trigger" onClick={() => setMenu(true)} onMouseEnter={() => setCursorLabel('OPEN')} onMouseLeave={() => setCursorLabel('MOVE')}>INDEX <b>+</b></button>
      </header>

      <aside className={`menu ${menu ? 'open' : ''}`}>
        <div className="menu-top"><span>YOU ARE HERE.</span><button onClick={() => setMenu(false)}>CLOSE ×</button></div>
        <div className="menu-title">PRESHITA'S<br /><em>INTERNET.</em></div>
        <nav>{nav.map(([number, label, id]) => <button key={id} onClick={() => go(id)}><small>{number}</small><strong>{label}</strong><span>↗</span></button>)}</nav>
        <a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
      </aside>

      <main>
        <section id="home" data-section className="room hero">
          <div className="hero-grid" />
          <div className="hero-orb" />
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-stamp">PRESHITA<br />SHINDE<br /><em>ONLINE</em></div>
          <div className="hero-coords">24.4539° N / 54.3773° E<br />ABU DHABI / UAE</div>
          <div className="hero-copy">
            <p className="eyebrow">WELCOME TO MY SIDE OF THE INTERNET</p>
            <h1>PRESHITA<br /><i>SHINDE</i></h1>
            <div className="hero-sub"><span>I BUILD THINGS.</span><span>I ASK QUESTIONS.</span><span>I FOLLOW RABBIT HOLES.</span></div>
          </div>
          <figure className="hero-photo" onMouseEnter={() => setCursorLabel('THAT’S ME')} onMouseLeave={() => setCursorLabel('MOVE')}>
            <div className="photo-frame"><img src={PHOTO} alt="Preshita Shinde" /><span>PS / 01</span></div>
            <figcaption>human / curious / currently online</figcaption>
          </figure>
          <div className="hero-bottom"><span>AI · PEOPLE · PRODUCTS · RESEARCH</span><button onClick={() => go('about')}>ENTER ↓</button></div>
        </section>

        <section className="bridge bridge-blue" aria-hidden="true"><div className="bridge-word">HELLO<br /><i>WORLD.</i></div><span>KEEP SCROLLING / THE PAGE CHANGES WITH YOU</span></section>

        <section id="about" data-section className="room about">
          <div className="section-meta"><span>02</span><b>ABOUT / SHORT VERSION</b><span>READ / LOOK / MOVE</span></div>
          <div className="about-doodles"><span>?</span><span>→</span><span>✦</span></div>
          <div className="about-head"><p className="eyebrow">I'M NOT VERY GOOD AT BOXES.</p><h2>I LIKE<br /><i>QUESTIONS.</i></h2></div>
          <div className="about-copy"><p>I'm curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p><p>I care more about <i>what could be</i> than having the perfect label for what I am.</p></div>
          <div className="about-card"><span>01 / THE OBVIOUS</span><strong>IS<br />RARELY<br /><i>ENOUGH.</i></strong><small>pull the thread →</small></div>
          <div className="ticker">CURIOUS / HUMAN / EXPERIMENTAL / A LITTLE CHAOTIC / CURIOUS / HUMAN / EXPERIMENTAL / A LITTLE CHAOTIC /</div>
        </section>

        <section className="bridge bridge-paper" aria-hidden="true"><div className="paper-window"><span>things-i-build://</span><b>— □ ×</b></div><div className="bridge-word">THINGS<br /><i>I BUILD.</i></div></section>

        <section id="build" data-section className="room build">
          <div className="section-meta"><span>03</span><b>BUILD / OPEN A PROJECT</b><span>LIVE LINKS ↗</span></div>
          <div className="build-intro"><div><p className="eyebrow">MADE IT OUT OF MY HEAD.</p><h2>I BUILD<br /><i>THINGS.</i></h2></div><p>Real projects. Real links. No project-shaped paragraphs pretending to be products.</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project ${project.accent}`} href={project.href} target="_blank" rel="noreferrer" key={project.number} onMouseEnter={() => setCursorLabel('OPEN ↗')} onMouseLeave={() => setCursorLabel('MOVE')}>
                <div className="project-top"><span>{project.number} / {project.type}</span><b>↗</b></div>
                <div className="project-main"><div className="project-title"><h3>{project.title}</h3><p>{project.text}</p><span>VISIT PROJECT ↗</span></div><div className="project-art"><span>{project.number}</span><i /></div></div>
              </a>
            ))}
          </div>
        </section>

        <section className="bridge bridge-pink" aria-hidden="true"><div className="bridge-word">OTHER<br /><i>TABS.</i></div><div className="marquee">MUN · TEDx · HORROR · FASHION · MAKEUP · PEOPLE · STORIES · DESIGN · AI · RESEARCH ·</div></section>

        <section id="tabs" data-section className="room tabs">
          <div className="section-meta"><span>04</span><b>OTHER TABS / RABBIT HOLES</b><span>MOVE YOUR CURSOR</span></div>
          <div className="tabs-copy"><p className="eyebrow">MY BRAIN IS</p><h2>OPEN<br /><i>24 / 7.</i></h2><p>None of these are skills.<br />They're rabbit holes.</p></div>
          <div className="tab-cloud">{tabs.map((tab, index) => <span key={tab} style={{ '--n': index }} onMouseEnter={() => setCursorLabel(tab)} onMouseLeave={() => setCursorLabel('MOVE')}>{tab}</span>)}</div>
          <div className="tabs-note">MUN → TEDx → HEAD GIRL → BUILDING → RESEARCH → PEOPLE → STORIES →</div>
        </section>

        <section className="bridge bridge-dark" aria-hidden="true"><div className="dark-grid" /><div className="bridge-word">RIGHT<br /><i>NOW →</i></div></section>

        <section id="now" data-section className="room now">
          <div className="section-meta"><span>05</span><b>NOW / LIVE SNAPSHOT</b><span>2026</span></div>
          <div className="now-head"><p className="eyebrow">CURRENTLY SOMEWHERE BETWEEN</p><h2>BUILDING<br /><i>AND</i><br />FIGURING<br />IT OUT.</h2></div>
          <div className="now-grid">
            <div><small>BUILDING</small><strong>CANBOOK</strong><span>product / web</span></div>
            <div><small>EXPLORING</small><strong>AI + HUMAN SYSTEMS</strong><span>research / questions</span></div>
            <div><small>DOING</small><strong>MUN / TEDx / PEOPLE</strong><span>leading / listening</span></div>
            <div><small>WATCHING</small><strong>HORROR MOVIES</strong><span>excellent decisions</span></div>
          </div>
        </section>

        <section className="bridge bridge-end" aria-hidden="true"><div className="terminal"><span>preshita@internet:~$</span><strong>./say-goodbye</strong><i>thanks for visiting.</i></div></section>

        <section id="talk" data-section className="room talk">
          <div className="section-meta"><span>06</span><b>CONTACT / END OF INTERNET</b><span>PS / 2026</span></div>
          <div className="talk-content"><div><p className="eyebrow">YOU FOUND ME.</p><h2>LET'S<br /><i>TALK.</i></h2></div><a href="mailto:preshitashinde09@gmail.com" onMouseEnter={() => setCursorLabel('EMAIL ↗')} onMouseLeave={() => setCursorLabel('MOVE')}>preshitashinde09@gmail.com <b>↗</b></a></div>
          <div className="talk-footer"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END.</span></div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
