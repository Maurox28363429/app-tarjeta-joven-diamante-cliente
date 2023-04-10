import{cD as q,l as S,cb as w,a_ as E,aA as v,Y as b,Z as r,a4 as e,b3 as l,cF as C,a3 as o,F as i,y as t,br as D,bR as g,X as h,bs as T,aD as F,aB as j}from"./index.159dbc85.js";import{a as _,Q as p}from"./QItemSection.23f2c9c1.js";import{Q as d}from"./QItemLabel.44ce42cb.js";import{Q}from"./QList.ce99b7ef.js";import{Q as G}from"./QSelect.4f3ad599.js";import{u as K}from"./userAuth.094ba422.js";import{u as L}from"./useValidateForm.f082e219.js";import{u as M,a as O}from"./updateUser.4979cd45.js";import{u as R}from"./useToast.5a10944e.js";import"./position-engine.85e31a64.js";import"./selection.0cc845f6.js";import"./rtl.b51694b1.js";import"./format.a33550d6.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./use-quasar.053a434a.js";const P=y=>(F("data-v-7b0361f3"),y=y(),j(),y),H={class:"full-width row justify-center"},W=P(()=>r("div",{class:"full-width title-large q-pt-lg q-pl-lg"},[r("p",null,"Perfil")],-1)),X={class:"q-pa-md full-width row wrap justify-center container"},Y=P(()=>r("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1)),Z=["onSubmit"],J={class:"full-width input"},ee={class:"label-large"},le={key:0,class:"error"},ae={class:"full-width input"},te={class:"label-large"},se={key:0,class:"error"},oe={class:"full-width input"},re={class:"label-large"},ue={key:0,class:"error"},ne={class:"full-width input"},de={class:"label-large"},ie={key:0,class:"error"},me={class:"full-width input"},pe={class:"label-large"},_e={class:"q-ma-none full-width input"},fe={class:"label-large"},ce={key:0,class:"error"},ve={__name:"ProfilePage",setup(y){const{triggerPositive:A,triggerWarning:k}=R(),V=S(!1),{user:x,updatedUser:B}=K(),u=S(w.getUser().user);E(x,()=>{u.value=x});const U=[{label:"Mujer",value:0},{label:"Hombre",value:1}],I=U.find(c=>c.value===u.value.sex),N={name:u.value.name,email:u.value.email,last_name:u.value.last_name,phone:u.value.phone,sex:I,address:u.value.address},{useForm:n,validatInput:f,validateMessage:m,validateForm:z}=L({initialValue:N,schema:M}),$=async()=>{z();try{V.value=!0;const c={...n.value,role_id:u.value.role_id,active:u.value.active,id:u.value.id,sex:n.value.sex.value};await O(c);const a=w.getUser();w.setUser({user:{...a.user,...c},token:a.token}),B(),A("Usuario actualizado con \xE9xito")}catch(c){console.log(c),k("Ah ocurrido un error, intente nuevamente")}finally{V.value=!1}};return(c,a)=>(v(),b("div",H,[W,r("div",X,[e(Q,{bordered:"",padding:"",separator:"",class:"profile rounded-borders"},{default:l(()=>[e(_,null,{default:l(()=>[e(p,{class:"row justify-center full-width items-center"},{default:l(()=>[e(C,{size:"80px",class:"q-mr-md"},{default:l(()=>[Y]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Nombre")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(u.value.name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Apellido")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(u.value.last_name),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Email")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(u.value.email),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Telefono")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(u.value.phone),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Genero")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(t(I).label),1)]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[o("Direccion")]),_:1}),e(d,{caption:""},{default:l(()=>[o(i(u.value.address),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(Q,{bordered:"",padding:"",separator:"",class:"editContainer rounded-borders"},{default:l(()=>[r("form",{onSubmit:D($,["prevent"])},[e(_,null,{default:l(()=>[e(p,null,{default:l(()=>[e(d,{class:"title-medium"},{default:l(()=>[o("Editar")]),_:1})]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(p,{class:"formContainer"},{default:l(()=>[r("div",J,[r("label",ee,[o(" Name "),e(g,{"lazy-rules":"",type:"text",outlined:"",placeholder:"Pepito",modelValue:t(n).name,"onUpdate:modelValue":a[0]||(a[0]=s=>t(n).name=s),onBlur:a[1]||(a[1]=s=>t(f)("name")),onKeypress:a[2]||(a[2]=s=>t(f)("name"))},null,8,["modelValue"])]),t(m).errors.name?(v(),b("p",le,i(t(m).errors.name),1)):h("",!0)]),r("div",ae,[r("label",te,[o(" Apellido "),e(g,{"lazy-rules":"",type:"text",modelValue:t(n).last_name,"onUpdate:modelValue":a[3]||(a[3]=s=>t(n).last_name=s),outlined:"",placeholder:"Apellido",onBlur:a[4]||(a[4]=s=>t(f)("last_name")),onKeypress:a[5]||(a[5]=s=>t(f)("last_name"))},null,8,["modelValue"])]),t(m).errors.last_name?(v(),b("p",se,i(t(m).errors.last_name),1)):h("",!0)]),r("div",oe,[r("label",re,[o(" Email "),e(g,{"lazy-rules":"",type:"email",modelValue:t(n).email,"onUpdate:modelValue":a[6]||(a[6]=s=>t(n).email=s),outlined:"",placeholder:"example@gmail.com",onBlur:a[7]||(a[7]=s=>t(f)("email")),onKeypress:a[8]||(a[8]=s=>t(f)("email"))},null,8,["modelValue"])]),t(m).errors.email?(v(),b("p",ue,i(t(m).errors.email),1)):h("",!0)]),r("div",ne,[r("label",de,[o(" Telefono "),e(g,{"lazy-rules":"",type:"tel",modelValue:t(n).phone,"onUpdate:modelValue":a[9]||(a[9]=s=>t(n).phone=s),outlined:"",placeholder:"0414767997",onBlur:a[10]||(a[10]=s=>t(f)("phone")),onKeypress:a[11]||(a[11]=s=>t(f)("phone"))},null,8,["modelValue"])]),t(m).errors.phone?(v(),b("p",ie,i(t(m).errors.phone),1)):h("",!0)]),r("div",me,[r("label",pe,[o(" Direccion "),e(g,{modelValue:t(n).address,"onUpdate:modelValue":a[12]||(a[12]=s=>t(n).address=s),"lazy-rules":"",type:"text",outlined:"",placeholder:""},null,8,["modelValue"])])]),r("div",_e,[r("label",fe,[o(" Genero "),e(G,{outlined:"","lazy-rules":"",modelValue:t(n).sex,"onUpdate:modelValue":a[13]||(a[13]=s=>t(n).sex=s),class:"full-width q-ma-none",options:U},null,8,["modelValue"])]),t(m).errors.sex?(v(),b("p",ce,i(t(m).errors.sex),1)):h("",!0)]),e(p,{class:"button"},{default:l(()=>[e(T,{loading:V.value,type:"submit",color:"primary",label:"Guardar"},null,8,["loading"])]),_:1})]),_:1})]),_:1})],40,Z)]),_:1})])]))}};var ze=q(ve,[["__scopeId","data-v-7b0361f3"]]);export{ze as default};
