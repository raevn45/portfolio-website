import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'motion/react';
import './styles.css';
import './immersive.css';
import './final.css';
import './experience.css';

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
    const particles = Array.from({ length: 115 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      size: Math.random() * 2 + 0.5
    }));
    let frame;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 360);
      glow.addColorStop(0, 'rgba(226,255,48,.24)');
      glow.addColorStop(0.25, 'rgba(83,99,255,.16)');
      glow.addColorStop(0.6, 'rgba(255,72,173,.08)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;

        const x = particle.x * width;
        const y = particle.y * height;
        const distance = Math.hypot(pointer.x - x, pointer.y - y);
        if (distance < 170) {
          particle.x += ((pointer.x - x) / width) * 0.0007;
          particle.y += ((pointer.y - y) / height) * 0.0007;
        }

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${distance < 170 ? 0.72 : 0.24})`;
        ctx.fill();
      });

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

  return <canvas ref={canvasRef} className="experience-field" aria-hidden="true" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dubai',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date()));
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="experience">
      <PointerField />
      <div className="experience-noise" aria-hidden="true" />

      <header className="experience-header">
        <button className="experience-logo" onClick={() => go('top')} aria-label="Home">
          <span>P</span><i>S</i>
        </button>
        <div className="experience-status">PRESHITA SHINDE <span>·</span> {clock} GST</div>
        <button className="experience-index" onClick={() => setMenuOpen(true)}>INDEX <span>↗</span></button>
      </header>

      {menuOpen && (
        <motion.div className="experience-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="menu-inner">
            <div className="menu-top"><span>PS / 2026</span><button onClick={() => setMenuOpen(false)}>CLOSE ×</button></div>
            <nav>
              {[['01', 'HOME', 'top'], ['02', 'WORK', 'work'], ['03', 'ME', 'me'], ['04', 'NOW', 'now']].map(([number, name, id]) => (
                <button key={id} onClick={() => go(id)}><small>{number}</small><strong>{name}</strong><span>↗</span></button>
              ))}
            </nav>
            <a href="mailto:preshitashinde09@gmail.com" className="menu-email">preshitashinde09@gmail.com ↗</a>
          </div>
        </motion.div>
      )}

      <main>
        <section className="experience-hero" id="top">
          <div className="hero-mini">HELLO / THIS IS PRESHITA'S INTERNET</div>
          <div className="hero-location">ABU DHABI<br />24°28' N / 54°22' E</div>
          <div className="hero-type"><span>HELLO</span><b>PRESHITA</b><em>SHINDE</em></div>
          <motion.div className="hero-photo" initial={{ opacity: 0, scale: 0.7, rotate: 8 }} animate={{ opacity: 1, scale: 1, rotate: -6 }} transition={{ duration: 1.1, type: 'spring' }}>
            <img src={PHOTO} alt="Preshita Shinde" />
            <span>THAT'S ME ↗</span>
          </motion.div>
          <div className="hero-sticker">CURIOUS<br /><b>BY DEFAULT</b></div>
          <div className="hero-line">SCROLL / MOVE / CLICK / PLAY</div>
          <div className="hero-arrow">↓</div>
        </section>

        <section className="statement" id="me">
          <div className="section-meta">01 / ME <span>NO RESUME ENERGY</span></div>
          <div className="statement-layout">
            <h2>I LIKE<br /><i>IDEAS</i><br />THAT BECOME<br /><b>REAL.</b></h2>
            <div className="statement-copy">
              <p>Computer science, AI, research, products, MUN, TEDx, people, fashion, horror movies, stories and questions I probably should have left alone.</p>
              <p>I follow whatever gets interesting.</p>
            </div>
          </div>
          <div className="statement-mark">PS</div>
        </section>

        <section className="work-experience" id="work">
          <div className="section-meta">02 / WORK <span>MOVE OVER A PROJECT</span></div>
          <div className="work-heading"><h2>THINGS<br /><i>I MADE.</i></h2><p>Not a case-study archive.<br />Just the things I couldn't leave alone.</p></div>
          <div className="project-stack">
            {projects.map((project, index) => (
              <a key={project.id} href={project.href} target="_blank" rel="noreferrer" className={`experience-project ${project.tone}`} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
                <small>{project.id}</small>
                <div><h3>{project.title}</h3><p>{project.text}</p></div>
                <span>{project.label}</span><b>↗</b>
                {hovered === index && <motion.div className="project-pop" initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: index === 1 ? 5 : -5 }}><strong>{project.title}</strong><small>{project.id} / CLICK ME</small><div className="pop-shape" /></motion.div>}
              </a>
            ))}
          </div>
        </section>

        <section className="tabs-experience">
          <div className="section-meta">03 / OTHER TABS <span>DRAG THEM</span></div>
          <h2>MY BRAIN<br /><i>HAS TABS.</i></h2>
          <div className="tab-world">
            {tabs.map((tab, index) => <motion.button key={tab} className={`tab-item tab-${index}`} drag dragElastic={0.3} whileHover={{ scale: 1.08 }} whileDrag={{ scale: 1.18, rotate: index % 2 ? 7 : -7 }}>{tab}</motion.button>)}
            <p>not skills.<br />not keywords.<br /><b>just interests.</b></p>
          </div>
        </section>

        <section className="now-experience" id="now">
          <div className="section-meta">04 / NOW <span>LIVE STATE</span></div>
          <h2>RIGHT<br /><i>NOW.</i></h2>
          <div className="now-cards">
            <div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div>
            <div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div>
            <div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>organising / leading / listening</span></div>
            <div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div>
          </div>
        </section>

        <footer className="experience-footer">
          <div className="footer-ps">PS ✦</div>
          <h2>SEE<br /><i>YOU.</i></h2>
          <a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
          <div><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END OF INTERNET</span></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
