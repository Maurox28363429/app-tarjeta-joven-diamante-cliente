<<<<<<<< HEAD:src-cordova/www/assets/userAuth.2f3f2794.js
import{ca as w,cb as o,cc as p,l as v,V as x}from"./index.30f6a082.js";import{i as y}from"./index.360ce4ab.js";import{u as E}from"./useToast.a57f6721.js";async function _({email:e,password:t}){return await y.post("/login",{email:e,password:t})}async function A({name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:m,sex:r,address:u}){return await y.post("/register",{name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:m,sex:r,address:u})}async function L({user_id:e}){return await y.post("/prueba-membresia",{user_id:e})}const M=w("userAuth",{state:()=>{var e,t;return{user:((e=o.getUser())==null?void 0:e.user)||null,token:((t=o.getUser())==null?void 0:t.token)||null}},actions:{updated(){var e,t;this.user=((e=o.getUser())==null?void 0:e.user)||null,this.token=((t=o.getUser())==null?void 0:t.token)||null},logout(){this.user=null,this.token=null,o.removeUser()},async login({email:e,password:t}){const{data:s}=await _({email:e,password:t});this.user=s.user,this.token=s.token,o.setUser(s),console.log("user",p[this.user.role_id]),this.router.push({path:`/${p[this.user.role_id]}`})},async register({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:m}){const{data:r}=await A({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:m});this.user=r.user,this.token=r.token,o.setUser(r),this.router.push({path:`/${p[this.user.role_id]}`})},async addMembership({user_id:e}){const{data:t}=await L({user_id:e});this.user.membresia=t,o.setUser({user:this.user,token:this.token})}}}),c=()=>{const e=M(),t=v(!1),s=v(!1),a=v(!1),{token:l}=e,d=()=>{var i,n;return((i=c==null?void 0:c.user.membresia)==null?void 0:i.status)==="activa"||((n=c==null?void 0:c.user.membresia)==null?void 0:n.days)>0},m=x(()=>e==null?void 0:e.user),{triggerPositive:r,triggerWarning:u}=E();return{isActiveUser:()=>Boolean(c.user),membershipsIsActive:d,login:async({password:i,email:n})=>{var g;try{t.value=!0,await e.login({password:i,email:n}),r("Usuario iniciado con \xE9xito")}catch(f){((g=f.response)==null?void 0:g.status)===400&&u("Usuario no encontrado, por favor verifique sus datos e intente nuevamente"),f.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(f)}finally{t.value=!1}},register:async({name:i,email:n,last_name:g,phone:f,sex:b,password:k,role_id:R})=>{var U;try{s.value=!0,await e.register({name:i,email:n,last_name:g,phone:f,sex:b,password:k,role_id:R}),r("Usuario registrado con \xE9xito")}catch(h){((U=h.response)==null?void 0:U.status)===400&&u("Ese usuario ya exite, por favor ingrese otro correo o n\xFAmero de tel\xE9fono"),h.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(h)}finally{s.value=!1}},token:l,user:m,isLoadingLogin:t,isAuthenticated:()=>Boolean(l),isLoadingRegister:s,addMembership:async({user_id:i})=>{try{a.value=!0,await e.addMembership({user_id:i}),r("Ha obtenido la membres\xEDa con \xE9xito")}catch(n){n.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(n)}finally{a.value=!1}},isLoadingMembership:a,updatedUser:()=>e.updated()}};export{c as u};
========
import{ca as w,cb as o,cc as p,l as v,V as x}from"./index.f2854204.js";import{i as y}from"./index.360ce4ab.js";import{u as E}from"./useToast.2a507564.js";async function _({email:e,password:t}){return await y.post("/login",{email:e,password:t})}async function A({name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:m,sex:r,address:u}){return await y.post("/register",{name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:m,sex:r,address:u})}async function L({user_id:e}){return await y.post("/prueba-membresia",{user_id:e})}const M=w("userAuth",{state:()=>{var e,t;return{user:((e=o.getUser())==null?void 0:e.user)||null,token:((t=o.getUser())==null?void 0:t.token)||null}},actions:{updated(){var e,t;this.user=((e=o.getUser())==null?void 0:e.user)||null,this.token=((t=o.getUser())==null?void 0:t.token)||null},logout(){this.user=null,this.token=null,o.removeUser()},async login({email:e,password:t}){const{data:s}=await _({email:e,password:t});this.user=s.user,this.token=s.token,o.setUser(s),console.log("user",p[this.user.role_id]),this.router.push({path:`/${p[this.user.role_id]}`})},async register({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:m}){const{data:r}=await A({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:m});this.user=r.user,this.token=r.token,o.setUser(r),this.router.push({path:`/${p[this.user.role_id]}`})},async addMembership({user_id:e}){const{data:t}=await L({user_id:e});this.user.membresia=t,o.setUser({user:this.user,token:this.token})}}}),c=()=>{const e=M(),t=v(!1),s=v(!1),a=v(!1),{token:l}=e,d=()=>{var i,n;return((i=c==null?void 0:c.user.membresia)==null?void 0:i.status)==="activa"||((n=c==null?void 0:c.user.membresia)==null?void 0:n.days)>0},m=x(()=>e==null?void 0:e.user),{triggerPositive:r,triggerWarning:u}=E();return{isActiveUser:()=>Boolean(c.user),membershipsIsActive:d,login:async({password:i,email:n})=>{var g;try{t.value=!0,await e.login({password:i,email:n}),r("Usuario iniciado con \xE9xito")}catch(f){((g=f.response)==null?void 0:g.status)===400&&u("Usuario no encontrado, por favor verifique sus datos e intente nuevamente"),f.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(f)}finally{t.value=!1}},register:async({name:i,email:n,last_name:g,phone:f,sex:b,password:k,role_id:R})=>{var U;try{s.value=!0,await e.register({name:i,email:n,last_name:g,phone:f,sex:b,password:k,role_id:R}),r("Usuario registrado con \xE9xito")}catch(h){((U=h.response)==null?void 0:U.status)===400&&u("Ese usuario ya exite, por favor ingrese otro correo o n\xFAmero de tel\xE9fono"),h.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(h)}finally{s.value=!1}},token:l,user:m,isLoadingLogin:t,isAuthenticated:()=>Boolean(l),isLoadingRegister:s,addMembership:async({user_id:i})=>{try{a.value=!0,await e.addMembership({user_id:i}),r("Ha obtenido la membres\xEDa con \xE9xito")}catch(n){n.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(n)}finally{a.value=!1}},isLoadingMembership:a,updatedUser:()=>e.updated()}};export{c as u};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/userAuth.958f8d0b.js
