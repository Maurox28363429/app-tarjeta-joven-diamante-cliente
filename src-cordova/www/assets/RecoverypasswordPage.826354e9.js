<<<<<<<< HEAD:src-cordova/www/assets/RecoverypasswordPage.ec33e3d0.js
import{cE as D,l as c,aA as v,Y as m,Z as o,J as F,aG as N,a4 as p,bs as k,ce as L,c5 as S,X as x,a3 as U,b3 as K,y as d,bR as Q,F as G}from"./index.30f6a082.js";import{u as $}from"./useToast.a57f6721.js";import{c as T,a as Z,u as j}from"./useValidateForm.8c23349e.js";import{i as V}from"./index.360ce4ab.js";import{u as H,g as M}from"./recoveryPasswordStore.7629d18c.js";import"./axios.f1f32898.js";const W={class:"pin-input"},J={class:"pin-input-container"},X=["value","onKeydown","onInput","data-index"],Y={__name:"PinInput",props:{submit:{type:Function,required:!0},loading:{type:Boolean,required:!0}},setup(u){const{triggerWarning:r}=$(),a=c(["","","","","","",""]);function g(s,e){const t=s.key;document.querySelector(`[data-index="${e}"]`)&&(t==="Backspace"?(a.value.splice(e,1,""),e>0&&document.querySelector(`[data-index="${e-1}"]`).focus()):t==="ArrowRight"&&e<a.value.length-1?document.querySelector(`[data-index="${e+1}"]`).focus():t==="ArrowLeft"&&e>0&&document.querySelector(`[data-index="${e-1}"]`).focus())}function _(s,e){const t=s.data;t&&t.match(/^[0-9a-zA-Z]$/)?(a.value.splice(e,1,t),e<a.value.length-1&&document.querySelector(`[data-index="${e+1}"]`).focus()):a.value.splice(e,1,"")}function h(s){s.preventDefault();const e=s.clipboardData.getData("text/plain");if(e&&e.match(/^[0-9a-zA-Z]+$/)&&e.length<=a.value.length)for(let t=0;t<e.length;t++)a.value.splice(t,1,e[t]);e.length>a.value.length&&r("El c\xF3digo debe ser de 7 d\xEDgitos.")}return(s,e)=>(v(),m("div",W,[o("div",J,[(v(!0),m(F,null,N(a.value,(t,i)=>(v(),m("input",{key:i,class:"pin-input-box",type:"text",value:t,maxlength:"1",onKeydown:l=>g(l,i),onInput:l=>_(l,i),onPaste:e[0]||(e[0]=l=>h(l)),ref_for:!0,ref:"input-"+i,"data-index":i},null,40,X))),128))]),p(k,{onClick:e[1]||(e[1]=()=>u.submit(a.value.join(""))),label:"Enviar c\xF3digo",loading:u.loading,size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md",type:"submit"},null,8,["loading"])]))}};var O=D(Y,[["__scopeId","data-v-26864311"]]);const ee="Este campo es requerido",te=T({password:Z().required(ee)});async function ae({email:u,code:r}){return await V.post("/validateRecovery",{email:u,code:r})}async function oe({email:u,recovery_cod:r,password:a}){return await V.post("/putRecovery",{email:u,recovery_cod:r,password:a})}const se={class:"full-width"},le={class:"full-width row justify-center"},ne={class:"q-pa-md column items-center full-width",style:{"max-width":"400px"}},re={key:0,class:"full-width column items-center"},ie=o("p",{class:"title-large q-mb-xl"},"Verifica tu email",-1),ce=o("p",{class:"text-center"}," Introduce el c\xF3digo enviado a tu correo electr\xF3nico. ",-1),ue={class:"full-width"},de=o("p",null,"\xBFNo has recibido el correo electr\xF3nico?",-1),pe={key:1,class:"full-width column items-center"},ve=o("p",{class:"title-large q-mb-xl"},"Crear nueva contrase\xF1a",-1),me=o("p",{class:"text-center"},"Introduce la nueva contrase\xF1a",-1),fe={class:"full-width"},ge={class:"full-width input"},_e={class:"label-large"},he={key:0,class:"text-error"},Pe={__name:"RecoverypasswordPage",setup(u){const{triggerPositive:r,triggerWarning:a}=$(),g=c(!1),_=c(!1),h=c(!1),s=c("password"),e=c("visibility_off"),t=()=>{s.value==="password"?(s.value="text",e.value="visibility"):(s.value="password",e.value="visibility_off")},l=H().email,E={password:""},{useForm:w,validatInput:P,validateMessage:b}=j({initialValue:E,schema:te}),q=c(null),I=c(!0),C=L(),R=()=>{console.log("go back"),C.go(-1)},A=async()=>{try{g.value=!0,await M({email:l}),r("\xA1C\xF3digo reenviado!, puede tardar unos minutos")}catch{console.log(),a("\xA1Up! Ha ocurrido un error, intento nuevamente")}finally{g.value=!1}},B=async f=>{q.value=f;try{h.value=!0,await ae({email:l,code:f}),I.value=!1,r("\xA1C\xF3digo verificado!, ahora puede cambiar su contrase\xF1a.")}catch(n){console.log(n)}finally{h.value=!1}},z=async()=>{try{_.value=!0,await oe({recovery_cod:q.value,password:w.value.password,email:l}),r("La contrase\xF1a ha sido cambiada exitosamente."),C.push({name:"login"})}catch(f){console.log(f),a("\xA1Up! C\xF3dido incorreto, intente de nuevo ")}finally{_.value=!1}};return(f,n)=>(v(),m("div",se,[o("div",{onClick:R,class:"full-width q-pl-md q-pt-md"},[p(S,{name:"arrow_back",size:"md",color:"dark",class:"cursor-pointer"})]),o("div",le,[o("div",ne,[I.value?(v(),m("div",re,[ie,ce,o("div",ue,[p(O,{submit:B,loading:h.value},null,8,["loading"])]),de,p(k,{onClick:A,loading:g.value,label:"Reenviar c\xF3digo",size:"14px",fill:"",height:"48px",color:"secondary",class:"full-width q-mb-md"},null,8,["loading"])])):x("",!0),I.value?x("",!0):(v(),m("div",pe,[ve,me,o("div",fe,[o("div",ge,[o("label",_e,[U(" Contrase\xF1a "),p(Q,{type:s.value,outlined:"","lazy-rules":"",modelValue:d(w).password,"onUpdate:modelValue":n[1]||(n[1]=y=>d(w).password=y),placeholder:"********",onBlur:n[2]||(n[2]=y=>d(P)("password")),onKeypress:n[3]||(n[3]=y=>d(P)("password"))},{append:K(()=>[p(S,{onClick:n[0]||(n[0]=y=>t()),class:"cursor-pointer",name:e.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),d(b).errors.password?(v(),m("p",he,G(d(b).errors.password),1)):x("",!0)]),p(k,{onClick:z,loading:_.value,disabled:!d(b).isvalid,label:"Guardar",size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md"},null,8,["loading","disabled"])])]))])])]))}};export{Pe as default};
========
import{cE as D,l as c,aA as v,Y as m,Z as o,J as F,aG as N,a4 as p,bs as k,ce as L,c5 as S,X as x,a3 as U,b3 as K,y as d,bR as Q,F as G}from"./index.f2854204.js";import{u as $}from"./useToast.2a507564.js";import{c as T,a as Z,u as j}from"./useValidateForm.9756592b.js";import{i as V}from"./index.360ce4ab.js";import{u as H,g as M}from"./recoveryPasswordStore.bab37fba.js";import"./axios.f1f32898.js";const W={class:"pin-input"},J={class:"pin-input-container"},X=["value","onKeydown","onInput","data-index"],Y={__name:"PinInput",props:{submit:{type:Function,required:!0},loading:{type:Boolean,required:!0}},setup(u){const{triggerWarning:r}=$(),a=c(["","","","","","",""]);function g(s,e){const t=s.key;document.querySelector(`[data-index="${e}"]`)&&(t==="Backspace"?(a.value.splice(e,1,""),e>0&&document.querySelector(`[data-index="${e-1}"]`).focus()):t==="ArrowRight"&&e<a.value.length-1?document.querySelector(`[data-index="${e+1}"]`).focus():t==="ArrowLeft"&&e>0&&document.querySelector(`[data-index="${e-1}"]`).focus())}function _(s,e){const t=s.data;t&&t.match(/^[0-9a-zA-Z]$/)?(a.value.splice(e,1,t),e<a.value.length-1&&document.querySelector(`[data-index="${e+1}"]`).focus()):a.value.splice(e,1,"")}function h(s){s.preventDefault();const e=s.clipboardData.getData("text/plain");if(e&&e.match(/^[0-9a-zA-Z]+$/)&&e.length<=a.value.length)for(let t=0;t<e.length;t++)a.value.splice(t,1,e[t]);e.length>a.value.length&&r("El c\xF3digo debe ser de 7 d\xEDgitos.")}return(s,e)=>(v(),m("div",W,[o("div",J,[(v(!0),m(F,null,N(a.value,(t,i)=>(v(),m("input",{key:i,class:"pin-input-box",type:"text",value:t,maxlength:"1",onKeydown:l=>g(l,i),onInput:l=>_(l,i),onPaste:e[0]||(e[0]=l=>h(l)),ref_for:!0,ref:"input-"+i,"data-index":i},null,40,X))),128))]),p(k,{onClick:e[1]||(e[1]=()=>u.submit(a.value.join(""))),label:"Enviar c\xF3digo",loading:u.loading,size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md",type:"submit"},null,8,["loading"])]))}};var O=D(Y,[["__scopeId","data-v-26864311"]]);const ee="Este campo es requerido",te=T({password:Z().required(ee)});async function ae({email:u,code:r}){return await V.post("/validateRecovery",{email:u,code:r})}async function oe({email:u,recovery_cod:r,password:a}){return await V.post("/putRecovery",{email:u,recovery_cod:r,password:a})}const se={class:"full-width"},le={class:"full-width row justify-center"},ne={class:"q-pa-md column items-center full-width",style:{"max-width":"400px"}},re={key:0,class:"full-width column items-center"},ie=o("p",{class:"title-large q-mb-xl"},"Verifica tu email",-1),ce=o("p",{class:"text-center"}," Introduce el c\xF3digo enviado a tu correo electr\xF3nico. ",-1),ue={class:"full-width"},de=o("p",null,"\xBFNo has recibido el correo electr\xF3nico?",-1),pe={key:1,class:"full-width column items-center"},ve=o("p",{class:"title-large q-mb-xl"},"Crear nueva contrase\xF1a",-1),me=o("p",{class:"text-center"},"Introduce la nueva contrase\xF1a",-1),fe={class:"full-width"},ge={class:"full-width input"},_e={class:"label-large"},he={key:0,class:"text-error"},Pe={__name:"RecoverypasswordPage",setup(u){const{triggerPositive:r,triggerWarning:a}=$(),g=c(!1),_=c(!1),h=c(!1),s=c("password"),e=c("visibility_off"),t=()=>{s.value==="password"?(s.value="text",e.value="visibility"):(s.value="password",e.value="visibility_off")},l=H().email,E={password:""},{useForm:w,validatInput:P,validateMessage:b}=j({initialValue:E,schema:te}),q=c(null),I=c(!0),C=L(),R=()=>{console.log("go back"),C.go(-1)},A=async()=>{try{g.value=!0,await M({email:l}),r("\xA1C\xF3digo reenviado!, puede tardar unos minutos")}catch{console.log(),a("\xA1Up! Ha ocurrido un error, intento nuevamente")}finally{g.value=!1}},B=async f=>{q.value=f;try{h.value=!0,await ae({email:l,code:f}),I.value=!1,r("\xA1C\xF3digo verificado!, ahora puede cambiar su contrase\xF1a.")}catch(n){console.log(n)}finally{h.value=!1}},z=async()=>{try{_.value=!0,await oe({recovery_cod:q.value,password:w.value.password,email:l}),r("La contrase\xF1a ha sido cambiada exitosamente."),C.push({name:"login"})}catch(f){console.log(f),a("\xA1Up! C\xF3dido incorreto, intente de nuevo ")}finally{_.value=!1}};return(f,n)=>(v(),m("div",se,[o("div",{onClick:R,class:"full-width q-pl-md q-pt-md"},[p(S,{name:"arrow_back",size:"md",color:"dark",class:"cursor-pointer"})]),o("div",le,[o("div",ne,[I.value?(v(),m("div",re,[ie,ce,o("div",ue,[p(O,{submit:B,loading:h.value},null,8,["loading"])]),de,p(k,{onClick:A,loading:g.value,label:"Reenviar c\xF3digo",size:"14px",fill:"",height:"48px",color:"secondary",class:"full-width q-mb-md"},null,8,["loading"])])):x("",!0),I.value?x("",!0):(v(),m("div",pe,[ve,me,o("div",fe,[o("div",ge,[o("label",_e,[U(" Contrase\xF1a "),p(Q,{type:s.value,outlined:"","lazy-rules":"",modelValue:d(w).password,"onUpdate:modelValue":n[1]||(n[1]=y=>d(w).password=y),placeholder:"********",onBlur:n[2]||(n[2]=y=>d(P)("password")),onKeypress:n[3]||(n[3]=y=>d(P)("password"))},{append:K(()=>[p(S,{onClick:n[0]||(n[0]=y=>t()),class:"cursor-pointer",name:e.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),d(b).errors.password?(v(),m("p",he,G(d(b).errors.password),1)):x("",!0)]),p(k,{onClick:z,loading:_.value,disabled:!d(b).isvalid,label:"Guardar",size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md"},null,8,["loading","disabled"])])]))])])]))}};export{Pe as default};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/RecoverypasswordPage.826354e9.js
