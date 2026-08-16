import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { id: '01', name: 'CanBook', meta: 'PRODUCT · WEB · 2026', note: 'making school food feel less like a queue', url: 'https://github.com/raevn45/CanBook', glyph: 'CB' },
  { id: '02', name: 'BridgeAI', meta: 'AI · RESEARCH · 2026', note: 'human–AI interaction, accessibility, comprehension', url: 'https://github.com/raevn45/BridgeAI', glyph: 'BA' },
  { id: '03', name: 'BridgeAI Research', meta: 'RESEARCH · ML · 2026', note: 'asking what generalisation actually means', url: 'https://github.com/raevn45/BridgeAI-Research', glyph: 'R' },
];

const fragments = ['AI', 'CODE', 'RESEARCH', 'PEOPLE', 'QUESTIONS', 'MUN', 'TEDx', 'HORROR', 'FASHION'];
const doing = [
  ['building', 'CanBook'], ['researching', 'AI generalisation'], ['learning', 'ML · design engineering'],
  ['organising', 'TEDx'], ['wondering', 'what comes next'],
];

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState('MOVE');
  const [menuOpen, setMenuOpen] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    const move = (event) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setCursor({ x: event.clientX, y: event.clientY }));
    };
    window.addEventListener('pointermove', move);
    return () => { window.removeEventListener('pointermove', move); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <div className="cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}><span>{cursorLabel}</span></div>

      <header className="topbar">
        <button className="wordmark" onClick={() => scrollTo('top')} onMouseEnter={() => setCursorLabel('HOME')} onMouseLeave={() => setCursorLabel('MOVE')}>PS<span>·</span></button>
        <div className="top-status">ABU DHABI / 2026</div>
        <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} onMouseEnter={() => setCursorLabel('MENU')} onMouseLeave={() => setCursorLabel('MOVE')}><span /><span /></button>
      </header>

      <div className={`menu ${menuOpen ? 'visible' : ''}`}>
        {['top', 'work', 'things', 'now'].map((id, index) => (
          <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }}><small>0{index + 1}</small>{id}</button>
        ))}
      </div>

      <main>
        <section id="top" className="hero">
          <div className="hero-micro">I MAKE THINGS.<br />SOMETIMES I KNOW WHY.</div>
          <div className="hero-title" aria-label="Preshita Shinde">
            <div className="title-line"><span>PRESHITA</span></div>
            <div className="title-line offset"><span>SHINDE</span></div>
          </div>
          <div className="hero-bottom">
            <button className="scroll-hint" onClick={() => scrollTo('work')} onMouseEnter={() => setCursorLabel('SCROLL')} onMouseLeave={() => setCursorLabel('MOVE')}><i>↓</i> SCROLL TO FIND OUT</button>
            <div className="hero-tags">{fragments.slice(0, 5).map((x) => <span key={x}>{x}</span>)}</div>
          </div>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-number">001</div>
        </section>

        <section id="work" className="work section">
          <div className="section-label"><span>01</span><span>THINGS I'VE MADE</span><span>DRAG / HOVER / CLICK</span></div>
          <div className="project-stage">
            <div className="project-preview" aria-hidden="true"><span>{activeProject?.glyph || 'PS'}</span></div>
            {projects.map((project) => (
              <a className={`project-row ${activeProject?.id === project.id ? 'active' : ''}`} href={project.url} target="_blank" rel="noreferrer" key={project.id}
                onMouseEnter={() => { setActiveProject(project); setCursorLabel('OPEN ↗'); }} onMouseLeave={() => { setActiveProject(null); setCursorLabel('MOVE'); }}>
                <span className="project-index">{project.id}</span><span className="project-name">{project.name}</span><span className="project-meta">{project.meta}</span><span className="project-arrow">↗</span><span className="project-note">{project.note}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="things" className="things section">
          <div className="section-label"><span>02</span><span>THINGS I'VE DONE</span><span>MOVE OVER ONE</span></div>
          <div className="ticker-wrap"><div className="ticker">{[...fragments, ...fragments].map((item, i) => <span key={`${item}-${i}`}>{item}<b>·</b></span>)}</div></div>
          <div className="things-copy"><p className="giant-copy">I LIKE <em>QUESTIONS</em><br />MORE THAN<br /><span>ANSWERS.</span></p><div className="tiny-aside">HEAD GIRL / TEDx / MUN<br />RESEARCH / SPEAKING / MAKING<br /><br />clicking things is encouraged.</div></div>
        </section>

        <section id="now" className="now section">
          <div className="section-label"><span>03</span><span>CURRENTLY</span><span>LIVE / AUG 2026</span></div>
          <div className="now-grid">{doing.map(([label, value], i) => <div className="now-item" key={label} style={{ '--i': i }}><span className="now-label">{label}</span><span className="now-value">{value}</span><span className="now-plus">+</span></div>)}</div>
          <div className="outside"><span>OUTSIDE THE CODE</span><div>{['horror movies', 'makeup', 'fashion', 'people-watching', 'stories', 'random questions'].map((x) => <i key={x}>{x}</i>)}</div></div>
        </section>

        <footer className="footer">
          <div className="footer-big">PRESHITA<br /><span>SHINDE</span></div>
          <div className="footer-bottom"><span>ABU DHABI, UAE</span><div className="footer-links"><a href="https://github.com/raevn45" target="_blank" rel="noreferrer" onMouseEnter={() => setCursorLabel('GITHUB')} onMouseLeave={() => setCursorLabel('MOVE')}>GITHUB ↗</a></div><span>YOU MADE IT TO THE BOTTOM. HI.</span></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
