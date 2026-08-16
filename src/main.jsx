import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './world.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';

const projects = [
  { id: '01', title: 'CANBOOK', meta: 'PRODUCT / WEB', text: 'School canteen ordering, demand and a better everyday flow.', tone: 'lime', href: 'https://github.com/raevn45/CanBook' },
  { id: '02', title: 'BRIDGEAI', meta: 'AI / PRODUCT', text: 'Human-centred AI, accessibility and comprehension.', tone: 'blue', href: 'https://github.com/raevn45/BridgeAI' },
  { id: '03', title: 'RESEARCH', meta: 'AI / ML', text: 'Experiments, questions and rabbit holes.', tone: 'pink', href: 'https://github.com/raevn45/BridgeAI-Research' }
];

const tabs = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'RESEARCH', 'DESIGN', 'QUESTIONS', 'BUILDING'];

function PointerWorld() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pointer = { x: -1000, y: -1000 };
    const particles = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00035, vy: (Math.random() - 0.5) * 0.00035, r: Math.random() * 1.8 + 0.5 }));
    let frame;
    const resize = () => { const d = Math.min(window.devicePixelRatio || 1, 2); canvas.width = innerWidth * d; canvas.height = innerHeight * d; canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const move = e => { pointer.x = e.clientX; pointer.y = e.clientY; };
    const draw = () => {
      const w = innerWidth, h = innerHeight;
      ctx.clearRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 360);
      glow.addColorStop(0, 'rgba(215,255,42,.22)'); glow.addColorStop(0.35, 'rgba(98,232,255,.10)'); glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * w, y = p.y * h, d = Math.hypot(pointer.x - x, pointer.y - y);
        if (d < 190) { p.x += (pointer.x - x) / w * 0.0008; p.y += (pointer.y - y) / h * 0.0008; }
        ctx.beginPath(); ctx.arc(x, y, p.r + (d < 190 ? 1 : 0), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${d < 190 ? .65 : .18})`; ctx.fill();
        if (i % 2 === 0 && d < 120) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(pointer.x, pointer.y); ctx.strokeStyle = `rgba(215,255,42,${0.08 * (1 - d / 120)})`; ctx.stroke(); }
      });
      frame = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener('resize', resize); addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={canvasRef} className="world-field" aria-hidden="true" />;
}

function Menu({ open, close, go }) {
  if (!open) return null;
  return <div className="world-menu">
    <div className="menu-close"><span>PS / 2026</span><button onClick={close}>CLOSE ×</button></div>
    <nav>{[['01', 'HOME', 'home'], ['02', 'ME', 'me'], ['03', 'WORK', 'work'], ['04', 'OTHER TABS', 'tabs'], ['05', 'NOW', 'now']].map(([n, label, id]) => <button key={id} onClick={() => go(id)}><small>{n}</small><strong>{label}</strong><span>↗</span></button>)}</nav>
    <a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
  </div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(null);
  const [clock, setClock] = useState('');
  const [drag, setDrag] = useState({});

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date()));
    update(); const id = setInterval(update, 30000); return () => clearInterval(id);
  }, []);

  const go = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const onDrag = (e, name) => setDrag(v => ({ ...v, [name]: { x: e.clientX, y: e.clientY } }));

  return <div className="world-site" onPointerMove={e => { if (e.buttons === 1 && e.target.dataset.drag) onDrag(e, e.target.dataset.drag); }}>
    <PointerWorld />
    <div className="world-grid" />
    <header className="world-header">
      <button className="world-logo" onClick={() => go('home')} aria-label="Preshita Shinde home"><span>P</span><i>S</i></button>
      <div className="world-hud">PRESHITA SHINDE · {clock} GST · ABU DHABI</div>
      <button className="world-index" onClick={() => setMenu(true)}>INDEX <b>↗</b></button>
    </header>
    <Menu open={menu} close={() => setMenu(false)} go={go} />

    <main>
      <section id="home" className="world world-hero">
        <div className="world-corner">HELLO / THIS IS PRESHITA'S INTERNET</div>
        <div className="world-coords">24°28'N<br />54°22'E</div>
        <div className="hero-giant"><span>HELLO</span><strong>PRESHITA</strong><em>SHINDE</em></div>
        <div className="hero-image"><div className="image-frame"><img src={PHOTO} alt="Preshita Shinde" /></div><small>THAT'S ME ↗</small></div>
        <div className="hero-bubble">CURIOUS<br /><b>BY DEFAULT</b></div>
        <div className="scroll-cue">MOVE / SCROLL / CLICK ↓</div><div className="world-number">01 / 06</div>
      </section>

      <section id="me" className="world world-me">
        <div className="section-top"><span>02 / ME</span><span>NOT A RESUME</span></div>
        <div className="me-title"><small>A FEW THINGS ABOUT ME</small><h2>I LIKE</h2><h3>IDEAS THAT BECOME REAL.</h3></div>
        <div className="me-copy"><p>Computer science, AI, research, products, people, MUN, TEDx, fashion, horror movies, stories and questions that turn into rabbit holes.</p><p>I follow whatever gets interesting.</p></div>
        <div className="me-orbit o1">AI / PEOPLE</div><div className="me-orbit o2">PS</div><div className="me-orbit o3">CURIOUS · CURIOUS ·</div>
      </section>

      <section id="work" className="world world-work">
        <div className="section-top"><span>03 / WORK</span><span>HOVER THE WORLD</span></div>
        <div className="work-intro"><div><small>THINGS I COULDN'T LEAVE ALONE</small><h2>MADE<br /><i>THINGS.</i></h2></div><p>Not a case-study archive.<br />Click a project if you want to fall down the rabbit hole.</p></div>
        <div className="project-list">{projects.map((p, i) => <a className={`world-project ${p.tone}`} href={p.href} target="_blank" rel="noreferrer" key={p.id} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}><span className="project-id">{p.id}</span><div className="project-name"><h3>{p.title}</h3><p>{p.text}</p></div><span className="project-tag">{p.meta}</span><b>↗</b>{hover === i && <div className="project-world"><small>{p.meta}</small><strong>{p.title}</strong><span className="project-glyph">✦</span><i>OPEN ↗</i></div>}</a>)}</div>
      </section>

      <section id="tabs" className="world world-tabs">
        <div className="section-top"><span>04 / OTHER TABS</span><span>DRAG / PLAY</span></div>
        <div className="tabs-heading"><small>MY BRAIN IS NOT A SKILLS LIST</small><h2>HAS<br /><i>TABS.</i></h2></div>
        <div className="tab-field">{tabs.map((t, i) => { const pos = drag[t]; const style = pos ? { left: pos.x - 70, top: pos.y - 25 } : undefined; return <button key={t} data-drag={t} className={`tab tab-${i}`} style={style} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.dataset.drag = t; }} onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) onDrag(e, t); }}>{t}</button>; })}<div className="tab-note">not skills.<br />not keywords.<br /><b>just interests.</b></div></div>
      </section>

      <section id="now" className="world world-now">
        <div className="section-top"><span>05 / NOW</span><span>LIVE STATE</span></div>
        <div className="now-title"><small>WHAT IS HAPPENING LATELY</small><h2>RIGHT<br /><i>NOW.</i></h2></div>
        <div className="now-list"><div><small>BUILDING</small><b>CANBOOK</b><span>PRODUCT / WEB</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>RESEARCH / QUESTIONS</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>LEADING / LISTENING</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>EXCELLENT DECISIONS</span></div></div>
      </section>

      <section className="world world-end">
        <div className="end-mark">PS ✦</div><div className="end-title"><small>END OF THIS LITTLE INTERNET</small><h2>SEE<br /><i>YOU.</i></h2></div><a className="end-mail" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a><div className="end-bottom"><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>06 / 06</span></div>
      </section>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
