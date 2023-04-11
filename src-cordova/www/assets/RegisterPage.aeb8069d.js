import{Q as A}from"./QImg.b039bc03.js";import{l as g,aA as m,Y as c,Z as l,a3 as V,a4 as i,bR as q,F as f,X as b,J as j,b3 as O,c5 as R,V as B,aI as T,b5 as k,bp as E,y as r,bs as N,W as U,br as L}from"./index.63fc166d.js";import{_ as P,Q as D}from"./logo.c641ef6d.js";import{c as G,a as I,u as K}from"./useValidateForm.e0a7b485.js";import{Q as H}from"./QSelect.8484f4d9.js";import{u as J}from"./userAuth.320553cc.js";import"./QItemSection.edc703a2.js";import"./QItemLabel.f5b09a64.js";import"./position-engine.b94ff97b.js";import"./selection.cee9801d.js";import"./rtl.b51694b1.js";import"./format.a33550d6.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./useToast.1d3ed0da.js";const h="Este campo es requerido",Y="Ingrese un email valido",W=G({name:I().required(h),email:I().email(Y).required(h),last_name:I().required(h),phone:I().required(h),password:I().required(h),sex:I()}),X={class:"q-ma-none full-width input"},Z={class:"label-large"},ee={key:0,class:"error"},te={class:"q-ma-none full-width input"},se={class:"label-large"},le={key:0,class:"error"},ae={__name:"StepOne",props:{useForm:{type:Object,required:!0},validatInput:{type:Function,required:!0},validateMessage:{type:Object,required:!0}},emits:["update:modelValue"],setup(t,{emit:w}){const p=t,y=g(p.useForm.name),u=g(p.useForm.last_name),d=(o,e)=>{w("update:modelValue",{key:o,value:e})};return(o,e)=>(m(),c(j,null,[l("div",X,[l("label",Z,[V(" Name "),i(q,{"lazy-rules":"",outlined:"",modelValue:y.value,"onUpdate:modelValue":[e[0]||(e[0]=s=>y.value=s),e[3]||(e[3]=s=>d("name",s))],placeholder:"Luis",onBlur:e[1]||(e[1]=s=>t.validatInput("name")),onKeypress:e[2]||(e[2]=s=>t.validatInput("name"))},null,8,["modelValue"])]),t.validateMessage.errors.name?(m(),c("p",ee,f(t.validateMessage.errors.last_name),1)):b("",!0)]),l("div",te,[l("label",se,[V(" Apellido "),i(q,{"lazy-rules":"",outlined:"",modelValue:u.value,"onUpdate:modelValue":[e[4]||(e[4]=s=>u.value=s),e[7]||(e[7]=s=>d("last_name",s))],placeholder:"Perez",onBlur:e[5]||(e[5]=s=>t.validatInput("last_name")),onKeypress:e[6]||(e[6]=s=>t.validatInput("last_name"))},null,8,["modelValue"])]),t.validateMessage.errors.last_name?(m(),c("p",le,f(t.validateMessage.errors.last_name),1)):b("",!0)])],64))}},oe={class:"q-ma-none full-width input"},ne={class:"label-large"},re={key:0,class:"error"},ie={class:"q-ma-none full-width input"},ue={class:"label-large"},de={key:0,class:"error"},me={__name:"StepTwo",props:{useForm:{type:Object,required:!0},validatInput:{type:Function,required:!0},validateMessage:{type:Object,required:!0}},emits:["update:modelValue"],setup(t,{emit:w}){const p=t,y=g(p.useForm.email),u=g(p.useForm.phone),d=(o,e)=>{w("update:modelValue",{key:o,value:e})};return(o,e)=>(m(),c(j,null,[l("div",oe,[l("label",ne,[V(" Email "),i(q,{"lazy-rules":"",outlined:"",modelValue:y.value,"onUpdate:modelValue":[e[0]||(e[0]=s=>y.value=s),e[3]||(e[3]=s=>d("email",s))],placeholder:"example@gmail.com",onBlur:e[1]||(e[1]=s=>t.validatInput("email")),onKeypress:e[2]||(e[2]=s=>t.validatInput("email"))},null,8,["modelValue"])]),t.validateMessage.errors.email?(m(),c("p",re,f(t.validateMessage.errors.email),1)):b("",!0)]),l("div",ie,[l("label",ue,[V(" Telefono "),i(q,{"lazy-rules":"",type:"tel",outlined:"",modelValue:u.value,"onUpdate:modelValue":[e[4]||(e[4]=s=>u.value=s),e[7]||(e[7]=s=>d("phone",s))],placeholder:"041459789",onBlur:e[5]||(e[5]=s=>t.validatInput("phone")),onKeypress:e[6]||(e[6]=s=>t.validatInput("phone"))},null,8,["modelValue"])]),t.validateMessage.errors.phone?(m(),c("p",de,f(t.validateMessage.errors.phone),1)):b("",!0)])],64))}},pe={class:"q-ma-none full-width input"},ve={class:"label-large"},ce={key:0,class:"error"},ge={class:"q-ma-none full-width input"},ye={class:"label-large"},fe={key:0,class:"error"},be={__name:"StepThree",props:{useForm:{type:Object,required:!0},validatInput:{type:Function,required:!0},validateMessage:{type:Object,required:!0}},emits:["update:modelValue"],setup(t,{emit:w}){const p=t,y=["Hombre","Mujer"],u=g("password"),d=g("visibility_off"),o=()=>{u.value==="password"?(u.value="text",d.value="visibility"):(u.value="password",d.value="visibility_off")},e=g(p.useForm.sex),s=g(p.useForm.password),M=($,a)=>{w("update:modelValue",{key:$,value:a})};return($,a)=>(m(),c(j,null,[l("div",pe,[l("label",ve,[V(" Genero "),i(H,{outlined:"","lazy-rules":"",class:"full-width q-ma-none",modelValue:e.value,"onUpdate:modelValue":[a[0]||(a[0]=n=>e.value=n),a[1]||(a[1]=n=>M("sex",n))],options:y},null,8,["modelValue"])]),t.validateMessage.errors.sex?(m(),c("p",ce,f(t.validateMessage.errors.sex),1)):b("",!0)]),l("div",ge,[l("label",ye,[V(" Contrase\xF1a "),i(q,{"lazy-rules":"",type:u.value,outlined:"",modelValue:s.value,"onUpdate:modelValue":[a[3]||(a[3]=n=>s.value=n),a[6]||(a[6]=n=>M("password",n))],placeholder:"********",onBlur:a[4]||(a[4]=n=>t.validatInput("password")),onKeypress:a[5]||(a[5]=n=>t.validatInput("password"))},{append:O(()=>[i(R,{onClick:a[2]||(a[2]=n=>o()),class:"cursor-pointer",name:d.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),t.validateMessage.errors.password?(m(),c("p",fe,f(t.validateMessage.errors.password),1)):b("",!0)])],64))}},we={class:"full-width items-center row justify-center registerContainer"},Ve={class:"column items-center q-mx-none register"},Ie={class:"column items-center justify-center"},$e=l("p",{class:"q-mb-xl title-large text-center"}," Bienvenido a Tarjeta Joven Diamante ",-1),xe={class:"full-width row justify-between"},he=l("p",{class:"title-medium"},"Crear cuenta",-1),qe={class:"text-weight-bold"},Me={class:"q-mb-md q-ma-none text-dark column items-center full-width"},Fe={class:"full-width"},Se={class:"full-width"},_e={class:"full-width"},ke={class:"q-py-none full-width row",style:{display:"grid","grid-template-columns":"1fr 1fr",gap:"8px"}},Ee=l("span",{class:"text-weight-bold"},"Login",-1),Ke={__name:"RegisterPage",setup(t){const{register:w,isLoadingRegister:p}=J(),u={name:"",email:"",last_name:"",phone:"",sex:["Hombre","Mujer"][0],password:""},d=3,o=g(1),e=()=>o.value++,s=()=>o.value--,M=B(()=>o.value===1),$=B(()=>o.value===d),{useForm:a,validatInput:n,validateMessage:F,validateForm:z}=K({initialValue:u,schema:W}),C=async _=>{z();const v=3;w({...a.value,role_id:v})},S=({key:_,value:v})=>{a.value[_]=v};return(_,v)=>{const Q=T("router-link");return m(),c("div",we,[l("div",Ve,[l("div",Ie,[i(A,{src:P,width:"100px",height:"80px","img-class":"my-custom-image",class:"rounded-borders q-mb-md"}),$e]),i(D,{onSubmit:L(C,["prevent"]),class:"q-gutter-md full-width column items-center loginForm"},{default:O(()=>[l("div",xe,[he,l("p",qe,f(o.value)+"/"+f(d),1)]),l("div",Me,[k(l("div",Fe,[i(ae,{"onUpdate:modelValue":v[0]||(v[0]=x=>S(x)),validateMessage:r(F),validatInput:r(n),useForm:r(a)},null,8,["validateMessage","validatInput","useForm"])],512),[[E,o.value===1]]),k(l("div",Se,[i(me,{"onUpdate:modelValue":v[1]||(v[1]=x=>S(x)),validateMessage:r(F),validatInput:r(n),useForm:r(a)},null,8,["validateMessage","validatInput","useForm"])],512),[[E,o.value===2]]),k(l("div",_e,[i(be,{"onUpdate:modelValue":v[2]||(v[2]=x=>S(x)),validateMessage:r(F),validatInput:r(n),useForm:r(a)},null,8,["validateMessage","validatInput","useForm"])],512),[[E,o.value===3]])]),l("div",ke,[i(N,{disable:r(M),onClick:s,label:"Anterior",class:"",height:"48px",color:"secondary",size:"14px",fill:""},null,8,["disable"]),r($)?b("",!0):(m(),U(N,{key:0,onClick:e,label:"Siguiente",class:"",height:"48px",color:"secondary",size:"14px",fill:""})),r($)?(m(),U(N,{key:1,disable:!r(F).isvalid,type:"submit",label:"Registrar",class:"",height:"48px",color:"primary",loading:r(p),size:"14px",fill:""},null,8,["disable","loading"])):b("",!0)]),i(Q,{class:"text-link",to:"/login"},{default:O(()=>[V("\xBFYa tienes cuenta? "),Ee]),_:1})]),_:1},8,["onSubmit"])])])}}};export{Ke as default};
