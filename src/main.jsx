import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './site.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';

const projects = [
  { n: '01', title: 'CANBOOK', kicker: 'PRODUCT / BUILD', copy: 'I got tired of pretending the canteen could not be fixed.', color: 'lime', href: 'https://github.com/raevn45/CanBook' },
  { n: '02', title: 'BRIDGEAI', kicker: 'AI / ACCESSIBILITY', copy: 'What if AI made difficult information feel less difficult?', color: 'cyan', href: 'https://github.com/raevn45/BridgeAI' },
  { n: '03', title: 'RESEARCH', kicker: 'AI / ML / QUESTIONS', copy: 'Questions I kept coming back to after everyone else moved on.', color: 'pink', href: 'https://github.com/raevn45/BridgeAI-Research' }
];

const interests = ['AI', 'MUN', 'TEDx', 'HORROR', 'FASHION', 'MAKEUP', 'PEOPLE', 'STORIES', 'DESIGN', 'RESEARCH', 'QUESTIONS', 'BUILDING'];

function App() {
  const [progress, setProgress] = useState(0);
  const [world, setWorld] = useState('home');
  const [cursor, setCursor] = useState({ x: -100, y: -100, vx: 0, vy: 0 });
  const [cursorMode, setCursorMode] = useState('MOVE');
  const [menu, setMenu] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [clock, setClock] = useState('');
  const previous = useRef({ x: 0, y: 0, t: performance.now() });
  const smooth = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const target = scrollY / max;
      smooth.current += (target - smooth.current) * 0.075;
      setProgress(smooth.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    const move = e => {
      const now = performance.now();
      const dt = Math.max(8, now - previous.current.t);
      const vx = (e.clientX - previous.current.x) / dt;
      const vy = (e.clientY - previous.current.y) / dt;
      previous.current = { x: e.clientX, y: e.clientY, t: now };
      setCursor({ x: e.clientX, y: e.clientY, vx, vy });
      const el = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-cursor]');
      setCursorMode(el?.dataset.cursor || 'MOVE');
    };
    addEventListener('pointermove', move);
    return () => removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    const ids = ['home', 'about', 'work', 'life', 'now', 'contact'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const hit = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit) setWorld(hit.target.id);
    }, { threshold: 0.55 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const go = id => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site" data-world={world} style={{ '--scroll': progress, '--speed': Math.min(1, Math.hypot(cursor.vx, cursor.vy) * 0.7) }}>
      <div className="webgl-stage" aria-hidden="true">
        <div className="stage-glow" />
        <div className="stage-grid" />
        <div className="stage-tube">
          {Array.from({ length: 18 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
        </div>
        <div className="stage-ring ring-one" />
        <div className="stage-ring ring-two" />
        <div className="stage-particles">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
      </div>

      <div className="cursor" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)`, '--vx': cursor.vx, '--vy': cursor.vy }} aria-hidden="true">
        <span /><b>{cursorMode}</b>
      </div>
      <div className="progress"><span style={{ transform: `scaleY(${Math.max(.02, progress)})` }} /></div>

      <header className="header">
        <button className="mark" data-cursor="GO" onClick={() => go('home')}><strong>PS</strong><small>PERSONAL<br />INTERNET</small></button>
        <div className="status"><span>{world.toUpperCase()}</span><i />{clock} GST</div>
        <button className="index" data-cursor="OPEN" onClick={() => setMenu(true)}>INDEX <b>+</b></button>
      </header>

      <div className={`menu ${menu ? 'open' : ''}`}>
        <button data-cursor="CLOSE" className="menu-x" onClick={() => setMenu(false)}>ESC <b>×</b></button>
        <p>THE PERSONAL INTERNET OF PRESHITA SHINDE / 2026</p>
        <div className="menu-links">
          {[['01','HOME','home'],['02','ME','about'],['03','THINGS I MADE','work'],['04','OTHER TABS','life'],['05','NOW','now'],['06','SAY HI','contact']].map(([n,t,id]) => <button data-cursor="GO" key={id} onClick={() => go(id)}><small>{n}</small><strong>{t}</strong><span>↗</span></button>)}
        </div>
        <div className="menu-bottom"><span>SCROLL / DRAG / MOVE / LOOK</span><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></div>
      </div>

      <main>
        <section id="home" className="world hero">
          <div className="hero-meta">01 / ABU DHABI / 24.28°N 54.22°E</div>
          <div className="hero-title">
            <span className="small-word">HELLO, I'M</span>
            <h1>PRESHITA</h1>
            <h1 className="last">SHINDE</h1>
            <p>I make things, ask too many questions<br />and follow interesting rabbit holes.</p>
          </div>
          <div className="portrait" data-cursor="LOOK"><div><img src={PHOTO} alt="Preshita Shinde" /><em /></div><small>that's me / probably</small></div>
          <div className="hero-tags"><span>AI</span><span>CODE</span><span>PEOPLE</span><span>QUESTIONS</span></div>
          <div className="scroll-cue">SCROLL TO ENTER <b>↓</b></div>
        </section>

        <section className="tube-section" aria-hidden="true">
          <div className="tube-copy"><small>01 → 02</small><strong>LEAVE<br />THE<br />ROOM.</strong><span>KEEP SCROLLING</span></div>
        </section>

        <section id="about" className="world about">
          <div className="label"><span>02</span><span>ME, BUT NOT THE LINKEDIN VERSION</span><span>SCROLL / LOOK AROUND</span></div>
          <div className="about-grid">
            <div className="about-title">I LIKE<br /><i>QUESTIONS.</i></div>
            <div className="about-copy"><p className="lead">Curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p><p>CS is one part of it. Building is another. People are another. I don't want to reduce all of that to one job title.</p><p className="tiny">THE SHORT VERSION:<br /><b>CURIOUS / HUMAN / EXPERIMENTAL</b></p></div>
          </div>
          <div className="about-marquee">I TAKE THINGS SERIOUSLY / I DO NOT TAKE MYSELF TOO SERIOUSLY / I LIKE MAKING ORDINARY THINGS INTERESTING / </div>
        </section>

        <section className="tube-section tube-paper" aria-hidden="true"><div className="tube-copy"><small>02 → 03</small><strong>FALL<br />THROUGH<br />THE<br />PAGE.</strong></div></section>

        <section id="work" className="world work">
          <div className="label"><span>03</span><span>THINGS I MADE</span><span>HOVER A PROJECT</span></div>
          <div className="work-heading"><small>I DON'T HAVE A GIANT LIST.</small><h2>I HAVE<br /><i>THINGS.</i></h2></div>
          <div className="project-list">
            {projects.map(p => <a key={p.n} href={p.href} target="_blank" rel="noreferrer" data-cursor="OPEN" className={`project ${openProject === p.n ? 'active' : ''}`} onMouseEnter={() => setOpenProject(p.n)} onMouseLeave={() => setOpenProject(null)}>
              <span>{p.n}</span><div><small>{p.kicker}</small><h3>{p.title}</h3><p>{p.copy}</p></div><b>↗</b><i className={`project-art ${p.color}`}><span>{p.n}</span><em /></i>
            </a>)}
          </div>
          <p className="work-note">CLICK ONE. THE INTERNET WILL TAKE YOU SOMEWHERE ELSE.</p>
        </section>

        <section className="tube-section tube-color" aria-hidden="true"><div className="tube-copy"><small>03 → 04</small><strong>NOW<br />OPEN<br />THE<br />OTHER<br />TABS.</strong></div></section>

        <section id="life" className="world life">
          <div className="label"><span>04</span><span>THE OTHER TABS</span><span>DRAG THINGS</span></div>
          <div className="life-head"><small>MY BRAIN IS BASICALLY</small><h2>OPEN<br /><i>24/7.</i></h2></div>
          <div className="cloud">{interests.map((x, i) => <button data-cursor="DRAG" key={x} className={`chip c${i}`}>{x}</button>)}</div>
          <div className="life-center">NONE OF THESE ARE SKILLS.<br /><b>THEY'RE RABBIT HOLES.</b></div>
          <div className="life-note">MUN / TEDx / HEAD GIRL / BUILDING / RESEARCH / PEOPLE / STORIES</div>
        </section>

        <section className="tube-section tube-dark" aria-hidden="true"><div className="tube-copy"><small>04 → 05</small><strong>THE<br />LIGHT<br />CHANGES.</strong></div></section>

        <section id="now" className="world now">
          <div className="label"><span>05</span><span>RIGHT NOW</span><span>LIVE / 2026</span></div>
          <div className="now-layout"><div><small>CURRENTLY SOMEWHERE BETWEEN</small><h2>BUILDING<br /><i>AND</i><br />FIGURING<br /><span>IT OUT.</span></h2></div><div className="now-list"><div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>leading / listening</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div></div></div>
        </section>

        <section className="tube-section tube-end" aria-hidden="true"><div className="tube-copy"><strong>ONE<br />LAST<br />TURN.</strong></div></section>

        <footer id="contact" className="world contact">
          <div className="contact-top"><span>PS</span><span>06 / END</span><span>YOU MADE IT.</span></div>
          <div className="contact-main"><small>IF YOU MADE IT THIS FAR,</small><h2>LET'S<br /><i>TALK.</i></h2><a data-cursor="GO" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></div>
          <div className="contact-bottom"><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>COME BACK SOON</span></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
