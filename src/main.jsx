import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import './styles.css';
import './maximal.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';

const projects = [
  { n: '01', name: 'CANBOOK', tag: 'PRODUCT', desc: 'school canteen / ordering / demand', url: 'https://github.com/raevn45/CanBook', tone: 'lime' },
  { n: '02', name: 'BRIDGEAI', tag: 'AI', desc: 'accessibility / comprehension / human-AI', url: 'https://github.com/raevn45/BridgeAI', tone: 'blue' },
  { n: '03', name: 'BRIDGEAI RESEARCH', tag: 'RESEARCH', desc: 'models / generalisation / experiments', url: 'https://github.com/raevn45/BridgeAI-Research', tone: 'pink' },
];

const words = ['AI', 'MUN', 'HORROR', 'FASHION', 'PEOPLE', 'STORIES', 'RESEARCH', 'MAKEUP', 'TEDx', 'QUESTIONS', 'DESIGN', 'BUILDING'];

function LivingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const points = Array.from({ length: 105 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00055,
      vy: (Math.random() - 0.5) * 0.00055,
      r: Math.random() * 2 + 0.7,
    }));
    let mouse = { x: 0.5, y: 0.5 };
    let frame;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event) => {
      mouse = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight };
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const time = performance.now() / 1000;
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(mouse.x * width, mouse.y * height, 0, mouse.x * width, mouse.y * height, width * 0.65);
      glow.addColorStop(0, 'rgba(91, 91, 255, .22)');
      glow.addColorStop(0.3, 'rgba(255, 55, 174, .11)');
      glow.addColorStop(0.62, 'rgba(212, 255, 38, .08)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > 1) point.vx *= -1;
        if (point.y < 0 || point.y > 1) point.vy *= -1;

        const px = point.x * width;
        const py = point.y * height;
        const dx = mouse.x * width - px;
        const dy = mouse.y * height - py;
        const distance = Math.hypot(dx, dy);
        if (distance < 240) {
          point.x += (dx / width) * 0.0015;
          point.y += (dy / height) * 0.0015;
        }

        ctx.beginPath();
        ctx.arc(px, py, point.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.1 * Math.sin(time + point.x * 8)})`;
        ctx.fill();
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot((a.x - b.x) * width, (a.y - b.y) * height);
          if (distance < 105) {
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.strokeStyle = `rgba(255,255,255,${0.09 * (1 - distance / 105)})`;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas" aria-hidden="true" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [time, setTime] = useState('');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 140, damping: 24 });
  const smoothY = useSpring(cursorY, { stiffness: 140, damping: 24 });

  useEffect(() => {
    const move = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Dubai',
      }).format(new Date()));
    };

    updateTime();
    window.addEventListener('pointermove', move);
    const timer = window.setInterval(updateTime, 30000);
    return () => {
      window.removeEventListener('pointermove', move);
      window.clearInterval(timer);
    };
  }, [cursorX, cursorY]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site">
      <LivingCanvas />
      <div className="grain" />

      <motion.div className="magnet" style={{ left: smoothX, top: smoothY }}>
        <span>{activeProject === null ? '✦' : 'OPEN'}</span>
      </motion.div>

      <header>
        <button className="mark" onClick={() => goTo('home')} aria-label="Home">
          <b>P</b><i>S</i>
        </button>
        <div className="hud">PRESHITA SHINDE / ABU DHABI / {time}</div>
        <button className="menubtn" onClick={() => setMenuOpen(true)}>MENU ↗</button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menuhead">
              <span>PS / INDEX</span>
              <button onClick={() => setMenuOpen(false)}>CLOSE ×</button>
            </div>
            <div className="menulinks">
              {[
                ['01', 'WORK', 'work'],
                ['02', 'PRESHITA', 'about'],
                ['03', 'NOW', 'now'],
              ].map(([number, label, id]) => (
                <motion.button key={id} onClick={() => goTo(id)} whileHover={{ x: 30 }}>
                  <small>{number}</small><strong>{label}</strong><em>↗</em>
                </motion.button>
              ))}
            </div>
            <div className="menubottom">
              <span>EMAIL / GITHUB / 2026</span>
              <a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main id="home">
        <section className="hero">
          <div className="micro top">01 — THIS IS A PERSONAL WEBSITE</div>
          <div className="micro right">NOT A RESUME</div>
          <div className="hero-name">
            <motion.h1 initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>PRESHITA</motion.h1>
            <motion.h2 initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>SHINDE</motion.h2>
          </div>
          <motion.div className="photo-card" initial={{ opacity: 0, scale: 0.5, rotate: -18 }} animate={{ opacity: 1, scale: 1, rotate: -7 }} transition={{ delay: 0.7, duration: 1, type: 'spring' }}>
            <img src={PHOTO} alt="Preshita Shinde" />
            <span>hi, that's me ↗</span>
          </motion.div>
          <div className="hero-copy"><small>currently</small><b>curious<br />about almost<br />everything.</b></div>
          <div className="hero-scribble">WAIT—<br />LOOK AT THIS</div>
          <div className="hero-bottom"><span>MOVE / SCROLL / CLICK</span><span>AI · CODE · RESEARCH · PEOPLE · STORIES</span><span>↓</span></div>
        </section>

        <section className="work" id="work">
          <div className="bar"><span>02</span><b>WORK</b><span>HOVER / FEEL / OPEN</span></div>
          <div className="work-head"><h2>made<br /><em>things.</em></h2><div><p>Three rabbit holes.<br />Three very different worlds.</p><span>01—03</span></div></div>
          <div className="projects">
            {projects.map((project, index) => (
              <motion.a
                className={`project ${activeProject === index ? 'active' : ''}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.name}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
                whileHover={{ x: 28 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              >
                <small>{project.n}</small>
                <div><h3>{project.name}</h3><p>{project.desc}</p></div>
                <span>{project.tag}</span><b>↗</b>
              </motion.a>
            ))}
          </div>
          <AnimatePresence>
            {activeProject !== null && (
              <motion.div className={`project-poster ${projects[activeProject].tone}`} initial={{ opacity: 0, scale: 0.45, rotate: -14 }} animate={{ opacity: 1, scale: 1, rotate: activeProject === 1 ? 6 : -6 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: 'spring', stiffness: 170, damping: 14 }}>
                <div className="poster-lines" />
                <small>{projects[activeProject].n} / {projects[activeProject].tag}</small>
                <strong>{projects[activeProject].name}</strong>
                <i>OPEN ↗</i>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="about" id="about">
          <div className="bar light"><span>03</span><b>THIS IS ME</b><span>NOT THE FULL STORY</span></div>
          <div className="about-grid">
            <div className="big-voice">HI.<br /><em>I'M</em><br /><span>PRESHITA.</span></div>
            <div className="about-photo"><img src={PHOTO} alt="Preshita" /><div>CS / AI / MUN / TEDx<br />AND A LOT OF QUESTIONS</div></div>
            <div className="about-text"><p>I like people, ideas, building things, asking inconvenient questions and then seeing what happens.</p><p>Computer science is one thread. So are AI, research, products, storytelling, MUN, TEDx, fashion, horror movies and whatever rabbit hole I fall into next.</p><b>NO PERFECT LABEL YET.<br />THAT'S FINE.</b></div>
          </div>
          <div className="orbit-word">CURIOUS — CURIOUS — CURIOUS —</div>
        </section>

        <section className="play">
          <div className="bar"><span>04</span><b>THE OTHER STUFF</b><span>DRAG THESE</span></div>
          <div className="play-title">my brain<br /><em>has tabs.</em></div>
          <div className="playfield">
            {words.map((word, index) => <motion.button key={word} className={`word w${index}`} drag dragElastic={0.32} whileHover={{ scale: 1.12 }} whileDrag={{ scale: 1.25, rotate: index % 2 ? 7 : -7 }}>{word}</motion.button>)}
            <div className="note">not skills.<br />not keywords.<br /><strong>just me.</strong></div>
          </div>
        </section>

        <section className="now" id="now">
          <div className="bar"><span>05</span><b>NOW</b><span>LIVE / 2026</span></div>
          <div className="now-title">right<br /><em>now.</em></div>
          <div className="now-grid">
            <div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div>
            <div><small>RESEARCHING</small><b>AI GENERALISATION</b><span>models / experiments</span></div>
            <div><small>LEARNING</small><b>BETTER DESIGN</b><span>constantly</span></div>
            <div><small>TRYING TO FIGURE OUT</small><b>WHAT'S NEXT</b><span>¯\_(ツ)_/¯</span></div>
          </div>
        </section>

        <footer>
          <div className="bar"><span>06</span><b>BYE</b><span>THANKS FOR VISITING</span></div>
          <div className="bye">LET'S<br /><em>TALK.</em></div>
          <a className="email" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
          <div className="foot"><span>PS / 2026</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>ABU DHABI</span></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
