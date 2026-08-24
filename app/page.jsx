'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Icosahedron } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { no: '01', title: 'CANBOOK', type: 'SOFTWARE / PRODUCT', text: 'A canteen pre-order and demand system built around a problem that should have been easier to solve.', href: 'https://canbook.vercel.app/', tone: 'lime' },
  { no: '02', title: 'BRIDGEAI', type: 'AI / RESEARCH', text: 'An independent study on whether AI-generated simplification can change comprehension and confidence.', href: 'https://bridge-ai-research--raevn.replit.app/', tone: 'blue' },
  { no: '03', title: 'TEDxGIIS', type: 'CURATION / EVENT', text: 'A student-led TEDx built around ideas that sit one layer beyond the obvious.', href: '#contact', tone: 'paper' },
];

const fixations = ['AI', 'INTERFACES', 'SYSTEMS', 'PEOPLE', 'WHY', 'WHAT IF', 'RABBIT HOLES', 'BUILDING'];
const tabs = ['MUN', 'DESIGN', 'WRITING', 'UI/UX', 'RESEARCH', 'EVENTS'];
const states = ['BUILDING', 'READING', 'TESTING', 'PLANNING', 'RETHINKING'];

function LivingObject({ pointer, velocity, progress }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const speed = Math.min(2.8, Math.abs(velocity.current) * 0.045);
    ref.current.rotation.x += delta * (0.18 + speed);
    ref.current.rotation.y += delta * (0.3 + speed * 0.8);
    ref.current.rotation.z = Math.sin(t * .5) * .12 + pointer.current.x * .18;
    ref.current.position.x += (pointer.current.x * .55 - ref.current.position.x) * .035;
    ref.current.position.y += (-pointer.current.y * .35 + Math.sin(t * .7) * .08 - ref.current.position.y) * .035;
    const target = 1 + speed * .07 + progress.current * .00045;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * .06;
    ref.current.scale.setScalar(s);
  });
  return <Float speed={1.15} floatIntensity={.55} rotationIntensity={.18}><Icosahedron ref={ref} args={[1.35, 5]}><MeshTransmissionMaterial transmission={1} thickness={.9} roughness={.1} ior={1.45} chromaticAberration={.09} anisotropy={.25} color="#d9ff39" /></Icosahedron></Float>;
}

function Scene({ pointer, velocity, progress }) {
  return <div className="scene"><Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={.55} /><pointLight position={[3, 4, 4]} intensity={15} /><pointLight position={[-4, -2, 2]} intensity={9} color="#3154ff" /><LivingObject pointer={pointer} velocity={velocity} progress={progress} /><Environment preset="city" /></Canvas></div>;
}

function Magnetic({ children, href, external = false }) {
  const ref = useRef(null);
  const onMove = (e) => { const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty('--tx', `${(e.clientX - (r.left + r.width / 2)) * .16}px`); ref.current.style.setProperty('--ty', `${(e.clientY - (r.top + r.height / 2)) * .16}px`); };
  const onLeave = () => { ref.current.style.setProperty('--tx', '0px'); ref.current.style.setProperty('--ty', '0px'); };
  return <a ref={ref} className="magnetic" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</a>;
}

