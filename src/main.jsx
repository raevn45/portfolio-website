import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './site.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects = [
  { id: '01', title: 'CANBOOK', kind: 'PRODUCT', line: 'A canteen experience rebuilt around the people using it.', tone: 'lime', href: 'https://github.com/raevn45/CanBook' },
  { id: '02', title: 'BRIDGEAI', kind: 'AI / ACCESSIBILITY', line: 'Making AI feel less like a wall and more like a bridge.', tone: 'blue', href: 'https://github.com/raevn45/BridgeAI' },
  { id: '03', title: 'RESEARCH', kind: 'AI / ML', line: 'Questions I could not leave alone.', tone: 'pink', href: 'https://github.com/raevn45/BridgeAI-Research' },
];
const tabs = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'RESEARCH', 'DESIGN', 'QUESTIONS', 'BUILDING'];
const sections = ['home', 'work', 'me', 'tabs', 'now'];

function Pointer({ x, y, label }) {
  return <div className="pointer" style={{ '--px': `${x}px`, '--py': `${y}px` }} aria-hidden="true"><span className="pointer-ring" /><span className="pointer-dot" /><b>{label}</b></div>;
}

function Scene({ active, project, scroll }) {
  return <div className={`scene scene-${active}`} style={{ '--scroll': scroll }} aria-hidden="true">
    <div className="scene-noise" />
    <div className="scene-vignette" />
    <div className="scene-grid" />
    <div className="scene-orbit orbit-a" />
    <div className="scene-orbit orbit-b" />
    <div className="scene-orbit orbit-c" />
    {active === 'home' && <><div className="scene-word">HELLO</div><div className="scene-sun" /></>}
    {active === 'work' && <div className={`project-scene ${project?.tone || 'lime'}`}><span>LIVE OBJECT / 0{project?.id || '0'}</span><strong>{project?.title || 'WORK'}</strong><i>OPEN ↗</i><div className="project-sun" /><div className="project-cross" /></div>}
    {active === 'me' && <div className="scene-face"><div className="face-frame"><img src={PHOTO} alt="" /></div><span>THIS IS A PERSON / NOT A BRAND</span></div>}
    {active === 'tabs' && <><div className="scene-tabs-number">12</div><div className="scene-tabs-label">OPEN TABS / ALWAYS</div></>}
    {active === 'now' && <><div className="scene-clock">NOW</div><div className="scene-wave" /></>}
    <div className="scene-corner">PRESHITA.S / 2026 / {active.toUpperCase()}</div>
  </div>;
}

