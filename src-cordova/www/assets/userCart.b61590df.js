import{ca as n}from"./index.04da5061.js";import{i as r}from"./index.360ce4ab.js";async function i(t){const{data:e}=await r.get(`/user/${t}`);return e}const c=n("cart",{client:{},actions:{setClient(t){return i(t).then(e=>(this.client=e,this.client))},getClient(){return this.client}}});export{c as u};
