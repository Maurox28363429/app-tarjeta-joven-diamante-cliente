<<<<<<<< HEAD:src-cordova/www/assets/ClosePopup.d46efc9d.js
import{bt as s,cS as d,cT as c,bU as a}from"./index.30f6a082.js";function n(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}var u=s({name:"close-popup",beforeMount(e,{value:t}){const o={depth:n(t),handler(r){o.depth!==0&&setTimeout(()=>{const p=d(e);p!==void 0&&c(p,r,o.depth)})},handlerKey(r){a(r,13)===!0&&o.handler(r)}};e.__qclosepopup=o,e.addEventListener("click",o.handler),e.addEventListener("keyup",o.handlerKey)},updated(e,{value:t,oldValue:o}){t!==o&&(e.__qclosepopup.depth=n(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener("click",t.handler),e.removeEventListener("keyup",t.handlerKey),delete e.__qclosepopup}});export{u as C};
========
import{bt as s,cS as d,cT as c,bU as a}from"./index.f2854204.js";function n(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}var u=s({name:"close-popup",beforeMount(e,{value:t}){const o={depth:n(t),handler(r){o.depth!==0&&setTimeout(()=>{const p=d(e);p!==void 0&&c(p,r,o.depth)})},handlerKey(r){a(r,13)===!0&&o.handler(r)}};e.__qclosepopup=o,e.addEventListener("click",o.handler),e.addEventListener("keyup",o.handlerKey)},updated(e,{value:t,oldValue:o}){t!==o&&(e.__qclosepopup.depth=n(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener("click",t.handler),e.removeEventListener("keyup",t.handlerKey),delete e.__qclosepopup}});export{u as C};
>>>>>>>> 47a9a8022cb0f4816a001afef8ac198d789b514b:src-cordova/www/assets/ClosePopup.8a271a9b.js
