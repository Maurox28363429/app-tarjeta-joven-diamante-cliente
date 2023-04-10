import{bE as Te,ce as Qe,cf as gt,cg as ht,ch as yt,bF as bt,ci as Ht,bG as wt,cj as Lt,V as v,ck as Dt,ab as Pe,ae as k,c5 as Ee,cl as Kt,cm as $t,bD as ce,bV as Nt,bW as jt,bX as Qt,l as P,bY as Wt,bZ as Ut,b_ as Xt,b$ as Yt,c0 as Gt,a_ as se,cn as Zt,bB as Jt,co as el,cp as rt,bN as tl,cq as ll,c1 as ul,b8 as nl,aq as We,cr as ol,c8 as al,cs as il,bv as rl,an as re,bH as cl,ap as sl,as as dl,ao as fl,ct as vl,cu as ml,cv as ct,cw as Oe,ar as Sl,az as gl,bz as $e,cx as hl,bA as ke,bU as yl,cy as bl,cz as wl,bI as Cl}from"./index.8e48f328.js";import{Q as Vl,a as kl}from"./QItemSection.6b0adf7b.js";import{Q as xl}from"./QItemLabel.2580d43c.js";import{u as ql,v as st,a as Al,b as Ol,c as zl,p as dt,r as ft,s as Fl,d as Ml}from"./position-engine.048191b9.js";import{r as je}from"./rtl.b51694b1.js";import{n as vt}from"./format.a33550d6.js";var Il=Te({name:"QField",inheritAttrs:!1,props:Qe,emits:gt,setup(){return ht(yt())}});const Bl={xs:8,sm:10,md:14,lg:20,xl:24};var _l=Te({name:"QChip",props:{...bt,...Ht,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:d,emit:r}){const{proxy:{$q:C}}=Pe(),A=wt(e,C),i=Lt(e,Bl),F=v(()=>e.selected===!0||e.icon!==void 0),h=v(()=>e.selected===!0?e.iconSelected||C.iconSet.chip.selected:e.icon),y=v(()=>e.iconRemove||C.iconSet.chip.remove),M=v(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),c=v(()=>{const V=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(V?` text-${V} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(M.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(A.value===!0?" q-chip--dark q-dark":"")}),g=v(()=>{const V=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},D={...V,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||C.lang.label.remove};return{chip:V,remove:D}});function x(V){V.keyCode===13&&b(V)}function b(V){e.disable||(r("update:selected",!e.selected),r("click",V))}function H(V){(V.keyCode===void 0||V.keyCode===13)&&(ce(V),e.disable===!1&&(r("update:modelValue",!1),r("remove")))}function _(){const V=[];M.value===!0&&V.push(k("div",{class:"q-focus-helper"})),F.value===!0&&V.push(k(Ee,{class:"q-chip__icon q-chip__icon--left",name:h.value}));const D=e.label!==void 0?[k("div",{class:"ellipsis"},[e.label])]:void 0;return V.push(k("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Kt(d.default,D))),e.iconRight&&V.push(k(Ee,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&V.push(k(Ee,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:y.value,...g.value.remove,onClick:H,onKeyup:H})),V}return()=>{if(e.modelValue===!1)return;const V={class:c.value,style:i.value};return M.value===!0&&Object.assign(V,g.value.chip,{onClick:b,onKeyup:x}),Dt("div",V,_(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[$t,e.ripple]])}}}),El=Te({name:"QMenu",inheritAttrs:!1,props:{...ql,...Nt,...bt,...jt,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:st},self:{type:String,validator:st},offset:{type:Array,validator:Al},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Qt,"click","escapeKey"],setup(e,{slots:d,emit:r,attrs:C}){let A=null,i,F,h;const y=Pe(),{proxy:M}=y,{$q:c}=M,g=P(null),x=P(!1),b=v(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),H=wt(e,c),{registerTick:_,removeTick:V}=Wt(),{registerTimeout:D}=Ut(),{transitionProps:L,transitionStyle:W}=Xt(e),{localScrollTarget:I,changeScrollEvent:B,unconfigureScrollTarget:U}=Ol(e,S),{anchorEl:Q,canShow:le}=zl({showing:x}),{hide:ue}=Yt({showing:x,canShow:le,handleShow:a,handleHide:n,hideOnRouteChange:b,processOnMount:!0}),{showPortal:Y,hidePortal:N,renderPortal:ne}=Gt(y,g,p,"menu"),ee={anchorEl:Q,innerRef:g,onClickOutside(l){if(e.persistent!==!0&&x.value===!0)return ue(l),(l.type==="touchstart"||l.target.classList.contains("q-dialog__backdrop"))&&ce(l),!0}},oe=v(()=>dt(e.anchor||(e.cover===!0?"center middle":"bottom start"),c.lang.rtl)),te=v(()=>e.cover===!0?oe.value:dt(e.self||"top start",c.lang.rtl)),G=v(()=>(e.square===!0?" q-menu--square":"")+(H.value===!0?" q-menu--dark q-dark":"")),Se=v(()=>e.autoClose===!0?{onClick:O}:{}),ae=v(()=>x.value===!0&&e.persistent!==!0);se(ae,l=>{l===!0?(ol(w),Ml(ee)):(rt(w),ft(ee))});function Z(){al(()=>{let l=g.value;l&&l.contains(document.activeElement)!==!0&&(l=l.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||l.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||l.querySelector("[autofocus], [data-autofocus]")||l,l.focus({preventScroll:!0}))})}function a(l){if(A=e.noRefocus===!1?document.activeElement:null,Zt(T),Y(),S(),i=void 0,l!==void 0&&(e.touchPosition||e.contextMenu)){const R=Jt(l);if(R.left!==void 0){const{top:ie,left:de}=Q.value.getBoundingClientRect();i={left:R.left-de,top:R.top-ie}}}F===void 0&&(F=se(()=>c.screen.width+"|"+c.screen.height+"|"+e.self+"|"+e.anchor+"|"+c.lang.rtl,f)),e.noFocus!==!0&&document.activeElement.blur(),_(()=>{f(),e.noFocus!==!0&&Z()}),D(()=>{c.platform.is.ios===!0&&(h=e.autoClose,g.value.click()),f(),Y(!0),r("show",l)},e.transitionDuration)}function n(l){V(),N(),s(!0),A!==null&&(l===void 0||l.qClickOutside!==!0)&&(((l&&l.type.indexOf("key")===0?A.closest('[tabindex]:not([tabindex^="-"])'):void 0)||A).focus(),A=null),D(()=>{N(!0),r("hide",l)},e.transitionDuration)}function s(l){i=void 0,F!==void 0&&(F(),F=void 0),(l===!0||x.value===!0)&&(el(T),U(),ft(ee),rt(w)),l!==!0&&(A=null)}function S(){(Q.value!==null||e.scrollTarget!==void 0)&&(I.value=tl(Q.value,e.scrollTarget),B(I.value,f))}function O(l){h!==!0?(ll(M,l),r("click",l)):h=!1}function T(l){ae.value===!0&&e.noFocus!==!0&&il(g.value,l.target)!==!0&&Z()}function w(l){r("escapeKey"),ue(l)}function f(){const l=g.value;l===null||Q.value===null||Fl({el:l,offset:e.offset,anchorEl:Q.value,anchorOrigin:oe.value,selfOrigin:te.value,absoluteOffset:i,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function p(){return k(nl,L.value,()=>x.value===!0?k("div",{role:"menu",...C,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+G.value,C.class],style:[C.style,W.value],...Se.value},ul(d.default)):null)}return We(s),Object.assign(M,{focus:Z,updatePosition:f}),ne}});const X=1e3,Tl=["start","center","end","start-force","center-force","end-force"],Ct=Array.prototype.filter,Pl=window.getComputedStyle(document.body).overflowAnchor===void 0?rl:function(e,d){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const r=e.children||[];Ct.call(r,A=>A.dataset&&A.dataset.qVsAnchor!==void 0).forEach(A=>{delete A.dataset.qVsAnchor});const C=r[d];C&&C.dataset&&(C.dataset.qVsAnchor="")}))};function xe(e,d){return e+d}function Ne(e,d,r,C,A,i,F,h){const y=e===window?document.scrollingElement||document.documentElement:e,M=A===!0?"offsetWidth":"offsetHeight",c={scrollStart:0,scrollViewSize:-F-h,scrollMaxSize:0,offsetStart:-F,offsetEnd:-h};if(A===!0?(e===window?(c.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c.scrollViewSize+=document.documentElement.clientWidth):(c.scrollStart=y.scrollLeft,c.scrollViewSize+=y.clientWidth),c.scrollMaxSize=y.scrollWidth,i===!0&&(c.scrollStart=(je===!0?c.scrollMaxSize-c.scrollViewSize:0)-c.scrollStart)):(e===window?(c.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,c.scrollViewSize+=document.documentElement.clientHeight):(c.scrollStart=y.scrollTop,c.scrollViewSize+=y.clientHeight),c.scrollMaxSize=y.scrollHeight),r!==null)for(let g=r.previousElementSibling;g!==null;g=g.previousElementSibling)g.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetStart+=g[M]);if(C!==null)for(let g=C.nextElementSibling;g!==null;g=g.nextElementSibling)g.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetEnd+=g[M]);if(d!==e){const g=y.getBoundingClientRect(),x=d.getBoundingClientRect();A===!0?(c.offsetStart+=x.left-g.left,c.offsetEnd-=x.width):(c.offsetStart+=x.top-g.top,c.offsetEnd-=x.height),e!==window&&(c.offsetStart+=c.scrollStart),c.offsetEnd+=c.scrollMaxSize-c.offsetStart}return c}function mt(e,d,r,C){d==="end"&&(d=(e===window?document.body:e)[r===!0?"scrollWidth":"scrollHeight"]),e===window?r===!0?(C===!0&&(d=(je===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-d),window.scrollTo(d,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,d):r===!0?(C===!0&&(d=(je===!0?e.scrollWidth-e.offsetWidth:0)-d),e.scrollLeft=d):e.scrollTop=d}function ze(e,d,r,C){if(r>=C)return 0;const A=d.length,i=Math.floor(r/X),F=Math.floor((C-1)/X)+1;let h=e.slice(i,F).reduce(xe,0);return r%X!==0&&(h-=d.slice(i*X,r).reduce(xe,0)),C%X!==0&&C!==A&&(h-=d.slice(C,F*X).reduce(xe,0)),h}const Vt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},Wl=Object.keys(Vt),pl={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Vt};function Rl({virtualScrollLength:e,getVirtualScrollTarget:d,getVirtualScrollEl:r,virtualScrollItemSizeComputed:C}){const A=Pe(),{props:i,emit:F,proxy:h}=A,{$q:y}=h;let M,c,g,x=[],b;const H=P(0),_=P(0),V=P({}),D=P(null),L=P(null),W=P(null),I=P({from:0,to:0}),B=v(()=>i.tableColspan!==void 0?i.tableColspan:100);C===void 0&&(C=v(()=>i.virtualScrollItemSize));const U=v(()=>C.value+";"+i.virtualScrollHorizontal),Q=v(()=>U.value+";"+i.virtualScrollSliceRatioBefore+";"+i.virtualScrollSliceRatioAfter);se(Q,()=>{G()}),se(U,le);function le(){te(c,!0)}function ue(n){te(n===void 0?c:n)}function Y(n,s){const S=d();if(S==null||S.nodeType===8)return;const O=Ne(S,r(),D.value,L.value,i.virtualScrollHorizontal,y.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd);g!==O.scrollViewSize&&G(O.scrollViewSize),ne(S,O,Math.min(e.value-1,Math.max(0,parseInt(n,10)||0)),0,Tl.indexOf(s)>-1?s:c>-1&&n>c?"end":"start")}function N(){const n=d();if(n==null||n.nodeType===8)return;const s=Ne(n,r(),D.value,L.value,i.virtualScrollHorizontal,y.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd),S=e.value-1,O=s.scrollMaxSize-s.offsetStart-s.offsetEnd-_.value;if(M===s.scrollStart)return;if(s.scrollMaxSize<=0){ne(n,s,0,0);return}g!==s.scrollViewSize&&G(s.scrollViewSize),ee(I.value.from);const T=Math.floor(s.scrollMaxSize-Math.max(s.scrollViewSize,s.offsetEnd)-Math.min(b[S],s.scrollViewSize/2));if(T>0&&Math.ceil(s.scrollStart)>=T){ne(n,s,S,s.scrollMaxSize-s.offsetEnd-x.reduce(xe,0));return}let w=0,f=s.scrollStart-s.offsetStart,p=f;if(f<=O&&f+s.scrollViewSize>=H.value)f-=H.value,w=I.value.from,p=f;else for(let l=0;f>=x[l]&&w<S;l++)f-=x[l],w+=X;for(;f>0&&w<S;)f-=b[w],f>-s.scrollViewSize?(w++,p=f):p=b[w]+f;ne(n,s,w,p)}function ne(n,s,S,O,T){const w=typeof T=="string"&&T.indexOf("-force")>-1,f=w===!0?T.replace("-force",""):T,p=f!==void 0?f:"start";let l=Math.max(0,S-V.value[p]),R=l+V.value.total;R>e.value&&(R=e.value,l=Math.max(0,R-V.value.total)),M=s.scrollStart;const ie=l!==I.value.from||R!==I.value.to;if(ie===!1&&f===void 0){ae(S);return}const{activeElement:de}=document,J=W.value;ie===!0&&J!==null&&J!==de&&J.contains(de)===!0&&(J.addEventListener("focusout",oe),setTimeout(()=>{J!==null&&J.removeEventListener("focusout",oe)})),Pl(J,S-l);const Fe=f!==void 0?b.slice(l,S).reduce(xe,0):0;if(ie===!0){const fe=R>=I.value.from&&l<=I.value.to?I.value.to:R;I.value={from:l,to:fe},H.value=ze(x,b,0,l),_.value=ze(x,b,R,e.value),requestAnimationFrame(()=>{I.value.to!==R&&M===s.scrollStart&&(I.value={from:I.value.from,to:R},_.value=ze(x,b,R,e.value))})}requestAnimationFrame(()=>{if(M!==s.scrollStart)return;ie===!0&&ee(l);const fe=b.slice(l,S).reduce(xe,0),ge=fe+s.offsetStart+H.value,Me=ge+b[S];let qe=ge+O;if(f!==void 0){const pe=fe-Fe,$=s.scrollStart+pe;qe=w!==!0&&$<ge&&Me<$+s.scrollViewSize?$:f==="end"?Me-s.scrollViewSize:ge-(f==="start"?0:Math.round((s.scrollViewSize-b[S])/2))}M=qe,mt(n,qe,i.virtualScrollHorizontal,y.lang.rtl),ae(S)})}function ee(n){const s=W.value;if(s){const S=Ct.call(s.children,l=>l.classList&&l.classList.contains("q-virtual-scroll--skip")===!1),O=S.length,T=i.virtualScrollHorizontal===!0?l=>l.getBoundingClientRect().width:l=>l.offsetHeight;let w=n,f,p;for(let l=0;l<O;){for(f=T(S[l]),l++;l<O&&S[l].classList.contains("q-virtual-scroll--with-prev")===!0;)f+=T(S[l]),l++;p=f-b[w],p!==0&&(b[w]+=p,x[Math.floor(w/X)]+=p),w++}}}function oe(){W.value!==null&&W.value!==void 0&&W.value.focus()}function te(n,s){const S=1*C.value;(s===!0||Array.isArray(b)===!1)&&(b=[]);const O=b.length;b.length=e.value;for(let w=e.value-1;w>=O;w--)b[w]=S;const T=Math.floor((e.value-1)/X);x=[];for(let w=0;w<=T;w++){let f=0;const p=Math.min((w+1)*X,e.value);for(let l=w*X;l<p;l++)f+=b[l];x.push(f)}c=-1,M=void 0,H.value=ze(x,b,0,I.value.from),_.value=ze(x,b,I.value.to,e.value),n>=0?(ee(I.value.from),re(()=>{Y(n)})):Z()}function G(n){if(n===void 0&&typeof window!="undefined"){const f=d();f!=null&&f.nodeType!==8&&(n=Ne(f,r(),D.value,L.value,i.virtualScrollHorizontal,y.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd).scrollViewSize)}g=n;const s=parseFloat(i.virtualScrollSliceRatioBefore)||0,S=parseFloat(i.virtualScrollSliceRatioAfter)||0,O=1+s+S,T=n===void 0||n<=0?1:Math.ceil(n/C.value),w=Math.max(1,T,Math.ceil((i.virtualScrollSliceSize>0?i.virtualScrollSliceSize:10)/O));V.value={total:Math.ceil(w*O),start:Math.ceil(w*s),center:Math.ceil(w*(.5+s)),end:Math.ceil(w*(1+s)),view:T}}function Se(n,s){const S=i.virtualScrollHorizontal===!0?"width":"height",O={["--q-virtual-scroll-item-"+S]:C.value+"px"};return[n==="tbody"?k(n,{class:"q-virtual-scroll__padding",key:"before",ref:D},[k("tr",[k("td",{style:{[S]:`${H.value}px`,...O},colspan:B.value})])]):k(n,{class:"q-virtual-scroll__padding",key:"before",ref:D,style:{[S]:`${H.value}px`,...O}}),k(n,{class:"q-virtual-scroll__content",key:"content",ref:W,tabindex:-1},s.flat()),n==="tbody"?k(n,{class:"q-virtual-scroll__padding",key:"after",ref:L},[k("tr",[k("td",{style:{[S]:`${_.value}px`,...O},colspan:B.value})])]):k(n,{class:"q-virtual-scroll__padding",key:"after",ref:L,style:{[S]:`${_.value}px`,...O}})]}function ae(n){c!==n&&(i.onVirtualScroll!==void 0&&F("virtualScroll",{index:n,from:I.value.from,to:I.value.to-1,direction:n<c?"decrease":"increase",ref:h}),c=n)}G();const Z=cl(N,y.platform.is.ios===!0?120:35);sl(()=>{G()});let a=!1;return dl(()=>{a=!0}),fl(()=>{if(a!==!0)return;const n=d();M!==void 0&&n!==void 0&&n!==null&&n.nodeType!==8?mt(n,M,i.virtualScrollHorizontal,y.lang.rtl):Y(c)}),We(()=>{Z.cancel()}),Object.assign(h,{scrollTo:Y,reset:le,refresh:ue}),{virtualScrollSliceRange:I,virtualScrollSliceSizeComputed:V,setVirtualScrollSize:G,onVirtualScrollEvt:Z,localResetVirtualScroll:te,padVirtualScroll:Se,scrollTo:Y,reset:le,refresh:ue}}const St=e=>["add","add-unique","toggle"].includes(e),Hl=".*+?^${}()|[]\\",Ll=Object.keys(Qe);var Ul=Te({name:"QSelect",inheritAttrs:!1,props:{...pl,...vl,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:St},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...gt,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:d,emit:r}){const{proxy:C}=Pe(),{$q:A}=C,i=P(!1),F=P(!1),h=P(-1),y=P(""),M=P(!1),c=P(!1);let g=null,x,b,H,_=null,V,D,L,W;const I=P(null),B=P(null),U=P(null),Q=P(null),le=P(null),ue=ml(e),Y=hl(ut),N=v(()=>Array.isArray(e.options)?e.options.length:0),ne=v(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ee,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:te,padVirtualScroll:G,onVirtualScrollEvt:Se,scrollTo:ae,setVirtualScrollSize:Z}=Rl({virtualScrollLength:N,getVirtualScrollTarget:At,getVirtualScrollEl:tt,virtualScrollItemSizeComputed:ne}),a=yt(),n=v(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,o=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&x!==void 0?x:[],m=o.map(z=>qt(z,u));return e.modelValue===null&&t===!0?m.filter(z=>z!==null):m}return o}),s=v(()=>{const t={};return Ll.forEach(o=>{const u=e[o];u!==void 0&&(t[o]=u)}),t}),S=v(()=>e.optionsDark===null?a.isDark.value:e.optionsDark),O=v(()=>ct(n.value)),T=v(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||n.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),w=v(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),f=v(()=>N.value===0),p=v(()=>n.value.map(t=>j.value(t)).join(", ")),l=v(()=>e.displayValue!==void 0?e.displayValue:p.value),R=v(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ie=v(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||n.value.some(R.value))),de=v(()=>a.focused.value===!0?e.tabindex:-1),J=v(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":i.value===!0?"true":"false","aria-controls":`${a.targetUid.value}_lb`};return h.value>=0&&(t["aria-activedescendant"]=`${a.targetUid.value}_${h.value}`),t}),Fe=v(()=>({id:`${a.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),fe=v(()=>n.value.map((t,o)=>({index:o,opt:t,html:R.value(t),selected:!0,removeAtIndex:xt,toggleOption:ve,tabindex:de.value}))),ge=v(()=>{if(N.value===0)return[];const{from:t,to:o}=ee.value;return e.options.slice(t,o).map((u,m)=>{const z=he.value(u)===!0,q=t+m,E={clickable:!0,active:!1,activeClass:pe.value,manualFocus:!0,focused:!1,disable:z,tabindex:-1,dense:e.optionsDense,dark:S.value,role:"option",id:`${a.targetUid.value}_${q}`,onClick:()=>{ve(u)}};return z!==!0&&(Le(u)===!0&&(E.active=!0),h.value===q&&(E.focused=!0),E["aria-selected"]=E.active===!0?"true":"false",A.platform.is.desktop===!0&&(E.onMousemove=()=>{i.value===!0&&ye(q)})),{index:q,opt:u,html:R.value(u),label:j.value(u),selected:E.active,focused:E.focused,toggleOption:ve,setOptionIndex:ye,itemProps:E}})}),Me=v(()=>e.dropdownIcon!==void 0?e.dropdownIcon:A.iconSet.arrow.dropdown),qe=v(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),pe=v(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),$=v(()=>He(e.optionValue,"value")),j=v(()=>He(e.optionLabel,"label")),he=v(()=>He(e.optionDisable,"disable")),Ie=v(()=>n.value.map(t=>$.value(t))),kt=v(()=>{const t={onInput:ut,onChange:Y,onKeydown:et,onKeyup:Ze,onKeypress:Je,onFocus:Ye,onClick(o){b===!0&&ke(o)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Y,t});se(n,t=>{x=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&a.innerLoading.value!==!0&&(F.value!==!0&&i.value!==!0||O.value!==!0)&&(H!==!0&&Ve(),(F.value===!0||i.value===!0)&&be(""))},{immediate:!0}),se(()=>e.fillInput,Ve),se(i,De),se(N,Rt);function Ue(t){return e.emitValue===!0?$.value(t):t}function Re(t){if(t>-1&&t<n.value.length)if(e.multiple===!0){const o=e.modelValue.slice();r("remove",{index:t,value:o.splice(t,1)[0]}),r("update:modelValue",o)}else r("update:modelValue",null)}function xt(t){Re(t),a.focus()}function Xe(t,o){const u=Ue(t);if(e.multiple!==!0){e.fillInput===!0&&Ae(j.value(t),!0,!0),r("update:modelValue",u);return}if(n.value.length===0){r("add",{index:0,value:u}),r("update:modelValue",e.multiple===!0?[u]:u);return}if(o===!0&&Le(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const m=e.modelValue.slice();r("add",{index:m.length,value:u}),m.push(u),r("update:modelValue",m)}function ve(t,o){if(a.editable.value!==!0||t===void 0||he.value(t)===!0)return;const u=$.value(t);if(e.multiple!==!0){o!==!0&&(Ae(e.fillInput===!0?j.value(t):"",!0,!0),me()),B.value!==null&&B.value.focus(),(n.value.length===0||Oe($.value(n.value[0]),u)!==!0)&&r("update:modelValue",e.emitValue===!0?u:t);return}if((b!==!0||M.value===!0)&&a.focus(),Ye(),n.value.length===0){const q=e.emitValue===!0?u:t;r("add",{index:0,value:q}),r("update:modelValue",e.multiple===!0?[q]:q);return}const m=e.modelValue.slice(),z=Ie.value.findIndex(q=>Oe(q,u));if(z>-1)r("remove",{index:z,value:m.splice(z,1)[0]});else{if(e.maxValues!==void 0&&m.length>=e.maxValues)return;const q=e.emitValue===!0?u:t;r("add",{index:m.length,value:q}),m.push(q)}r("update:modelValue",m)}function ye(t){if(A.platform.is.desktop!==!0)return;const o=t>-1&&t<N.value?t:-1;h.value!==o&&(h.value=o)}function Be(t=1,o){if(i.value===!0){let u=h.value;do u=vt(u+t,-1,N.value-1);while(u!==-1&&u!==h.value&&he.value(e.options[u])===!0);h.value!==u&&(ye(u),ae(u),o!==!0&&e.useInput===!0&&e.fillInput===!0&&_e(u>=0?j.value(e.options[u]):V))}}function qt(t,o){const u=m=>Oe($.value(m),t);return e.options.find(u)||o.find(u)||t}function He(t,o){const u=t!==void 0?t:o;return typeof u=="function"?u:m=>m!==null&&typeof m=="object"&&u in m?m[u]:m}function Le(t){const o=$.value(t);return Ie.value.find(u=>Oe(u,o))!==void 0}function Ye(t){e.useInput===!0&&B.value!==null&&(t===void 0||B.value===t.target&&t.target.value===p.value)&&B.value.select()}function Ge(t){yl(t,27)===!0&&i.value===!0&&(ke(t),me(),Ve()),r("keyup",t)}function Ze(t){const{value:o}=t.target;if(t.keyCode!==void 0){Ge(t);return}if(t.target.value="",g!==null&&(clearTimeout(g),g=null),Ve(),typeof o=="string"&&o.length>0){const u=o.toLocaleLowerCase(),m=q=>{const E=e.options.find(K=>q.value(K).toLocaleLowerCase()===u);return E===void 0?!1:(n.value.indexOf(E)===-1?ve(E):me(),!0)},z=q=>{m($)!==!0&&(m(j)===!0||q===!0||be(o,!0,()=>z(!0)))};z()}else a.clearValue(t)}function Je(t){r("keypress",t)}function et(t){if(r("keydown",t),bl(t)===!0)return;const o=y.value.length>0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(h.value>-1||o===!0);if(t.keyCode===27){$e(t);return}if(t.keyCode===9&&u===!1){we();return}if(t.target===void 0||t.target.id!==a.targetUid.value)return;if(t.keyCode===40&&a.innerLoading.value!==!0&&i.value===!1){ce(t),Ce();return}if(t.keyCode===8&&e.hideSelected!==!0&&y.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Re(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&r("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof y.value!="string"||y.value.length===0)&&(ce(t),h.value=-1,Be(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(ce(t),h.value=Math.max(-1,Math.min(N.value,h.value+(t.keyCode===33?-1:1)*oe.value.view)),Be(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(ce(t),Be(t.keyCode===38?-1:1,e.multiple));const m=N.value;if((L===void 0||W<Date.now())&&(L=""),m>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||L.length>0)){i.value!==!0&&Ce(t);const z=t.key.toLocaleLowerCase(),q=L.length===1&&L[0]===z;W=Date.now()+1500,q===!1&&(ce(t),L+=z);const E=new RegExp("^"+L.split("").map(Ke=>Hl.indexOf(Ke)>-1?"\\"+Ke:Ke).join(".*"),"i");let K=h.value;if(q===!0||K<0||E.test(j.value(e.options[K]))!==!0)do K=vt(K+1,-1,m-1);while(K!==h.value&&(he.value(e.options[K])===!0||E.test(j.value(e.options[K]))!==!0));h.value!==K&&re(()=>{ye(K),ae(K),K>=0&&e.useInput===!0&&e.fillInput===!0&&_e(j.value(e.options[K]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||L!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&ce(t),h.value>-1&&h.value<m){ve(e.options[h.value]);return}if(o===!0){const z=(q,E)=>{if(E){if(St(E)!==!0)return}else E=e.newValueMode;if(q==null)return;Ae("",e.multiple!==!0,!0),(E==="toggle"?ve:Xe)(q,E==="add-unique"),e.multiple!==!0&&(B.value!==null&&B.value.focus(),me())};if(e.onNewValue!==void 0?r("newValue",y.value,z):z(y.value),e.multiple!==!0)return}i.value===!0?we():a.innerLoading.value!==!0&&Ce()}}function tt(){return b===!0?le.value:U.value!==null&&U.value.contentEl!==null?U.value.contentEl:void 0}function At(){return tt()}function Ot(){return e.hideSelected===!0?[]:d["selected-item"]!==void 0?fe.value.map(t=>d["selected-item"](t)).slice():d.selected!==void 0?[].concat(d.selected()):e.useChips===!0?fe.value.map((t,o)=>k(_l,{key:"option-"+o,removable:a.editable.value===!0&&he.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:de.value,onRemove(){t.removeAtIndex(o)}},()=>k("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:j.value(t.opt)}))):[k("span",{[ie.value===!0?"innerHTML":"textContent"]:l.value})]}function lt(){if(f.value===!0)return d["no-option"]!==void 0?d["no-option"]({inputValue:y.value}):void 0;const t=d.option!==void 0?d.option:u=>k(kl,{key:u.index,...u.itemProps},()=>k(Vl,()=>k(xl,()=>k("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let o=G("div",ge.value.map(t));return d["before-options"]!==void 0&&(o=d["before-options"]().concat(o)),Cl(d["after-options"],o)}function zt(t,o){const u=o===!0?{...J.value,...a.splitAttrs.attributes.value}:void 0,m={ref:o===!0?B:void 0,key:"i_t",class:T.value,style:e.inputStyle,value:y.value!==void 0?y.value:"",type:"search",...u,id:o===!0?a.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...kt.value};return t!==!0&&b===!0&&(Array.isArray(m.class)===!0?m.class=[...m.class,"no-pointer-events"]:m.class+=" no-pointer-events"),k("input",m)}function ut(t){g!==null&&(clearTimeout(g),g=null),!(t&&t.target&&t.target.qComposing===!0)&&(_e(t.target.value||""),H=!0,V=y.value,a.focused.value!==!0&&(b!==!0||M.value===!0)&&a.focus(),e.onFilter!==void 0&&(g=setTimeout(()=>{g=null,be(y.value)},e.inputDebounce)))}function _e(t){y.value!==t&&(y.value=t,r("inputValue",t))}function Ae(t,o,u){H=u!==!0,e.useInput===!0&&(_e(t),(o===!0||u!==!0)&&(V=t),o!==!0&&be(t))}function be(t,o,u){if(e.onFilter===void 0||o!==!0&&a.focused.value!==!0)return;a.innerLoading.value===!0?r("filterAbort"):(a.innerLoading.value=!0,c.value=!0),t!==""&&e.multiple!==!0&&n.value.length>0&&H!==!0&&t===j.value(n.value[0])&&(t="");const m=setTimeout(()=>{i.value===!0&&(i.value=!1)},10);_!==null&&clearTimeout(_),_=m,r("filter",t,(z,q)=>{(o===!0||a.focused.value===!0)&&_===m&&(clearTimeout(_),typeof z=="function"&&z(),c.value=!1,re(()=>{a.innerLoading.value=!1,a.editable.value===!0&&(o===!0?i.value===!0&&me():i.value===!0?De(!0):i.value=!0),typeof q=="function"&&re(()=>{q(C)}),typeof u=="function"&&re(()=>{u(C)})}))},()=>{a.focused.value===!0&&_===m&&(clearTimeout(_),a.innerLoading.value=!1,c.value=!1),i.value===!0&&(i.value=!1)})}function Ft(){return k(El,{ref:U,class:w.value,style:e.popupContentStyle,modelValue:i.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&f.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:S.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:qe.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...Fe.value,onScrollPassive:Se,onBeforeShow:ot,onBeforeHide:Mt,onShow:It},lt)}function Mt(t){at(t),we()}function It(){Z()}function Bt(t){ke(t),B.value!==null&&B.value.focus(),M.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function _t(t){ke(t),re(()=>{M.value=!1})}function Et(){const t=[k(Il,{class:`col-auto ${a.fieldClass.value}`,...s.value,for:a.targetUid.value,dark:S.value,square:!0,loading:c.value,itemAligned:!1,filled:!0,stackLabel:y.value.length>0,...a.splitAttrs.listeners.value,onFocus:Bt,onBlur:_t},{...d,rawControl:()=>a.getControl(!0),before:void 0,after:void 0})];return i.value===!0&&t.push(k("div",{ref:le,class:w.value+" scroll",style:e.popupContentStyle,...Fe.value,onClick:$e,onScrollPassive:Se},lt())),k(wl,{ref:Q,modelValue:F.value,position:e.useInput===!0?"top":void 0,transitionShow:D,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:ot,onBeforeHide:Tt,onHide:Pt,onShow:pt},()=>k("div",{class:"q-select__dialog"+(S.value===!0?" q-select__dialog--dark q-dark":"")+(M.value===!0?" q-select__dialog--focused":"")},t))}function Tt(t){at(t),Q.value!==null&&Q.value.__updateRefocusTarget(a.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),a.focused.value=!1}function Pt(t){me(),a.focused.value===!1&&r("blur",t),Ve()}function pt(){const t=document.activeElement;(t===null||t.id!==a.targetUid.value)&&B.value!==null&&B.value!==t&&B.value.focus(),Z()}function we(){F.value!==!0&&(h.value=-1,i.value===!0&&(i.value=!1),a.focused.value===!1&&(_!==null&&(clearTimeout(_),_=null),a.innerLoading.value===!0&&(r("filterAbort"),a.innerLoading.value=!1,c.value=!1)))}function Ce(t){a.editable.value===!0&&(b===!0?(a.onControlFocusin(t),F.value=!0,re(()=>{a.focus()})):a.focus(),e.onFilter!==void 0?be(y.value):(f.value!==!0||d["no-option"]!==void 0)&&(i.value=!0))}function me(){F.value=!1,we()}function Ve(){e.useInput===!0&&Ae(e.multiple!==!0&&e.fillInput===!0&&n.value.length>0&&j.value(n.value[0])||"",!0,!0)}function De(t){let o=-1;if(t===!0){if(n.value.length>0){const u=$.value(n.value[0]);o=e.options.findIndex(m=>Oe($.value(m),u))}te(o)}ye(o)}function Rt(t,o){i.value===!0&&a.innerLoading.value===!1&&(te(-1,!0),re(()=>{i.value===!0&&a.innerLoading.value===!1&&(t>o?te():De(!0))}))}function nt(){F.value===!1&&U.value!==null&&U.value.updatePosition()}function ot(t){t!==void 0&&ke(t),r("popupShow",t),a.hasPopupOpen=!0,a.onControlFocusin(t)}function at(t){t!==void 0&&ke(t),r("popupHide",t),a.hasPopupOpen=!1,a.onControlFocusout(t)}function it(){b=A.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?d["no-option"]!==void 0||e.onFilter!==void 0||f.value===!1:!0),D=A.platform.is.ios===!0&&b===!0&&e.useInput===!0?"fade":e.transitionShow}return Sl(it),gl(nt),it(),We(()=>{g!==null&&clearTimeout(g)}),Object.assign(C,{showPopup:Ce,hidePopup:me,removeAtIndex:Re,add:Xe,toggleOption:ve,getOptionIndex:()=>h.value,setOptionIndex:ye,moveOptionSelection:Be,filter:be,updateMenuPosition:nt,updateInputValue:Ae,isOptionSelected:Le,getEmittingOptionValue:Ue,isOptionDisabled:(...t)=>he.value.apply(null,t)===!0,getOptionValue:(...t)=>$.value.apply(null,t),getOptionLabel:(...t)=>j.value.apply(null,t)}),Object.assign(a,{innerValue:n,fieldClass:v(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:I,targetRef:B,hasValue:O,showPopup:Ce,floatingLabel:v(()=>e.hideSelected!==!0&&O.value===!0||typeof y.value=="number"||y.value.length>0||ct(e.displayValue)),getControlChild:()=>{if(a.editable.value!==!1&&(F.value===!0||f.value!==!0||d["no-option"]!==void 0))return b===!0?Et():Ft();a.hasPopupOpen===!0&&(a.hasPopupOpen=!1)},controlEvents:{onFocusin(t){a.onControlFocusin(t)},onFocusout(t){a.onControlFocusout(t,()=>{Ve(),we()})},onClick(t){if($e(t),b!==!0&&i.value===!0){we(),B.value!==null&&B.value.focus();return}Ce(t)}},getControl:t=>{const o=Ot(),u=t===!0||F.value!==!0||b!==!0;if(e.useInput===!0)o.push(zt(t,u));else if(a.editable.value===!0){const z=u===!0?J.value:void 0;o.push(k("input",{ref:u===!0?B:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?a.targetUid.value:void 0,value:l.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...z,onKeydown:et,onKeyup:Ge,onKeypress:Je})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length>0&&o.push(k("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Ze}))}if(ue.value!==void 0&&e.disable!==!0&&Ie.value.length>0){const z=Ie.value.map(q=>k("option",{value:q,selected:!0}));o.push(k("select",{class:"hidden",name:ue.value,multiple:e.multiple},z))}const m=e.useInput===!0||u!==!0?void 0:a.splitAttrs.attributes.value;return k("div",{class:"q-field__native row items-center",...m,...a.splitAttrs.listeners.value},o)},getInnerAppend:()=>e.loading!==!0&&c.value!==!0&&e.hideDropdownIcon!==!0?[k(Ee,{class:"q-select__dropdown-icon"+(i.value===!0?" rotate-180":""),name:Me.value})]:null}),ht(a)}});export{Ul as Q,Rl as a,Wl as c,pl as u};
