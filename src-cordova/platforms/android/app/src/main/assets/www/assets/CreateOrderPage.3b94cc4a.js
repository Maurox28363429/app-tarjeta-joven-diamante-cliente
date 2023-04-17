import{V as $,l as r,a_ as T,au as U,aA as q,Y as P,Z as o,F as s,y as v,a4 as l,b3 as E,c5 as M,bR as L,J as V,aG as N,bs as _}from"./index.f2854204.js";import{Q as R}from"./QInnerLoading.91a81652.js";import{Q as j}from"./QImg.6e5581d1.js";import{Q as G}from"./QPagination.33bbd4ba.js";import{Q as J}from"./QTable.2bb885b5.js";import{i as D}from"./index.360ce4ab.js";import{u as Y}from"./userAuth.958f8d0b.js";import{u as Z}from"./userCart.0d68326e.js";import{u as H}from"./useToast.2a507564.js";import"./format.a33550d6.js";import"./QList.44c51499.js";import"./QSelect.788ff9c2.js";import"./QItemSection.7aeaf6f8.js";import"./QItemLabel.590af1b2.js";import"./position-engine.9a306e1e.js";import"./selection.e1440f78.js";import"./rtl.b51694b1.js";import"./axios.f1f32898.js";async function K({name:g="",id:i,page:d=1}){const{data:u}=await D.get(`/comercio-ofertas?comercio_id=${i}&nombre=${g}&page=${d}`);return u}async function X({comercio_id:g,total_descuento:i,ofertas:d,total:u,client_id:m}){const{data:h}=await D.post("/cliente-comercio-ofertas",{comercio_id:g,total_descuento:i,ofertas:d,total:u,client_id:m});return h}const ee={class:"q-ma-md body-large"},ae={class:"q-ma-md body-small",style:{color:"#363636"}},te={class:"orderContainer"},oe={class:"full-height q-mx-md"},le={class:"full-width q-mb-lg row justify-center q-mt-lg"},ne={class:"containerCard"},se={class:""},ie={class:"text-center column"},re={class:"q-ma-none text-weight-medium"},ce={class:"q-ma-none text-weight-medium"},de={class:"q-ma-none"},ue={class:"q-ma-none"},me=o("p",{class:"q-ma-none"},"F/l:",-1),pe={class:"q-ma-none"},ve={class:"row items-center"},fe={class:"q-ma-none text-weight-medium"},_e={class:"buttonAdd"},ge={class:"q-pa-lg flex flex-center"},he={class:"full-width"},be={class:"q-pa-md"},ye={class:"q-ma-none body-large"},we={class:"q-ma-none body-large"},xe={class:"buttonActions"},Ee={__name:"CreateOrderPage",setup(g){const{triggerPositive:i,triggerWarning:d}=H(),u=Z(),m=$(()=>u.client),{user:h}=Y(),p=r(""),f=r([]),y=r(!1),w=r(!1),W=r(1),b=r(1),c=r([]),n=r([]),x=$(()=>n.value.reduce((a,e)=>a+e.priceTotal,0)),k=$(()=>n.value.reduce((a,e)=>a+e.savings,0));console.log(x,k);async function A(){const a=n.value.map(e=>({id:e.id,cantidad:e.cantidad}));try{w.value=!0;const{error:e}=await X({comercio_id:h.value.id,total_descuento:k,ofertas:a,total:x,client_id:u.client.id});e?d(e):i("Factura creada")}catch(e){console.error(e),d("Error al crear la factura")}finally{w.value=!1}}function z(){const a=n.value.filter(e=>!c.value.some(t=>t.id===e.id));n.value=a,c.value.length>0&&i("Producto eliminado")}function B(a){const e=f.value.find(t=>t.id===a);e&&(e.cantidad++,e.priceTotal=e.priceWidthDiscount*e.cantidad)}function F(a){console.log("restar",a);const e=f.value.find(t=>(console.log(t.id,a),t.id===a));console.log(e,"item"),e&&e.cantidad>1&&(e.cantidad--,e.priceTotal=e.priceWidthDiscount*e.cantidad,e.savings=e.savings*e.cantidad)}function I(a){const e=n.value.find(t=>t.id===a.id);e?(e.cantidad=a.cantidad+e.cantidad,e.priceTotal=a.priceWidthDiscount*e.cantidad,e.savings=a.savings*e.cantidad,i("Producto agregado")):(n.value.push({id:a.id,cantidad:a.cantidad,nombre:a.nombre,price_total:a.price_total,descuento:a.descuento,priceWidthDiscount:a.priceWidthDiscount,savings:a.savings,priceTotal:a.priceTotal}),i("Producto agregado"))}async function C(){try{y.value=!0;const a=await K({name:p.value,page:b.value,id:h.value.id});f.value=await a.data.map(e=>({...e,cantidad:1,priceWidthDiscount:e.price_total-e.descuento/100*e.price_total,savings:e.price_total-(e.price_total-e.descuento/100*e.price_total),priceTotal:e.price_total-e.descuento/100*e.price_total*1})),console.log(f.value,"offers")}catch(a){console.error(a)}finally{y.value=!1}}T(p,async a=>{await C()}),T(b,async a=>{await C()}),U(async()=>{C()});const O=[{name:"cantidad",align:"center",label:"Cantidad",field:"cantidad",sortable:!0},{name:"nombre",align:"center",label:"Producto",field:"nombre",sortable:!0},{name:"priceWidthDiscount",align:"center",label:"precio con descuento",field:"priceWidthDiscount",sortable:!0},{name:"savings",align:"center",label:"Ahorrado",field:"savings",sortable:!0},{name:"price_total",label:"Precio",field:"price_total",sortable:!0,format:a=>`$${a}`},{name:"descuento",label:"Descuento",field:"descuento",sortable:!0,format:a=>`${a}%`},{name:"priceTotal",label:"Precio total",field:"priceTotal",sortable:!0,format:a=>`$${a}`}];function S(){return c.value.length===0?"":`${c.value.length} record${c.value.length>1?"s":""} selected of ${n.value.length}`}return(a,e)=>(q(),P(V,null,[o("p",ee," Cliente: "+s(v(m)?v(m).name:"cliente no ingresado"),1),o("p",ae,s(v(m)?"":"Por favor ingrese el cliente a trav\xE9s del QR"),1),o("div",te,[o("div",oe,[o("div",le,[l(L,{modelValue:p.value,"onUpdate:modelValue":e[1]||(e[1]=t=>p.value=t),outlined:"",type:"search",label:"Buscar ofertas",color:"primary",class:"full-width"},{append:E(()=>[l(M,{name:"search",modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=t=>p.value=t)},null,8,["modelValue"])]),_:1},8,["modelValue"])]),o("div",ne,[l(R,{showing:y.value,label:"Por favor espera...","label-class":"text-teal","label-style":"font-size: 1.1em"},null,8,["showing"]),(q(!0),P(V,null,N(f.value,t=>(q(),P("div",{class:"card",key:t.id},[o("div",se,[l(j,{class:"rounded-borders",src:t.img_array_url[0],"spinner-color":"dark",style:{height:"80px","max-width":"150px"}},null,8,["src"])]),o("div",null,[o("div",ie,[o("p",re,s(t.nombre),1),o("p",ce," $"+s(t.price_total),1),o("p",de,"Desct: "+s(t.descuento)+"%",1)])]),o("div",null,[o("p",ue,"stock:"+s(t.stock),1),me,o("p",pe,s(t.fecha_tope_descuento),1)]),o("div",ve,[l(_,{color:"primary",icon:"add",size:"xs",round:"",onClick:Q=>B(t.id)},null,8,["onClick"]),o("p",fe,s(t.cantidad),1),l(_,{color:"primary",icon:"remove",size:"xs",round:"",onClick:Q=>F(t.id)},null,8,["onClick"])]),o("div",_e,[l(_,{onClick:Q=>I(t),color:"positive",disable:t.stock===0,icon:"add",round:""},null,8,["onClick","disable"])])]))),128))]),o("div",ge,[l(G,{modelValue:b.value,"onUpdate:modelValue":e[2]||(e[2]=t=>b.value=t),max:W.value},null,8,["modelValue","max"])])]),o("div",he,[o("div",be,[o("p",ye,"Total: $"+s(v(x)),1),o("p",we,"Ahorro: $"+s(v(k)),1),l(J,{class:"my-sticky-virtscroll-table",flat:"",bordered:"","virtual-scroll":"","virtual-scroll-sticky-size-start":48,title:"Carrito",rows:n.value,columns:O,"row-key":"id","selected-rows-label":S,selection:"multiple",selected:c.value,"onUpdate:selected":e[3]||(e[3]=t=>c.value=t)},null,8,["rows","selected"]),o("div",xe,[l(_,{loading:w.value,color:"positive",label:"finalizar compra",onClick:A,disable:!v(m)||n.value.length===0},null,8,["loading","disable"]),l(_,{color:"negative",label:"eliminar",onClick:z})])])])])],64))}};export{Ee as default};
