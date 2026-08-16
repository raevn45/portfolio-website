import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'motion/react';
import './styles.css';
import './immersive.css';
import './final.css';
import './experience.css';
import './signature.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects = [
  { id: '01', title: 'CanBook', label: 'PRODUCT / WEB', text: 'A calmer way to order from a school canteen.', href: 'https://github.com/raevn45/CanBook', tone: 'lime' },
  { id: '02', title: 'BridgeAI', label: 'AI / PRODUCT', text: 'Human-centred AI, accessibility and comprehension.', href: 'https://github.com/raevn45/BridgeAI', tone: 'blue' },
  { id: '03', title: 'Research', label: 'RESEARCH / ML', text: 'Experiments, questions and rabbit holes.', href: 'https://github.com/raevn45/BridgeAI-Research', tone: 'pink' }
];
const tabs = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'RESEARCH', 'DESIGN', 'QUESTIONS', 'BUILDING'];

function PointerField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pointer = { x: -500, y: -500 };
    const trail = [];
    const particles = Array.from({ length: 150 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00025, vy: (Math.random() - .5) * .00025, size: Math.random() * 2 + .4 }));
    let frame;
    const resize = () => { const r = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * r; canvas.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); };
    const move = e => { pointer.x = e.clientX; pointer.y = e.clientY; trail.push({ x: pointer.x, y: pointer.y, life: 1 }); if (trail.length > 22) trail.shift(); };
    const draw = () => {
      const w = innerWidth, h = innerHeight; ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 420); g.addColorStop(0, 'rgba(255,255,255,.13)'); g.addColorStop(.28, 'rgba(109,125,255,.16)'); g.addColorStop(.7, 'rgba(217,255,54,.06)'); g.addColorStop(1, 'transparent'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      trail.forEach((p, i) => { p.life *= .94; ctx.beginPath(); ctx.arc(p.x, p.y, 2 + i * .18, 0, Math.PI * 2); ctx.fillStyle = `rgba(217,255,54,${p.life * .3})`; ctx.fill(); });
      particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; const x = p.x * w, y = p.y * h, d = Math.hypot(pointer.x - x, pointer.y - y); if (d < 180) { p.x += ((pointer.x - x) / w) * .0007; p.y += ((pointer.y - y) / h) * .0007; } ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${d < 180 ? .65 : .2})`; ctx.fill(); });
      frame = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener('resize', resize); addEventListener('pointermove', move); return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={canvasRef} className="experience-field" aria-hidden="true" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false), [hovered, setHovered] = useState(null), [clock, setClock] = useState('');
  useEffect(() => { const update = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date())); update(); const i = setInterval(update, 30000); return () => clearInterval(i); }, []);
  useEffect(() => { const onScroll = () => document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`); addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => removeEventListener('scroll', onScroll); }, []);
  const go = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="experience">
    <PointerField /><div className="experience-noise" aria-hidden="true" />
    <header className="experience-header"><button className="experience-logo" onClick={() => go('top')} aria-label="Home"><span>P</span><i>S</i></button><div className="experience-status">PRESHITA SHINDE <span>·</span> {clock} GST</div><button className="experience-index" onClick={() => setMenuOpen(true)}>INDEX <span>↗</span></button></header>
    {menuOpen && <motion.div className="experience-menu" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .7, ease: [.76, 0, .24, 1] }}><div className="menu-inner"><div className="menu-top"><span>PS / 2026</span><button onClick={() => setMenuOpen(false)}>CLOSE ×</button></div><nav>{[['01','HOME','top'],['02','WORK','work'],['03','ME','me'],['04','NOW','now']].map(([n,name,id]) => <button key={id} onClick={() => go(id)}><small>{n}</small><strong>{name}</strong><span>↗</span></button>)}</nav><a href="mailto:preshitashinde09@gmail.com" className="menu-email">preshitashinde09@gmail.com ↗</a></div></motion.div>}
    <main>
      <section className="experience-hero" id="top"><div className="hero-mini">HELLO / THIS IS PRESHITA'S INTERNET</div><div className="hero-location">ABU DHABI<br/>24°28' N / 54°22' E</div><div className="hero-type"><span>HELLO</span><b>PRESHITA</b><em>SHINDE</em></div><motion.div className="hero-photo" initial={{ opacity: 0, scale: .7, rotate: 8 }} animate={{ opacity: 1, scale: 1, rotate: -6 }} transition={{ duration: 1.1, type: 'spring' }}><img src={PHOTO} alt="Preshita Shinde"/><span>THAT'S ME ↗</span></motion.div><div className="hero-sticker">CURIOUS<br/><b>BY DEFAULT</b></div><div className="hero-line">SCROLL / MOVE / CLICK / PLAY</div><div className="hero-arrow">↓</div></section>
      <section className="statement" id="me"><div className="section-meta">01 / ME <span>NO RESUME ENERGY</span></div><div className="statement-layout"><h2>I LIKE<br/><i>IDEAS</i><br/>THAT BECOME<br/><b>REAL.</b></h2><div className="statement-copy"><p>Computer science, AI, research, products, MUN, TEDx, people, fashion, horror movies, stories and questions I probably should have left alone.</p><p>I follow whatever gets interesting.</p></div></div><div className="statement-mark">PS</div></section>
      <section className="work-experience" id="work"><div className="section-meta">02 / WORK <span>MOVE OVER A PROJECT</span></div><div className="work-heading"><h2>THINGS<br/><i>I MADE.</i></h2><p>Not a case-study archive.<br/>Just the things I couldn't leave alone.</p></div><div className="project-stack">{projects.map((project,index) => <a key={project.id} href={project.href} target="_blank" rel="noreferrer" className={`experience-project ${project.tone}`} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}><small>{project.id}</small><div><h3>{project.title}</h3><p>{project.text}</p></div><span>{project.label}</span><b>↗</b>{hovered === index && <motion.div className="project-pop" initial={{ opacity: 0, scale: .5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: index === 1 ? 5 : -5 }}><strong>{project.title}</strong><small>{project.id} / CLICK ME</small><div className="pop-shape"/></motion.div>}</a>)}</div></section>
      <section className="tabs-experience"><div className="section-meta">03 / OTHER TABS <span>DRAG THEM</span></div><h2>MY BRAIN<br/><i>HAS TABS.</i></h2><div className="tab-world">{tabs.map((tab,index) => <motion.button key={tab} className={`tab-item tab-${index}`} drag dragElastic={.3} whileHover={{ scale: 1.08 }} whileDrag={{ scale: 1.18, rotate: index % 2 ? 7 : -7 }}>{tab}</motion.button>)}<p>not skills.<br/>not keywords.<br/><b>just interests.</b></p></div></section>
      <section className="now-experience" id="now"><div className="section-meta">04 / NOW <span>LIVE STATE</span></div><h2>RIGHT<br/><i>NOW.</i></h2><div className="now-cards"><div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>organising / leading / listening</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div></div></section>
      <footer className="experience-footer"><div className="footer-ps">PS ✦</div><h2>SEE<br/><i>YOU.</i></h2><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a><div><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END OF INTERNET</span></div></footer>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
