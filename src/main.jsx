import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './experience.css';
import './experience-overrides.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects = [
  { number: '01', title: 'CanBook', type: 'PRODUCT / WEB', text: 'A real product for a very real problem.', href: 'https://canbook.vercel.app/', className: 'project-coral' },
  { number: '02', title: 'BridgeAI', type: 'AI / RESEARCH', text: 'Exploring how AI can make complicated information easier to work with.', href: 'https://bridge-ai-research--raevn.replit.app/', className: 'project-violet' },
];
const interests = ['AI','MUN','TEDx','HORROR','FASHION','MAKEUP','PEOPLE','STORIES','DESIGN','RESEARCH','QUESTIONS','RABBIT HOLES'];
const nav = [['01','HOME','home'],['02','ABOUT','about'],['03','PROJECTS','build'],['04','OTHER TABS','tabs'],['05','NOW','now'],['06','TALK','talk']];

function App(){
 const [menu,setMenu]=useState(false),[active,setActive]=useState('home'),[progress,setProgress]=useState(0),[cursor,setCursor]=useState({x:-100,y:-100}),[cursorText,setCursorText]=useState('MOVE');
 useEffect(()=>{
  const sections=[...document.querySelectorAll('[data-section]')];
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?scrollY/max:0)};
  const onMove=e=>setCursor({x:e.clientX,y:e.clientY});
  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setActive(e.target.id);e.target.classList.add('seen')}}),{rootMargin:'-40% 0px -40% 0px'});
  sections.forEach(s=>observer.observe(s)); addEventListener('scroll',onScroll,{passive:true});addEventListener('pointermove',onMove,{passive:true});onScroll();
  return()=>{observer.disconnect();removeEventListener('scroll',onScroll);removeEventListener('pointermove',onMove)};
 },[]);
 const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
 return <div className="site">
  <div className="noise"/><div className="cursor" style={{left:cursor.x,top:cursor.y}}><span>{cursorText}</span></div><div className="progress"><i style={{transform:`scaleY(${progress})`}}/></div>
  <header className="topbar"><button className="brand" onClick={()=>go('home')}><span className="brand-mark">PS</span><span>PRESHITA<br/>SHINDE</span></button><span className="topline">PRESHITA SHINDE / 2026</span><button className="index-button" onClick={()=>setMenu(true)}>INDEX <b>+</b></button></header>
  <aside className={`menu ${menu?'menu-open':''}`}><div className="menu-top"><span>YOU ARE HERE.</span><button onClick={()=>setMenu(false)}>CLOSE ×</button></div><div className="menu-title">PRESHITA'S<br/><em>INTERNET.</em></div><nav>{nav.map(([n,l,id])=><button key={id} onClick={()=>go(id)} className={active===id?'nav-active':''}><small>{n}</small><strong>{l}</strong><span>↗</span></button>)}</nav><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></aside>
  <main>
   <section id="home" data-section className="world world-home"><div className="sky-grid"/><div className="sun"/><div className="orbit orbit-a"/><div className="orbit orbit-b"/>
    <div className="home-copy"><p className="eyebrow">WELCOME TO MY SIDE OF THE INTERNET</p><h1>PRESHITA<br/><i>SHINDE</i></h1><div className="home-lines"><span>I MAKE THINGS.</span><span>I ASK QUESTIONS.</span><span>I GO DOWN RABBIT HOLES.</span></div></div>
    <figure className="portrait" onMouseEnter={()=>setCursorText('THAT’S ME')} onMouseLeave={()=>setCursorText('MOVE')}><div className="portrait-frame"><img src={PHOTO} alt="Preshita Shinde"/><span>PS / 01</span></div><figcaption>human / curious / currently online</figcaption></figure>
    <div className="home-stamp">PS<br/><em>ONLINE</em></div><div className="home-coords">24.4539° N / 54.3773° E<br/>ABU DHABI / UAE</div><button className="enter" onClick={()=>go('about')}>ENTER THE SITE ↓</button>
   </section>
   <section className="portal portal-blue" aria-hidden="true"><div className="tube"><span>KEEP</span><i>GOING.</i></div><span>SCROLL TO CHANGE WORLDS</span></section>
   <section id="about" data-section className="world world-about"><div className="section-meta"><span>02</span><b>ABOUT / SHORT VERSION</b><span>01—06</span></div><div className="about-copy"><p className="eyebrow">I'M NOT VERY GOOD AT BOXES.</p><h2>I LIKE<br/><i>QUESTIONS.</i></h2><p className="body-copy">I get interested in things.</p><p className="body-copy">AI. People. Products. Research. Stories. Fashion. Horror. Whatever makes me stop and think: <i>“wait, why does this work like that?”</i></p><p className="body-copy">I don't really want one label. I'd rather keep finding things worth being curious about.</p></div><div className="floating-note">01 / THE OBVIOUS<strong>IS RARELY<br/><i>ENOUGH.</i></strong><small>pull the thread →</small></div><div className="question-mark">?</div><div className="ticker">CURIOUS · HUMAN · EXPERIMENTAL · A LITTLE CHAOTIC ·</div></section>
   <section className="portal portal-paper" aria-hidden="true"><div className="window-card"><span>preshita://next</span><b>— □ ×</b><div className="window-line"/></div><div className="tube"><span>ON TO</span><i>THE NEXT.</i></div></section>
   <section id="build" data-section className="world world-build"><div className="section-meta"><span>03</span><b>PROJECTS / LIVE WORK</b><span>OPEN ↗</span></div><div className="build-heading"><div><p className="eyebrow">SELECTED WORK / LIVE.</p><h2>OUT IN<br/><i>THE WORLD.</i></h2></div><p>Two experiments that escaped the notebook.<br/>Actually usable. Actually online.<br/><strong>Click them.</strong></p></div><div className="projects">{projects.map(p=><a key={p.number} className={`project ${p.className}`} href={p.href} target="_blank" rel="noreferrer" onMouseEnter={()=>setCursorText('OPEN ↗')} onMouseLeave={()=>setCursorText('MOVE')}><div className="project-top"><span>{p.number} / {p.type}</span><b>↗</b></div><div className="project-body"><div><h3>{p.title}</h3><p>{p.text}</p><span className="visit">OPEN PROJECT ↗</span></div><div className="project-world"><span>{p.number}</span><i/></div></div></a>)}</div></section>
   <section className="portal portal-pink" aria-hidden="true"><div className="tube"><span>OTHER</span><i>WORLDS.</i></div><div className="marquee">MUN · TEDx · HORROR · FASHION · MAKEUP · PEOPLE · STORIES · DESIGN · AI · RESEARCH ·</div></section>
   <section id="tabs" data-section className="world world-tabs"><div className="section-meta"><span>04</span><b>OTHER TABS / RABBIT HOLES</b><span>HOVER THEM</span></div><div className="tabs-heading"><p className="eyebrow">I HAVE TOO MANY TABS OPEN.</p><h2>TOO<br/><i>MANY.</i></h2><p>Not a résumé. Not a checklist.<br/>Just the things that keep pulling me back.</p></div><div className="interest-cloud">{interests.map((x,i)=><span key={x} style={{'--i':i}} onMouseEnter={()=>setCursorText(x)} onMouseLeave={()=>setCursorText('MOVE')}>{x}</span>)}</div><div className="tabs-bottom">MUN → TEDx → HEAD GIRL → RESEARCH → PEOPLE → STORIES →</div></section>
   <section className="portal portal-dark" aria-hidden="true"><div className="dark-sun"/><div className="tube"><span>RIGHT</span><i>NOW →</i></div></section>
   <section id="now" data-section className="world world-now"><div className="section-meta"><span>05</span><b>NOW / LIVE SNAPSHOT</b><span>2026</span></div><div className="now-heading"><p className="eyebrow">CURRENTLY</p><h2>MAKING<br/><i>AND</i><br/>FIGURING<br/>IT OUT.</h2></div><div className="now-grid"><div><small>MAKING</small><strong>CANBOOK</strong><span>product / web</span></div><div><small>EXPLORING</small><strong>AI + HUMAN SYSTEMS</strong><span>research / questions</span></div><div><small>DOING</small><strong>MUN / TEDx / PEOPLE</strong><span>leading / listening</span></div><div><small>WATCHING</small><strong>HORROR MOVIES</strong><span>excellent decisions</span></div></div></section>
   <section className="portal portal-end" aria-hidden="true"><div className="tube"><span>ALMOST</span><i>THERE.</i></div></section>
   <section id="talk" data-section className="world world-talk"><div className="section-meta"><span>06</span><b>CONTACT / END OF INTERNET</b><span>PS / 2026</span></div><div className="talk-heading"><p className="eyebrow">YOU FOUND THE END.</p><h2>SO...<br/><i>HI.</i></h2></div><div className="talk-contact"><a className="email-link" href="mailto:preshitashinde09@gmail.com" onMouseEnter={()=>setCursorText('EMAIL ↗')} onMouseLeave={()=>setCursorText('MOVE')}>LET'S TALK <b>↗</b></a><span>preshitashinde09@gmail.com</span></div><div className="talk-footer"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>PS / 2026</span></div></section>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
