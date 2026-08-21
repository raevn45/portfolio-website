import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './experience.css';
import './experience-overrides.css';
import './profile.css';
import './profile-polish.css';

const projects = [
  { number: '01', title: 'CANBOOK', meta: 'PRODUCT / WEB', text: 'A canteen pre-order and demand-management system built around queues, unpredictable demand and food waste.', href: 'https://canbook.vercel.app/' },
  { number: '02', title: 'BRIDGEAI', meta: 'AI / INDEPENDENT RESEARCH', text: 'An independent study exploring whether AI-generated text simplification changes comprehension and confidence.', href: 'https://bridge-ai-research--raevn.replit.app/' },
  { number: '03', title: 'TEDxGIIS', meta: 'SPEAKERS / CURATION / 2026', text: 'Building TEDxGIIS Abu Dhabi Youth around Beyond the Obvious — from speaker curation to the experience itself.', href: 'mailto:preshitashinde09@gmail.com?subject=TEDxGIIS%20Abu%20Dhabi%20Youth' }
];

const flowers = [
  ['6%', '15%', '72px'], ['76%', '12%', '92px'], ['88%', '68%', '58px'],
  ['10%', '78%', '110px'], ['53%', '8%', '42px'], ['67%', '88%', '76px']
];

function FlowerField() {
  return <div className="flower-field" aria-hidden="true">
    {flowers.map(([left, top, size], i) => (
      <span key={i} className="flower" style={{ '--x': left, '--y': top, '--size': size }}><i /><b /><span /></span>
    ))}
  </div>;
}

function App() {
  const [clock, setClock] = useState('');
  const [mouse, setMouse] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(new Date()));
    updateClock();
    const timer = setInterval(updateClock, 1000);
    const move = (event) => setMouse({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move, { passive: true });
    return () => { clearInterval(timer); window.removeEventListener('pointermove', move); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="profile">
      <div className="ambient-cursor" style={{ left: mouse.x, top: mouse.y }} aria-hidden="true" />
      <div className="micro-clock">GST / ABU DHABI<br /><strong>{clock}</strong></div>

      <section id="home" className="profile-section profile-hero">
        <FlowerField />
        <div className="glass-orb" aria-hidden="true" />
        <div className="hero-topline"><span>PRESHITA SHINDE</span><span>ABU DHABI / UAE</span><span>2026</span></div>
        <img className="hero-logo" src="/preshita-mark.svg" alt="PS flower monogram" />
        <div className="profile-eyebrow">STUDENT · BUILDER · RESEARCHER · ORGANISER</div>
        <h1>HI, I'M<br /><em>PRESHITA.</em></h1>
        <p className="profile-lede">I like <strong>making things, asking why, and following ideas further than I probably need to.</strong> These days that means AI, research, products, design, TEDx, MUN — and whatever else opens a new tab in my brain.</p>
        <button className="profile-scroll" onClick={() => scrollTo('about')}>KEEP SCROLLING / THERE'S MORE ↓</button>
        <div className="hero-side-note">I'M USUALLY<br /><em>CURIOUS.</em></div>
      </section>

      <section id="about" className="profile-section profile-about">
        <div className="profile-grid">
          <div>
            <div className="profile-eyebrow">A LITTLE CONTEXT</div>
            <h2 className="profile-heading">I LIKE<br /><em>MAKING</em><br />THINGS.</h2>
            <div className="profile-copy">
              <p>I tend to start with something that bothers me, interests me, or makes me stop and think, <em>“wait — why is it like this?”</em></p>
              <p>Sometimes that becomes a product. Sometimes research. Sometimes an event with a room full of people and an unreasonable number of things to organise.</p>
              <p>I don't really want one neat label. I like moving between technology, people, ideas and design — and seeing what happens when they overlap.</p>
            </div>
          </div>
          <aside className="profile-note"><span>CURRENTLY / OPEN TABS</span><strong>AI.<br />RESEARCH.<br />TEDx.<br /><em>MUN.</em></strong><span>+ design, people, stories, fashion, horror, and whatever sends me down another rabbit hole.</span></aside>
        </div>
      </section>

      <section id="work" className="profile-section work-section">
        <div className="work-header"><div><div className="profile-eyebrow">SELECTED WORK / LIVE</div><h2 className="profile-heading">THINGS I'VE<br /><em>MADE REAL.</em></h2></div><p>Not everything I've ever touched. Just the things that escaped the notebook and made it onto the internet.</p></div>
        <div className="work-list">
          {projects.map((project) => <a className="work-card" href={project.href} key={project.number} target="_blank" rel="noreferrer">
            <span className="work-number">{project.number}</span><div><h3 className="work-title">{project.title}</h3><div className="work-meta">{project.meta}</div><p>{project.text}</p><span className="work-open">OPEN PROJECT ↗</span></div><span className="work-arrow">↗</span>
          </a>)}
        </div>
      </section>

      <section id="now" className="profile-section signal-section">
        <FlowerField />
        <div className="signal-layout"><div className="profile-eyebrow">THE CURRENT TAB</div><h2 className="profile-heading">RIGHT NOW,<br /><em>IT'S A LOT.</em></h2>
          <div className="signal-list">
            <article className="signal"><small>01 / BUILDING</small><h3>CanBook</h3><p>Turning a school-canteen problem into something students can actually use.</p></article>
            <article className="signal"><small>02 / RESEARCHING</small><h3>BridgeAI</h3><p>Testing what happens to comprehension and confidence when complex information is simplified with AI.</p></article>
            <article className="signal"><small>03 / ORGANISING</small><h3>TEDxGIIS Abu Dhabi Youth</h3><p>Speaker curation and event-building around <em>Beyond the Obvious.</em></p></article>
            <article className="signal"><small>04 / STILL OPEN</small><h3>MUN + everything else</h3><p>Arguing a position, listening to people, designing things, asking better questions, and occasionally getting distracted by a completely new idea.</p></article>
          </div>
        </div>
      </section>

      <section id="contact" className="profile-section contact-section">
        <div className="profile-eyebrow">YOU MADE IT TO THE END</div>
        <h2 className="contact-heading">LET'S MAKE<br /><em>SOMETHING.</em></h2>
        <a className="contact-link" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a>
        <div className="contact-footer"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>PS / 2026</span></div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
