import{bE as g,bF as v,bW as f,bG as S,b_ as m,V as t,ae as n,b8 as y,ab as C,c6 as h}from"./index.63fc166d.js";var q=g({name:"QInnerLoading",props:{...v,...f,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(e,{slots:a}){const s=C(),i=S(e,s.proxy.$q),{transitionProps:r,transitionStyle:o}=m(e),u=t(()=>"q-inner-loading absolute-full column flex-center"+(i.value===!0?" q-inner-loading--dark":"")),c=t(()=>"q-inner-loading__label"+(e.labelClass!==void 0?` ${e.labelClass}`:""));function b(){const l=[n(h,{size:e.size,color:e.color})];return e.label!==void 0&&l.push(n("div",{class:c.value,style:e.labelStyle},[e.label])),l}function d(){return e.showing===!0?n("div",{class:u.value,style:o.value},a.default!==void 0?a.default():b()):null}return()=>n(y,r.value,d)}});export{q as Q};