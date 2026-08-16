import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './experience.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';

const projects = [
  { number: '01', title: 'CanBook', type: 'PRODUCT / WEB', text: 'A canteen problem turned into a real product people can use.', href: 'https://canbook.vercel.app/', className: 'project-coral' },
  { number: '02', title: 'BridgeAI', type: 'AI / RESEARCH', text: 'Exploring how AI can make difficult information easier to understand.', href: 'https://bridge-ai-research--raevn.replit.app/', className: 'project-violet' },
];

const interests = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'DESIGN', 'RESEARCH', 'QUESTIONS', 'BUILDING'];
const nav = [
  ['01', 'HOME', 'home'],
  ['02', 'ABOUT', 'about'],
  ['03', 'BUILD', 'build'],
  ['04', 'OTHER TABS', 'tabs'],
  ['05', 'NOW', 'now'],
  ['06', 'TALK', 'talk'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('MOVE');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          entry.target.classList.add('seen');
        }
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site">
      <div className="noise" aria-hidden="true" />
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><span>{cursorText}</span></div>
      <div className="progress"><i style={{ transform: `scaleY(${progress})` }} /></div>

      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="Home">
          <span className="brand-mark">PS</span>
          <span>PRESHITA<br />SHINDE</span>
        </button>
        <span className="topline">A PERSONAL WEBSITE / 2026</span>
        <button className="index-button" onClick={() => setMenu(true)}>INDEX <b>+</b></button>
      </header>

      <aside className={`menu ${menu ? 'menu-open' : ''}`} aria-hidden={!menu}>
        <div className="menu-top"><span>YOU ARE HERE.</span><button onClick={() => setMenu(false)}>CLOSE ×</button></div>
        <div className="menu-title">PRESHITA'S<br /><em>INTERNET.</em></div>
        <nav>{nav.map(([number, label, id]) => (
          <button key={id} onClick={() => go(id)} className={active === id ? 'nav-active' : ''}>
            <small>{number}</small><strong>{label}</strong><span>↗</span>
          </button>
        ))}</nav>
        <a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
      </aside>

      <main>
        <section id="home" data-section className="world world-home">
          <div className="sky-grid" />
          <div className="sun" />
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="home-copy">
            <p className="eyebrow">WELCOME TO MY SIDE OF THE INTERNET</p>
            <h1>PRESHITA<br /><i>SHINDE</i></h1>
            <div className="home-lines"><span>I BUILD THINGS.</span><span>I ASK QUESTIONS.</span><span>I FOLLOW RABBIT HOLES.</span></div>
          </div>
          <figure className="portrait" onMouseEnter={() => setCursorText('THAT’S ME')} onMouseLeave={() => setCursorText('MOVE')}>
            <div className="portrait-frame"><img src={PHOTO} alt="Preshita Shinde" /><span>PS / 01</span></div>
            <figcaption>human / curious / currently online</figcaption>
          </figure>
          <div className="home-stamp">PS<br /><em>ONLINE</em></div>
          <div className="home-coords">24.4539° N / 54.3773° E<br />ABU DHABI / UAE</div>
          <button className="enter" onClick={() => go('about')}>ENTER THE SITE ↓</button>
        </section>

        <section className="portal portal-blue" aria-hidden="true"><div className="portal-type">KEEP<br /><i>GOING.</i></div><span>SCROLL TO CHANGE WORLDS</span></section>

        <section id="about" data-section className="world world-about">
          <div className="section-meta"><span>02</span><b>ABOUT / SHORT VERSION</b><span>01—06</span></div>
          <div className="about-copy">
            <p className="eyebrow">I'M NOT VERY GOOD AT BOXES.</p>
            <h2>I LIKE<br /><i>QUESTIONS.</i></h2>
            <p className="body-copy">I'm curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p>
            <p className="body-copy">I care more about <i>what could be</i> than having the perfect label for what I am.</p>
          </div>
          <div className="floating-note">01 / THE OBVIOUS<br /><strong>IS RARELY<br /><i>ENOUGH.</i></strong><small>pull the thread →</small></div>
          <div className="question-mark">?</div>
          <div className="ticker">CURIOUS · HUMAN · EXPERIMENTAL · A LITTLE CHAOTIC · CURIOUS · HUMAN · EXPERIMENTAL ·</div>
        </section>

        <section className="portal portal-paper" aria-hidden="true"><div className="window-card"><span>things-i-build://</span><b>— □ ×</b><div className="window-line" /></div><div className="portal-type">THINGS<br /><i>I BUILD.</i></div></section>

        <section id="build" data-section className="world world-build">
          <div className="section-meta"><span>03</span><b>BUILD / LIVE PROJECTS</b><span>OPEN ↗</span></div>
          <div className="build-heading"><div><p className="eyebrow">MADE IT OUT OF MY HEAD.</p><h2>I BUILD<br /><i>THINGS.</i></h2></div><p>Real projects. Real links. Click them. Break them. Tell me what you think.</p></div>
          <div className="projects">
            {projects.map((project) => (
              <a key={project.number} className={`project ${project.className}`} href={project.href} target="_blank" rel="noreferrer" onMouseEnter={() => setCursorText('OPEN ↗')} onMouseLeave={() => setCursorText('MOVE')}>
                <div className="project-top"><span>{project.number} / {project.type}</span><b>↗</b></div>
                <div className="project-body"><div><h3>{project.title}</h3><p>{project.text}</p><span className="visit">VISIT PROJECT ↗</span></div><div className="project-world"><span>{project.number}</span><i /></div></div>
              </a>
            ))}
          </div>
        </section>

        <section className="portal portal-pink" aria-hidden="true"><div className="portal-type">OTHER<br /><i>TABS.</i></div><div className="marquee">MUN · TEDx · HORROR · FASHION · MAKEUP · PEOPLE · STORIES · DESIGN · AI · RESEARCH ·</div></section>

        <section id="tabs" data-section className="world world-tabs">
          <div className="section-meta"><span>04</span><b>OTHER TABS / RABBIT HOLES</b><span>HOVER THEM</span></div>
          <div className="tabs-heading"><p className="eyebrow">MY BRAIN IS</p><h2>OPEN<br /><i>24 / 7.</i></h2><p>None of these are skills.<br />They're rabbit holes.</p></div>
          <div className="interest-cloud">{interests.map((item, index) => <span key={item} style={{ '--i': index }} onMouseEnter={() => setCursorText(item)} onMouseLeave={() => setCursorText('MOVE')}>{item}</span>)}</div>
          <div className="tabs-bottom">MUN → TEDx → HEAD GIRL → BUILDING → RESEARCH → PEOPLE → STORIES →</div>
        </section>

        <section className="portal portal-dark" aria-hidden="true"><div className="dark-sun" /><div className="portal-type">RIGHT<br /><i>NOW →</i></div></section>

        <section id="now" data-section className="world world-now">
          <div className="section-meta"><span>05</span><b>NOW / LIVE SNAPSHOT</b><span>2026</span></div>
          <div className="now-heading"><p className="eyebrow">CURRENTLY SOMEWHERE BETWEEN</p><h2>BUILDING<br /><i>AND</i><br />FIGURING<br />IT OUT.</h2></div>
          <div className="now-grid">
            <div><small>BUILDING</small><strong>CANBOOK</strong><span>product / web</span></div>
            <div><small>EXPLORING</small><strong>AI + HUMAN SYSTEMS</strong><span>research / questions</span></div>
            <div><small>DOING</small><strong>MUN / TEDx / PEOPLE</strong><span>leading / listening</span></div>
            <div><small>WATCHING</small><strong>HORROR MOVIES</strong><span>excellent decisions</span></div>
          </div>
        </section>

        <section className="portal portal-end" aria-hidden="true"><div className="terminal"><span>preshita@internet:~$</span><strong>./say-goodbye</strong><i>thanks for visiting.</i></div></section>

        <section id="talk" data-section className="world world-talk">
          <div className="section-meta"><span>06</span><b>CONTACT / END OF INTERNET</b><span>PS / 2026</span></div>
          <div className="talk-heading"><p className="eyebrow">YOU FOUND ME.</p><h2>LET'S<br /><i>TALK.</i></h2></div>
          <a className="email-link" href="mailto:preshitashinde09@gmail.com" onMouseEnter={() => setCursorText('EMAIL ↗')} onMouseLeave={() => setCursorText('MOVE')}>preshitashinde09@gmail.com <b>↗</b></a>
          <div className="talk-footer"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END.</span></div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