function App() {
  const [active, setActive] = useState('home');
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState(null);
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const [pointerLabel, setPointerLabel] = useState('MOVE');
  const [clock, setClock] = useState('');
  const [scroll, setScroll] = useState(0);
  const [tabPositions, setTabPositions] = useState({});
  const dragRef = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date()));
    updateClock(); const timer = setInterval(updateClock, 30000); return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setScroll(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const nodes = sections.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { threshold: [0.35, 0.55, 0.75], rootMargin: '-14% 0px -14% 0px' });
    nodes.forEach(node => observer.observe(node)); return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const move = e => setPointer({ x: e.clientX, y: e.clientY });
    const over = e => { const target = e.target.closest('a,button,.pill,.project-row'); if (target) setPointerLabel(target.classList.contains('pill') ? 'DRAG' : target.classList.contains('project-row') ? 'OPEN' : 'GO'); else setPointerLabel('MOVE'); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerover', over);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); };
  }, []);

  useEffect(() => {
    const move = e => {
      if (!dragRef.current) return;
      setTabPositions(p => ({ ...p, [dragRef.current]: { x: e.clientX, y: e.clientY } }));
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, []);

  const jump = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const activeProject = useMemo(() => projects.find(p => p.id === project) || null, [project]);

  return <div className="app" data-world={active} style={{ '--progress': scroll }}>
    <Pointer x={pointer.x} y={pointer.y} label={pointerLabel} />
    <Scene active={active} project={activeProject} scroll={scroll} />
    <div className="scroll-line"><span style={{ transform: `scaleY(${Math.max(.02, scroll)})` }} /></div>

    <header className="topbar">
      <button className="brand" onClick={() => jump('home')}><span>PS</span><small>PERSONAL INTERNET</small></button>
      <div className="top-center"><span>{active.toUpperCase()}</span><i />{clock} GST</div>
      <button className="menu-trigger" onClick={() => setMenu(true)}><span>INDEX</span><i>+</i></button>
    </header>

    <div className={`menu-panel ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
      <button className="menu-close" onClick={() => setMenu(false)}>ESC / CLOSE <b>×</b></button>
      <div className="menu-kicker">PRESHITA SHINDE / PERSONAL INTERNET / 2026</div>
      <nav>{[['01', 'HOME', 'home'], ['02', 'WORK', 'work'], ['03', 'ME', 'me'], ['04', 'OTHER TABS', 'tabs'], ['05', 'NOW', 'now']].map(([n, t, id]) => <button key={id} onClick={() => jump(id)}><small>{n}</small><strong>{t}</strong><span>↗</span></button>)}</nav>
      <div className="menu-foot"><span>MOVE / CLICK / SCROLL / EXPLORE</span><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></div>
    </div>

    <main>
      <section id="home" className="world hero">
        <div className="hero-copy">
          <p className="eyebrow">01 / PRESHITA SHINDE / ABU DHABI</p>
          <h1><span>HELLO</span><em>I'm</em><strong>PRESHITA</strong><strong className="offset">SHINDE</strong></h1>
          <p className="hero-note">I make things, ask too many questions<br />and follow interesting rabbit holes.</p>
        </div>
        <div className="portrait" onMouseEnter={() => setPointerLabel('LOOK')} onMouseLeave={() => setPointerLabel('MOVE')}><div className="portrait-inner"><img src={PHOTO} alt="Preshita Shinde" /><div className="portrait-glint" /></div><span>that's me / probably ↓</span></div>
        <div className="hero-stamp"><span>CURIOUS</span><span>HUMAN</span><span>EXPERIMENTAL</span></div>
        <div className="hero-footer"><span>MOVE YOUR CURSOR</span><span>SCROLL / CHANGE THE WORLD ↓</span><span>24°28'N / 54°22'E</span></div>
      </section>

      <section id="work" className="world work-world">
        <div className="section-label"><span>02</span><span>THINGS I MADE</span><span>HOVER A LINE</span></div>
        <div className="work-intro"><p>NOT A RESUME / NOT A CASE-STUDY DUMP</p><h2>things<br /><i>happen.</i></h2></div>
        <div className="projects">{projects.map(p => <a key={p.id} className={`project-row ${project === p.id ? 'is-hovered' : ''}`} href={p.href} target="_blank" rel="noreferrer" onMouseEnter={() => setProject(p.id)} onMouseLeave={() => setProject(null)}><span className="project-index">{p.id}</span><div className="project-main"><h3>{p.title}</h3><p>{p.line}</p></div><span className="project-kind">{p.kind}</span><b>↗</b></a>)}</div>
        <div className="work-bottom">HOVER = THE ROOM CHANGES / CLICK = FALL DOWN THE RABBIT HOLE</div>
      </section>

      <section id="me" className="world me-world">
        <div className="section-label"><span>03</span><span>ME, BUT NOT THE LINKEDIN VERSION</span><span>KEEP SCROLLING</span></div>
        <div className="me-layout"><div className="me-big">I<br /><i>LIKE</i><br />QUESTIONS.</div><div className="me-copy"><p className="big-copy">Curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p><p>CS is one part of it. Building is another. People are another. I don't really want to reduce all of that to one job title.</p><div className="signature">PRESHITA<br /><span>PS / 2026</span></div></div></div>
        <div className="me-marquee">CURIOUS · HUMAN · EXPERIMENTAL · SERIOUS ABOUT THE WORK · NOT SERIOUS ABOUT THE LABEL · </div>
      </section>

      <section id="tabs" className="world tabs-world">
        <div className="section-label"><span>04</span><span>THE OTHER TABS</span><span>DRAG THEM</span></div>
        <div className="tabs-title"><p>my brain is basically</p><h2>OPEN<br /><i>24/7.</i></h2></div>
        <div className="tab-cloud">{tabs.map((t, i) => { const pos = tabPositions[t]; return <button key={t} className={`pill p${i}`} style={pos ? { left: pos.x, top: pos.y } : undefined} onPointerDown={() => { dragRef.current = t; }} onPointerUp={() => { dragRef.current = null; }}>{t}</button>; })}</div>
        <div className="tabs-center">none of these are skills.<br /><b>they're rabbit holes.</b></div>
      </section>

      <section id="now" className="world now-world">
        <div className="section-label"><span>05</span><span>RIGHT NOW</span><span>LIVE / 2026</span></div>
        <div className="now-layout"><div className="now-title"><p>currently somewhere between</p><h2>BUILDING<br /><i>AND</i><br />FIGURING<br /><span>IT OUT.</span></h2></div><div className="now-list"><div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>leading / listening</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div></div></div>
      </section>

      <footer className="end-world"><div className="end-orbit" /><div className="end-top"><span>PS</span><span>YOU MADE IT</span></div><h2>LET'S<br /><i>TALK.</i></h2><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a><div className="end-bottom"><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END / 06</span></div></footer>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);