import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
export const configured=Boolean(import.meta.env.VITE_API_KEY&&import.meta.env.VITE_PROJECT_ID);
export let db=null,auth=null;
if(configured){
 const app=initializeApp({apiKey:import.meta.env.VITE_API_KEY,authDomain:import.meta.env.VITE_AUTH_DOMAIN,projectId:import.meta.env.VITE_PROJECT_ID,appId:import.meta.env.VITE_APP_ID});
 db=getFirestore(app);auth=getAuth(app);
}
