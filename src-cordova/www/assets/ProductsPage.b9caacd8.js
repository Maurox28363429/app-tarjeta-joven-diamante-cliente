import{l as c,a_ as y,au as q,aA as f,Y as _,Z as i,a4 as a,b3 as e,c5 as d,bR as x,J as w,aG as P,cF as Q,a3 as s,F as u,cI as I}from"./index.63fc166d.js";import{a as V,Q as m}from"./QItemSection.edc703a2.js";import{Q as p}from"./QItemLabel.f5b09a64.js";import{Q as k}from"./QList.569e9378.js";import{Q as j}from"./QPagination.7595b30e.js";import{i as B}from"./index.360ce4ab.js";import{u as C}from"./userAuth.320553cc.js";import"./format.a33550d6.js";import"./axios.f1f32898.js";import"./useToast.1d3ed0da.js";const F=i("p",{class:"q-ml-lg q-mt-lg title-large"},"Ofertas",-1),L={class:"full-width full-height row justify-center q-mt-lg"},N={class:"full-width full-height row wrap q-gutter-lg justify-center q-my-lg"},S=["src"],U={class:"full-width full-height row wrap q-gutter-lg justify-center q-my-lg"},$={__name:"ProductsPage",setup(A){const{user:b}=C();console.log(b);const n=c(1),h=c(0),v=c([]),o=c("");y(n,async l=>{await g()}),y(o,async l=>{await g()});function g(){B.get("/comercio-ofertas?with[]=comercio&nombre="+o.value+"&page="+n.value).then(l=>{console.log(l.data),v.value=l.data.data,h.value=l.data.pagination.lastPage,n.value=l.data.pagination.currentPage}).catch(l=>{console.log(l)})}return q(async()=>{await g()}),(l,r)=>(f(),_(w,null,[F,i("div",L,[a(x,{modelValue:o.value,"onUpdate:modelValue":r[1]||(r[1]=t=>o.value=t),outlined:"",type:"search",label:"Buscar ofertas",color:"primary"},{append:e(()=>[a(d,{name:"search",modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=t=>o.value=t)},null,8,["modelValue"])]),_:1},8,["modelValue"])]),i("div",N,[(f(!0),_(w,null,P(v.value,t=>(f(),_("div",{style:{"min-height":"250px",width:"250px"},key:t.id},[a(I,{class:"my-card"},{default:e(()=>[i("img",{src:t.img_array_url[0]?t.img_array_url[0]:"https://cdn.quasar.dev/img/mountains.jpg"},null,8,S),a(Q,null,{default:e(()=>[a(k,null,{default:e(()=>[a(V,{clickable:""},{default:e(()=>[a(m,{avatar:""},{default:e(()=>[a(d,{color:"primary",name:"add_shopping_cart"})]),_:1}),a(m,null,{default:e(()=>[a(p,null,{default:e(()=>[s(u(t.nombre),1)]),_:2},1024),a(p,{caption:""},{default:e(()=>[a(d,{color:"primary",name:"add_shopping_cart"}),s(" "+u(t.comercio.name),1)]),_:2},1024)]),_:2},1024)]),_:2},1024),a(V,{clickable:""},{default:e(()=>[a(m,{avatar:""},{default:e(()=>[a(d,{color:"red",name:"sell"})]),_:1}),a(m,null,{default:e(()=>[a(p,null,{default:e(()=>[s(u(t.price_total)+" $",1)]),_:2},1024),a(p,{caption:""},{default:e(()=>[s("Descuento"+u(t.descuento)+" %",1)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024),a(Q,{class:"q-pt-none"},{default:e(()=>[s(u(t.description),1)]),_:2},1024)]),_:2},1024)]))),128))]),i("div",U,[a(j,{style:{"margin-top":"1em"},modelValue:n.value,"onUpdate:modelValue":r[2]||(r[2]=t=>n.value=t),max:h.value,"boundary-numbers":""},null,8,["modelValue","max"])])],64))}};export{$ as default};
