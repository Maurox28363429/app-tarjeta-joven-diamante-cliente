import{u as k,Q as S}from"./userAuth.b3b81b20.js";import{r as v,a2 as Q,a3 as c,a4 as p,a5 as t,a6 as a,a7 as d,a8 as A,a9 as m,Q as w,aa as s,ab as f,ac as g,ad as B,k as $}from"./index.639bd1b3.js";import{_ as C,Q as L}from"./logo.a8bfd99e.js";import{c as F,a as h,u as M}from"./useValidateForm.c9325e2b.js";import"./useToast.aab6b583.js";import"./axios.f1f32898.js";const y="Este campo es requerido",N="Ingrese un email valido",P=F({email:h().email(N).required(y),password:h().required(y)}),U={class:"full-width window-height row flex-center loginContainer"},z={class:"full-width q-mx-none column items-center login"},R={class:"column full-width items-center"},D=t("p",{class:"title-large q-mb-xl"},"\xA1Bienvenido de vuelta! :)",-1),G={class:"q-mb-md q-ma-none text-dark column items-center full-width"},K=t("div",{class:"full-width"},[t("p",{class:"title-medium"},"Ingresa a tu cuenta")],-1),T={class:"full-width input"},O={class:"label-large"},j={key:0,class:"text-error"},H={class:"full-width input"},J={class:"label-large"},W={key:0,class:"text-error"},X={class:"full-width q-ma-none"},Y={class:"full-width column items-center"},Z=t("span",{class:"text-weight-bold"},"Reg\xEDstrate",-1),ne={__name:"loginPage",setup(ee){const{login:b,isLoadingLogin:x}=k(),V={email:"",password:""},{useForm:l,validatInput:r,validateMessage:i,validateForm:E}=M({initialValue:V,schema:P}),q=async()=>{E(),b({...l.value})},n=v("password"),u=v("visibility_off"),I=()=>{n.value==="password"?(n.value="text",u.value="visibility"):(n.value="password",u.value="visibility_off")};return(se,e)=>{const _=Q("router-link");return c(),p("div",U,[t("div",z,[t("div",R,[a(S,{src:C,width:"100px",height:"80px","img-class":"my-custom-image",class:"q-mb-md"}),D]),a(L,{onSubmit:A(q,["prevent"]),class:"q-gutter-md full-width column items-center loginForm"},{default:d(()=>[t("div",G,[K,t("div",T,[t("label",O,[m(" Email "),a(w,{"lazy-rules":"",type:"email",outlined:"",modelValue:s(l).email,"onUpdate:modelValue":e[0]||(e[0]=o=>s(l).email=o),placeholder:"Example@gmail.com",onBlur:e[1]||(e[1]=o=>s(r)("email")),onKeypress:e[2]||(e[2]=o=>s(r)("email"))},null,8,["modelValue"])]),s(i).errors.email?(c(),p("p",j,f(s(i).errors.email),1)):g("",!0)]),t("div",H,[t("label",J,[m(" Contrase\xF1a "),a(w,{type:n.value,outlined:"","lazy-rules":"",modelValue:s(l).password,"onUpdate:modelValue":e[4]||(e[4]=o=>s(l).password=o),placeholder:"********",onBlur:e[5]||(e[5]=o=>s(r)("password")),onKeypress:e[6]||(e[6]=o=>s(r)("password"))},{append:d(()=>[a(B,{onClick:e[3]||(e[3]=o=>I()),class:"cursor-pointer",name:u.value,color:"primary"},null,8,["name"])]),_:1},8,["type","modelValue"])]),s(i).errors.password?(c(),p("p",W,f(s(i).errors.password),1)):g("",!0)])]),t("div",X,[a(_,{class:"text-link body-medium text-primary",to:"/forgotpassword"},{default:d(()=>[m(" Olvid\xE9 mi contrase\xF1a ")]),_:1})]),t("div",Y,[a($,{disable:!s(i).isvalid,label:"Login",size:"14px",fill:"",height:"48px",color:"primary",class:"full-width q-mb-md",loading:s(x),type:"submit"},null,8,["disable","loading"]),a(_,{class:"body-small text-primary",to:"/register"},{default:d(()=>[m(" \xBFA\xFAn no tienes cuenta? "),Z]),_:1})])]),_:1},8,["onSubmit"])])])}}};export{ne as default};
