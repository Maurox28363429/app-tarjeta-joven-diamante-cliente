import{ca as w,cb as o,l as p}from"./index.bb438131.js";import{i as y}from"./index.a317668a.js";import{u as x}from"./useToast.27d53c3a.js";async function E({email:e,password:t}){return await y.post("/login",{email:e,password:t})}async function _({name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:h,sex:r,address:u}){return await y.post("/register",{name:e,email:t,password:s,active:a,role_id:l,phone:d,last_name:h,sex:r,address:u})}async function A({user_id:e}){return await y.post("/prueba-membresia",{user_id:e})}const v={1:"admin",2:"empresa",3:"cliente"},L=w("userAuth",{state:()=>{var e,t;return{user:((e=o.getUser())==null?void 0:e.user)||null,token:((t=o.getUser())==null?void 0:t.token)||null}},actions:{updated(){var e,t;this.user=((e=o.getUser())==null?void 0:e.user)||null,this.token=((t=o.getUser())==null?void 0:t.token)||null},logout(){this.user=null,this.token=null,o.removeUser()},async login({email:e,password:t}){const{data:s}=await E({email:e,password:t});this.user=s.user,this.token=s.token,o.setUser(s),console.log("user",v[this.user.role_id]),this.router.push({path:`/${v[this.user.role_id]}`})},async register({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:h}){const{data:r}=await _({name:e,email:t,last_name:s,phone:a,sex:l,password:d,role_id:h});this.user=r.user,this.token=r.token,o.setUser(r),this.router.push({path:`/${v[this.user.role_id]}`})},async addMembership({user_id:e}){const{data:t}=await A({user_id:e});this.user.membresia=t,o.setUser({user:this.user,token:this.token})}}}),c=()=>{const e=L(),t=p(!1),s=p(!1),a=p(!1),{token:l,user:d}=e,h=()=>{var i,n;return((i=c==null?void 0:c.user.membresia)==null?void 0:i.status)==="activa"||((n=c==null?void 0:c.user.membresia)==null?void 0:n.days)>0},{triggerPositive:r,triggerWarning:u}=x();return{isActiveUser:()=>Boolean(c.user),membershipsIsActive:h,login:async({password:i,email:n})=>{var f;try{t.value=!0,await e.login({password:i,email:n}),r("Usuario iniciado con \xE9xito")}catch(m){((f=m.response)==null?void 0:f.status)===400&&u("Usuario no encontrado, por favor verifique sus datos e intente nuevamente"),m.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(m)}finally{t.value=!1}},register:async({name:i,email:n,last_name:f,phone:m,sex:b,password:k,role_id:R})=>{var U;try{s.value=!0,await e.register({name:i,email:n,last_name:f,phone:m,sex:b,password:k,role_id:R}),r("Usuario registrado con \xE9xito")}catch(g){((U=g.response)==null?void 0:U.status)===400&&u("Ese usuario ya exite, por favor ingrese otro correo o n\xFAmero de tel\xE9fono"),g.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(g)}finally{s.value=!1}},token:l,user:d,isLoadingLogin:t,isAuthenticated:()=>Boolean(l),isLoadingRegister:s,addMembership:async({user_id:i})=>{try{a.value=!0,await e.addMembership({user_id:i}),r("Ha obtenido la membres\xEDa con \xE9xito")}catch(n){n.code==="ERR_NETWORK"&&u("Verifique su conexi\xF3n a internet e intente nuevamente"),console.error(n)}finally{a.value=!1}},isLoadingMembership:a,updatedUser:()=>e.updated()}};export{c as u};
