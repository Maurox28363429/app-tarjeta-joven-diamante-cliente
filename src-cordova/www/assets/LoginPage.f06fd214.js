<<<<<<<< HEAD:src-cordova/www/assets/LoginPage.f06fd214.js
import{Q as S}from"./QImg.805f72db.js";import{l as v,aI as k,aA as c,Y as p,Z as t,a4 as l,b3 as d,a3 as m,bR as w,y as s,F as f,X as g,c5 as A,bs as Q,br as B}from"./index.30f6a082.js";import{_ as L,Q as $}from"./logo.491beb03.js";import{c as C,a as h,u as F}from"./useValidateForm.8c23349e.js";import{u as M}from"./userAuth.2f3f2794.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./useToast.a57f6721.js";const b="Este campo es requerido",N="Ingrese un email valido",P=C({email:h().email(N).required(b),password:h().required(b)}),R={class:"full-width window-height row flex-center loginContainer"},U={class:"full-width q-mx-none column items-center login"},z={class:"column full-width items-center"},D=t("p",{class:"title-large q-mb-xl"},"\xA1Bienvenido de vuelta! :)",-1),G={class:"q-mb-md q-ma-none text-dark column items-center full-width"},K=t("div",{class:"full-width"},[t("p",{class:"title-medium"},"Ingresa a tu cuenta")],-1),T={class:"full-width input"},O={class:"label-large"},X={key:0,class:"text-error"},Y={class:"full-width input"},Z={class:"label-large"},j={key:0,class:"text-error"},H={class:"full-width q-ma-none"},J={class:"full-width column items-center"},W=t("span",{class:"text-weight-bold"},"Reg\xEDstrate",-1),me={__name:"LoginPage",setup(ee){const{login:y,isLoadingLogin:x}=M(),V={email:"",password:""},{useForm:a,validatInput:r,validateMessage:i,validateForm:E}=F({initialValue:V,schema:P}),I=async()=>{E(),y({...a.value})},n=v("password"),u=v("visibility_off"),q=()=>{n.value==="password"?(n.value="text",u.value="visibility"):(n.value="password",u.value="visibility_off")};return(se,e)=>{const _=k("router-link");return c(),p("div",R,[t("div",U,[t("div",z,[l(S,{src:L,width:"200px",height:"auto","img-class":"my-custom-image",class:"q-mb-md"}),D]),l($,{onSubmit:B(I,["prevent"]),class:"q-gutter-md full-width column items-center loginForm"},{default:d(()=>[t("div",G,[K,t("div",T,[t("label",O,[m(" Email "),l(w,{"lazy-rules":"",type:"email",outlined:"",modelValue:s(a).email,"onUpdate:modelValue":e[0]||(e[0]=o=>s(a).email=o),placeholder:"Example@gmail.com",onBlur:e[1]||(e[1]=o=>s(r)("email")),onKeypress:e[2]||(e[2]=o=>s(r)("email"))},null,8,["modelValue"])]),s(i).errors.email?(c(),p("p",X,f(s(i).errors.email),1)):g("",!0)]),t("div",Y,[t("label",Z,[m(" Contrase\xF1a "),l(w,{type:n.value,outlined:"","lazy-rules":"",modelValue:s(a).password,"onUpdate:modelValue":e[4]||(e[4]=o=>s(a).password=o),placeholder:"********",onBlur:e[5]||(e[5]=o=>s(r)("password")),onKeypress:e[6]||(e[6]=o=>s(r)("password"))},{append:d(()=>[l(A,{onClick:e[3]||(e[3]=o=>q()),class:"cursor-pointer",name:u.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),s(i).errors.password?(c(),p("p",j,f(s(i).errors.password),1)):g("",!0)])]),t("div",H,[l(_,{class:"text-link body-medium text-primary",to:"/forgotpassword"},{default:d(()=>[m(" Olvid\xE9 mi contrase\xF1a ")]),_:1})]),t("div",J,[l(Q,{disable:!s(i).isvalid,label:"Login",size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md",loading:s(x),type:"submit"},null,8,["disable","loading"]),l(_,{class:"body-small text-primary",to:"/register"},{default:d(()=>[m(" \xBFA\xFAn no tienes cuenta? "),W]),_:1})])]),_:1},8,["onSubmit"])])])}}};export{me as default};
========
import{Q as S}from"./QImg.6e5581d1.js";import{l as v,aI as k,aA as c,Y as p,Z as t,a4 as l,b3 as d,a3 as m,bR as w,y as s,F as f,X as g,c5 as A,bs as Q,br as B}from"./index.f2854204.js";import{_ as L,Q as $}from"./logo.8890e2a5.js";import{c as C,a as h,u as F}from"./useValidateForm.9756592b.js";import{u as M}from"./userAuth.958f8d0b.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./useToast.2a507564.js";const b="Este campo es requerido",N="Ingrese un email valido",P=C({email:h().email(N).required(b),password:h().required(b)}),R={class:"full-width window-height row flex-center loginContainer"},U={class:"full-width q-mx-none column items-center login"},z={class:"column full-width items-center"},D=t("p",{class:"title-large q-mb-xl"},"\xA1Bienvenido de vuelta! :)",-1),G={class:"q-mb-md q-ma-none text-dark column items-center full-width"},K=t("div",{class:"full-width"},[t("p",{class:"title-medium"},"Ingresa a tu cuenta")],-1),T={class:"full-width input"},O={class:"label-large"},X={key:0,class:"text-error"},Y={class:"full-width input"},Z={class:"label-large"},j={key:0,class:"text-error"},H={class:"full-width q-ma-none"},J={class:"full-width column items-center"},W=t("span",{class:"text-weight-bold"},"Reg\xEDstrate",-1),me={__name:"LoginPage",setup(ee){const{login:y,isLoadingLogin:x}=M(),V={email:"",password:""},{useForm:a,validatInput:r,validateMessage:i,validateForm:E}=F({initialValue:V,schema:P}),I=async()=>{E(),y({...a.value})},n=v("password"),u=v("visibility_off"),q=()=>{n.value==="password"?(n.value="text",u.value="visibility"):(n.value="password",u.value="visibility_off")};return(se,e)=>{const _=k("router-link");return c(),p("div",R,[t("div",U,[t("div",z,[l(S,{src:L,width:"100px",height:"80px","img-class":"my-custom-image",class:"q-mb-md"}),D]),l($,{onSubmit:B(I,["prevent"]),class:"q-gutter-md full-width column items-center loginForm"},{default:d(()=>[t("div",G,[K,t("div",T,[t("label",O,[m(" Email "),l(w,{"lazy-rules":"",type:"email",outlined:"",modelValue:s(a).email,"onUpdate:modelValue":e[0]||(e[0]=o=>s(a).email=o),placeholder:"Example@gmail.com",onBlur:e[1]||(e[1]=o=>s(r)("email")),onKeypress:e[2]||(e[2]=o=>s(r)("email"))},null,8,["modelValue"])]),s(i).errors.email?(c(),p("p",X,f(s(i).errors.email),1)):g("",!0)]),t("div",Y,[t("label",Z,[m(" Contrase\xF1a "),l(w,{type:n.value,outlined:"","lazy-rules":"",modelValue:s(a).password,"onUpdate:modelValue":e[4]||(e[4]=o=>s(a).password=o),placeholder:"********",onBlur:e[5]||(e[5]=o=>s(r)("password")),onKeypress:e[6]||(e[6]=o=>s(r)("password"))},{append:d(()=>[l(A,{onClick:e[3]||(e[3]=o=>q()),class:"cursor-pointer",name:u.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),s(i).errors.password?(c(),p("p",j,f(s(i).errors.password),1)):g("",!0)])]),t("div",H,[l(_,{class:"text-link body-medium text-primary",to:"/forgotpassword"},{default:d(()=>[m(" Olvid\xE9 mi contrase\xF1a ")]),_:1})]),t("div",J,[l(Q,{disable:!s(i).isvalid,label:"Login",size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md",loading:s(x),type:"submit"},null,8,["disable","loading"]),l(_,{class:"body-small text-primary",to:"/register"},{default:d(()=>[m(" \xBFA\xFAn no tienes cuenta? "),W]),_:1})])]),_:1},8,["onSubmit"])])])}}};export{me as default};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/LoginPage.80f2e824.js