import{i as o}from"./useToast.aab6b583.js";import{af as r}from"./index.639bd1b3.js";function a({email:e}){return o.post("/getRecovery",{email:e})}const i=r("recoveryPassword",{state:()=>({email:""}),actions:{setEmail(e){this.email=e}}});export{a as g,i as u};
