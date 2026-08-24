'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, OrbitControls, TorusKnot } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { animate } from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { ArrowUpRight, ArrowDown, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', title: 'CANBOOK', type: 'SOFTWARE / PRODUCT', copy: 'A canteen pre-order and demand system built around a problem that should have been easier to solve.', accent: 'lime', href: 'https://canbook.vercel.app/' },
  { id: '02', title: 'BRIDGEAI', type: 'AI / RESEARCH', copy: 'An independent study asking what happens when complex information is made easier to understand.', accent: 'blue', href: 'https://bridge-ai-research--raevn.replit.app/' },
  { id: '03', title: 'TEDxGIIS', type: 'CURATION / EVENT', copy: 'A student-led TEDx built around ideas that sit one layer beyond the obvious.', accent: 'white', href: '#contact' },
];

const fixations = ['AI', 'INTERFACES', 'SYSTEMS', 'PEOPLE', 'WHY', 'WHAT IF', 'RABBIT HOLES', 'BUILDING'];
const tabs = ['MUN', 'DESIGN', 'WRITING', 'UI/UX', 'RESEARCH', 'EVENTS'];
const states = ['BUILDING', 'READING', 'TESTING', 'PLANNING', 'RETHINKING'];

function Orb({ progress, pointer }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += delta * (0.22 + Math.abs(pointer.current.vx) * 0.002);
    ref.current.rotation.y += delta * (0.34 + progress.current * 0.001);
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.16 + pointer.current.x * 0.12;
    ref.current.position.x += ((pointer.current.x * 0.7) - ref.current.position.x) * 0.035;
    ref.current.position.y += ((-pointer.current.y * 0.45) - ref.current.position.y) * 0.035;
    ref.current.scale.setScalar(1 + Math.min(Math.abs(pointer.current.vx) + Math.abs(pointer.current.vy), 16) * 0.008 + progress.current * 0.0008);
  });
  return <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}><TorusKnot ref={ref} args={[1.15, 0.38, 180, 36]}><MeshTransmissionMaterial backside samples={8} thickness={0.75} roughness={0.13} transmission={1} ior={1.5} chromaticAberration={0.08} anisotropy={0.35} color="#d8ff3e" /></TorusKnot></Float>;
}

function WorldCanvas({ pointer, progress }) {
  return <div className="world-canvas"><Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]}><ambientLight intensity={0.6} /><pointLight position={[3, 3, 4]} intensity={18} color="#ffffff" /><pointLight position={[-4, -2, 2]} intensity={9} color="#203cff" /><Orb pointer={pointer} progress={progress} /><Environment preset="city" /><OrbitControls enabled={false} /></Canvas></div>;
}

function Magnetic({ children, className = '', onClick }) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0, config: { tension: 420, friction: 24 } }));
  return <animated.button className={className} style={{ transform: x.to((xv) => `translate3d(${xv}px,${y.get()}px,0)`) }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); api.start({ x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.2 }); }} onMouseLeave={() => api.start({ x: 0, y: 0 })} onClick={onClick}>{children}</animated.button>;
}

