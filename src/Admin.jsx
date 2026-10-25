import {useEffect,useState} from "react";
import {signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import {doc,getDoc,setDoc,collection,getDocs,deleteDoc,query,orderBy} from "firebase/firestore";
import {auth,db,configured} from "./firebase";import {defaultData} from "./data";

const LISTS={
 experiences:[["role","Role"],["company","Company"],["period","Period"],["description","Bullets (one per line)","a"],["tech","Technologies"]],
 projects:[["title","Title"],["description","Description","a"],["tech","Technologies"],["link","GitHub / Repo URL"],["demo","Live Demo URL"]],
 education:[["degree","Degree"],["school","School"],["period","Period"]],
 skills:[["label","Category"],["items","Items (comma separated)"]],
 certificates:[["name","Certificate Name"],["issuer","Issuer / Organization"],["date","Date"],["credentialId","Credential ID"],["credentialUrl","Credential URL"],["issuerLogo","Logo URL"]]};
const PROFILE=[["name","Name"],["title","Title"],["availability","Availability banner"],["bio","Bio","a"],["email","Email"],["phone","Phone"],["location","Location"],["github","GitHub URL"],["linkedin","LinkedIn URL"],["photo","Photo URL"],["languages","Languages"],["telegramBotToken","Telegram Bot Token (ex: 123456:ABC-DEF...)"],["telegramChatId","Telegram Chat ID (ex: 123456789)"]];

const Field=({f,v,on})=>f[2]?<textarea rows="4" placeholder={f[1]} value={v||""} onChange={e=>on(e.target.value)}/>:<input placeholder={f[1]} value={v||""} onChange={e=>on(e.target.value)}/>;

export default function Admin(){
 const [u,setU]=useState(undefined);const [d,setD]=useState(defaultData);const [tab,setTab]=useState("profile");
 const [msgs,setMsgs]=useState([]);const [err,setErr]=useState("");const [ok,setOk]=useState("");
 useEffect(()=>auth?onAuthStateChanged(auth,setU):undefined,[]);
 useEffect(()=>{if(!u||!db)return;
  getDoc(doc(db,"portfolio","main")).then(s=>s.exists()&&setD({...defaultData,...s.data()}));
  getDocs(query(collection(db,"messages"),orderBy("createdAt","desc"))).then(s=>setMsgs(s.docs.map(x=>({id:x.id,...x.data()})))).catch(()=>{})},[u]);
 const login=async e=>{e.preventDefault();const f=new FormData(e.target);
  try{await signInWithEmailAndPassword(auth,f.get("e"),f.get("p"))}catch{setErr("Invalid credentials")}};
 const save=async()=>{try{await setDoc(doc(db,"portfolio","main"),d);setOk("Saved ✓")}catch{setOk("Save failed")}setTimeout(()=>setOk(""),2500)};
 const setList=(k,i,f,v)=>setD(p=>({...p,[k]:p[k].map((x,j)=>j===i?{...x,[f]:v}:x)}));

 if(!configured)return<div className="login"><h2>Firebase not configured</h2><p>Copy .env.example to .env, fill in your Firebase keys, then restart npm run dev.</p><a href="#/">← Back to portfolio</a></div>;
 if(u===undefined)return<p className="center">Loading…</p>;
 if(!u)return(<form className="login" onSubmit={login}><h2>Admin login</h2><input name="e" type="email" placeholder="Email" required/><input name="p" type="password" placeholder="Password" required/><button className="btn">Sign in</button><p className="err">{err}</p><a href="#/">← Back to portfolio</a></form>);

 return(<div className="admin"><aside><h3>Admin</h3>
  {["profile",...Object.keys(LISTS),"messages"].map(t=><button key={t} className={tab===t?"on":""} onClick={()=>setTab(t)}>{t}{t==="messages"?` (${msgs.length})`:""}</button>)}
  <button onClick={save} className="btn">Save all</button><span>{ok}</span>
  <a href="#/">View site</a><button onClick={()=>signOut(auth)}>Logout</button></aside>
 <section>
  {tab==="profile"&&PROFILE.map(f=><label key={f[0]}>{f[1]}<Field f={f} v={d[f[0]]} on={v=>setD({...d,[f[0]]:v})}/></label>)}
  {LISTS[tab]&&<>{d[tab].map((it,i)=><div className="item" key={i}>
    {LISTS[tab].map(f=><Field key={f[0]} f={f} v={it[f[0]]} on={v=>setList(tab,i,f[0],v)}/>)}
    <button onClick={()=>setD({...d,[tab]:d[tab].filter((_,j)=>j!==i)})}>Delete</button></div>)}
   <button className="btn" onClick={()=>setD({...d,[tab]:[...d[tab],{}]})}>+ Add</button></>}
  {tab==="messages"&&msgs.map(m=><div className="item" key={m.id}><b>{m.name}</b> · {m.email}<p>{m.message}</p>
   <button onClick={async()=>{await deleteDoc(doc(db,"messages",m.id));setMsgs(msgs.filter(x=>x.id!==m.id))}}>Delete</button></div>)}
 </section></div>);
}