export default function Page() {
  const root = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);
  const progress = useRef(0);
  const [hud, setHud] = useState({ x: 0, y: 0, speed: 0, scroll: 0, time: '' });
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: '' });
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: .075, smoothWheel: true, syncTouch: false });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker', { y: 30, opacity: 0, duration: 1, delay: .25, ease: 'power4.out' });
      gsap.from('.hero-line .word', { yPercent: 120, rotate: 5, opacity: 0, stagger: .055, duration: 1.2, delay: .35, ease: 'power4.out' });
      gsap.to('.hero-title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.scene', { yPercent: 18, rotate: 8, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
      gsap.utils.toArray('.reveal').forEach((el) => gsap.fromTo(el, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
      gsap.utils.toArray('.fixation').forEach((el, i) => gsap.to(el, { x: i % 2 ? 100 : -100, rotation: i % 2 ? -8 : 8, ease: 'none', scrollTrigger: { trigger: '#fixations', start: 'top bottom', end: 'bottom top', scrub: 1.4 } }));
      gsap.utils.toArray('.project').forEach((el, i) => { gsap.fromTo(el.querySelector('.project-art'), { rotateY: i % 2 ? -12 : 12, y: 80 }, { rotateY: 0, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: 1 } }); });
      gsap.utils.toArray('.pattern-word').forEach((el, i) => gsap.fromTo(el, { scale: .55, y: 120, opacity: 0 }, { scale: 1, y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 28%', scrub: 1 } }));
      gsap.to('.ticker-track', { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '#fixations', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }, root);

    let lastX = 0, lastY = 0, lastTime = performance.now();
    const onPointer = (e) => {
      const now = performance.now();
      const dt = Math.max(8, now - lastTime);
      const nx = (e.clientX / innerWidth - .5) * 2;
      const ny = (e.clientY / innerHeight - .5) * 2;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      velocity.current = Math.min(80, Math.hypot(dx, dy) / dt * 16);
      pointer.current.x += (nx - pointer.current.x) * .12;
      pointer.current.y += (ny - pointer.current.y) * .12;
      lastX = e.clientX; lastY = e.clientY; lastTime = now;
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
      document.documentElement.style.setProperty('--pv', `${velocity.current}`);
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    };
    const onScroll = ({ scroll, velocity: v }) => { progress.current = scroll; velocity.current = Math.max(velocity.current * .82, Math.abs(v || 0) * 7); document.documentElement.style.setProperty('--scroll-v', `${Math.max(-2, Math.min(2, v || 0))}`); };
    const onOver = (e) => { const target = e.target.closest('[data-cursor]'); setCursor((c) => ({ ...c, label: target?.dataset.cursor || '' })); };
    lenis.on('scroll', onScroll);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    const clock = setInterval(() => { const d = new Date(); setHud({ x: Math.round(lastX), y: Math.round(lastY), speed: Math.round(velocity.current), scroll: Math.round((scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100), time: d.toLocaleTimeString('en-GB') }); velocity.current *= .9; }, 90);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); ctx.revert(); window.removeEventListener('pointermove', onPointer); window.removeEventListener('pointerover', onOver); clearInterval(clock); };
  }, []);

  const jump = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const split = (s) => s.split(' ').map((w, i) => <span className="word" key={`${w}-${i}`}>{w}&nbsp;</span>);

  return <main ref={root} className="site" id="top">
    <div className="noise" /><div className="pointer-light" /><Scene pointer={pointer} velocity={velocity} progress={progress} />
    <header className="hud"><a href="#top" data-cursor="TOP">PRESHITA©2026</a><span className="hud-mid">ABU DHABI / 2026</span><div className="hud-right"><span>GST {hud.time}</span><span>{String(hud.x).padStart(4,'0')} × {String(hud.y).padStart(4,'0')}</span><span>VEL {String(hud.speed).padStart(2,'0')}</span><button data-cursor="ENTER" onClick={() => setMenu(true)}>INDEX <Plus size={13}/></button></div></header>
    <aside className="rail"><span>SCROLL</span><b>{String(hud.scroll).padStart(2,'0')}</b><i style={{ transform: `scaleY(${hud.scroll / 100})` }} /></aside>

    <section className="hero section"><div className="hero-grid" /><div className="hero-copy"><p className="hero-kicker">STUDENT / BUILDER / RESEARCHER / ORGANIZER</p><h1 className="hero-title"><span className="hero-line">{split('THINGS I CANNOT')}</span><span className="hero-line outline">{split('LEAVE ALONE.')}</span></h1><p className="hero-sub">That is way more me than “I make things happen.”</p></div><div className="hero-bottom"><span>01 / 07</span><span>MOVE · SCROLL · LOOK AROUND</span></div></section>

    <section id="fixations" className="section fixations"><p className="label">01 / CURRENT FIXATIONS</p><div className="fixation-field">{fixations.map((x, i) => <span data-cursor="MOVE" className={`fixation fixation-${i}`} key={x}>{x}</span>)}</div><div className="ticker"><div className="ticker-track">{[...fixations, ...fixations].map((x, i) => <span key={i}>{x} <b>•</b></span>)}</div></div></section>

    <section id="work" className="section work"><p className="label">02 / WORK</p><div className="work-heading reveal"><span>THINGS I BUILT / ORGANIZED / COULDN'T STOP THINKING ABOUT</span><h2>WORK <em>that moves.</em></h2></div><div className="projects">{projects.map((p) => <a data-cursor="OPEN ↗" className={`project ${p.tone} reveal`} key={p.no} href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><div className="project-no">{p.no}</div><div className="project-copy"><small>{p.type}</small><h3>{p.title}<sup>↗</sup></h3><p>{p.text}</p><span>ENTER WORLD <ArrowUpRight size={15}/></span></div><div className="project-art"><div className="art-lines"/><div className="art-ring r1"/><div className="art-ring r2"/><strong>{p.no}</strong></div></a>)}</div></section>

    <section id="pattern" className="pattern"><p className="label">03 / A PATTERN</p>{['NOTICE.', 'QUESTION.', 'BUILD.', 'REPEAT.'].map((x, i) => <div className="pattern-word" key={x}><small>0{i+1}</small>{x}</div>)}</section>

    <section id="tabs" className="section tabs"><p className="label">04 / OTHER TABS</p><div className="tabs-intro reveal"><h2>OTHER<br/><em>TABS.</em></h2><p>Things I keep open in my head.</p></div><div className="tabs-grid">{tabs.map((x, i) => <motion.a href="#contact" data-cursor="OPEN" className="tab" key={x} whileHover={{ y: i % 2 ? -18 : 18, rotate: i % 2 ? -2 : 2, scale: 1.035 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}><small>0{i+1}</small><strong>{x}</strong><ArrowUpRight size={17}/></motion.a>)}</div></section>

    <section id="currently" className="section currently"><p className="label">05 / CURRENTLY</p><div className="status-list">{states.map((x, i) => <div className="status reveal" key={x}><small>0{i+1}</small><strong>{x}</strong><i/><span>LIVE</span></div>)}</div></section>

    <section id="contact" className="section contact"><p className="label">06 / CONTACT</p><div className="contact-copy"><p>IF YOU HAVE AN IDEA,<br/>A QUESTION, OR A RABBIT HOLE—</p><h2>HI<span>.</span></h2><div className="actions"><Magnetic href="mailto:hello@preshitashinde.com">EMAIL <ArrowUpRight size={18}/></Magnetic><Magnetic href="https://github.com/raevn45" external>GITHUB <ArrowUpRight size={18}/></Magnetic></div></div><footer>END? <b>NOT REALLY.</b></footer></section>

    <div className={`cursor ${cursor.label ? 'active' : ''}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}><span>{cursor.label || '+'}</span></div>
    <AnimatePresence>{menu && <motion.div className="menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .65, ease: [0.76,0,0.24,1] }}><button data-cursor="CLOSE" className="close" onClick={() => setMenu(false)}>CLOSE <X size={20}/></button><h2>INDEX<span>+</span></h2><nav>{[['01','HOME','top'],['02','FIXATIONS','fixations'],['03','WORK','work'],['04','PATTERN','pattern'],['05','OTHER TABS','tabs'],['06','CURRENTLY','currently'],['07','CONTACT','contact']].map(([n,t,id]) => <button data-cursor="ENTER" key={id} onClick={() => jump(id)}><small>{n}</small><strong>{t}</strong><ArrowUpRight size={22}/></button>)}</nav><p>GET LOST. FIND SOMETHING.</p></motion.div>}</AnimatePresence>
  </main>;
}
