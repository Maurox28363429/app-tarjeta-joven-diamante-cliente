import{a6 as Y,l as Q,az as se,ae as $,au as be,aA as R,Y as Ee,a4 as s,b3 as u,cF as ee,y as N,J as xe,Z as m,ce as Ce,aI as te,W as S,bs as O,cG as ae,F as V,b5 as A,bp as re,cH as Te,c5 as H,a3 as z,B as Be,cI as ye,cJ as Pe,cA as Ae,cn as U}from"./index.63fc166d.js";import{Q as Le}from"./QImg.b039bc03.js";import{Q as De,a as ke,_ as Me,b as Re,c as Qe,d as Se}from"./acronimo.1e6eedac.js";import{a as I,Q as C}from"./QItemSection.edc703a2.js";import{Q as Ie}from"./QList.569e9378.js";import{Q as Ne}from"./QScrollArea.529e40ea.js";import{Q as Oe,a as He,b as ze,c as J,d as Ue,_ as ne,e as $e,f as oe}from"./date.b9df5805.js";import{C as Ge}from"./ClosePopup.bc824846.js";import{u as le}from"./userAuth.320553cc.js";import"./QScrollObserver.3d26f0ec.js";import"./selection.cee9801d.js";import"./format.a33550d6.js";import"./rtl.b51694b1.js";import"./index.360ce4ab.js";import"./axios.f1f32898.js";import"./useToast.1d3ed0da.js";/*!
 * qrcode.vue v3.3.4
 * A Vue.js component to generate QRCode.
 * © 2017-2023 @scopewu(https://github.com/scopewu)
 * MIT License.
 */var X=function(){return X=Object.assign||function(t){for(var r,a=1,n=arguments.length;a<n;a++){r=arguments[a];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},X.apply(this,arguments)},ue={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3},Ve=ue;function fe(e){this.mode=Ve.MODE_8BIT_BYTE,this.data=e}fe.prototype={getLength:function(e){return this.data.length},write:function(e){for(var t=0;t<this.data.length;t++)e.put(this.data.charCodeAt(t),8)}};var Ke=fe,W={L:1,M:0,Q:3,H:2},K=W;function B(e,t){this.totalCount=e,this.dataCount=t}B.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];B.getRSBlocks=function(e,t){var r=B.getRsBlockTable(e,t);if(r==null)throw new Error("bad rs block @ typeNumber:"+e+"/errorCorrectLevel:"+t);for(var a=r.length/3,n=new Array,o=0;o<a;o++)for(var l=r[o*3+0],i=r[o*3+1],f=r[o*3+2],d=0;d<l;d++)n.push(new B(i,f));return n};B.getRsBlockTable=function(e,t){switch(t){case K.L:return B.RS_BLOCK_TABLE[(e-1)*4+0];case K.M:return B.RS_BLOCK_TABLE[(e-1)*4+1];case K.Q:return B.RS_BLOCK_TABLE[(e-1)*4+2];case K.H:return B.RS_BLOCK_TABLE[(e-1)*4+3];default:return}};var Fe=B;function he(){this.buffer=new Array,this.length=0}he.prototype={get:function(e){var t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(var r=0;r<t;r++)this.putBit((e>>>t-r-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){var t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Xe=he,T={glog:function(e){if(e<1)throw new Error("glog("+e+")");return T.LOG_TABLE[e]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return T.EXP_TABLE[e]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var g=0;g<8;g++)T.EXP_TABLE[g]=1<<g;for(var g=8;g<256;g++)T.EXP_TABLE[g]=T.EXP_TABLE[g-4]^T.EXP_TABLE[g-5]^T.EXP_TABLE[g-6]^T.EXP_TABLE[g-8];for(var g=0;g<255;g++)T.LOG_TABLE[T.EXP_TABLE[g]]=g;var de=T,M=de;function F(e,t){if(e.length==null)throw new Error(e.length+"/"+t);for(var r=0;r<e.length&&e[r]==0;)r++;this.num=new Array(e.length-r+t);for(var a=0;a<e.length-r;a++)this.num[a]=e[a+r]}F.prototype={get:function(e){return this.num[e]},getLength:function(){return this.num.length},multiply:function(e){for(var t=new Array(this.getLength()+e.getLength()-1),r=0;r<this.getLength();r++)for(var a=0;a<e.getLength();a++)t[r+a]^=M.gexp(M.glog(this.get(r))+M.glog(e.get(a)));return new F(t,0)},mod:function(e){if(this.getLength()-e.getLength()<0)return this;for(var t=M.glog(this.get(0))-M.glog(e.get(0)),r=new Array(this.getLength()),a=0;a<this.getLength();a++)r[a]=this.get(a);for(var a=0;a<e.getLength();a++)r[a]^=M.gexp(M.glog(e.get(a))+t);return new F(r,0).mod(e)}};var ce=F,E=ue,ie=ce,Je=de,L={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},v={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,G18:1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,G15_MASK:1<<14|1<<12|1<<10|1<<4|1<<1,getBCHTypeInfo:function(e){for(var t=e<<10;v.getBCHDigit(t)-v.getBCHDigit(v.G15)>=0;)t^=v.G15<<v.getBCHDigit(t)-v.getBCHDigit(v.G15);return(e<<10|t)^v.G15_MASK},getBCHTypeNumber:function(e){for(var t=e<<12;v.getBCHDigit(t)-v.getBCHDigit(v.G18)>=0;)t^=v.G18<<v.getBCHDigit(t)-v.getBCHDigit(v.G18);return e<<12|t},getBCHDigit:function(e){for(var t=0;e!=0;)t++,e>>>=1;return t},getPatternPosition:function(e){return v.PATTERN_POSITION_TABLE[e-1]},getMask:function(e,t,r){switch(e){case L.PATTERN000:return(t+r)%2==0;case L.PATTERN001:return t%2==0;case L.PATTERN010:return r%3==0;case L.PATTERN011:return(t+r)%3==0;case L.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2==0;case L.PATTERN101:return t*r%2+t*r%3==0;case L.PATTERN110:return(t*r%2+t*r%3)%2==0;case L.PATTERN111:return(t*r%3+(t+r)%2)%2==0;default:throw new Error("bad maskPattern:"+e)}},getErrorCorrectPolynomial:function(e){for(var t=new ie([1],0),r=0;r<e;r++)t=t.multiply(new ie([1,Je.gexp(r)],0));return t},getLengthInBits:function(e,t){if(1<=t&&t<10)switch(e){case E.MODE_NUMBER:return 10;case E.MODE_ALPHA_NUM:return 9;case E.MODE_8BIT_BYTE:return 8;case E.MODE_KANJI:return 8;default:throw new Error("mode:"+e)}else if(t<27)switch(e){case E.MODE_NUMBER:return 12;case E.MODE_ALPHA_NUM:return 11;case E.MODE_8BIT_BYTE:return 16;case E.MODE_KANJI:return 10;default:throw new Error("mode:"+e)}else if(t<41)switch(e){case E.MODE_NUMBER:return 14;case E.MODE_ALPHA_NUM:return 13;case E.MODE_8BIT_BYTE:return 16;case E.MODE_KANJI:return 12;default:throw new Error("mode:"+e)}else throw new Error("type:"+t)},getLostPoint:function(e){for(var t=e.getModuleCount(),r=0,a=0;a<t;a++)for(var n=0;n<t;n++){for(var o=0,l=e.isDark(a,n),i=-1;i<=1;i++)if(!(a+i<0||t<=a+i))for(var f=-1;f<=1;f++)n+f<0||t<=n+f||i==0&&f==0||l==e.isDark(a+i,n+f)&&o++;o>5&&(r+=3+o-5)}for(var a=0;a<t-1;a++)for(var n=0;n<t-1;n++){var d=0;e.isDark(a,n)&&d++,e.isDark(a+1,n)&&d++,e.isDark(a,n+1)&&d++,e.isDark(a+1,n+1)&&d++,(d==0||d==4)&&(r+=3)}for(var a=0;a<t;a++)for(var n=0;n<t-6;n++)e.isDark(a,n)&&!e.isDark(a,n+1)&&e.isDark(a,n+2)&&e.isDark(a,n+3)&&e.isDark(a,n+4)&&!e.isDark(a,n+5)&&e.isDark(a,n+6)&&(r+=40);for(var n=0;n<t;n++)for(var a=0;a<t-6;a++)e.isDark(a,n)&&!e.isDark(a+1,n)&&e.isDark(a+2,n)&&e.isDark(a+3,n)&&e.isDark(a+4,n)&&!e.isDark(a+5,n)&&e.isDark(a+6,n)&&(r+=40);for(var h=0,n=0;n<t;n++)for(var a=0;a<t;a++)e.isDark(a,n)&&h++;var b=Math.abs(100*h/t/t-50)/5;return r+=b*10,r}},Ye=v,We=Ke,ve=Fe,ge=Xe,D=Ye,Ze=ce;function y(e,t){this.typeNumber=e,this.errorCorrectLevel=t,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var w=y.prototype;w.addData=function(e){var t=new We(e);this.dataList.push(t),this.dataCache=null};w.isDark=function(e,t){if(e<0||this.moduleCount<=e||t<0||this.moduleCount<=t)throw new Error(e+","+t);return this.modules[e][t]};w.getModuleCount=function(){return this.moduleCount};w.make=function(){if(this.typeNumber<1){var e=1;for(e=1;e<40;e++){for(var t=ve.getRSBlocks(e,this.errorCorrectLevel),r=new ge,a=0,n=0;n<t.length;n++)a+=t[n].dataCount;for(var n=0;n<this.dataList.length;n++){var o=this.dataList[n];r.put(o.mode,4),r.put(o.getLength(),D.getLengthInBits(o.mode,e)),o.write(r)}if(r.getLengthInBits()<=a*8)break}this.typeNumber=e}this.makeImpl(!1,this.getBestMaskPattern())};w.makeImpl=function(e,t){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var a=0;a<this.moduleCount;a++)this.modules[r][a]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(e,t),this.typeNumber>=7&&this.setupTypeNumber(e),this.dataCache==null&&(this.dataCache=y.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,t)};w.setupPositionProbePattern=function(e,t){for(var r=-1;r<=7;r++)if(!(e+r<=-1||this.moduleCount<=e+r))for(var a=-1;a<=7;a++)t+a<=-1||this.moduleCount<=t+a||(0<=r&&r<=6&&(a==0||a==6)||0<=a&&a<=6&&(r==0||r==6)||2<=r&&r<=4&&2<=a&&a<=4?this.modules[e+r][t+a]=!0:this.modules[e+r][t+a]=!1)};w.getBestMaskPattern=function(){for(var e=0,t=0,r=0;r<8;r++){this.makeImpl(!0,r);var a=D.getLostPoint(this);(r==0||e>a)&&(e=a,t=r)}return t};w.createMovieClip=function(e,t,r){var a=e.createEmptyMovieClip(t,r),n=1;this.make();for(var o=0;o<this.modules.length;o++)for(var l=o*n,i=0;i<this.modules[o].length;i++){var f=i*n,d=this.modules[o][i];d&&(a.beginFill(0,100),a.moveTo(f,l),a.lineTo(f+n,l),a.lineTo(f+n,l+n),a.lineTo(f,l+n),a.endFill())}return a};w.setupTimingPattern=function(){for(var e=8;e<this.moduleCount-8;e++)this.modules[e][6]==null&&(this.modules[e][6]=e%2==0);for(var t=8;t<this.moduleCount-8;t++)this.modules[6][t]==null&&(this.modules[6][t]=t%2==0)};w.setupPositionAdjustPattern=function(){for(var e=D.getPatternPosition(this.typeNumber),t=0;t<e.length;t++)for(var r=0;r<e.length;r++){var a=e[t],n=e[r];if(this.modules[a][n]==null)for(var o=-2;o<=2;o++)for(var l=-2;l<=2;l++)o==-2||o==2||l==-2||l==2||o==0&&l==0?this.modules[a+o][n+l]=!0:this.modules[a+o][n+l]=!1}};w.setupTypeNumber=function(e){for(var t=D.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var a=!e&&(t>>r&1)==1;this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=a}for(var r=0;r<18;r++){var a=!e&&(t>>r&1)==1;this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=a}};w.setupTypeInfo=function(e,t){for(var r=this.errorCorrectLevel<<3|t,a=D.getBCHTypeInfo(r),n=0;n<15;n++){var o=!e&&(a>>n&1)==1;n<6?this.modules[n][8]=o:n<8?this.modules[n+1][8]=o:this.modules[this.moduleCount-15+n][8]=o}for(var n=0;n<15;n++){var o=!e&&(a>>n&1)==1;n<8?this.modules[8][this.moduleCount-n-1]=o:n<9?this.modules[8][15-n-1+1]=o:this.modules[8][15-n-1]=o}this.modules[this.moduleCount-8][8]=!e};w.mapData=function(e,t){for(var r=-1,a=this.moduleCount-1,n=7,o=0,l=this.moduleCount-1;l>0;l-=2)for(l==6&&l--;;){for(var i=0;i<2;i++)if(this.modules[a][l-i]==null){var f=!1;o<e.length&&(f=(e[o]>>>n&1)==1);var d=D.getMask(t,a,l-i);d&&(f=!f),this.modules[a][l-i]=f,n--,n==-1&&(o++,n=7)}if(a+=r,a<0||this.moduleCount<=a){a-=r,r=-r;break}}};y.PAD0=236;y.PAD1=17;y.createData=function(e,t,r){for(var a=ve.getRSBlocks(e,t),n=new ge,o=0;o<r.length;o++){var l=r[o];n.put(l.mode,4),n.put(l.getLength(),D.getLengthInBits(l.mode,e)),l.write(n)}for(var i=0,o=0;o<a.length;o++)i+=a[o].dataCount;if(n.getLengthInBits()>i*8)throw new Error("code length overflow. ("+n.getLengthInBits()+">"+i*8+")");for(n.getLengthInBits()+4<=i*8&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(!1);for(;!(n.getLengthInBits()>=i*8||(n.put(y.PAD0,8),n.getLengthInBits()>=i*8));)n.put(y.PAD1,8);return y.createBytes(n,a)};y.createBytes=function(e,t){for(var r=0,a=0,n=0,o=new Array(t.length),l=new Array(t.length),i=0;i<t.length;i++){var f=t[i].dataCount,d=t[i].totalCount-f;a=Math.max(a,f),n=Math.max(n,d),o[i]=new Array(f);for(var h=0;h<o[i].length;h++)o[i][h]=255&e.buffer[h+r];r+=f;var b=D.getErrorCorrectPolynomial(d),x=new Ze(o[i],b.getLength()-1),c=x.mod(b);l[i]=new Array(b.getLength()-1);for(var h=0;h<l[i].length;h++){var p=h+c.getLength()-l[i].length;l[i][h]=p>=0?c.get(p):0}}for(var P=0,h=0;h<t.length;h++)P+=t[h].totalCount;for(var k=new Array(P),_=0,h=0;h<a;h++)for(var i=0;i<t.length;i++)h<o[i].length&&(k[_++]=o[i][h]);for(var h=0;h<n;h++)for(var i=0;i<t.length;i++)h<l[i].length&&(k[_++]=l[i][h]);return k};var qe=y,me="H",je=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}();function pe(e,t){var r=W[t],a=new qe(-1,r);return a.addData(et(e)),a.make(),a}function _e(e){return e in W}function et(e){for(var t="",r=0;r<e.length;r++){var a=e.charCodeAt(r);a<128?t+=String.fromCharCode(a):a<2048?(t+=String.fromCharCode(192|a>>6),t+=String.fromCharCode(128|a&63)):a<55296||a>=57344?(t+=String.fromCharCode(224|a>>12),t+=String.fromCharCode(128|a>>6&63),t+=String.fromCharCode(128|a&63)):(r++,a=65536+((a&1023)<<10|e.charCodeAt(r)&1023),t+=String.fromCharCode(240|a>>18),t+=String.fromCharCode(128|a>>12&63),t+=String.fromCharCode(128|a>>6&63),t+=String.fromCharCode(128|a&63))}return t}function we(e,t){t===void 0&&(t=0);var r=[];return e.forEach(function(a,n){var o=null;a.forEach(function(l,i){if(!l&&o!==null){r.push("M".concat(o+t," ").concat(n+t,"h").concat(i-o,"v1H").concat(o+t,"z")),o=null;return}if(i===a.length-1){if(!l)return;o===null?r.push("M".concat(i+t,",").concat(n+t," h1v1H").concat(i+t,"z")):r.push("M".concat(o+t,",").concat(n+t," h").concat(i+1-o,"v1H").concat(o+t,"z"));return}l&&o===null&&(o=i)})}),r.join("")}var Z={value:{type:String,required:!0,default:""},size:{type:Number,default:100},level:{type:String,default:me,validator:function(e){return _e(e)}},background:{type:String,default:"#fff"},foreground:{type:String,default:"#000"},margin:{type:Number,required:!1,default:0}},tt=X(X({},Z),{renderAs:{type:String,required:!1,default:"canvas",validator:function(e){return["canvas","svg"].indexOf(e)>-1}}}),at=Y({name:"QRCodeSvg",props:Z,setup:function(e){var t=Q(0),r=Q(""),a=function(){var n=e.value,o=e.level,l=e.margin,i=pe(n,o).modules;t.value=i.length+l*2,r.value=we(i,l)};return a(),se(a),function(){return $("svg",{width:e.size,height:e.size,"shape-rendering":"crispEdges",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(t.value," ").concat(t.value)},[$("path",{fill:e.background,d:"M0,0 h".concat(t.value,"v").concat(t.value,"H0z")}),$("path",{fill:e.foreground,d:r.value})])}}}),rt=Y({name:"QRCodeCanvas",props:Z,setup:function(e){var t=Q(null),r=function(){var a=e.value,n=e.level,o=e.size,l=e.margin,i=e.background,f=e.foreground,d=pe(a,n).modules,h=d.length+l*2,b=t.value;if(!!b){var x=b.getContext("2d");if(!!x){var c=window.devicePixelRatio||1,p=o/h*c;b.height=b.width=o*c,x.scale(p,p),x.fillStyle=i,x.fillRect(0,0,h,h),x.fillStyle=f,je?x.fill(new Path2D(we(d,l))):d.forEach(function(P,k){P.forEach(function(_,G){_&&x.fillRect(G+l,k+l,1,1)})})}}};return be(r),se(r),function(){return $("canvas",{ref:t,style:{width:"".concat(e.size,"px"),height:"".concat(e.size,"px")}})}}}),nt=Y({name:"Qrcode",render:function(){var e=this.$props,t=e.renderAs,r=e.value,a=e.size,n=e.margin,o=e.level,l=e.background,i=e.foreground,f=a>>>0,d=n>>>0,h=_e(o)?o:me;return $(t==="svg"?at:rt,{value:r,size:f,margin:d,level:h,background:l,foreground:i})},props:tt});const ot=m("div",{class:"text-h6"},[m("p",null,"Qr de user")],-1),it={__name:"QrUser",setup(e){const{user:t}=le(),r=Q(284),a=t.id.toString();return(n,o)=>(R(),Ee(xe,null,[s(ee,null,{default:u(()=>[ot]),_:1}),s(ee,{class:"q-pt-none"},{default:u(()=>[s(nt,{value:N(a),size:r.value,level:"H"},null,8,["value","size"])]),_:1})],64))}};const st=m("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1),lt={class:"q-mini-drawer-hide absolute",style:{top:"15px",right:"-17px","z-index":"20"}},ut={class:"text-weight-bold text-h6 q-ma-none"},ft={class:"text-weight-medium text-subtitle2 text-grey-6 q-ma-none"},ht={class:"absolute-top",style:{height:"150px"}},dt={class:"column items-center absolute-bottom bg-transparent"},ct=m("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1),vt={class:"text-weight-bold"},gt={style:{"text-overflow":"ellipsis",overflow:"hidden",width:"196px"}},mt={class:"q-px-sm q-py-lg"},pt={class:"qrButton"},_t=m("img",{src:$e,style:{width:"24px",height:"24px"}},null,-1),St={__name:"MainClientLayout",setup(e){const{user:t}=le(),r=()=>{console.log("goHome"),n.push("/")},a=Q(!1),n=Ce(),o=Q(!1),l=()=>{var c;return((c=t==null?void 0:t.membresia)==null?void 0:c.days)===1},i=()=>{var c;return oe((c=t==null?void 0:t.membresia)==null?void 0:c.updated_at)===oe(new Date)},f=Q(!0),d=()=>{o.value=!o.value},h=c=>{c.preventDefault(),localStorage.removeItem("user"),n.push("/login")},b=()=>{a.value=!0,f.value=!f.value},x=c=>{f.value&&(f.value=!1,c.stopPropagation())};return(c,p)=>{const P=te("router-link"),k=te("router-view");return R(),S(Se,{view:"hHh lpR fFf"},{default:u(()=>[s(Re,{class:"q-py-sm text-white",style:{height:"60px",background:"#f8fdff","box-shadow":`0px 1px 2px rgba(0, 0, 0, 0.3),\r
          0px 1px 3px 1px rgba(0, 0, 0, 0.15)`}},{default:u(()=>[s(De,{class:"row items-center"},{default:u(()=>[s(O,{class:"menu",dense:"",flat:"",round:"",icon:"menu",color:"dark",onClick:b}),s(ke,{class:"row items-center"},{default:u(()=>[s(Le,{src:Me,"spinner-color":"dark",onClick:r,style:{height:"32px","max-width":"74px",cursor:"pointer"}})]),_:1}),s(O,{style:{height:"35px",width:"35px",display:"none"},fill:"",round:"",icon:"shopping_cart",color:"secondary"}),s(P,{to:"/cliente/account",class:"cursor-pointer"},{default:u(()=>[s(ae,{size:"42px",class:"q-ml-md"},{default:u(()=>[st]),_:1})]),_:1})]),_:1})]),_:1}),s(Oe,{modelValue:a.value,"onUpdate:modelValue":p[1]||(p[1]=_=>a.value=_),"show-if-above":"",mini:!a.value||f.value,onClickCapture:x,width:214,breakpoint:700,bordered:"",class:Be(c.$q.dark.isActive?"bg-grey-9":"bg-grey-3")},{default:u(()=>[m("div",lt,[s(O,{dense:"",round:"",unelevated:"",color:"accent",icon:"chevron_left",onClick:p[0]||(p[0]=_=>f.value=!0)})]),s(Ne,{style:{height:"calc(100% - 150px)","margin-top":"150px","border-right":"1px solid #ddd"}},{default:u(()=>[s(Ie,{padding:""},{default:u(()=>[s(I,null,{default:u(()=>[s(C,null,{default:u(()=>{var _,G,q,j;return[m("p",ut," Plan "+V((G=(_=N(t))==null?void 0:_.membresia)==null?void 0:G.type),1),m("p",ft," Quendan: "+V((j=(q=N(t))==null?void 0:q.membresia)==null?void 0:j.days)+" d\xEDas ",1)]}),_:1})]),_:1}),A(s(Te,{inset:""},null,512),[[re,!f.value]]),A((R(),S(I,{clickable:"",to:"/cliente/shopping"},{default:u(()=>[s(C,{avatar:""},{default:u(()=>[s(H,{name:"shopping_basket"})]),_:1}),s(C,null,{default:u(()=>[z("Mis compras")]),_:1})]),_:1})),[[U]]),A((R(),S(I,{clickable:"",to:"/cliente/news"},{default:u(()=>[s(C,{avatar:""},{default:u(()=>[s(H,{name:"newspaper"})]),_:1}),s(C,null,{default:u(()=>[z("Promociones")]),_:1})]),_:1})),[[U]]),A((R(),S(I,{clickable:"",to:"/cliente/account"},{default:u(()=>[s(C,{avatar:""},{default:u(()=>[s(H,{name:"person"})]),_:1}),s(C,null,{default:u(()=>[z("Mi perfil")]),_:1})]),_:1})),[[U]]),A((R(),S(I,{clickable:"",to:"/cliente/products"},{default:u(()=>[s(C,{avatar:""},{default:u(()=>[s(H,{name:"sell"})]),_:1}),s(C,null,{default:u(()=>[z("Ofertas")]),_:1})]),_:1})),[[U]]),A((R(),S(I,{clickable:"",to:"/memberships"},{default:u(()=>[s(C,{avatar:""},{default:u(()=>[s(H,{name:"rocket_launch"})]),_:1}),s(C,null,{default:u(()=>[z("Membres\xEDas")]),_:1})]),_:1})),[[U]])]),_:1}),m("div",{onClick:h,class:"row justify-center full-width full-height body-small"},[s(O,{icon:"power_settings_new",label:f.value?"":"Cerrar sesi\xF3n","text-color":"white",class:"body-small",style:{position:"absolute",bottom:"20px","background-color":"#ba1a1a"}},null,8,["label"])])]),_:1}),A(m("div",ht,[m("div",dt,[s(ae,{size:"56px",class:"q-mb-sm"},{default:u(()=>[ct]),_:1}),m("div",vt," \xA1Hola, "+V(N(t).name+" "+N(t).last_name)+"! ",1),m("div",null,[m("p",gt,V(N(t).email),1)])])],512),[[re,!f.value]])]),_:1},8,["modelValue","mini","class"]),s(Qe,{style:{background:"#f8fdff"}},{default:u(()=>[s(k)]),_:1}),s(Ae,{modelValue:o.value,"onUpdate:modelValue":p[2]||(p[2]=_=>o.value=_),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:u(()=>[s(ye,null,{default:u(()=>[s(it),s(Pe,{align:"right",class:"text-primary"},{default:u(()=>[A(s(O,{flat:"",label:"Close"},null,512),[[Ge]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",mt,[m("div",pt,[s(ze,{color:"primary",icon:"keyboard_arrow_up",direction:"up"},{default:u(()=>[s(He,{color:"primary",onClick:d},{default:u(()=>[_t]),_:1})]),_:1})])]),s(Ue,{modelValue:c.tab,"onUpdate:modelValue":p[3]||(p[3]=_=>c.tab=_),style:{position:"fixed","z-index":"100",bottom:"0",width:"100%","border-radius":"16px 16px 0 0"},dense:"",class:"menuMobile bg-primary text-white justify-center",align:"justify-center","narrow-indicator":""},{default:u(()=>[s(P,{to:"/cliente/shopping",style:{"text-decoration":"none",color:"#ffff",width:"100%",margin:"none"}},{default:u(()=>[s(J,{name:"misCompras",label:"Mis compras",color:"white",class:"text-capitalize q-px-none",icon:"shopping_basket"})]),_:1}),s(P,{to:"/cliente/products",style:{"text-decoration":"none",color:"#ffff",width:"100%",margin:"none"}},{default:u(()=>[s(J,{name:"Ofertas",label:"Ofertas",color:"white",class:"text-capitalize q-px-none",icon:"sell"})]),_:1}),s(P,{to:"/cliente/news",style:{"text-decoration":"none",color:"#ffff",width:"100%",margin:"none"}},{default:u(()=>[s(J,{name:"Promociones",label:"Promociones",color:"white",class:"text-capitalize q-px-none",icon:"newspaper"})]),_:1})]),_:1},8,["modelValue"]),s(ne,{showModal:i(),description:"Obten 5 d\xEDas de pueba con el plan free, y recibe ofertas especiales"},null,8,["showModal"]),s(ne,{showModal:l(),description:"Renueva el plan, y recibe ofertas especiales"},null,8,["showModal"])]),_:1})}}};export{St as default};