(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e,t){return new URL(e,t).href},n={},r=function(e){return e.pathname.endsWith(`.css`)},i=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},a=function(a,o,s){let c=Promise.resolve();if(o&&o.length>0){let a,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(o.map(o=>{o=t(o,s);let c=f(o),l=r(c);return i(n,c.href,()=>{if(a===void 0){a={all:new Set,styles:new Set};let e=document.getElementsByTagName(`link`);for(let t=e.length-1;t>=0;t--){let n=e[t];a.all.add(n.href),n.rel===`stylesheet`&&a.styles.add(n.href)}}if((l?a.styles:a.all).has(c.href))return;let t=document.createElement(`link`);if(t.rel=l?`stylesheet`:e,l||(t.as=`script`),t.crossOrigin=``,t.href=c.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),l)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${c}`)))})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(e=>{for(let t of e||[])t.status===`rejected`&&l(t.reason);return a().catch(l)})},o=new class{constructor(){this.ws=null,this.rid=0,this.pending=new Map,this.handlers=new Map,this.queue=[],this.retry=0,this.onOpen=null,this.onStatus=null,this.closedByUser=!1}url(){return`${location.protocol===`https:`?`wss`:`ws`}://${location.host}/ws`}async connect(){this.onStatus?.(`connecting`);let e;{let{LocalSocket:t}=await a(async()=>{let{LocalSocket:e}=await import(`./localServer-WVTT-1GD.js`);return{LocalSocket:e}},[],import.meta.url);e=new t}this.ws=e,e.onopen=()=>{this.retry=0,this.onStatus?.(`open`),this.onOpen?.();for(let t of this.queue.splice(0))e.send(t)},e.onmessage=e=>{let t;try{t=JSON.parse(e.data)}catch{return}if(t.t===`res`){let e=this.pending.get(t.rid);if(!e)return;this.pending.delete(t.rid),clearTimeout(e.timer),t.ok?e.resolve(t.data):e.reject(Error(t.error||`오류`))}else for(let e of this.handlers.get(t.t)||[])e(t)},e.onclose=()=>{this.onStatus?.(`closed`);for(let[,e]of this.pending)clearTimeout(e.timer),e.reject(Error(`연결이 끊겼습니다`));if(this.pending.clear(),this.closedByUser)return;let e=Math.min(8e3,500*2**this.retry++);setTimeout(()=>this.connect(),e)}}on(e,t){return this.handlers.has(e)||this.handlers.set(e,new Set),this.handlers.get(e).add(t),()=>this.handlers.get(e).delete(t)}call(e,t={},n=12e3){return new Promise((r,i)=>{let a=++this.rid,o=setTimeout(()=>{this.pending.delete(a),i(Error(`응답이 없습니다`))},n);this.pending.set(a,{resolve:r,reject:i,timer:o});let s=JSON.stringify({t:e,rid:a,...t});this.ws&&this.ws.readyState===1?this.ws.send(s):this.queue.push(s)})}},s={token:null,me:null,wallet:{ticket:0,gem:0},catalog:null,itemById:{},inventory:new Set,loadout:null,notes:{},payments:null,results:[],stats:null,lobby:null,table:null,mySeats:[],dev:!1,screen:`boot`,tab:`play`,settings:c()};function c(){let e={sound:!0,fourColor:!1,vibrate:!0,hudDetail:!0};try{return{...e,...JSON.parse(localStorage.getItem(`har.settings`)||`{}`)}}catch{return e}}function l(){try{localStorage.setItem(`har.settings`,JSON.stringify(s.settings))}catch{}}var u=new Map;function d(e,t){return u.has(e)||u.set(e,new Set),u.get(e).add(t),()=>u.get(e).delete(t)}function f(e,t){for(let n of u.get(e)||[])try{n(t)}catch(e){console.error(e)}}function p(e){let t=s.itemById[e];return!!t&&(t.price===0||s.inventory.has(e))}function m(e){s.me=e.me,s.wallet=e.wallet,s.catalog=e.catalog,s.itemById=Object.fromEntries(e.catalog.items.map(e=>[e.id,e])),s.inventory=new Set(e.inventory),s.loadout=e.loadout,s.notes=e.notes||{},s.payments=e.payments,s.results=e.results||[],s.stats=e.stats,s.mySeats=e.mySeats||[],s.dev=!!e.dev,f(`boot`),f(`wallet`),f(`me`)}var h={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},g={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},_=1e3,v=1001,y=1002,b=1003,x=1004,S=1005,C=1006,w=1007,T=1008,E=1009,D=1010,O=1011,k=1012,A=1013,ee=1014,te=1015,j=1016,ne=1017,re=1018,ie=1020,ae=35902,oe=35899,se=1021,ce=1022,M=1023,le=1026,ue=1027,N=1028,de=1029,fe=1030,pe=1031,me=1033,he=33776,ge=33777,_e=33778,ve=33779,ye=35840,be=35841,xe=35842,Se=35843,Ce=36196,we=37492,Te=37496,Ee=37488,De=37489,Oe=37490,ke=37491,Ae=37808,je=37809,Me=37810,Ne=37811,Pe=37812,P=37813,Fe=37814,Ie=37815,Le=37816,F=37817,Re=37818,I=37819,ze=37820,Be=37821,Ve=36492,He=36494,Ue=36495,We=36283,Ge=36284,Ke=36285,qe=36286,Je=2300,Ye=2301,Xe=2302,Ze=2303,Qe=2400,$e=2401,et=2402,tt=3200,nt=`srgb`,rt=`srgb-linear`,it=`linear`,at=`srgb`,ot=7680,st=35044,ct=35048,lt=2e3;function ut(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function dt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ft(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function pt(){let e=ft(`canvas`);return e.style.display=`block`,e}var mt={};function ht(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function gt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function L(...e){e=gt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function R(...e){e=gt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function _t(...e){let t=e.join(` `);t in mt||(mt[t]=!0,L(...e))}function vt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var yt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},bt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},xt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),St=1234567,Ct=Math.PI/180,wt=180/Math.PI;function Tt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xt[e&255]+xt[e>>8&255]+xt[e>>16&255]+xt[e>>24&255]+`-`+xt[t&255]+xt[t>>8&255]+`-`+xt[t>>16&15|64]+xt[t>>24&255]+`-`+xt[n&63|128]+xt[n>>8&255]+`-`+xt[n>>16&255]+xt[n>>24&255]+xt[r&255]+xt[r>>8&255]+xt[r>>16&255]+xt[r>>24&255]).toLowerCase()}function z(e,t,n){return Math.max(t,Math.min(n,e))}function Et(e,t){return(e%t+t)%t}function Dt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Ot(e,t,n){return e===t?0:(n-e)/(t-e)}function kt(e,t,n){return(1-n)*e+n*t}function At(e,t,n,r){return kt(e,t,1-Math.exp(-n*r))}function jt(e,t=1){return t-Math.abs(Et(e,t*2)-t)}function Mt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Nt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Pt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ft(e,t){return e+Math.random()*(t-e)}function It(e){return e*(.5-Math.random())}function Lt(e){e!==void 0&&(St=e);let t=St+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rt(e){return e*Ct}function zt(e){return e*wt}function Bt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Vt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ht(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ut(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:L(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Wt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Gt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Kt={DEG2RAD:Ct,RAD2DEG:wt,generateUUID:Tt,clamp:z,euclideanModulo:Et,mapLinear:Dt,inverseLerp:Ot,lerp:kt,damp:At,pingpong:jt,smoothstep:Mt,smootherstep:Nt,randInt:Pt,randFloat:Ft,randFloatSpread:It,seededRandom:Lt,degToRad:Rt,radToDeg:zt,isPowerOfTwo:Bt,ceilPowerOfTwo:Vt,floorPowerOfTwo:Ht,setQuaternionFromProperEuler:Ut,normalize:Gt,denormalize:Wt},B=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:L(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jt.copy(this).projectOnVector(e),this.sub(Jt)}reflect(e){return this.sub(Jt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jt=new V,Yt=new qt,H=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return _t(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Xt.makeScale(e,t)),this}rotate(e){return _t(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Xt.makeRotation(-e)),this}translate(e,t){return _t(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Xt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Xt=new H,Zt=new H().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qt=new H().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $t(){let e={enabled:!0,workingColorSpace:rt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=tn(e.r),e.g=tn(e.g),e.b=tn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=nn(e.r),e.g=nn(e.g),e.b=nn(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?it:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return _t(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return _t(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[rt]:{primaries:t,whitePoint:r,transfer:it,toXYZ:Zt,fromXYZ:Qt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:t,whitePoint:r,transfer:at,toXYZ:Zt,fromXYZ:Qt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}}),e}var en=$t();function tn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function nn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var rn,an=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rn===void 0&&(rn=ft(`canvas`)),rn.width=e.width,rn.height=e.height;let t=rn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=rn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=ft(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=tn(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(tn(t[e]/255)*255):t[e]=tn(t[e]);return{data:t,width:e.width,height:e.height}}return L(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},on=0,sn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:on++}),this.uuid=Tt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(cn(r[t].image)):e.push(cn(r[t]))}else e=cn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function cn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?an.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(L(`Texture: Unable to serialize Texture.`),{})}var ln=0,un=new V,dn=class e extends bt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=v,i=v,a=C,o=T,s=M,c=E,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ln++}),this.uuid=Tt(),this.name=``,this.source=new sn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new H,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(un).x}get height(){return this.source.getSize(un).y}get depth(){return this.source.getSize(un).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){L(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _:e.x-=Math.floor(e.x);break;case v:e.x=e.x<0?0:1;break;case y:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case _:e.y-=Math.floor(e.y);break;case v:e.y=e.y<0?0:1;break;case y:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null,dn.DEFAULT_MAPPING=300,dn.DEFAULT_ANISOTROPY=1;var fn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this.w=z(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this.w=z(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pn=class extends bt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:C,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new fn(0,0,e,t),this.scissorTest=!1,this.viewport=new fn(0,0,e,t),this.textures=[];let r=new dn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:C,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new sn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},mn=class extends pn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},hn=class extends dn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=b,this.minFilter=b,this.wrapR=v,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},gn=class extends dn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=b,this.minFilter=b,this.wrapR=v,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},U=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/_n.setFromMatrixColumn(e,0).length(),i=1/_n.setFromMatrixColumn(e,1).length(),a=1/_n.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yn,e,bn)}lookAt(e,t,n){let r=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),xn.crossVectors(n,Cn),xn.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),xn.crossVectors(n,Cn)),xn.normalize(),Sn.crossVectors(Cn,xn),r[0]=xn.x,r[4]=Sn.x,r[8]=Cn.x,r[1]=xn.y,r[5]=Sn.y,r[9]=Cn.y,r[2]=xn.z,r[6]=Sn.z,r[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=_n.set(r[0],r[1],r[2]).length(),o=_n.set(r[4],r[5],r[6]).length(),s=_n.set(r[8],r[9],r[10]).length();i<0&&(a=-a),vn.copy(this);let c=1/a,l=1/o,u=1/s;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=l,vn.elements[5]*=l,vn.elements[6]*=l,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=lt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=lt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_n=new V,vn=new U,yn=new V(0,0,0),bn=new V(1,1,1),xn=new V,Sn=new V,Cn=new V,wn=new U,Tn=new qt,En=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-z(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-z(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(z(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:L(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tn.setFromEuler(this),this.setFromQuaternion(Tn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER=`XYZ`;var Dn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},On=0,kn=new V,An=new qt,jn=new U,Mn=new V,Nn=new V,Pn=new V,Fn=new qt,In=new V(1,0,0),Ln=new V(0,1,0),Rn=new V(0,0,1),zn={type:`added`},Bn={type:`removed`},Vn={type:`childadded`,child:null},Hn={type:`childremoved`,child:null},Un=class e extends bt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:On++}),this.uuid=Tt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new En,r=new qt,i=new V(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new U},normalMatrix:{value:new H}}),this.matrix=new U,this.matrixWorld=new U,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return An.setFromAxisAngle(e,t),this.quaternion.multiply(An),this}rotateOnWorldAxis(e,t){return An.setFromAxisAngle(e,t),this.quaternion.premultiply(An),this}rotateX(e){return this.rotateOnAxis(In,e)}rotateY(e){return this.rotateOnAxis(Ln,e)}rotateZ(e){return this.rotateOnAxis(Rn,e)}translateOnAxis(e,t){return kn.copy(e).applyQuaternion(this.quaternion),this.position.add(kn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(In,e)}translateY(e){return this.translateOnAxis(Ln,e)}translateZ(e){return this.translateOnAxis(Rn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mn.copy(e):Mn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Nn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Nn,Mn,this.up):jn.lookAt(Mn,Nn,this.up),this.quaternion.setFromRotationMatrix(jn),r&&(jn.extractRotation(r.matrixWorld),An.setFromRotationMatrix(jn),this.quaternion.premultiply(An.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(R(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null):R(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bn),Hn.child=e,this.dispatchEvent(Hn),Hn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nn,e,Pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nn,Fn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Un.DEFAULT_UP=new V(0,1,0),Un.DEFAULT_MATRIX_AUTO_UPDATE=!0,Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Wn=class extends Un{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Gn={type:`move`},Kn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},qn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Yn={h:0,s:0,l:0};function Xn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,en.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=en.workingColorSpace){return this.r=e,this.g=t,this.b=n,en.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=en.workingColorSpace){if(e=Et(e,1),t=z(t,0,1),n=z(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Xn(i,r,e+1/3),this.g=Xn(i,r,e),this.b=Xn(i,r,e-1/3)}return en.colorSpaceToWorking(this,r),this}setStyle(e,t=nt){function n(t){t!==void 0&&parseFloat(t)<1&&L(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:L(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);L(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=qn[e.toLowerCase()];return n===void 0?L(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tn(e.r),this.g=tn(e.g),this.b=tn(e.b),this}copyLinearToSRGB(e){return this.r=nn(e.r),this.g=nn(e.g),this.b=nn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return en.workingToColorSpace(Zn.copy(this),e),Math.round(z(Zn.r*255,0,255))*65536+Math.round(z(Zn.g*255,0,255))*256+Math.round(z(Zn.b*255,0,255))}getHexString(e=nt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=en.workingColorSpace){en.workingToColorSpace(Zn.copy(this),t);let n=Zn.r,r=Zn.g,i=Zn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=en.workingColorSpace){return en.workingToColorSpace(Zn.copy(this),t),e.r=Zn.r,e.g=Zn.g,e.b=Zn.b,e}getStyle(e=nt){en.workingToColorSpace(Zn.copy(this),e);let t=Zn.r,n=Zn.g,r=Zn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Yn);let n=kt(Jn.h,Yn.h,t),r=kt(Jn.s,Yn.s,t),i=kt(Jn.l,Yn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zn=new W;W.NAMES=qn;var Qn=class extends Un{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},$n=new V,er=new V,tr=new V,nr=new V,rr=new V,ir=new V,ar=new V,or=new V,sr=new V,cr=new V,lr=new fn,ur=new fn,dr=new fn,fr=class e{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),$n.subVectors(e,t),r.cross($n);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){$n.subVectors(r,t),er.subVectors(n,t),tr.subVectors(e,t);let a=$n.dot($n),o=$n.dot(er),s=$n.dot(tr),c=er.dot(er),l=er.dot(tr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,nr)!==null&&nr.x>=0&&nr.y>=0&&nr.x+nr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,nr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,nr.x),s.addScaledVector(a,nr.y),s.addScaledVector(o,nr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return lr.setScalar(0),ur.setScalar(0),dr.setScalar(0),lr.fromBufferAttribute(e,t),ur.fromBufferAttribute(e,n),dr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(lr,i.x),a.addScaledVector(ur,i.y),a.addScaledVector(dr,i.z),a}static isFrontFacing(e,t,n,r){return $n.subVectors(n,t),er.subVectors(e,t),$n.cross(er).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),er.subVectors(this.a,this.b),$n.cross(er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;rr.subVectors(r,n),ir.subVectors(i,n),or.subVectors(e,n);let s=rr.dot(or),c=ir.dot(or);if(s<=0&&c<=0)return t.copy(n);sr.subVectors(e,r);let l=rr.dot(sr),u=ir.dot(sr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(rr,a);cr.subVectors(e,i);let f=rr.dot(cr),p=ir.dot(cr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(ir,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return ar.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(ar,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(rr,a).addScaledVector(ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},pr=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=hr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,hr):hr.fromBufferAttribute(r,t),hr.applyMatrix4(e.matrixWorld),this.expandByPoint(hr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),gr.copy(e.boundingBox)),gr.applyMatrix4(e.matrixWorld),this.union(gr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hr),hr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),wr.subVectors(this.max,Cr),_r.subVectors(e.a,Cr),vr.subVectors(e.b,Cr),yr.subVectors(e.c,Cr),br.subVectors(vr,_r),xr.subVectors(yr,vr),Sr.subVectors(_r,yr);let t=[0,-br.z,br.y,0,-xr.z,xr.y,0,-Sr.z,Sr.y,br.z,0,-br.x,xr.z,0,-xr.x,Sr.z,0,-Sr.x,-br.y,br.x,0,-xr.y,xr.x,0,-Sr.y,Sr.x,0];return!Dr(t,_r,vr,yr,wr)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,_r,vr,yr,wr))?!1:(Tr.crossVectors(br,xr),t=[Tr.x,Tr.y,Tr.z],Dr(t,_r,vr,yr,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},mr=[new V,new V,new V,new V,new V,new V,new V,new V],hr=new V,gr=new pr,_r=new V,vr=new V,yr=new V,br=new V,xr=new V,Sr=new V,Cr=new V,wr=new V,Tr=new V,Er=new V;function Dr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Er.fromArray(e,a);let o=i.x*Math.abs(Er.x)+i.y*Math.abs(Er.y)+i.z*Math.abs(Er.z),s=t.dot(Er),c=n.dot(Er),l=r.dot(Er);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Or=new V,kr=new B,Ar=0,jr=class extends bt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ar++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=st,this.updateRanges=[],this.gpuType=te,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix3(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix4(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyNormalMatrix(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.transformDirection(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Mr=class extends jr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Nr=class extends jr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},G=class extends jr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Pr=new pr,Fr=new V,Ir=new V,Lr=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Pr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fr.subVectors(e,this.center);let t=Fr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Fr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ir.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fr.copy(e.center).add(Ir)),this.expandByPoint(Fr.copy(e.center).sub(Ir))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Rr=0,zr=new U,Br=new Un,Vr=new V,Hr=new pr,Ur=new pr,Wr=new V,Gr=class e extends bt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rr++}),this.uuid=Tt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(ut(e)?Nr:Mr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new H().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return zr.makeRotationFromQuaternion(e),this.applyMatrix4(zr),this}rotateX(e){return zr.makeRotationX(e),this.applyMatrix4(zr),this}rotateY(e){return zr.makeRotationY(e),this.applyMatrix4(zr),this}rotateZ(e){return zr.makeRotationZ(e),this.applyMatrix4(zr),this}translate(e,t,n){return zr.makeTranslation(e,t,n),this.applyMatrix4(zr),this}scale(e,t,n){return zr.makeScale(e,t,n),this.applyMatrix4(zr),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vr).negate(),this.translate(Vr.x,Vr.y,Vr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new G(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&L(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Hr.setFromBufferAttribute(n),this.morphTargetsRelative?(Wr.addVectors(this.boundingBox.min,Hr.min),this.boundingBox.expandByPoint(Wr),Wr.addVectors(this.boundingBox.max,Hr.max),this.boundingBox.expandByPoint(Wr)):(this.boundingBox.expandByPoint(Hr.min),this.boundingBox.expandByPoint(Hr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&R(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new V,1/0);else if(e){let n=this.boundingSphere.center;if(Hr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ur.setFromBufferAttribute(n),this.morphTargetsRelative?(Wr.addVectors(Hr.min,Ur.min),Hr.expandByPoint(Wr),Wr.addVectors(Hr.max,Ur.max),Hr.expandByPoint(Wr)):(Hr.expandByPoint(Ur.min),Hr.expandByPoint(Ur.max))}Hr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Wr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Wr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Wr.fromBufferAttribute(a,t),o&&(Vr.fromBufferAttribute(e,t),Wr.add(Vr)),r=Math.max(r,n.distanceToSquared(Wr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&R(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){R(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new jr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new V,s[e]=new V;let c=new V,l=new V,u=new V,d=new B,f=new B,p=new B,m=new V,h=new V;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new V,y=new V,b=new V,x=new V;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new jr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new V,i=new V,a=new V,o=new V,s=new V,c=new V,l=new V,u=new V;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wr.fromBufferAttribute(e,t),Wr.normalize(),e.setXYZ(t,Wr.x,Wr.y,Wr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new jr(a,r,i)}if(this.index===null)return L(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=st,this.updateRanges=[],this.version=0,this.uuid=Tt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},qr=new V,Jr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix4(e),this.setXYZ(t,qr.x,qr.y,qr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyNormalMatrix(e),this.setXYZ(t,qr.x,qr.y,qr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.transformDirection(e),this.setXYZ(t,qr.x,qr.y,qr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array),i=Gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){ht(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new jr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ht(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Yr=new V,Xr=new V,Zr=new H,Qr=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Yr.subVectors(n,t).cross(Xr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Yr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zr.getNormalMatrix(e),r=this.coplanarPoint(Yr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},$r=0,ei=class extends bt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$r++}),this.uuid=Tt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ot,this.stencilZFail=ot,this.stencilZPass=ot,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){L(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Qr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new B().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new B().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ti=class extends ei{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ni,ri=new V,ii=new V,ai=new V,oi=new B,si=new B,ci=new U,li=new V,ui=new V,di=new V,fi=new B,pi=new B,mi=new B,hi=class extends Un{constructor(e=new ti){if(super(),this.isSprite=!0,this.type=`Sprite`,ni===void 0){ni=new Gr;let e=new Kr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);ni.setIndex([0,1,2,0,2,3]),ni.setAttribute(`position`,new Jr(e,3,0,!1)),ni.setAttribute(`uv`,new Jr(e,2,3,!1))}this.geometry=ni,this.material=e,this.center=new B(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&R(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ii.setFromMatrixScale(this.matrixWorld),ci.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ai.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ii.multiplyScalar(-ai.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;gi(li.set(-.5,-.5,0),ai,a,ii,r,i),gi(ui.set(.5,-.5,0),ai,a,ii,r,i),gi(di.set(.5,.5,0),ai,a,ii,r,i),fi.set(0,0),pi.set(1,0),mi.set(1,1);let o=e.ray.intersectTriangle(li,ui,di,!1,ri);if(o===null&&(gi(ui.set(-.5,.5,0),ai,a,ii,r,i),pi.set(0,1),o=e.ray.intersectTriangle(li,di,ui,!1,ri),o===null))return;let s=e.ray.origin.distanceTo(ri);s<e.near||s>e.far||t.push({distance:s,point:ri.clone(),uv:fr.getInterpolation(ri,li,ui,di,fi,pi,mi,new B),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function gi(e,t,n,r,i,a){oi.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?si.copy(oi):(si.x=a*oi.x-i*oi.y,si.y=i*oi.x+a*oi.y),e.copy(t),e.x+=si.x,e.y+=si.y,e.applyMatrix4(ci)}var _i=new V,vi=new V,yi=new V,bi=new V,xi=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){vi.copy(e).add(t).multiplyScalar(.5),yi.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(vi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(yi),o=bi.dot(this.direction),s=-bi.dot(yi),c=bi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(vi).addScaledVector(yi,d),f}intersectSphere(e,t){if(e.radius<0)return null;_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),r=_i.dot(_i)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,te,j;if(y>=b&&y>=x?(w=s,D=u,A=p,j=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,te=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,te=_)):b>=x?(w=c,D=d,A=m,j=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,te=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,te=v)):(w=l,D=f,A=h,j=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,te=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,te=g)),w===0)return null;let ne=S/w,re=C/w,ie=1/w,ae=T-ne*D,oe=E-re*D,se=O-ne*A,ce=k-re*A,M=ee-ne*j,le=te-re*j,ue=M*ce-le*se,N=ae*le-oe*M,de=se*oe-ce*ae;if(r){if(ue<0||N<0||de<0)return null}else if((ue<0||N<0||de<0)&&(ue>0||N>0||de>0))return null;let fe=ue+N+de;if(fe===0)return null;let pe=ie*(ue*D+N*A+de*j);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Si=class extends ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ci=new U,wi=new xi,Ti=new Lr,Ei=new V,Di=new V,Oi=new V,ki=new V,Ai=new V,ji=new V,Mi=new V,Ni=new V,Pi=class extends Un{constructor(e=new Gr,t=new Si){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ji.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ai.fromBufferAttribute(s,e),a?ji.addScaledVector(Ai,r):ji.addScaledVector(Ai.sub(t),r))}t.add(ji)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ti.copy(n.boundingSphere),Ti.applyMatrix4(i),wi.copy(e.ray).recast(e.near),!(Ti.containsPoint(wi.origin)===!1&&(wi.intersectSphere(Ti,Ei)===null||wi.origin.distanceToSquared(Ei)>(e.far-e.near)**2))&&(Ci.copy(i).invert(),wi.copy(e.ray).applyMatrix4(Ci),(n.boundingBox===null||wi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ii(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ii(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ii(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ii(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Fi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ni.copy(s),Ni.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ni);return l<n.near||l>n.far?null:{distance:l,point:Ni.clone(),object:e}}function Ii(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Di),e.getVertexPosition(c,Oi),e.getVertexPosition(l,ki);let u=Fi(e,t,n,r,Di,Oi,ki,Mi);if(u){let e=new V;fr.getBarycoord(Mi,Di,Oi,ki,e),i&&(u.uv=fr.getInterpolatedAttribute(i,s,c,l,e,new B)),a&&(u.uv1=fr.getInterpolatedAttribute(a,s,c,l,e,new B)),o&&(u.normal=fr.getInterpolatedAttribute(o,s,c,l,e,new V),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new V,materialIndex:0};fr.getNormal(Di,Oi,ki,t.normal),u.face=t,u.barycoord=e}return u}var Li=class extends dn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=b,l=b,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ri=class extends jr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},zi=new U,Bi=new U,Vi=[],Hi=new pr,Ui=new U,Wi=new Pi,Gi=new Lr,Ki=class extends Pi{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ri(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ui)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),Hi.copy(e.boundingBox).applyMatrix4(zi),this.boundingBox.union(Hi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),Gi.copy(e.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(Gi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Wi.geometry=this.geometry,Wi.material=this.material,Wi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gi.copy(this.boundingSphere),Gi.applyMatrix4(n),e.ray.intersectsSphere(Gi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,zi),Bi.multiplyMatrices(n,zi),Wi.matrixWorld=Bi,Wi.raycast(e,Vi);for(let e=0,n=Vi.length;e<n;e++){let n=Vi[e];n.instanceId=i,n.object=this,t.push(n)}Vi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ri(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Li(new Float32Array(r*this.count),r,this.count,N,te));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},qi=new Lr,Ji=new B(.5,.5),Yi=new V,Xi=class{constructor(e=new Qr,t=new Qr,n=new Qr,r=new Qr,i=new Qr,a=new Qr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=lt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){return qi.center.set(0,0,0),qi.radius=.7071067811865476+Ji.distanceTo(e.center),qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Yi.x=r.normal.x>0?e.max.x:e.min.x,Yi.y=r.normal.y>0?e.max.y:e.min.y,Yi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Zi=class extends ei{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qi=new U,$i=new xi,ea=new Lr,ta=new V,na=class extends Un{constructor(e=new Gr,t=new Zi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(r),ea.radius+=i,e.ray.intersectsSphere(ea)===!1)return;Qi.copy(r).invert(),$i.copy(e.ray).applyMatrix4(Qi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ta.fromBufferAttribute(l,n),ra(ta,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ta.fromBufferAttribute(l,a),ra(ta,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ra(e,t,n,r,i,a,o){let s=$i.distanceSqToPoint(e);if(s<n){let n=new V;$i.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ia=class extends dn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},aa=class extends dn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},oa=class extends dn{constructor(e,t,n=ee,r,i,a,o=b,s=b,c,l=le,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},sa=class extends oa{constructor(e,t=ee,n=301,r,i,a=b,o=b,s,c=le){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ca=class extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},la=class e extends Gr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new G(c,3)),this.setAttribute(`normal`,new G(l,3)),this.setAttribute(`uv`,new G(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new V;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ua=class e extends Gr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new V,g=new V;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new G(o,3)),this.setAttribute(`normal`,new G(s,3)),this.setAttribute(`uv`,new G(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},da=class e extends Gr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new V,l=new B;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new G(a,3)),this.setAttribute(`normal`,new G(o,3)),this.setAttribute(`uv`,new G(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},fa=class e extends Gr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new G(u,3)),this.setAttribute(`normal`,new G(d,3)),this.setAttribute(`uv`,new G(f,2));function _(){let a=new V,_=new V,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new B,m=new V,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pa=class e extends fa{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ma=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){L(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new B:new V);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new V,r=[],i=[],a=[],o=new V,s=new U;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new V)}i[0]=new V,a[0]=new V;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(z(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(z(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ha=class extends ma{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new B){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ga=class extends ha{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function _a(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var va=new V,ya=new V,ba=new _a,xa=new _a,Sa=new _a,Ca=class extends ma{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new V){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(ya.subVectors(r[0],r[1]).add(r[0]),c=ya);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(va.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=va),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ba.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),xa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Sa.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ba.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),xa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Sa.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ba.calc(s),xa.calc(s),Sa.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new V().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function wa(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ta(e,t){let n=1-e;return n*n*t}function Ea(e,t){return 2*(1-e)*e*t}function Da(e,t){return e*e*t}function Oa(e,t,n,r){return Ta(e,t)+Ea(e,n)+Da(e,r)}function ka(e,t){let n=1-e;return n*n*n*t}function Aa(e,t){let n=1-e;return 3*n*n*e*t}function ja(e,t){return 3*(1-e)*e*e*t}function Ma(e,t){return e*e*e*t}function Na(e,t,n,r,i){return ka(e,t)+Aa(e,n)+ja(e,r)+Ma(e,i)}var Pa=class extends ma{constructor(e=new B,t=new B,n=new B,r=new B){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Na(e,r.x,i.x,a.x,o.x),Na(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fa=class extends ma{constructor(e=new V,t=new V,n=new V,r=new V){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Na(e,r.x,i.x,a.x,o.x),Na(e,r.y,i.y,a.y,o.y),Na(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ia=class extends ma{constructor(e=new B,t=new B){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},La=class extends ma{constructor(e=new V,t=new V){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends ma{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Oa(e,r.x,i.x,a.x),Oa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},za=class extends ma{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Oa(e,r.x,i.x,a.x),Oa(e,r.y,i.y,a.y),Oa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends ma{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new B){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(wa(o,s.x,c.x,l.x,u.x),wa(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new B().fromArray(n))}return this}},Va=Object.freeze({__proto__:null,ArcCurve:ga,CatmullRomCurve3:Ca,CubicBezierCurve:Pa,CubicBezierCurve3:Fa,EllipseCurve:ha,LineCurve:Ia,LineCurve3:La,QuadraticBezierCurve:Ra,QuadraticBezierCurve3:za,SplineCurve:Ba}),Ha=class extends ma{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Va[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Va[n.type]().fromJSON(n))}return this}},Ua=class extends Ha{constructor(e){super(),this.type=`Path`,this.currentPoint=new B,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ia(this.currentPoint.clone(),new B(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Ra(this.currentPoint.clone(),new B(e,t),new B(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Pa(this.currentPoint.clone(),new B(e,t),new B(n,r),new B(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Ba([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new ha(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Wa=class extends Ua{constructor(e){super(e),this.uuid=Tt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Ua().fromJSON(n))}return this}};function Ga(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ka(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=$a(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ja(a,o,n,s,c,l,0),o}function Ka(e,t,n,r,i){let a;if(i===wo(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=xo(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=xo(i/r|0,e[i],e[i+1],a);return a&&po(a,a.next)&&(So(a),a=a.next),a}function qa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(po(n,n.next)||fo(n.prev,n,n.next)===0)){if(So(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ja(e,t,n,r,i,a,o){if(!e)return;!o&&a&&io(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Xa(e,r,i,a):Ya(e))t.push(c.i,e.i,l.i),So(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=Za(qa(e),t),Ja(e,t,n,r,i,a,2)):o===2&&Qa(e,t,n,r,i,a):Ja(qa(e),t,n,r,i,a,1);break}}}function Ya(e){let t=e.prev,n=e,r=e.next;if(fo(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&lo(i,s,a,c,o,l,m.x,m.y)&&fo(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Xa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(fo(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=oo(p,m,t,n,r),v=oo(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&lo(s,u,c,d,l,f,y.x,y.y)&&fo(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&lo(s,u,c,d,l,f,b.x,b.y)&&fo(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&lo(s,u,c,d,l,f,y.x,y.y)&&fo(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&lo(s,u,c,d,l,f,b.x,b.y)&&fo(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Za(e,t){let n=e;do{let r=n.prev,i=n.next.next;!po(r,i)&&mo(r,n,n.next,i)&&vo(r,i)&&vo(i,r)&&(t.push(r.i,n.i,i.i),So(n),So(n.next),n=e=i),n=n.next}while(n!==e);return qa(n)}function Qa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&uo(o,e)){let s=bo(o,e);o=qa(o,o.next),s=qa(s,s.next),Ja(o,t,n,r,i,a,0),Ja(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function $a(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ka(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(so(o))}i.sort(eo);for(let e=0;e<i.length;e++)n=to(i[e],n);return n}function eo(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function to(e,t){let n=no(e,t);if(!n)return t;let r=bo(n,e);return qa(r,r.next),qa(n,n.next)}function no(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(po(e,n))return n;do{if(po(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&co(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);vo(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&ro(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function ro(e,t){return fo(e.prev,e,t.prev)<0&&fo(t.next,e,e.next)<0}function io(e,t,n,r){let i=e;do i.z===0&&(i.z=oo(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ao(i)}function ao(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function oo(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function so(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function co(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function lo(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&co(e,t,n,r,i,a,o,s)}function uo(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!_o(e,t)&&(vo(e,t)&&vo(t,e)&&yo(e,t)&&(fo(e.prev,e,t.prev)||fo(e,t.prev,t))||po(e,t)&&fo(e.prev,e,e.next)>0&&fo(t.prev,t,t.next)>0)}function fo(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function po(e,t){return e.x===t.x&&e.y===t.y}function mo(e,t,n,r){let i=go(fo(e,t,n)),a=go(fo(e,t,r)),o=go(fo(n,r,e)),s=go(fo(n,r,t));return!!(i!==a&&o!==s||i===0&&ho(e,n,t)||a===0&&ho(e,r,t)||o===0&&ho(n,e,r)||s===0&&ho(n,t,r))}function ho(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function go(e){return e>0?1:e<0?-1:0}function _o(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&mo(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function vo(e,t){return fo(e.prev,e,e.next)<0?fo(e,t,e.next)>=0&&fo(e,e.prev,t)>=0:fo(e,t,e.prev)<0||fo(e,e.next,t)<0}function yo(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function bo(e,t){let n=Co(e.i,e.x,e.y),r=Co(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function xo(e,t,n,r){let i=Co(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function So(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Co(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wo(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var To=class{static triangulate(e,t,n=2){return Ga(e,t,n)}},Eo=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Do(e),Oo(n,e);let a=e.length;t.forEach(Do);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Oo(n,t[e]);let o=To.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Do(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Oo(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var ko=class e extends Gr{constructor(e=new Wa([new B(.5,.5),new B(-.5,.5),new B(-.5,-.5),new B(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new G(r,3)),this.setAttribute(`uv`,new G(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ao:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new V,b=new V,x=new V}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Eo.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Eo.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||R(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new B(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new B(r/a,i/a)}let ee=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ee[e]=A(D[e],D[n],D[r]);let te=[],j,ne=ee.concat();for(let e=0,t=E;e<t;e++){let t=w[e];j=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),j[e]=A(t[e],t[r],t[i]);te.push(j),ne=ne.concat(j)}let re;if(p===0)re=Eo.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ee[t],a);M(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];j=te[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],j[e],a);M(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}re=Eo.triangulateShape(e,t)}let ie=re.length,ae=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],ne[e],ae):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),M(x.x,x.y,x.z)):M(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],ne[t],ae):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),M(x.x,x.y,x.z)):M(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ee[e],r);M(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];j=te[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],j[e],r);_?M(i.x,i.y+g[s-1].y,g[s-1].x+n):M(i.x,i.y,c+n)}}}oe(),se();function oe(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<ie;e++){let n=re[e];le(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<ie;e++){let n=re[e];le(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<ie;e++){let t=re[e];le(t[2],t[1],t[0])}for(let e=0;e<ie;e++){let t=re[e];le(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function se(){let e=r.length/3,t=0;ce(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ce(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ce(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ue(t+r+n,t+i+n,t+i+a,t+r+a)}}}function M(e,t,n){a.push(e),a.push(t),a.push(n)}function le(e,t,i){N(e),N(t),N(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function ue(e,t,i,a){N(e),N(t),N(a),N(t),N(i),N(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function N(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return jo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Va[i.type]().fromJSON(i)),new e(r,t.options)}},Ao={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new B(a,o),new B(s,c),new B(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new B(o,1-c),new B(l,1-d),new B(f,1-m),new B(h,1-_)]:[new B(s,1-c),new B(u,1-d),new B(p,1-m),new B(g,1-_)]}};function jo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Mo=class e extends Gr{constructor(e=[new B(0,-.5),new B(.5,0),new B(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=z(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new V,d=new B,f=new V,p=new V,m=new V,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new G(a,3)),this.setAttribute(`uv`,new G(o,2)),this.setAttribute(`normal`,new G(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},No=class e extends Gr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new G(p,3)),this.setAttribute(`normal`,new G(m,3)),this.setAttribute(`uv`,new G(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Po=class e extends Gr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new V,p=new B;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new G(s,3)),this.setAttribute(`normal`,new G(c,3)),this.setAttribute(`uv`,new G(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Fo=class e extends Gr{constructor(e=new Wa([new B(0,.5),new B(-.5,-.5),new B(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new G(r,3)),this.setAttribute(`normal`,new G(i,3)),this.setAttribute(`uv`,new G(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Eo.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Eo.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Eo.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Io(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Io(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Lo=class e extends Gr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new V,d=new V,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new G(p,3)),this.setAttribute(`normal`,new G(m,3)),this.setAttribute(`uv`,new G(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ro=class e extends Gr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new V,f=new V,p=new V;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new G(c,3)),this.setAttribute(`normal`,new G(l,3)),this.setAttribute(`uv`,new G(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},zo=class e extends Gr{constructor(e=new za(new V(-1,-1,0),new V(-1,1,0),new V(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new V,s=new V,c=new B,l=new V,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new G(u,3)),this.setAttribute(`normal`,new G(d,3)),this.setAttribute(`uv`,new G(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Va[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Bo(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ho(i))i.isRenderTargetTexture?(L(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ho(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Vo(e){let t={};for(let n=0;n<e.length;n++){let r=Bo(e[n]);for(let e in r)t[e]=r[e]}return t}function Ho(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Uo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Wo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:en.workingColorSpace}var Go={clone:Bo,merge:Vo},Ko=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jo=class extends ei{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ko,this.fragmentShader=qo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bo(e.uniforms),this.uniformsGroups=Uo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new fn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new U().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Yo=class extends Jo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Xo=class extends ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zo=class extends ei{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new W(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Qo=class extends ei{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$o=class extends ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=tt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},es=class extends ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},ts=class extends ei{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:``},this.type=`MeshMatcapMaterial`,this.color=new W(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:``},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}};function ns(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function rs(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var is=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},as=class extends is{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qe,endingEnd:Qe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case $e:i=e,o=2*t-n;break;case et:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case $e:a=e,s=2*n-t;break;case et:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},os=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ss=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},cs=class extends is{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ds(n,t,g,y,r);i[p]=ls(x,o,_,b,m)}return i}};function ls(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function us(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ds(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ls(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=us(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var fs=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ns(t,this.TimeBufferType),this.values=ns(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ns(e.times,Array),values:ns(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),rs(e.settings)&&(n.settings={inTangents:ns(e.settings.inTangents,Array),outTangents:ns(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ss(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new os(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new as(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new cs(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Je:t=this.InterpolantFactoryMethodDiscrete;break;case Ye:t=this.InterpolantFactoryMethodLinear;break;case Xe:t=this.InterpolantFactoryMethodSmooth;break;case Ze:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return L(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Je;case this.InterpolantFactoryMethodLinear:return Ye;case this.InterpolantFactoryMethodSmooth:return Xe;case this.InterpolantFactoryMethodBezier:return Ze}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;rs(this.settings)&&(ps(this.settings.inTangents,e),ps(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(R(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(R(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){R(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){R(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&dt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){R(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Xe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,rs(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ps(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}fs.prototype.ValueTypeName=``,fs.prototype.TimeBufferType=Float32Array,fs.prototype.ValueBufferType=Float32Array,fs.prototype.DefaultInterpolation=Ye;var ms=class extends fs{constructor(e,t,n){super(e,t,n)}};ms.prototype.ValueTypeName=`bool`,ms.prototype.ValueBufferType=Array,ms.prototype.DefaultInterpolation=Je,ms.prototype.InterpolantFactoryMethodLinear=void 0,ms.prototype.InterpolantFactoryMethodSmooth=void 0;var hs=class extends fs{constructor(e,t,n,r){super(e,t,n,r)}};hs.prototype.ValueTypeName=`color`;var gs=class extends fs{constructor(e,t,n,r){super(e,t,n,r)}};gs.prototype.ValueTypeName=`number`;var _s=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)qt.slerpFlat(i,0,a,c-o,a,c,s);return i}},vs=class extends fs{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new _s(this.times,this.values,this.getValueSize(),e)}};vs.prototype.ValueTypeName=`quaternion`,vs.prototype.InterpolantFactoryMethodSmooth=void 0;var ys=class extends fs{constructor(e,t,n){super(e,t,n)}};ys.prototype.ValueTypeName=`string`,ys.prototype.ValueBufferType=Array,ys.prototype.DefaultInterpolation=Je,ys.prototype.InterpolantFactoryMethodLinear=void 0,ys.prototype.InterpolantFactoryMethodSmooth=void 0;var bs=class extends fs{constructor(e,t,n,r){super(e,t,n,r)}};bs.prototype.ValueTypeName=`vector`;var xs=class extends Un{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ss=class extends xs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Cs=new U,ws=new V,Ts=new V,Es=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.mapType=E,this.map=null,this.mapPass=null,this.matrix=new U,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xi,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new fn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ws.setFromMatrixPosition(e.matrixWorld),t.position.copy(ws),Ts.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ts),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Cs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Cs,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Cs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ds=new V,Os=new qt,ks=new V,As=class extends Un{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new U,this.projectionMatrix=new U,this.projectionMatrixInverse=new U,this.coordinateSystem=lt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ds,Os,ks),ks.x===1&&ks.y===1&&ks.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ds,Os,ks.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ds,Os,ks),ks.x===1&&ks.y===1&&ks.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ds,Os,ks.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},js=new V,Ms=new B,Ns=new B,Ps=class extends As{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=wt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ct*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wt*2*Math.atan(Math.tan(Ct*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){js.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(js.x,js.y).multiplyScalar(-e/js.z),js.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(js.x,js.y).multiplyScalar(-e/js.z)}getViewSize(e,t){return this.getViewBounds(e,Ms,Ns),t.subVectors(Ns,Ms)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ct*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Fs=class extends Es{constructor(){super(new Ps(90,1,.5,500)),this.isPointLightShadow=!0}},Is=class extends xs{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Fs}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ls=class extends As{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Rs=class extends Es{constructor(){super(new Ls(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zs=class extends xs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.shadow=new Rs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Bs=-90,Vs=1,Hs=class extends Un{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ps(Bs,Vs,e,t);r.layers=this.layers,this.add(r);let i=new Ps(Bs,Vs,e,t);i.layers=this.layers,this.add(i);let a=new Ps(Bs,Vs,e,t);a.layers=this.layers,this.add(a);let o=new Ps(Bs,Vs,e,t);o.layers=this.layers,this.add(o);let s=new Ps(Bs,Vs,e,t);s.layers=this.layers,this.add(s);let c=new Ps(Bs,Vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Us=class extends Ps{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ws=`\\[\\]\\.:\\/`,Gs=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ks=`[^\\[\\]\\.:\\/]`,qs=`[^`+Ws.replace(`\\.`,``)+`]`,Js=`((?:WC+[\\/:])*)`.replace(`WC`,Ks),Ys=`(WCOD+)?`.replace(`WCOD`,qs),Xs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ks),Zs=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ks),Qs=RegExp(`^`+Js+Ys+Xs+Zs+`$`),$s=[`material`,`materials`,`bones`,`map`],ec=class{constructor(e,t,n){let r=n||tc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},tc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Gs,``)}static parseTrackName(e){let t=Qs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$s.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){L(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){R(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){R(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){R(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){R(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){R(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;R(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tc.Composite=ec,tc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},tc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},tc.prototype.GetterByBindingType=[tc.prototype._getValue_direct,tc.prototype._getValue_array,tc.prototype._getValue_arrayElement,tc.prototype._getValue_toArray],tc.prototype.SetterByBindingTypeAndVersioning=[[tc.prototype._setValue_direct,tc.prototype._setValue_direct_setNeedsUpdate,tc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_array,tc.prototype._setValue_array_setNeedsUpdate,tc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_arrayElement,tc.prototype._setValue_arrayElement_setNeedsUpdate,tc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tc.prototype._setValue_fromArray,tc.prototype._setValue_fromArray_setNeedsUpdate,tc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nc=new U,rc=class{constructor(e,t,n=0,r=1/0){this.ray=new xi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Dn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):R(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return nc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nc),this}intersectObject(e,t=!0,n=[]){return ac(e,this,n,t),n.sort(ic),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)ac(e[r],this,n,t);return n.sort(ic),n}};function ic(e,t){return e.distance-t.distance}function ac(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)ac(r[e],t,n,!0)}}var oc=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=z(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(z(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var sc=class extends bt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function cc(e,t,n,r){let i=lc(r);switch(n){case se:return e*t;case N:return e*t/i.components*i.byteLength;case de:return e*t/i.components*i.byteLength;case fe:return e*t*2/i.components*i.byteLength;case pe:return e*t*2/i.components*i.byteLength;case ce:return e*t*3/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case me:return e*t*4/i.components*i.byteLength;case he:case ge:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case _e:case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case be:case Se:return Math.max(e,16)*Math.max(t,8)/4;case ye:case xe:return Math.max(e,8)*Math.max(t,8)/2;case Ce:case we:case Ee:case De:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Te:case Oe:case ke:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ae:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case je:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Me:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ne:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Pe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case P:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Fe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ie:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Le:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case F:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Re:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case I:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ze:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Be:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ve:case He:case Ue:return Math.ceil(e/4)*Math.ceil(t/4)*16;case We:case Ge:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ke:case qe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function lc(e){switch(e){case E:case D:return{byteLength:1,components:1};case k:case O:case j:return{byteLength:2,components:1};case ne:case re:return{byteLength:2,components:4};case ee:case A:case te:return{byteLength:4,components:1};case ae:case oe:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?L(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function uc(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function dc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var fc={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},K={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new H}},envmap:{envMap:{value:null},envMapRotation:{value:new H},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new H}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new H}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new H},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new H},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new H},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new H}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new H}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new H}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0},uvTransform:{value:new H}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}}},pc={basic:{uniforms:Vo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:fc.meshbasic_vert,fragmentShader:fc.meshbasic_frag},lambert:{uniforms:Vo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:fc.meshlambert_vert,fragmentShader:fc.meshlambert_frag},phong:{uniforms:Vo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:fc.meshphong_vert,fragmentShader:fc.meshphong_frag},standard:{uniforms:Vo([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fc.meshphysical_vert,fragmentShader:fc.meshphysical_frag},toon:{uniforms:Vo([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new W(0)}}]),vertexShader:fc.meshtoon_vert,fragmentShader:fc.meshtoon_frag},matcap:{uniforms:Vo([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:fc.meshmatcap_vert,fragmentShader:fc.meshmatcap_frag},points:{uniforms:Vo([K.points,K.fog]),vertexShader:fc.points_vert,fragmentShader:fc.points_frag},dashed:{uniforms:Vo([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fc.linedashed_vert,fragmentShader:fc.linedashed_frag},depth:{uniforms:Vo([K.common,K.displacementmap]),vertexShader:fc.depth_vert,fragmentShader:fc.depth_frag},normal:{uniforms:Vo([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:fc.meshnormal_vert,fragmentShader:fc.meshnormal_frag},sprite:{uniforms:Vo([K.sprite,K.fog]),vertexShader:fc.sprite_vert,fragmentShader:fc.sprite_frag},background:{uniforms:{uvTransform:{value:new H},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fc.background_vert,fragmentShader:fc.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new H}},vertexShader:fc.backgroundCube_vert,fragmentShader:fc.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fc.cube_vert,fragmentShader:fc.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fc.equirect_vert,fragmentShader:fc.equirect_frag},distance:{uniforms:Vo([K.common,K.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fc.distance_vert,fragmentShader:fc.distance_frag},shadow:{uniforms:Vo([K.lights,K.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:fc.shadow_vert,fragmentShader:fc.shadow_frag}};pc.physical={uniforms:Vo([pc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new H},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new H},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new H},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new H},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new H},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new H},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new H},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new H},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new H},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new H},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new H},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new H}}]),vertexShader:fc.meshphysical_vert,fragmentShader:fc.meshphysical_frag};var mc={r:0,b:0,g:0},hc=new U,gc=new H;gc.set(-1,0,0,0,1,0,0,0,1);function _c(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Pi(new la(1,1,1),new Jo({name:`BackgroundCubeMaterial`,uniforms:Bo(pc.backgroundCube.uniforms),vertexShader:pc.backgroundCube.vertexShader,fragmentShader:pc.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gc),l.material.toneMapped=en.getTransfer(i.colorSpace)!==at,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Pi(new No(2,2),new Jo({name:`BackgroundMaterial`,uniforms:Bo(pc.background.uniforms),vertexShader:pc.background.vertexShader,fragmentShader:pc.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=en.getTransfer(i.colorSpace)!==at,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(mc,Wo(e)),n.buffers.color.setClear(mc.r,mc.g,mc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function vc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function yc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function bc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function xc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Qr,s=new H,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Sc=4,Cc=6,wc=20,Tc=256,Ec=new Ls,Dc=new W,Oc=null,kc=0,Ac=0,jc=!1,Mc=new V,Nc=new V,Pc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Mc}=i;Oc=this._renderer.getRenderTarget(),kc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oc,kc,Ac),this._renderer.xr.enabled=jc,e.scissorTest=!1,Lc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oc=this._renderer.getRenderTarget(),kc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:C,minFilter:C,generateMipmaps:!1,type:j,format:M,colorSpace:rt,depthBuffer:!1},r=Ic(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ic(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Fc(r)),this._blurMaterial=zc(r,e,t),this._ggxMaterial=Rc(r,e,t)}return r}_compileMaterial(e){let t=new Pi(new Gr,e);this._renderer.compile(t,Ec)}_sceneToCubeUV(e,t,n,r,i){let a=new Ps(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Dc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pi(new la,new Si({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Dc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Lc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Lc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ec)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Sc?n-d+Sc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Lc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ec),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Lc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ec)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Lc(t,3*l*(r>this._lodMax-Sc?r-this._lodMax+Sc:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ec)}};function Fc(e){let t=[],n=[],r=e,i=e-Sc+1+Cc;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Nc.set(1,r,n):e===1?Nc.set(-n,1,-r):e===2?Nc.set(-n,r,1):e===3?Nc.set(-1,r,-n):e===4?Nc.set(-n,-1,r):Nc.set(n,r,-1),Nc.toArray(l,(e*6+t)*3)}}let u=new Gr;u.setAttribute(`position`,new jr(c,3)),u.setAttribute(`outputDirection`,new jr(l,3)),n.push(new Pi(u,null)),r>Sc&&r--}return{lodMeshes:n,sizeLods:t}}function Ic(e,t,n){let r=new mn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Lc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Rc(e,t,n){return new Jo({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Tc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zc(e,t,n){return new Jo({name:`SphericalGaussianBlur`,defines:{SAMPLES:wc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Hc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bc(){return new Jo({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vc(){return new Jo({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uc=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ia(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new la(5,5,5),i=new Jo({name:`CubemapFromEquirect`,uniforms:Bo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Pi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=C),new Hs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Wc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Uc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Pc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Pc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Gc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&_t(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Kc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Nr:Mr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function qc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Jc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:R(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Yc(e,t,n){let r=new WeakMap,i=new fn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new hn(h,p,m,u);g.type=te,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new B(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Xc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Zc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Qc(e,t,n,r,i,a){let o=new mn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Gr;l.setAttribute(`position`,new G([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new G([0,2,0,0,2,0],2));let u=new Yo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Pi(l,u),f=new Ls(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new mn(t,n,{type:j,depthBuffer:!1,stencilBuffer:!1}),c=new mn(t,n,{type:j,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},en.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Zc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var $c=new dn,el=new oa(1,1),tl=new hn,nl=new gn,rl=new ia,il=[],al=[],ol=new Float32Array(16),sl=new Float32Array(9),cl=new Float32Array(4);function ll(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=il[i];if(a===void 0&&(a=new Float32Array(i),il[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ul(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function dl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function fl(e,t){let n=al[t];n===void 0&&(n=new Int32Array(t),al[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function pl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ml(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ul(n,t))return;e.uniform2fv(this.addr,t),dl(n,t)}}function hl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ul(n,t))return;e.uniform3fv(this.addr,t),dl(n,t)}}function gl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ul(n,t))return;e.uniform4fv(this.addr,t),dl(n,t)}}function _l(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ul(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),dl(n,t)}else{if(ul(n,r))return;cl.set(r),e.uniformMatrix2fv(this.addr,!1,cl),dl(n,r)}}function vl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ul(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),dl(n,t)}else{if(ul(n,r))return;sl.set(r),e.uniformMatrix3fv(this.addr,!1,sl),dl(n,r)}}function yl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ul(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),dl(n,t)}else{if(ul(n,r))return;ol.set(r),e.uniformMatrix4fv(this.addr,!1,ol),dl(n,r)}}function bl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function xl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ul(n,t))return;e.uniform2iv(this.addr,t),dl(n,t)}}function Sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ul(n,t))return;e.uniform3iv(this.addr,t),dl(n,t)}}function Cl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ul(n,t))return;e.uniform4iv(this.addr,t),dl(n,t)}}function wl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Tl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ul(n,t))return;e.uniform2uiv(this.addr,t),dl(n,t)}}function El(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ul(n,t))return;e.uniform3uiv(this.addr,t),dl(n,t)}}function Dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ul(n,t))return;e.uniform4uiv(this.addr,t),dl(n,t)}}function Ol(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(el.compareFunction=n.isReversedDepthBuffer()?518:515,a=el):a=$c,n.setTexture2D(t||a,i)}function kl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||nl,i)}function Al(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||rl,i)}function jl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||tl,i)}function Ml(e){switch(e){case 5126:return pl;case 35664:return ml;case 35665:return hl;case 35666:return gl;case 35674:return _l;case 35675:return vl;case 35676:return yl;case 5124:case 35670:return bl;case 35667:case 35671:return xl;case 35668:case 35672:return Sl;case 35669:case 35673:return Cl;case 5125:return wl;case 36294:return Tl;case 36295:return El;case 36296:return Dl;case 35678:case 36198:case 36298:case 36306:case 35682:return Ol;case 35679:case 36299:case 36307:return kl;case 35680:case 36300:case 36308:case 36293:return Al;case 36289:case 36303:case 36311:case 36292:return jl}}function Nl(e,t){e.uniform1fv(this.addr,t)}function Pl(e,t){let n=ll(t,this.size,2);e.uniform2fv(this.addr,n)}function Fl(e,t){let n=ll(t,this.size,3);e.uniform3fv(this.addr,n)}function Il(e,t){let n=ll(t,this.size,4);e.uniform4fv(this.addr,n)}function Ll(e,t){let n=ll(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Rl(e,t){let n=ll(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function zl(e,t){let n=ll(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Bl(e,t){e.uniform1iv(this.addr,t)}function Vl(e,t){e.uniform2iv(this.addr,t)}function Hl(e,t){e.uniform3iv(this.addr,t)}function Ul(e,t){e.uniform4iv(this.addr,t)}function Wl(e,t){e.uniform1uiv(this.addr,t)}function Gl(e,t){e.uniform2uiv(this.addr,t)}function Kl(e,t){e.uniform3uiv(this.addr,t)}function ql(e,t){e.uniform4uiv(this.addr,t)}function Jl(e,t,n){let r=this.cache,i=t.length,a=fl(n,i);ul(r,a)||(e.uniform1iv(this.addr,a),dl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?el:$c;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Yl(e,t,n){let r=this.cache,i=t.length,a=fl(n,i);ul(r,a)||(e.uniform1iv(this.addr,a),dl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||nl,a[e])}function Xl(e,t,n){let r=this.cache,i=t.length,a=fl(n,i);ul(r,a)||(e.uniform1iv(this.addr,a),dl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||rl,a[e])}function Zl(e,t,n){let r=this.cache,i=t.length,a=fl(n,i);ul(r,a)||(e.uniform1iv(this.addr,a),dl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||tl,a[e])}function Ql(e){switch(e){case 5126:return Nl;case 35664:return Pl;case 35665:return Fl;case 35666:return Il;case 35674:return Ll;case 35675:return Rl;case 35676:return zl;case 5124:case 35670:return Bl;case 35667:case 35671:return Vl;case 35668:case 35672:return Hl;case 35669:case 35673:return Ul;case 5125:return Wl;case 36294:return Gl;case 36295:return Kl;case 36296:return ql;case 35678:case 36198:case 36298:case 36306:case 35682:return Jl;case 35679:case 36299:case 36307:return Yl;case 35680:case 36300:case 36308:case 36293:return Xl;case 36289:case 36303:case 36311:case 36292:return Zl}}var $l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ml(t.type)}},eu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ql(t.type)}},tu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},nu=/(\w+)(\])?(\[|\.)?/g;function ru(e,t){e.seq.push(t),e.map[t.id]=t}function iu(e,t,n){let r=e.name,i=r.length;for(nu.lastIndex=0;;){let a=nu.exec(r),o=nu.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){ru(n,l===void 0?new $l(s,e,t):new eu(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new tu(s),ru(n,e)),n=e}}}var au=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);iu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function ou(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var su=37297,cu=0;function lu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var uu=new H;function du(e){en._getMatrix(uu,en.workingColorSpace,e);let t=`mat3( ${uu.elements.map(e=>e.toFixed(4))} )`;switch(en.getTransfer(e)){case it:return[t,`LinearTransferOETF`];case at:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function fu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+lu(e.getShaderSource(t),r)}return i}function pu(e,t){let n=du(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var mu={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function hu(e,t){let n=mu[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var gu=new V;function _u(){return en.getLuminanceCoefficients(gu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${gu.x.toFixed(4)}, ${gu.y.toFixed(4)}, ${gu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function vu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(xu).join(`
`)}function yu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function bu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function xu(e){return e!==``}function Su(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var wu=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tu(e){return e.replace(wu,Du)}var Eu=new Map;function Du(e,t){let n=fc[t];if(n===void 0){let e=Eu.get(t);if(e!==void 0)n=fc[e],L(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Tu(n)}var Ou=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ku(e){return e.replace(Ou,Au)}function Au(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ju(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Mu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Nu(e){return Mu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Pu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Fu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Pu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Iu={302:`ENVMAP_MODE_REFRACTION`};function Lu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Iu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ru={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function zu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ru[e.combine]||`ENVMAP_BLENDING_NONE`}function Bu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Vu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Nu(n),l=Fu(n),u=Lu(n),d=zu(n),f=Bu(n),p=vu(n),m=yu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(xu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(xu).join(`
`),_.length>0&&(_+=`
`)):(g=[ju(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(xu).join(`
`),_=[ju(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:fc.tonemapping_pars_fragment,n.toneMapping===0?``:hu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,fc.colorspace_pars_fragment,pu(`linearToOutputTexel`,n.outputColorSpace),_u(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(xu).join(`
`)),o=Tu(o),o=Su(o,n),o=Cu(o,n),s=Tu(s),s=Su(s,n),s=Cu(s,n),o=ku(o),s=ku(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=ou(i,i.VERTEX_SHADER,y),S=ou(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=fu(i,x,`vertex`),n=fu(i,S,`fragment`);R(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new au(i,h),T=bu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,su)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=cu++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Hu=0,Uu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Wu(e),t.set(e,n)),n}},Wu=class{constructor(e){this.id=Hu++,this.code=e,this.usedTimes=0}};function Gu(e){return e===1030||e===37490||e===36285}function Ku(e,t,n,r,i,a){let o=new Dn,s=new Uu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=pc[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,re=!!i.map,ie=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap&&i.wireframe===!1,M=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,N=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:en.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:M,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:M&&i.normalMapType===1,normalMapTangentSpace:M&&i.normalMapType===0,packedNormalMap:M&&i.normalMapType===0&&Gu(i.normalMap.format),metalnessMap:N,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:M&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:N&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(M||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&M===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&en.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&en.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=pc[t];n=Go.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Vu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function qu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ju(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Yu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Xu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ju),r.length>1&&r.sort(t||Yu),i.length>1&&i.sort(t||Yu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Zu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Xu,e.set(t,[i])):n>=r.length?(i=new Xu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Qu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new V,color:new W};break;case`SpotLight`:n={position:new V,direction:new V,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new V,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new V,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new V,halfWidth:new V,halfHeight:new V}}return e[t.id]=n,n}}}function $u(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ed=0;function td(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function nd(e){let t=new Qu,n=$u(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new V);let i=new V,a=new U,o=new U;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(td);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=K.LTC_FLOAT_1,r.rectAreaLTC2=K.LTC_FLOAT_2):(r.rectAreaLTC1=K.LTC_HALF_1,r.rectAreaLTC2=K.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ed++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function rd(e){let t=new nd(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function id(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new rd(e),t.set(n,[a])):r>=i.length?(a=new rd(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ad=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,od=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,sd=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],cd=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],ld=new U,ud=new V,dd=new V;function fd(e,t,n){let r=new Xi,i=new B,a=new B,o=new fn,s=new $o,c=new es,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Jo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:ad,fragmentShader:od}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Gr;m.setAttribute(`position`,new jr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Pi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){L(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new mn(i.x,i.y,{format:fe,type:j,minFilter:C,magFilter:C,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new oa(i.x,i.y,te),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=le,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=b,d.map.depthTexture.magFilter=b}else l.isPointLight?(d.map=new Uc(i.x),d.map.depthTexture=new sa(i.x,ee)):(d.map=new mn(i.x,i.y),d.map.depthTexture=new oa(i.x,i.y,ee)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=le,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=C,d.map.depthTexture.magFilter=C):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=b,d.map.depthTexture.magFilter=b);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ud.setFromMatrixPosition(l.matrixWorld),e.position.copy(ud),dd.copy(e.position),dd.add(sd[t]),e.up.copy(cd[t]),e.lookAt(dd),e.updateMatrixWorld(),n.makeTranslation(-ud.x,-ud.y,-ud.z),ld.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(ld,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),x(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new mn(i.x,i.y,{format:fe,type:j}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],i,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function pd(e,t){function n(){let t=!1,n=new fn,r=null,i=new fn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=yt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new fn().fromArray(oe),M=new fn().fromArray(se);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),N(e.CULL_FACE),_e(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(de(e.BLEND),g=!1);else if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:R(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:R(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:R(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:R(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(N(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?N(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+te-1),ie!==t&&(e.activeTexture(t),ie=t)}function Te(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+te-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Re(t){M.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),M.copy(t))}function I(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ze(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Be(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ce.set(0,0,e.canvas.width,e.canvas.height),M.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:I,uniformBlockBinding:ze,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:Be}}function md(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new B,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):ft(`canvas`)}function g(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?it:en.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ie(t)}function ne(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&re(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function re(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ie(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let ae=0;function oe(){ae=0}function se(){return ae}function ce(e){ae=e}function M(){let e=ae;return e>=i.maxTextures&&L(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ae+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&P(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?xe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function fe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?xe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?Se(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let me={[_]:e.REPEAT,[v]:e.CLAMP_TO_EDGE,[y]:e.MIRRORED_REPEAT},he={[b]:e.NEAREST,[x]:e.NEAREST_MIPMAP_NEAREST,[S]:e.NEAREST_MIPMAP_LINEAR,[C]:e.LINEAR,[w]:e.LINEAR_MIPMAP_NEAREST,[T]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,me[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=le(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&re(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ye(n.start,r.width,4),c=ye(t.start,r.width,4);n.start<=i+1&&a===c&&ye(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function xe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ve(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=en.getPrimaries(en.workingColorSpace),r=o.colorSpace===``?null:en.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Fe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=k(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);_e(c,o);let h,_=o.mipmaps,v=o.isVideoTexture!==!0,y=f.__version===void 0||l===!0,b=u.dataReady,x=ee(o,t);if(o.isDepthTexture)m=A(o.format===ue,o.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(_.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,x,m,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)h=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,x,m,t.width,t.height),b&&be(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,x,m,_[0].width,_[0].height,t.depth);for(let i=0,a=_.length;i<a;i++)if(h=_[i],o.format!==1023){if(r!==null){if(v){if(b){if(o.layerUpdates.size>0){let t=cc(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?b&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,x,m,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)h=_[t],o.format===1023?v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?b&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,x,m,t.width,t.height,t.depth),b){if(o.layerUpdates.size>0){let i=cc(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,x,m,t.width,t.height,t.depth),b&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,x,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<x;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&y){let t=Ie(_[0]);n.texStorage2D(e.TEXTURE_2D,x,m,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)h=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(v){if(y){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,x,m,r.width,r.height)}b&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);E(o)&&D(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,o,s){if(o.image.length!==6)return;let c=ve(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=en.getPrimaries(en.workingColorSpace),r=o.colorSpace===``?null:en.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Fe(o,m[e]);let h=m[0],_=a.convert(o.format,o.colorSpace),v=a.convert(o.type),y=k(o.internalFormat,_,v,o.normalized,o.colorSpace),b=o.isVideoTexture!==!0,x=u.__version===void 0||c===!0,S=l.dataReady,C=ee(o,h);_e(e.TEXTURE_CUBE_MAP,o);let w;if(f){b&&x&&n.texStorage2D(e.TEXTURE_CUBE_MAP,C,y,h.width,h.height);for(let t=0;t<6;t++){w=m[t].mipmaps;for(let r=0;r<w.length;r++){let i=w[r];o.format===1023?b?S&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?S&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(w=o.mipmaps,b&&x){w.length>0&&C++;let t=Ie(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,C,y,t.width,t.height)}for(let t=0;t<6;t++)if(p){b?S&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,_,v,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,m[t].width,m[t].height,0,_,v,m[t].data);for(let r=0;r<w.length;r++){let i=w[r].image[t].image;b?S&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{b?S&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,m[t]);for(let r=0;r<w.length;r++){let i=w[r];b?S&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}E(o)&&D(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ce(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=k(o.internalFormat,c,l,o.normalized,o.colorSpace);Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,te)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=Ne(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Te(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Te(i.__webglFramebuffer[0],t,0):Te(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),we(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),we(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,i){let a=r.get(t);n!==void 0&&Ce(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ee(t)}function Oe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,j);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Pe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),we(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ce(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),_e(c,a),Ce(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),E(a)&&D(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),_e(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ce(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&Ee(t)}function ke(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Ae=[],je=[];function Me(t){if(t.samples>0){if(Pe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ae.length=0,je.length=0,Ae.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ae.push(l),je.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function Pe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function P(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(en.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):R(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=oe,this.getTextureUnits=se,this.setTextureUnits=ce,this.setTexture2D=N,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function hd(e,t){function n(n,r=``){let i,a=en.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var gd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_d=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,vd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ca(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jo({vertexShader:gd,fragmentShader:_d,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pi(new No(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yd=class extends bt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new vd,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new B,C=null,w=null,T=new Ps;T.viewport=new fn;let D=new Ps;D.viewport=new fn;let O=[T,D],k=new Us,A=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ne(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ne),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}A=null,te=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ne),r.addEventListener(`inputsourceschange`,re),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ue:le,a=_.stencil?ie:ee);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new mn(d.textureWidth,d.textureHeight,{format:M,type:E,depthTexture:new oa(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new mn(f.framebufferWidth,f.framebufferHeight,{format:M,type:E,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ae=new V,oe=new V;function se(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),k.near=D.near=T.near=t,k.far=D.far=T.far=n,(A!==k.near||te!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),A=k.near,te=k.far),k.layers.mask=e.layers.mask|6,T.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;let i=e.parent,a=k.cameras;ce(k,i);for(let e=0;e<a.length;e++)ce(a[e],i);a.length===2?se(k,T,D):k.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),N(e,k,i)};function N(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=wt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(k)},this.getCameraTexture=function(e){return g[e]};let de=null;function fe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=O[n];o===void 0&&(o=new Ps,o.layers.enable(n),o.viewport=new fn,O[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ca,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let pe=new uc;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},bd=new U,xd=new H;xd.set(-1,0,0,0,1,0,0,0,1);function Sd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Wo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(bd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(xd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Cd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return R(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var wd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Td=null;function Ed(){return Td===null&&(Td=new Li(wd,16,16,fe,j),Td.name=`DFG_LUT`,Td.minFilter=C,Td.magFilter=C,Td.wrapS=v,Td.wrapT=v,Td.generateMipmaps=!1,Td.needsUpdate=!0),Td}var Dd=class{constructor(e={}){let{canvas:t=pt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=E}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([me,pe,de]),g=new Set([E,ee,k,ie,ne,re]),_=new Uint32Array(4),v=new Int32Array(4),y=new V,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,A=null,te=null,ae=null,oe=null;this._outputColorSpace=nt;let se=0,ce=0,M=null,le=-1,ue=null,N=new fn,fe=new fn,he=null,ge=new W(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new fn(0,0,ve,ye),we=new fn(0,0,ve,ye),Te=!1,Ee=new Xi,De=!1,Oe=!1,ke=new U,Ae=new V,je=new fn,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return M===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,I,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}it()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),R(`WebGLRenderer: `+e.message),e}function it(){Ie=new Gc(P),Ie.init(),et=new hd(P,Ie),Le=new bc(P,Ie,e,et),F=new pd(P,Ie),Le.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),te=P.createFramebuffer(),ae=P.createFramebuffer(),oe=P.createFramebuffer(),Re=new Jc(P),I=new qu,ze=new md(P,Ie,F,I,Le,et,Re),Be=new Wc(D),Ve=new dc(P),tt=new vc(P,Ve),He=new Kc(P,Ve,Re,tt),Ue=new Xc(P,He,Ve,tt,Re),Ze=new Yc(P,Le,ze),Je=new xc(I),We=new Ku(D,Be,Ie,Le,tt,Je),Ge=new Sd(D,I),Ke=new Zu,qe=new id(Ie),Xe=new _c(D,Be,F,Ue,p,s),Ye=new fd(D,Ue,Le),rt=new Cd(P,Re,Le,F),Qe=new yc(P,Ie,Re),$e=new qc(P,Ie,Re),Re.programs=We.programs,D.capabilities=Le,D.extensions=Ie,D.properties=I,D.renderLists=Ke,D.shadowMap=Ye,D.state=F,D.info=Re}m!==1009&&(w=new Qc(m,t.width,t.height,o,r,i));let at=new yd(D,P);this.xr=at,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){at.isPresenting?L(`WebGLRenderer: Can't change size while VR device is presenting.`):(ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)R(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(N)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(N.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(fe.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),A=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),Xe.dispose(),Ke.dispose(),qe.dispose(),I.dispose(),Be.dispose(),Ue.dispose(),tt.dispose(),rt.dispose(),We.dispose(),at.dispose(),at.removeEventListener(`sessionstart`,yt),at.removeEventListener(`sessionend`,bt),xt.stop()};function ot(e){e.preventDefault(),ht(`WebGLRenderer: Context Lost.`),O=!0}function st(){ht(`WebGLRenderer: Context Restored.`),O=!1;let e=Re.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;it(),Re.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function ct(e){R(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ut(e){let t=e.target;t.removeEventListener(`dispose`,ut),dt(t)}function dt(e){ft(e),I.remove(e)}function ft(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){We.releaseProgram(e)}),e.isShaderMaterial&&We.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=At(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;tt.setup(i,r,s,n,c);let h,g=Qe;if(c!==null&&(h=Ve.get(c),g=$e,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ve.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n,r){A!==null&&e.isNodeMaterial&&A.setObject(r,e),De===!0&&Je.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),A!==null&&A.renderStart(e,t,n),x=qe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),A!==null&&A.updateLights(x.state.lightsArray),Oe=this.localClippingEnabled,De=Je.init(this.clippingPlanes,Oe),De===!0&&Je.setGlobalState(this.clippingPlanes,t),A!==null&&Ye.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];mt(o,n,t,e),r.add(o)}else mt(i,n,t,e),r.add(i)}}),x=C.pop(),A!==null&&A.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let gt=null;function _t(e){gt&&gt(e)}function yt(){xt.stop()}function bt(){xt.start()}let xt=new uc;xt.setAnimationLoop(_t),typeof self<`u`&&xt.setContext(self),this.setAnimationLoop=function(e){gt=e,at.setAnimationLoop(e),e===null?xt.stop():xt.start()},at.addEventListener(`sessionstart`,yt),at.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){R(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(O===!0)return;A!==null&&A.renderStart(e,t);let n=at.enabled===!0&&at.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(D,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(t),t=at.getCamera()),e.isScene===!0&&e.onBeforeRender(D,e,t,M),x=qe.get(e,C.length),x.init(t),x.state.textureUnits=ze.getTextureUnits(),C.push(x),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,lt,t.reversedDepth),Oe=this.localClippingEnabled,De=Je.init(this.clippingPlanes,Oe),b=Ke.get(e,S.length),b.init(),S.push(b),at.enabled===!0&&at.isPresenting===!0){let e=D.xr.getDepthSensingMesh();e!==null&&St(e,t,-1/0,D.sortObjects)}St(e,t,0,D.sortObjects),b.finish(),A!==null&&A.updateLights(x.state.lightsArray),D.sortObjects===!0&&b.sort(xe,Se),Ne=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ne&&Xe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Je.beginShadows();let i=x.state.shadowsArray;if(Ye.render(i,e,t),De===!0&&Je.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];wt(n,r,e,a)}Ne&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Ct(b,e,n,n.viewport)}}else r.length>0&&wt(n,r,e,t),Ne&&Xe.render(e),Ct(b,e,t)}M!==null&&ce===0&&(ze.updateMultisampleRenderTarget(M),ze.updateRenderTargetMipmap(M)),r&&w.end(D),e.isScene===!0&&e.onAfterRender(D,e,t),tt.resetDefaultState(),le=-1,ue=null,C.pop(),C.length>0?(x=C[C.length-1],ze.setTextureUnits(x.state.textureUnits),De===!0&&Je.setGlobalState(D.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,A!==null&&A.renderEnd()};function St(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=Ue.update(e),a=e.material;a.visible&&b.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=Ue.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,je.z,s,t)}}else a.visible&&b.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)St(i[e],t,n,r)}function Ct(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),De===!0&&Je.setGlobalState(D.clippingPlanes,n),r&&F.viewport(N.copy(r)),i.length>0&&Tt(i,t,n),a.length>0&&Tt(a,t,n),o.length>0&&Tt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function wt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new mn(1,1,{generateMipmaps:!0,type:e?j:E,minFilter:T,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:en.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||N;a.setSize(o.z*D.transmissionResolutionScale,o.w*D.transmissionResolutionScale);let s=D.getRenderTarget(),c=D.getActiveCubeFace(),l=D.getActiveMipmapLevel();D.setRenderTarget(a),D.getClearColor(ge),_e=D.getClearAlpha(),_e<1&&D.setClearColor(16777215,.5),D.clear(),Ne&&Xe.render(n);let u=D.toneMapping;D.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),De===!0&&Je.setGlobalState(D.clippingPlanes,r),Tt(e,n,r),ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,z(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a))}D.setRenderTarget(s,c,l),D.setClearColor(ge,_e),d!==void 0&&(r.viewport=d),D.toneMapping=u}function Tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&z(o,t,n,s,l,c)}}function z(e,t,n,r,i,a){A!==null&&i.isNodeMaterial&&A.setObject(e,i),e.onBeforeRender(D,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(D,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=2):D.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(D,t,n,r,i,a)}function Et(e,t,n){t.isScene!==!0&&(t=Me);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=We.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=We.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Be.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ut),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ot(e,s),d}else s.uniforms=We.getUniforms(e),A!==null&&e.isNodeMaterial&&A.build(e,n,s),e.onBeforeCompile(s,D),d=We.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Je.uniform),Ot(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=au.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ot(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function kt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function At(e,t,n,r,i){t.isScene!==!0&&(t=Me),ze.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?D.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:en.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Be.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=D.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(De===!0&&(Oe===!0||e!==ue)){let t=e===ue&&r.id===le;Je.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Je.numPlanes||v.numIntersection!==Je.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=Et(r,t,i),A&&r.isNodeMaterial&&A.onUpdateProgram(r,S,v));let C=!1,w=!1,T=!1,E=S.getUniforms(),O=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,T=!0),r.id!==le&&(le=r.id,w=!0),v.needsLights){let e=kt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ue!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(P,`projectionMatrix`,e.projectionMatrix),E.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&E.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),ue!==e&&(ue=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(P,`sunShadowMap`,y.state.sunShadowMap,ze),y.state.directionalShadowMap.length>0&&E.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,ze),y.state.spotShadowMap.length>0&&E.setValue(P,`spotShadowMap`,y.state.spotShadowMap,ze),y.state.pointShadowMap.length>0&&E.setValue(P,`pointShadowMap`,y.state.pointShadowMap,ze)),i.isSkinnedMesh){E.setOptional(P,i,`bindMatrix`),E.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(P,`boneTexture`,e.boneTexture,ze))}i.isBatchedMesh&&(E.setOptional(P,i,`batchingTexture`),E.setValue(P,`batchingTexture`,i._matricesTexture,ze),E.setOptional(P,i,`batchingIdTexture`),E.setValue(P,`batchingIdTexture`,i._indirectTexture,ze),E.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(P,`batchingColorTexture`,i._colorsTexture,ze));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&Ze.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Ed()),w){if(E.setValue(P,`toneMappingExposure`,D.toneMappingExposure),v.needsLights&&jt(O,T),a&&r.fog===!0&&Ge.refreshFogUniforms(O,a),Ge.refreshMaterialUniforms(O,r,be,ye,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;O.probesSH.value=e.texture,O.probesMin.value.copy(e.boundingBox.min),O.probesMax.value.copy(e.boundingBox.max),O.probesResolution.value.copy(e.resolution)}au.upload(P,Dt(v),O,ze)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(au.upload(P,Dt(v),O,ze),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(P,`center`,i.center),E.setValue(P,`modelViewMatrix`,i.modelViewMatrix),E.setValue(P,`normalMatrix`,i.normalMatrix),E.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,S),rt.bind(n,S)}}return S}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),N.copy(e.viewport),fe.copy(e.scissor),he=e.scissorTest,F.viewport(N),F.scissor(fe),F.setScissorTest(he),le=-1;return}if(o.__webglFramebuffer===void 0)ze.setupRenderTarget(e);else if(o.__hasExternalTextures)ze.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ze.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ze.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,N.copy(e.viewport),fe.copy(e.scissor),he=e.scissorTest}else N.copy(Ce).multiplyScalar(be).floor(),fe.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=te),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(N),F.scissor(fe),F.setScissorTest(he),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}le=-1};function Nt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,et.convert(c),et.convert(l),a)}finally{let e=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,et.convert(l),et.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await vt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ze.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=et.convert(t.format),_=et.convert(t.type),v;t.isData3DTexture?(ze.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ze.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(ze.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,ae),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,oe);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&ze.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ze.setTextureCube(e,0):e.isData3DTexture?ze.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ze.setTexture2DArray(e,0):ze.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){se=0,ce=0,M=null,F.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return lt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=en._getDrawingBufferColorSpace(e),t.unpackColorSpace=en._getUnpackColorSpace()}},Od=class{constructor(e){this.canvas=e,this.renderer=new Dd({canvas:e,antialias:!0,alpha:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=nt,this.renderer.setClearColor(0,0),this.renderer.xr.enabled=!0,this.camera=new Ps(55,1,.02,60),this.last=performance.now(),this.view=null,this.elapsed=0,this.fpsFrames=0,this.fpsTime=0,this.fps=60,this.resize(),window.addEventListener(`resize`,()=>this.resize()),window.addEventListener(`orientationchange`,()=>setTimeout(()=>this.resize(),200)),this.renderer.setAnimationLoop((e,t)=>this.frame(e,t))}resize(){if(this.renderer.xr.isPresenting)return;let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.view?.onResize?.(e,t)}setView(e){this.view!==e&&(this.view?.onHide?.(),this.view=e,e?.onShow?.(),this.resize())}frame(e,t){let n=performance.now(),r=Math.min(.05,(n-this.last)/1e3);this.last=n,this.elapsed+=r,this.fpsFrames++,this.fpsTime+=r,this.fpsTime>1&&(this.fps=Math.round(this.fpsFrames/this.fpsTime),this.fpsFrames=0,this.fpsTime=0);let i=this.view;i&&(i.update?.(r,this.elapsed,t),this.renderer.render(i.scene,i.camera||this.camera))}},kd={uTime:{value:0}},Ad={value:new V(.42,.58,0)},jd={value:.0058},Md=new W,Nd=new W,Pd={h:0,s:0,l:0};function Fd(e){return`#`+e.getHexString(nt)}function Id(e,t){return Md.set(e),Md.getHSL(Pd,nt),t>=0?Pd.l+=(1-Pd.l)*t:Pd.l*=1+t,Md.setHSL(Pd.h,Pd.s,Pd.l,nt),Fd(Md)}function Ld(e,t,n){return Md.set(e),Nd.set(t),Md.lerp(Nd,n),Fd(Md)}function Rd(e){Md.set(e);let t=Md.r,n=Md.g,r=Md.b;return .2126*t+.7152*n+.0722*r}function zd(e,t){if(!t)return e;let n=t/3;return Md.set(e),Md.getHSL(Pd,nt),Pd.s*=1-.72*n,Pd.l=Pd.l*(1-.16*n)+.04*n,Md.setHSL(Pd.h,Pd.s,Pd.l,nt),Fd(Md)}var Bd=null;function Vd(){if(Bd)return Bd;let e=new Uint8Array([88,150,214,255]);return Bd=new Li(e,e.length,1,N),Bd.minFilter=b,Bd.magFilter=b,Bd.generateMipmaps=!1,Bd.needsUpdate=!0,Bd}var Hd=`#include <common>
uniform vec3 uRim;`,Ud=`
  {
    float rimF = 1.0 - saturate( dot( normal, normalize( vViewPosition ) ) );
    rimF = smoothstep( uRim.y, 1.0, rimF ) * uRim.x;
    outgoingLight += ( diffuseColor.rgb * 0.55 + vec3( 0.16 ) ) * rimF;
  }
  #include <opaque_fragment>`;function Wd(e){return e.onBeforeCompile=e=>{e.uniforms.uRim=Ad,e.fragmentShader=e.fragmentShader.replace(`#include <common>`,Hd).replace(`#include <opaque_fragment>`,Ud)},e.customProgramCacheKey=()=>`av-toon-rim`,e}function Gd(e={}){return Wd(new Zo({gradientMap:Vd(),...e}))}var Kd=new Map;function qd(e){let t=Kd.get(e);if(t)return t;let n=document.createElement(`canvas`);n.width=n.height=256;let r=n.getContext(`2d`),i=Ld(e,`#ffffff`,.86),a=Ld(e,`#fff6d0`,.42),o=e,s=Id(e,-.55),c=Id(e,-.78);r.fillStyle=c,r.fillRect(0,0,256,256);let l=r.createRadialGradient(102.4,92.16,5.12,128,128,128);l.addColorStop(0,i),l.addColorStop(.18,a),l.addColorStop(.5,o),l.addColorStop(.82,s),l.addColorStop(1,c),r.fillStyle=l,r.beginPath(),r.arc(128,128,128,0,Math.PI*2),r.fill(),r.save(),r.beginPath(),r.arc(128,128,128,0,Math.PI*2),r.clip();let u=r.createLinearGradient(0,143.36,0,179.2);u.addColorStop(0,`rgba(255,255,255,0)`),u.addColorStop(.5,`rgba(255,250,225,0.45)`),u.addColorStop(1,`rgba(255,255,255,0)`),r.fillStyle=u,r.fillRect(0,143.36,256,35.84);let d=r.createLinearGradient(0,184.32,0,256);return d.addColorStop(0,`rgba(0,0,0,0)`),d.addColorStop(1,`rgba(40,20,0,0.35)`),r.fillStyle=d,r.fillRect(0,184.32,256,71.68),r.fillStyle=`rgba(255,255,255,0.95)`,r.beginPath(),r.ellipse(87.04,71.68,17.92,11.52,-.6,0,Math.PI*2),r.fill(),r.restore(),t=new aa(n),t.colorSpace=nt,Kd.set(e,t),t}var Jd=`#include <common>
uniform vec3 uRim;
uniform float uTime;
uniform float uSat;
varying vec3 vRbPos;
vec3 rbHsv( vec3 c ) {
  vec4 K = vec4( 1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0 );
  vec3 p = abs( fract( c.xxx + K.xyz ) * 6.0 - K.www );
  return c.z * mix( K.xxx, clamp( p - K.xxx, 0.0, 1.0 ), c.y );
}`,Yd=`#include <color_fragment>
  {
    float h = fract( vRbPos.y * 2.4 + vRbPos.x * 1.1 + vRbPos.z * 0.6 - uTime * 0.32 );
    vec3 rb = rbHsv( vec3( h, 0.62 * uSat, 1.0 ) );
    diffuseColor.rgb = pow( rb, vec3( 2.2 ) );
  }`;function Xd(e){let t=new Zo({gradientMap:Vd(),color:16777215}),n={value:e};return t.onBeforeCompile=e=>{e.uniforms.uRim=Ad,e.uniforms.uTime=kd.uTime,e.uniforms.uSat=n,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vRbPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vRbPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,Jd).replace(`#include <color_fragment>`,Yd).replace(`#include <opaque_fragment>`,Ud)},t.customProgramCacheKey=()=>`av-rainbow`,t}var Zd=null;function Qd(){if(Zd)return Zd;let e=new Si({color:2759724,side:1});return e.onBeforeCompile=e=>{e.uniforms.uOutline=jd,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uOutline;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
transformed += normalize( normal ) * uOutline;`)},e.customProgramCacheKey=()=>`av-outline`,Zd=e,e}var $d=new Map,ef=new Map,tf=new Map;function nf(e,t){ef.set(e,t)}function rf(e){let t=tf.get(e);if(t)return t;let n=ef.get(e.split(`|`)[0]);return n?(t=n(e),tf.set(e,t),t):null}function af(e,t=0){let n=e+`|`+t,r=$d.get(n);if(r)return r;let i=e.split(`:`),a=i[0];if(a===`toon`)r=Gd({color:new W(zd(i[1],t))}),i[2]===`d`&&(r.side=2);else if(a===`gold`)r=new ts({matcap:qd(zd(i[1],t))}),i[2]===`d`&&(r.side=2);else if(a===`basic`)r=new Si({color:new W(zd(i[1],t))});else if(a===`glass`)r=new Si({color:new W(zd(i[1],t)),transparent:!0,opacity:Number(i[2]??.3),depthWrite:!1,side:2});else if(a===`glow`)r=new Si({color:new W(zd(i[1],t)),transparent:!0,opacity:Number(i[2]??.8),blending:2,depthWrite:!1,side:2});else if(a===`rainbow`)r=Xd(1-t*.24);else if(a===`tex`||a===`texgold`){let e=rf(i[1]);a===`tex`?(r=Gd({map:e,color:new W(zd(`#ffffff`,t))}),i[2]===`d`&&(r.side=2)):r=new ts({map:e,matcap:qd(zd(i[2],t))})}else r=a===`texglow`?new Si({map:rf(i[1]),transparent:!0,opacity:Number(i[2]??.8),blending:2,depthWrite:!1,side:2}):Gd({color:new W(`#ff00ff`)});return r.name=n,$d.set(n,r),r}var of={glow:0,sparkle:1,heart:2,snow:3,flame:4,bill:5,coin:6,tear:7,dust:8,star:9,ring:10,note:11,anger:12,sweat:13,question:14,bang:15},sf=null;function cf(){if(sf)return sf;let e=document.createElement(`canvas`);e.width=e.height=512;let t=e.getContext(`2d`),n=(e,n)=>{t.save(),t.translate(e%4*128,Math.floor(e/4)*128),t.beginPath(),t.rect(2,2,124,124),t.clip(),n(t,128),t.restore()},r=(e,t,n,r,i,a,o=-Math.PI/2)=>{e.beginPath();for(let s=0;s<r*2;s++){let c=s%2?a:i,l=o+s*Math.PI/r;e.lineTo(t+Math.cos(l)*c,n+Math.sin(l)*c)}e.closePath()},i=(e,t,n,r)=>{e.beginPath(),e.moveTo(t,n+r*.9),e.bezierCurveTo(t-r*1.25,n+r*.05,t-r*.95,n-r*.95,t,n-r*.35),e.bezierCurveTo(t+r*.95,n-r*.95,t+r*1.25,n+r*.05,t,n+r*.9),e.closePath()};return n(0,(e,t)=>{let n=e.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2-4);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.25,`rgba(255,255,255,0.75)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(0,0,t,t)}),n(1,(e,t)=>{let n=e.createRadialGradient(t/2,t/2,0,t/2,t/2,t*.3);n.addColorStop(0,`rgba(255,255,255,0.9)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(0,0,t,t),e.fillStyle=`#fff`,r(e,t/2,t/2,4,t*.46,t*.075,-Math.PI/2),e.fill()}),n(2,(e,t)=>{i(e,t/2,t/2+4,t*.36);let n=e.createLinearGradient(0,t*.2,0,t*.9);n.addColorStop(0,`#ff8fc0`),n.addColorStop(1,`#e8265e`),e.fillStyle=n,e.fill(),e.lineWidth=5,e.strokeStyle=`#ffffff`,e.stroke(),e.fillStyle=`rgba(255,255,255,0.85)`,e.beginPath(),e.ellipse(t*.36,t*.4,t*.07,t*.045,-.7,0,Math.PI*2),e.fill()}),n(3,(e,t)=>{e.translate(t/2,t/2),e.strokeStyle=`#ffffff`,e.lineCap=`round`,e.shadowColor=`rgba(150,200,255,0.9)`,e.shadowBlur=6;for(let n=0;n<6;n++)e.save(),e.rotate(n*Math.PI/3),e.lineWidth=7,e.beginPath(),e.moveTo(0,0),e.lineTo(0,-t*.4),e.stroke(),e.lineWidth=5,e.beginPath(),e.moveTo(0,-t*.22),e.lineTo(-t*.1,-t*.31),e.moveTo(0,-t*.22),e.lineTo(t*.1,-t*.31),e.stroke(),e.restore()}),n(4,(e,t)=>{e.translate(t/2,t/2);let n=e.createRadialGradient(0,t*.12,0,0,t*.05,t*.42);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.45,`rgba(255,255,255,0.8)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.beginPath(),e.moveTo(0,-t*.46),e.bezierCurveTo(t*.12,-t*.2,t*.34,-t*.02,t*.3,t*.18),e.bezierCurveTo(t*.26,t*.4,-t*.26,t*.4,-t*.3,t*.18),e.bezierCurveTo(-t*.34,-t*.02,-t*.12,-t*.2,0,-t*.46),e.fill()}),n(5,(e,t)=>{e.translate(t/2,t/2),e.fillStyle=`#2f9e57`,e.strokeStyle=`#d9f7c8`,e.lineWidth=4;let n=t*.86,r=t*.46;e.beginPath(),e.roundRect(-n/2,-r/2,n,r,6),e.fill(),e.stroke(),e.strokeStyle=`#1d6e3a`,e.lineWidth=3,e.strokeRect(-n/2+9,-r/2+8,n-18,r-16),e.fillStyle=`#c9f0b4`,e.beginPath(),e.arc(0,0,r*.32,0,Math.PI*2),e.fill(),e.fillStyle=`#1d6e3a`,e.font=`bold 34px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`$`,0,2)}),n(6,(e,t)=>{e.translate(t/2,t/2);let n=e.createRadialGradient(-t*.1,-t*.12,2,0,0,t*.4);n.addColorStop(0,`#fff6b8`),n.addColorStop(.5,`#ffcc33`),n.addColorStop(1,`#b07800`),e.fillStyle=n,e.beginPath(),e.arc(0,0,t*.38,0,Math.PI*2),e.fill(),e.strokeStyle=`#8a5a00`,e.lineWidth=4,e.beginPath(),e.arc(0,0,t*.29,0,Math.PI*2),e.stroke(),e.fillStyle=`#8a5a00`,e.font=`bold 44px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`$`,0,3)}),n(7,(e,t)=>{e.translate(t/2,t/2),e.beginPath(),e.moveTo(0,-t*.4),e.bezierCurveTo(t*.12,-t*.16,t*.27,0,t*.27,t*.13),e.arc(0,t*.13,t*.27,0,Math.PI),e.bezierCurveTo(-t*.27,0,-t*.12,-t*.16,0,-t*.4);let n=e.createLinearGradient(0,-t*.4,0,t*.4);n.addColorStop(0,`#c9f0ff`),n.addColorStop(1,`#3fa6ff`),e.fillStyle=n,e.fill(),e.lineWidth=4,e.strokeStyle=`#ffffff`,e.stroke(),e.fillStyle=`rgba(255,255,255,0.9)`,e.beginPath(),e.ellipse(-t*.09,t*.1,t*.05,t*.08,.3,0,Math.PI*2),e.fill()}),n(8,(e,t)=>{let n=(t,n,r)=>{let i=e.createRadialGradient(t,n,0,t,n,r);i.addColorStop(0,`rgba(255,255,255,0.95)`),i.addColorStop(.6,`rgba(255,255,255,0.6)`),i.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=i,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()};n(t*.5,t*.55,t*.32),n(t*.32,t*.45,t*.22),n(t*.68,t*.44,t*.24),n(t*.5,t*.33,t*.2)}),n(9,(e,t)=>{let n=e.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);n.addColorStop(0,`rgba(255,255,255,0.7)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(0,0,t,t),e.fillStyle=`#ffffff`,r(e,t/2,t/2+3,5,t*.36,t*.16),e.fill()}),n(10,(e,t)=>{e.strokeStyle=`rgba(255,255,255,1)`,e.shadowColor=`#ffffff`,e.shadowBlur=10,e.lineWidth=8,e.beginPath(),e.arc(t/2,t/2,t*.38,0,Math.PI*2),e.stroke()}),n(11,(e,t)=>{e.translate(t/2,t/2),e.fillStyle=`#ffffff`,e.strokeStyle=`#ffffff`,e.lineWidth=9,e.lineCap=`round`,e.beginPath(),e.ellipse(-t*.18,t*.24,t*.14,t*.1,-.4,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(t*.2,t*.16,t*.14,t*.1,-.4,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(-t*.06,t*.22),e.lineTo(-t*.06,-t*.34),e.lineTo(t*.32,-t*.42),e.lineTo(t*.32,t*.14),e.stroke()}),n(12,(e,t)=>{e.translate(t/2,t/2),e.strokeStyle=`#ff2d3d`,e.lineWidth=13,e.lineCap=`round`;for(let n=0;n<4;n++)e.save(),e.rotate(n*Math.PI/2+Math.PI/4),e.beginPath(),e.moveTo(t*.1,-t*.36),e.quadraticCurveTo(t*.1,-t*.1,t*.36,-t*.1),e.stroke(),e.restore()}),n(13,(e,t)=>{e.translate(t/2,t/2),e.beginPath(),e.moveTo(0,-t*.4),e.bezierCurveTo(t*.1,-t*.15,t*.26,0,t*.26,t*.14),e.arc(0,t*.14,t*.26,0,Math.PI),e.bezierCurveTo(-t*.26,0,-t*.1,-t*.15,0,-t*.4),e.fillStyle=`#9fdcff`,e.fill(),e.lineWidth=6,e.strokeStyle=`#2b7fd6`,e.stroke(),e.fillStyle=`#ffffff`,e.beginPath(),e.ellipse(-t*.08,t*.1,t*.05,t*.08,.3,0,Math.PI*2),e.fill()}),n(14,(e,t)=>{e.font=`bold 104px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.lineWidth=12,e.strokeStyle=`#3a2a60`,e.strokeText(`?`,t/2,t/2+6),e.fillStyle=`#ffe14d`,e.fillText(`?`,t/2,t/2+6)}),n(15,(e,t)=>{e.font=`bold 104px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.lineWidth=12,e.strokeStyle=`#5a1020`,e.strokeText(`!`,t/2,t/2+6),e.fillStyle=`#ff5a5a`,e.fillText(`!`,t/2,t/2+6)}),sf=new aa(e),sf.flipY=!1,sf.colorSpace=``,sf.generateMipmaps=!0,sf.minFilter=T,sf}var lf=`
attribute float aSize;
attribute vec4 aColor;
attribute float aSprite;
attribute float aRot;
uniform float uScale;
varying vec4 vColor;
varying float vSprite;
varying float vRot;
void main() {
  vColor = aColor;
  vSprite = aSprite;
  vRot = aRot;
  vec4 mv = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uScale * projectionMatrix[ 1 ][ 1 ] / max( 0.05, - mv.z );
}`,uf=`
uniform sampler2D uAtlas;
varying vec4 vColor;
varying float vSprite;
varying float vRot;
void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float c = cos( vRot ), s = sin( vRot );
  pc = vec2( c * pc.x - s * pc.y, s * pc.x + c * pc.y ) * 1.06 + 0.5;
  if ( pc.x < 0.0 || pc.x > 1.0 || pc.y < 0.0 || pc.y > 1.0 ) discard;
  float col = mod( vSprite, 4.0 );
  float row = floor( vSprite / 4.0 + 0.01 );
  vec4 tex = texture2D( uAtlas, ( vec2( col, row ) + pc ) * 0.25 );
  float a = tex.a * vColor.a;
  if ( a < 0.01 ) discard;
  gl_FragColor = vec4( tex.rgb * vColor.rgb, a );
}`,df={value:400},ff=new fn;function pf(e){e.getCurrentViewport(ff),ff.w>0&&(df.value=ff.w*.5)}var mf={};function hf(e){let t=e?`add`:`norm`;if(mf[t])return mf[t];let n=new Jo({uniforms:{uAtlas:{value:cf()},uScale:df},vertexShader:lf,fragmentShader:uf,transparent:!0,depthWrite:!1,blending:e?2:1});return mf[t]=n,n}var gf=class{constructor(e,t,n){this.cap=e,this.n=0,this.rng=n||Math.random;let r=new Gr;this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e),this.spr=new Float32Array(e),this.rot=new Float32Array(e),this.aPos=new jr(this.pos,3).setUsage(ct),this.aCol=new jr(this.col,4).setUsage(ct),this.aSize=new jr(this.size,1).setUsage(ct),this.aSpr=new jr(this.spr,1).setUsage(ct),this.aRot=new jr(this.rot,1).setUsage(ct),r.setAttribute(`position`,this.aPos),r.setAttribute(`aColor`,this.aCol),r.setAttribute(`aSize`,this.aSize),r.setAttribute(`aSprite`,this.aSpr),r.setAttribute(`aRot`,this.aRot),r.boundingSphere=new Lr(new V(0,1.1,0),2.4),r.setDrawRange(0,0),this.geometry=r,this.points=new na(r,hf(t)),this.points.onBeforeRender=pf,this.points.renderOrder=10,this.points.visible=!1,this.points.frustumCulled=!0,this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.base=new Float32Array(e*5),this.spin=new Float32Array(e),this.prm=new Float32Array(e*6),this.fade=new Float32Array(e*2)}setAdditive(e){this.points.material=hf(e)}clear(){this.n=0,this.geometry.setDrawRange(0,0),this.points.visible=!1}spawn(e,t,n,r,i,a,o,s=1,c=-1){if(this.n>=this.cap)return-1;let l=this.n++,u=this.rng,d=l*3;this.pos[d]=t,this.pos[d+1]=n,this.pos[d+2]=r,this.vel[d]=i,this.vel[d+1]=a,this.vel[d+2]=o,this.life[l]=0,this.maxLife[l]=e.life[0]+(e.life[1]-e.life[0])*u();let f=e.colors,p=f[c>=0?c%f.length:Math.floor(u()*f.length)],m=l*5;this.base[m]=p[0],this.base[m+1]=p[1],this.base[m+2]=p[2],this.base[m+3]=e.alpha??1,this.base[m+4]=(e.size[0]+(e.size[1]-e.size[0])*u())*s,this.spr[l]=e.sprite;let h=e.rot||_f;this.rot[l]=h[0]+(h[1]-h[0])*u();let g=e.spin||_f;this.spin[l]=(g[0]+(g[1]-g[0])*u())*(u()<.5&&e.spinSym?-1:1);let _=l*6;return this.prm[_]=e.grav||0,this.prm[_+1]=e.drag||0,this.prm[_+2]=e.sway||0,this.prm[_+3]=e.swayF||3,this.prm[_+4]=u()*6.283,this.prm[_+5]=e.curve||0,this.fade[l*2]=e.fadeIn??.1,this.fade[l*2+1]=e.fadeOut??.3,l}_kill(e){let t=--this.n;e!==t&&(vf(this.pos,3,e,t),vf(this.vel,3,e,t),vf(this.base,5,e,t),vf(this.prm,6,e,t),vf(this.fade,2,e,t),this.life[e]=this.life[t],this.maxLife[e]=this.maxLife[t],this.spr[e]=this.spr[t],this.rot[e]=this.rot[t],this.spin[e]=this.spin[t])}update(e){let t=0;for(;t<this.n;){let n=this.life[t]+=e,r=this.maxLife[t];if(n>=r){this._kill(t);continue}let i=t*3,a=t*6,o=this.prm[a],s=this.prm[a+1];if(this.vel[i+1]-=o*e,s){let t=Math.max(0,1-s*e);this.vel[i]*=t,this.vel[i+1]*=t,this.vel[i+2]*=t}let c=0,l=0,u=this.prm[a+2];if(u){let e=this.prm[a+4]+n*this.prm[a+3];c=Math.sin(e)*u,l=Math.cos(e*.8)*u*.6}this.pos[i]+=(this.vel[i]+c)*e,this.pos[i+1]+=this.vel[i+1]*e,this.pos[i+2]+=(this.vel[i+2]+l)*e,this.rot[t]+=this.spin[t]*e;let d=n/r,f=this.fade[t*2],p=this.fade[t*2+1],m=1;f>0&&n<f&&(m=n/f);let h=r-n;p>0&&h<p&&(m=Math.min(m,h/p));let g=t*5,_=this.base[g+4],v=this.prm[a+5];v===1?_*=.55+.45*Math.sin(n*9+this.prm[a+4]):v===2?_*=1-d*.85:v===3?_*=n<.15?.4+n/.15*.9-n/.15*.3*(n/.15):1:v===4?_*=.6+d*1.2:v===5&&(m*=.6+.4*Math.sin(n*22+this.prm[a+4]));let y=t*4;this.col[y]=this.base[g],this.col[y+1]=this.base[g+1],this.col[y+2]=this.base[g+2],this.col[y+3]=this.base[g+3]*m,this.size[t]=_,t++}let n=this.n;this.geometry.setDrawRange(0,n),this.points.visible=n>0,n>0&&(this.aPos.needsUpdate=!0,this.aCol.needsUpdate=!0,this.aSize.needsUpdate=!0,this.aSpr.needsUpdate=!0,this.aRot.needsUpdate=!0)}dispose(){this.geometry.dispose()}},_f=[0,0];function vf(e,t,n,r){for(let i=0;i<t;i++)e[n*t+i]=e[r*t+i]}var yf={white:[1,1,1],gold:[1,.86,.35],paleGold:[1,.95,.7],pink:[1,.55,.78],cyan:[.55,.95,1],orange:[1,.55,.15],yellow:[1,.9,.3],red:[1,.3,.2],ice:[.8,.92,1],dust:[.9,.86,.8]};function bf(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Gr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=xf(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=xf(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function xf(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new jr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Sf=.2,Cf=1.05,wf={hipsSeated:.52,hipsStanding:.47,spine:[0,.04,0],chest:[0,.3,0],neck:[0,.13,0],head:[0,.09,0],headCenter:[0,.2,0],shoulder:[.04,.12,0],upperArm:[.112,0,0],upperLen:.175,foreLen:.155,hipJoint:[.078,-.02,0],thighLen:.18,shinLen:.19},Tf={R:Sf*1.012,phi0:Math.PI/2-50*Math.PI/180,phiW:100*Math.PI/180,th0:46*Math.PI/180,thW:96*Math.PI/180,W:512,H:512},Ef=new U,Df=new qt,Of=new En,kf=new V,Af=new V,jf=new V(0,1,0);function q(e,t=[0,0,0],n=[0,0,0],r=[1,1,1],i=`XYZ`){return Of.set(n[0],n[1],n[2],i),Df.setFromEuler(Of),Ef.compose(kf.set(t[0],t[1],t[2]),Df,Af.set(r[0],r[1],r[2])),e.applyMatrix4(Ef),e}function Mf(e,t,n,r=[1,1,1]){let i=kf.set(t[0],t[1],t[2]).normalize();return Df.setFromUnitVectors(jf,i),Ef.compose(new V(n[0],n[1],n[2]),Df,Af.set(r[0],r[1],r[2])),e.applyMatrix4(Ef),e}function Nf(e){for(let t of Object.keys(e.attributes))t!==`position`&&t!==`normal`&&t!==`uv`&&e.deleteAttribute(t);return e.attributes.uv||e.setAttribute(`uv`,new G(new Float32Array(e.attributes.position.count*2),2)),e.attributes.normal||e.computeVertexNormals(),e}function Pf(e){if(e.length===1)return Nf(e[0]);let t=e.some(e=>!e.index);return bf(e.map(e=>Nf(t&&e.index?e.toNonIndexed():e)),!1)}function Ff(e){let t=e.map(e=>Pf(e)),n=t.some(e=>!e.index);return bf(t.map(e=>n&&e.index?e.toNonIndexed():e),!0)}function If(e,t=16,n=12){return new Lo(e,t,n)}function Lf(e,t=24,n=Math.PI){let r=new Mo(e.map(([e,t])=>new B(e,t)),t,n,Math.PI*2),i=1/0,a=-1/0;for(let[,t]of e)i=Math.min(i,t),a=Math.max(a,t);let o=r.attributes.position,s=r.attributes.uv;for(let e=0;e<o.count;e++)s.setY(e,(o.getY(e)-i)/(a-i||1));return r}function Rf(e,t,n,r=14,i=10){let a=new Ca(e.map(e=>new V(e[0],e[1],e[2]))),o=a.computeFrenetFrames(r,!1),s=[],c=[],l=[],u=[],d=new V,f=new V;for(let e=0;e<=r;e++){let u=e/r;a.getPointAt(u,d);let p=t+(n-t)*u**1.15,m=o.normals[e],h=o.binormals[e];for(let e=0;e<=i;e++){let t=e/i*Math.PI*2,n=Math.sin(t),r=-Math.cos(t);f.set(r*m.x+n*h.x,r*m.y+n*h.y,r*m.z+n*h.z).normalize(),s.push(d.x+f.x*p,d.y+f.y*p,d.z+f.z*p),c.push(f.x,f.y,f.z),l.push(e/i,u)}}for(let e=1;e<=r;e++)for(let t=1;t<=i;t++){let n=(i+1)*(e-1)+(t-1),r=(i+1)*e+(t-1),a=(i+1)*e+t,o=(i+1)*(e-1)+t;u.push(n,r,o,r,a,o)}let p=s.length/3;a.getPointAt(0,d);let m=o.tangents[0];s.push(d.x,d.y,d.z),c.push(-m.x,-m.y,-m.z),l.push(.5,0);for(let e=0;e<i;e++)u.push(p,e+1,e);let h=new Gr;return h.setAttribute(`position`,new G(s,3)),h.setAttribute(`normal`,new G(c,3)),h.setAttribute(`uv`,new G(l,2)),h.setIndex(u),h}function zf(e,t,n=5,r=Math.PI/2){let i=new Wa;for(let a=0;a<n*2;a++){let o=a%2?t:e,s=r+a*Math.PI/n;a===0?i.moveTo(Math.cos(s)*o,Math.sin(s)*o):i.lineTo(Math.cos(s)*o,Math.sin(s)*o)}return i.closePath(),i}var Bf=new Map;function Vf(e,t){let n=Bf.get(e);return n||(n=t(),Bf.set(e,n)),n}var Hf=[[0,-.08],[.08,-.076],[.126,-.058],[.152,-.025],[.163,.02],[.167,.08],[.165,.15],[.16,.22],[.153,.29],[.146,.34],[.138,.38],[.125,.415],[.104,.442],[.074,.46],[.04,.468],[0,.47]];function Uf(){return Vf(`body`,()=>{let e=q(Lf(Hf,30),[0,0,0],[0,0,0],[1,1,.8]),t=Ff([[q(If(1,14,10),[0,-.03,.034],[0,0,0],[.068,.048,.105])],[q(If(1,14,6),[0,-.064,.034],[0,0,0],[.071,.018,.108])]]);return{head:If(Sf,32,24),face:new Lo(Tf.R,26,22,Tf.phi0,Tf.phiW,Tf.th0,Tf.thW),ear:q(If(.046,14,10),[0,0,0],[0,0,0],[.55,1,.82]),neck:q(new fa(.056,.062,.1,16,1,!0),[0,.02,0]),torso:e,pelvis:q(If(1,18,10),[0,-.01,-.005],[0,0,0],[.155,.095,.128]),upperArm:q(new ua(.049,wf.upperLen,6,14),[0,-wf.upperLen/2,0]),sleeveShort:q(new ua(.06,.065,6,16),[0,-.028,0]),foreArm:q(new ua(.043,.14,6,12),[0,-.07,0]),sleeveLong:q(new ua(.048,.12,6,12),[0,-.062,0]),palm:If(.05,14,10),digit:q(new ua(.0165,.024,4,8),[0,.018,0]),finger:q(new ua(.0145,.032,4,8),[0,.022,0]),handOpen:Wf(),thigh:q(new ua(.064,wf.thighLen,6,12),[0,-wf.thighLen/2,0]),shin:q(new ua(.055,wf.shinLen-.02,6,12),[0,-wf.shinLen/2,0]),shoe:t}})}function Wf(){let e=[q(If(1,18,14),[0,-.04,0],[0,0,0],[.027,.042,.047])],t=[-.03,-.011,.008,.027],n=[.022,.03,.032,.028];for(let r=0;r<4;r++){let i=n[r],a=q(new ua(.0118,i,4,8),[0,-i/2,0]);q(a,[0,-.07,t[r]],[t[r]/.03*-.16,0,0]),e.push(q(a,[0,0,0],[0,0,0],[.95,1,1]))}return Pf(e)}var Gf={rest:{palm:[0,-.04,.003],ps:[.74,1,.92],th:[-.012,-.026,.032],tr:[2,0,.3],ts:1,fi:null},fist:{palm:[0,-.038,0],ps:[.95,.86,.95],th:[-.022,-.036,.034],tr:[2.5,0,.6],ts:.9,fi:null},thumb:{palm:[0,-.038,0],ps:[.95,.86,.95],th:[0,-.02,.034],tr:[1.57,0,0],ts:1.3,fi:null},point:{palm:[0,-.038,0],ps:[.95,.86,.95],th:[-.022,-.036,.034],tr:[2.5,0,.6],ts:.9,fi:[0,-.072,.02],fr:[Math.PI,0,0]},open:{palm:[0,-.046,.003],ps:[.58,1.12,1.04],th:[-.005,-.024,.042],tr:[1.25,0,.1],ts:1.1,fi:null},claw:{palm:[0,-.042,.005],ps:[.72,1.02,1],th:[-.014,-.026,.04],tr:[1.6,0,.35],ts:1,fi:null}};function Kf(e,t,n,r=[1.03,1,1.04],i=0){return q(new Lo(e,30,18,0,Math.PI*2,0,t),[0,i,-.004],[n,0,0],r)}function qf(e,t,n,r,i=[1,1,1],a=9){return Mf(q(new pa(e,t,a,1),[0,t/2,0]),n,r,i)}function Jf(e,t,n,r,i,a={}){let o=a.seg??10,s=a.radSeg??8,c=a.r0??.212,l=a.lift??.016,u=a.thick??.5,d=[],f=[],p=[],m=[],h=new V,g=new V,_=new V,v=new V,y=new V,b=new V,x=(i,a)=>{let o=n+(r-n)*i,s=e+(t-e)*i,u=c+l*i*i;return a.set(u*Math.sin(o)*Math.sin(s),u*Math.cos(o),u*Math.sin(o)*Math.cos(s))};for(let e=0;e<=o;e++){let t=e/o;x(t,h),x(Math.min(1,t+.02),g),t>=.999?(x(t-.02,g),_.subVectors(h,g)):_.subVectors(g,h),_.normalize(),v.copy(h).normalize(),y.crossVectors(_,v).normalize(),v.crossVectors(y,_).normalize();let n=i*(1-t)**.9*(.75+.5*Math.sin(Math.min(1,t*1.6)*Math.PI*.5));for(let e=0;e<=s;e++){let r=e/s*Math.PI*2,i=Math.cos(r),a=Math.sin(r);b.copy(h).addScaledVector(y,i*n).addScaledVector(v,a*n*u),d.push(b.x,b.y,b.z),b.copy(y).multiplyScalar(i*u).addScaledVector(v,a).normalize(),f.push(b.x,b.y,b.z),p.push(e/s,t)}}for(let e=1;e<=o;e++)for(let t=1;t<=s;t++){let n=(s+1)*(e-1)+(t-1),r=(s+1)*e+(t-1),i=(s+1)*e+t,a=(s+1)*(e-1)+t;m.push(n,r,a,r,i,a)}let S=new Gr;return S.setAttribute(`position`,new G(d,3)),S.setAttribute(`normal`,new G(f,3)),S.setAttribute(`uv`,new G(p,2)),S.setIndex(m),S}function Yf(e,t,n,r,i,a={}){let o=[],s=a.fan??.25,c=a.sweep??0;for(let l=0;l<e;l++){let u=e===1?0:l/(e-1)*2-1,d=u*t+c*.3,f=d*(1+s)+c,p=1-.18*Math.abs(u)+(a.jag?l%2?-.06:.05:0);o.push(Jf(d,f,n,n+(r-n)*p,i,a))}return o}function Xf(e=1.95,t=.05){let n=[];for(let r of[1,-1])n.push(Jf(r*1.05,r*1.12,.95,e,t,{lift:.02,thick:.5})),n.push(Jf(r*1.35,r*1.42,1,e-.08,t*.9,{lift:.018,thick:.5}));return n}function Zf(){return Rf([[0,.205,.02],[.012,.27,.035],[.04,.3,.075],[.06,.285,.1]],.016,.002,12,8)}var Qf={none:.2,short:.3,spiky:.31,long:.226,bun:.29,slick:.25,mohawk:.33,afro:.37,twin:.226};function $f(e,t){return Vf(`hair|${e}|${+!!t}`,()=>{let n=[],r=[],i=null;switch(e){case`short`:r.push(Kf(.218,1.66,-.6,[1.04,1.02,1.05])),r.push(...Yf(7,.62,t?1:.62,1.42,.06,{jag:!0})),r.push(...Xf(1.9,.05)),t||(r.push(q(If(.09,16,12),[0,.17,-.03],[.3,0,0],[1.35,.6,1.3])),r.push(Zf()));break;case`spiky`:if(r.push(Kf(.214,1.74,-.38)),r.push(...Xf(1.8,.048)),r.push(...Yf(5,.55,t?1:.7,1.38,.068,{fan:.6,lift:.045,jag:!0})),t)for(let e of[[.75,.2,-.4],[-.75,.2,-.4],[0,.1,-1]])r.push(qf(.05,.09,e,[e[0]*.17,e[1]*.17-.03,e[2]*.17],[1,1,1]));else for(let e of[[0,1,-.1],[.42,.88,-.12],[-.42,.88,-.12],[.2,.85,.45],[-.2,.85,.45],[.72,.5,-.3],[-.72,.5,-.3],[.32,.55,-.78],[-.32,.55,-.78],[0,.45,-.9],[0,.8,.5],[.55,.75,.25],[-.55,.75,.25]]){let t=Math.hypot(e[0],e[1],e[2]),n=[e[0]/t*.17,e[1]/t*.17,e[2]/t*.17];r.push(qf(.064,.16,[e[0],e[1]+.25,e[2]-.15],n,[1,1,.75]))}break;case`long`:r.push(Kf(.219,1.7,-.56,[1.05,1.02,1.05])),r.push(...Yf(7,.62,t?1:.62,1.45,.058,{jag:!0})),r.push(q(new ua(.155,.22,8,18),[0,-.17,-.08],[.1,0,0],[1.38,1,.62]));for(let e of[1,-1])r.push(Rf([[e*.17,.08,.06],[e*.2,-.05,.075],[e*.2,-.18,.07],[e*.185,-.3,.05]],.05,.016,14,10));t||r.push(q(If(.09,16,12),[0,.17,-.03],[.3,0,0],[1.4,.6,1.3]));break;case`bun`:r.push(Kf(.215,1.7,-.66)),r.push(...Yf(5,.5,t?1:.65,1.36,.062,{sweep:.45,fan:.1})),r.push(...Xf(1.95,.042)),t||(r.push(q(If(.092,18,14),[0,.19,-.11])),i={geo:q(new Ro(.06,.017,8,20),[0,.135,-.088],[1,0,0]),mat:`toon:#ff6fae`});break;case`slick`:r.push(Kf(.215,1.7,-.27)),r.push(...Xf(1.7,.04)),t||(r.push(q(If(.1,20,14),[0,.158,.03],[-.42,0,0],[1.45,.58,1.78])),r.push(q(If(.08,16,12),[0,.135,.12],[-.2,0,0],[1.32,.64,.92])),r.push(Jf(.15,.5,.55,1.2,.045,{r0:.222,lift:.03})));break;case`mohawk`:if(n.push({geo:Kf(.204,1.75,-.4,[1.02,1,1.03]),mat:`hairShaved`}),!t){let e=[.95,.6,.25,-.1,-.45,-.8,-1.15];e.forEach((t,n)=>{let i=[0,Math.cos(t),Math.sin(t)],a=.15+Math.sin(n/(e.length-1)*Math.PI)*.06;r.push(qf(.068,a,[0,i[1]+.15,i[2]-.25],[0,i[1]*.17,i[2]*.17],[.45,1,1]))})}break;case`afro`:{let e=[0,.115,-.07];r.push(q(If(.258,28,20),e));let t=[];for(let n=0;n<30;n++){let r=1-n/29*2,i=Math.sqrt(1-r*r),a=n*2.39996,o=[Math.cos(a)*i,r,Math.sin(a)*i];o[2]>.35&&o[1]<.45||o[1]<-.55||t.push(q(If(.088,12,9),[e[0]+o[0]*.235,e[1]+o[1]*.235,e[2]+o[2]*.235]))}r.push(...t),r.push(...Yf(6,.55,.8,1.2,.06,{r0:.214,lift:.03}));break}case`twin`:{r.push(Kf(.218,1.66,-.6,[1.04,1.02,1.05])),r.push(...Yf(7,.62,t?1:.62,1.42,.06,{jag:!0})),r.push(...Xf(2,.05));let e=[];for(let t of[1,-1])e.push(Rf([[t*.15,.12,-.07],[t*.25,.11,-.08],[t*.315,-.02,-.07],[t*.31,-.19,-.05],[t*.26,-.34,-.02]],.068,.012,18,12));r.push(...e),i={geo:Pf([q(If(.032,12,10),[.172,.125,-.075],[0,0,0],[.8,1.1,1.1]),q(If(.032,12,10),[-.172,.125,-.075],[0,0,0],[.8,1.1,1.1])]),mat:`toon:#ff5fa2`};break}}return r.length&&n.unshift({geo:Pf(r),mat:`hair`}),i&&n.push(i),n})}var ep={none:{cover:!1,top:0},cap:{cover:!0,top:.255},beanie:{cover:!0,top:.3},visor:{cover:!1,top:.2},headphones:{cover:!1,top:.245},cowboy:{cover:!0,top:.33},tophat:{cover:!0,top:.45},horns:{cover:!1,top:.36},halo:{cover:!1,top:.37},crown:{cover:!1,top:.33}};function tp(e){return Vf(`hat|${e}`,()=>{switch(e){case`cap`:{let e=Kf(.224,1.3,-.22,[1.02,1,1.05],.004),t=q(If(.018,10,8),[0,.218,-.04]),n=q(new fa(.15,.15,.012,28,1,!1,-Math.PI/2,Math.PI),[0,.095,.155],[.2,0,0],[1.02,1,1.12]),r=q(new da(.04,24),[0,.15,.178],[-.55,0,0]);return[{geo:Ff([[e,t],[n]]),mat:[`toon:#e0343f`,`toon:#b31f2b`],outline:!1},{geo:r,mat:`tex:caplogo`}]}case`beanie`:{new Wn;let e=Kf(.229,1.42,-.18,[1.02,1.04,1.04],0),t=q(new fa(.234,.238,.065,30,1,!0),[0,.035,-.006],[-.18,0,0],[1.02,1,1.04]),n=q(If(.056,14,12),[0,.268,-.05]);return[{geo:Ff([[e],[t]]),mat:[`tex:knit|#e8b33a`,`tex:knit|#d39a22:d`],outline:!1},{geo:n,mat:`toon:#fff4dc`}]}case`visor`:{let e=q(new fa(.222,.222,.042,30,1,!0),[0,.085,0],[-.12,0,0]),t=q(new fa(.165,.165,.007,28,1,!1,-Math.PI/2,Math.PI),[0,.098,.17],[.32,0,0],[1.02,1,1.05]);return[{geo:e,mat:`toon:#14382a:d`},{geo:t,mat:`glass:#28c46e:0.6`}]}case`headphones`:{let e=q(new Ro(.236,.021,8,36,Math.PI),[0,0,-.012],[0,0,0],[1,1.06,1]),t=[],n=[],r=[];for(let e of[1,-1])t.push(q(new fa(.066,.066,.052,22),[e*.218,-.01,0],[0,0,Math.PI/2])),n.push(q(new Ro(.048,.017,8,20),[e*.192,-.01,0],[0,Math.PI/2,0])),r.push(q(new Ro(.046,.008,6,24),[e*.245,-.01,0],[0,Math.PI/2,0]));return[{geo:Pf([e,...t]),mat:`toon:#f2f2f7`,outline:!0},{geo:Pf(n),mat:`toon:#3a3a4a`},{geo:Pf(r),mat:`basic:#ff4fd8`}]}case`cowboy`:{let e=Lf([[0,.155],[.06,.16],[.105,.165],[.128,.145],[.137,.08],[.142,0],[.13,-.002]],30);{let t=e.attributes.position;for(let e=0;e<t.count;e++){let n=t.getX(e),r=t.getY(e);r>.1&&t.setY(e,r-.03*Math.exp(-((n/.05)**2))*((r-.1)/.065))}e.computeVertexNormals()}q(e,[0,0,0],[0,0,0],[1,1,1.12]);let t=Lf([[.12,.008],[.22,.004],[.29,.018],[.318,.04],[.312,.046],[.285,.026],[.22,.012],[.12,.016]],40);{let e=t.attributes.position;for(let t=0;t<e.count;t++){let n=e.getX(t);e.setY(t,e.getY(t)+.075*(n/.31)**2)}t.computeVertexNormals()}q(t,[0,0,0],[0,0,0],[1,1,1.15]);let n=q(new fa(.143,.145,.03,30,1,!0),[0,.02,0],[0,0,0],[1,1,1.12]),r=q(new la(.03,.026,.008),[0,.02,.163]),i=[0,.125,-.012],a=[-.16,0,0];return[{geo:q(Ff([[e,t],[n]]),i,a),mat:[`toon:#9a6332`,`toon:#4a2c17:d`],outline:!0},{geo:q(r,i,a),mat:`gold:#ffcf40`}]}case`tophat`:{let e=new fa(.128,.118,.23,30,1,!1);q(e,[0,.125,0]);let t=Lf([[.11,.004],[.19,.002],[.212,.014],[.208,.02],[.185,.012],[.11,.014]],36);{let e=t.attributes.position;for(let t=0;t<e.count;t++)e.setY(t,e.getY(t)+.03*(e.getX(t)/.21)**2);t.computeVertexNormals()}let n=q(new fa(.1205,.1195,.042,30,1,!0),[0,.032,0]);return[{geo:q(Ff([[e,t],[n]]),[.01,.135,-.015],[-.1,0,-.12]),mat:[`toon:#22222b`,`toon:#c8243a:d`],outline:!0}]}case`horns`:{let e=[];for(let t of[1,-1])e.push(Rf([[t*.09,.15,.04],[t*.15,.22,.03],[t*.18,.3,0],[t*.15,.36,-.03]],.042,.004,14,10));return[{geo:Pf(e),mat:`toon:#e02a43`,outline:!0}]}case`halo`:{let e=q(new Ro(.13,.017,10,44),[0,0,0],[Math.PI/2,0,0]),t=q(new Ro(.13,.04,10,44),[0,0,0],[Math.PI/2,0,0]);return[{geo:e,mat:`basic:#fff1a8`,tag:`halo`,pos:[0,.32,-.02]},{geo:t,mat:`glow:#ffd75e:0.35`,tag:`halo`,pos:[0,.32,-.02]}]}case`crown`:{let e=Lf([[.118,-.034],[.128,.036],[.121,.036],[.111,-.034],[.118,-.034]],32),t=[],n=[],r=[];for(let e=0;e<6;e++){let r=e/6*Math.PI*2+Math.PI/6,i=Math.sin(r)*.124,a=Math.cos(r)*.124;t.push(qf(.03,.085,[i*.9,1,a*.9],[i,.03,a],[1,1,.55],4)),n.push(q(If(.016,10,8),[i*1.3,.118,a*1.3]))}r.push(q(If(.019,12,10),[0,0,.128],[0,0,0],[1,1,.6]));for(let e of[1,-1]){let t=e*.75;r.push(q(If(.014,10,8),[Math.sin(t)*.126,0,Math.cos(t)*.126],[0,0,0],[1,1,.6]))}let i=[0,.215,-.03],a=[-.12,0,.1];return[{geo:q(Pf([e,...t,...n]),i,a),mat:`gold:#ffcf40`,tag:`crown`},{geo:q(Pf(r),i,a),mat:`toon:#e8203c`}]}default:return[]}})}function np(e){return Vf(`gl|${e}`,()=>{let t=.068,n=-.026;switch(e){case`round`:{let e=[],r=[];for(let i of[1,-1])e.push(q(new Ro(.041,.0058,6,24),[i*t,n,.198],[0,i*.3,0])),r.push(q(new da(.039,28),[i*t,n,.196],[0,i*.3,0])),e.push(q(new fa(.004,.004,.17,6),[i*.178,-.016,.1],[Math.PI/2,0,-i*.1],[1,1,1],`ZXY`));return e.push(q(new Ro(.018,.005,6,12,Math.PI),[0,-.022,.21000000000000002],[0,0,0])),[{geo:Pf(e),mat:`toon:#5a3420`},{geo:Pf(r),mat:`glass:#bfe6ff:0.28`}]}case`sun`:{let e=[],n=[];for(let r of[1,-1])e.push(q(If(.052,16,10),[r*t,-.024,.194],[0,r*.3,r*-.08],[1,.72,.3])),n.push(q(new fa(.0045,.0045,.17,6),[r*.18,-.008,.1],[Math.PI/2,0,-r*.12],[1,1,1],`ZXY`));return n.push(q(new fa(.006,.006,.07,8),[0,-.0019999999999999983,.21000000000000002],[0,0,Math.PI/2])),[{geo:Pf(e),mat:`tex:shades|#000`},{geo:Pf(n),mat:`toon:#1a1a20`}]}case`star`:{let e=zf(.058,.03);e.holes.push(new Ua(zf(.045,.021).getPoints().reverse()));let n=[],r=[];for(let i of[1,-1])n.push(q(new ko(e,{depth:.008,bevelEnabled:!1}),[i*t,-.022,.194],[0,i*.3,0])),r.push(q(new Fo(zf(.046,.022)),[i*t,-.022,.196],[0,i*.3,0])),n.push(q(new fa(.0042,.0042,.16,6),[i*.18,-.013999999999999999,.1],[Math.PI/2,0,-i*.1],[1,1,1],`ZXY`));return n.push(q(new fa(.005,.005,.04,8),[0,-.009999999999999998,.20800000000000002],[0,0,Math.PI/2])),[{geo:Pf(n),mat:`toon:#ff3fa4`},{geo:Pf(r),mat:`glass:#ffe36b:0.45`}]}case`cyber`:{let e=new fa(.226,.226,.062,36,1,!0,-1.2,2.4);q(e,[0,-.022,0],[0,0,0],[1,1,1]);let t=[q(new fa(.229,.229,.01,36,1,!0,-1.25,2.5),[0,.011,0]),q(new fa(.229,.229,.01,36,1,!0,-1.25,2.5),[0,-.055,0])];for(let e of[1,-1])t.push(q(new la(.03,.07,.07),[e*.205,-.022,.035],[0,e*.35,0]));return[{geo:e,mat:`texglow:cyber:0.9`,tag:`cyber`},{geo:Pf(t),mat:`toon:#2c3140:d`}]}default:return[]}})}function rp(e){return Vf(`nk|${e}`,()=>{switch(e){case`bowtie`:return[{geo:ip(),mat:`toon:#d8293f`,pos:[0,.15,.09]}];case`scarf`:return[{geo:Pf([q(new Ro(.084,.036,12,28),[0,.158,-.004],[Math.PI/2+.16,0,0],[1.08,.92,1]),q(new ua(.032,.12,4,10),[.05,.075,.118],[.16,0,.18],[1.15,1,.42]),q(new ua(.03,.085,4,10),[.085,.092,.106],[.1,0,.5],[1.1,1,.4])]),mat:`tex:scarf|#d33a44`,outline:!0}];case`chain`:return[{geo:Pf([new zo(new Ca([[0,.18,-.055],[.07,.174,-.03],[.1,.152,.03],[.078,.11,.1],[.032,.08,.125],[0,.075,.128],[-.032,.08,.125],[-.078,.11,.1],[-.1,.152,.03],[-.07,.174,-.03]].map(e=>new V(e[0],e[1],e[2])),!0),72,.0068,6,!0),q(new fa(.028,.028,.008,22),[0,.046,.134],[Math.PI/2-.3,0,0]),q(new Ro(.009,.0035,6,10),[0,.074,.131],[0,0,0])]),mat:`gold:#ffcf40`}];case`medal`:{let e=[];for(let t of[1,-1])e.push(q(new la(.026,.11,.005),[t*.03,.11,.112],[-.32,0,t*.42]));let t=q(new fa(.034,.034,.009,24),[0,.048,.13],[Math.PI/2-.3,0,0]),n=q(new ko(zf(.02,.009),{depth:.004,bevelEnabled:!1}),[0,.05,.133],[-.3,0,0]);return[{geo:Pf(e),mat:`tex:ribbon|#2557c9`},{geo:Pf([t,n]),mat:`gold:#ffcf40`}]}default:return[]}})}function ip(){return Vf(`bowtie`,()=>{let e=[];for(let t of[1,-1])e.push(q(new pa(.03,.05,14),[t*.026,0,0],[0,0,t*Math.PI/2],[1,1,.45]));return e.push(q(If(.012,10,8),[0,0,.004],[0,0,0],[1,1,.7])),Pf(e)})}var ap={tee:{short:!0},hoodie:{short:!1},jersey:{short:!0},hawaii:{short:!0},suit:{short:!1},leather:{short:!1},tux:{short:!1}};function op(e){return Vf(`top|${e}`,()=>{let t=.162;switch(e){case`tee`:return[{geo:q(new Ro(.063,.0125,8,28),[0,t,.004],[Math.PI/2+.2,0,0],[1,1.1,1]),mat:`topDark`}];case`hoodie`:{let e=q(new Ro(.085,.038,10,22,Math.PI*1.25),[0,.158,-.012],[Math.PI/2+.25,0,-Math.PI*.125+Math.PI],[1.12,1.12,.9]),t=q(If(1,16,12),[0,.157,-.085],[-.3,0,0],[.115,.08,.058]),n=[];for(let e of[1,-1])n.push(q(new ua(.0062,.075,3,6),[e*.03,.08700000000000001,.098],[.2,0,0]));return[{geo:Pf([e,t]),mat:`topDark`,outline:!0},{geo:Pf(n),mat:`toon:#f4f4f4`}]}case`jersey`:return[{geo:q(new Ro(.063,.0115,8,28),[0,t,.004],[Math.PI/2+.2,0,0],[1,1.1,1]),mat:`toon:#f4f4f4`}];case`hawaii`:{let e=[];for(let t of[1,-1])e.push(q(new la(.062,.008,.046),[t*.048,.156,.062],[.55,t*-.5,t*-.4]));return[{geo:Pf(e),mat:`top`}]}case`suit`:{let e=[];for(let n of[1,-1])e.push(q(new la(.036,.006,.03),[n*.024,t,.06],[.7,n*-.6,n*-.2]));return[{geo:Pf(e),mat:`toon:#f6f6f6`}]}case`leather`:{let e=[];for(let t of[1,-1])e.push(q(new la(.078,.01,.066),[t*.058,.15,.055],[.8,t*-.55,t*-.45]));return e.push(q(new fa(.074,.08,.048,20,1,!0,Math.PI*.6,Math.PI*.8),[0,.17400000000000002,0])),[{geo:Pf(e),mat:`topDark:d`,outline:!1}]}case`tux`:{let e=[];for(let t of[1,-1])e.push(q(new la(.032,.006,.026),[t*.022,.164,.06],[.7,t*-.6,t*-.2]));return[{geo:Pf(e),mat:`toon:#f6f6f6`},{geo:ip(),mat:`toon:#15151a`,pos:[0,.15,.09],tag:`tuxbow`}]}default:return[]}})}function sp(){return Vf(`props`,()=>{let e=new fa(.024,.024,.0065,22,1,!1),t=[];for(let e=0;e<5;e++)t.push(q(new la(.085,.003,.04),[0,e*.0035,0],[0,(e-2)*.12,0]));return{chip:e,bills:Pf(t)}})}function cp(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function lp(e,t={}){let n=new aa(e);return n.colorSpace=nt,n.anisotropy=4,t.repeat&&(n.wrapS=n.wrapT=_),n}function up(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}nf(`top`,e=>{let[,t,n]=e.split(`|`),r=cp(512,256),i=r.getContext(`2d`),a=Id(n,-.3),o=Id(n,-.5),s=Id(n,.25),c=Rd(n)>.45;i.fillStyle=n,i.fillRect(0,0,512,256);let l=i.createLinearGradient(0,179.2,0,256);if(l.addColorStop(0,`rgba(0,0,0,0)`),l.addColorStop(1,`rgba(0,0,0,0.12)`),i.fillStyle=l,i.fillRect(0,0,512,256),t===`tee`)i.fillStyle=a,i.fillRect(0,244,512,12),i.save(),i.translate(256,104),i.fillStyle=c?Id(n,-.45):`rgba(255,255,255,0.88)`,i.beginPath(),i.arc(0,0,30,0,Math.PI*2),i.lineWidth=5,i.strokeStyle=i.fillStyle,i.stroke(),fp(i,0,-1,17),i.restore();else if(t===`hoodie`){i.fillStyle=a,i.beginPath(),i.roundRect(194,150,124,70,18),i.fill(),i.setLineDash([6,6]),i.strokeStyle=s,i.lineWidth=3,i.beginPath(),i.roundRect(200,156,112,58,14),i.stroke(),i.setLineDash([]),i.fillStyle=o,i.fillRect(0,234,512,22),i.strokeStyle=`rgba(0,0,0,0.18)`,i.lineWidth=2;for(let e=0;e<512;e+=8)i.beginPath(),i.moveTo(e,234),i.lineTo(e,256),i.stroke()}else if(t===`jersey`)i.fillStyle=`#f4f4f4`,i.fillRect(118,0,20,256),i.fillRect(374,0,20,256),i.fillStyle=a,i.fillRect(124,0,8,256),i.fillRect(380,0,8,256),i.strokeStyle=`#f4f4f4`,i.lineWidth=10,i.beginPath(),i.moveTo(222,0),i.lineTo(256,42),i.lineTo(290,0),i.stroke(),i.font=`bold 92px "Arial Black", Arial, sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.lineWidth=9,i.strokeStyle=o,i.fillStyle=`#ffffff`,i.strokeText(`7`,256,128),i.fillText(`7`,256,128),i.font=`bold 70px "Arial Black", Arial, sans-serif`,i.strokeText(`7`,0,118),i.fillText(`7`,0,118),i.strokeText(`7`,512,118),i.fillText(`7`,512,118),i.fillStyle=`#f4f4f4`,i.fillRect(0,246,512,10);else if(t===`hawaii`){dp(i,512,256,n,7),i.fillStyle=`#f7f3ea`,i.beginPath(),i.moveTo(226,0),i.lineTo(256,40),i.lineTo(286,0),i.fill(),i.strokeStyle=`rgba(0,0,0,0.25)`,i.lineWidth=3,i.beginPath(),i.moveTo(259,38),i.lineTo(259,256),i.stroke(),i.fillStyle=`#f7f3ea`;for(let e=70;e<256;e+=48)i.beginPath(),i.arc(265,e,5,0,Math.PI*2),i.fill()}else if(t===`suit`||t===`tux`){let e=t===`tux`,r=e?30:36,s=e?132:112;i.fillStyle=`#f6f6f6`,i.beginPath(),i.moveTo(256-r,0),i.lineTo(256,s),i.lineTo(256+r,0),i.fill();let c=e?Rd(n)<.05?`#3a3a46`:o:a;for(let t of[-1,1])i.fillStyle=c,i.beginPath(),i.moveTo(256+t*r,0),i.lineTo(256+t*(r+22),0),i.lineTo(256+t*(r+30),34),i.lineTo(256+t*(r+14),46),i.lineTo(256+t*8,s-8),i.lineTo(256,s),i.closePath(),i.fill(),e&&(i.fillStyle=`rgba(255,255,255,0.12)`,i.beginPath(),i.moveTo(256+t*(r+4),4),i.lineTo(256+t*(r+14),6),i.lineTo(256+t*10,s-16),i.closePath(),i.fill());if(!e)i.fillStyle=Rd(n)<.1&&n!==`#b8323c`?`#c0283a`:`#7a1426`,/^#b8/.test(n)&&(i.fillStyle=`#1b2a4a`),i.beginPath(),i.moveTo(248,6),i.lineTo(264,6),i.lineTo(261,20),i.lineTo(267,s-6),i.lineTo(256,s+6),i.lineTo(245,s-6),i.lineTo(251,20),i.closePath(),i.fill(),i.fillStyle=`#f6f6f6`,i.beginPath(),i.moveTo(318,70),i.lineTo(344,70),i.lineTo(336,58),i.lineTo(328,64),i.lineTo(322,56),i.closePath(),i.fill(),i.fillStyle=o,i.fillRect(314,70,34,4),i.fillRect(156,176,46,5),i.fillRect(310,176,46,5);else{i.fillStyle=`#16161c`;for(let e of[56,82,108])i.beginPath(),i.arc(256,e,4.5,0,Math.PI*2),i.fill()}i.fillStyle=o;for(let t of e?[148]:[128,160])i.beginPath(),i.arc(256,t,6,0,Math.PI*2),i.fill()}else if(t===`leather`){for(let[e,t]of[[170,34],[330,26],[60,30],[440,30]]){let n=i.createLinearGradient(e-t,0,e+t,0);n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(.5,`rgba(255,255,255,0.14)`),n.addColorStop(1,`rgba(255,255,255,0)`),i.fillStyle=n,i.fillRect(e-t,0,t*2,256)}i.strokeStyle=`#c8ccd4`,i.lineWidth=4,i.beginPath(),i.moveTo(278,0),i.lineTo(268,256),i.stroke(),i.strokeStyle=`#8a8f99`,i.lineWidth=2;for(let e=4;e<256;e+=6){let t=278-e/256*10;i.beginPath(),i.moveTo(t-4,e),i.lineTo(t+4,e),i.stroke()}i.strokeStyle=`rgba(255,255,255,0.22)`,i.lineWidth=3;for(let e of[-1,1])i.beginPath(),i.moveTo(256+e*40,120),i.lineTo(256+e*86,96),i.stroke();i.fillStyle=o,i.fillRect(0,238,512,18),i.fillStyle=`#c8ccd4`,i.fillRect(260,240,14,14)}return lp(r)}),nf(`sleeve`,e=>{let[,,t]=e.split(`|`),n=cp(256,128);return dp(n.getContext(`2d`),256,128,t,11),lp(n)});function dp(e,t,n,r,i){e.fillStyle=r,e.fillRect(0,0,t,n);let a=up(i),o=Rd(r)>.4?`#2f8a4a`:Id(r,.22),s=[`#ffffff`,`#ffd23f`,`#ff8fb8`];for(let r=0;r<t*n/2600;r++){let r=a()*t,i=a()*n,s=a()*Math.PI;e.save(),e.translate(r,i),e.rotate(s),e.fillStyle=o,e.beginPath(),e.ellipse(0,0,22,8,0,0,Math.PI*2),e.fill(),e.restore()}for(let r=0;r<t*n/3600;r++){let i=a()*t,o=a()*n,c=9+a()*7,l=a()*6;e.fillStyle=s[r%s.length];for(let t=0;t<5;t++){let n=l+t/5*Math.PI*2;e.beginPath(),e.ellipse(i+Math.cos(n)*c*.8,o+Math.sin(n)*c*.8,c*.7,c*.45,n,0,Math.PI*2),e.fill()}e.fillStyle=`#e8463c`,e.beginPath(),e.arc(i,o,c*.32,0,Math.PI*2),e.fill()}}function fp(e,t,n,r){e.beginPath(),e.moveTo(t,n-r),e.bezierCurveTo(t+r*.25,n-r*.55,t+r*1.05,n-r*.2,t+r*.85,n+r*.35),e.bezierCurveTo(t+r*.7,n+r*.75,t+r*.2,n+r*.65,t+r*.08,n+r*.4),e.lineTo(t+r*.3,n+r*1),e.lineTo(t-r*.3,n+r*1),e.lineTo(t-r*.08,n+r*.4),e.bezierCurveTo(t-r*.2,n+r*.65,t-r*.7,n+r*.75,t-r*.85,n+r*.35),e.bezierCurveTo(t-r*1.05,n-r*.2,t-r*.25,n-r*.55,t,n-r),e.closePath(),e.fill()}nf(`caplogo`,()=>{let e=cp(128,128),t=e.getContext(`2d`);return t.fillStyle=`#e0343f`,t.fillRect(0,0,128,128),t.fillStyle=`#ffffff`,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.fill(),t.fillStyle=`#1b1b22`,fp(t,64,58,34),lp(e)}),nf(`knit`,e=>{let[,t]=e.split(`|`),n=cp(256,64),r=n.getContext(`2d`);r.fillStyle=t,r.fillRect(0,0,256,64);for(let e=0;e<256;e+=8)r.fillStyle=`rgba(0,0,0,0.14)`,r.fillRect(e,0,3,64),r.fillStyle=`rgba(255,255,255,0.1)`,r.fillRect(e+4,0,2,64);return lp(n)}),nf(`scarf`,e=>{let[,t]=e.split(`|`),n=cp(128,128),r=n.getContext(`2d`);for(let e=0;e<8;e++)r.fillStyle=e%2?`#fff3df`:t,r.fillRect(e*128/8,0,16,128);r.fillStyle=`rgba(0,0,0,0.08)`;for(let e=0;e<128;e+=6)r.fillRect(0,e,128,2);return lp(n)}),nf(`ribbon`,e=>{let[,t]=e.split(`|`),n=cp(64,64),r=n.getContext(`2d`);return r.fillStyle=t,r.fillRect(0,0,64,64),r.fillStyle=`#e8233c`,r.fillRect(0,0,18,64),r.fillRect(46,0,18,64),r.fillStyle=`#ffffff`,r.fillRect(18,0,4,64),r.fillRect(42,0,4,64),lp(n)}),nf(`shades`,()=>{let e=cp(256,128),t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,128);return n.addColorStop(0,`#2a2d3e`),n.addColorStop(.5,`#0c0d14`),n.addColorStop(1,`#1c1630`),t.fillStyle=n,t.fillRect(0,0,256,128),t.fillStyle=`rgba(255,255,255,0.75)`,t.beginPath(),t.moveTo(44,46),t.lineTo(58,46),t.lineTo(40,70),t.lineTo(26,70),t.closePath(),t.fill(),t.fillStyle=`rgba(255,255,255,0.45)`,t.beginPath(),t.moveTo(64,46),t.lineTo(70,46),t.lineTo(52,70),t.lineTo(46,70),t.closePath(),t.fill(),lp(e)}),nf(`cyber`,()=>{let e=cp(256,64),t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,64);n.addColorStop(0,`#0a3a66`),n.addColorStop(.5,`#1fd6ff`),n.addColorStop(1,`#0a3a66`),t.fillStyle=n,t.fillRect(0,0,256,64),t.fillStyle=`rgba(255,255,255,0.35)`;for(let e=0;e<64;e+=6)t.fillRect(0,e,256,1.5);t.fillStyle=`rgba(255,90,220,0.9)`,t.fillRect(118,22,20,20);let r=lp(e,{repeat:!0});return r.colorSpace=nt,r}),nf(`chip`,e=>{let[,t,n,r]=e.split(`|`),i=cp(128,128),a=i.getContext(`2d`);if(a.fillStyle=n,a.fillRect(0,0,128,128),t===`side`){a.fillStyle=r;for(let e=0;e<8;e++)a.fillRect(e*16+4,0,8,128)}else a.strokeStyle=r,a.lineWidth=10,a.setLineDash([12,10]),a.beginPath(),a.arc(64,64,54,0,Math.PI*2),a.stroke(),a.setLineDash([]),a.lineWidth=4,a.beginPath(),a.arc(64,64,34,0,Math.PI*2),a.stroke();return lp(i)}),nf(`bill`,()=>{let e=cp(128,64),t=e.getContext(`2d`);return t.fillStyle=`#3aa862`,t.fillRect(0,0,128,64),t.strokeStyle=`#1f6b3b`,t.lineWidth=4,t.strokeRect(6,6,116,52),t.fillStyle=`#d8f5c4`,t.beginPath(),t.arc(64,32,16,0,Math.PI*2),t.fill(),t.fillStyle=`#1f6b3b`,t.font=`bold 26px sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`$`,64,33),lp(e)});var pp={normal:{eyes:`open`,brows:`normal`,mouth:`smile`,blush:.3},happy:{eyes:`happy`,brows:`up`,mouth:`open`,blush:.65},sad:{eyes:`sad`,brows:`sad`,mouth:`frown`,blush:.15,extra:`shine`},angry:{eyes:`angry`,brows:`angry`,mouth:`grit`,blush:0},surprised:{eyes:`big`,brows:`up`,mouth:`o`,blush:.25},think:{eyes:`up`,brows:`raise`,mouth:`hmm`,blush:.15},cool:{eyes:`half`,brows:`raise`,mouth:`smirk`,blush:.1},wink:{eyes:`wink`,brows:`normal`,mouth:`grin`,blush:.55},kiss:{eyes:`wink`,brows:`up`,mouth:`pucker`,blush:.8},cry:{eyes:`tight`,brows:`sad`,mouth:`wail`,blush:.45,extra:`tears`},excited:{eyes:`star`,brows:`up`,mouth:`open`,blush:.6},money:{eyes:`money`,brows:`up`,mouth:`grin`,blush:.35},robot:{eyes:`robot`,brows:`none`,mouth:`robot`,blush:0},determined:{eyes:`angry`,brows:`angry`,mouth:`grit`,blush:0,extra:`sweat`},bored:{eyes:`half`,brows:`flat`,mouth:`flat`,blush:0},focus:{eyes:`focus`,brows:`focus`,mouth:`flat`,blush:.1},ugh:{eyes:`tight`,brows:`sad`,mouth:`wavy`,blush:0,extra:`gloom`},meh:{eyes:`open`,brows:`up`,mouth:`wavy`,blush:.1},smug:{eyes:`closed`,brows:`raise`,mouth:`smirk`,blush:.3},proud:{eyes:`happy`,brows:`normal`,mouth:`cat`,blush:.5},yell:{eyes:`tight`,brows:`angry`,mouth:`wail`,blush:.2},taunt:{eyes:`half`,brows:`raise`,mouth:`grin`,blush:0}},mp=new Set([`happy`,`closed`,`tight`,`wink`,`robot`,`star`,`money`]);function hp(e){let t=pp[e];return!!t&&!mp.has(t.eyes)}function gp(e,t){let n=Tf.R,r=Math.acos(Math.max(-1,Math.min(1,t/n))),i=Math.sin(r);return[(Math.acos(Math.max(-1,Math.min(1,-e/(n*i))))-Tf.phi0)/Tf.phiW*Tf.W,(r-Tf.th0)/Tf.thW*Tf.H]}var _p=Tf.H/(Tf.thW*Tf.R),vp=Tf.W/(Tf.phiW*Tf.R*.99),yp={eyeX:.066,eyeY:-.03,eyeRX:.027,eyeRY:.035,browY:.03,mouthY:-.098,blushX:.112,blushY:-.073},bp=`#2a1418`,xp=`#6e2232`;function Sp(e,t,n,r,i,a=0){e.beginPath(),e.ellipse(t,n,Math.max(.1,r),Math.max(.1,i),a,0,Math.PI*2)}function Cp(e,t,n){let r=pp[t]||pp.normal,i=Tf.W,a=Tf.H;e.setTransform(1,0,0,1,0,0),e.fillStyle=n.skin,e.fillRect(0,0,i,a),e.lineCap=`round`,e.lineJoin=`round`;let o=yp.eyeRX*vp,s=yp.eyeRY*_p;if(r.blush>0)for(let t of[-1,1]){let[n,i]=gp(t*yp.blushX,yp.blushY),a=e.createRadialGradient(n,i,0,n,i,.03*vp);if(a.addColorStop(0,`rgba(255,105,130,${.5*r.blush})`),a.addColorStop(1,`rgba(255,105,130,0)`),e.fillStyle=a,Sp(e,n,i,.03*vp,.018*_p),e.fill(),r.blush>.5){e.strokeStyle=`rgba(240,80,110,${.55*r.blush})`,e.lineWidth=3.2;for(let t=-1;t<=1;t++)e.beginPath(),e.moveTo(n+t*11-4,i+6),e.lineTo(n+t*11+4,i-6),e.stroke()}}{let[t,n]=gp(0,-.062);e.fillStyle=`rgba(120,50,40,0.18)`,Sp(e,t,n,5,3.5),e.fill()}let c=r.eyes;n.blink&&hp(t)&&(c=`closed`);let l=(n.gaze?.[0]||0)*o*.22,u=(n.gaze?.[1]||0)*s*.18;for(let t of[-1,1]){let[r,i]=gp(t*yp.eyeX,yp.eyeY);wp(e,c,r,i,o,s,t,n.skin,l,u)}if(r.brows!==`none`){e.strokeStyle=n.brow,e.lineWidth=.0068*_p;for(let t of[-1,1]){let[n,i]=gp(t*yp.eyeX,yp.browY);Tp(e,r.brows,n,i,o,t)}}let[d,f]=gp(0,yp.mouthY);if(Ep(e,r.mouth,d,f),r.extra===`tears`)for(let t of[-1,1]){let[n,r]=gp(t*yp.eyeX,yp.eyeY),i=e.createLinearGradient(0,r,0,a);i.addColorStop(0,`rgba(130,210,255,0.95)`),i.addColorStop(1,`rgba(130,210,255,0.35)`),e.fillStyle=i,e.beginPath(),e.moveTo(n-13,r+s*.3),e.bezierCurveTo(n-18,r+90,n-8,r+140,n-16,a),e.lineTo(n+16,a),e.bezierCurveTo(n+10,r+140,n+20,r+90,n+13,r+s*.3),e.closePath(),e.fill(),e.strokeStyle=`rgba(255,255,255,0.8)`,e.lineWidth=3,e.beginPath(),e.moveTo(n-5,r+s*.6),e.bezierCurveTo(n-9,r+90,n-1,r+130,n-6,a),e.stroke()}else if(r.extra===`sweat`){let[t,n]=gp(.105,.035);e.fillStyle=`#a8e0ff`,e.strokeStyle=`#3b8ad8`,e.lineWidth=3,e.beginPath(),e.moveTo(t,n-22),e.bezierCurveTo(t+6,n-8,t+14,n,t+14,n+8),e.arc(t,n+8,14,0,Math.PI),e.bezierCurveTo(t-14,n,t-6,n-8,t,n-22),e.fill(),e.stroke(),e.fillStyle=`#fff`,Sp(e,t-5,n+6,3,5,.3),e.fill()}else if(r.extra===`gloom`){e.strokeStyle=`rgba(70,40,120,0.45)`,e.lineWidth=4;for(let t=-2;t<=2;t++){let[n,r]=gp(t*.022,.11);e.beginPath(),e.moveTo(n,r),e.lineTo(n,r+46-Math.abs(t)*8),e.stroke()}}else if(r.extra===`shine`)for(let t of[-1,1]){let[n,r]=gp(t*yp.eyeX,yp.eyeY);e.fillStyle=`rgba(150,215,255,0.85)`,Sp(e,n,r+s*.85,o*.7,s*.2),e.fill()}}function wp(e,t,n,r,i,a,o,s,c,l){let u=-o;switch(t){case`happy`:e.strokeStyle=bp,e.lineWidth=.0085*_p,e.beginPath(),e.moveTo(n-i*.95,r+a*.2),e.quadraticCurveTo(n,r-a*.95,n+i*.95,r+a*.2),e.stroke();return;case`closed`:e.strokeStyle=bp,e.lineWidth=.0075*_p,e.beginPath(),e.moveTo(n-i,r+a*.05),e.quadraticCurveTo(n,r+a*.55,n+i,r+a*.05),e.stroke(),e.lineWidth=.005*_p,e.beginPath(),e.moveTo(n-u*i,r+a*.05),e.lineTo(n-u*i*1.3,r-a*.2),e.stroke();return;case`tight`:{e.strokeStyle=bp,e.lineWidth=.008*_p;let t=n-u*i*.9;e.beginPath(),e.moveTo(t,r-a*.6),e.lineTo(n+u*i*.7,r),e.lineTo(t,r+a*.6),e.stroke();return}case`wink`:if(o>0){wp(e,`happy`,n,r,i,a,o,s,0,0);return}break;case`star`:e.save(),e.translate(n,r),e.beginPath();for(let t=0;t<10;t++){let n=t%2?a*.45:a*1.05,r=-Math.PI/2+t*Math.PI/5;e.lineTo(Math.cos(r)*n*(i/a)*1.05,Math.sin(r)*n)}e.closePath(),e.fillStyle=`#ffd23a`,e.fill(),e.lineWidth=4,e.strokeStyle=`#7a3a12`,e.stroke(),e.fillStyle=`#fff`,Sp(e,-i*.2,-a*.25,i*.2,a*.15),e.fill(),e.restore();return;case`money`:e.font=`bold ${Math.round(a*2.3)}px Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.lineWidth=7,e.strokeStyle=`#1d5e2c`,e.strokeText(`$`,n,r+4),e.fillStyle=`#5be07a`,e.fillText(`$`,n,r+4);return;case`robot`:e.fillStyle=`#123040`,e.beginPath(),e.roundRect(n-i*1.15,r-a*.45,i*2.3,a*.9,6),e.fill(),e.fillStyle=`#58f0ff`,e.beginPath(),e.roundRect(n-i*.95,r-a*.3,i*1.9,a*.6,4),e.fill(),e.fillStyle=`rgba(255,255,255,0.7)`,e.fillRect(n-i*.8,r-a*.2,i*.5,a*.15);return;case`big`:e.fillStyle=`#ffffff`,Sp(e,n,r,i*1.08,a*1.08),e.fill(),e.lineWidth=5,e.strokeStyle=bp,e.stroke(),e.fillStyle=bp,Sp(e,n,r+2,i*.42,a*.46),e.fill(),e.fillStyle=`#fff`,Sp(e,n-i*.12,r-a*.12,i*.14,a*.12),e.fill();return}let d=c,f=l;t===`up`&&(d=u*i*.18,f=-a*.22);let p=e.createLinearGradient(0,r-a,0,r+a);p.addColorStop(0,`#1a0c12`),p.addColorStop(.5,`#3c2218`),p.addColorStop(1,`#9c5c34`),e.fillStyle=p,Sp(e,n,r,i,a),e.fill(),e.save(),Sp(e,n,r,i,a),e.clip(),e.fillStyle=`rgba(12,4,8,0.6)`,Sp(e,n+d,r+f+a*.05,i*.52,a*.55),e.fill(),e.fillStyle=`rgba(255,190,120,0.35)`,Sp(e,n+d,r+a*.62,i*.65,a*.32),e.fill(),e.fillStyle=`#ffffff`,Sp(e,n-i*.3+d*.6,r-a*.36+f*.6,i*.38,a*.3,-.3),e.fill(),Sp(e,n+i*.36+d*.4,r+a*.4+f*.4,i*.15,a*.12),e.fill(),e.restore();let m=-1,h=-1;if(t===`half`)m=h=.45;else if(t===`focus`)m=h=.2;else if(t===`angry`){let e=.55,t=.1;u>0?(h=e,m=t):(m=e,h=t)}else if(t===`sad`){let e=.05,t=.4;u>0?(h=e,m=t):(m=e,h=t)}if(e.strokeStyle=bp,m>=0){let t=r-a+m*2*a,o=r-a+h*2*a;e.fillStyle=s,e.beginPath(),e.moveTo(n-i*1.4,r-a*1.5),e.lineTo(n+i*1.4,r-a*1.5),e.lineTo(n+i*1.4,o),e.lineTo(n-i*1.4,t),e.closePath(),e.fill(),e.lineWidth=.0075*_p,e.beginPath(),e.moveTo(n-i*1.08,t+(o-t)*-.04),e.lineTo(n+i*1.08,o+(o-t)*.04),e.stroke()}else{e.lineWidth=.0068*_p,e.beginPath(),e.ellipse(n,r+a*.04,i*1.04,a*1.04,0,Math.PI*1.1,Math.PI*1.9),e.stroke();let t=n-u*i*.98;e.lineWidth=.005*_p,e.beginPath(),e.moveTo(t,r-a*.55),e.lineTo(t-u*i*.32,r-a*.8),e.stroke()}}function Tp(e,t,n,r,i,a){let o=-a,s=n+o*i*.85,c=n-o*i*.95,l=0,u=0,d=-6;switch(t){case`up`:l=-12,u=-10,d=-9;break;case`angry`:l=14,u=-6,d=0;break;case`sad`:l=-10,u=10,d=-2;break;case`raise`:a>0&&(l=-12,u=-14,d=-10);break;case`flat`:l=3,u=3,d=0;break;case`focus`:l=7,u=-2,d=-2}e.beginPath(),e.moveTo(c,r+u),e.quadraticCurveTo(n,r+(l+u)/2+d,s,r+l),e.stroke()}function Ep(e,t,n,r){switch(e.strokeStyle=xp,e.lineWidth=.0052*_p,t){case`smile`:e.beginPath(),e.moveTo(n-17,r-4),e.quadraticCurveTo(n,r+10,n+17,r-4),e.stroke();return;case`cat`:e.beginPath(),e.moveTo(n-20,r-4),e.quadraticCurveTo(n-10,r+9,n,r-2),e.quadraticCurveTo(n+10,r+9,n+20,r-4),e.stroke();return;case`open`:case`grin`:{let i=t===`grin`?27:22,a=t===`grin`?22:28;e.fillStyle=xp,e.beginPath(),e.moveTo(n-i,r-8),e.quadraticCurveTo(n,r-4,n+i,r-8),e.quadraticCurveTo(n+i*.8,r+a,n,r+a),e.quadraticCurveTo(n-i*.8,r+a,n-i,r-8),e.closePath(),e.fill(),e.save(),e.clip(),t===`grin`&&(e.fillStyle=`#ffffff`,e.fillRect(n-i,r-10,i*2,9)),e.fillStyle=`#ff8597`,Sp(e,n,r+a-2,i*.62,a*.42),e.fill(),e.restore();return}case`o`:e.fillStyle=xp,Sp(e,n,r+2,10,13),e.fill(),e.fillStyle=`#ff8597`,Sp(e,n,r+9,6,4),e.fill();return;case`frown`:e.beginPath(),e.moveTo(n-15,r+7),e.quadraticCurveTo(n,r-7,n+15,r+7),e.stroke();return;case`wail`:e.fillStyle=xp,e.beginPath(),e.moveTo(n-26,r-2),e.quadraticCurveTo(n-13,r-12,n,r-4),e.quadraticCurveTo(n+13,r-12,n+26,r-2),e.quadraticCurveTo(n+20,r+26,n,r+26),e.quadraticCurveTo(n-20,r+26,n-26,r-2),e.closePath(),e.fill(),e.save(),e.clip(),e.fillStyle=`#ff8597`,Sp(e,n,r+24,15,9),e.fill(),e.restore();return;case`flat`:e.beginPath(),e.moveTo(n-12,r+1),e.lineTo(n+12,r+1),e.stroke();return;case`smirk`:e.beginPath(),e.moveTo(n-14,r+2),e.quadraticCurveTo(n+4,r+6,n+17,r-7),e.stroke(),e.lineWidth=3,e.beginPath(),e.moveTo(n+15,r-9),e.lineTo(n+20,r-4),e.stroke();return;case`pucker`:e.lineWidth=.0058*_p,e.beginPath(),e.arc(n+3,r-5,6.5,-Math.PI*.55,Math.PI*.55),e.arc(n+3,r+7,6.5,-Math.PI*.55,Math.PI*.55),e.stroke();return;case`grit`:e.fillStyle=`#ffffff`,e.beginPath(),e.roundRect(n-21,r-8,42,17,6),e.fill(),e.lineWidth=4,e.stroke(),e.lineWidth=2.5,e.beginPath(),e.moveTo(n-20,r),e.lineTo(n+20,r);for(let t of[-10,0,10])e.moveTo(n+t,r-7),e.lineTo(n+t,r+8);e.stroke();return;case`wavy`:e.beginPath(),e.moveTo(n-18,r);for(let t=1;t<=6;t++)e.lineTo(n-18+t*6,r+(t%2?-4:3));e.stroke();return;case`hmm`:e.beginPath(),e.moveTo(n-10,r+3),e.lineTo(n+12,r-2),e.stroke();return;case`robot`:e.fillStyle=`#183040`,e.beginPath(),e.roundRect(n-22,r-8,44,16,4),e.fill(),e.fillStyle=`#58f0ff`;for(let t=0;t<5;t++)e.fillRect(n-18+t*8,r-5,4,10);return;default:return}}var Dp={eyeL:[yp.eyeX,yp.eyeY,.19],eyeR:[-yp.eyeX,yp.eyeY,.19],mouth:[0,yp.mouthY,.18]},Op=1,J=-1,kp=[Op,J],Ap=[[.45,1.05],[1.2,1.8]],jp=[.3,.95,1.6,2.2],Mp=[-.3,.28,-.05,.38],Np=Math.PI,Pp=e=>e<0?0:e>1?1:e,Fp=(e,t,n)=>Pp((e-t)/(n-t)),Ip=e=>e*e*(3-2*e),Lp=(e,t,n)=>Ip(Fp(e,t,n)),Rp=e=>1-(1-e)*(1-e),zp=e=>e*e,Bp=e=>1+2.70158*(e-1)**3+1.70158*(e-1)**2,Vp=(e,t,n)=>e<=t||e>=n?0:Math.sin(Np*Fp(e,t,n)),Y=(e,t,n)=>e+(t-e)*n,Hp=Math.sin,Up=Math.cos,Wp={sparkle:{layer:`glow`,sprite:of.sparkle,life:[.35,.65],size:[.045,.08],colors:[yf.white,yf.paleGold,yf.gold],drag:3.5,spin:[-3,3],curve:3,fadeIn:.02,fadeOut:.25},goldSpark:{layer:`glow`,sprite:of.sparkle,life:[.6,1],size:[.04,.075],colors:[yf.gold,yf.paleGold,yf.white],grav:-.15,drag:1.2,spin:[-2,2],curve:1,fadeIn:.05,fadeOut:.35},star:{layer:`glow`,sprite:of.star,life:[.4,.6],size:[.04,.06],colors:[yf.yellow,yf.white],drag:4,spin:[-4,4],curve:3,fadeIn:.01,fadeOut:.25},tear:{layer:`norm`,sprite:of.tear,life:[.45,.65],size:[.03,.044],colors:[yf.white],grav:1.9,drag:.3,fadeIn:.02,fadeOut:.15},heart:{layer:`norm`,sprite:of.heart,life:[1.5,2],size:[.06,.095],colors:[yf.white],grav:-.08,drag:1.3,sway:.08,swayF:4,rot:[-.3,.3],curve:3,fadeIn:.04,fadeOut:.5},dust:{layer:`norm`,sprite:of.dust,life:[.45,.75],size:[.05,.09],colors:[yf.dust],alpha:.85,grav:-.12,drag:4.5,curve:4,rot:[0,6.28],fadeIn:.02,fadeOut:.4},anger:{layer:`norm`,sprite:of.anger,life:[.9,.9],size:[.1,.1],colors:[yf.white],curve:3,fadeIn:.01,fadeOut:.25,rot:[-.2,.2]},question:{layer:`norm`,sprite:of.question,life:[1.3,1.3],size:[.12,.12],colors:[yf.white],grav:-.06,drag:3,curve:3,fadeIn:.02,fadeOut:.35,rot:[-.25,-.1]},bang:{layer:`norm`,sprite:of.bang,life:[.9,.9],size:[.12,.12],colors:[yf.white],grav:-.05,drag:3,curve:3,fadeIn:.01,fadeOut:.3,rot:[.1,.25]},sweat:{layer:`norm`,sprite:of.sweat,life:[.8,.8],size:[.06,.06],colors:[yf.white],grav:.25,drag:2,curve:3,fadeIn:.02,fadeOut:.3,rot:[.3,.3]},note:{layer:`norm`,sprite:of.note,life:[1,1.3],size:[.06,.085],colors:[[1,.45,.72],[.4,.8,1],[1,.82,.25],[.55,.95,.55]],grav:-.12,drag:1.4,sway:.12,swayF:5,rot:[-.35,.35],curve:3,fadeIn:.03,fadeOut:.4},bill:{layer:`norm`,sprite:of.bill,life:[1.7,2.3],size:[.075,.095],colors:[yf.white],grav:1.5,drag:2.4,sway:.28,swayF:6,spin:[2,5],spinSym:!0,rot:[0,6.28],fadeIn:.03,fadeOut:.4},billRain:{layer:`norm`,sprite:of.bill,life:[1.4,1.8],size:[.07,.09],colors:[yf.white],grav:.15,drag:.6,sway:.3,swayF:5,spin:[1.5,4],spinSym:!0,rot:[0,6.28],fadeIn:.15,fadeOut:.4},coin:{layer:`norm`,sprite:of.coin,life:[.9,1.3],size:[.04,.05],colors:[yf.white],grav:2.6,drag:.6,spin:[4,8],spinSym:!0,fadeIn:.02,fadeOut:.2},rocket:{layer:`glow`,sprite:of.glow,life:[.06,.06],size:[.09,.09],colors:[yf.paleGold],fadeIn:0,fadeOut:.03},trail:{layer:`glow`,sprite:of.glow,life:[.25,.45],size:[.03,.05],colors:[yf.gold,yf.orange,yf.paleGold],drag:2,grav:.5,curve:2,fadeIn:0,fadeOut:.2},burst:{layer:`glow`,sprite:of.glow,life:[.75,1.15],size:[.045,.07],grav:.55,drag:1.7,curve:5,fadeIn:0,fadeOut:.55,colors:[[1,.35,.5],[.35,.85,1],[1,.85,.3],[.55,1,.45],[.85,.5,1]]},burstStar:{layer:`glow`,sprite:of.sparkle,life:[.6,.9],size:[.05,.08],grav:.4,drag:2.2,spin:[-3,3],curve:1,fadeIn:0,fadeOut:.4,colors:[yf.white,yf.paleGold]},flash:{layer:`glow`,sprite:of.ring,life:[.32,.32],size:[.22,.22],colors:[yf.white],curve:4,fadeIn:0,fadeOut:.3},glowPop:{layer:`glow`,sprite:of.glow,life:[.25,.25],size:[.16,.16],colors:[yf.paleGold],curve:4,fadeIn:0,fadeOut:.22},beep:{layer:`glow`,sprite:of.glow,life:[.18,.22],size:[.05,.06],colors:[yf.cyan],curve:2,fadeIn:0,fadeOut:.12},speed:{layer:`norm`,sprite:of.dust,life:[.3,.45],size:[.04,.07],colors:[yf.white],alpha:.7,drag:5,curve:4,fadeIn:.01,fadeOut:.25},auraSparkle:{layer:`glow`,sprite:of.sparkle,life:[.8,1.3],size:[.1,.17],colors:[yf.white,yf.paleGold,[1,.75,.95],yf.cyan],grav:-.04,drag:.5,spin:[-1.5,1.5],curve:1,fadeIn:.2,fadeOut:.45},auraGlow:{layer:`glow`,sprite:of.glow,life:[.9,1.4],size:[.08,.14],colors:[[1,.9,.6],[.8,.9,1],[1,.7,.9]],alpha:.45,grav:-.05,drag:.5,fadeIn:.3,fadeOut:.5},auraHeart:{layer:`norm`,sprite:of.heart,life:[2,2.6],size:[.07,.11],colors:[yf.white],grav:-.02,drag:.4,sway:.08,swayF:3,rot:[-.25,.25],curve:3,fadeIn:.3,fadeOut:.6},auraSnow:{layer:`norm`,sprite:of.snow,life:[3.4,4.2],size:[.045,.075],colors:[yf.white,yf.ice],alpha:.95,grav:.05,drag:.4,sway:.1,swayF:2.2,spin:[-1.2,1.2],fadeIn:.4,fadeOut:.8},auraFire:{layer:`glow`,sprite:of.flame,life:[.4,.65],size:[.14,.24],colors:[[1,.48,.1],[1,.7,.18],[1,.3,.06],[1,.85,.4]],alpha:.9,grav:-.55,drag:.6,sway:.08,swayF:9,rot:[-.18,.18],curve:2,fadeIn:.05,fadeOut:.3},auraEmber:{layer:`glow`,sprite:of.glow,life:[.7,1.1],size:[.03,.05],colors:[[1,.8,.35],[1,.55,.15]],grav:-.35,drag:.6,sway:.1,swayF:6,fadeIn:.05,fadeOut:.4},auraBill:{layer:`norm`,sprite:of.bill,life:[3.6,4.2],size:[.085,.11],colors:[yf.white],grav:.2,drag:.9,sway:.2,swayF:2.6,spin:[1,2.8],spinSym:!0,rot:[0,6.28],fadeIn:.3,fadeOut:.6},auraCoin:{layer:`norm`,sprite:of.coin,life:[2.2,2.6],size:[.045,.06],colors:[yf.white],grav:.4,drag:.8,spin:[3,6],spinSym:!0,fadeIn:.3,fadeOut:.4}},Gp={sparkle:{additive:!0,rate:24,spawn(e,t,n){let r=t()*Np*2,i=.26+t()*.16,a=(n?.8:.4)+t()*(n?.85:1.2),o=Math.cos(r)*i,s=Math.sin(r)*i*.85-.04;t()<.3?e.spawn(Wp.auraGlow,o,a,s,0,.05,0):e.spawn(Wp.auraSparkle,o,a,s,0,.05,0)}},hearts:{additive:!1,rate:5,spawn(e,t,n){let r=t()*Np*2,i=.27+t()*.12,a=(n?.85:.6)+t()*.5;e.spawn(Wp.auraHeart,Math.cos(r)*i,a,Math.sin(r)*i*.8-.06,0,.12+t()*.06,0)}},snow:{additive:!1,rate:10,spawn(e,t){let n=t()*Np*2,r=.12+Math.sqrt(t())*.42;e.spawn(Wp.auraSnow,Math.cos(n)*r,1.75+t()*.25,Math.sin(n)*r*.85-.05,0,-.18-t()*.06,0)}},fire:{additive:!0,rate:88,spawn(e,t,n){let r=t()*Np*2,i=n?.72:.35,a=i+t()*(1.5-i),o=Math.sin(r);if(o>.55||a>1.05&&o>.1)return;let s=(a<1.03?.21+.03*Math.sin((a-i)/(1.03-i)*Np):.25)+t()*.05;t()<.15?e.spawn(Wp.auraEmber,Math.cos(r)*s*1.2,a+.15,o*s-.03,0,.32,0):e.spawn(Wp.auraFire,Math.cos(r)*s,a,o*s*.85-.04,Math.cos(r)*.04,.3+t()*.2,o*.03)}},money:{additive:!1,rate:5,spawn(e,t){let n=t()*Np*2,r=.18+t()*.32,i=t()<.3;e.spawn(i?Wp.auraCoin:Wp.auraBill,Math.cos(n)*r,1.8+t()*.25,Math.sin(n)*r*.85-.05,0,i?-.45:-.3,0)}}},Kp=[[0,1.57,1.57,1.57,0,1.57,-1.57,1.57,.45,.12],[0,1.57,-1.57,1.57,0,1.57,1.57,1.57,-.45,-.12],[1.57,.12,0,1.57,1.57,.12,0,1.57,0,0],[.1,.15,0,1.6,.1,.15,0,1.6,.4,.15],[1.57,.12,0,.1,.1,.15,0,1.6,-.4,-.15],[.1,.15,0,1.6,1.57,.12,0,.1,.4,.15]],qp={wave:{duration:1.6,play(e,t){let n=Bp(Fp(t,0,.32)),r=Hp((t-.25)*13)*Lp(t,.2,.4);e.clav(J,.18*n),e.ik(J,`root`,Y(.2,.31,n)+.035*r,Y(.86,1.25,n),Y(.3,.12,n)),e.pole(J,1,-1,-.25),e.aim(J,.15+.3*r,1,.12,0,.1,1),e.shape(J,`open`),e.headAdd(0,-.14*n,.12*n),e.spineAdd(0,-.06*n,.06*n),e.face(`happy`)}},nod:{duration:1.2,play(e,t){let n=Lp(t,0,.12),r=.5-.5*Up(Fp(t,.05,1.05)*Np*2*2);e.headAdd(.3*r*n,0,.04*n),e.neckAdd(.08*r,0,0),e.spineAdd(.05*r,0,0),e.face(`proud`)}},think:{duration:2.4,play(e,t,n,r){let i=Lp(t,0,.35);e.ik(J,`head`,.03,-.235,.12),e.pole(J,.35,-1,.1),e.aim(J,-.3,.35,1,0,1,-.2),e.shape(J,`fist`),e.headAdd(.06,.2+.14*Hp(t*1.5),.2*i),e.spineAdd(.05,.06,.05*i),e.face(`think`),r.cross(.55)&&r.fx(`question`,`headTop`,1,.08,.12,.02,0,-.12,.02,.04),r.cross(1.35)&&r.fx(`question`,`headTop`,1,-.06,.12,.02,0,.12,0,.04)}},thumbs:{duration:1.4,play(e,t,n,r){let i=Bp(Fp(t,.02,.32)),a=.07*Hp((t-.35)*11)*Lp(t,.35,.5)*(1-Lp(t,1,1.2));e.arm(J,Y(.25,.85,i)+a,.28,0),e.elbow(J,Y(.4,1.15,i)+a),e.hand(J,0,0,-.1),e.shape(J,`thumb`),e.spineAdd(.05*i,-.08*i,0),e.headAdd(-.04,-.1*i,-.12*i),e.face(`wink`),r.cross(.3)&&r.fx(`sparkle`,`thumbR`,7,0,.25,.1,.55)}},pump:{duration:1.4,play(e,t,n,r){let i=Bp(Fp(t,0,.24)),a=zp(Fp(t,.26,.4)),o=.5-.5*Up(Fp(t,.5,1.15)*Np*4),s=Y(Y(.86,1.23,i),1,a)+.11*o,c=Y(Y(.3,.2,i),.17,a)+.02*o;e.ik(J,`root`,.2,s,c),e.pole(J,1,-1,-.1),e.aim(J,.1,.45,1,-1,0,.15),e.shape(J,`fist`),e.spineAdd(.16*a*(1-.5*o)-.08*i*(1-a),-.14,.03),e.headAdd(-.16*i*(1-a)+.1*a,-.06,0),e.clav(J,.12*i*(1-a)+.06*o),e.squash(.05*a*(1-Fp(t,.4,.65))),e.face(t<.26?`determined`:`excited`),r.cross(.4)&&(r.fx(`star`,`handR`,8,0,.3,.1,.9),r.fx(`glowPop`,`handR`,1))}},clap:{duration:1.8,play(e,t,n,r){let i=Math.max(0,t-.2)*Np*2*3.2,a=.5+.5*Up(i),o=.027+.075*a;for(let t of kp)e.ik(t,`root`,o,1+.02*Hp(i*.5),.27),e.pole(t,1,-.7,-.25),e.aim(t,-.1,.75,.6,-1,0,.1),e.shape(t,`open`);e.spineAdd(.03*(1-a),0,0),e.headAdd(.06*(1-a)-.04,0,.08*Hp(i*.5)),e.face(`happy`);let s=Math.floor((i-Np)/(Np*2));i>Np&&s!==r.st.n&&(r.st.n=s,r.fx(`star`,`clap`,4,0,.35,.15,.7))}},shrug:{duration:1.4,play(e,t){let n=Bp(Fp(t,.04,.34))*(1-Lp(t,1,1.25)*.3);for(let t of kp)e.clav(t,.3*n),e.arm(t,.3,.12+.3*n,.95*n),e.elbow(t,.4+1.25*n),e.hand(t,-.35*n,1.25*n,0),e.shape(t,`open`);e.headAdd(-.06*n,0,.22*n),e.spineAdd(-.05*n,0,0),e.face(`meh`)}},facepalm:{duration:2,play(e,t,n,r){let i=Vp(t,.28,.5),a=Lp(t,.35,.75),o=Hp((t-.7)*17)*Lp(t,.7,.85)*(1-Lp(t,1.45,1.65));e.headAdd(.3*a-.1*i,.17*o,.04),e.spineAdd(.1*a,0,0),e.ik(J,`head`,.025,.075,.225),e.pole(J,1,-.6,.1),e.aim(J,-.6,.8,.05,0,-.15,-1),e.shape(J,`open`),e.face(t<.3?`surprised`:`ugh`),r.cross(.3)&&r.fx(`star`,`handR`,5,0,.2,.25,.6),r.cross(.85)&&r.fx(`sweat`,`headSideL`,1,0,0,0,0,.01,0,0)}},slam:{duration:1.6,play(e,t,n,r){let i=Lp(t,0,.34),a=zp(Fp(t,.36,.48)),o=t>=.48?Math.exp(-(t-.48)*6.5):0,s=Y(Y(.84,1.24,i),.84,a)+.04*o*Math.abs(Hp((t-.48)*22)),c=Y(Y(.335,.2,i),.36,a);for(let t of kp)e.ik(t,`root`,.16,s,c),e.pole(t,1,-.35,-.55),e.aim(t,-.1,-.15,1,-1,.3,0),e.shape(t,`fist`),e.clav(t,.15*i*(1-a)+.08*o);e.spineAdd(-.12*i+.26*a-.05*o,0,0),e.headAdd(-.18*i+.22*a,0,0),e.hips(Hp(t*70)*.01*o,-.012*o,0),e.squash(.08*o),e.face(t<.36?`angry`:`yell`),r.cross(.48)&&(r.event(`slam`),r.fx(`dust`,`handL`,6,.25,.12,.1,.9),r.fx(`dust`,`handR`,6,-.25,.12,.1,.9),r.fx(`anger`,`headSideR`,1),r.fx(`star`,`handL`,3,0,.4,0,.8),r.fx(`star`,`handR`,3,0,.4,0,.8))}},cry:{duration:2.6,play(e,t,n,r){let i=Hp(t*15);Lp(t,0,.3);for(let t of kp)e.ik(t,`head`,.1,-.1+.012*i*t,.165),e.pole(t,.7,-1,0),e.aim(t,-.45,.85,.2,0,.1,-1),e.shape(t,`fist`),e.clav(t,.1+.05*Math.abs(i));if(e.headAdd(.08+.05*Hp(t*7.5),.12*Hp(t*2.6),0),e.spineAdd(.08+.02*Math.abs(i),0,0),e.face(`cry`),t>.25&&t<n-.3)for(r.st.acc=(r.st.acc||0)+r.dt*30;r.st.acc>=1;){--r.st.acc;let e=r.rng()<.5?1:-1;r.fx(`tear`,e>0?`eyeL`:`eyeR`,1,e*(.5+r.rng()*.3),.18+r.rng()*.22,.28+r.rng()*.12,.04)}}},kiss:{duration:2,play(e,t,n,r){let i=Rp(Fp(t,.78,1.05));e.ik(J,`head`,-.005,-.105,.235),e.ik2(J,`root`,.16,1.3,.52,i),e.pole(J,1,-.6,-.2),e.aim(J,Y(-.4,.1,i),Y(.9,.6,i),Y(.1,.8,i),0,Y(0,.3,i),Y(-1,1,i)),e.shape(J,`open`);let a=Lp(t,.1,.5)*(1-i);e.headAdd(.08*a-.12*i,-.1,.16*a-.06*i),e.spineAdd(.06*a-.04*i,-.1*i,0),e.face(t<.8?`kiss`:`wink`),r.cross(.55)&&r.fx(`heart`,`mouth`,1,.05,.2,.3,.1,0,0,0,0,-1,.6),r.cross(1)&&(r.fx(`heart`,`handR`,6,0,.35,.6,.35),r.fx(`sparkle`,`handR`,5,0,.3,.4,.5))}},flex:{duration:2,play(e,t,n,r){let i=Bp(Fp(t,0,.35)),a=Vp(t,.5,.9)+Vp(t,1.1,1.5),o=Hp(t*26)*.03*a;for(let t of kp)e.arm(t,.12,Y(.3,1.5,i)+o,Y(0,1.5,i)),e.elbow(t,Y(.5,2.15,i)+.25*a),e.hand(t,.5,.2,0),e.shape(t,`fist`),e.bicep(t,.12*i+.4*a);e.spineAdd(-.1*i,.12*Hp(t*3.2)*Lp(t,.35,.6),0),e.headAdd(-.14*i,.18*Hp(t*3.2)*Lp(t,.35,.6),0),e.face(a>.5?`proud`:`cool`),(r.cross(.7)||r.cross(1.3))&&(r.fx(`sparkle`,`elbowL`,4,0,.2,.1,.5),r.fx(`sparkle`,`elbowR`,4,0,.2,.1,.5))}},allin:{duration:1.8,play(e,t,n,r){let i=Lp(t,0,.28),a=Bp(Fp(t,.3,.58));for(let t of kp){let n=Y(Y(.175,.13,i),.11,a),r=Y(Y(.84,.845,i),.83,a),o=Y(Y(.335,.25,i),.58,a);e.ik(t,`root`,n,r,o),e.pole(t,1,-.25,-.6),e.aim(t,-1,-.3,.25,-.1,-.2,1),e.shape(t,`claw`),e.clav(t,.1*i*(1-a))}e.spineAdd(-.06*i+.34*a,0,0),e.headAdd(-.06*i-.14*a,0,0),e.face(t<.3?`determined`:`yell`),r.cross(.5)&&(r.event(`allin`),r.fx(`speed`,`handL`,5,.1,.05,.6,.4),r.fx(`speed`,`handR`,5,-.1,.05,.6,.4),r.fx(`bang`,`headTop`,1,0,.15,0,0,.05,.02,0))}},deal:{duration:1.2,play(e,t){let n=Lp(t,0,.12)*(1-Lp(t,1.05,1.2)),r=Fp(t,.08,1.05)*3%1,i=r<.45?zp(r/.45):1-Lp(r,.45,1);e.ik(Op,`root`,Y(.17,.07,n),.835,Y(.36,.3,n)),e.pole(Op,1,-.4,-.5),e.aim(Op,-.45,.05,1,0,1,.05),e.shape(Op,`claw`),e.ik(J,`root`,Y(.17,Y(.04,.24,i),n),Y(.835,.85+.02*i,n),Y(.36,Y(.3,.52,i),n)),e.pole(J,1,-.4,-.5),e.aim(J,-.1,-1,.1,0,-.1,1),e.shape(J,`open`),e.spineAdd(.08*n,0,0),e.face(`normal`)}},push:{duration:1.4,play(e,t){let n=Lp(t,0,.25),r=Lp(t,.25,.7)*(1-Lp(t,1,1.4));for(let t of kp)e.ik(t,`root`,Y(Y(.17,.12,n),.09,r),.83,Y(Y(.36,.42,n),.62,r)),e.pole(t,1,-.25,-.6),e.aim(t,-1,-.3,.25,-.1,-.2,1),e.shape(t,`open`);e.spineAdd(.22*r,0,0),e.headAdd(-.08*r,0,0),e.face(`happy`)}},chiptrick:{duration:2.4,play(e,t,n,r){let i=Lp(t,0,.3);e.ik(J,`root`,.12,.99,.28),e.pole(J,1,-1,-.15),e.aim(J,-.45,.05,1,0,1,.05),e.shape(J,`claw`),e.headAdd(.24*i,-.22*i,-.06),e.spineAdd(.02,-.08,0),e.face(r.st.caught?`wink`:`cool`);let a=r.props,o=Lp(t,.05,.3)*(1-Lp(t,n-.35,n-.1));a.chips.visible=o>.01,a.chips.scale.setScalar(Math.max(.001,Bp(o))),a.chips.rotation.y=t*5;let s=.026,c=0;for(let[e,n]of Ap){let i=Fp(t,e,n);i>0&&i<1&&(s=.026+.56*i*(1-i),c=i*Np*4),r.cross(n)&&(r.st.caught=!0,r.fx(`sparkle`,`handR`,5,0,.25,0,.5)),r.cross(e)&&(r.st.caught=!1)}a.flip.position.set(0,s,0),a.flip.rotation.set(c,0,0)},end(e){e.props.chips.visible=!1}},taunt:{duration:1.8,play(e,t,n,r){let i=Bp(Fp(t,0,.3)),a=Math.max(0,Hp((t-.35)*12));e.arm(J,Y(.3,1.05,i),.22,.15),e.elbow(J,Y(.4,.65,i)),e.hand(J,-.3+1.25*a*Lp(t,.3,.4),1.45*i,0),e.shape(J,a>.5?`claw`:`open`),e.spineAdd(-.12*i,-.14*i,0),e.headAdd(-.2*i,-.08,-.12*i),e.face(`taunt`),r.cross(.55)&&r.fx(`anger`,`headSideL`,1,0,0,0,0,.01,0,0)}},dance:{duration:3,play(e,t,n,r){let i=t/.5,a=.5-.5*Up(Np*i),o=Hp(t*Np*2-Np/2),s=Math.abs(Hp(t*Np*2)),c=Lp(t,0,.25);for(let t of kp){let n=t===Op?a:1-a;e.arm(t,Y(.45,.35,n),Y(.35,2.45,n),Y(.4,0,n)),e.elbow(t,Y(1.7,.15,n)),e.hand(t,.2,0,0),e.shape(t,n>.5?`point`:`fist`)}if(e.spineAdd(.04*s,.22*o*c,-.14*o*c),e.chestAdd(0,.1*o,-.05*o),e.headAdd(.12*s-.06,-.18*o,.16*o),r.standing){e.hips(.04*o,-.035*s,0),e.hipRot(0,-.1*o,.06*o);for(let t of kp){let n=Math.max(0,t*o);e.legAdd(t,.25*s+.45*n,.05,0,.5*s+.9*n,-.2*n)}}else{e.hips(.008*o,.01*s,0);for(let t of kp)e.legAdd(t,0,0,0,-.5*Math.max(0,t*o),0)}e.face(`happy`);let l=Math.floor(i);l!==r.st.beat&&(r.st.beat=l,r.fx(`note`,`headTop`,1,(r.rng()-.5)*.3,.3,.05,.1,(r.rng()-.5)*.35,0,0))}},robot:{duration:3,play(e,t,n,r){let i=.3,a=Math.floor(t/i),o=(t-a*i)/i,s=Bp(Pp(o*2.6)),c=Kp[(a+Kp.length-1)%Kp.length],l=Kp[a%Kp.length];e.arm(Op,Y(c[0],l[0],s),Y(c[1],l[1],s),Y(c[2],l[2],s)),e.elbow(Op,Y(c[3],l[3],s)),e.arm(J,Y(c[4],l[4],s),Y(c[5],l[5],s),Y(c[6],l[6],s)),e.elbow(J,Y(c[7],l[7],s));for(let t of kp)e.hand(t,0,0,0),e.shape(t,`open`);if(e.headAdd(0,Y(c[8],l[8],s),0),e.spineAdd(0,Y(c[9],l[9],s),0),e.neckAdd(.02*Hp(o*Np),0,0),r.standing){let t=a%2?Op:J,n=Vp(o,0,1);e.legAdd(t,.5*n,0,0,.7*n,0),e.hips(0,-.012*n,0)}e.face(`robot`),a!==r.st.q&&(r.st.q=a,r.fx(`beep`,`headSideL`,1,0,0,0,0,0,.03,0))}},king:{duration:2.6,play(e,t,n,r){let i=Lp(t,0,.35);e.arm(J,.55,.42,.5),e.elbow(J,1.95),e.hand(J,.15,.55+.55*Hp(t*6.5),0),e.shape(J,`open`),e.spineAdd(-.09*i,-.08,0),e.headAdd(-.17*i,-.08,-.06*i),e.face(`smug`);let a=r.props,o=Bp(Fp(t,.2,.65))*(1-Lp(t,2.05,2.4));if(a.crown.visible=o>.01,a.crown.scale.setScalar(Math.max(.001,o)),a.crown.position.set(0,r.hatTop+.1+.02*Hp(t*3),-.02),a.crown.rotation.set(-.1,t*1.5,.06*Hp(t*2)),r.cross(.55)&&(r.fx(`glowPop`,`crown`,1),r.fx(`goldSpark`,`crown`,10,0,.1,0,.6)),t>.3&&t<2.1)for(r.st.acc=(r.st.acc||0)+r.dt*42;r.st.acc>=1;){--r.st.acc;let e=t*9+r.rng()*.4,n=.45+(t-.3)/1.8*1.15;for(let t of[0,Np])r.fx(`goldSpark`,`root`,1,0,.2,0,.05,Math.cos(e+t)*.34,n,Math.sin(e+t)*.3-.02)}},end(e){e.props.crown.visible=!1}},moneyrain:{duration:3,play(e,t,n,r){let i=Lp(t,0,.3);e.ik(J,`root`,.15,1.05,.26),e.pole(J,1,-1,-.2),e.aim(J,-.35,.1,1,0,1,.1),e.shape(J,`claw`);let a=t*3.4%1,o=a<.35?Rp(a/.35):1-Ip((a-.35)/.65);e.arm(Op,1+.3*o,.15+.55*o,.6),e.elbow(Op,1.7-.9*o),e.hand(Op,-.5*o,.8,0),e.shape(Op,`open`),e.spineAdd(.03,.12*Hp(t*6.8)*i,0),e.headAdd(-.1,.12*Hp(t*3.4),0),e.face(`money`);let s=r.props,c=Lp(t,.05,.3)*(1-Lp(t,n-.35,n-.1));s.bills.visible=c>.01,s.bills.scale.setScalar(Math.max(.001,c));let l=Math.floor(t*3.4);if(t>.3&&t<n-.4&&l!==r.st.flick){r.st.flick=l;for(let e=0;e<3;e++)r.fx(`bill`,`handL`,1,.5+r.rng()*.6,1.1+r.rng()*.5,.25+r.rng()*.5,.2);r.rng()<.5&&r.fx(`coin`,`handL`,1,.4,1.3,.3,.3)}if(t>.5&&t<n-.6)for(r.st.acc=(r.st.acc||0)+r.dt*12;r.st.acc>=1;){--r.st.acc;let e=r.rng()*Np*2,t=.15+r.rng()*.5;r.fx(`billRain`,`root`,1,0,-.4,0,.1,Math.cos(e)*t,1.95+r.rng()*.25,Math.sin(e)*t*.8)}},end(e){e.props.bills.visible=!1}},fireworks:{duration:3.2,play(e,t,n,r){let i=Bp(Fp(t,0,.35)),a=jp,o=Mp,s=0;for(let e of a)s+=Vp(t,e,e+.25);for(let t of kp)e.arm(t,.35,Y(.3,2.55,i)-.25*s,0),e.elbow(t,Y(.8,.25,i)+.5*s),e.hand(t,0,0,0),e.shape(t,`fist`);e.spineAdd(-.1*i,0,0),e.headAdd(-.26*i,0,0),e.face(`excited`);let c=r.hatTopY;for(let e=0;e<a.length;e++){let n=a[e],i=.45,s=(t-n)/i,l=o[e],u=.55+e%2*.18;if(s>0&&s<1){let e=c+u*Rp(s);r.fx(`rocket`,`root`,1,0,0,0,0,l*s,e,.05),r.fx(`trail`,`root`,2,0,-.3,0,.12,l*s,e,.05)}if(r.cross(n+i)){let t=e;r.fx(`burst`,`root`,34,0,.1,0,0,l,c+u,.05,1.05,t),r.fx(`burstStar`,`root`,10,0,.1,0,0,l,c+u,.05,.7),r.fx(`flash`,`root`,1,0,0,0,0,l,c+u,.05),r.event(`firework`,e)}}}}};function Jp(e,t){if(!e)return null;let n=t&&t[e];return n&&n.slot===`motion`?n.params?.motion||null:qp[e]?e:typeof e==`string`&&e.startsWith(`mo_`)&&qp[e.slice(3)]?e.slice(3):null}var Yp={skin:`skin_2`,hair:`hair_short`,hairColor:`hc_black`,top:`top_tee`,topColor:`tc_navy`,hat:`hat_none`,glasses:`gl_none`,neck:`nk_none`,aura:`au_none`,cardBack:`cb_classic`,frame:`fr_basic`,emotes:[`mo_wave`,`mo_nod`,`mo_think`,`mo_thumbs`],win:`mo_pump`,allin:`mo_thumbs`},Xp={skin:{color:`#f3c39b`},hair:{style:`short`},hairColor:{color:`#1d1a1a`},top:{style:`tee`},topColor:{color:`#24345c`},hat:{style:`none`},glasses:{style:`none`},neck:{style:`none`},aura:{style:`none`}},Zp=[`hips`,`spine`,`chest`,`neck`,`head`,`shL`,`uaL`,`elL`,`haL`,`shR`,`uaR`,`elR`,`haR`,`thL`,`knL`,`ftL`,`thR`,`knR`,`ftR`],X={};Zp.forEach((e,t)=>{X[e]=t});var Qp=Zp.length,$p=Qp*3,em=$p+3,tm=em+1,nm=tm+2,rm=Zp.map((e,t)=>t<=X.head?`YXZ`:`XZY`),im={hips:null,spine:`hips`,chest:`spine`,neck:`chest`,head:`neck`,shL:`chest`,uaL:`shL`,elL:`uaL`,haL:`elL`,shR:`chest`,uaR:`shR`,elR:`uaR`,haR:`elR`,thL:`hips`,knL:`thL`,ftL:`knL`,thR:`hips`,knR:`thR`,ftR:`knR`};function am(e){let t=e.endsWith(`L`)?1:-1;switch(e){case`hips`:return[0,0,0];case`spine`:return wf.spine;case`chest`:return wf.chest;case`neck`:return wf.neck;case`head`:return wf.head;case`shL`:case`shR`:return[wf.shoulder[0]*t,wf.shoulder[1],wf.shoulder[2]];case`uaL`:case`uaR`:return[wf.upperArm[0]*t,0,0];case`elL`:case`elR`:return[0,-wf.upperLen,0];case`haL`:case`haR`:return[0,-wf.foreLen,0];case`thL`:case`thR`:return[wf.hipJoint[0]*t,wf.hipJoint[1],0];case`knL`:case`knR`:return[0,-wf.thighLen,0];case`ftL`:case`ftR`:return[0,-wf.shinLen,0];default:return[0,0,0]}}var om=e=>e>0?0:1,sm=[1,-1],cm=[X.uaL,X.uaR],lm=[X.elL,X.elR],um=[X.haL,X.haR],dm=[X.shL,X.shR],fm=[X.thL,X.thR],pm=[X.knL,X.knR],mm=[X.ftL,X.ftR],hm=class{constructor(){this.a=new Float32Array(nm),this.ikOn=[!1,!1],this.ikSpace=[`root`,`root`],this.ikT=[new V,new V],this.ikSpace2=[`root`,`root`],this.ikT2=[new V,new V],this.ikMix=[0,0],this.poleV=[new V(1,-.5,-.4),new V(-1,-.5,-.4)],this.aimOn=[!1,!1],this.aimF=[new V,new V],this.aimN=[new V,new V],this.aimOff=[new V,new V],this.shapes=[`rest`,`rest`],this.expr=null}reset(){this.a.fill(0);for(let e=0;e<2;e++)this.ikOn[e]=!1,this.ikMix[e]=0,this.aimOn[e]=!1,this.aimOff[e].set(0,0,0),this.shapes[e]=`rest`;this.expr=null}copyFrom(e){this.a.set(e.a);for(let t=0;t<2;t++)this.ikOn[t]=e.ikOn[t],this.ikSpace[t]=e.ikSpace[t],this.ikT[t].copy(e.ikT[t]),this.ikSpace2[t]=e.ikSpace2[t],this.ikT2[t].copy(e.ikT2[t]),this.ikMix[t]=e.ikMix[t],this.poleV[t].copy(e.poleV[t]),this.aimOn[t]=e.aimOn[t],this.aimF[t].copy(e.aimF[t]),this.aimN[t].copy(e.aimN[t]),this.aimOff[t].copy(e.aimOff[t]),this.shapes[t]=e.shapes[t];this.expr=e.expr}_set(e,t,n,r){let i=this.a,a=e*3;i[a]=t,i[a+1]=n,i[a+2]=r}_add(e,t,n,r){let i=this.a,a=e*3;i[a]+=t,i[a+1]+=n,i[a+2]+=r}arm(e,t,n,r=0){let i=om(e);this._set(cm[i],-t,r*e,n*e),this.ikOn[i]=!1,this.aimOn[i]=!1}armAdd(e,t,n,r=0){this._add(cm[om(e)],-t,r*e,n*e)}elbow(e,t,n=0){let r=om(e);this._set(lm[r],-t,n*e,0),this.ikOn[r]=!1}hand(e,t,n=0,r=0){let i=om(e);this._set(um[i],r,n*e,-t*e),this.aimOn[i]=!1}clav(e,t,n=0){this._set(dm[om(e)],0,-n*e,t*e)}clavAdd(e,t,n=0){this._add(dm[om(e)],0,-n*e,t*e)}spine(e,t=0,n=0){this._set(X.spine,e,t,n)}spineAdd(e,t=0,n=0){this._add(X.spine,e,t,n)}chest(e,t=0,n=0){this._set(X.chest,e,t,n)}chestAdd(e,t=0,n=0){this._add(X.chest,e,t,n)}neck(e,t=0,n=0){this._set(X.neck,e,t,n)}neckAdd(e,t=0,n=0){this._add(X.neck,e,t,n)}head(e,t=0,n=0){this._set(X.head,e,t,n)}headAdd(e,t=0,n=0){this._add(X.head,e,t,n)}hipRot(e,t=0,n=0){this._add(X.hips,e,t,n)}hips(e,t,n){let r=this.a;r[$p]+=e,r[$p+1]+=t,r[$p+2]+=n}leg(e,t,n,r,i,a=0){let o=om(e);this._set(fm[o],-t,r*e,n*e),this._set(pm[o],i,0,0),this._set(mm[o],a,0,0)}legAdd(e,t,n,r,i,a=0){let o=om(e);this._add(fm[o],-t,r*e,n*e),this._add(pm[o],i,0,0),this._add(mm[o],a,0,0)}ik(e,t,n,r,i){let a=om(e);this.ikOn[a]=!0,this.ikSpace[a]=t,this.ikT[a].set(n*e,r,i),this.ikMix[a]=0}ik2(e,t,n,r,i,a){let o=om(e);this.ikSpace2[o]=t,this.ikT2[o].set(n*e,r,i),this.ikMix[o]=a}pole(e,t,n,r){this.poleV[om(e)].set(t*e,n,r)}aim(e,t,n,r,i,a,o){let s=om(e);this.aimOn[s]=!0,this.aimF[s].set(t*e,n,r),this.aimN[s].set(i*e,a,o),this.aimOff[s].set(0,0,0)}aimAdd(e,t,n=0,r=0){this.aimOff[om(e)].set(t,n,r)}shape(e,t){this.shapes[om(e)]=t}squash(e){this.a[em]=e}bicep(e,t){this.a[tm+om(e)]=t}face(e){this.expr=e}},gm=new En,_m=new qt,vm=new qt,ym=new qt,bm=new V,xm=new V,Sm=new V,Cm=new V,wm=new V,Tm=new V,Em=new V,Dm=new V,Om=new V,km=new V,Am=new V,jm=new V,Mm=new V,Nm=new V,Pm=new V,Fm=new U;new U;var Im=new U,Lm=new U,Rm=new U,zm=new U,Bm=new U,Vm=new U,Hm=new U,Um=[new U,new U],Wm=new V(1,1,1),Gm={};for(let e of Zp)Gm[e]=new V(...am(e));var Km=new V(...wf.headCenter),qm=Km.clone().multiplyScalar(Cf);function Jm(e,t,n,r){return r>0?e[n]+(t[n]-e[n])*r:e[n]}function Ym(e,t,n){let r=t*3;return gm.set(e[r],e[r+1],e[r+2],rm[t]),n.setFromEuler(gm)}function Xm(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Zm=(e,t,n)=>e<t?t:e>n?n:e,Qm=(e,t,n)=>e+(t-e)*n,$m=Math.PI/180,eh=70*$m,th=25*$m,nh={t:[.175,.845,.32],pole:[1,-.6,-.45],f:[-.18,-.25,1],n:[.05,-1,.12]},rh={t:[.115,.835,.315],pole:[1,-.4,-.5],f:[-.5,-.3,1],n:[-.3,-1,.3]},ih=[{t:[-.05,.83,.17],pole:[1,-1,.1],f:[-1,.05,.15],n:[0,-.4,-1]},{t:[-.07,.865,.195],pole:[1,-.9,.15],f:[-1,.1,.1],n:[0,.2,-1]}],ah={t:[.228,.6,.03],pole:[.25,.1,-1],f:[.03,-1,.12],n:[-1,0,.1]},oh=1,sh=class{constructor(e,t,n={}){this.catalog=t||{},this.seated=n.seated!==!1;let r=n.seed??oh++*9301+49297;this.rng=Xm(r),this.phase=this.rng()*100,this.hipsY=this.seated?wf.hipsSeated:wf.hipsStanding,this.headY=this.hipsY+wf.spine[1]+wf.chest[1]+wf.neck[1]+wf.head[1]+wf.headCenter[1]*Cf,this.group=new Wn,this.group.name=`Avatar`,this.hudAnchor=new Un,this.hudAnchor.name=`hudAnchor`,this.group.add(this.hudAnchor),this.onEvent=null,this.state={acting:!1,folded:!1,allIn:!1,winner:!1},this.sw={acting:0,folded:0,allIn:0,winner:0},this.grey=0,this._greyAcc=0,this.baseExpr=`normal`,this._t=0,this._hasLook=!1,this._lookTarget=new V,this._lookY=0,this._lookP=0,this._glance={y:0,p:0,timer:1.5+this.rng()*2,on:!1},this._blinkT=1.8+this.rng()*2.5,this._blinking=0,this._gaze=[0,0],this._faceKey=``,this._fk={e:``,b:0,g:0,x:0,y:0},this._shape=[``,``],this.mo=null,this._snapW=0,this._snapQ=Array.from({length:Qp},()=>new qt),this._snapPos=new V,this._snapReady=!1,this._auraAcc=0,this._glintT=1,this._sig={},this._halo=[],this._hatTop=.22,this.PB=new hm,this.PM=new hm,this._buildRig(),this._buildBody(),this._buildFace(),this._buildFx(),this._buildProps(),this._buildMotionCtx(),this.setLoadout(e||Yp),this.update(0,0)}_buildRig(){this.joints=[];for(let e of Zp){let t=new Wn;t.name=e,t.position.copy(Gm[e]),this.joints.push(t)}for(let e of Zp){let t=im[e];(t?this.joints[X[t]]:this.group).add(this.joints[X[e]])}this.joints[X.hips].position.set(0,this.hipsY,0),this.headC=new Wn,this.headC.name=`headCenter`,this.headC.position.copy(Km).multiplyScalar(Cf),this.headC.scale.setScalar(Cf),this.joints[X.head].add(this.headC),this.hairG=new Wn,this.hatG=new Wn,this.glassesG=new Wn,this.headC.add(this.hairG,this.hatG,this.glassesG),this.neckG=new Wn,this.topG=new Wn,this.joints[X.chest].add(this.neckG,this.topG)}_mesh(e,t,n,r=!1){let i=new Pi(e,af(`toon:#ff00ff`));if(i.userData.tok=t,n.add(i),r){let t=new Pi(e,Qd());t.userData.outline=!0,i.add(t)}return i}_buildBody(){let e=Uf(),t=this.joints,n=this.body={};n.head=this._mesh(e.head,`skin`,this.headC,!0),n.earL=this._mesh(e.ear,`skin`,this.headC),n.earL.position.set(.196,-.022,-.005),n.earR=this._mesh(e.ear,`skin`,this.headC),n.earR.position.set(-.196,-.022,-.005),n.neck=this._mesh(e.neck,`skin`,t[X.neck]),n.torso=this._mesh(e.torso,`topTex`,t[X.spine],!0),n.pelvis=this._mesh(e.pelvis,`pants`,t[X.hips]),this.arms=[],this.hands=[];for(let n=0;n<2;n++){let r=n===0?1:-1,i=this._mesh(e.upperArm,`top`,t[cm[n]]),a=this._mesh(e.sleeveShort,`top`,t[cm[n]]),o=this._mesh(e.foreArm,`skin`,t[lm[n]]);this.arms.push({ua:i,sleeve:a,fa:o});let s=this._mesh(e.palm,`skin`,t[um[n]]),c=this._mesh(e.digit,`skin`,t[um[n]]),l=this._mesh(e.finger,`skin`,t[um[n]]);this.hands.push({palm:s,thumb:c,finger:l,s:r}),this._mesh(e.thigh,`pants`,t[fm[n]]),this._mesh(e.shin,`pants`,t[pm[n]]),this._mesh(e.shoe,[`shoe`,`sole`],t[mm[n]])}}_buildFace(){let e=document.createElement(`canvas`);e.width=Tf.W,e.height=Tf.H,this._faceCanvas=e,this._faceCtx=e.getContext(`2d`);let t=new aa(e);t.colorSpace=nt,t.anisotropy=4,this._faceTex=t,this._faceMetal=null,this._faceMat=null,this.body.face=new Pi(Uf().face,af(`toon:#ffffff`)),this.headC.add(this.body.face)}_ensureFaceMaterial(e){this._faceMetal===e&&this._faceMat||(this._faceMat&&this._faceMat.dispose(),this._faceMetal=e,this._faceMat=e?new ts({map:this._faceTex,matcap:qd(this.look.skin)}):Gd({map:this._faceTex,color:16777215}),this.body.face.material=this._faceMat,this._faceKey=``)}_buildFx(){this.aura=new gf(140,!0,this.rng),this.fxN=new gf(150,!1,this.rng),this.fxG=new gf(260,!0,this.rng),this.group.add(this.aura.points,this.fxN.points,this.fxG.points),this._q={n:0,name:Array(64),anchor:Array(64),num:new Float32Array(768),cap:64}}_buildProps(){let e=sp(),t=this.joints[X.haR],n=new Wn;n.name=`chipProp`,n.position.set(.038,-.042,.005),n.rotation.order=`ZYX`,n.rotation.z=-Math.PI/2;let r=af(`tex:chip|side|#c62f3a|#ffffff`),i=af(`tex:chip|cap|#c62f3a|#ffffff`),a=new Ki(e.chip,[r,i,i],4);for(let e=0;e<4;e++)Fm.makeRotationY(e*.7).setPosition(0,e*.0068,0),a.setMatrixAt(e,Fm);a.instanceMatrix.needsUpdate=!0;let o=new Pi(e.chip,[af(`tex:chip|side|#1d1d24|#ffcf40`),af(`tex:chip|cap|#1d1d24|#ffcf40`),af(`tex:chip|cap|#1d1d24|#ffcf40`)]);o.position.y=.026,o.scale.setScalar(1.15),n.add(a,o),n.visible=!1,t.add(n);let s=new Pi(e.bills,af(`tex:bill`));s.position.set(.04,-.045,0),s.rotation.z=-Math.PI/2,s.visible=!1,t.add(s);let c=new Wn,l=tp(`crown`);for(let e of l){let t=new Pi(e.geo,af(e.mat));t.position.set(0,-.215,.03),c.add(t)}c.visible=!1,this.headC.add(c),this.props={chips:n,stack:a,flip:o,bills:s,crown:c}}_buildMotionCtx(){let e=this,t=this._q,n={dt:0,t:0,prev:-1,st:null,standing:!this.seated,props:this.props,hatTop:.22,hatTopY:1.5,rng:this.rng,cross(e){return n.prev<e&&n.t>=e},fx(e,n,r=1,i=0,a=0,o=0,s=0,c=0,l=0,u=0,d=0,f=-1,p=1){if(t.n>=t.cap||!Wp[e])return;let m=t.n++;t.name[m]=e,t.anchor[m]=n;let h=m*12,g=t.num;g[h]=r,g[h+1]=i,g[h+2]=a,g[h+3]=o,g[h+4]=s,g[h+5]=c,g[h+6]=l,g[h+7]=u,g[h+8]=d,g[h+9]=f,g[h+10]=p},event(t,n){if(e.onEvent)try{e.onEvent(t,n,e)}catch(e){console.error(e)}}};this._m=n;let r=this.joints,i=(e,t,n)=>new V(e,t,n);this._anchors={handL:[r[X.haL],i(0,-.045,0)],handR:[r[X.haR],i(0,-.045,0)],thumbR:[r[X.haR],i(0,-.02,.09)],elbowL:[r[X.elL],i(0,.02,0)],elbowR:[r[X.elR],i(0,.02,0)],eyeL:[this.headC,i(...Dp.eyeL)],eyeR:[this.headC,i(...Dp.eyeR)],mouth:[this.headC,i(...Dp.mouth)],headTop:[this.headC,i(0,.25,0)],headSideL:[this.headC,i(.2,.13,.07)],headSideR:[this.headC,i(-.2,.13,.07)],chest:[r[X.chest],i(0,.08,.14)],crown:[this.props.crown,i(0,0,0)]}}_param(e,t){let n=t&&this.catalog[t];return n&&n.slot===e||(n=this.catalog[Yp[e]]),!n||n.slot!==e?Xp[e]:n.params||Xp[e]}setLoadout(e){let t={...Yp,...e||{}};this.loadout=t;let n=e=>this._param(e,t[e]),r=n(`skin`),i=n(`hair`),a=n(`hairColor`),o=n(`top`),s=n(`topColor`),c=n(`hat`),l=n(`glasses`),u=n(`neck`),d=n(`aura`),f=(e,t,n)=>e&&t[e]!==void 0?e:n,p={skin:r.color||Xp.skin.color,skinMetal:!!r.metal,hair:a.color||Xp.hairColor.color,rainbow:!!a.rainbow,hairStyle:f(i.style,Qf,`short`),topStyle:f(o.style,ap,`tee`),top:s.color||Xp.topColor.color,topMetal:!!s.metal,hat:f(c.style,ep,`none`),glasses:[`none`,`round`,`sun`,`star`,`cyber`].includes(l.style)?l.style:`none`,neck:[`none`,`bowtie`,`scarf`,`chain`,`medal`].includes(u.style)?u.style:`none`,aura:Gp[d.style]?d.style:`none`};this.look=p;let m=this._sig,h=ep[p.hat].cover,g=`${p.hairStyle}|${h}`;m.hair!==g&&(m.hair=g,this._rebuild(this.hairG,$f(p.hairStyle,h)));let _=`${p.hat}|${p.hairStyle}`;m.hat!==_&&(m.hat=_,this._rebuild(this.hatG,tp(p.hat)),this._halo=this.hatG.children.filter(e=>e.userData.tag===`halo`),this._halo.forEach(e=>{e.userData.y0=e.position.y}),this._placeHat()),m.glasses!==p.glasses&&(m.glasses=p.glasses,this._rebuild(this.glassesG,np(p.glasses))),m.neck!==p.neck&&(m.neck=p.neck,this._rebuild(this.neckG,rp(p.neck))),m.top!==p.topStyle&&(m.top=p.topStyle,this._rebuild(this.topG,op(p.topStyle)));for(let e of this.topG.children)e.userData.tag===`tuxbow`&&(e.visible=p.neck!==`bowtie`&&p.neck!==`scarf`);m.aura!==p.aura&&(m.aura=p.aura,this.aura.clear(),this._auraAcc=0,p.aura!==`none`&&this.aura.setAdditive(Gp[p.aura].additive));let v=ap[p.topStyle].short,y=Uf();for(let e of this.arms)e.ua.userData.tok=v?`skin`:`top`,e.sleeve.visible=v,e.fa.geometry=v?y.foreArm:y.sleeveLong,e.fa.userData.tok=v?`skin`:`top`;this._ensureFaceMaterial(p.skinMetal),p.skinMetal&&this._faceMat.matcap!==qd(p.skin)&&(this._faceMat.matcap=qd(p.skin)),this._refreshMaterials();let b=this._hatTopLocal()*Cf;this._hatTop=b,this._anchors.headTop[1].set(0,b/Cf+.05,0),this._m.hatTop=b/Cf,this._m.hatTopY=this.headY+b+.05,this.hudAnchor.position.set(0,this.headY+b+.08,0),this._faceKey=``}_hatTopLocal(){let e=this.look,t=Qf[e.hairStyle]??.22,n=ep[e.hat];if(e.hat===`none`)return t;let r=this.hatG.position.y,i=this.hatG.scale.y;return Math.max(n.cover?0:t,n.top*i+r)}_placeHat(){let e=this.look,t=this.hatG;t.position.set(0,0,0),t.scale.setScalar(1);let n=e.hat;if(e.hairStyle===`afro`)n===`cowboy`?(t.position.set(0,.125,-.06),t.scale.setScalar(1.02)):n===`tophat`?(t.position.set(0,.14,-.06),t.scale.setScalar(1)):ep[n].cover?(t.position.set(0,.11,-.055),t.scale.setScalar(1.24)):n===`headphones`?(t.position.set(0,.035,-.035),t.scale.setScalar(1.3)):n===`visor`?(t.position.set(0,.01,-.02),t.scale.setScalar(1.18)):n===`crown`||n===`halo`?(t.position.set(0,.14,-.06),t.scale.setScalar(1.08)):n===`horns`&&(t.position.set(0,.1,-.04),t.scale.setScalar(1.15));else if(!ep[n].cover&&(n===`crown`||n===`halo`)){let n=Math.max(0,(Qf[e.hairStyle]??.22)-.235);t.position.set(0,n*.85,0)}}_rebuild(e,t){for(;e.children.length;)e.remove(e.children[0]);for(let n of t){let t=this._mesh(n.geo,n.mat,e,!!n.outline);n.pos&&t.position.set(n.pos[0],n.pos[1],n.pos[2]),n.rot&&t.rotation.set(n.rot[0],n.rot[1],n.rot[2]),n.tag&&(t.userData.tag=n.tag)}}_resolveTok(e){let t=this.look,n=this.grey;switch(e){case`skin`:return af((t.skinMetal?`gold:`:`toon:`)+t.skin,n);case`hair`:return t.rainbow?af(`rainbow`,n):af(`toon:`+t.hair,n);case`hairShaved`:return af(`toon:`+Ld(t.rainbow?`#ff7eb6`:t.hair,t.skinMetal?`#d9a830`:t.skin,.55),n);case`top`:return t.topMetal?af(`gold:`+t.top,n):t.topStyle===`hawaii`?af(`tex:sleeve|hawaii|`+t.top,n):af(`toon:`+t.top,n);case`topTex`:return t.topMetal?af(`texgold:top|${t.topStyle}|#ffffff:${t.top}`,n):af(`tex:top|${t.topStyle}|${t.top}`,n);case`topDark`:case`topDark:d`:return t.topMetal?af(`gold:`+Id(t.top,-.12)+(e.endsWith(`:d`)?`:d`:``),n):t.topStyle===`hawaii`&&e===`topDark`?af(`tex:sleeve|hawaii|`+t.top,n):af(`toon:`+Id(t.top,-.28)+(e.endsWith(`:d`)?`:d`:``),n);case`pants`:return af(`toon:#363b52`,n);case`shoe`:return af(`toon:#f4f1ec`,n);case`sole`:return af(`toon:#4a4f68`,n);default:return af(e,n)}}_refreshMaterials(){let e=t=>{let n=t.userData.tok;n&&t.isMesh&&(t.material=Array.isArray(n)?n.map(e=>this._resolveTok(e)):this._resolveTok(n));for(let n of t.children)e(n)};for(let t of this.group.children)e(t)}playMotion(e){let t=Jp(e,this.catalog);if(!t||!qp[t])return 0;let n=qp[t],r=n.duration,i=this.catalog[e];if(i&&i.params&&i.params.duration)r=i.params.duration;else for(let e in this.catalog){let n=this.catalog[e];if(n&&n.slot===`motion`&&n.params&&n.params.motion===t&&n.params.duration){r=n.params.duration;break}}return this._takeSnapshot(),this.mo&&this._endMotion(),this.mo={name:t,def:n,t:0,prev:-1,dur:r,st:{}},r}stopMotion(){this.mo&&(this._takeSnapshot(),this._endMotion())}get motion(){return this.mo?this.mo.name:null}setExpression(e){this.baseExpr=pp[e]?e:`normal`}lookAt(e){e&&e.isVector3?(this._lookTarget.copy(e),this._hasLook=!0):e&&typeof e.x==`number`?(this._lookTarget.set(e.x,e.y,e.z),this._hasLook=!0):this._hasLook=!1}setState(e={}){for(let t of[`acting`,`folded`,`allIn`,`winner`])typeof e[t]==`boolean`&&(this.state[t]=e[t])}dispose(){this.group.removeFromParent(),this._faceTex.dispose(),this._faceMat&&this._faceMat.dispose(),this.aura.dispose(),this.fxN.dispose(),this.fxG.dispose(),this.props.stack.dispose(),this.mo=null}_endMotion(){let e=this.mo;this.mo=null,e&&e.def.end&&(this._m.st=e.st,e.def.end(this._m)),this.props.chips.visible=!1,this.props.bills.visible=!1,this.props.crown.visible=!1}_takeSnapshot(){if(this._snapReady){for(let e=0;e<Qp;e++)this._snapQ[e].copy(this.joints[e].quaternion);this._snapPos.copy(this.joints[X.hips].position),this._snapW=1}}_chain(e){let t=e.a;Ym(t,X.hips,_m),Lm.compose(bm.set(t[$p],this.hipsY+t[$p+1],t[$p+2]),_m,Wm),Ym(t,X.spine,_m),Fm.compose(Gm.spine,_m,Wm),Rm.multiplyMatrices(Lm,Fm),Ym(t,X.chest,_m),bm.copy(Gm.chest),bm.y*=1-t[em],Fm.compose(bm,_m,Wm),zm.multiplyMatrices(Rm,Fm),Ym(t,X.neck,_m),Fm.compose(Gm.neck,_m,Wm),Bm.multiplyMatrices(zm,Fm),Ym(t,X.head,_m),Fm.compose(Gm.head,_m,Wm),Vm.multiplyMatrices(Bm,Fm),Fm.makeTranslation(qm.x,qm.y,qm.z),Hm.multiplyMatrices(Vm,Fm);for(let e=0;e<2;e++)Ym(t,dm[e],_m),Fm.compose(e===0?Gm.shL:Gm.shR,_m,Wm),Um[e].multiplyMatrices(zm,Fm)}_resolve(e){if(e.ikOn[0]||e.ikOn[1]||e.aimOn[0]||e.aimOn[1]){this._chain(e);for(let t=0;t<2;t++)e.ikOn[t]&&this._solveArm(e,t),e.aimOn[t]&&this._aimHand(e,t)}}_solveArm(e,t){let n=t===0?1:-1,r=e.a;Cm.copy(e.ikT[t]),e.ikSpace[t]===`head`&&Cm.applyMatrix4(Hm),e.ikMix[t]>0&&(wm.copy(e.ikT2[t]),e.ikSpace2[t]===`head`&&wm.applyMatrix4(Hm),Cm.lerp(wm,e.ikMix[t])),Im.copy(Um[t]).invert(),Cm.applyMatrix4(Im),Dm.copy(e.poleV[t]).transformDirection(Im),Tm.set(n*wf.upperArm[0],0,0);let i=wf.upperLen,a=wf.foreLen;Em.subVectors(Cm,Tm);let o=Em.length();o<1e-5?Em.set(0,-1,0):Em.multiplyScalar(1/o),o=Zm(o,Math.abs(i-a)+.03,i+a-.003);let s=(i*i-a*a+o*o)/(2*o),c=Math.sqrt(Math.max(0,i*i-s*s));xm.copy(Dm).addScaledVector(Em,-Dm.dot(Em)),xm.lengthSq()<1e-8&&xm.set(0,0,-1).addScaledVector(Em,-Em.z),xm.normalize(),Om.copy(Tm).addScaledVector(Em,s).addScaledVector(xm,c),km.subVectors(Om,Tm).normalize(),Am.copy(Tm).addScaledVector(Em,o),jm.subVectors(Am,Om).normalize(),Nm.copy(km).negate(),Pm.copy(jm).addScaledVector(km,-jm.dot(km)),Pm.lengthSq()<1e-8&&Pm.copy(xm).negate().addScaledVector(km,xm.dot(km)),Pm.normalize(),Mm.crossVectors(Nm,Pm),Fm.makeBasis(Mm,Nm,Pm),gm.setFromRotationMatrix(Fm,`XZY`);let l=cm[t]*3;r[l]=gm.x,r[l+1]=gm.y,r[l+2]=gm.z;let u=Math.acos(Zm(km.dot(jm),-1,1)),d=lm[t]*3;r[d]=-u,r[d+1]=0,r[d+2]=0}_aimHand(e,t){let n=t===0?1:-1,r=e.a;_m.setFromRotationMatrix(Um[t]),Ym(r,cm[t],vm),_m.multiply(vm),Ym(r,lm[t],vm),_m.multiply(vm),Nm.copy(e.aimF[t]).normalize().negate(),Mm.copy(e.aimN[t]).normalize().multiplyScalar(-n),Pm.crossVectors(Mm,Nm),Pm.lengthSq()<1e-8&&Pm.set(0,0,1),Pm.normalize(),Mm.crossVectors(Nm,Pm).normalize(),Fm.makeBasis(Mm,Nm,Pm),vm.setFromRotationMatrix(Fm),_m.invert().multiply(vm);let i=e.aimOff[t];(i.x||i.y||i.z)&&(gm.set(i.z,i.y*n,-i.x*n,`XZY`),ym.setFromEuler(gm),_m.multiply(ym)),gm.setFromQuaternion(_m,`XZY`);let a=um[t]*3;r[a]=gm.x,r[a+1]=gm.y,r[a+2]=gm.z}_buildBase(e){let t=this.PB;t.reset();let n=this._t,r=this.phase,i=this.sw,a=Math.sin(n*1.7+r),o=Math.sin(n*.63+r*1.7),s=i.acting,c=i.folded,l=i.allIn,u=i.winner,d=s*Math.max(0,Math.sin(n*13))*+(Math.sin(n*1.4+r)>-.2);if(this.seated){t.spine(.14+.07*s+.1*l-.19*c+.008*a,.025*o-.12*c,.012*Math.sin(n*.47+r)),t.chest(-.012*a,0,0),t.head(-.09-.04*s+.2*c-.08*l+.025*Math.sin(n*.9+r),.04*Math.sin(n*.37+r*3)+.25*c,.035*Math.sin(n*.55+r*2)+.08*s*Math.sin(n*.8));for(let e of sm){t.clav(e,.018*a+.13*l+.03*c);let i=.08*Math.sin(n*1.1+r+(e>0?0:1.8));t.leg(e,Math.PI/2-.06,.1,.05,Math.PI/2-.12+i,.1)}for(let e=0;e<2;e++){let n=e===0?1:-1,r=ih[e],i=Qm(Qm(nh.t[0],rh.t[0],l),r.t[0],c),a=Qm(Qm(nh.t[1],rh.t[1],l),r.t[1],c)+(e===1?.012*d:0),o=Qm(Qm(nh.t[2],rh.t[2],l),r.t[2],c);t.ik(n,`root`,i,a,o),t.pole(n,Qm(Qm(nh.pole[0],rh.pole[0],l),r.pole[0],c),Qm(Qm(nh.pole[1],rh.pole[1],l),r.pole[1],c),Qm(Qm(nh.pole[2],rh.pole[2],l),r.pole[2],c)),t.aim(n,Qm(Qm(nh.f[0],rh.f[0],l),r.f[0],c),Qm(Qm(nh.f[1],rh.f[1],l),r.f[1],c),Qm(Qm(nh.f[2],rh.f[2],l),r.f[2],c),Qm(Qm(nh.n[0],rh.n[0],l),r.n[0],c),Qm(Qm(nh.n[1],rh.n[1],l),r.n[1],c),Qm(Qm(nh.n[2],rh.n[2],l),r.n[2],c)),e===1&&s>.01&&t.aimAdd(n,.1+.55*d,0,0),t.shape(n,c>.5?`rest`:l>.5?`fist`:e===1&&s>.5?`point`:`rest`)}}else{t.hips(.008*o,.003*a,0),t.hipRot(0,.04*o,.025*o),t.spine(.02-.08*c+.05*s+.008*a,.02*o,-.03*o),t.chest(-.012*a,0,0),t.head(-.03+.15*c+.02*Math.sin(n*.9+r),.05*Math.sin(n*.37+r*3)+.2*c,.03*Math.sin(n*.55+r*2)+.02*o);for(let e of sm){t.clav(e,.018*a+.1*l);let n=Math.max(0,e*o);t.leg(e,.03+.06*n,.04,.05,.05+.14*n,-.02-.06*n)}for(let e=0;e<2;e++){let i=e===0?1:-1,o=ih[e],s=.008*Math.sin(n*1.2+r+e);t.ik(i,`root`,Qm(ah.t[0]+s,o.t[0],c),Qm(ah.t[1]+.005*a,o.t[1]-.02,c),Qm(ah.t[2],o.t[2],c)),t.pole(i,Qm(ah.pole[0],o.pole[0],c),Qm(ah.pole[1],o.pole[1],c),Qm(ah.pole[2],o.pole[2],c)),t.aim(i,Qm(ah.f[0],o.f[0],c),Qm(ah.f[1],o.f[1],c),Qm(ah.f[2],o.f[2],c),Qm(ah.n[0],o.n[0],c),Qm(ah.n[1],o.n[1],c),Qm(ah.n[2],o.n[2],c)),t.shape(i,l>.5?`fist`:`rest`)}}u>.001&&(t.hips(0,.014*u*Math.abs(Math.sin(n*5.2)),0),t.headAdd(-.04*u,0,.07*u*Math.sin(n*2.6)),t.spineAdd(0,.05*u*Math.sin(n*2.6),0)),l>.001&&t.spineAdd(.005*l*Math.sin(n*37),0,.005*l*Math.sin(n*29)),t.headAdd(-this._lookP*.62,this._lookY*.62,0),t.neckAdd(-this._lookP*.2,this._lookY*.22,0),t.spineAdd(0,this._lookY*.16,0),this._resolve(t)}_applyPose(e){let t=this.PB.a,n=this.PM.a,r=this._snapW>0?this._snapW*this._snapW*(3-2*this._snapW):0;for(let i=0;i<Qp;i++)Ym(t,i,_m),e>0&&(Ym(n,i,vm),_m.slerp(vm,e)),r>0&&_m.slerp(this._snapQ[i],r),this.joints[i].quaternion.copy(_m);let i=this.joints[X.hips].position;i.set(Jm(t,n,$p,e),this.hipsY+Jm(t,n,$p+1,e),Jm(t,n,$p+2,e)),r>0&&i.lerp(this._snapPos,r);let a=Jm(t,n,em,e);this.body.torso.scale.set(1+a*.5,1-a,1+a*.5),this.joints[X.chest].position.y=wf.chest[1]*(1-a);for(let r=0;r<2;r++){let i=Jm(t,n,tm+r,e);this.arms[r].ua.scale.set(1+i,1,1+i),this.arms[r].sleeve.scale.set(1+i*.8,1,1+i*.8)}let o=e>.5?this.PM.shapes:this.PB.shapes;this._setShape(0,o[0]),this._setShape(1,o[1]),this._snapReady=!0}_setShape(e,t){if(this._shape[e]===t)return;this._shape[e]=t;let n=Gf[t]||Gf.rest,r=this.hands[e],i=r.s,a=Uf();t===`open`?(r.palm.geometry=a.handOpen,r.palm.position.set(0,0,0),r.palm.scale.set(1,1,1)):(r.palm.geometry=a.palm,r.palm.position.set(n.palm[0]*i,n.palm[1],n.palm[2]),r.palm.scale.set(n.ps[0],n.ps[1],n.ps[2])),r.thumb.position.set(n.th[0]*i,n.th[1],n.th[2]),r.thumb.rotation.set(n.tr[0],n.tr[1]*i,n.tr[2]*i),r.thumb.scale.setScalar(n.ts),n.fi?(r.finger.visible=!0,r.finger.position.set(n.fi[0]*i,n.fi[1],n.fi[2]),r.finger.rotation.set(n.fr[0],n.fr[1]*i,n.fr[2]*i)):r.finger.visible=!1}_flushFx(){let e=this._q;if(!e.n)return;this.group.updateMatrixWorld(!0),Im.copy(this.group.matrixWorld).invert();let t=this.rng;for(let n=0;n<e.n;n++){let r=Wp[e.name[n]],i=e.anchor[n];if(i===`root`)bm.set(0,0,0);else if(i===`clap`){let e=this._anchors.handL,t=this._anchors.handR;bm.copy(e[1]).applyMatrix4(e[0].matrixWorld),xm.copy(t[1]).applyMatrix4(t[0].matrixWorld),bm.add(xm).multiplyScalar(.5).applyMatrix4(Im)}else{let e=this._anchors[i]||this._anchors.chest;bm.copy(e[1]).applyMatrix4(e[0].matrixWorld).applyMatrix4(Im)}let a=e.num,o=n*12;bm.x+=a[o+5],bm.y+=a[o+6],bm.z+=a[o+7];let s=r.layer===`glow`?this.fxG:this.fxN,c=a[o],l=a[o+4],u=a[o+8],d=a[o+9],f=a[o+10]||1;for(let e=0;e<c;e++){let e=a[o+1],n=a[o+2],i=a[o+3];if(l>0||u>0){let r,a,o,s;do r=t()*2-1,a=t()*2-1,o=t()*2-1,s=r*r+a*a+o*o;while(s>1||s<1e-4);if(u>0){let c=u*(.82+.36*t())/Math.sqrt(s);e+=r*c,n+=a*c,i+=o*c}else e+=r*l,n+=a*l,i+=o*l}s.spawn(r,bm.x,bm.y,bm.z,e,n,i,f,d)}}e.n=0}update(e,t){e=e>0?Math.min(e,.1):0,this._t+=e;let n=this._t;kd.uTime.value=typeof t==`number`?t:n;let r=1-Math.exp(-e*5),i=this.state,a=this.sw;a.acting+=((i.acting&&!i.folded?1:0)-a.acting)*r,a.folded+=(+!!i.folded-a.folded)*r,a.allIn+=((i.allIn&&!i.folded?1:0)-a.allIn)*r,a.winner+=(+!!i.winner-a.winner)*r;let o=i.folded?3:0;this.grey!==o&&(this._greyAcc+=e,(this._greyAcc>.07||e===0)&&(this._greyAcc=0,this.grey+=o>this.grey?1:-1,this._refreshMaterials()));let s=0,c=0;if(this._hasLook){this.group.updateWorldMatrix(!0,!1),Sm.copy(this._lookTarget),this.group.worldToLocal(Sm);let e=Sm.x,t=Sm.z,n=Sm.y-this.headY;s=Zm(Math.atan2(e,t),-eh,eh),c=Zm(Math.atan2(n,Math.hypot(e,t)),-th,th)}else{let t=this._glance;t.timer-=e,t.timer<=0&&(t.on=!t.on&&!this.mo,t.on?(t.y=(this.rng()-.5)*.8,t.p=(this.rng()-.6)*.25,t.timer=.9+this.rng()*1.6):(t.y=0,t.p=0,t.timer=2+this.rng()*4)),s=t.y,c=t.p}let l=1-Math.exp(-e*6);this._lookY+=(s-this._lookY)*l,this._lookP+=(c-this._lookP)*l;let u=Math.abs(s-this._lookY)>.12?Math.sign(s-this._lookY):Math.abs(this._lookY)>.5?Math.sign(this._lookY):0,d=Math.abs(c-this._lookP)>.1?-Math.sign(c-this._lookP):0;this._gaze[0]=u,this._gaze[1]=d,this._blinkT-=e,this._blinking>0?this._blinking-=e:this._blinkT<=0&&(this._blinking=.12,this._blinkT=this.rng()<.15?.25:2.2+this.rng()*3.3),this._buildBase(e);let f=0,p=this.mo,m=this._m;if(p){if(p.prev=p.t,p.t+=e,p.t>=p.dur)this._endMotion();else{let t=this.PM;t.copyFrom(this.PB),t.expr=null,m.dt=e,m.t=p.t,m.prev=p.prev,m.st=p.st,p.def.play(t,p.t,p.dur,m),this._resolve(t);let n=Math.min(1,p.t/.2),r=Math.min(1,(p.dur-p.t)/.25);f=n*n*(3-2*n)*(r*r*(3-2*r))}}this._snapW>0&&(this._snapW=Math.max(0,this._snapW-e/.22)),this._applyPose(f);for(let e of this._halo)e.position.y=e.userData.y0+.012*Math.sin(n*2.2+this.phase),e.rotation.y=n*.6;if(this.look.glasses===`cyber`){let e=rf(`cyber`);e&&(e.offset.x=n*.35%1)}if(this._glintT-=e,this._glintT<=0){this._glintT=1.1+this.rng()*1.4;let e=this.look;e.hat===`crown`?m.fx(`sparkle`,`headTop`,1,0,.02,0,0,(this.rng()-.5)*.18,-.06,.05+this.rng()*.04,0,-1,.8):e.skinMetal||e.topMetal?m.fx(`sparkle`,e.skinMetal?`headSideL`:`chest`,1,0,.02,0,0,(this.rng()-.5)*.15,-.1,0,0,-1,.7):e.hat===`halo`&&m.fx(`sparkle`,`headTop`,1,0,.02,0,0,(this.rng()-.5)*.24,.02,0,0,-1,.6)}let h=this.baseExpr;h===`normal`&&(a.winner>.5?h=`happy`:a.allIn>.5?h=`determined`:a.folded>.5?h=`bored`:a.acting>.5&&(h=`focus`)),p&&this.mo&&f>.3&&this.PM.expr&&(h=this.PM.expr);let g=this._blinking>0,_=this._fk,v=g&&hp(h)?1:0;(this._faceKey===``||_.e!==h||_.b!==v||_.g!==this.grey||_.x!==this._gaze[0]||_.y!==this._gaze[1])&&(this._faceKey=`ok`,_.e=h,_.b=v,_.g=this.grey,_.x=this._gaze[0],_.y=this._gaze[1],this._redrawFace(h,g));let y=Gp[this.look.aura];if(y&&e>0)for(this._auraAcc+=e*y.rate;this._auraAcc>=1;)--this._auraAcc,y.spawn(this.aura,this.rng,this.seated);this._flushFx(),e>0&&(this.aura.update(e),this.fxN.update(e),this.fxG.update(e))}_redrawFace(e,t){let n=this.look,r=n.skinMetal?`#ffffff`:zd(n.skin,this.grey),i=n.hairStyle===`none`||n.hairStyle===`mohawk`?Id(n.skinMetal?`#b88a20`:n.skin,-.55):n.rainbow?`#c0306e`:Id(n.hair,-.32);i=zd(i,this.grey),Cp(this._faceCtx,e,{skin:r,brow:i,blink:t,gaze:this._gaze}),this._faceTex.needsUpdate=!0}};function ch(e,t,n={seated:!0}){return new sh(e,t,n)}var lh=class{constructor(e){this.engine=e,this.scene=new Qn,this.camera=new Ps(32,1,.05,30),this.scene.add(new Ss(16777215,4478310,1.2));let t=new zs(16777215,1.6);t.position.set(1.2,3,2.5),this.scene.add(t);let n=new zs(8956671,.8);n.position.set(-2,2,-2),this.scene.add(n),this.turn=new Wn,this.scene.add(this.turn);let r=new Pi(new fa(.5,.56,.08,48),new Xo({color:1712181,roughness:.4,metalness:.5}));r.position.y=-.04,this.scene.add(r);let i=new Pi(new Po(.5,.62,64).rotateX(-Math.PI/2),new Si({color:16765773,transparent:!0,opacity:.55}));i.position.y=.002,this.scene.add(i),this.glow=i,this.avatar=null,this.loadoutKey=``,this.framing=`lobby`,this.spin=0,this.autoSpin=!0,this.idleTimer=4,this.bindDrag()}setLoadout(e){let t=JSON.stringify(e);if(!(t===this.loadoutKey&&this.avatar)){if(this.loadoutKey=t,this.avatar)this.avatar.setLoadout(e);else try{this.avatar=ch(e,s.itemById,{seated:!1}),this.turn.add(this.avatar.group)}catch(e){console.error(`아바타 생성 실패`,e)}}}playMotion(e){return this.idleTimer=6,this.avatar?.playMotion(e)||0}setFraming(e){this.framing=e,this.onResize()}onResize(){let e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t;let n=t>e;this.framing===`editor`?(this.camera.position.set(0,.9,n?6.6:4.4),this.camera.setViewOffset(e,t,n?0:e*.17,n?t*.22:0,e,t),this.lookY=.78):(this.camera.position.set(0,.9,n?9.2:5.4),this.camera.setViewOffset(e,t,n?0:e*.17,n?t*.29:t*.05,e,t),this.lookY=.78),this.camera.lookAt(0,this.lookY,0),this.camera.updateProjectionMatrix()}onShow(){this.engine.canvas.classList.add(`showroom`),this.onResize()}onHide(){this.engine.canvas.classList.remove(`showroom`)}bindDrag(){let e=null;this.engine.canvas.addEventListener(`pointerdown`,t=>{this.engine.view===this&&(e=t.clientX,this.autoSpin=!1)}),window.addEventListener(`pointermove`,t=>{e!=null&&(this.spin+=(t.clientX-e)*.01,e=t.clientX)}),window.addEventListener(`pointerup`,()=>{e!=null&&setTimeout(()=>this.autoSpin=!0,2500),e=null})}update(e,t){if(this.autoSpin&&(this.spin+=e*.35),this.turn.rotation.y=this.spin,this.glow.material.opacity=.4+Math.sin(t*2)*.15,this.avatar&&(this.avatar.update(e,t),this.idleTimer-=e,this.idleTimer<0&&s.loadout)){let e=s.loadout.emotes;this.avatar.playMotion(e[Math.floor(Math.random()*e.length)]),this.idleTimer=7+Math.random()*5}}},uh=.09,dh=.126,fh=256,ph=358,mh=new Map,hh=new Map,gh=new la(uh,.0016,dh),_h=new Si({color:15921906}),vh={s:`♠`,h:`♥`,d:`♦`,c:`♣`};function yh(e){return s.settings.fourColor?{s:`#151515`,h:`#d22b2b`,d:`#1f5fd1`,c:`#178a3c`}[e]:e===`h`||e===`d`?`#d22b2b`:`#151515`}function bh(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}function xh(){let e=document.createElement(`canvas`);return e.width=fh,e.height=ph,e}function Sh(e){let t=new aa(e);return t.colorSpace=nt,t.anisotropy=4,t}function Ch(e){let t=e+(s.settings.fourColor?`4`:`2`);if(mh.has(t))return mh.get(t);let n=xh(),r=n.getContext(`2d`);r.fillStyle=`#fbfaf6`,bh(r,0,0,fh,ph,22),r.fill(),r.strokeStyle=`#d8d4c8`,r.lineWidth=4,bh(r,3,3,250,352,20),r.stroke();let i=e[0]===`T`?`10`:e[0],a=e[1];r.fillStyle=yh(a),r.textAlign=`center`,r.textBaseline=`middle`,r.font=`900 ${i===`10`?86:100}px Pretendard Variable, Pretendard, Arial, sans-serif`,r.fillText(i,62,68),r.font=`700 70px Arial, sans-serif`,r.fillText(vh[a],62,150),r.font=`700 170px Arial, sans-serif`,r.globalAlpha=.95,r.fillText(vh[a],162,249),r.globalAlpha=1;let o=Sh(n);return mh.set(t,o),o}function wh(){for(let e of mh.values())e.dispose();mh.clear()}function Th(e){let t=s.itemById[e]||s.itemById.cb_classic||{params:{style:`classic`,color:`#b3202a`}},n=t.id||`cb_classic`;if(hh.has(n))return hh.get(n);let{style:r,color:i}=t.params,a=xh(),o=a.getContext(`2d`);if(o.fillStyle=`#fbfaf6`,bh(o,0,0,fh,ph,22),o.fill(),o.save(),bh(o,14,14,228,330,14),o.clip(),o.fillStyle=i,o.fillRect(0,0,fh,ph),r===`classic`){o.strokeStyle=`rgba(255,255,255,0.35)`,o.lineWidth=3;for(let e=-358;e<614;e+=18)o.beginPath(),o.moveTo(e,0),o.lineTo(e+ph,ph),o.stroke(),o.beginPath(),o.moveTo(e+ph,0),o.lineTo(e,ph),o.stroke();o.strokeStyle=`rgba(255,255,255,0.8)`,o.lineWidth=6,bh(o,26,26,204,306,10),o.stroke()}else if(r===`dragon`){let e=o.createRadialGradient(fh/2,ph/2,10,fh/2,ph/2,200);e.addColorStop(0,`#29c79a`),e.addColorStop(1,i),o.fillStyle=e,o.fillRect(0,0,fh,ph),o.strokeStyle=`#d9b44a`,o.lineWidth=9,o.lineCap=`round`,o.beginPath();for(let e=0;e<=60;e++){let t=e/60,n=fh/2+Math.sin(t*Math.PI*3)*60*(1-t*.4),r=50+t*258;e?o.lineTo(n,r):o.moveTo(n,r)}o.stroke(),o.fillStyle=`#d9b44a`,o.beginPath(),o.arc(fh/2,54,18,0,Math.PI*2),o.fill(),o.fillStyle=`#ff5a3c`,o.beginPath(),o.arc(134,50,4,0,Math.PI*2),o.fill()}else if(r===`neon`){o.strokeStyle=`rgba(56,242,255,0.55)`,o.lineWidth=2;for(let e=0;e<fh;e+=22)o.beginPath(),o.moveTo(e,0),o.lineTo(e,ph),o.stroke();for(let e=0;e<ph;e+=22)o.beginPath(),o.moveTo(0,e),o.lineTo(fh,e),o.stroke();o.shadowColor=`#ff3df2`,o.shadowBlur=20,o.strokeStyle=`#ff3df2`,o.lineWidth=8,o.beginPath(),o.moveTo(fh/2,90),o.lineTo(188,ph/2),o.lineTo(fh/2,268),o.lineTo(fh/2-60,ph/2),o.closePath(),o.stroke()}else if(r===`gold`){let e=o.createLinearGradient(0,0,fh,ph);e.addColorStop(0,`#1b1200`),e.addColorStop(.5,`#3d2a00`),e.addColorStop(1,`#1b1200`),o.fillStyle=e,o.fillRect(0,0,fh,ph);let t=o.createLinearGradient(0,0,fh,0);t.addColorStop(0,`#a87a12`),t.addColorStop(.5,`#ffe08a`),t.addColorStop(1,`#a87a12`),o.strokeStyle=t,o.lineWidth=5;for(let e=0;e<4;e++)bh(o,28+e*16,28+e*16,fh-(28+e*16)*2,ph-(28+e*16)*2,10),o.stroke();o.fillStyle=t,o.font=`900 80px Arial`,o.textAlign=`center`,o.textBaseline=`middle`,o.fillText(`♠`,fh/2,ph/2)}o.restore();let c=Sh(a);return hh.set(n,c),c}function Eh(e,t){let n=new Pi(gh,[_h,_h,new Si({map:e&&e!==`??`?Ch(e):Th(t),transparent:!0}),new Si({map:Th(t),transparent:!0}),_h,_h]);return n.userData.code=e,n.userData.back=t,n.renderOrder=2,n}function Dh(e,t){e.userData.code=t,e.material[2].map=t&&t!==`??`?Ch(t):Th(e.userData.back),e.material[2].needsUpdate=!0}function Oh(e,t){for(let n of new Set(e.material))n!==_h&&(n.opacity=t);e.visible=t>.01}function kh(e){e.material[2].dispose(),e.material[3].dispose()}var Ah=.025,jh=.0075,Mh=new fa(Ah,Ah,jh,20),Nh=new fa(Ah*.62,Ah*.62,.007899999999999999,16),Ph=new fa(Ah*1.002,Ah*1.002,jh*.42,20,1,!0),Fh=new Qo({color:16777215}),Ih=new Qo({color:16777215}),Lh=(()=>{let e=document.createElement(`canvas`);e.width=128,e.height=8;let t=e.getContext(`2d`);t.fillStyle=`rgba(0,0,0,0)`,t.fillRect(0,0,128,8),t.fillStyle=`#ffffff`;for(let e=0;e<8;e++)t.fillRect(e*16+2,0,8,8);let n=new aa(e);return n.colorSpace=nt,new Qo({map:n,transparent:!0,alphaTest:.5})})(),Rh=[{v:1e5,color:`#2f7de1`,inlay:`#ffffff`},{v:25e3,color:`#e8742a`,inlay:`#fff4e0`},{v:5e3,color:`#d0343c`,inlay:`#ffffff`},{v:1e3,color:`#e8b923`,inlay:`#3a2a00`},{v:500,color:`#7b3fbf`,inlay:`#ffffff`},{v:100,color:`#1d1d1d`,inlay:`#ffffff`},{v:25,color:`#2e9d5b`,inlay:`#ffffff`}],zh=64;function Bh(e,t=30){let n=[],r=e;for(let e of Rh){if(r<e.v)continue;let t=Math.floor(r/e.v);r-=t*e.v,n.push({...e,count:t})}r>0&&n.push({...Rh[Rh.length-1],count:1});let i=n.reduce((e,t)=>e+t.count,0);for(;i>t;){let e=n.reduce((e,t)=>t.count>e.count?t:e),t=Math.ceil(e.count/2);e.count-=t,i-=t}return n.filter(e=>e.count>0)}function Vh(e,t=48){if(e<=0)return[];let n=[...Rh].reverse(),r=n[0];for(let t of n)e/t.v>=8&&(r=t);let i=Rh.filter(e=>e.v<=r.v),a=[.55,.28,.17],o=[],s=e;i.slice(0,3).forEach((t,n)=>{let r=Math.floor(e*a[n]/t.v),i=Math.min(r,Math.floor(s/t.v));i>0&&(o.push({...t,count:i}),s-=i*t.v)});for(let e of i){if(s<e.v)continue;let t=Math.floor(s/e.v);s-=t*e.v;let n=o.find(t=>t.v===e.v);n?n.count+=t:o.push({...e,count:t})}o.sort((e,t)=>t.v-e.v);let c=o.reduce((e,t)=>e+t.count,0);for(;c>t;){let e=o.reduce((e,t)=>t.count>e.count?t:e),t=Math.ceil(e.count/3);e.count-=t,c-=t}return o.filter(e=>e.count>0)}var Hh=class{constructor({layout:e=`ring`,perStack:t=10}={}){this.layout=e,this.perStack=t,this.group=new Wn,this.body=new Ki(Mh,Fh,zh),this.inlay=new Ki(Nh,Ih,zh),this.edge=new Ki(Ph,Lh,zh);for(let e of[this.body,this.inlay,this.edge])e.count=0,e.frustumCulled=!1,this.group.add(e);this.amount=0,this._m=new U,this._c=new W}setAmount(e,t=30){if(e===this.amount)return;this.amount=e;let n=e>0?this.layout===`row`?Vh(e,t):Bh(e,t):[],r=0;n.length;let i=this.perStack,a=0,o=[];for(let e of n){let t=e.count;for(;t>0;){let n=Math.min(i,t);o.push({...e,n}),t-=n,a++}}let s=e=>{if(this.layout===`row`)return[e*Ah*2.12,0];if(e===0)return[0,0];let t=e<=6?1:2,n=(t===1?e-1:e-7)/(t===1?6:12)*Math.PI*2,r=Ah*2.08*t;return[Math.cos(n)*r,Math.sin(n)*r]};o.forEach((e,t)=>{let[n,i]=s(t);for(let a=0;a<e.n&&r<zh;a++){let o=Math.sin((t+1)*12.9898+a*78.233)*43758.5453%1;this._m.makeRotationY(o*3),this._m.setPosition(n+o*.0015,jh/2+a*jh,i-o*.0015),this.body.setMatrixAt(r,this._m),this.inlay.setMatrixAt(r,this._m),this.edge.setMatrixAt(r,this._m),this.body.setColorAt(r,this._c.set(e.color)),this.inlay.setColorAt(r,this._c.set(e.inlay)),this.edge.setColorAt(r,this._c.set(`#ffffff`)),r++}});for(let e of[this.body,this.inlay,this.edge])e.count=r,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}dispose(){this.body.dispose(),this.inlay.dispose(),this.edge.dispose()}},Z=e=>e==null?`-`:Math.round(e).toLocaleString(`ko-KR`);function Uh(e){if(e==null)return`-`;if(e>=1e8)return(e/1e8).toFixed(e%1e8?1:0)+`억`;if(e>=1e4){let t=e/1e4;return(t>=100?Math.round(t):Math.round(t*100)/100)+`만`}return e.toLocaleString(`ko-KR`)}var Wh=e=>e.toLocaleString(`ko-KR`)+`원`;function Gh(e){if(e==null)return`-`;let t=Math.max(0,Math.round(e/1e3)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n?`${n}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`:`${r}:${String(i).padStart(2,`0`)}`}function Kh(e){let t=new Date(e),n=Date.now(),r=String(t.getHours()).padStart(2,`0`),i=String(t.getMinutes()).padStart(2,`0`);return new Date(n).toDateString()===t.toDateString()?`${r}:${i}`:`${t.getMonth()+1}/${t.getDate()} ${r}:${i}`}var qh={fold:`폴드`,check:`체크`,call:`콜`,bet:`베팅`,raise:`레이즈`,allin:`올인`,sb:`SB`,bb:`BB`},Jh={s:`♠`,h:`♥`,d:`♦`,c:`♣`},Yh=e=>Jh[e],Xh=640,Zh=300,Qh=`Pretendard Variable, Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`,$h={unknown:`#8b93a7`,tag:`#3ddc97`,lag:`#ff9f43`,rock:`#6fa8ff`,nit:`#9db4ff`,station:`#ffd166`,loosepassive:`#ffd166`,maniac:`#ff5d73`},eg={red:`#ff5d73`,orange:`#ff9f43`,yellow:`#ffd166`,green:`#3ddc97`,blue:`#4dabff`,purple:`#b07cff`},tg={fold:`#7d8597`,check:`#4dabff`,call:`#3ddc97`,bet:`#ffb020`,raise:`#ff7a1a`,allin:`#ff3d5a`,sb:`#7d8597`,bb:`#7d8597`};function ng(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}function rg(e,t,n,r){if(t===`gold`||t===`royal`||t===`silver`){let n=e.createLinearGradient(0,0,Xh,Zh),i=t===`gold`?[`#8a5a00`,`#ffe08a`,`#b8860b`]:t===`silver`?[`#7d8796`,`#ffffff`,`#9aa5b5`]:[`#5a1a8a`,`#e3b5ff`,`#7a2fc0`],a=(Math.sin(r*1.5)+1)/2;return n.addColorStop(0,i[0]),n.addColorStop(.2+a*.6,i[1]),n.addColorStop(1,i[2]),n}return n}var ig=class{constructor(){this.canvas=document.createElement(`canvas`),this.canvas.width=Xh,this.canvas.height=Zh,this.g=this.canvas.getContext(`2d`),this.texture=new aa(this.canvas),this.texture.colorSpace=nt,this.texture.anisotropy=4,this.material=new ti({map:this.texture,transparent:!0,depthTest:!1,depthWrite:!1}),this.sprite=new hi(this.material),this.sprite.renderOrder=20,this.sprite.center.set(.5,0),this.baseScale=.5,this.sprite.scale.set(this.baseScale,this.baseScale*Zh/Xh,1),this.data=null,this.key=``,this.lastDraw=0}setScale(e){this.baseScale=e,this.sprite.scale.set(e,e*Zh/Xh,1)}update(e,t){this.data=e;let n=e.acting||e.won>0||[`gold`,`royal`,`neon`,`silver`].includes(e.frameStyle),r=JSON.stringify([e.name,e.stack,e.bb,e.hud,e.lastAction,e.folded,e.allIn,e.acting,e.won,e.frame,e.note,e.handName,e.away,e.connected,e.tier,e.emoteLabel]);r===this.key&&!n||n&&r===this.key&&t-this.lastDraw<.066||(this.key=r,this.lastDraw=t,this.draw(e,t))}draw(e,t){let n=this.g;n.clearRect(0,0,Xh,Zh);let r=s.itemById[e.frame]?.params||{style:`basic`,color:`#3a4256`};n.globalAlpha=e.folded||e.sittingOut?.55:1,n.save(),r.style===`neon`&&(n.shadowColor=r.color,n.shadowBlur=26+Math.sin(t*4)*8),e.won>0&&(n.shadowColor=`#ffd34d`,n.shadowBlur=40),ng(n,10,8,620,208,30);let i=n.createLinearGradient(0,8,0,216);if(i.addColorStop(0,`rgba(22,28,46,0.94)`),i.addColorStop(1,`rgba(10,13,24,0.94)`),n.fillStyle=i,n.fill(),n.restore(),n.lineWidth=r.style===`basic`?4:8,n.strokeStyle=e.acting?`#ffd34d`:rg(n,r.style,r.color,t),ng(n,10,8,620,208,30),n.stroke(),r.style===`royal`)for(let[e,t]of[[14,12],[626,12],[14,212],[626,212]])n.fillStyle=`#ff4fd8`,n.beginPath(),n.arc(e,t,9,0,Math.PI*2),n.fill(),n.fillStyle=`#fff`,n.beginPath(),n.arc(e-3,t-3,3,0,Math.PI*2),n.fill();n.textBaseline=`middle`,n.textAlign=`left`;let a=34;e.note&&(n.fillStyle=eg[e.note]||`#ffffff`,n.beginPath(),n.arc(a+8,52,11,0,Math.PI*2),n.fill(),a+=30),n.fillStyle=`#ffffff`,n.font=`800 44px ${Qh}`;let o=e.name.length>9?e.name.slice(0,9)+`…`:e.name;n.fillText(o,a,52),a+=n.measureText(o).width+14;let c=(e,t,r=`#0b0f1a`)=>{n.font=`800 26px ${Qh}`;let i=n.measureText(e).width+22;ng(n,a,34,i,36,18),n.fillStyle=t,n.fill(),n.fillStyle=r,n.fillText(e,a+11,53),a+=i+8};e.isBot?c(`AI`,`#38f2ff`):e.tier&&c(e.tier,`#ffd34d`),!e.connected&&!e.isBot?c(`끊김`,`#ff5d73`,`#fff`):e.away&&c(`자리비움`,`#7d8597`,`#fff`),n.textAlign=`right`,n.font=`900 46px ${Qh}`,n.fillStyle=e.allIn?`#ff5d73`:`#ffe08a`,n.fillText(e.allIn&&e.stack===0?`올인`:Uh(e.stack),606,52),e.bb&&(n.font=`700 26px ${Qh}`,n.fillStyle=`#9aa3b8`,n.fillText(`${Math.round(e.stack/e.bb*10)/10}BB`,606,90));let l=e.hud;n.textAlign=`left`;let u=(e,t,r,i=`#ffffff`)=>{n.font=`700 24px ${Qh}`,n.fillStyle=`#8b93a7`,n.fillText(e,r,106),n.font=`900 40px ${Qh}`,n.fillStyle=t==null?`#5b6378`:i,n.fillText(t==null?`-`:String(t),r,140)};l&&(u(`VPIP`,l.vpip,34,ag(l.vpip,15,35)),u(`PFR`,l.pfr,150,ag(l.pfr,10,28)),u(`3B`,l.tb,256),u(`AF`,l.af,344),u(`CB`,l.cbet,432),n.font=`700 24px ${Qh}`,n.fillStyle=`#8b93a7`,n.textAlign=`right`,n.fillText(`핸드`,606,106),n.font=`900 34px ${Qh}`,n.fillStyle=`#c9d1e3`,n.fillText(l.hands>=1e3?(l.hands/1e3).toFixed(1)+`k`:String(l.hands),606,140),n.textAlign=`left`),l?.style&&(n.font=`800 28px ${Qh}`,n.fillStyle=$h[l.style.key]||`#fff`,n.fillText(`● `+l.style.label,34,186)),e.handName&&(n.textAlign=`right`,n.font=`800 28px ${Qh}`,n.fillStyle=`#ffe08a`,n.fillText(e.handName,606,186),n.textAlign=`left`);let d=null,f=`#4dabff`;if(e.won>0)d=`+${Uh(e.won)} 승리`,f=`#ffd34d`;else if(e.emoteLabel)d=e.emoteLabel,f=`#b07cff`;else if(e.lastAction){let t=e.lastAction;d=qh[t.type]+(t.amount&&![`check`,`fold`].includes(t.type)?` `+Uh(t.amount):``),f=tg[t.type]||`#4dabff`}if(d){n.font=`900 34px ${Qh}`;let t=n.measureText(d).width+44;ng(n,(Xh-t)/2,228,t,56,28),n.fillStyle=f,n.fill(),n.fillStyle=e.won>0||f===`#ffd34d`||f===`#ffb020`?`#1b1300`:`#ffffff`,n.textAlign=`center`,n.fillText(d,Xh/2,257),n.textAlign=`left`}if(e.acting&&e.deadline){let t=Math.max(0,e.deadline-(Date.now()+(e.clockOffset||0))),r=Math.max(0,Math.min(1,t/(e.timeoutMs||2e4)));n.fillStyle=`rgba(255,255,255,0.12)`,ng(n,34,202,572,10,5),n.fill(),n.fillStyle=r>.5?`#3ddc97`:r>.2?`#ffd166`:`#ff5d73`,ng(n,34,202,572*r,10,5),n.fill()}n.globalAlpha=1,this.texture.needsUpdate=!0}dispose(){this.texture.dispose(),this.material.dispose()}};function ag(e,t,n){return e==null?`#ffffff`:e<t?`#6fa8ff`:e>n?`#ff7a59`:`#3ddc97`}function og(e,{size:t=.16,color:n=`#ffe08a`,bg:r=`rgba(10,13,24,0.8)`}={}){let i=document.createElement(`canvas`);i.width=512,i.height=128;let a=new aa(i);a.colorSpace=nt;let o=new hi(new ti({map:a,transparent:!0,depthTest:!1,depthWrite:!1}));return o.renderOrder=19,o.scale.set(t*4,t,1),o.userData.set=e=>{if(o.userData.text===e)return;o.userData.text=e;let t=i.getContext(`2d`);if(t.clearRect(0,0,512,128),!e){a.needsUpdate=!0;return}t.font=`900 64px ${Qh}`;let s=Math.min(500,t.measureText(e).width+60);ng(t,(512-s)/2,18,s,92,46),t.fillStyle=r,t.fill(),t.fillStyle=n,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(e,256,66),a.needsUpdate=!0},o.userData.set(e),o}var sg={linear:e=>e,out:e=>1-(1-e)**3,inOut:e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,back:e=>1+2.70158*(e-1)**3+1.70158*(e-1)**2},cg=class{constructor(){this.list=[]}add(e){let t=e.obj,n={...e,t:-(e.delay||0),dur:e.dur||.4,e:sg[e.ease||`out`],p0:t?t.position.clone():null,q0:t?t.quaternion.clone():null,s0:t?t.scale.clone():null};return t&&(this.list=this.list.filter(n=>n.obj!==t||e.pos&&!n.pos||e.quat&&!n.quat)),this.list.push(n),n}cancel(e){this.list=this.list.filter(t=>t.obj!==e)}update(e){if(!this.list.length)return;let t=[];for(let n of this.list){if(n.t+=e,n.t<0)continue;n.started!==!0&&(n.started=!0,n.obj&&(n.p0.copy(n.obj.position),n.q0.copy(n.obj.quaternion),n.s0.copy(n.obj.scale)),n.onStart?.());let r=Math.min(1,n.t/n.dur),i=n.e(r),a=n.obj;a&&(n.pos&&(a.position.lerpVectors(n.p0,n.pos,i),n.arc&&(a.position.y+=Math.sin(Math.PI*r)*n.arc)),n.quat&&a.quaternion.slerpQuaternions(n.q0,n.quat,i),n.scale&&a.scale.lerpVectors(n.s0,n.scale,i)),n.onUpdate?.(i,r),r>=1&&t.push(n)}if(t.length){this.list=this.list.filter(e=>!t.includes(e));for(let e of t)e.onDone?.()}}};new qt,new En;function lg(e,t,n,r=`YXZ`){return new qt().setFromEuler(new En(e,t,n,r))}var ug=null;function dg(){if(!ug){let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;ug=new e}return ug.state===`suspended`&&ug.resume(),ug}function fg({freq:e=440,type:t=`sine`,dur:n=.12,vol:r=.15,slide:i=0,delay:a=0}){let o=dg();if(!o||!s.settings.sound)return;let c=o.currentTime+a,l=o.createOscillator(),u=o.createGain();l.type=t,l.frequency.setValueAtTime(e,c),i&&l.frequency.exponentialRampToValueAtTime(Math.max(40,e+i),c+n),u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(r,c+.008),u.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(u).connect(o.destination),l.start(c),l.stop(c+n+.02)}function pg({dur:e=.06,vol:t=.12,hp:n=2e3,delay:r=0}){let i=dg();if(!i||!s.settings.sound)return;let a=i.currentTime+r,o=Math.floor(i.sampleRate*e),c=i.createBuffer(1,o,i.sampleRate),l=c.getChannelData(0);for(let e=0;e<o;e++)l[e]=(Math.random()*2-1)*(1-e/o)**2;let u=i.createBufferSource();u.buffer=c;let d=i.createBiquadFilter();d.type=`highpass`,d.frequency.value=n;let f=i.createGain();f.gain.value=t,u.connect(d).connect(f).connect(i.destination),u.start(a)}var mg={unlock:()=>dg(),deal:(e=0)=>pg({dur:.05,vol:.09,hp:3e3,delay:e*.07}),chip:()=>{pg({dur:.04,vol:.14,hp:4e3}),fg({freq:2400,type:`triangle`,dur:.05,vol:.05,delay:.02})},check:()=>{fg({freq:180,type:`sine`,dur:.07,vol:.25}),fg({freq:160,type:`sine`,dur:.07,vol:.2,delay:.11})},fold:()=>pg({dur:.12,vol:.06,hp:1200}),turn:()=>{fg({freq:880,type:`sine`,dur:.12,vol:.12}),fg({freq:1320,type:`sine`,dur:.16,vol:.1,delay:.1}),s.settings.vibrate&&navigator.vibrate?.(60)},win:()=>{[523,659,784,1047].forEach((e,t)=>fg({freq:e,type:`triangle`,dur:.18,vol:.1,delay:t*.08}))},allin:()=>{fg({freq:220,type:`sawtooth`,dur:.35,vol:.06,slide:440})},tick:()=>fg({freq:1500,type:`square`,dur:.03,vol:.03}),buy:()=>{[784,988,1319].forEach((e,t)=>fg({freq:e,type:`sine`,dur:.14,vol:.1,delay:t*.06}))}},Q={h:.5,r:.62,feltY:.76,railW:.115,railTop:.805,seatOut:.36};function hg(e){return 4*Q.h+2*Math.PI*e}function gg(e,t){let n=hg(t);e=(e%n+n)%n;let r=Q.h,i=Math.PI*t;if(e<r)return{x:-e,z:t,nx:0,nz:1};if(e-=r,e<i){let n=Math.PI/2+e/t;return{x:-r+t*Math.cos(n),z:t*Math.sin(n),nx:Math.cos(n),nz:Math.sin(n)}}if(e-=i,e<2*r)return{x:-r+e,z:-t,nx:0,nz:-1};if(e-=2*r,e<i){let n=-Math.PI/2+e/t;return{x:r+t*Math.cos(n),z:t*Math.sin(n),nx:Math.cos(n),nz:Math.sin(n)}}return e-=i,{x:r-e,z:t,nx:0,nz:1}}function _g(e){let t=new Wa,n=Q.h;return t.moveTo(-n,-e),t.lineTo(n,-e),t.absarc(n,0,e,-Math.PI/2,Math.PI/2,!1),t.lineTo(-n,e),t.absarc(-n,0,e,Math.PI/2,Math.PI*3/2,!1),t}var vg=.8,yg=9,bg={9:[0,1,2,3,4,5,6,7,8],6:[0,2,3,5,6,7],2:[0,4]};function xg(e,t=yg){let n=hg(Q.r+Q.railW)-vg,r=e*n/t;return r<n/2-1e-9?r:r+vg}function Sg(e){return bg[e]||null}function Cg(e,t){let n=Sg(t);return n?xg(n[e]):xg(e,t)}function wg(){return hg(Q.r+Q.railW)/2}function Tg(e,t){return Eg(Cg(e,t))}function Eg(e){let t=gg(e,Q.r+Q.railW),n=new V(t.nx,0,t.nz),r=new V(-t.nz,0,t.nx),i=new V(t.x,0,t.z),a=(e,t=0)=>i.clone().addScaledVector(n,e).setY(t);return{n,tan:r,yaw:Math.atan2(-t.nx,-t.nz),cardYaw:Math.atan2(t.nx,t.nz),pos:a(Q.seatOut),card:a(-(Q.railW+.13),Q.feltY+.002),bet:a(-(Q.railW+.29),Q.feltY),btn:a(-(Q.railW+.09),Q.feltY).addScaledVector(r,-.15),stack:a(-(Q.railW+.06),Q.feltY).addScaledVector(r,.1)}}var Dg=-.06,Og=1.6,kg=.165,Ag=.32,jg=new V(0,Q.feltY,.2),Mg={skin:`skin_3`,hair:`hair_slick`,hairColor:`hc_black`,top:`top_suit`,topColor:`tc_black`,hat:`hat_visor`,glasses:`gl_none`,neck:`nk_bowtie`,aura:`au_none`,cardBack:`cb_classic`,frame:`fr_basic`,emotes:[`mo_nod`,`mo_nod`,`mo_nod`,`mo_nod`],win:`mo_nod`,allin:`mo_nod`},Ng=e=>new V((e-2)*kg,Q.feltY+.035,Dg),Pg=1.5,Fg=.155,Ig=1.1,Lg=new qt().setFromEuler(new En(Ag,0,0));function Rg(){let e=document.createElement(`canvas`);e.width=1024,e.height=568;let t=e.getContext(`2d`),n=t.createRadialGradient(512,284,40,512,284,560);n.addColorStop(0,`#1f8a58`),n.addColorStop(.6,`#136a41`),n.addColorStop(1,`#0b4a2c`),t.fillStyle=n,t.fillRect(0,0,1024,568),t.globalAlpha=.05;for(let e=0;e<4e3;e++)t.fillStyle=Math.random()<.5?`#000`:`#fff`,t.fillRect(Math.random()*1024,Math.random()*568,2,2);t.globalAlpha=1,t.strokeStyle=`rgba(255,224,138,0.35)`,t.lineWidth=3;let r=1024/2.24,i=568/1.24;t.beginPath();let a=.43;t.moveTo(512+-Q.h*r,284-a*i),t.lineTo(512+Q.h*r,284-a*i),t.arc(512+Q.h*r,284,a*i,-Math.PI/2,Math.PI/2),t.lineTo(512-Q.h*r,480.9677419354839),t.arc(512-Q.h*r,284,a*i,Math.PI/2,Math.PI*3/2),t.stroke(),t.strokeStyle=`rgba(255,255,255,0.13)`,t.lineWidth=3;for(let e=0;e<5;e++){let n=512+(e-2)*kg*r,a=.09*Og*r,o=.126*Og*Math.cos(Ag)*i;t.strokeRect(n-a/2,256.51612903225805-o/2,a,o)}t.save(),t.translate(512,284-.3*i),t.font=`900 54px Pretendard Variable, Pretendard, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillStyle=`rgba(255,224,138,0.42)`,t.fillText(`HOLDEM AR`,0,0),t.font=`700 22px Pretendard Variable, Pretendard, sans-serif`,t.fillStyle=`rgba(255,255,255,0.25)`,t.fillText(`NO LIMIT TEXAS HOLD’EM`,0,40),t.restore();let o=new aa(e);return o.colorSpace=nt,o.anisotropy=8,o}function zg(e,t,n=256){let r=document.createElement(`canvas`);r.width=r.height=n;let i=r.getContext(`2d`),a=i.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);a.addColorStop(0,e),a.addColorStop(1,t),i.fillStyle=a,i.fillRect(0,0,n,n);let o=new aa(r);return o.colorSpace=nt,o}function Bg(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#f7f4ea`,t.beginPath(),t.arc(64,64,62,0,Math.PI*2),t.fill(),t.strokeStyle=`#c9a227`,t.lineWidth=6,t.beginPath(),t.arc(64,64,52,0,Math.PI*2),t.stroke(),t.fillStyle=`#1b1b1b`,t.font=`900 64px Arial`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`D`,64,68);let n=new aa(e);return n.colorSpace=nt,n}var Vg=class{constructor(){this.scene=new Qn,this.root=new Wn,this.scene.add(this.root),this.env=new Wn,this.scene.add(this.env),this.tweens=new cg,this.slots=[],this.N=0,this.anchor=0,this.tableId=null,this.handNo=-1,this.board=[],this.view=null,this.prev=null,this.flying=[],this.heroVisible=!1,this.hudScale=.5,this.clockOffset=0,this.turnTotal=2e4,this.lastActor=null,this.time=0,this.deckPos=new V(0,Q.feltY+.03,-.42),this.dealer=null,this.buildLights(),this.buildTable(),this.buildRoom()}buildLights(){this.hemi=new Ss(16777215,4478310,1.2),this.scene.add(this.hemi),this.sun=new zs(16777215,1.6),this.sun.position.set(.8,3,2.2),this.scene.add(this.sun);let e=new Is(16769712,1.2,4,1.5);e.position.set(0,2.1,0),this.root.add(e)}buildTable(){let e=this.root,t=new Pi(new No(3.4,2.4),new Si({map:zg(`rgba(0,0,0,0.55)`,`rgba(0,0,0,0)`),transparent:!0,depthWrite:!1}));t.rotation.x=-Math.PI/2,t.position.y=.003,t.renderOrder=-1,e.add(t);let n=Rg();n.repeat.set(1/(2*(Q.h+Q.r)),1/(2*Q.r)),n.offset.set(.5,.5);let r=new Pi(new Fo(_g(Q.r),48),new Qo({map:n}));r.rotation.x=-Math.PI/2,r.position.y=Q.feltY,e.add(r);let i=_g(Q.r+Q.railW);i.holes.push(_g(Q.r));let a=new Pi(new ko(i,{depth:.03,bevelEnabled:!0,bevelThickness:.016,bevelSize:.014,bevelSegments:4,curveSegments:40}),new Xo({color:2365974,roughness:.55,metalness:.05}));a.rotation.x=-Math.PI/2,a.position.y=Q.feltY-.004,e.add(a);let o=_g(Q.r+.012);o.holes.push(_g(Q.r-.004));let s=new Pi(new ko(o,{depth:.012,bevelEnabled:!1,curveSegments:40}),new Xo({color:13214247,roughness:.3,metalness:.8}));s.rotation.x=-Math.PI/2,s.position.y=Q.feltY-.004,e.add(s);let c=new Pi(new ko(_g(Q.r+Q.railW-.01),{depth:.12,bevelEnabled:!1,curveSegments:40}),new Xo({color:3875863,roughness:.7}));c.rotation.x=-Math.PI/2,c.position.y=Q.feltY-.13,e.add(c);let l=new Xo({color:1709074,roughness:.6,metalness:.2});for(let t of[-.55,.55]){let n=new Pi(new fa(.12,.2,Q.feltY-.13,20),l);n.position.set(t,(Q.feltY-.13)/2,0),e.add(n);let r=new Pi(new fa(.34,.36,.03,28),l);r.position.set(t,.015,0),e.add(r)}let u=new Pi(new la(.09,.03,.126),new Qo({color:9051172}));u.position.copy(this.deckPos).setY(Q.feltY+.015),e.add(u),this.deck=u,this.pot=new Hh,this.pot.group.position.copy(jg),e.add(this.pot.group),this.potLabel=og(``,{size:.07}),this.potLabel.position.copy(jg).add(new V(0,.12,0)),e.add(this.potLabel),this.button=new Pi(new fa(.032,.032,.012,28),[new Qo({color:15328468}),new Si({map:Bg()}),new Qo({color:15328468})]),this.button.position.set(0,Q.feltY+.006,.4),this.button.visible=!1,e.add(this.button),this.boardCards=[],this.chairMat=new Xo({color:2764605,roughness:.6}),this.chairGeo={seat:new fa(.2,.2,.08,24),back:new la(.38,.42,.06),post:new fa(.025,.035,.42,10)},this.turnRing=new Pi(new Po(.11,.13,40),new Si({color:16765773,transparent:!0,opacity:.85,side:2,depthWrite:!1})),this.turnRing.rotation.x=-Math.PI/2,this.turnRing.visible=!1,e.add(this.turnRing)}buildRoom(){let e=document.createElement(`canvas`);e.width=16,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,256);n.addColorStop(0,`#05070d`),n.addColorStop(.55,`#141b33`),n.addColorStop(1,`#2a1a3a`),t.fillStyle=n,t.fillRect(0,0,16,256),this.bgTexture=new aa(e),this.bgTexture.colorSpace=nt;let r=new Pi(new da(7,64),new Qo({map:zg(`#3a2340`,`#0a0b14`,512)}));r.rotation.x=-Math.PI/2,r.position.y=-.001,this.env.add(r);let i=new Pi(new fa(.25,1.5,2.2,40,1,!0),new Si({color:16769712,transparent:!0,opacity:.05,side:2,depthWrite:!1,blending:2}));i.position.set(0,1.9,0),this.env.add(i);let a=new Gr,o=[];for(let e=0;e<160;e++){let e=Math.random()*Math.PI*2,t=5+Math.random()*3;o.push(Math.cos(e)*t,.5+Math.random()*3.5,Math.sin(e)*t)}a.setAttribute(`position`,new G(o,3));let s=new na(a,new Zi({size:.12,map:zg(`rgba(255,210,140,0.9)`,`rgba(255,210,140,0)`,64),transparent:!0,depthWrite:!1,blending:2,color:16777215}));this.env.add(s)}setMode(e){this.mode=e,this.env.visible=e===`orbit`,this.scene.background=e===`orbit`?this.bgTexture:null,this.heroVisible=!1,this.refreshHeroVisibility()}setHudScale(e){this.hudScale=e;for(let t of this.slots)t.hud.setScale(e)}refreshHeroVisibility(){if(this.view){for(let e of this.slots)if(e.avatar&&(e.avatar.group.visible=!(e.isHero&&!this.heroVisible)),e.chair.visible=!(e.isHero&&!this.heroVisible),e.isHero)for(let t of e.cards)t.visible=this.heroVisible}}disp(e){return(e-this.anchor+this.N)%this.N}reset(e){for(let e of this.slots)this.disposeSlot(e,!0);this.slots=[];for(let e of this.boardCards)this.removeCard(e,!1);this.boardCards=[],this.N=e.maxSeats,this.anchor=e.you??0,this.tableId=e.id,this.handNo=-1,this.board=[],this.placeDealer();for(let e of this.spareChairs||[])this.root.remove(e);this.spareChairs=[];let t=Sg(this.N);if(t)for(let e=0;e<yg;e++){if(t.includes(e))continue;let n=Eg(xg(e)),r=this.makeChair(n);this.root.add(r),this.spareChairs.push(r)}for(let e=0;e<this.N;e++){let t=Tg(e,this.N),n=this.makeChair(t);this.root.add(n);let r=new ig;r.setScale(this.hudScale),r.sprite.visible=!1,r.sprite.position.copy(t.pos).setY(1.72),r.sprite.userData.slotK=e,this.root.add(r.sprite);let i=new Hh({layout:`row`,perStack:14});i.group.position.copy(t.stack),i.group.rotation.y=t.yaw,this.root.add(i.group);let a=new Hh;a.group.position.copy(t.bet),this.root.add(a.group);let o=og(``,{size:.05,color:`#ffffff`});o.position.copy(t.bet).add(new V(0,.075,0)),this.root.add(o),this.slots.push({k:e,pose:t,chair:n,hud:r,bet:a,betLabel:o,stack:i,userId:null,avatar:null,cards:[],codes:[],isHero:!1,emoteLabel:null,emoteUntil:0,loadoutKey:``})}}makeChair(e){let t=new Wn,n=new Pi(this.chairGeo.seat,this.chairMat);n.position.y=.46;let r=new Pi(this.chairGeo.post,this.chairMat);r.position.y=.21;let i=new Pi(this.chairGeo.back,this.chairMat);return i.position.set(0,.74,-.2),i.rotation.x=-.12,t.add(n,r,i),t.position.copy(e.pos),t.rotation.y=e.yaw,t}placeDealer(){let e=Eg(wg());this.dealerPose=e,this.dealer||(this.dealer=this.makeAvatar(Mg),this.root.add(this.dealer.group),this.dealerLabel=og(`딜러`,{size:.055,color:`#ffe08a`}),this.root.add(this.dealerLabel)),this.dealer.group.position.copy(e.pos),this.dealer.group.rotation.y=e.yaw;let t=this.dealer.hudAnchor?this.dealer.hudAnchor.position.y:1.6;this.dealerLabel.position.copy(e.pos).setY(t+.06),this.deckPos.copy(e.card).setY(Q.feltY+.03),this.deck.position.copy(this.deckPos).setY(Q.feltY+.015),this.deck.rotation.y=e.yaw}dealerDo(e,t=0){this.dealer&&(t?setTimeout(()=>this.dealer?.playMotion(e),t):this.dealer.playMotion(e))}disposeSlot(e,t){e.avatar&&=(this.root.remove(e.avatar.group),e.avatar.dispose?.(),null);for(let t of e.cards)this.removeCard(t,!1);e.cards=[],e.codes=[],e.userId=null,t&&(this.root.remove(e.chair,e.hud.sprite,e.bet.group,e.betLabel,e.stack.group),e.hud.dispose(),e.bet.dispose(),e.stack.dispose())}removeCard(e,t=!0){t?this.tweens.add({obj:e,pos:this.deckPos.clone().setY(Q.feltY+.01),dur:.45,onUpdate:t=>Oh(e,1-t),onDone:()=>{this.root.remove(e),kh(e)}}):(this.tweens.cancel(e),this.root.remove(e),kh(e))}makeAvatar(e){try{return ch(e,s.itemById,{seated:!0})}catch(e){console.error(`아바타 생성 실패`,e);let t=new Wn,n=new Pi(new ua(.16,.4,6,12),new Qo({color:8952234}));n.position.y=.95,t.add(n);let r=new Un;return r.position.y=1.55,t.add(r),{group:t,hudAnchor:r,update(){},playMotion(){return 0},setExpression(){},lookAt(){},setState(){},setLoadout(){},dispose(){}}}}apply(e){let t=this.view;this.prev=t,this.view=e,this.clockOffset=e.now-Date.now(),(e.id!==this.tableId||e.maxSeats!==this.N||(e.you??0)!==this.anchor)&&this.reset(e);let n=e.event;n&&(!t||n.seq!==t.event?.seq||t.id!==e.id)&&this.onEvent(n,t,e);let r=e.handNo!==this.handNo;if(r){this.handNo=e.handNo;for(let e of this.slots){for(let t of e.cards)this.removeCard(t,!1);e.cards=[],e.codes=[]}for(let e of this.boardCards)this.removeCard(e,!1);this.boardCards=[],this.board=[]}e.actor!==this.lastActor&&(this.lastActor=e.actor,e.actor!=null&&e.deadline&&(this.turnTotal=Math.max(2e3,e.deadline-e.now)));for(let i=0;i<this.N;i++){let a=e.seats[i],o=this.slots[this.disp(i)];if(!a)o.userId&&this.disposeSlot(o,!1),o.hud.sprite.visible=!1,o.bet.setAmount(0),o.stack.setAmount(0),o.betLabel.userData.set(``);else{if(o.isHero=i===e.you,o.chair.visible=!(o.isHero&&!this.heroVisible),o.userId!==a.userId){this.disposeSlot(o,!1),o.userId=a.userId,o.avatar=this.makeAvatar(a.loadout),o.avatar.group.position.copy(o.pose.pos),o.avatar.group.rotation.y=o.pose.yaw,o.avatar.group.traverse(e=>e.userData.slotK=o.k),o.avatar.onEvent=e=>{if(e===`slam`||e===`allin`){mg.check();for(let e of[this.pot.group,...this.slots.map(e=>e.bet.group)]){let t=Q.feltY;this.tweens.add({obj:null,dur:.35,onUpdate:(n,r)=>e.position.y=t+Math.sin(Math.PI*r)*.025})}}},this.root.add(o.avatar.group),o.loadoutKey=JSON.stringify(a.loadout);let e=o.avatar.hudAnchor?o.avatar.hudAnchor.position.y:1.55;o.hud.sprite.position.copy(o.pose.pos).setY(Math.max(1.6,e+.1))}else{let e=JSON.stringify(a.loadout);if(e!==o.loadoutKey){o.loadoutKey=e,o.avatar.setLoadout(a.loadout);for(let e of o.cards)e.userData.back=a.loadout.cardBack}}if(o.avatar&&(o.avatar.group.visible=!(o.isHero&&!this.heroVisible),o.avatar.setState({acting:e.actor===i,folded:a.folded||a.sittingOut,allIn:a.allIn,winner:a.won>0})),o.hud.sprite.visible=!o.isHero,o.player=a,this.syncCards(o,a,e,r&&n?.type===`hand_start`),o.isHero&&!this.heroVisible)for(let e of o.cards)e.visible=!1;n?.type===`collect`&&t||o.bet.setAmount(a.bet),o.stack.setAmount(a.stack,48),o.betLabel.userData.set(a.bet>0?Uh(a.bet):``)}}if(this.syncBoard(e),n?.type!==`win`&&this.pot.setAmount(e.pot),this.potLabel.userData.set(e.pot>0?`팟 ${Uh(e.pot)}`:``),e.button>=0&&e.seats[e.button]){let t=this.slots[this.disp(e.button)].pose;this.button.visible?this.tweens.add({obj:this.button,pos:t.btn.clone().setY(Q.feltY+.006),dur:.5}):this.button.position.copy(t.btn).setY(Q.feltY+.006),this.button.visible=!0}if(e.actor!=null&&e.actor!==e.you){let t=this.slots[this.disp(e.actor)].pose;this.turnRing.position.copy(t.card).setY(Q.feltY+.003),this.turnRing.visible=!0}else this.turnRing.visible=!1}syncCards(e,t,n,r){if(!(t.cards&&t.inHand&&!t.folded)){if(e.cards.length){for(let t of e.cards)this.removeCard(t,!0);e.cards=[],e.codes=[]}return}e.pose;let i=t.loadout?.cardBack||`cb_classic`;for(let a=0;a<t.cards.length;a++){let o=t.cards[a],s=this.cardTarget(e,a,o,n);if(!e.cards[a]){let c=Eh(o,i);if(this.root.add(c),e.cards[a]=c,e.codes[a]=o,r){c.position.copy(this.deckPos),c.quaternion.copy(lg(0,0,Math.PI));let e=n.sbSeat??n.button??0,r=(t.seat-e+this.N)%this.N+a*this.N;this.tweens.add({obj:c,pos:s.pos,quat:s.quat,dur:.35,delay:r*.06,arc:.06,onStart:()=>mg.deal()})}else c.position.copy(s.pos),c.quaternion.copy(s.quat),c.scale.setScalar(s.scale)}else if(e.codes[a]!==o){e.codes[a]=o,Dh(e.cards[a],o);let t=s.scale;this.tweens.add({obj:e.cards[a],pos:s.pos,quat:s.quat,scale:new V(t,t,t),dur:.5,arc:.08})}}}cardTarget(e,t,n,r){let i=e.pose,a=n&&n!==`??`,o=(t-.5)*.055,s=i.card.clone().addScaledVector(i.tan,-o),c;if(e.isHero)s.y+=.03,s.addScaledVector(i.n,-.04),c=lg(.55,i.cardYaw+(t-.5)*-.18,0,`YXZ`);else if(a){let e=i.card.clone().addScaledVector(i.n,-.07),n=this.slots[0].pose.pos.clone().sub(e).setY(0),r=Math.atan2(n.x,n.z),a=new V(Math.cos(r),0,-Math.sin(r));return s.copy(e).addScaledVector(a,(t-.5)*Fg),s.y=Q.feltY+.1,c=lg(Ig,r,0,`YXZ`),{pos:s,quat:c,scale:Pg}}else c=new qt().setFromEuler(new En(0,i.cardYaw+(t-.5)*.25,0,`YXZ`)).multiply(lg(0,0,Math.PI));return{pos:s,quat:c,scale:1}}syncBoard(e){let t=e.board||[];if(t.length<this.boardCards.length){for(let e of this.boardCards)this.removeCard(e,!1);this.boardCards=[]}for(let e=this.boardCards.length;e<t.length;e++){let n=Eh(t[e],`cb_classic`);n.position.copy(this.deckPos),n.quaternion.copy(lg(0,0,Math.PI)),this.root.add(n),this.boardCards.push(n);let r=(e-Math.max(0,this.board.length))*.12;this.tweens.add({obj:n,pos:Ng(e),quat:Lg,scale:new V(Og,Og,Og),dur:.45,delay:r,arc:.1,onStart:()=>mg.deal()})}this.board=[...t]}onEvent(e,t,n){let r=e=>this.slots[this.disp(e)];switch(e.type){case`action`:{let t=e.action;t===`fold`?mg.fold():t===`check`?mg.check():t===`allin`?mg.allin():mg.chip(),e.motion&&r(e.seat)?.avatar?.playMotion(e.motion);break}case`collect`:if(!t)break;for(let e of t.seats){if(!e||!e.bet)continue;let t=r(e.seat);this.flyChips(t.pose.bet,jg,e.bet,.4),t.bet.setAmount(0)}mg.chip();break;case`win`:{this.pot.amount||t?.pot,this.pot.setAmount(0);let i=0;for(let t of e.pots||[]){let e=Math.floor(t.amount/t.winners.length);for(let n of t.winners){let t=r(n);t&&this.flyChips(jg,t.pose.bet,e,.6,i)}i+=.35}for(let[t,n]of Object.entries(e.motions||{})){let e=r(Number(t));setTimeout(()=>e?.avatar?.playMotion(n),500)}n.you!=null&&e.winners?.includes(n.you)&&mg.win(),this.dealerDo(`push`,150);break}case`emote`:{let t=r(e.seat);t?.avatar?.playMotion(e.motion),t&&(t.emoteLabel=s.itemById[e.motion]?.name||``,t.emoteUntil=this.time+2.2);break}case`turn`:e.seat===n.you&&mg.turn();break;case`hand_start`:this.dealerDo(`deal`);break;case`street`:this.dealerDo(`deal`)}}flyChips(e,t,n,r,i=0){let a=new Hh;a.setAmount(n,14),a.group.position.copy(e),this.root.add(a.group),this.tweens.add({obj:a.group,pos:t.clone(),dur:r,delay:i,arc:.12,onDone:()=>{this.root.remove(a.group),a.dispose()}})}heroSlot(){return this.slots[0]}heroEye(){let e=this.slots[0]?.pose||Tg(0,9);return{eye:e.pos.clone().addScaledVector(e.n,.22).setY(1.36),target:new V(0,Q.feltY,-.3)}}pick(e){let t=[];for(let e of this.slots)e.userId&&(e.hud.sprite.visible&&t.push(e.hud.sprite),e.avatar&&e.avatar.group.visible&&t.push(e.avatar.group));let n=e.intersectObjects(t,!0);for(let e of n){let t=e.object.userData.slotK;if(t!=null)return this.slots[t]}return null}update(e,t,n){this.time=t,this.tweens.update(e);let r=this.view;if(!r)return;let i=r.actor==null?null:this.slots[this.disp(r.actor)],a=this._tmp||=new V;for(let n of this.slots){if(!n.avatar)continue;i&&i!==n&&i.avatar?(a.copy(i.pose.pos).setY(1.25),n.avatar.lookAt(this.root.localToWorld(a))):(a.set(0,Q.feltY,0),n.avatar.lookAt(this.root.localToWorld(a))),n.avatar.update(e,t);let o=n.player;o&&n.hud.sprite.visible&&(n.emoteLabel&&t>n.emoteUntil&&(n.emoteLabel=null),n.hud.update({name:o.name,isBot:o.isBot,tier:o.tier,stack:o.stack,bb:r.level?.bb,hud:o.hud,lastAction:o.lastAction,folded:o.folded,allIn:o.allIn,acting:r.actor===o.seat,deadline:r.deadline,clockOffset:this.clockOffset,timeoutMs:this.turnTotal,won:o.won,frame:o.loadout?.frame,frameStyle:s.itemById[o.loadout?.frame]?.params?.style,note:s.notes[o.userId]?.color||null,handName:o.handName,away:o.away,connected:o.connected,sittingOut:o.sittingOut,emoteLabel:n.emoteLabel},t))}if(this.dealer&&(i?.avatar?a.copy(i.pose.pos).setY(1.25):a.set(0,Q.feltY,0),this.dealer.lookAt(this.root.localToWorld(a)),this.dealer.update(e,t)),this.turnRing.visible){let e=1+Math.sin(t*6)*.06;this.turnRing.scale.set(e,e,e)}if(n){let e=this._cam||=new V,t=this._wp||=new V;n.getWorldPosition(e);let r=this.root.scale.x||1,i=this.hudScale*(n.aspect&&n.aspect<1?.72:1);for(let n of this.slots){if(!n.hud.sprite.visible)continue;n.hud.sprite.getWorldPosition(t);let a=t.distanceTo(e)/r,o=i*Kt.clamp(a/2.6,.38,1.45);n.hud.sprite.scale.set(o,o*n.hud.canvas.height/n.hud.canvas.width,1)}}}},Hg={type:`change`},Ug={type:`start`},Wg={type:`end`},Gg=new xi,Kg=new Qr,qg=Math.cos(70*Kt.DEG2RAD),Jg=new V,Yg=2*Math.PI,Xg={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Zg=1e-6,Qg=class extends sc{constructor(e,t=null){super(e,t),this.state=Xg.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:h.ROTATE,MIDDLE:h.DOLLY,RIGHT:h.PAN},this.touches={ONE:g.ROTATE,TWO:g.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new qt,this._lastTargetPosition=new V,this._quat=new qt().setFromUnitVectors(e.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new oc,this._sphericalDelta=new oc,this._scale=1,this._panOffset=new V,this._rotateStart=new B,this._rotateEnd=new B,this._rotateDelta=new B,this._panStart=new B,this._panEnd=new B,this._panDelta=new B,this._dollyStart=new B,this._dollyEnd=new B,this._dollyDelta=new B,this._dollyDirection=new V,this._mouse=new B,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=e_.bind(this),this._onPointerDown=$g.bind(this),this._onPointerUp=t_.bind(this),this._onContextMenu=c_.bind(this),this._onMouseWheel=i_.bind(this),this._onKeyDown=a_.bind(this),this._onTouchStart=o_.bind(this),this._onTouchMove=s_.bind(this),this._onMouseDown=n_.bind(this),this._onMouseMove=r_.bind(this),this._interceptControlDown=l_.bind(this),this._interceptControlUp=u_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=Xg.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hg),this.update(),this.state=Xg.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Jg.copy(t).sub(this.target),Jg.applyQuaternion(this._quat),this._spherical.setFromVector3(Jg),this.autoRotate&&this.state===Xg.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Yg:n>Math.PI&&(n-=Yg),r<-Math.PI?r+=Yg:r>Math.PI&&(r-=Yg),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Jg.setFromSpherical(this._spherical),Jg.applyQuaternion(this._quatInverse),t.copy(this.target).add(Jg),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Jg.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new V(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new V(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Jg.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Gg.origin.copy(this.object.position),Gg.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gg.direction))<qg?this.object.lookAt(this.target):(Kg.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gg.intersectPlane(Kg,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Zg||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Zg||this._lastTargetPosition.distanceToSquared(this.target)>Zg?(this.dispatchEvent(Hg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Yg/60/60*this.autoRotateSpeed:Yg/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Jg.setFromMatrixColumn(t,0),Jg.multiplyScalar(-e),this._panOffset.add(Jg)}_panUp(e,t){this.screenSpacePanning===!0?Jg.setFromMatrixColumn(t,1):(Jg.setFromMatrixColumn(t,0),Jg.crossVectors(this.object.up,Jg)),Jg.multiplyScalar(e),this._panOffset.add(Jg)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Jg.copy(r).sub(this.target);let i=Jg.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Yg*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yg*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Yg*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Yg*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Yg*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Yg*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Yg*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yg*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new B,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function $g(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function e_(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function t_(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Wg),this.state=Xg.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function n_(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case h.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Xg.DOLLY;break;case h.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Xg.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Xg.ROTATE}break;case h.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Xg.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Xg.PAN}break;default:this.state=Xg.NONE}this.state!==Xg.NONE&&this.dispatchEvent(Ug)}function r_(e){switch(this.state){case Xg.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Xg.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Xg.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function i_(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Xg.NONE&&(e.preventDefault(),this.dispatchEvent(Ug),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Wg))}function a_(e){this.enabled!==!1&&this._handleKeyDown(e)}function o_(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case g.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Xg.TOUCH_ROTATE;break;case g.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Xg.TOUCH_PAN;break;default:this.state=Xg.NONE}break;case 2:switch(this.touches.TWO){case g.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Xg.TOUCH_DOLLY_PAN;break;case g.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Xg.TOUCH_DOLLY_ROTATE;break;default:this.state=Xg.NONE}break;default:this.state=Xg.NONE}this.state!==Xg.NONE&&this.dispatchEvent(Ug)}function s_(e){switch(this._trackPointer(e),this.state){case Xg.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Xg.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Xg.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Xg.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Xg.NONE}}function c_(e){this.enabled!==!1&&e.preventDefault()}function l_(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function u_(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}async function d_(){let e=!1;try{e=!!navigator.xr&&await navigator.xr.isSessionSupported(`immersive-ar`)}catch{e=!1}let t=!!navigator.mediaDevices?.getUserMedia&&window.isSecureContext,n=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/Mac/.test(navigator.userAgent);return{xr:e,camera:t,mobile:n}}var f_=class{constructor(e,t,{onMode:n,onTap:r,onXrState:i}){this.engine=e,this.table=t,this.onMode=n,this.onTap=r,this.onXrState=i,this.mode=null,this.video=document.getElementById(`cam`),this.stream=null,this.orbit=null,this.gyro={on:!1,alpha:0,beta:0,gamma:0,has:!1},this.yawOffset=0,this.dragYaw=0,this.dragPitch=0,this.xrSession=null,this.hitSource=null,this.placed=!1,this.scaleMode=`full`,this.reticle=this.makeReticle(),this.table.scene.add(this.reticle),this.raycaster=new rc,this.onOrient=e=>{e.alpha!=null&&(this.gyro.has=!0,this.gyro.alpha=Kt.degToRad(e.alpha),this.gyro.beta=Kt.degToRad(e.beta),this.gyro.gamma=Kt.degToRad(e.gamma))},this.bindPointer()}makeReticle(){let e=new Wn,t=new Pi(new Po(.12,.15,40).rotateX(-Math.PI/2),new Si({color:16765773})),n=new Pi(new da(.02,16).rotateX(-Math.PI/2),new Si({color:16777215}));return e.add(t,n),e.matrixAutoUpdate=!1,e.visible=!1,e}async set(e){e!==this.mode&&(await this.exit(),this.mode=e,this.table.setMode(e),e===`orbit`?this.enterOrbit():e===`camera`?await this.enterCamera():e===`xr`&&await this.enterXR(),this.onMode?.(this.mode))}async exit(){let e=this.mode;if(this.mode=null,e===`orbit`&&this.orbit&&(this.orbit.dispose(),this.orbit=null),e===`camera`&&(window.removeEventListener(`deviceorientation`,this.onOrient),this.stopStream(),this.engine.canvas.classList.remove(`over-camera`)),e===`xr`&&this.xrSession){let e=this.xrSession;this.xrSession=null;try{await e.end()}catch{}}this.table.root.position.set(0,0,0),this.table.root.rotation.set(0,0,0),this.table.root.scale.setScalar(1),this.table.setHudScale(.5)}stopStream(){if(this.stream){for(let e of this.stream.getTracks())e.stop();this.stream=null}this.video.srcObject=null,this.video.classList.remove(`on`)}enterOrbit(){let e=this.engine.camera,t=e.aspect<1;e.fov=t?68:52,e.updateProjectionMatrix();let{eye:n}=this.table.heroEye(),r=new V(n.x,0,n.z).normalize(),i=new V(n.x,0,n.z);e.position.copy(i).addScaledVector(r,t?.45:.55).setY(t?2.15:1.95),this.orbit=new Qg(e,this.engine.canvas),this.orbit.target.set(r.x*-.35,.82,r.z*-.35),this.orbit.enableDamping=!0,this.orbit.dampingFactor=.08,this.orbit.minDistance=.8,this.orbit.maxDistance=5.5,this.orbit.maxPolarAngle=Math.PI*.47,this.orbit.enablePan=!1,this.orbit.update(),this.table.setHudScale(.6)}async enterCamera(){let e=this.engine.camera;e.fov=62,e.updateProjectionMatrix();try{this.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:`environment`},width:{ideal:1280},height:{ideal:720}},audio:!1}),this.video.srcObject=this.stream,this.video.classList.add(`on`),await this.video.play().catch(()=>{}),this.engine.canvas.classList.add(`over-camera`)}catch(e){this.cameraError=e.message||String(e)}try{if(typeof DeviceOrientationEvent<`u`&&typeof DeviceOrientationEvent.requestPermission==`function`&&await DeviceOrientationEvent.requestPermission()!==`granted`)throw Error(`자이로 권한 거부`);window.addEventListener(`deviceorientation`,this.onOrient),this.gyro.on=!0}catch{this.gyro.on=!1}this.gyro.has=!1,this.needRecenter=!0,this.dragYaw=0,this.dragPitch=0}recenter(){this.needRecenter=!0,this.dragYaw=0,this.dragPitch=0}updateCamera(){let e=this.engine.camera,{eye:t,target:n}=this.table.heroEye();e.position.copy(t);let r=new qt().setFromRotationMatrix(new U().lookAt(t,n,new V(0,1,0)));if(this.gyro.on&&this.gyro.has){let r=v_(this.gyro.alpha,this.gyro.beta,this.gyro.gamma,p_());if(this.needRecenter){let e=new V(0,0,-1).applyQuaternion(r),i=Math.atan2(-e.x,-e.z),a=new V().subVectors(n,t),o=Math.atan2(-a.x,-a.z);this.yawOffset=o-i,this.needRecenter=!1}let i=new qt().setFromAxisAngle(new V(0,1,0),this.yawOffset+this.dragYaw);e.quaternion.copy(i.multiply(r))}else{let t=new En().setFromQuaternion(r,`YXZ`);t.y+=this.dragYaw,t.x=Kt.clamp(t.x+this.dragPitch,-1.2,1),e.quaternion.setFromEuler(t)}}async enterXR(){let e=document.getElementById(`ui`),t=await navigator.xr.requestSession(`immersive-ar`,{requiredFeatures:[`hit-test`],optionalFeatures:[`dom-overlay`,`local-floor`,`light-estimation`],domOverlay:{root:e}});this.xrSession=t,this.placed=!1;let n=this.engine.renderer;n.xr.setReferenceSpaceType(`local`),await n.xr.setSession(t),this.refSpace=await t.requestReferenceSpace(`local`);let r=await t.requestReferenceSpace(`viewer`);this.hitSource=await t.requestHitTestSource({space:r}),this.table.root.visible=!1,t.addEventListener(`select`,e=>this.onXrSelect(e)),t.addEventListener(`end`,()=>{this.hitSource=null,this.reticle.visible=!1,this.table.root.visible=!0,this.xrSession===t&&(this.xrSession=null,this.mode=null,this.set(`orbit`))}),this.onXrState?.({placing:!0})}replace(){this.mode===`xr`&&(this.placed=!1,this.table.root.visible=!1,this.onXrState?.({placing:!0}))}toggleScale(){return this.scaleMode=this.scaleMode===`full`?`mini`:`full`,this.applyScale(),this.scaleMode}applyScale(){let e=this.scaleMode===`mini`?.32:1;this.table.root.scale.setScalar(e),this.table.setHudScale(.5)}onXrSelect(e){if(!this.placed){if(!this.reticle.visible)return;let e=this.reticle.matrix,t=new V().setFromMatrixPosition(e),n=this.engine.renderer.xr.getCamera(),r=new V().setFromMatrixPosition(n.matrixWorld),i=this.table.root;i.position.copy(t);let a=new V().subVectors(r,t).setY(0);i.rotation.set(0,Math.atan2(a.x,a.z),0),this.applyScale(),i.visible=!0,this.placed=!0,this.reticle.visible=!1,this.onXrState?.({placing:!1});return}let t=e.frame.getPose(e.inputSource.targetRaySpace,this.refSpace);if(!t)return;let n=t.transform,r=new V(n.position.x,n.position.y,n.position.z),i=new V(0,0,-1).applyQuaternion(new qt(n.orientation.x,n.orientation.y,n.orientation.z,n.orientation.w));this.raycaster.set(r,i),this.raycaster.camera=this.engine.renderer.xr.getCamera();let a=this.table.pick(this.raycaster);a&&this.onTap?.(a)}updateXR(e){if(!e||!this.hitSource||this.placed)return;let t=e.getHitTestResults(this.hitSource);if(t.length){let e=t[0].getPose(this.refSpace);e&&(this.reticle.visible=!0,this.reticle.matrix.fromArray(e.transform.matrix))}else this.reticle.visible=!1}bindPointer(){let e=this.engine.canvas,t=null;e.addEventListener(`pointerdown`,e=>{t={x:e.clientX,y:e.clientY,t:performance.now(),lx:e.clientX,ly:e.clientY}}),e.addEventListener(`pointermove`,e=>{if(!t||this.mode!==`camera`)return;let n=e.clientX-t.lx,r=e.clientY-t.ly;t.lx=e.clientX,t.ly=e.clientY,this.dragYaw+=n*.005,this.gyro.on&&this.gyro.has||(this.dragPitch+=r*.004)}),e.addEventListener(`pointerup`,e=>{if(!t||!this.mode){t=null;return}let n=Math.hypot(e.clientX-t.x,e.clientY-t.y),r=performance.now()-t.t<400;if(t=null,n<8&&r&&this.mode!==`xr`){let t=new B(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1);this.raycaster.setFromCamera(t,this.engine.camera);let n=this.table.pick(this.raycaster);n&&this.onTap?.(n)}})}update(e,t,n){this.mode===`orbit`?this.orbit?.update():this.mode===`camera`?this.updateCamera():this.mode===`xr`&&this.updateXR(n)}};function p_(){let e=screen.orientation?.angle??window.orientation??0;return Kt.degToRad(e)}var m_=new V(0,0,1),h_=new En,g_=new qt,__=new qt(-Math.sqrt(.5),0,0,Math.sqrt(.5));function v_(e,t,n,r){let i=new qt;return h_.set(t,e,-n,`YXZ`),i.setFromEuler(h_),i.multiply(__),i.multiply(g_.setFromAxisAngle(m_,-r)),i}function $(e,t={},...n){let[r,...i]=e.split(`.`),a=document.createElement(r||`div`);i.length&&(a.className=i.join(` `));for(let[e,n]of Object.entries(t||{}))n!=null&&n!==!1&&(e===`class`?a.className+=(a.className?` `:``)+n:e===`style`&&typeof n==`object`?Object.assign(a.style,n):e.startsWith(`on`)&&typeof n==`function`?a.addEventListener(e.slice(2),n):e===`html`?a.innerHTML=n:e===`dataset`?Object.assign(a.dataset,n):a.setAttribute(e,n===!0?``:n));for(let e of n.flat(1/0))e!=null&&e!==!1&&a.append(e instanceof Node?e:document.createTextNode(String(e)));return a}function y_(e){for(;e.firstChild;)e.removeChild(e.firstChild);return e}var b_=null;function x_(e,t=`info`,n=2600){b_||(b_=$(`div.toasts.xr-block`),document.getElementById(`ui`).append(b_));let r=$(`div.toast.${t}`,{},e);b_.append(r),requestAnimationFrame(()=>r.classList.add(`show`)),setTimeout(()=>{r.classList.remove(`show`),setTimeout(()=>r.remove(),300)},n)}function S_(e,{onClose:t,tall:n=!1}={}){let r=$(`div.sheet-back.xr-block`),i=$(`div.sheet${n?`.tall`:``}`,{},$(`div.sheet-grip`),e);r.append(i);let a=()=>{r.classList.remove(`show`),setTimeout(()=>r.remove(),250),t?.()};return r.addEventListener(`click`,e=>{e.target===r&&a()}),document.getElementById(`ui`).append(r),requestAnimationFrame(()=>r.classList.add(`show`)),{el:i,close:a}}function C_(e,t,n=`확인`,r=`취소`){return new Promise(i=>{let a=!1,o=S_($(`div.confirm`,{},$(`h3`,{},e),typeof t==`string`?$(`p.muted`,{},t):t,$(`div.row.gap`,{},$(`button.btn.ghost`,{onclick:()=>{a=!0,o.close(),i(!1)}},r),$(`button.btn.gold`,{onclick:()=>{a=!0,o.close(),i(!0)}},n))),{onClose:()=>!a&&i(!1)})})}var w_={hair:{none:`🥚`,short:`💇`,spiky:`⚡`,long:`💁`,bun:`🍡`,slick:`🕴️`,mohawk:`🦔`,afro:`☁️`,twin:`🎀`},top:{tee:`👕`,hoodie:`🧥`,jersey:`🎽`,hawaii:`🌺`,suit:`🤵`,leather:`🏍️`,tux:`🎩`},hat:{none:`🚫`,cap:`🧢`,beanie:`🧶`,visor:`🎰`,headphones:`🎧`,cowboy:`🤠`,tophat:`🎩`,horns:`😈`,halo:`😇`,crown:`👑`},glasses:{none:`🚫`,round:`👓`,sun:`🕶️`,star:`🌟`,cyber:`🥽`},neck:{none:`🚫`,bowtie:`🎀`,scarf:`🧣`,chain:`⛓️`,medal:`🏅`},aura:{none:`🚫`,sparkle:`✨`,hearts:`💖`,snow:`❄️`,fire:`🔥`,money:`💸`},motion:{wave:`👋`,nod:`🙂`,think:`🤔`,thumbs:`👍`,pump:`✊`,clap:`👏`,shrug:`🤷`,facepalm:`🤦`,slam:`💥`,cry:`😭`,kiss:`😘`,flex:`💪`,allin:`🫸`,chiptrick:`🪙`,taunt:`😤`,dance:`💃`,robot:`🤖`,king:`👑`,moneyrain:`💸`,fireworks:`🎆`}},T_={common:`일반`,rare:`희귀`,epic:`영웅`,legendary:`전설`},E_=[{key:`e0`,label:`이모트 1`},{key:`e1`,label:`이모트 2`},{key:`e2`,label:`이모트 3`},{key:`e3`,label:`이모트 4`},{key:`win`,label:`승리 모션`},{key:`allin`,label:`올인 모션`}],D_=new Map;function O_(e){return D_.has(e)||D_.set(e,Th(e).image.toDataURL()),D_.get(e)}function k_(e){let t=e.params||{};return[`skin`,`hairColor`,`topColor`].includes(e.slot)?$(`div.sw`,{style:{background:t.rainbow?`conic-gradient(#ff4d6d,#ffd34d,#3ddc97,#4dabff,#b07cff,#ff4d6d)`:t.metal?`radial-gradient(circle at 35% 30%, #fff6c8, ${t.color} 45%, #8a6400)`:t.color,borderRadius:`50%`}}):e.slot===`cardBack`?$(`div.sw`,{},$(`img`,{src:O_(e.id),alt:``})):e.slot===`frame`?$(`div.sw`,{style:{border:`4px solid ${t.color}`,boxShadow:t.style===`neon`?`0 0 12px ${t.color}`:`none`,fontSize:`13px`,fontWeight:900,color:t.color}},`HUD`):$(`div.sw`,{},(w_[e.slot]||{})[t.style||t.motion]||`✨`)}function A_(e,t){let n=s.catalog.slots,r=`hair`,i={...s.loadout},a=i[r],c=null,l=$(`div`);e.append(l);let u=e=>e.slot===`motion`?s.loadout.emotes.includes(e.id)||s.loadout.win===e.id||s.loadout.allin===e.id:s.loadout[e.slot]===e.id,d=async e=>{let t=await o.call(`loadout.set`,{loadout:e});s.loadout=t.loadout,i={...i,...t.loadout},r!==`motion`&&(i[r]=a),f(`loadout`)},m=async e=>{if(s.wallet.gem<e.price)return await C_(`젬이 부족해요`,`${e.name}: 💎 ${Z(e.price)} 필요 (보유 ${Z(s.wallet.gem)})`,`젬 사러 가기`)&&f(`tab`,`shop`),!1;if(!await C_(`${e.name} 구매`,`💎 ${Z(e.price)}을 씁니다.`,`구매`))return!1;let t=await o.call(`shop.buy`,{itemId:e.id});return s.inventory=new Set(t.inventory),s.wallet=t.wallet,f(`wallet`),mg.buy(),x_(`${e.name} 획득!`,`gold`),!0},h=()=>{y_(l);let e=$(`div.slots`,{},n.map(e=>$(`button.chip${e.id===r?`.on`:``}`,{onclick:()=>{r=e.id,c=null,a=r===`motion`?null:i[r],h()}},e.name)));if(l.append(e),r===`motion`){let e=$(`div.motion-slots`);for(let n of E_){let r=n.key.startsWith(`e`)?s.loadout.emotes[Number(n.key[1])]:s.loadout[n.key],i=s.itemById[r];e.append($(`div.motion-slot${c===n.key?`.target`:``}`,{onclick:async()=>{if(a&&p(a)){let e=n.key.startsWith(`e`)?{emotes:s.loadout.emotes.map((e,t)=>t===Number(n.key[1])?a:e)}:{[n.key]:a};try{await d(e),x_(`${n.label}에 ${s.itemById[a].name}`,`ok`)}catch(e){x_(e.message,`err`)}h()}else c=n.key,r&&t.showroom.playMotion(r),h()}},$(`span.muted`,{},n.label),$(`b`,{},i?`${w_.motion[i.params.motion]||``} ${i.name}`:`-`)))}l.append($(`div.small.muted`,{style:{margin:`0 2px 8px`}},a&&p(a)?`넣을 칸을 누르세요`:`모션을 눌러 미리 보고, 가진 모션은 칸에 넣을 수 있어요. 승리 모션은 팟을 이기면, 올인 모션은 올인할 때 자동으로 나와요.`),e)}let o=$(`div.items`);for(let e of s.catalog.items.filter(e=>e.slot===r)){let n=p(e.id),s=u(e);o.append($(`div.item.r-${e.rarity}${a===e.id?`.sel`:``}`,{onclick:()=>{a=e.id,r===`motion`?t.showroom.playMotion(e.id):(i={...i,[r]:e.id},t.showroom.setLoadout(i)),h()}},s?$(`span.eq`,{},`장착`):null,k_(e),$(`div.nm`,{},e.name),$(`div.rar.`+e.rarity,{},T_[e.rarity]),$(`div.pr${n?`.own`:``}`,{},n?e.price?`보유`:`무료`:`💎 ${Z(e.price)}`)))}l.append(o);let f=a?s.itemById[a]:null;if(f){let e=p(f.id),n=u(f),o=$(`div.try-bar`,{},$(`div.grow`,{},$(`div`,{style:{fontWeight:900}},f.name),$(`div.small.rar.`+f.rarity,{},T_[f.rarity])));r===`motion`?o.append($(`button.btn.sm`,{onclick:()=>t.showroom.playMotion(f.id)},`다시 보기`)):o.append($(`button.btn.sm`,{onclick:()=>{i={...s.loadout},a=i[r],t.showroom.setLoadout(i),h()}},`되돌리기`)),e?r!==`motion`&&!n?o.append($(`button.btn.green.sm`,{onclick:async()=>{try{await d({[r]:f.id}),x_(`장착했어요`,`ok`),h()}catch(e){x_(e.message,`err`)}}},`장착`)):r!==`motion`&&o.append($(`span.small.gold`,{style:{fontWeight:900}},`장착 중`)):o.append($(`button.btn.gold.sm`,{onclick:async()=>{try{await m(f)&&(r!==`motion`&&await d({[r]:f.id}),h())}catch(e){x_(e.message,`err`)}}},`💎 ${Z(f.price)} 구매`)),l.append(o)}};return h(),()=>t.showroom.setLoadout(s.loadout)}function j_(e){let t=s.payments||{},n=s.catalog.packs,r=n.find(e=>e.id===`starter`);if(r){let n=(r.grant.items||[]).map(e=>s.itemById[e]?.name).filter(Boolean).join(` · `);e.append($(`div.pack.bundle${t.starterBought?`.disabled`:``}`,{onclick:()=>N_(r)},$(`span.tag`,{},r.tag),$(`div.ic`,{style:{fontSize:`44px`}},`🎁`),$(`div.grow`,{},$(`div`,{style:{fontWeight:900,fontSize:`17px`}},r.name),$(`div.small`,{},`💎 ${Z(r.grant.gem)} + 🎟️ ${Z(r.grant.ticket)}`),$(`div.small.muted`,{},n)),$(`div.price`,{},t.starterBought?`구매함`:Wh(r.price))))}if(e.append($(`div.section-title`,{},`💎 젬 — 아바타·모션·카드 뒷면·명판`)),e.append($(`div.packs`,{},n.filter(e=>e.kind===`gem`).map(e=>M_(e,`💎`,e.grant.gem)))),e.append($(`div.section-title`,{},`🎟️ 토너 티켓 — 대회 참가`)),e.append($(`div.packs`,{},n.filter(e=>e.kind===`ticket`).map(e=>M_(e,`🎟️`,e.grant.ticket)))),t.monthlyLimit){let n=t.monthlySpent||0;e.append($(`div.note`,{},`이번 달 티켓 구매 ${Wh(n)} / 한도 ${Wh(t.monthlyLimit)}`),$(`div.progress`,{},$(`i`,{style:{width:`${Math.min(100,n/t.monthlyLimit*100)}%`}})))}let i=s.catalog.items.filter(e=>e.rarity===`legendary`||e.rarity===`epic`).slice(0,8);e.append($(`div.section-title`,{},`추천 꾸미기`)),e.append($(`div.items`,{},i.map(e=>$(`div.item.r-${e.rarity}`,{onclick:()=>f(`tab`,`wardrobe`)},k_(e),$(`div.nm`,{},e.name),$(`div.pr`,{},`💎 ${Z(e.price)}`))))),e.append($(`div.note`,{},`· 젬과 티켓은 서로 바꿀 수 없고, 현금으로 돌려받을 수 없습니다.`,$(`br`),`· 대회 상금은 티켓으로만 지급됩니다.`,$(`br`),t.provider===`mock`?`· 지금은 테스트 결제 모드라 실제 돈이 나가지 않습니다(결제사 키를 넣으면 실결제로 바뀝니다).`:`· 결제는 토스페이먼츠로 처리됩니다.`))}function M_(e,t,n){return $(`div.pack`,{onclick:()=>N_(e)},e.tag?$(`span.tag`,{},e.tag):null,$(`div.ic`,{},t),$(`div.amt`,{},Z(n)),$(`div.price`,{},Wh(e.price)))}async function N_(e){mg.unlock();let t;try{t=await o.call(`order.create`,{packId:e.id})}catch(e){x_(e.message,`err`);return}if(t.provider===`toss`)return F_(t);let n=S_($(`div.confirm`,{},$(`h3`,{},`${e.name} 결제`),$(`p.muted`,{},`${Wh(t.amount)} · 주문번호 ${t.orderId.slice(-8)}`),$(`div.card`,{style:{margin:`10px 0`}},$(`div.small`,{},`테스트 결제 모드입니다. 실제 돈은 나가지 않아요. 출시 전에 토스페이먼츠 키(TOSS_CLIENT_KEY / TOSS_SECRET_KEY)를 서버에 넣으면 진짜 결제창으로 바뀝니다.`)),$(`div.row.gap`,{},$(`button.btn.ghost`,{onclick:()=>{o.call(`order.cancel`,{orderId:t.orderId}).catch(()=>{}),n.close()}},`취소`),$(`button.btn.gold`,{style:{flex:1},onclick:async e=>{e.target.disabled=!0;try{P_(await o.call(`order.confirm`,{orderId:t.orderId})),n.close()}catch(t){x_(t.message,`err`),e.target.disabled=!1}}},`${Wh(t.amount)} 결제하기`))))}function P_(e){s.wallet=e.wallet,s.inventory=new Set(e.inventory),s.payments=e.payments,mg.buy(),x_(`${e.order.name} 지급 완료!`,`gold`),f(`wallet`),f(`rerender`)}async function F_(e){try{window.TossPayments||await new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://js.tosspayments.com/v2/standard`,n.onload=e,n.onerror=()=>t(Error(`결제 모듈을 불러오지 못했습니다`)),document.head.append(n)}),await window.TossPayments(s.payments.tossClientKey).payment({customerKey:s.me.id}).requestPayment({method:`CARD`,amount:{currency:`KRW`,value:e.amount},orderId:e.orderId,orderName:e.name,successUrl:`${location.origin}${location.pathname}?pay=success`,failUrl:`${location.origin}${location.pathname}?pay=fail`})}catch(e){x_(e.message||`결제를 취소했습니다`,`err`)}}async function I_(){let e=new URLSearchParams(location.search),t=e.get(`pay`);if(t){if(history.replaceState(null,``,location.pathname),t!==`success`)x_(`결제가 취소되었거나 실패했습니다`,`err`);else try{P_(await o.call(`order.confirm`,{orderId:e.get(`orderId`),paymentKey:e.get(`paymentKey`),amount:Number(e.get(`amount`))},2e4))}catch(e){x_(e.message,`err`)}}}var L_={unknown:`#8b93a7`,tag:`#3ddc97`,lag:`#ff9f43`,rock:`#6fa8ff`,nit:`#9db4ff`,station:`#ffd166`,loosepassive:`#ffd166`,maniac:`#ff5d73`},R_=[[`red`,`#ff5d73`],[`orange`,`#ff9f43`],[`yellow`,`#ffd166`],[`green`,`#3ddc97`],[`blue`,`#4dabff`],[`purple`,`#b07cff`],[``,`transparent`]];function z_(e){if(!e||e===`??`)return $(`span.mc`,{},`?`);let t=e[1];return $(`span.mc${s.settings.fourColor?{h:`.r`,d:`.b4`,c:`.g4`,s:``}[t]:t===`h`||t===`d`?`.r`:``}`,{},(e[0]===`T`?`10`:e[0])+Yh(t))}function B_(e){let t=(e,t,n)=>$(`div.stat`,{},$(`div.k`,{},e),$(`div.v`,{},t??`-`),n?$(`div.s`,{},n):null),n=e.sample||{};return $(`div.stat-grid`,{},t(`VPIP`,e.vpip,`판 참여`),t(`PFR`,e.pfr,`프리 레이즈`),t(`3BET`,e.tb,n.tbOpp==null?null:`기회 ${n.tbOpp}`),t(`AF`,e.af,`공격성`),t(`C-BET`,e.cbet,n.cbOpp==null?null:`기회 ${n.cbOpp}`),t(`폴드 투 CB`,e.fcb,n.fcbOpp==null?null:`기회 ${n.fcbOpp}`),t(`WTSD`,e.wtsd,`쇼다운 감`),t(`W$SD`,e.wsd,`쇼다운 승`),t(`플랍 봄`,e.flopSeen,`%`),t(`핸드`,e.hands>=1e4?(e.hands/1e3).toFixed(1)+`k`:Z(e.hands)),t(`ITM`,e.itm,e.tourneys?`${e.tourneys}회`:null),t(`우승`,e.wins??0,`토너먼트`))}async function V_(e,t=null){let n=$(`div`,{},$(`div.center.muted`,{style:{padding:`30px`}},`불러오는 중…`));S_(n,{tall:!0});let r;try{r=await o.call(`hud.get`,{userId:e})}catch(e){y_(n).append($(`div.center`,{},e.message));return}let i=r.stats;y_(n);let a=i.style||{key:`unknown`,label:`표본 부족`};if(n.append($(`div.row.gap`,{},$(`div.grow`,{},$(`div.row.gap`,{},$(`h3`,{},r.profile.name),r.profile.isBot?$(`span.badge.ai`,{},`AI`):$(`span.badge`,{},r.profile.tier.name)),$(`div.small.muted`,{style:{marginTop:`4px`}},r.persona?`AI 성격: ${r.persona}`:`포인트 ${Z(r.profile.points)}`)),$(`span.style-tag`,{style:{background:L_[a.key]+`33`,color:L_[a.key]}},a.label)),t?$(`div.small`,{style:{margin:`8px 0 0`}},`스택 ${Uh(t.stack)}${t.bb?` (${Math.round(t.stack/t.bb*10)/10}BB)`:``}`):null,$(`div.section-title`,{},`HUD — ${Z(i.hands)}핸드 기준`),B_(i),$(`div.small.muted`,{style:{marginTop:`8px`,lineHeight:1.5}},H_(i))),i.shows?.length&&(n.append($(`div.section-title`,{},`최근 쇼다운에서 보여 준 카드`)),n.append($(`div.shows`,{},i.shows.map(e=>$(`div.show-row`,{},$(`span.mini-cards`,{},e.cards.map(z_)),$(`span.mini-cards`,{style:{opacity:.75}},e.board.map(z_)),$(`span.grow`,{},e.handName||``),$(`b`,{style:{color:e.won?`#3ddc97`:`#ff5d73`}},e.won?`승`:`패`)))))),r.results?.length){n.append($(`div.section-title`,{},`최근 대회`));for(let e of r.results)n.append($(`div.list-row`,{},$(`span`,{},e.name),$(`span.muted`,{},`${e.place}위 / ${e.entrants}명 · ${Kh(e.ts)}`)))}let c=[`hat`,`glasses`,`neck`,`aura`,`hair`,`top`,`cardBack`,`frame`].map(e=>s.itemById[r.loadout[e]]).filter(e=>e&&e.price>0),l=[...r.loadout.emotes,r.loadout.win,r.loadout.allin].map(e=>s.itemById[e]).filter(e=>e&&e.price>0);if((c.length||l.length)&&(n.append($(`div.section-title`,{},`이 플레이어의 꾸미기`)),n.append($(`div.items`,{},[...c,...new Set(l)].slice(0,9).map(e=>$(`div.item.r-${e.rarity}`,{onclick:()=>f(`goWardrobe`)},k_(e),$(`div.nm`,{},e.name),$(`div.pr`,{},`💎 ${Z(e.price)}`)))))),r.profile.id!==s.me.id){let e=r.note?.color||``,t=$(`textarea.note-input`,{placeholder:`이 플레이어에 대한 메모(나만 보임)`,maxlength:200});t.value=r.note?.text||``;let i=$(`div.note-colors`),a=()=>{y_(i);for(let[t,n]of R_)i.append($(`button${e===t?`.on`:``}`,{style:{background:n||`rgba(255,255,255,0.08)`},title:t||`없음`,onclick:()=>{e=t,a()}},t?``:`✕`))};a(),n.append($(`div.section-title`,{},`내 메모 · 색 표시는 머리 위 HUD에 보여요`),i,t,$(`button.btn.gold.block`,{style:{marginTop:`8px`},onclick:async()=>{try{s.notes=(await o.call(`note.set`,{userId:r.profile.id,text:t.value,color:e})).notes,x_(`메모 저장`,`ok`)}catch(e){x_(e.message,`err`)}}},`메모 저장`))}}function H_(e){if(!e.hands||e.hands<20)return`아직 표본이 적어요. 20핸드 이상부터 성향이 나옵니다.`;let t=[];return e.vpip!=null&&t.push(e.vpip>35?`판에 자주 들어옵니다 — 강한 패로 밸류를 더 받으세요.`:e.vpip<16?`아주 좁게 칩니다 — 이 사람이 베팅하면 강한 패일 가능성이 큽니다.`:`참여 비율은 보통입니다.`),e.fcb!=null&&e.fcb>=60&&t.push(`C-벳에 자주 포기합니다.`),e.wtsd!=null&&e.wtsd>=35&&t.push(`쇼다운까지 잘 따라옵니다 — 블러프는 줄이세요.`),e.af!=null&&e.af>=3&&t.push(`공격적입니다 — 베팅이 꼭 강한 패는 아닙니다.`),t.join(` `)}var U_=[[`브론즈`,0],[`실버`,100],[`골드`,300],[`플래티넘`,700],[`다이아`,1500],[`마스터`,3e3]],W_={signup:`가입 보너스`,daily:`출석`,purchase:`구매`,item:`아이템 구매`,tourney_buyin:`대회 참가`,tourney_refund:`대회 환불`,tourney_prize:`대회 상금`};function G_(e){let t=s.me?.points||0,n=U_[0],r=null;for(let e=0;e<U_.length;e++)t>=U_[e][1]&&(n=U_[e],r=U_[e+1]||null);e.append($(`div.card`,{},$(`div.row.between`,{},$(`div`,{},$(`div`,{style:{fontSize:`20px`,fontWeight:900}},s.me.name),$(`div.small.gold`,{style:{fontWeight:800}},`${n[0]} · ${Z(t)}점`)),$(`button.btn.sm`,{onclick:K_},`닉네임 변경`)),r?$(`div.tier-bar`,{},$(`i`,{style:{width:`${(t-n[1])/(r[1]-n[1])*100}%`}})):null,r?$(`div.tiny.muted`,{style:{marginTop:`4px`}},`${r[0]}까지 ${Z(r[1]-t)}점 — 대회에서 상금권에 들면 점수가 크게 올라요`):null)),e.append($(`div.section-title`,{},`상대가 보는 내 HUD`)),s.stats&&e.append(B_(s.stats)),o.call(`me.get`).then(e=>{JSON.stringify(e.stats)!==JSON.stringify(s.stats)&&(s.stats=e.stats,s.results=e.results,f(`rerender`))}).catch(()=>{}),e.append($(`div.section-title`,{},`최근 대회`)),s.results?.length||e.append($(`div.small.muted`,{},`아직 대회 기록이 없어요.`));for(let t of s.results||[])e.append($(`div.list-row`,{},$(`span`,{},t.name,$(`span.muted.small`,{},`  ${Kh(t.ts)}`)),$(`b`,{style:{color:t.prize?`#ffd34d`:void 0}},`${t.place}위/${t.entrants}${t.prize?` · 🎟️${Z(t.prize)}`:``}`)));e.append($(`div.section-title`,{},`설정`));let i=(e,t,n)=>$(`div.list-row`,{},$(`span`,{},t),$(`button.toggle${s.settings[e]?`.on`:``}`,{onclick:t=>{s.settings[e]=!s.settings[e],l(),t.currentTarget.classList.toggle(`on`,s.settings[e]),n?.()}}));e.append(i(`sound`,`소리`),i(`vibrate`,`내 차례 진동`),i(`fourColor`,`4색 카드(♦ 파랑 · ♣ 초록)`,()=>wh())),e.append($(`button.btn.block`,{style:{marginTop:`14px`},onclick:q_},`재화 사용 내역`)),e.append($(`div.note`,{},`계정: 이 기기의 손님 계정입니다(${s.me.id}). 카카오·구글 로그인 연결은 다음 단계에서 열립니다.`))}function K_(){let e=$(`input`,{value:s.me.name,maxlength:12,style:{width:`100%`,padding:`12px`,borderRadius:`12px`,border:`1px solid rgba(255,255,255,.1)`,background:`rgba(0,0,0,.3)`,color:`#fff`,fontSize:`16px`}}),t=S_($(`div.confirm`,{},$(`h3`,{},`닉네임 변경`),$(`p.muted.small`,{},`2~12자, 한글·영문·숫자`),e,$(`div.row.gap`,{},$(`button.btn.gold.block`,{onclick:async()=>{try{s.me=(await o.call(`name.set`,{name:e.value})).me,f(`me`),f(`rerender`),t.close(),x_(`닉네임을 바꿨어요`,`ok`)}catch(e){x_(e.message,`err`)}}},`저장`))));setTimeout(()=>e.focus(),300)}async function q_(){let e=$(`div`,{},$(`h3`,{},`재화 사용 내역`));S_(e,{tall:!0});try{let t=await o.call(`history.get`);for(let n of t.ledger)e.append($(`div.list-row`,{},$(`span`,{},W_[n.reason]||n.reason,$(`span.tiny.muted`,{},`  ${Kh(n.ts)}`)),$(`b`,{style:{color:n.amt>0?`#3ddc97`:`#ff5d73`}},`${n.cur===`gem`?`💎`:`🎟️`} ${n.amt>0?`+`:``}${Z(n.amt)}`)));t.ledger.length||e.append($(`div.muted`,{},`내역이 없습니다`))}catch(t){y_(e).append($(`div`,{},t.message))}}var J_=[{id:`play`,label:`대회`,ic:`🏆`},{id:`wardrobe`,label:`꾸미기`,ic:`👕`},{id:`shop`,label:`상점`,ic:`💎`},{id:`me`,label:`내 정보`,ic:`👤`}];function Y_(e,t){let n=$(`div.lobby`),r=$(`div.top`),i=$(`div.spacer`),a=$(`div.content`),c=$(`div.nav`);n.append(r,i,a,c),e.append(n);let l=null,u=()=>{y_(r),r.append($(`div.me.grow`,{},$(`div.name`,{},s.me?.name||``),$(`div.tier`,{},`${s.me?.tier?.name||``} · ${Z(s.me?.points||0)}점`)),$(`div.pill`,{onclick:()=>m(`shop`)},`🎟️`,$(`span`,{},Z(s.wallet.ticket)),$(`span.plus`,{},`+`)),$(`div.pill`,{onclick:()=>m(`shop`)},`💎`,$(`span`,{},Z(s.wallet.gem)),$(`span.plus`,{},`+`)))},f=()=>{y_(c);for(let e of J_)c.append($(`button${s.tab===e.id?`.on`:``}`,{onclick:()=>m(e.id)},$(`span.ic`,{},e.ic),e.label))},p=()=>{let e=a.scrollTop;l?.(),l=null,y_(a),i.classList.toggle(`big`,s.tab===`wardrobe`),t.showroom.setFraming(s.tab===`wardrobe`?`editor`:`lobby`),s.tab===`play`?$_(a,t):s.tab===`wardrobe`?l=A_(a,t):s.tab===`shop`?j_(a,t):s.tab===`me`&&G_(a,t),a.scrollTop=e},m=e=>{s.tab!==e&&(s.tab=e,a.scrollTop=0,f(),p(),e!==`wardrobe`&&t.showroom.setLoadout(s.loadout))};u(),f(),p(),t.showroom.setLoadout(s.loadout),o.call(`lobby.sub`,{on:!0}).catch(()=>{});let h=[d(`wallet`,u),d(`me`,u),d(`lobby`,()=>s.tab===`play`&&p()),d(`rerender`,p),d(`tab`,e=>m(e))],g=setInterval(()=>{for(let e of n.querySelectorAll(`[data-until]`))e.textContent=Gh(Number(e.dataset.until)-Date.now())},1e3);return()=>{clearInterval(g),h.forEach(e=>e()),l?.(),n.remove()}}function X_(e){return e.buyIn===0?$(`span.badge.free`,{},`프리롤`):e.type===`sng`?$(`span.badge.sng`,{},e.maxPlayers===2?`헤즈업`:`싯앤고`):$(`span.badge.mtt`,{},`MTT`)}function Z_(e){return e.buyIn===0?`무료`:`🎟️ ${Z(e.buyIn)} + ${Z(e.fee)}`}function Q_(e){return e.status===`registering`?e.type===`sng`?$(`span`,{},$(`b`,{},`${e.registered}/${e.maxPlayers}명`),e.full?` · 곧 시작`:` · 다 차면 시작`):$(`span`,{},`시작 `,$(`b`,{},Kh(e.startAt)),` (`,$(`span`,{"data-until":e.startAt},Gh(e.startAt-Date.now())),`) · `,$(`b`,{},`${Z(e.registered)}명`)):e.status===`running`?$(`span`,{},$(`span.badge.live`,{},`진행 중`),` 남은 `,$(`b`,{},`${Z(e.alive)}/${Z(e.registered)}`),` · 레벨 ${e.level.index+1} (${Uh(e.level.sb)}/${Uh(e.level.bb)})`,e.lateRegOpen?` · 늦은 등록 가능`:``):e.status===`finished`?$(`span`,{},`종료`):$(`span`,{},`취소됨`)}function $_(e,t){s.me?.dailyAvailable&&e.append($(`div.banner.daily`,{onclick:async()=>{try{let e=await o.call(`daily.claim`);s.me=e.me,s.wallet=e.wallet,mg.buy(),x_(`출석 보상 🎟️ +${Z(e.got.ticket)} · 💎 +${Z(e.got.gem)}`,`gold`),f(`me`),f(`wallet`),f(`rerender`)}catch(e){x_(e.message,`err`)}}},`🎁`,$(`div.grow`,{},`오늘의 출석 보상 받기`,$(`div.small.muted`,{},`매일 티켓과 젬을 드려요`)),$(`span.gold`,{},`받기`)));let n=s.lobby?.mySeats||s.mySeats||[];for(let r of n)e.append($(`div.banner.seat`,{onclick:()=>t.openTable(r.tableId)},`🃏`,$(`div.grow`,{},`${r.name} — 테이블로 돌아가기`,$(`div.small`,{},r.kind===`tourney`?`대회 진행 중 (자리를 비우면 자동 폴드)`:`연습 테이블`)),`▶`));e.append($(`button.hero-cta`,{onclick:async()=>{mg.unlock();try{let e=await o.call(`practice.join`);t.openTable(e.tableId)}catch(e){x_(e.message,`err`)}}},$(`span.ic`,{},`🥽`),$(`div.grow`,{},$(`div.big`,{},`연습 테이블 바로 앉기`),$(`div.sm`,{},`무료 · AI와 함께 · 폰을 들고 AR로 둘러보세요`)),$(`span`,{style:{fontSize:`22px`,fontWeight:900}},`▶`))),e.append($(`div.note`,{style:{marginTop:`10px`}},`🧪 체험판: 이 기기 안에서 AI와 플레이해요(기록은 이 기기에 저장). 새로고침하면 진행 중이던 대회는 취소되고 참가비는 돌려받아요. 다른 사람과 같이 하는 대회는 정식 서버를 연결하면 열립니다.`));let r=s.lobby?.tourneys||[],i=[[`진행 중`,r.filter(e=>e.status===`running`)],[`등록 중`,r.filter(e=>e.status===`registering`)],[`최근 종료`,r.filter(e=>e.status===`finished`||e.status===`cancelled`).slice(0,4)]];s.lobby||e.append($(`div.center.muted`,{style:{padding:`30px`}},`대회 목록을 불러오는 중…`));for(let[n,r]of i)if(r.length){e.append($(`div.section-title`,{},n));for(let n of r)e.append(ev(n,t))}e.append($(`div.note`,{},`토너 티켓은 대회 참가에만 쓰고, 꾸미기는 젬으로 삽니다. 두 재화는 서로 바꿀 수 없고 현금으로 돌려받을 수 없습니다.`))}function ev(e,t){let n=e.you,r=$(`div.actions`),i=e=>async t=>{t.stopPropagation(),mg.unlock();try{await e()}catch(e){x_(e.message,`err`)}};(e.status===`registering`||e.lateRegOpen)&&(n?e.status===`registering`&&!e.full&&r.append($(`button.btn.sm`,{onclick:i(async()=>{await o.call(`tourney.unregister`,{id:e.id}),x_(`등록 취소(환불됨)`)})},`등록 취소`)):r.append($(`button.btn.gold.sm`,{onclick:i(async()=>{let t=e.buyIn+e.fee;t>0&&!await C_(`${e.name} 등록`,`참가비 🎟️ ${Z(e.buyIn)} + 수수료 ${Z(e.fee)} = ${Z(t)} 티켓이 빠집니다.`,`등록`)||(s.wallet=(await o.call(`tourney.register`,{id:e.id})).wallet,f(`wallet`),x_(`${e.name} 등록 완료`,`ok`))})},e.status===`running`?`늦은 등록`:`등록`)),s.dev&&e.status===`registering`&&!e.full&&(r.append($(`button.btn.cyan.sm`,{onclick:i(()=>o.call(`tourney.devFill`,{id:e.id,n:60}))},e.type===`sng`?`AI로 채우기`:`AI 60명 추가`)),e.type===`mtt`&&e.registered>=2&&r.append($(`button.btn.cyan.sm`,{onclick:i(()=>o.call(`tourney.devStart`,{id:e.id}))},`지금 시작`)))),e.status===`running`&&(n?.status===`playing`&&n.tableId?r.append($(`button.btn.green.sm`,{onclick:i(()=>t.openTable(n.tableId))},`테이블로`)):e.tables.length&&r.append($(`button.btn.sm`,{onclick:i(()=>t.openTable(e.tables[0].id,{watch:!0}))},`관전`)));let a=e.type===`sng`&&e.status===`registering`?$(`div.progress`,{},$(`i`,{style:{width:`${e.registered/e.maxPlayers*100}%`}})):null,c=null;return n&&(n.status===`registered`?c=`✔ 등록함`:n.status===`playing`?c=`▶ 참가 중${n.rank?` · 칩 순위 ${n.rank}위`:``}`:n.place&&(c=`내 결과 ${n.place}위${n.prize?` · 🎟️ ${Z(n.prize)}`:``}`)),$(`div.card.t-card`,{onclick:()=>tv(e,t)},$(`div.row.between`,{},$(`div.row.gap`,{},X_(e),$(`span.name`,{},e.name)),$(`span.prize`,{},`🎟️ ${Z(e.prizePool)}`)),$(`div.meta`,{},$(`span`,{},`참가 `,$(`b`,{},Z_(e))),Q_(e),e.guarantee?$(`span`,{},`보장 ${Z(e.guarantee)}`):null,$(`span`,{},`${e.tableSize}인 테이블`)),a,c?$(`div.you`,{},c):null,r.childNodes.length?r:null)}async function tv(e,t){let n=$(`div`),r=S_(n,{tall:!0}),i=i=>{y_(n),n.append($(`div.row.gap`,{},X_(e),$(`h3`,{},e.name)),$(`div.meta.muted.small`,{style:{marginTop:`6px`}},`참가 ${Z_(e)} · 시작 스택 ${Z(e.startingStack)} · 레벨 ${Math.round(e.levelMs/6e4)}분 · ${e.tableSize}인`),$(`div.section-title`,{},`상금 (🎟️ ${Z(e.prizePool)} · ${e.paidPlaces}위까지)`),$(`div`,{},e.payouts.map((e,t)=>$(`div.list-row`,{},$(`span`,{},`${t+1}위`),$(`b.gold`,{},`🎟️ ${Z(e)}`)))),e.paidPlaces>e.payouts.length?$(`div.small.muted`,{style:{marginTop:`6px`}},`… ${e.paidPlaces}위까지 지급`):null,e.status===`running`&&e.top?.length?$(`div.section-title`,{},`칩 순위`):null,e.status===`running`?$(`div`,{},(e.top||[]).map((e,t)=>$(`div.list-row`,{},$(`span`,{},`${t+1}. ${e.name}`,e.isBot?$(`span.badge.ai`,{style:{marginLeft:`6px`}},`AI`):null),$(`b`,{},Uh(e.stack))))):null,e.status===`running`?$(`div.section-title`,{},`테이블 ${e.tableCount}개 — 눌러서 관전`):null,e.status===`running`?$(`div.items`,{},(i?.tables||e.tables).map(n=>$(`div.item`,{onclick:()=>{r.close(),t.openTable(n.id,{watch:!0})}},$(`div.sw`,{},`🃏`),$(`div.nm`,{},n.name.replace(e.name,``).trim()||`테이블`),$(`div.pr`,{},`${n.players}명`)))):null,$(`div.section-title`,{},`블라인드`),$(`div.small.muted`,{},`레벨 1 50/100 → 2 75/150 → 3 100/200(앤티 25) → 4 150/300(40) → 5 200/400(50) → 6 300/600(75) → …`))};if(i(),e.status===`running`)try{i(await o.call(`tourney.tables`,{id:e.id}))}catch{}}var nv={xr:`AR`,camera:`카메라`,orbit:`3D`};function rv(e,t){let n=$(`div.tbl`);e.append(n);let r=$(`div.bar.xr-block`),i=$(`div.tchip`),a=$(`div.side.xr-block`),c=$(`div.hero`),l=$(`div.actions-bar.xr-block`),u=$(`div.center-msg.hidden`),f=$(`div.your-turn.hidden`,{},`내 차례!`),p=$(`div.xr-hint.hidden.xr-block`),m=$(`div.fps`),h=$(`div.sd.hidden`);n.append(r,i,a,c,l,u,f,p,h,m);let g=!1,_=0,v=!1,y=null,b=-1,x=!1,S=``,C=null,w=()=>s.table,T=()=>(s.lobby?.tourneys||[]).find(e=>e.id===w()?.tourneyId),E=()=>{let e=w();y_(r),r.append($(`button.icon-btn`,{onclick:ce,title:`로비로`},`←`));let n=e?.level,i=T();r.append($(`div.info`,{},$(`div.t1`,{},e?.name||`테이블`),$(`div.t2`,{},n?`블라인드 ${Uh(n.sb)}/${Uh(n.bb)}${n.ante?` · 앤티 ${Uh(n.ante)}`:``}${i?.levelEndsAt?` · 다음 `:``}`:``,i?.levelEndsAt?$(`span`,{"data-until":i.levelEndsAt},Gh(i.levelEndsAt-Date.now())):null)));let a=$(`div.seg`),o=[`orbit`];t.support.camera&&t.support.mobile&&o.unshift(`camera`),t.support.xr&&o.unshift(`xr`);for(let e of o)a.append($(`button${t.modes.mode===e?`.on`:``}`,{onclick:async()=>{mg.unlock();try{await t.modes.set(e)}catch(n){x_(`${nv[e]} 모드를 열 수 없어요: ${n.message}`,`err`,4e3),await t.modes.set(`orbit`)}e===`camera`&&t.modes.cameraError&&x_(`카메라를 켜지 못해 가상 배경으로 보여요`,`err`,3500),E(),O()}},nv[e]));r.append(a)},D=()=>{y_(i);let e=w();if(!e)return;let n=T();n&&n.status===`running`&&(i.append($(`span`,{},`남은 ${Z(n.alive)}/${Z(n.registered)}명 · 상금 ${n.paidPlaces}위까지`)),n.you?.rank&&i.append($(`span`,{},`내 칩 순위 ${n.you.rank}위`))),e.you??i.append($(`span`,{},`👀 관전 중`)),t.modes.mode===`camera`&&i.append($(`span`,{},`📱 폰을 돌려 둘러보세요 · 상대를 누르면 상세 HUD`)),t.modes.mode===`xr`&&t.modes.placed&&i.append($(`span`,{},`🚶 걸어 다니며 보세요 · 상대를 누르면 상세 HUD`))},O=()=>{y_(a);let e=t.modes.mode;e===`camera`&&a.append($(`button.icon-btn`,{title:`가운데 맞추기`,onclick:()=>t.modes.recenter()},`🎯`)),e===`xr`&&(a.append($(`button.icon-btn`,{title:`다시 놓기`,onclick:()=>t.modes.replace()},`📍`)),a.append($(`button.icon-btn`,{title:`실물/미니`,onclick:()=>x_(t.modes.toggleScale()===`mini`?`미니 테이블(책상 위)`:`실물 크기(바닥)`)},`↕️`))),w()?.you!=null&&a.append($(`button.icon-btn`,{title:`이모트`,onclick:()=>{v=!v,g=!1,ne(!0)}},`😀`))},k=(e,t=`bigcard`,n=``)=>{if(!e||e===`??`)return $(`div.${t}.back${n}`);let r=e[1];return $(`div.${t}${s.settings.fourColor?{h:`.r`,d:`.b4`,c:`.g4`,s:``}[r]:r===`h`||r===`d`?`.r`:``}${n}`,{},$(`span.rk`,{},e[0]===`T`?`10`:e[0]),$(`span.su`,{},Yh(r)))},A=``,ee=()=>{let e=w(),t=(e?.seats||[]).filter(e=>e&&e.shown&&e.cards&&e.cards[0]!==`??`),n=JSON.stringify(t.map(e=>[e.seat,e.cards,e.handName,e.won]));if(n!==A&&(A=n,y_(h),h.classList.toggle(`hidden`,!t.length),t.length)){t.sort((e,t)=>(t.won||0)-(e.won||0));for(let n of t){let t=n.won>0;h.append($(`div.sd-row${t?`.win`:``}`,{},$(`div.sd-nm`,{},n.seat===e.you?`나`:n.name),$(`div.sd-cards`,{},n.cards.map(e=>k(e,`midcard`))),$(`div.sd-info`,{},$(`div.sd-hn`,{},n.handName||(e.street===`showdown`?``:`올인 — 카드 공개`)),t?$(`div.sd-won`,{},`+${Uh(n.won)} 승리`):null)))}}},te=()=>{y_(c);let e=w();if(!e||e.you==null)return;let t=e.seats[e.you];if(!t)return;let n=$(`div.hc`);t.cards&&t.inHand&&t.cards.forEach((e,r)=>{let i=k(e,`bigcard`,`.hc${r}`);t.folded&&(i.style.opacity=.4),n.append(i)}),c.append(n,$(`div.hs`,{},e.yourHand&&!t.folded?$(`div.hn`,{},e.yourHand):null,$(`div.st`,{},t.stack===0&&t.allIn?`올인`:Uh(t.stack)),e.level?.bb?$(`div.bb`,{},`${Math.round(t.stack/e.level.bb*10)/10}BB${t.won?` · +${Uh(t.won)}`:``}`):null))},j=async(e,t)=>{g=!1;try{await o.call(`act`,{tableId:w().id,action:e,amount:t})}catch(e){x_(e.message,`err`)}},ne=(e=!1)=>{let t=w(),n=t?.options,r=JSON.stringify([n,g,v,y,t?.you,t?.seats?.[t?.you]?.sittingOut,t?.seats?.[t?.you]?.inHand,t?.seats?.[t?.you]?.folded,g?_:0]);if(!e&&r===S||(S=r,y_(l),!t||t.you==null))return;let i=t.seats[t.you];if(v){let e=$(`div.emote-wheel`);for(let n of s.loadout.emotes){let r=s.itemById[n];e.append($(`button`,{onclick:async()=>{v=!1,ne(!0);try{await o.call(`emote`,{tableId:t.id,motion:n})}catch(e){x_(e.message,`err`)}}},r?.name||n))}l.append(e)}if(i?.sittingOut||i?.away)l.append($(`button.act.call`,{onclick:()=>o.call(`sitin`,{tableId:t.id}).catch(e=>x_(e.message,`err`))},`다시 앉기`,$(`small`,{},`자리비움 해제`)));else if(n){if(g&&n.canRaise){let e=Math.max(1,Math.floor((t.level?.bb||100)/2));_=Math.min(n.maxRaiseTo,Math.max(n.minRaiseTo,_||n.minRaiseTo));let r=$(`div.amt`,{},Uh(_)),i=$(`input`,{type:`range`,min:n.minRaiseTo,max:n.maxRaiseTo,step:e,value:_});i.addEventListener(`input`,()=>{_=Number(i.value),_>n.maxRaiseTo-e&&(_=n.maxRaiseTo),r.textContent=_>=n.maxRaiseTo?`올인 ${Uh(_)}`:Uh(_),mg.tick()});let a=t=>Math.round(Math.min(n.maxRaiseTo,Math.max(n.minRaiseTo,n.currentBet+t*(n.pot+n.toCall)))/e)*e,o=$(`div.quick`,{},[[`최소`,n.minRaiseTo],[`½팟`,a(.5)],[`¾팟`,a(.75)],[`팟`,a(1)],[`올인`,n.maxRaiseTo]].map(([e,t])=>$(`button`,{onclick:()=>{_=Math.min(n.maxRaiseTo,Math.max(n.minRaiseTo,t)),i.value=_,r.textContent=_>=n.maxRaiseTo?`올인 ${Uh(_)}`:Uh(_)}},e)));l.append($(`div.raise-box`,{},r,i,o,$(`div.row.gap`,{style:{marginTop:`10px`}},$(`button.btn.ghost`,{style:{flex:1},onclick:()=>{g=!1,ne(!0)}},`취소`),$(`button.btn.gold`,{style:{flex:2},onclick:()=>j(_>=n.maxRaiseTo?`allin`:`raise`,_)},`${n.currentBet===0?`베팅`:`레이즈`} ${Uh(_)}`))))}let e=$(`div.act-row`);n.canCheck||e.append($(`button.act.fold`,{onclick:()=>j(`fold`)},`폴드`)),e.append(n.canCheck?$(`button.act.call`,{onclick:()=>j(`check`)},`체크`):$(`button.act.call`,{onclick:()=>j(`call`)},n.toCall>=i.stack?`올인 콜`:`콜`,$(`small`,{},Uh(n.toCall)))),n.canRaise&&(n.minRaiseTo>=n.maxRaiseTo?e.append($(`button.act.allin`,{onclick:()=>j(`allin`)},`올인`,$(`small`,{},Uh(n.maxRaiseTo)))):e.append($(`button.act.raise`,{onclick:()=>{g=!g,v=!1,_=n.minRaiseTo,ne(!0)}},n.currentBet===0?`베팅`:`레이즈`,$(`small`,{},`${Uh(n.minRaiseTo)}~`)))),l.append(e)}else i?.inHand&&!i.folded&&!i.allIn&&t.state===`playing`&&l.append($(`div.pre`,{},$(`button${y===`checkfold`?`.on`:``}`,{onclick:()=>{y=y===`checkfold`?null:`checkfold`,b=t.handNo,ne(!0)}},`체크/폴드`),$(`button${y===`callany`?`.on`:``}`,{onclick:()=>{y=y===`callany`?null:`callany`,b=t.handNo,ne(!0)}},`콜 아무거나`)))},re=()=>{let e=w();if(!e?.options||!y)return;if(b!==e.handNo){y=null;return}let t=y;y=null;let n=e.options;t===`checkfold`?j(n.canCheck?`check`:`fold`):t===`callany`&&j(n.canCheck?`check`:`call`)},ie=()=>{let e=w(),n=null;e?e.state===`waiting`&&(n=e.kind===`tourney`?`다른 테이블에서 자리를 옮겨 오는 중…`:`다른 플레이어를 기다리는 중…`):n=`테이블에 연결 중…`,t.modes.mode===`camera`&&t.modes.gyro.on&&!t.modes.gyro.has&&!n&&(n=null),u.classList.toggle(`hidden`,!n),u.textContent=n||``},ae=()=>{let e=w();f.classList.toggle(`hidden`,!e?.options)};t.setXrHandler(({placing:e})=>{p.classList.toggle(`hidden`,!e),p.textContent=e?`바닥이나 책상을 천천히 비춰 주세요. 노란 동그라미가 보이면 화면을 톡 — 그 자리에 테이블이 놓여요.`:``,D()});let oe=e=>{if(x)return;x=!0;let r=e.place===1,i=$(`div.result-box.xr-block`,{},$(`div.panel`,{},$(`div`,{style:{fontSize:`40px`}},r?`🏆`:e.prize?`💰`:`🃏`),$(`div.place`,{},r?`우승!`:`${e.place}위`),$(`div.muted`,{},`${e.name} · ${Z(e.entrants)}명 중`),$(`div.prize`,{},e.prize?`상금 🎟️ ${Z(e.prize)}`:`상금권 밖`),$(`div.small.muted`,{style:{marginBottom:`14px`}},`포인트 +${e.points}`),$(`div.row.gap`,{},$(`button.btn`,{style:{flex:1},onclick:()=>i.remove()},`계속 보기`),$(`button.btn.gold`,{style:{flex:1},onclick:()=>t.go(`lobby`)},`로비로`))));n.append(i),(r||e.prize)&&mg.win()},se=()=>{x||C||(C=$(`div.result-box.xr-block`,{},$(`div.panel`,{},$(`div`,{style:{fontSize:`40px`}},`🃏`),$(`div.place`,{style:{fontSize:`30px`}},`탈락`),$(`div.muted`,{style:{margin:`8px 0 16px`}},`순위와 상금은 늦은 등록이 끝나면 확정돼 알려 드려요.`),$(`div.row.gap`,{},$(`button.btn`,{style:{flex:1},onclick:()=>{C.remove()}},`계속 보기`),$(`button.btn.gold`,{style:{flex:1},onclick:()=>t.go(`lobby`)},`로비로`)))),n.append(C))};async function ce(){let e=w();if(e?.kind===`practice`&&e.you!=null){if(!await C_(`연습 테이블에서 나갈까요?`,`연습 칩은 저장되지 않아요.`,`나가기`))return;o.call(`table.leave`,{tableId:e.id}).catch(()=>{})}else if(e?.kind===`tourney`&&e.you!=null){if(!await C_(`로비로 갈까요?`,`대회 자리는 그대로예요. 내 차례가 오면 자동으로 체크/폴드되고, 로비에서 언제든 돌아올 수 있어요.`,`로비로`))return;o.call(`table.unwatch`).catch(()=>{})}else o.call(`table.unwatch`).catch(()=>{});t.go(`lobby`)}E(),D(),O(),te(),ee(),ne(),ie(),ae(),re();let M=``,le=[d(`table`,()=>{let e=w(),t=JSON.stringify([e?.id,e?.name,e?.level,e?.you]);t!==M&&(M=t,E(),D(),O()),te(),ee(),ne(),ie(),ae(),re(),e&&(e.event?.type===`hand_start`||e.event?.type===`join`||e.event?.type===`leave`)&&O()}),d(`lobby`,()=>{E(),D()}),d(`result`,e=>{e.tourneyId===w()?.tourneyId&&!e.cancelled&&(C?.remove(),oe(e))}),d(`busted`,e=>e===w()?.tourneyId&&se()),d(`tap`,e=>{let t=w();e?.userId&&V_(e.userId,{stack:e.player?.stack,bb:t?.level?.bb})})],ue=setInterval(()=>{for(let e of n.querySelectorAll(`[data-until]`))e.textContent=Gh(Number(e.dataset.until)-Date.now());m.textContent=s.dev?`${t.engine.fps}fps`:``},500);return()=>{clearInterval(ue),le.forEach(e=>e()),t.setXrHandler(null),n.remove()}}var iv=document.getElementById(`ui`),av=new Od(document.getElementById(`gl`)),ov=new lh(av),sv=new Vg,cv=null,lv=new f_(av,sv,{onMode:e=>{document.body.classList.toggle(`cam-on`,e===`camera`||e===`xr`),f(`mode`,e)},onTap:e=>f(`tap`,e),onXrState:e=>cv?.(e)}),uv={scene:sv.scene,get camera(){return av.camera},update(e,t,n){lv.update(e,t,n);let r=av.renderer.xr;sv.update(e,t,r.isPresenting?r.getCamera():av.camera)}},dv={engine:av,showroom:ov,table:sv,modes:lv,support:{xr:!1,camera:!1,mobile:!1},go:pv,openTable:mv,setXrHandler:e=>cv=e};d_().then(e=>{dv.support=e,f(`lobby`)}),iv.addEventListener(`beforexrselect`,e=>{e.target.closest?.(`.xr-block, button, input, textarea, .sheet`)&&e.preventDefault()}),document.addEventListener(`pointerdown`,()=>mg.unlock(),{once:!0});var fv=null;async function pv(e,t={}){if(fv?.(),fv=null,s.screen=e,e===`boot`){let e=$(`div.boot`,{},$(`div`,{},$(`div.logo`,{},`홀덤 AR`),$(`div.sub`,{},`폰을 들고 둘러보는 증강현실 홀덤`),$(`div.spinner`)));iv.append(e),av.setView(null),fv=()=>e.remove()}else e===`lobby`?(lv.mode&&await lv.exit(),document.body.classList.remove(`cam-on`),s.tableId=null,s.table=null,av.setView(ov),fv=Y_(iv,dv)):e===`table`&&(s.tableId=t.tableId,s.table=null,av.setView(uv),lv.mode||await lv.set(`orbit`),fv=rv(iv,dv),dv.support.mobile&&(dv.support.xr||dv.support.camera)&&!s.arTipShown&&(s.arTipShown=!0,x_(dv.support.xr?`위쪽 AR 버튼 → 바닥에 테이블을 놓고 걸어 다니며 보세요`:`위쪽 카메라 버튼 → 폰을 들고 둘러보세요`,`gold`,4500)))}async function mv(e){await pv(`table`,{tableId:e});try{await o.call(`table.watch`,{tableId:e})}catch(e){x_(e.message,`err`),pv(`lobby`)}}o.on(`table`,e=>{s.screen===`table`&&e.view.id===s.tableId&&(s.table=e.view,sv.apply(e.view),f(`table`))}),o.on(`lobby`,e=>{s.lobby=e.lobby,s.mySeats=e.lobby.mySeats||[],f(`lobby`)}),o.on(`wallet`,e=>{s.wallet=e.wallet,f(`wallet`)}),o.on(`seat`,e=>{e.tableId?s.screen===`table`&&s.table?.tourneyId&&s.table.tourneyId===e.tourneyId?(s.tableId=e.tableId,e.moved&&x_(`테이블 밸런싱 — 다른 테이블로 옮겼어요`,`gold`)):s.screen===`lobby`||s.screen===`table`&&s.table?.you==null?(x_(`${e.tourneyName||`대회`} 시작! 자리로 갑니다`,`gold`),mv(e.tableId)):x_(`${e.tourneyName||`대회`}가 시작됐어요 — 로비에서 테이블로 가세요`,`gold`,4e3):e.tourneyId&&s.screen===`table`&&s.table?.tourneyId===e.tourneyId&&f(`busted`,e.tourneyId)}),o.on(`turn`,e=>{if(s.screen===`table`&&s.tableId===e.tableId)return;mg.turn();let t=$(`div.toast.gold.show`,{style:{cursor:`pointer`},onclick:()=>mv(e.tableId)},`🃏 ${e.name} — 내 차례! 눌러서 가기`),n=document.querySelector(`.toasts`);n?(n.append(t),setTimeout(()=>t.remove(),6e3)):x_(`${e.name} — 내 차례!`,`gold`)}),o.on(`result`,e=>{let t=e.result;t.cancelled?x_(`${t.name}: ${t.message} (환불됨)`,`err`,4e3):(s.results=[t,...s.results||[]].slice(0,10),f(`result`,t),(s.screen!==`table`||s.table?.tourneyId!==t.tourneyId)&&x_(`${t.name} ${t.place}위${t.prize?` · 상금 🎟️ ${Z(t.prize)}`:``}`,`gold`,5e3))}),o.on(`tableClosed`,e=>{s.screen===`table`&&s.tableId===e.tableId&&setTimeout(()=>{s.screen===`table`&&s.tableId===e.tableId&&!document.querySelector(`.result-box`)&&(x_(`테이블이 닫혔어요`,`info`),pv(`lobby`))},2500)}),d(`goWardrobe`,()=>{s.tab=`wardrobe`,pv(`lobby`)});var hv=null;o.onStatus=e=>{e===`closed`&&s.me&&!hv&&(hv=$(`div.toast.err.show`,{style:{position:`fixed`,top:`calc(8px + env(safe-area-inset-top))`,left:`50%`,transform:`translateX(-50%)`,zIndex:70}},`연결이 끊겼어요 — 다시 연결 중…`),document.body.append(hv)),e===`open`&&hv&&(hv.remove(),hv=null)},o.onOpen=async()=>{let e=null;try{e=localStorage.getItem(`har.token`)}catch{}try{let t=await o.call(`hello`,{token:e});try{localStorage.setItem(`har.token`,t.token)}catch{}m(t),s.screen===`boot`?(await pv(`lobby`),I_(),t.created&&x_(`환영해요! 가입 선물 🎟️ ${Z(t.wallet.ticket)} · 💎 ${Z(t.wallet.gem)}`,`gold`,4e3)):s.screen===`table`&&s.tableId?(o.call(`table.watch`,{tableId:s.tableId}).catch(()=>pv(`lobby`)),o.call(`lobby.sub`,{on:!0}).catch(()=>{})):(o.call(`lobby.sub`,{on:!0}).catch(()=>{}),f(`rerender`))}catch(e){x_(e.message,`err`)}},pv(`boot`),o.connect(),window.__har={S:s,engine:av,table:sv,modes:lv,net:o,go:pv,openTable:mv,showroom:ov};