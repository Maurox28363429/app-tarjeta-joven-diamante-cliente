<<<<<<<< HEAD:src-cordova/www/assets/ProfilePage.9d2ffac9.js
import{cE as z,l as E,aA as v,Y as b,Z as r,a4 as e,b3 as a,cG as $,a3 as o,F as i,y as l,br as q,bR as g,X as y,bs as C,cb as U,aD as T,aB as D}from"./index.30f6a082.js";import{a as _,Q as p}from"./QItemSection.e5fa1863.js";import{Q as d}from"./QItemLabel.0fcf9e98.js";import{Q as I}from"./QList.95cf641a.js";import{Q as G}from"./QSelect.61c24c35.js";import{u as j}from"./userAuth.2f3f2794.js";import{u as F}from"./useValidateForm.8c23349e.js";import{u as K,a as L}from"./updateUser.ebdff612.js";import{u as M}from"./useToast.a57f6721.js";import"./position-engine.e4f37f04.js";import"./selection.a13f7bd0.js";import"./rtl.b51694b1.js";import"./format.a33550d6.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";const Q=h=>(T("data-v-011a5b34"),h=h(),D(),h),O={class:"full-width row justify-center"},R=Q(()=>r("div",{class:"full-width title-large q-pt-lg q-pl-lg"},[r("p",null,"Perfil")],-1)),H={class:"q-pa-md full-width row wrap justify-center container"},W=Q(()=>r("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1)),X=["onSubmit"],Y={class:"full-width input"},Z={class:"label-large"},J={key:0,class:"error"},ee={class:"full-width input"},le={class:"label-large"},ae={key:0,class:"error"},te={class:"full-width input"},se={class:"label-large"},oe={key:0,class:"error"},re={class:"full-width input"},ne={class:"label-large"},ue={key:0,class:"error"},de={class:"full-width input"},ie={class:"label-large"},me={class:"q-ma-none full-width input"},pe={class:"label-large"},_e={key:0,class:"error"},fe={__name:"ProfilePage",setup(h){const{triggerPositive:S,triggerWarning:P}=M(),V=E(!1),{user:n,updatedUser:A}=j(),x=[{label:"Mujer",value:0},{label:"Hombre",value:1}],w=x.find(c=>c.value===n.value.sex),k={name:n.value.name,email:n.value.email,last_name:n.value.last_name,phone:n.value.phone,sex:w,address:n.value.address},{useForm:u,validatInput:f,validateMessage:m,validateForm:B}=F({initialValue:k,schema:K}),N=async()=>{B();try{V.value=!0;const c={...u.value,role_id:n.value.role_id,active:n.value.active,id:n.value.id,sex:u.value.sex.value};await L(c);const t=U.getUser();U.setUser({user:{...t.user,...c},token:t.token}),A(),S("Usuario actualizado con \xE9xito")}catch(c){console.log(c),P("Ah ocurrido un error, intente nuevamente")}finally{V.value=!1}};return(c,t)=>(v(),b("div",O,[R,r("div",H,[e(I,{bordered:"",padding:"",separator:"",class:"profile rounded-borders"},{default:a(()=>[e(_,null,{default:a(()=>[e(p,{class:"row justify-center full-width items-center"},{default:a(()=>[e($,{size:"80px",class:"q-mr-md"},{default:a(()=>[W]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Nombre")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Apellido")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).last_name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Email")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).email),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Telefono")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).phone),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Genero")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(w).label),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Direccion")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).address),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(I,{bordered:"",padding:"",separator:"",class:"editContainer rounded-borders"},{default:a(()=>[r("form",{onSubmit:q(N,["prevent"])},[e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,{class:"title-medium"},{default:a(()=>[o("Editar")]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,{class:"formContainer"},{default:a(()=>[r("div",Y,[r("label",Z,[o(" Name "),e(g,{"lazy-rules":"",type:"text",outlined:"",placeholder:"Pepito",modelValue:l(u).name,"onUpdate:modelValue":t[0]||(t[0]=s=>l(u).name=s),onBlur:t[1]||(t[1]=s=>l(f)("name")),onKeypress:t[2]||(t[2]=s=>l(f)("name"))},null,8,["modelValue"])]),l(m).errors.name?(v(),b("p",J,i(l(m).errors.name),1)):y("",!0)]),r("div",ee,[r("label",le,[o(" Apellido "),e(g,{"lazy-rules":"",type:"text",modelValue:l(u).last_name,"onUpdate:modelValue":t[3]||(t[3]=s=>l(u).last_name=s),outlined:"",placeholder:"Apellido",onBlur:t[4]||(t[4]=s=>l(f)("last_name")),onKeypress:t[5]||(t[5]=s=>l(f)("last_name"))},null,8,["modelValue"])]),l(m).errors.last_name?(v(),b("p",ae,i(l(m).errors.last_name),1)):y("",!0)]),r("div",te,[r("label",se,[o(" Email "),e(g,{"lazy-rules":"",type:"email",modelValue:l(u).email,"onUpdate:modelValue":t[6]||(t[6]=s=>l(u).email=s),outlined:"",placeholder:"example@gmail.com",onBlur:t[7]||(t[7]=s=>l(f)("email")),onKeypress:t[8]||(t[8]=s=>l(f)("email"))},null,8,["modelValue"])]),l(m).errors.email?(v(),b("p",oe,i(l(m).errors.email),1)):y("",!0)]),r("div",re,[r("label",ne,[o(" Telefono "),e(g,{"lazy-rules":"",type:"tel",modelValue:l(u).phone,"onUpdate:modelValue":t[9]||(t[9]=s=>l(u).phone=s),outlined:"",placeholder:"0414767997",onBlur:t[10]||(t[10]=s=>l(f)("phone")),onKeypress:t[11]||(t[11]=s=>l(f)("phone"))},null,8,["modelValue"])]),l(m).errors.phone?(v(),b("p",ue,i(l(m).errors.phone),1)):y("",!0)]),r("div",de,[r("label",ie,[o(" Direccion "),e(g,{modelValue:l(u).address,"onUpdate:modelValue":t[12]||(t[12]=s=>l(u).address=s),"lazy-rules":"",type:"text",outlined:"",placeholder:""},null,8,["modelValue"])])]),r("div",me,[r("label",pe,[o(" Genero "),e(G,{outlined:"","lazy-rules":"",modelValue:l(u).sex,"onUpdate:modelValue":t[13]||(t[13]=s=>l(u).sex=s),class:"full-width q-ma-none",options:x},null,8,["modelValue"])]),l(m).errors.sex?(v(),b("p",_e,i(l(m).errors.sex),1)):y("",!0)]),e(p,{class:"button"},{default:a(()=>[e(C,{loading:V.value,type:"submit",color:"primary",label:"Guardar"},null,8,["loading"])]),_:1})]),_:1})]),_:1})],40,X)]),_:1})])]))}};var ke=z(fe,[["__scopeId","data-v-011a5b34"]]);export{ke as default};
========
import{cE as z,l as E,aA as v,Y as b,Z as r,a4 as e,b3 as a,cG as $,a3 as o,F as i,y as l,br as q,bR as g,X as y,bs as C,cb as U,aD as T,aB as D}from"./index.f2854204.js";import{a as _,Q as p}from"./QItemSection.7aeaf6f8.js";import{Q as d}from"./QItemLabel.590af1b2.js";import{Q as I}from"./QList.44c51499.js";import{Q as G}from"./QSelect.788ff9c2.js";import{u as j}from"./userAuth.958f8d0b.js";import{u as F}from"./useValidateForm.9756592b.js";import{u as K,a as L}from"./updateUser.9016cc0a.js";import{u as M}from"./useToast.2a507564.js";import"./position-engine.9a306e1e.js";import"./selection.e1440f78.js";import"./rtl.b51694b1.js";import"./format.a33550d6.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";const Q=h=>(T("data-v-011a5b34"),h=h(),D(),h),O={class:"full-width row justify-center"},R=Q(()=>r("div",{class:"full-width title-large q-pt-lg q-pl-lg"},[r("p",null,"Perfil")],-1)),H={class:"q-pa-md full-width row wrap justify-center container"},W=Q(()=>r("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1)),X=["onSubmit"],Y={class:"full-width input"},Z={class:"label-large"},J={key:0,class:"error"},ee={class:"full-width input"},le={class:"label-large"},ae={key:0,class:"error"},te={class:"full-width input"},se={class:"label-large"},oe={key:0,class:"error"},re={class:"full-width input"},ne={class:"label-large"},ue={key:0,class:"error"},de={class:"full-width input"},ie={class:"label-large"},me={class:"q-ma-none full-width input"},pe={class:"label-large"},_e={key:0,class:"error"},fe={__name:"ProfilePage",setup(h){const{triggerPositive:S,triggerWarning:P}=M(),V=E(!1),{user:n,updatedUser:A}=j(),x=[{label:"Mujer",value:0},{label:"Hombre",value:1}],w=x.find(c=>c.value===n.value.sex),k={name:n.value.name,email:n.value.email,last_name:n.value.last_name,phone:n.value.phone,sex:w,address:n.value.address},{useForm:u,validatInput:f,validateMessage:m,validateForm:B}=F({initialValue:k,schema:K}),N=async()=>{B();try{V.value=!0;const c={...u.value,role_id:n.value.role_id,active:n.value.active,id:n.value.id,sex:u.value.sex.value};await L(c);const t=U.getUser();U.setUser({user:{...t.user,...c},token:t.token}),A(),S("Usuario actualizado con \xE9xito")}catch(c){console.log(c),P("Ah ocurrido un error, intente nuevamente")}finally{V.value=!1}};return(c,t)=>(v(),b("div",O,[R,r("div",H,[e(I,{bordered:"",padding:"",separator:"",class:"profile rounded-borders"},{default:a(()=>[e(_,null,{default:a(()=>[e(p,{class:"row justify-center full-width items-center"},{default:a(()=>[e($,{size:"80px",class:"q-mr-md"},{default:a(()=>[W]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Nombre")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Apellido")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).last_name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Email")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).email),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Telefono")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).phone),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Genero")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(w).label),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,null,{default:a(()=>[o("Direccion")]),_:1}),e(d,{caption:""},{default:a(()=>[o(i(l(n).address),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(I,{bordered:"",padding:"",separator:"",class:"editContainer rounded-borders"},{default:a(()=>[r("form",{onSubmit:q(N,["prevent"])},[e(_,null,{default:a(()=>[e(p,null,{default:a(()=>[e(d,{class:"title-medium"},{default:a(()=>[o("Editar")]),_:1})]),_:1})]),_:1}),e(_,null,{default:a(()=>[e(p,{class:"formContainer"},{default:a(()=>[r("div",Y,[r("label",Z,[o(" Name "),e(g,{"lazy-rules":"",type:"text",outlined:"",placeholder:"Pepito",modelValue:l(u).name,"onUpdate:modelValue":t[0]||(t[0]=s=>l(u).name=s),onBlur:t[1]||(t[1]=s=>l(f)("name")),onKeypress:t[2]||(t[2]=s=>l(f)("name"))},null,8,["modelValue"])]),l(m).errors.name?(v(),b("p",J,i(l(m).errors.name),1)):y("",!0)]),r("div",ee,[r("label",le,[o(" Apellido "),e(g,{"lazy-rules":"",type:"text",modelValue:l(u).last_name,"onUpdate:modelValue":t[3]||(t[3]=s=>l(u).last_name=s),outlined:"",placeholder:"Apellido",onBlur:t[4]||(t[4]=s=>l(f)("last_name")),onKeypress:t[5]||(t[5]=s=>l(f)("last_name"))},null,8,["modelValue"])]),l(m).errors.last_name?(v(),b("p",ae,i(l(m).errors.last_name),1)):y("",!0)]),r("div",te,[r("label",se,[o(" Email "),e(g,{"lazy-rules":"",type:"email",modelValue:l(u).email,"onUpdate:modelValue":t[6]||(t[6]=s=>l(u).email=s),outlined:"",placeholder:"example@gmail.com",onBlur:t[7]||(t[7]=s=>l(f)("email")),onKeypress:t[8]||(t[8]=s=>l(f)("email"))},null,8,["modelValue"])]),l(m).errors.email?(v(),b("p",oe,i(l(m).errors.email),1)):y("",!0)]),r("div",re,[r("label",ne,[o(" Telefono "),e(g,{"lazy-rules":"",type:"tel",modelValue:l(u).phone,"onUpdate:modelValue":t[9]||(t[9]=s=>l(u).phone=s),outlined:"",placeholder:"0414767997",onBlur:t[10]||(t[10]=s=>l(f)("phone")),onKeypress:t[11]||(t[11]=s=>l(f)("phone"))},null,8,["modelValue"])]),l(m).errors.phone?(v(),b("p",ue,i(l(m).errors.phone),1)):y("",!0)]),r("div",de,[r("label",ie,[o(" Direccion "),e(g,{modelValue:l(u).address,"onUpdate:modelValue":t[12]||(t[12]=s=>l(u).address=s),"lazy-rules":"",type:"text",outlined:"",placeholder:""},null,8,["modelValue"])])]),r("div",me,[r("label",pe,[o(" Genero "),e(G,{outlined:"","lazy-rules":"",modelValue:l(u).sex,"onUpdate:modelValue":t[13]||(t[13]=s=>l(u).sex=s),class:"full-width q-ma-none",options:x},null,8,["modelValue"])]),l(m).errors.sex?(v(),b("p",_e,i(l(m).errors.sex),1)):y("",!0)]),e(p,{class:"button"},{default:a(()=>[e(C,{loading:V.value,type:"submit",color:"primary",label:"Guardar"},null,8,["loading"])]),_:1})]),_:1})]),_:1})],40,X)]),_:1})])]))}};var ke=z(fe,[["__scopeId","data-v-011a5b34"]]);export{ke as default};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/ProfilePage.37d60ffa.js
