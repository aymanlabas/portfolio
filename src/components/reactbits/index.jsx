// React Bits-style components (self-contained, no extra deps).
import {useEffect,useRef,useState} from "react";
export const Aurora=()=><div className="aurora"><i/><i/><i/></div>;
export const Noise=()=><div className="noise"/>;
export function Particles({count=60}){const r=useRef();useEffect(()=>{const c=r.current,x=c.getContext("2d");let w,h,id;const P=[];const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight};rs();addEventListener("resize",rs);
 for(let i=0;i<count;i++)P.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
 const t=()=>{x.clearRect(0,0,w,h);P.forEach((p,i)=>{p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;x.fillStyle="#9d8cff";x.fillRect(p.x,p.y,2,2);
  for(let j=i+1;j<P.length;j++){const d=Math.hypot(p.x-P[j].x,p.y-P[j].y);if(d<120){x.strokeStyle=`rgba(124,255,103,${.15*(1-d/120)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(P[j].x,P[j].y);x.stroke()}}});id=requestAnimationFrame(t)};t();
 return()=>{cancelAnimationFrame(id);removeEventListener("resize",rs)}},[count]);return <canvas ref={r} className="particles"/>}
export function ClickSpark(){useEffect(()=>{const f=e=>{for(let i=0;i<8;i++){const s=document.createElement("i");s.className="spark";s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--a:${i*45}deg`;document.body.appendChild(s);setTimeout(()=>s.remove(),600)}};addEventListener("click",f);return()=>removeEventListener("click",f)},[]);return null}
export const SplitText=({text,className,delay=60})=><h1 className={className} aria-label={text}>{[...text].map((c,i)=><span key={i} className="ch" style={{animationDelay:i*delay+"ms"}}>{c===" "?"\u00A0":c}</span>)}</h1>;
export const ShinyText=({text})=><span className="shiny">{text}</span>;
export const GradientText=({children})=><span className="grad">{children}</span>;
export const BlurText=({text,className})=><p className={className}>{text.split(" ").map((w,i)=><span key={i} className="bw" style={{animationDelay:i*40+"ms"}}>{w}&nbsp;</span>)}</p>;
export function DecryptedText({text}){const C="!<>-_/[]{}=+*^?#";const [t,s]=useState(text);
 const run=()=>{let k=0;const id=setInterval(()=>{s([...text].map((c,i)=>c===" "||i<k?c:C[Math.floor(Math.random()*C.length)]).join(""));if(++k>text.length){clearInterval(id);s(text)}},35)};
 useEffect(()=>{run()},[text]);return <span onMouseEnter={run} className="dec">{t}</span>}
export function RotatingText({words}){const [i,s]=useState(0);useEffect(()=>{const t=setInterval(()=>s(x=>(x+1)%words.length),2400);return()=>clearInterval(t)},[words.length]);return <span key={i} className="rot"><GradientText>{words[i]}</GradientText></span>}
export function CountUp({to}){const r=useRef();const [n,s]=useState(0);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();const f=t=>{const p=Math.min((t-t0)/1200,1);s(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});o.observe(r.current);return()=>o.disconnect()},[to]);return <span ref={r}>{n}</span>}
export function TiltedCard({src,alt}){const r=useRef();const S=(k,v)=>r.current.style.setProperty(k,v);
 const mv=e=>{const b=r.current.getBoundingClientRect(),px=(e.clientX-b.left)/b.width,py=(e.clientY-b.top)/b.height;S("--rx",(.5-py)*18+"deg");S("--ry",(px-.5)*18+"deg");S("--gx",px*100+"%");S("--gy",py*100+"%")};
 return <div className="tilt" ref={r} onMouseMove={mv} onMouseLeave={()=>{S("--rx","0deg");S("--ry","0deg")}}><img src={src} alt={alt}/><div className="glare"/></div>}
export function Magnet({children}){const r=useRef();return <span className="mag" ref={r} onMouseMove={e=>{const b=r.current.getBoundingClientRect();r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.3}px,${(e.clientY-b.top-b.height/2)*.3}px)`}} onMouseLeave={()=>r.current.style.transform=""}>{children}</span>}
export const StarBorder=({children,...p})=><a className="star" {...p}><span>{children}</span></a>;
export const CircularText=({text})=><svg className="circ" viewBox="0 0 100 100"><path id="cp" fill="none" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/><text><textPath href="#cp" textLength="236">{text}</textPath></text></svg>;
export const Marquee=({items})=><div className="mq"><div className="mt">{[...items,...items].map((x,i)=><span key={i} className="mt-item">{x.src&&<img src={x.src} alt={x.name} className="mt-logo" loading="lazy"/>}{x.name??x}</span>)}</div></div>;
export function Reveal({children,delay=0}){const r=useRef();const [v,s]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){s(true);o.disconnect()}},{threshold:.1});o.observe(r.current);return()=>o.disconnect()},[]);return <div ref={r} className={"rv"+(v?" in":"")} style={{transitionDelay:delay+"ms"}}>{children}</div>}
export function SpotlightCard({children,className="",spotlightColor="rgba(255,255,255,.15)"}){return <div className={className+" spot"} style={{"--c":spotlightColor}} onMouseMove={e=>{const b=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--x",e.clientX-b.left+"px");e.currentTarget.style.setProperty("--y",e.clientY-b.top+"px")}}>{children}</div>}
export const Dock=({items})=><div className="dock">{items.map(([id,ic])=><a key={id} href={"#"+id} title={id}>{ic}</a>)}</div>;
