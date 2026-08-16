import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { id: '01', name: 'CanBook', type: 'PRODUCT / WEB', year: '2026', note: 'A better way to pre-order school food.', url: 'https://github.com/raevn45/CanBook', accent: 'CAN', detail: '01 — PRODUCT' },
  { id: '02', name: 'BridgeAI', type: 'AI / RESEARCH', year: '2026', note: 'Human–AI interaction, accessibility, comprehension.', url: 'https://github.com/raevn45/BridgeAI', accent: 'AI', detail: '02 — AI' },
  { id: '03', name: 'BridgeAI Research', type: 'RESEARCH / ML', year: '2026', note: 'Exploring what generalisation actually means.', url: 'https://github.com/raevn45/BridgeAI-Research', accent: 'R', detail: '03 — RESEARCH' },
];

const interests = ['AI', 'CODE', 'RESEARCH', 'PEOPLE', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'STORIES', 'QUESTIONS'];
const current = [
  ['BUILDING', 'CanBook'],
  ['RESEARCHING', 'AI generalisation'],
  ['LEARNING', 'ML + design engineering'],
  ['ORGANISING', 'TEDx'],
  ['FIGURING OUT', 'what comes next'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
    const move = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setCursor({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const cursorProps = (text) => ({
    onMouseEnter: () => setCursorText(text),
    onMouseLeave: () => setCursorText(''),
  });

  return (
    <div className={`site ${loaded ? 'is-loaded' : ''}`}>
      <div className="noise" aria-hidden="true" />
      <div className={`cursor ${cursorText ? 'has-label' : ''}`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true">
        <span>{cursorText}</span>
      </div>

      <header className="nav">
        <button className="logo" onClick={() => go('home')} {...cursorProps('HOME')}>PS<span>—</span></button>
        <div className="nav-center">PORTFOLIO / 2026</div>
        <button className={`menu-trigger ${menu ? 'active' : ''}`} onClick={() => setMenu(!menu)} {...cursorProps(menu ? 'CLOSE' : 'MENU')}>
          <span>{menu ? 'CLOSE' : 'MENU'}</span><i><b /><b /></i>
        </button>
      </header>

      <div className={`menu-panel ${menu ? 'open' : ''}`}>
        <div className="menu-top">NAVIGATION <span>00—04</span></div>
        <nav>
          {[
            ['00', 'HOME', 'home'],
            ['01', 'WORK', 'work'],
            ['02', 'ABOUT', 'about'],
            ['03', 'NOW', 'now'],
          ].map(([num, label, id]) => (
            <button key={id} onClick={() => go(id)}>
              <small>{num}</small><strong>{label}</strong><span>↗</span>
            </button>
          ))}
        </nav>
        <div className="menu-bottom">ABU DHABI, UAE <span>CURIOUS BY DEFAULT</span></div>
      </div>

      <main>
        <section id="home" className="hero">
          <div className="hero-top">
            <p>DESIGNER / DEVELOPER / RESEARCHER</p>
            <p>ABU DHABI — UAE</p>
          </div>
          <div className="hero-main">
            <div className="hero-kicker">I MAKE THINGS.<br />SOMETIMES I KNOW WHY.</div>
            <h1><span>PRESHITA</span><span className="indent">SHINDE</span></h1>
            <div className="hero-side">SCROLL<br />TO EXPLORE<br /><span>↓</span></div>
          </div>
          <div className="hero-bottom">
            <div className="hero-statement">CURIOUS ABOUT<br /><em>WHAT HAPPENS NEXT.</em></div>
            <div className="hero-index">001 / 004</div>
          </div>
          <div className="hero-cross cross-a" /><div className="hero-cross cross-b" />
        </section>

        <section id="work" className="work">
          <div className="section-head"><span>01</span><h2>SELECTED WORK</h2><span>HOVER TO PREVIEW / CLICK TO OPEN</span></div>
          <div className="work-intro"><p>Things I built because<br /><i>I couldn't stop wondering.</i></p><span>03 PROJECTS<br />AND COUNTING</span></div>
          <div className="projects">
            {projects.map((project, index) => (
              <a key={project.id} className={`project ${active === index ? 'active' : ''}`} href={project.url} target="_blank" rel="noreferrer"
                onMouseEnter={() => { setActive(index); setCursorText('OPEN ↗'); }} onMouseLeave={() => setCursorText('')}>
                <span className="project-no">{project.id}</span>
                <div className="project-title-wrap"><h3>{project.name}</h3><p>{project.note}</p></div>
                <span className="project-type">{project.type}<br />{project.year}</span>
                <span className="project-arrow">↗</span>
                <div className="project-preview"><div className={`preview-art art-${index}`}><span>{project.accent}</span><small>{project.detail}</small><i /></div></div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <div className="section-head light"><span>02</span><h2>A LITTLE CONTEXT</h2><span>NOT A RÉSUMÉ</span></div>
          <div className="about-grid">
            <p className="about-big">I LIKE <em>QUESTIONS</em><br />MORE THAN<br /><span>ANSWERS.</span></p>
            <div className="about-copy">
              <p>I build things at the intersection of technology, people and curiosity. Sometimes that's code. Sometimes it's research. Sometimes it's a question that refuses to go away.</p>
              <p className="about-small">AI · PEOPLE · DESIGN · STORIES<br />MUN · TEDx · MAKING · LEARNING</p>
            </div>
          </div>
          <div className="interest-field">
            {interests.map((item, i) => <span key={item} style={{ '--n': i }} {...cursorProps('EXPLORE')}>{item}</span>)}
          </div>
        </section>

        <section id="now" className="now">
          <div className="section-head"><span>03</span><h2>CURRENTLY</h2><span>LIVE / 2026</span></div>
          <div className="now-list">
            {current.map(([label, value], i) => (
              <div className="now-row" key={label}>
                <span className="now-num">0{i + 1}</span><span className="now-label">{label}</span><strong>{value}</strong><span className="now-mark">↗</span>
              </div>
            ))}
          </div>
          <div className="now-footer"><span>THE SITE IS ALSO A PROJECT.</span><span>MORE SOON — PROBABLY.</span></div>
        </section>

        <footer className="footer">
          <div className="footer-top"><span>04 — SAY HI</span><span>NO FORM. JUST WORDS.</span></div>
          <a className="footer-email" href="mailto:preshita@example.com" {...cursorProps('EMAIL')}>LET'S TALK<span>↗</span></a>
          <div className="footer-bottom"><span>PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer" {...cursorProps('GITHUB')}>GITHUB ↗</a><span>© 2026</span></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
