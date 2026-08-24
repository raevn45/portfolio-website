import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';
import { motion, useMotionValue, useSpring as useMotionSpring } from 'motion/react';
import { animated, useSpring } from '@react-spring/web';
import './final.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', key: 'CANBOOK', type: 'PRODUCT / WEB / 2026', desc: 'A canteen pre-order and demand-management system built around queues, unpredictable demand and food waste.', url: 'https://canbook.vercel.app/', tag: 'SYSTEM / PRODUCT', theme: 'lime' },
  { id: '02', key: 'BRIDGEAI', type: 'AI / INDEPENDENT RESEARCH / 2026', desc: 'An independent study exploring whether AI-generated text simplification changes comprehension and confidence.', url: 'https://bridge-ai-research--raevn.replit.app/', tag: 'DATA / RESEARCH', theme: 'blue' },
  { id: '03', key: 'TEDxGIIS', type: 'CURATION / EVENT / 2026', desc: 'Building TEDxGIIS Abu Dhabi Youth around Beyond the Obvious — speakers, ideas, people and a room designed to move.', url: 'mailto:preshitashinde09@gmail.com?subject=TEDxGIIS%20Abu%20Dhabi%20Youth', tag: 'PEOPLE / EVENT', theme: 'dark' }
];

const orbitWords = ['AI', 'RESEARCH', 'DESIGN', 'MUN', 'TEDx', 'PRODUCT', 'QUESTIONS', 'RABBIT HOLES', 'BUILDING', 'PEOPLE', 'SYSTEMS', 'STORIES'];
const navItems = [['home', 'HOME'], ['thinking', 'THINKING'], ['work', 'WORK'], ['now', 'NOW'], ['contact', 'CONTACT']];

function Clock() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function TypeLine({ text, delay = 0, speed = 32 }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setValue(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, delay, speed]);
  return <>{value}<span className="type-caret" /></>;
}

