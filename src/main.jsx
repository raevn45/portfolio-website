import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './styles.css';

const projects=[
 {n:'01',name:'CANBOOK',tag:'product / 2026',desc:'a canteen ordering system that started as a school problem.',url:'https://github.com/raevn45/CanBook',tone:'lime'},
 {n:'02',name:'BRIDGEAI',tag:'ai / 2026',desc:'building a bridge between people and complicated technology.',url:'https://github.com/raevn45/BridgeAI',tone:'blue'},
 {n:'03',name:'BRIDGEAI RESEARCH',tag:'research / 2026',desc:'questions about models, generalisation and what happens beyond the demo.',url:'https://github.com/raevn45/BridgeAI-Research',tone:'pink'}
];
const interests=['AI','MUN','HORROR','FASHION','PEOPLE','STORIES','RESEARCH','MAKEUP','QUESTIONS','BUILDING THINGS'];

function App(){
 const [menu,setMenu]=useState(false),[project,setProject]=useState(null),[time,setTime]=useState('');
 const mx=useMotionValue(0),my=useMotionValue(0); const sx=useSpring(mx,{stiffness:120,damping:20}),sy=useSpring(my,{stiffness:120,damping:20});
 const px=useTransform(sx,[-500,500],[-16,16]),py=useTransform(sy,[-500,500],[-16,16]);
 useEffect(()=>{const move=e=>{mx.set(e.clientX-innerWidth/2);my.set(e.clientY-innerHeight/2)};window.addEventListener('pointermove',move);const tick=()=>setTime(new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Dubai'}).format(new Date()));tick();const id=setInterval(tick,30000);return()=>{window.removeEventListener('pointermove',move);clearInterval(id)}},[]);
 const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
 return <div className="site">
  <motion.div className="ambient" style={{x:px,y:py}}/><div className="grain"/>
  <header className="topbar"><button className="mark" onClick={()=>go('home')}><span>p</span><span className="mark-s">s</span></button><div className="clock">ABU DHABI&nbsp; {time}</div><button className="menu-btn" onClick={()=>setMenu(true)}>MENU <i>↗</i></button></header>
  <AnimatePresence>{menu&&<motion.div className="menu" initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(100% 0 0 0)'}} transition={{duration:.7,ease:[.76,0,.24,1]}}><div className="menu-top"><span>INDEX / PRESHITA SHINDE</span><button onClick={()=>setMenu(false)}>CLOSE ×</button></div><div className="menu-items">{[['01','WORK','work'],['02','ME, SORT OF','about'],['03','NOW','now']].map(([n,t,id])=><motion.button key={id} onClick={()=>go(id)} whileHover={{x:30}}><small>{n}</small><strong>{t}</strong><span>↗</span></motion.button>)}</div><div className="menu-bottom"><span>NO LOG-IN. NO DATABASE. JUST A WEBSITE.</span><a href="mailto:preshitashinde09@gmail.com">EMAIL ↗</a></div></motion.div>}</AnimatePresence>
  <main id="home">
   <section className="hero">
    <motion.div className="hero-copy" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.8}}>
      <div className="eyebrow">HELLO, I'M PRESHITA <span>↘</span></div>
      <h1><span>preshita</span><em>shinde</em></h1>
      <p className="hero-line">I make things I don't know how to make yet.</p>
    </motion.div>
    <motion.div className="orbit" style={{x:useTransform(sx,[-500,500],[-25,25]),y:useTransform(sy,[-500,500],[-25,25])}} animate={{rotate:360}} transition={{duration:35,repeat:Infinity,ease:'linear'}}><span>CURIOUS · BUILD · BREAK · REPEAT · </span></motion.div>
    <motion.div className="hero-note" drag dragConstraints={{left:-80,right:80,top:-60,bottom:60}} whileDrag={{scale:1.08,rotate:5}}><b>currently</b><br/>figuring it out<br/><i>✦</i></motion.div>
    <div className="hero-foot"><span>SCROLL / EXPLORE</span><span>AI · CODE · PEOPLE · QUESTIONS</span><span>01—∞</span></div>
   </section>

   <section className="work" id="work"><div className="section-label"><span>01</span><span>THINGS I MADE</span><span>HOVER / CLICK</span></div><div className="work-title"><h2>made<br/><em>something.</em></h2><p>Three things. Many rabbit holes.<br/>Hover them. They move.</p></div>
    <div className="project-list">{projects.map((p,i)=><motion.a className="project" href={p.url} target="_blank" rel="noreferrer" key={p.name} onMouseEnter={()=>setProject(i)} onMouseLeave={()=>setProject(null)} whileHover={{x:18}} transition={{type:'spring',stiffness:180,damping:18}}><span className="project-no">{p.n}</span><div><h3>{p.name}</h3><p>{p.desc}</p></div><span className="project-tag">{p.tag}</span><span className="project-arrow">↗</span></motion.a>)}</div>
    <AnimatePresence>{project!==null&&<motion.div className={`project-card ${projects[project].tone}`} initial={{opacity:0,scale:.75,rotate:-8}} animate={{opacity:1,scale:1,rotate:project%2?4:-4}} exit={{opacity:0,scale:.75}} transition={{type:'spring',stiffness:180,damping:16}}><span>{projects[project].n}</span><strong>{projects[project].name}</strong><i>open ↗</i><div className="card-shape"/></motion.div>}</AnimatePresence>
   </section>

   <section className="manifesto" id="about"><div className="section-label light"><span>02</span><span>THIS IS THE PART WHERE I EXPLAIN MYSELF</span><span>OR NOT</span></div><div className="manifesto-big">I DON'T<br/>REALLY WANT<br/>A <em>LABEL.</em></div><div className="manifesto-body"><p>I like the moment when a question becomes a prototype. When “what if?” becomes a folder full of code. When something that seemed complicated suddenly makes sense.</p><p>I'm interested in AI, research, products, people, stories — and the strange space where all of those overlap.</p></div><motion.div className="question" animate={{rotate:[-8,8,-8],y:[0,-12,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}>?</motion.div></section>

   <section className="interests"><div className="section-label"><span>03</span><span>THINGS THAT LIVE IN MY HEAD</span><span>DRAG THEM</span></div><div className="interest-stage">{interests.map((x,i)=><motion.span key={x} drag dragElastic={.22} whileHover={{scale:1.08}} whileDrag={{scale:1.2,rotate:i%2?5:-5}} className={`interest i${i}`}>{x}</motion.span>)}</div></section>

   <section className="now" id="now"><div className="section-label"><span>04</span><span>RIGHT NOW</span><span>LIVE</span></div><div className="now-head">currently<br/><em>in progress.</em></div><div className="now-grid"><div><small>BUILDING</small><strong>CanBook</strong></div><div><small>RESEARCHING</small><strong>AI generalisation</strong></div><div><small>LEARNING</small><strong>how to make better things</strong></div><div><small>FIGURING OUT</small><strong>what comes next</strong></div></div></section>

   <footer><div className="footer-label"><span>05 / END</span><span>YOU MADE IT</span></div><div className="footer-big">say <em>hi.</em></div><a className="email" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com <span>↗</span></a><div className="footer-bottom"><span>PS</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>ABU DHABI / 2026</span></div></footer>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
