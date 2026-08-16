import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { n:'01', name:'CANBOOK', type:'PRODUCT / WEB', note:'the school-canteen problem that became a product', url:'https://github.com/raevn45/CanBook', art:'can' },
  { n:'02', name:'BRIDGEAI', type:'AI / HUMAN', note:'trying to make technology feel more understandable', url:'https://github.com/raevn45/BridgeAI', art:'bridge' },
  { n:'03', name:'BRIDGEAI RESEARCH', type:'RESEARCH / ML', note:'questions about whether models actually generalise', url:'https://github.com/raevn45/BridgeAI-Research', art:'research' }
];

function App(){
 const [menu,setMenu]=useState(false); const [active,setActive]=useState(null); const [mouse,setMouse]=useState({x:0,y:0}); const [time,setTime]=useState('');
 useEffect(()=>{const move=e=>setMouse({x:e.clientX,y:e.clientY}); window.addEventListener('pointermove',move); const tick=()=>setTime(new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Dubai'}).format(new Date())); tick(); const id=setInterval(tick,30000); return()=>{window.removeEventListener('pointermove',move);clearInterval(id)}},[]);
 const jump=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
 return <div className="page" style={{'--mx':`${mouse.x}px`,'--my':`${mouse.y}px`}}>
  <div className="grain"/>
  <header><button className="brand" onClick={()=>jump('top')} aria-label="home"><span>p</span><i>s</i></button><div className="header-time">ABU DHABI&nbsp;&nbsp; {time}</div><button className="open-menu" onClick={()=>setMenu(true)}>INDEX <span>↗</span></button></header>
  <div className={`index ${menu?'on':''}`}><button className="close" onClick={()=>setMenu(false)}>CLOSE <span>×</span></button><div className="index-title">INDEX</div><nav>{[['00','home','top'],['01','work','work'],['02','about','about'],['03','now','now']].map(([n,t,id])=><button key={id} onClick={()=>jump(id)}><small>{n}</small><b>{t}</b><em>↗</em></button>)}</nav><div className="index-foot"><span>preshita shinde / 2026</span><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com</a></div></div>
  <main id="top">
   <section className="landing">
    <div className="tiny top-left">PRESHITA SHINDE / 00—04</div><div className="tiny top-right">A WEBSITE ABOUT MAKING THINGS</div>
    <div className="landing-word"><span>preshita</span><span className="serif">shinde</span></div>
    <div className="landing-aside"><span className="dot"/> currently<br/><strong>curious.</strong><br/>occasionally<br/>overcomplicating it.</div>
    <div className="landing-bottom"><span>scroll to investigate ↓</span><span>AI · CODE · PEOPLE · QUESTIONS</span></div>
    <div className="cursor-note">move<br/>around</div>
   </section>

   <section id="work" className="work">
    <div className="rule-head"><span>01</span><span>THINGS I MADE</span><span>SELECT ONE</span></div>
    <div className="work-intro"><h2>some things<br/><span>i couldn't stop thinking about.</span></h2><p>Not a case-study museum.<br/>Just the things that survived<br/>the “what if?” stage.</p></div>
    <div className="projects">{projects.map((p,i)=><a href={p.url} target="_blank" rel="noreferrer" className={`project-row ${active===i?'active':''}`} key={p.name} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}><span className="num">{p.n}</span><div className="project-name"><h3>{p.name}</h3><p>{p.note}</p></div><span className="type">{p.type}</span><span className="arrow">↗</span></a>)}</div>
    <div className="project-stage">{active===null?<div className="stage-empty">HOVER A PROJECT</div>:<div className={`stage-art ${projects[active].art}`}><span>{projects[active].n}</span><strong>{projects[active].name}</strong><i>open ↗</i></div>}</div>
   </section>

   <section className="statement"><div className="rule-head light"><span>02</span><span>A LITTLE CONTEXT</span><span>KEEP SCROLLING</span></div><div className="statement-main"><div className="margin-note">I LIKE QUESTIONS<br/>MORE THAN TITLES.</div><h2>I don't have<br/>a five-year plan.<br/><em>thank god.</em></h2></div><div className="statement-copy"><p>I like making things because a thought feels different once it exists outside your head. You can poke it, break it, give it to someone else and discover you were wrong.</p><p>I'm somewhere between computer science, AI, research, people, stories and whatever interesting thing happens to cross my path next.</p></div><div className="floating-words"><span>WHY?</span><span>WHAT IF?</span><span>OKAY BUT—</span><span>LET'S BUILD IT.</span></div></section>

   <section className="life"><div className="rule-head"><span>03</span><span>OTHER THINGS</span><span>THE HUMAN PART</span></div><div className="life-title">things i've<br/><em>ended up doing.</em></div><div className="life-grid"><span>HEAD GIRL</span><span>MUN</span><span>TEDx</span><span>AI RESEARCH</span><span>STORIES</span><span>HORROR MOVIES</span><span>FASHION</span><span>MAKEUP</span><span>PEOPLE</span><span>QUESTIONS</span></div></section>

   <section id="now" className="now"><div className="rule-head"><span>04</span><span>RIGHT NOW</span><span>LIVE / 2026</span></div><div className="now-title">currently<br/><em>in progress.</em></div><div className="now-list"><div><small>01</small><span>building</span><strong>CanBook</strong></div><div><small>02</small><span>researching</span><strong>AI generalisation</strong></div><div><small>03</small><span>learning</span><strong>how to make better things</strong></div><div><small>04</small><span>figuring out</span><strong>what comes next</strong></div></div></section>

   <footer><div className="footer-top"><span>05 / END</span><span>YOU FOUND ME.</span></div><div className="footer-center"><div>say<br/><em>hi.</em></div><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com <span>↗</span></a></div><div className="footer-bottom"><span>PS / PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>ABU DHABI / 2026</span></div></footer>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
