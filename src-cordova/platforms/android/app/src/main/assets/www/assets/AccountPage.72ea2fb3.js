import{ce as v,aA as c,Y as b,Z as t,a4 as e,c5 as k,b3 as a,cG as Q,F as m,y as n,b5 as p,W as _,a3 as s,cI as w,cn as f}from"./index.63fc166d.js";import{Q as o}from"./QItemLabel.f5b09a64.js";import{Q as r,a as i}from"./QItemSection.edc703a2.js";import{Q as x}from"./QList.569e9378.js";import{u as q}from"./userAuth.320553cc.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./useToast.1d3ed0da.js";const y={class:"full-width full-height row justify-center items-center"},C={class:"q-pa-md",style:{"max-width":"400px"}},I={class:"row q-mb-md items-center"},B=t("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1),A={class:"q-ma-none"},V={class:"q-ma-none"},j=t("span",{class:"text-weight-bold"},"info@tarjetajovendiamante.com",-1),P={__name:"AccountPage",setup(z){const{user:l}=q(),d=v(),h=()=>{console.log("go back"),d.go(-1)},g=u=>{u.preventDefault(),localStorage.removeItem("user"),d.push("/login")};return(u,D)=>(c(),b("div",y,[t("div",{onClick:h,class:"full-width q-pl-md q-pt-md"},[e(k,{name:"arrow_back",size:"md",color:"dark",class:"cursor-pointer"})]),t("div",C,[t("div",I,[e(Q,{size:"80px",class:"q-mr-md"},{default:a(()=>[B]),_:1}),t("div",null,[t("p",A,m(n(l).name+" "+n(l).last_name),1),t("p",V,m(n(l).email),1)])]),e(w,null,{default:a(()=>[e(x,{bordered:"",padding:""},{default:a(()=>[p((c(),_(i,{clickable:"",to:"/empresa/account/profile"},{default:a(()=>[e(r,null,{default:a(()=>[e(o,null,{default:a(()=>[s("Ver perfil")]),_:1}),e(o,{caption:""},{default:a(()=>[s(" Toda la informacion relacionada de su perfil puede ser editada y la puede visualizar. ")]),_:1})]),_:1})]),_:1})),[[f]]),e(i,null,{default:a(()=>[e(r,null,{default:a(()=>[e(o,null,{default:a(()=>[s("Contactanos a "),j]),_:1}),e(o,{caption:""},{default:a(()=>[s(" Estamos para ayudarte, si tienes alguna duda o problema con tu cuenta puedes contactarnos. ")]),_:1})]),_:1})]),_:1}),p((c(),_(i,{clickable:"",onClick:g},{default:a(()=>[e(r,null,{default:a(()=>[e(o,{class:"text-negative"},{default:a(()=>[s("Cerrar secci\xF3n")]),_:1}),e(o,{caption:""},{default:a(()=>[s(" Cerrar secci\xF3n y volver a la pagina de inicio. ")]),_:1})]),_:1})]),_:1})),[[f]])]),_:1})]),_:1})])]))}};export{P as default};