import{r as c,a as h}from"./index.a94dd550.js";import{r as O}from"./index.bd385306.js";function E(){return E=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},E.apply(this,arguments)}function G(e,n,{checkForDefaultPrevented:t=!0}={}){return function(r){if(e?.(r),t===!1||!r.defaultPrevented)return n?.(r)}}function _(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function g(...e){return n=>e.forEach(t=>_(t,n))}function P(...e){return c.useCallback(g(...e),e)}function w(e,n=[]){let t=[];function o(s,l){const u=c.createContext(l),a=t.length;t=[...t,l];function i(d){const{scope:$,children:m,...f}=d,C=$?.[e][a]||u,v=c.useMemo(()=>f,Object.values(f));return c.createElement(C.Provider,{value:v},m)}function p(d,$){const m=$?.[e][a]||u,f=c.useContext(m);if(f)return f;if(l!==void 0)return l;throw new Error(`\`${d}\` must be used within \`${s}\``)}return i.displayName=s+"Provider",[i,p]}const r=()=>{const s=t.map(l=>c.createContext(l));return function(u){const a=u?.[e]||s;return c.useMemo(()=>({[`__scope${e}`]:{...u,[e]:a}}),[u,a])}};return r.scopeName=e,[o,U(r,...n)]}function U(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const o=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(s){const l=o.reduce((u,{useScope:a,scopeName:i})=>{const d=a(s)[`__scope${i}`];return{...u,...d}},{});return c.useMemo(()=>({[`__scope${n.scopeName}`]:l}),[l])}};return t.scopeName=n.scopeName,t}const A=c.forwardRef((e,n)=>{const{children:t,...o}=e,r=c.Children.toArray(t),s=r.find(D);if(s){const l=s.props.children,u=r.map(a=>a===s?c.Children.count(l)>1?c.Children.only(null):c.isValidElement(l)?l.props.children:null:a);return c.createElement(M,E({},o,{ref:n}),c.isValidElement(l)?c.cloneElement(l,void 0,u):null)}return c.createElement(M,E({},o,{ref:n}),t)});A.displayName="Slot";const M=c.forwardRef((e,n)=>{const{children:t,...o}=e;return c.isValidElement(t)?c.cloneElement(t,{...j(o,t.props),ref:n?g(n,t.ref):t.ref}):c.Children.count(t)>1?c.Children.only(null):null});M.displayName="SlotClone";const L=({children:e})=>c.createElement(c.Fragment,null,e);function D(e){return c.isValidElement(e)&&e.type===L}function j(e,n){const t={...n};for(const o in n){const r=e[o],s=n[o];/^on[A-Z]/.test(o)?r&&s?t[o]=(...u)=>{s(...u),r(...u)}:r&&(t[o]=r):o==="style"?t[o]={...r,...s}:o==="className"&&(t[o]=[r,s].filter(Boolean).join(" "))}return{...e,...t}}function J(e){const n=e+"CollectionProvider",[t,o]=w(n),[r,s]=t(n,{collectionRef:{current:null},itemMap:new Map}),l=m=>{const{scope:f,children:C}=m,v=h.useRef(null),N=h.useRef(new Map).current;return h.createElement(r,{scope:f,itemMap:N,collectionRef:v},C)},u=e+"CollectionSlot",a=h.forwardRef((m,f)=>{const{scope:C,children:v}=m,N=s(u,C),b=P(f,N.collectionRef);return h.createElement(A,{ref:b},v)}),i=e+"CollectionItemSlot",p="data-radix-collection-item",d=h.forwardRef((m,f)=>{const{scope:C,children:v,...N}=m,b=h.useRef(null),R=P(f,b),x=s(i,C);return h.useEffect(()=>(x.itemMap.set(b,{ref:b,...N}),()=>void x.itemMap.delete(b))),h.createElement(A,{[p]:"",ref:R},v)});function $(m){const f=s(e+"CollectionConsumer",m);return h.useCallback(()=>{const v=f.collectionRef.current;if(!v)return[];const N=Array.from(v.querySelectorAll(`[${p}]`));return Array.from(f.itemMap.values()).sort((x,I)=>N.indexOf(x.ref.current)-N.indexOf(I.ref.current))},[f.collectionRef,f.itemMap])}return[{Provider:l,Slot:a,ItemSlot:d},$,o]}const V=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],K=V.reduce((e,n)=>{const t=c.forwardRef((o,r)=>{const{asChild:s,...l}=o,u=s?A:n;return c.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),c.createElement(u,E({},l,{ref:r}))});return t.displayName=`Primitive.${n}`,{...e,[n]:t}},{});function Q(e,n){e&&O.flushSync(()=>e.dispatchEvent(n))}function T(e){const n=c.useRef(e);return c.useEffect(()=>{n.current=e}),c.useMemo(()=>(...t)=>{var o;return(o=n.current)===null||o===void 0?void 0:o.call(n,...t)},[])}const y=globalThis?.document?c.useLayoutEffect:()=>{};function k(e,n){return c.useReducer((t,o)=>{const r=n[t][o];return r??t},e)}const B=e=>{const{present:n,children:t}=e,o=F(n),r=typeof t=="function"?t({present:o.isPresent}):c.Children.only(t),s=P(o.ref,r.ref);return typeof t=="function"||o.isPresent?c.cloneElement(r,{ref:s}):null};B.displayName="Presence";function F(e){const[n,t]=c.useState(),o=c.useRef({}),r=c.useRef(e),s=c.useRef("none"),l=e?"mounted":"unmounted",[u,a]=k(l,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return c.useEffect(()=>{const i=S(o.current);s.current=u==="mounted"?i:"none"},[u]),y(()=>{const i=o.current,p=r.current;if(p!==e){const $=s.current,m=S(i);e?a("MOUNT"):m==="none"||i?.display==="none"?a("UNMOUNT"):a(p&&$!==m?"ANIMATION_OUT":"UNMOUNT"),r.current=e}},[e,a]),y(()=>{if(n){const i=d=>{const m=S(o.current).includes(d.animationName);d.target===n&&m&&O.flushSync(()=>a("ANIMATION_END"))},p=d=>{d.target===n&&(s.current=S(o.current))};return n.addEventListener("animationstart",p),n.addEventListener("animationcancel",i),n.addEventListener("animationend",i),()=>{n.removeEventListener("animationstart",p),n.removeEventListener("animationcancel",i),n.removeEventListener("animationend",i)}}else a("ANIMATION_END")},[n,a]),{isPresent:["mounted","unmountSuspended"].includes(u),ref:c.useCallback(i=>{i&&(o.current=getComputedStyle(i)),t(i)},[])}}function S(e){return e?.animationName||"none"}function W({prop:e,defaultProp:n,onChange:t=()=>{}}){const[o,r]=q({defaultProp:n,onChange:t}),s=e!==void 0,l=s?e:o,u=T(t),a=c.useCallback(i=>{if(s){const d=typeof i=="function"?i(e):i;d!==e&&u(d)}else r(i)},[s,e,r,u]);return[l,a]}function q({defaultProp:e,onChange:n}){const t=c.useState(e),[o]=t,r=c.useRef(o),s=T(n);return c.useEffect(()=>{r.current!==o&&(s(o),r.current=o)},[o,r,s]),t}export{y as $,E as _,w as a,K as b,G as c,B as d,P as e,W as f,J as g,T as h,Q as i};
