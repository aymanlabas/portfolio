import {useEffect,useState} from "react";
import Portfolio from "./Portfolio.jsx";import Admin from "./Admin.jsx";
export default function App(){
 const [h,setH]=useState(location.hash);
 useEffect(()=>{const f=()=>setH(location.hash);addEventListener("hashchange",f);return()=>removeEventListener("hashchange",f)},[]);
 return h.startsWith("#/admin")?<Admin/>:<Portfolio/>;
}