function Magnetic({ children, className = '', strength = 0.18, ...props }) {
  const ref = useRef(null);
  const [spring, api] = useSpring(() => ({ x: 0, y: 0, config: { mass: 0.25, tension: 350, friction: 22 } }));
  return <animated.div ref={ref} className={`magnetic-wrap ${className}`} style={{ x: spring.x, y: spring.y }} onPointerMove={e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    api.start({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  }} onPointerLeave={() => api.start({ x: 0, y: 0 })} {...props}>{children}</animated.div>;
}

function DraggableArtifact({ label, initialX, initialY, tone, onGrab }) {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const sx = useMotionSpring(x, { stiffness: 140, damping: 20, mass: 0.5 });
  const sy = useMotionSpring(y, { stiffness: 140, damping: 20, mass: 0.5 });
  return <motion.button className={`draggable-artifact ${tone}`} style={{ x: sx, y: sy }} drag dragMomentum dragElastic={0.28} whileDrag={{ scale: 1.08, rotate: -4 }} onDragStart={onGrab} onPointerEnter={() => onGrab?.('DRAG')} onPointerLeave={() => onGrab?.('')} aria-label={`Drag ${label}`}>
    <span>{label}</span><i /><i /><i />
  </motion.button>;
}

function ProjectWorld({ project, index, active, setActive }) {
  return <a className={`work-item project-${index} ${active === project.key ? 'is-active' : ''}`} href={project.url} target={project.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" onPointerEnter={() => setActive(project.key)} onPointerLeave={() => setActive(null)}>
    <div className="work-number">{project.id}<span>/∞</span></div>
    <div className="work-copy">
      <div className="project-topline"><span>{project.type}</span><span>{project.tag}</span></div>
      <h3>{project.key}<b>↗</b></h3>
      <p>{project.desc}</p>
      <strong>OPEN PROJECT / ENTER ↗</strong>
    </div>
    <div className={`project-world-art ${project.theme}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-core"><span>{index === 0 ? 'QUEUE' : index === 1 ? 'r = .47' : 'BEYOND'}</span></div>
      <div className="art-orbit" />
      <div className="art-label">{index === 0 ? 'ORDER / DEMAND' : index === 1 ? 'COMPREHENSION / CONFIDENCE' : 'SPEAKERS / IDEAS'}</div>
    </div>
    <div className="project-ghost">{project.key}</div>
  </a>;
}

function App() {
  const root = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const [theme, setTheme] = useState(false);
  const [menu, setMenu] = useState(false);
  const [sound, setSound] = useState(false);
  const [cursorState, setCursorState] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, velocity: 0, scroll: 0, direction: '↓' });
  const [question, setQuestion] = useState(0);
  const audio = useRef(null);
  const pointer = useRef({ x: innerWidth / 2, y: innerHeight / 2, px: innerWidth / 2, py: innerHeight / 2, vx: 0, vy: 0 });
  const scrollRef = useRef({ y: window.scrollY, velocity: 0, target: 0 });

  const particleCount = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  useEffect(() => {
    const html = document.documentElement;
    const onPointer = e => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      html.style.setProperty('--mx', `${e.clientX}px`);
      html.style.setProperty('--my', `${e.clientY}px`);
    };
    const onScroll = () => { scrollRef.current.target = window.scrollY; };
    addEventListener('pointermove', onPointer, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    let raf;
    let last = performance.now();
    const tick = now => {
      const dt = Math.max(8, now - last);
      last = now;
      const p = pointer.current;
      p.vx = p.vx * 0.78 + (p.x - p.px) * (60 / dt) * 0.22;
      p.vy = p.vy * 0.78 + (p.y - p.py) * (60 / dt) * 0.22;
      p.px = p.x; p.py = p.y;
      const speed = Math.min(2.5, Math.hypot(p.vx, p.vy) / 28);
      html.style.setProperty('--pointer-speed', speed.toFixed(3));
      html.style.setProperty('--pointer-angle', `${Math.atan2(p.vy, p.vx) * 57.2958}deg`);
      const s = scrollRef.current;
      const raw = s.target - s.y;
      s.velocity = s.velocity * 0.84 + raw * 0.16;
      s.y += raw * 0.16;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const pct = Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      html.style.setProperty('--scroll-speed', Math.min(2, Math.abs(s.velocity) / 18).toFixed(3));
      html.style.setProperty('--scroll-angle', `${window.scrollY * 0.045}deg`);
      html.style.setProperty('--scroll-progress', `${pct}%`);
      html.style.setProperty('--scroll-direction', s.velocity < 0 ? '-1' : '1');
      if (now % 5 < 2) setTelemetry({ x: Math.round(p.x), y: Math.round(p.y + window.scrollY), velocity: Math.abs(s.velocity), scroll: pct, direction: s.velocity < -0.4 ? '↑' : '↓' });
      if (cursor.current) {
        const stretch = 1 + speed * 0.34;
        cursor.current.style.transform = `translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%) rotate(${Math.atan2(p.vy, p.vx) * 57.2958}deg) scale(${stretch},${1 - Math.min(.2, speed * .05)})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', onPointer); removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.scene-reveal').forEach((el, i) => gsap.fromTo(el, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.025, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
      gsap.to('.hero-orbit', { rotation: 360, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 2 } });
      gsap.to('.botanical-layer', { rotation: 22, scale: 1.13, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 2 } });
      gsap.utils.toArray('.depth-a').forEach(el => gsap.to(el, { yPercent: -22, ease: 'none', scrollTrigger: { trigger: el.closest('.scene'), start: 'top bottom', end: 'bottom top', scrub: 1.3 } }));
      gsap.utils.toArray('.depth-b').forEach(el => gsap.to(el, { yPercent: 28, ease: 'none', scrollTrigger: { trigger: el.closest('.scene'), start: 'top bottom', end: 'bottom top', scrub: 1.7 } }));
      gsap.to('.marquee-track', { xPercent: -50, ease: 'none', scrollTrigger: { trigger: '#now', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
    }, root);
    anime({ targets: '.boot-item', translateY: [28, 0], opacity: [0, 1], delay: anime.stagger(80), duration: 900, easing: 'easeOutExpo' });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max < 1600) return;
      if (window.scrollY <= 2) window.scrollTo(0, max - 12);
      else if (window.scrollY >= max - 2) window.scrollTo(0, 12);
    };
    addEventListener('scroll', wrap, { passive: true });
    return () => removeEventListener('scroll', wrap);
  }, []);

  useEffect(() => {
    const rootEl = root.current;
    const enter = e => { if (e.target.closest('[data-cursor]')) setCursorState(e.target.closest('[data-cursor]').dataset.cursor); };
    const leave = e => { if (e.target.closest('[data-cursor]')) setCursorState(''); };
    rootEl?.addEventListener('pointerover', enter);
    rootEl?.addEventListener('pointerout', leave);
    return () => { rootEl?.removeEventListener('pointerover', enter); rootEl?.removeEventListener('pointerout', leave); };
  }, []);

  useEffect(() => {
    if (!sound) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audio.current ??= new AudioCtx();
  }, [sound]);

  const blip = () => {
    if (!sound || !audio.current) return;
    const o = audio.current.createOscillator();
    const g = audio.current.createGain();
    o.frequency.value = 240 + Math.random() * 320;
    g.gain.setValueAtTime(0.015, audio.current.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.current.currentTime + 0.08);
    o.connect(g); g.connect(audio.current.destination); o.start(); o.stop(audio.current.currentTime + 0.08);
  };

  const go = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); blip(); };
  const handleQuestion = () => setQuestion(v => (v + 1) % 3);

  return <main ref={root} className={`site ${theme ? 'theme-b' : ''} q-${question}`} onClick={blip}>
    <div className="ambient-grid" />
    <div className="kaleido-machine" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <div className="botanical-layer" aria-hidden="true"><span className="flower flower-a">✿</span><span className="flower flower-b">✾</span><span className="flower flower-c">❀</span><span className="flower flower-d">✽</span></div>
    <div className="particle-field" aria-hidden="true">{particleCount.map(i => <i key={i} style={{ '--i': i }} />)}</div>

    <div ref={cursor} className={`cursor-system ${cursorState ? 'has-label' : ''}`} aria-hidden="true"><span ref={cursorLabel}>{cursorState || '·'}</span></div>

    <header className="hud">
      <button className="hud-brand" data-cursor="HOME" onClick={() => go('home')}><img src="/ps-mark.svg" alt="" /><b>PRESHITA©2026</b></button>
      <nav><button data-cursor="ENTER" onClick={() => go('work')}>WORK</button><button data-cursor="ENTER" onClick={() => go('contact')}>CONTACT</button></nav>
      <div className="hud-actions"><button data-cursor="THEME" onClick={() => setTheme(v => !v)}>THEME[{theme ? 'B' : 'A'}]</button><button data-cursor="SOUND" onClick={() => setSound(v => !v)}>SOUND[{sound ? '●' : '|'}]</button><button data-cursor="INDEX" onClick={() => setMenu(true)}>INDEX[+]</button></div>
    </header>

    <aside className="telemetry"><span>GST / ABU DHABI</span><strong><Clock /></strong><span>{String(telemetry.x).padStart(4, '0')} X {String(telemetry.y).padStart(4, '0')} Y</span><span>VEL {telemetry.velocity.toFixed(2)}</span><span>SCROLL {telemetry.scroll.toFixed(0)}% {telemetry.direction}</span></aside>
    <aside className="side-progress"><div className="progress-track"><i /></div><span className="progress-arrow">↗</span><span className="progress-label">{telemetry.scroll.toFixed(0)}%</span></aside>

    <section id="home" className="scene hero">
      <div className="section-meta boot-item">01 / ∞<br />ABU DHABI / UAE<br />STUDENT · BUILDER · RESEARCHER</div>
      <div className="hero-copy boot-item">
        <small className="eyebrow"><TypeLine text="HI. I'M PRESHITA." delay={120} /></small>
        <h1 aria-label="I make things happen"><span className="kinetic-line">I MAKE</span><br /><em className="kinetic-line depth-a">THINGS</em><br /><span className="stroke kinetic-line depth-b">HAPPEN.</span></h1>
        <p><TypeLine text="I like making things, asking why, and following ideas further than I probably need to." delay={1450} speed={22} /><br /><TypeLine text="AI, research, products, design, TEDx, MUN — and whatever else opens another tab." delay={2700} speed={21} /></p>
      </div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring r1" /><div className="orbit-ring r2" /><div className="orbit-ring r3" /><b>?</b><span>MOVE ME</span></div>
      <DraggableArtifact label="CURIOUS" initialX={-10} initialY={20} tone="artifact-blue" onGrab={setCursorState} />
      <DraggableArtifact label="ALWAYS." initialX={10} initialY={-30} tone="artifact-lime" onGrab={setCursorState} />
      <button className="scroll-call" data-cursor="ENTER" onClick={() => go('thinking')}>SCROLL / KEEP GOING <span>↓</span></button>
    </section>

    <section id="thinking" className="scene thinking">
      <div className="section-meta">02 / ∞<br />THE RABBIT HOLE</div>
      <div className="thinking-layout">
        <div className="thinking-copy scene-reveal"><small className="eyebrow">A LITTLE CONTEXT</small><h2>I SEE<br /><em>SOMETHING.</em><br />THEN I ASK<br /><span>WHY?</span></h2><div className="thinking-body"><p>Usually the answer is: <em>okay, but why does it have to work like that?</em></p><p>Sometimes that becomes a product. Sometimes research. Sometimes an event. Sometimes twelve open tabs and a completely different project.</p></div></div>
        <div className="orbit-field" style={{ '--q': question }}>{orbitWords.map((word, i) => <button key={word} className="orbit-word" data-cursor="PULL" style={{ '--i': i }} onClick={handleQuestion}>{word}</button>)}</div>
      </div>
      <div className="question-trigger depth-a" data-cursor="WHY" onClick={handleQuestion}>?<span>{question === 0 ? 'ASK' : question === 1 ? 'AGAIN' : 'WHY NOT'}</span></div>
    </section>

    <section id="work" className="scene work">
      <div className="section-meta">03 / ∞<br />SELECTED WORK</div>
      <div className="work-intro scene-reveal"><div><small className="eyebrow">THINGS THAT ESCAPED THE NOTEBOOK</small><h2>I <em>MADE</em> THEM.</h2></div><p>Three things that became real enough to leave my laptop.</p></div>
      <div className="work-list">{projects.map((project, i) => <ProjectWorld key={project.id} project={project} index={i} active={activeProject} setActive={setActiveProject} />)}</div>
    </section>

    <section id="now" className="scene now">
      <div className="section-meta">04 / ∞<br />CURRENTLY / OPEN TABS</div>
      <div className="scene-reveal now-title"><small className="eyebrow">RIGHT NOW</small><h2>IT'S<br /><em>A LOT.</em></h2></div>
      <div className="signals">{[['BUILDING', 'CanBook', 'A school-canteen problem turned into a product.'], ['RESEARCHING', 'BridgeAI', 'AI simplification, comprehension and confidence.'], ['CURATING', 'TEDxGIIS Abu Dhabi Youth', 'Speaker curation and an event around Beyond the Obvious.'], ['LEARNING', 'Whatever is next', 'MUN, design, people, stories, fashion, horror, rabbit holes.']].map(([a, b, c], i) => <article className="signal scene-reveal" data-cursor="EXPLORE" key={a}><small>0{i + 1} / {a}</small><h3>{b}</h3><p>{c}</p><span>↗</span></article>)}</div>
      <div className="marquee"><div className="marquee-track">CURIOUS · BUILDING · RESEARCHING · ORGANISING · QUESTIONING · CURIOUS · BUILDING · RESEARCHING · ORGANISING · QUESTIONING · </div></div>
    </section>

    <section id="contact" className="scene contact">
      <div className="section-meta">05 / ∞<br />OPEN CHANNEL</div>
      <small className="eyebrow">END? NOT REALLY.</small>
      <h2 className="scene-reveal">LET'S MAKE<br /><em>SOMETHING<br />INTERESTING.</em></h2>
      <a className="email" data-cursor="OPEN ↗" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
      <div className="footer"><span>ABU DHABI / UAE</span><a data-cursor="OPEN ↗" href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>PS / 2026</span></div>
      <div className="end-loop">END?<br /><em>NOT REALLY.</em></div>
    </section>

    {menu && <div className="command-menu" role="dialog" aria-modal="true"><button className="menu-close" data-cursor="CLOSE" onClick={() => setMenu(false)}>CLOSE [×]</button><div className="menu-top">PRESHITA©2026 <span>INDEX / LIVE</span></div><div className="menu-links">{navItems.map(([id, label], i) => <button data-cursor="ENTER" key={id} onClick={() => go(id)}><span>{String(i + 1).padStart(2, '0')} /</span>{label}</button>)}</div><p>MOVE · DRAG · HOVER · SCROLL · KEEP GOING</p></div>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
