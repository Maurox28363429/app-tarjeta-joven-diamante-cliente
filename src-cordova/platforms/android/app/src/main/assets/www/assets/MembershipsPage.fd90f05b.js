import{l as w,V as B,aA as l,Y as u,a4 as e,Z as r,F as x,a3 as C,J as k,aG as Q,bs as I,B as $,y,au as E,ce as F,c5 as N,W as P,X as q,b3 as t,cJ as V,cI as j}from"./index.30f6a082.js";import{Q as n}from"./QSkeleton.9bfaa8a3.js";import{Q as o,a as v}from"./QItemSection.e5fa1863.js";import{Q as c}from"./QItemLabel.0fcf9e98.js";import{Q as M}from"./QImg.805f72db.js";import{u as z}from"./userAuth.2f3f2794.js";import{i as R}from"./index.360ce4ab.js";import"./useToast.a57f6721.js";import"./axios.f1f32898.js";var S="assets/checkIcon.a912e1bc.svg";const G={class:"title-large text-secondary text-uppercase q-my-md"},O={class:"text-weight-medium text-h3"},T=r("span",{class:"text-h5"},"$",-1),L={class:"benefitsList"},D={class:"body-medium"},J={class:"full-width button"},W={__name:"MembershipsCard",props:{benefits:{type:Array,required:!0},price:{type:Number,required:!0,default:0},name:{type:String,required:!0,default:""},image:{type:String,required:!0,default:""},id:{type:Number,required:!0}},setup(a){var p,d;const m=a,f="/memberships/",{user:i}=z(),_=w(Boolean(((p=i==null?void 0:i.membresia)==null?void 0:p.id)===7||((d=i==null?void 0:i.membresia)==null?void 0:d.status)==="activa")),b=B(()=>_.value&&m.name==="free"?"disableGray":"plan-white");return(s,h)=>(l(),u("div",{class:$("plan "+y(b))},[e(M,{src:a.image,"spinner-color":"white",style:{height:"58px","max-width":"62px"}},null,8,["src"]),r("p",G,x(a.name),1),r("p",O,[T,C(x(a.price),1)]),r("ul",L,[(l(!0),u(k,null,Q(a.benefits,(g,A)=>(l(),u("li",{key:A},[e(M,{src:S,"spinner-color":"dark",style:{height:"22px","max-width":"22px"}}),r("p",D,x(g),1)]))),128))]),r("div",J,[e(I,{outline:"",color:"secondary",label:"Comprar",class:"full-width",to:f+a.id},null,8,["to"])])],2))}};async function X(){const{data:a}=await R.get("/price-membresia?inversed=true");return a}const Y=()=>{const a=w(!1),m=w([]),f="src/assets/rocket.svg",i="src/assets/plane.svg",_=["Obten descuentos en tus compras","Participa en sorteos y obten premios","Tendras acceso a la compra de productos y servicios premium"],b=["Obten descuentos en tu periodo de prueba","Tendras acceso a productos y servicios premium"],p=async()=>{try{a.value=!0;const{data:d}=await X();m.value=d.map(s=>{const h="Membresia 5 D\xEDas",g="Membresia anual";return s.name===g&&(s.image=f,s.benefits=_),s.name===h&&(s.image=i,s.benefits=b),s})}catch(d){console.log(d)}finally{a.value=!1}};return E(()=>{p()}),{loading:a,memberships:m,fetchMemberships:p}};const Z={class:"memberships"},H=r("div",{class:"background_blue"},null,-1),K={class:"width-full column justify-center membershipsContainer"},U=r("div",{class:"memberships_description column justify-center q-px-md q-mt-xl"},[r("p",{class:"title-large text-center"},"Planes flexibles & precios"),r("p",{class:"body-medium text-center"}," Bienvenido a nuestra plataforma de Tarjeta joven diamante, donde puedes encontrar todas tus tiendas favoritas en un solo lugar.Para hacerlo a\xFAn m\xE1s f\xE1cil, ofrecemos diferentes planes que se adaptan a tus necesidades y presupuesto. ")],-1),ee={key:0,class:"memberships_plans width-full q-pb-xl"},te={key:1,class:"memberships_plans width-full q-pb-xl"},de={__name:"MembershipsPage",setup(a){const m=F(),f=new Array(2).fill(0),{loading:i,memberships:_}=Y(),b=()=>{m.go(-1)};return(p,d)=>(l(),u("div",Z,[H,r("div",{onClick:b,class:"back-button"},[e(N,{name:"arrow_back",size:"md",color:"white",class:"cursor-pointer"})]),r("div",K,[U,y(i)?q("",!0):(l(),u("div",ee,[(l(!0),u(k,null,Q(y(_),s=>(l(),P(W,{key:s.id,image:s.image,name:s.name,price:s.price,benefits:s.benefits,id:s.id},null,8,["image","name","price","benefits","id"]))),128))])),y(i)?(l(),u("div",te,[(l(!0),u(k,null,Q(y(f),(s,h)=>(l(),P(j,{key:h,class:"membership-card-skeleton"},{default:t(()=>[e(v,{class:"row justify-center full-width"},{default:t(()=>[e(o,{avatar:""},{default:t(()=>[e(n,{type:"QAvatar"})]),_:1})]),_:1}),e(o,{class:"q-mb-lg"},{default:t(()=>[e(c,null,{default:t(()=>[e(n,{type:"text"})]),_:1}),e(c,{caption:""},{default:t(()=>[e(n,{type:"text"})]),_:1})]),_:1}),e(v,{class:"benefit"},{default:t(()=>[e(o,{avatar:"",class:"benefitPoint"},{default:t(()=>[e(n,{type:"QAvatar",class:"sizePoint"})]),_:1}),e(o,null,{default:t(()=>[e(c,null,{default:t(()=>[e(n,{type:"text"})]),_:1}),e(c,{caption:""},{default:t(()=>[e(n,{type:"text",width:"65%"})]),_:1})]),_:1})]),_:1}),e(v,{class:"benefit"},{default:t(()=>[e(o,{avatar:"",class:"benefitPoint"},{default:t(()=>[e(n,{type:"QAvatar",class:"sizePoint"})]),_:1}),e(o,null,{default:t(()=>[e(c,null,{default:t(()=>[e(n,{type:"text"})]),_:1}),e(c,{caption:""},{default:t(()=>[e(n,{type:"text",width:"65%"})]),_:1})]),_:1})]),_:1}),e(v,{class:"benefit"},{default:t(()=>[e(o,{avatar:"",class:"benefitPoint"},{default:t(()=>[e(n,{type:"QAvatar",class:"sizePoint"})]),_:1}),e(o,null,{default:t(()=>[e(c,null,{default:t(()=>[e(n,{type:"text"})]),_:1}),e(c,{caption:""},{default:t(()=>[e(n,{type:"text",width:"65%"})]),_:1})]),_:1})]),_:1}),e(V,{class:"full-width"},{default:t(()=>[e(n,{type:"QBtn",class:"full-width"})]),_:1})]),_:1}))),128))])):q("",!0)])]))}};export{de as default};