export default function Page() {
  const root = useRef(null);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 });
  const progress = useRef(0);
  const [hud, setHud] = useState({ x: 0, y: 0, speed: 0, scroll: 0, time: '--:--:--' });
  const [cursor, setCursor] = useState({ label: '', x: 0, y: 0 });
  const [indexOpen, setIndexOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
      gsap.utils.toArray('.pattern-word').forEach((el, i) => gsap.fromTo(el, { scale: 0.55, y: 120, opacity: 0, rotate: i % 2 ? 4 : -4 }, { scale: 1, y: 0, opacity: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'top 30%', scrub: 1.2 } }));
      gsap.utils.toArray('.project-world').forEach((el) => gsap.to(el.querySelector('.project-index'), { yPercent: -25, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
    }, root);
    const onPointer = (e) => {
      const p = pointer.current; const nx = (e.clientX / innerWidth - 0.5) * 2; const ny = (e.clientY / innerHeight - 0.5) * 2;
      p.vx = nx - p.tx; p.vy = ny - p.ty; p.tx = nx; p.ty = ny; p.x += (nx - p.x) * 0.16; p.y += (ny - p.y) * 0.16;
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`); document.documentElement.style.setProperty('--my', `${e.clientY}px`);
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    };
    const onScroll = ({ scroll, velocity }) => { progress.current = scroll; document.documentElement.style.setProperty('--scroll', `${scroll}px`); document.documentElement.style.setProperty('--velocity', `${Math.max(-3, Math.min(3, velocity || 0))}`); };
    lenis.on('scroll', onScroll); window.addEventListener('pointermove', onPointer, { passive: true });
    const clock = setInterval(() => { const d = new Date(); setHud((h) => ({ ...h, x: Math.round((pointer.current.x + 1) * innerWidth / 2), y: Math.round((pointer.current.y + 1) * innerHeight / 2), speed: Math.round((Math.abs(pointer.current.vx) + Math.abs(pointer.current.vy)) * 100), scroll: Math.round((scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100), time: d.toLocaleTimeString('en-GB') })); }, 80);
    const title = document.querySelector('.hero-title'); if (title) animate(title.querySelectorAll('.char'), { translateY: ['120%', '0%'], opacity: [0, 1], rotate: [-8, 0], delay: (_, i) => i * 22, duration: 1100, ease: 'out(4)' });
    return () => { lenis.destroy(); ctx.revert(); window.removeEventListener('pointermove', onPointer); clearInterval(clock); };
  }, []);

  const go = (id) => { setIndexOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const split = (text) => text.split('').map((c, i) => <span className="char" key={i}>{c === ' ' ? '\u00a0' : c}</span>);

  return <main ref={root} className="site" style={{ '--mx': `${cursor.x}px`, '--my': `${cursor.y}px` }}>
    <div className="grain" /><div className="pointer-glow" /><WorldCanvas pointer={pointer} progress={progress} />
    <div className="hud"><a href="#top" className="hud-brand">PRESHITA©2026</a><div className="hud-center"><span>ABU DHABI</span><span>/</span><span>EXPERIMENT 01</span></div><div className="hud-right"><span>GST {hud.time}</span><span>{String(hud.x).padStart(4,'0')} × {String(hud.y).padStart(4,'0')}</span><span>V {String(hud.speed).padStart(3,'0')}</span><button onClick={() => setIndexOpen(true)} aria-label="Open index">INDEX <b>+</b></button></div></div>
    <div className="side-rail"><div className="rail-progress" style={{ transform: `scaleY(${hud.scroll / 100})` }} /><span>SCROLL</span><b>{String(hud.scroll).padStart(2,'0')}</b><ArrowDown size={14} /></div>

    <section id="top" className="hero section"><div className="hero-grid" /><div className="hero-copy"><p className="eyebrow">STUDENT / BUILDER / RESEARCHER / ORGANIZER</p><h1 className="hero-title">{split("THINGS I CAN'T")}</h1><h1 className="hero-title second">{split('LEAVE ALONE.')}</h1><p className="hero-caption">That is way more me than “I make things happen.”</p></div><div className="hero-meta"><span>01 — 05</span><span>MOVE YOUR MOUSE</span></div><div className="hero-object-label">3D OBJECT / LIVE<br/>POINTER + SCROLL INPUT</div></section>

    <section id="fixations" className="section fixations"><div className="section-label">01 / CURRENT FIXATIONS</div><div className="fixation-wrap">{fixations.map((x, i) => <span key={x} className={`fixation f${i}`} style={{ '--i': i }}>{x}</span>)}</div><div className="ticker"><div className="ticker-track">{[...fixations, ...fixations].map((x,i)=><span key={i}>{x}<i>•</i></span>)}</div></div></section>

    <section id="work" className="section work"><div className="section-label">02 / WORK</div><div className="work-intro" data-reveal><span>THREE THINGS I BUILT / ORGANIZED / COULDN'T STOP THINKING ABOUT</span><h2>WORK<br/><em>that moves.</em></h2></div><div className="projects">{projects.map((p) => <a className={`project-world ${p.accent}`} href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={p.id} data-reveal><div className="project-index">{p.id}</div><div className="project-main"><div className="project-type">{p.type}</div><h3>{p.title}<sup>↗</sup></h3><p>{p.copy}</p><div className="project-line">ENTER WORLD <ArrowUpRight size={15}/></div></div><div className="project-art"><div className="art-grid"/><div className="art-orbit one"/><div className="art-orbit two"/><strong>{p.id}</strong></div></a>)}</div></section>

    <section id="pattern" className="pattern"><div className="section-label">03 / A PATTERN</div>{['NOTICE.', 'QUESTION.', 'BUILD.', 'REPEAT.'].map((x,i)=><div className="pattern-word" key={x}><span>0{i+1}</span>{x}</div>)}</section>

    <section id="tabs" className="section tabs"><div className="section-label">04 / OTHER TABS</div><div className="tabs-grid">{tabs.map((x,i)=><motion.div key={x} className="tab-card" whileHover={{ rotate: i%2 ? -3 : 3, scale: 1.06, zIndex: 10 }} whileTap={{ scale: .96 }}><span>0{i+1}</span><strong>{x}</strong><i>↗</i></motion.div>)}</div></section>

    <section id="currently" className="section currently"><div className="section-label">05 / CURRENTLY</div><div className="status-list">{states.map((x,i)=><div className="status" key={x} data-reveal><span>0{i+1}</span><strong>{x}</strong><i /><small>LIVE</small></div>)}</div></section>

    <section id="contact" className="contact section"><div className="contact-no">06 / CONTACT</div><div className="contact-main"><p>IF YOU HAVE AN IDEA,<br/>A QUESTION, OR A RABBIT HOLE—</p><h2>HI<span>.</span></h2><div className="contact-actions"><Magnetic className="magnetic" onClick={() => window.location.href='mailto:hello@preshitashinde.com'}>EMAIL <ArrowUpRight size={17}/></Magnetic><Magnetic className="magnetic" onClick={() => window.open('https://github.com/raevn45','_blank')}>GITHUB <ArrowUpRight size={17}/></Magnetic></div></div><div className="contact-end">END? <em>NOT REALLY.</em></div></section>

    <div className="cursor" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}><span>+</span></div>
    <AnimatePresence>{indexOpen && <motion.div className="index-overlay" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .7, ease: [0.76,0,0.24,1] }}><button className="index-close" onClick={() => setIndexOpen(false)}><X size={22}/> CLOSE</button><div className="index-title">INDEX<span>+</span></div><nav>{[['01','TOP','top'],['02','FIXATIONS','fixations'],['03','WORK','work'],['04','PATTERN','pattern'],['05','OTHER TABS','tabs'],['06','CURRENTLY','currently'],['07','CONTACT','contact']].map(([n,t,id])=><button key={id} onClick={() => go(id)}><small>{n}</small><strong>{t}</strong><ArrowUpRight size={26}/></button>)}</nav><p>THE WEBSITE IS NOT A MENU. IT'S A PLACE TO GET LOST.</p></motion.div>}</AnimatePresence>
  </main>;
}
