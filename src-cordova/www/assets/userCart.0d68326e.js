<<<<<<<< HEAD:src-cordova/www/assets/userCart.afb4f77b.js
import{ca as n}from"./index.30f6a082.js";import{i as r}from"./index.360ce4ab.js";async function i(t){const{data:e}=await r.get(`/user/${t}`);return e}const c=n("cart",{client:{},actions:{setClient(t){return i(t).then(e=>(this.client=e,this.client))},getClient(){return this.client}}});export{c as u};
========
import{ca as n}from"./index.f2854204.js";import{i as r}from"./index.360ce4ab.js";async function i(t){const{data:e}=await r.get(`/user/${t}`);return e}const c=n("cart",{client:{},actions:{setClient(t){return i(t).then(e=>(this.client=e,this.client))},getClient(){return this.client}}});export{c as u};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/userCart.0d68326e.js
