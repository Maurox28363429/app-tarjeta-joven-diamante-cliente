<<<<<<<< HEAD:src-cordova/platforms/android/app/src/main/assets/www/assets/QScrollObserver.07cb4e62.js
import{l as E,bL as L,au as v,bE as S,aq as g,bv as w,an as p,ae as P,ab as y,bM as m,a_ as T,bN as R,bO as C,bP as M}from"./index.30f6a082.js";function N(){const n=E(!L.value);return n.value===!1&&v(()=>{n.value=!0}),n}const O=typeof ResizeObserver!="undefined",z=O===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var V=S({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(n,{emit:b}){let e=null,t,r={width:-1,height:-1};function c(o){o===!0||n.debounce===0||n.debounce==="0"?l():e===null&&(e=setTimeout(l,n.debounce))}function l(){if(e!==null&&(clearTimeout(e),e=null),t){const{offsetWidth:o,offsetHeight:i}=t;(o!==r.width||i!==r.height)&&(r={width:o,height:i},b("resize",r))}}const{proxy:d}=y();if(O===!0){let o;const i=a=>{t=d.$el.parentNode,t?(o=new ResizeObserver(c),o.observe(t),l()):a!==!0&&p(()=>{i(!0)})};return v(()=>{i()}),g(()=>{e!==null&&clearTimeout(e),o!==void 0&&(o.disconnect!==void 0?o.disconnect():t&&o.unobserve(t))}),w}else{let a=function(){e!==null&&(clearTimeout(e),e=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",c,m.passive),i=void 0)},u=function(){a(),t&&t.contentDocument&&(i=t.contentDocument.defaultView,i.addEventListener("resize",c,m.passive),l())};const o=N();let i;return v(()=>{p(()=>{t=d.$el,t&&u()})}),g(a),d.trigger=c,()=>{if(o.value===!0)return P("object",{style:z.style,tabindex:-1,type:"text/html",data:z.url,"aria-hidden":"true",onLoad:u})}}}});const{passive:x}=m,Q=["both","horizontal","vertical"];var $=S({name:"QScrollObserver",props:{axis:{type:String,validator:n=>Q.includes(n),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(n,{emit:b}){const e={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,r,c;T(()=>n.scrollTarget,()=>{o(),d()});function l(){t!==null&&t();const u=Math.max(0,C(r)),f=M(r),s={top:u-e.position.top,left:f-e.position.left};if(n.axis==="vertical"&&s.top===0||n.axis==="horizontal"&&s.left===0)return;const h=Math.abs(s.top)>=Math.abs(s.left)?s.top<0?"up":"down":s.left<0?"left":"right";e.position={top:u,left:f},e.directionChanged=e.direction!==h,e.delta=s,e.directionChanged===!0&&(e.direction=h,e.inflectionPoint=e.position),b("scroll",{...e})}function d(){r=R(c,n.scrollTarget),r.addEventListener("scroll",i,x),i(!0)}function o(){r!==void 0&&(r.removeEventListener("scroll",i,x),r=void 0)}function i(u){if(u===!0||n.debounce===0||n.debounce==="0")l();else if(t===null){const[f,s]=n.debounce?[setTimeout(l,n.debounce),clearTimeout]:[requestAnimationFrame(l),cancelAnimationFrame];t=()=>{s(f),t=null}}}const{proxy:a}=y();return T(()=>a.$q.lang.rtl,l),v(()=>{c=a.$el.parentNode,d()}),g(()=>{t!==null&&t(),o()}),Object.assign(a,{trigger:i,getPosition:()=>e}),w}});export{V as Q,$ as a};
========
import{l as E,bL as L,au as v,bE as S,aq as g,bv as w,an as p,ae as P,ab as y,bM as m,a_ as T,bN as R,bO as C,bP as M}from"./index.f2854204.js";function N(){const n=E(!L.value);return n.value===!1&&v(()=>{n.value=!0}),n}const O=typeof ResizeObserver!="undefined",z=O===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var V=S({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(n,{emit:b}){let e=null,t,r={width:-1,height:-1};function c(o){o===!0||n.debounce===0||n.debounce==="0"?l():e===null&&(e=setTimeout(l,n.debounce))}function l(){if(e!==null&&(clearTimeout(e),e=null),t){const{offsetWidth:o,offsetHeight:i}=t;(o!==r.width||i!==r.height)&&(r={width:o,height:i},b("resize",r))}}const{proxy:d}=y();if(O===!0){let o;const i=a=>{t=d.$el.parentNode,t?(o=new ResizeObserver(c),o.observe(t),l()):a!==!0&&p(()=>{i(!0)})};return v(()=>{i()}),g(()=>{e!==null&&clearTimeout(e),o!==void 0&&(o.disconnect!==void 0?o.disconnect():t&&o.unobserve(t))}),w}else{let a=function(){e!==null&&(clearTimeout(e),e=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",c,m.passive),i=void 0)},u=function(){a(),t&&t.contentDocument&&(i=t.contentDocument.defaultView,i.addEventListener("resize",c,m.passive),l())};const o=N();let i;return v(()=>{p(()=>{t=d.$el,t&&u()})}),g(a),d.trigger=c,()=>{if(o.value===!0)return P("object",{style:z.style,tabindex:-1,type:"text/html",data:z.url,"aria-hidden":"true",onLoad:u})}}}});const{passive:x}=m,Q=["both","horizontal","vertical"];var $=S({name:"QScrollObserver",props:{axis:{type:String,validator:n=>Q.includes(n),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(n,{emit:b}){const e={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,r,c;T(()=>n.scrollTarget,()=>{o(),d()});function l(){t!==null&&t();const u=Math.max(0,C(r)),f=M(r),s={top:u-e.position.top,left:f-e.position.left};if(n.axis==="vertical"&&s.top===0||n.axis==="horizontal"&&s.left===0)return;const h=Math.abs(s.top)>=Math.abs(s.left)?s.top<0?"up":"down":s.left<0?"left":"right";e.position={top:u,left:f},e.directionChanged=e.direction!==h,e.delta=s,e.directionChanged===!0&&(e.direction=h,e.inflectionPoint=e.position),b("scroll",{...e})}function d(){r=R(c,n.scrollTarget),r.addEventListener("scroll",i,x),i(!0)}function o(){r!==void 0&&(r.removeEventListener("scroll",i,x),r=void 0)}function i(u){if(u===!0||n.debounce===0||n.debounce==="0")l();else if(t===null){const[f,s]=n.debounce?[setTimeout(l,n.debounce),clearTimeout]:[requestAnimationFrame(l),cancelAnimationFrame];t=()=>{s(f),t=null}}}const{proxy:a}=y();return T(()=>a.$q.lang.rtl,l),v(()=>{c=a.$el.parentNode,d()}),g(()=>{t!==null&&t(),o()}),Object.assign(a,{trigger:i,getPosition:()=>e}),w}});export{V as Q,$ as a};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/platforms/android/app/src/main/assets/www/assets/QScrollObserver.0de65ed8.js
