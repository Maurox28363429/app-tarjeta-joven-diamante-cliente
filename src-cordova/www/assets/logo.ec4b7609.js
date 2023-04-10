import{bE as F,l as P,aC as q,as as A,ao as B,au as I,ae as R,c1 as V,ab as D,c7 as Q,bD as S,an as _,c8 as j,c9 as O}from"./index.8e48f328.js";var M=F({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(r,{slots:C,emit:f}){const E=D(),u=P(null);let i=0;const s=[];function d(e){const a=typeof e=="boolean"?e:r.noErrorFocus!==!0,l=++i,x=(t,o)=>{f("validation"+(t===!0?"Success":"Error"),o)},g=t=>{const o=t.validate();return typeof o.then=="function"?o.then(n=>({valid:n,comp:t}),n=>({valid:!1,comp:t,err:n})):Promise.resolve({valid:o,comp:t})};return(r.greedy===!0?Promise.all(s.map(g)).then(t=>t.filter(o=>o.valid!==!0)):s.reduce((t,o)=>t.then(()=>g(o).then(n=>{if(n.valid===!1)return Promise.reject(n)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return l===i&&x(!0),!0;if(l===i){const{comp:o,err:n}=t[0];if(n!==void 0&&console.error(n),x(!1,o),a===!0){const h=t.find(({comp:p})=>typeof p.focus=="function"&&Q(p.$)===!1);h!==void 0&&h.comp.focus()}}return!1})}function v(){i++,s.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function m(e){e!==void 0&&S(e);const a=i+1;d().then(l=>{a===i&&l===!0&&(r.onSubmit!==void 0?f("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&S(e),f("reset"),_(()=>{v(),r.autofocus===!0&&r.noResetFocus!==!0&&c()})}function c(){j(()=>{if(u.value===null)return;const e=u.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(u.value.querySelectorAll("[tabindex]"),a=>a.tabIndex>-1);e!=null&&e.focus({preventScroll:!0})})}q(O,{bindComponent(e){s.push(e)},unbindComponent(e){const a=s.indexOf(e);a>-1&&s.splice(a,1)}});let y=!1;return A(()=>{y=!0}),B(()=>{y===!0&&r.autofocus===!0&&c()}),I(()=>{r.autofocus===!0&&c()}),Object.assign(E.proxy,{validate:d,resetValidation:v,submit:m,reset:b,focus:c,getValidationComponents:()=>s}),()=>R("form",{class:"q-form",ref:u,onSubmit:m,onReset:b},V(C.default))}}),T="assets/logo.683026de.svg";export{M as Q,T as _};
