import{r as t,j as r}from"./index-72FT7hR9.js";import{c}from"./Footer-DIPtiL3w.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],l=c("chevron-up",a);function p(){const[s,n]=t.useState(!1);t.useEffect(()=>{let e=0;const o=()=>{e||(e=window.requestAnimationFrame(()=>{n(window.scrollY>500),e=0}))};return o(),window.addEventListener("scroll",o,{passive:!0}),()=>{window.removeEventListener("scroll",o),e&&window.cancelAnimationFrame(e)}},[]);const i=()=>{window.scrollTo({top:0,behavior:"smooth"})};return s?r.jsx("button",{onClick:i,className:"fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center border border-accent bg-accent text-accent-foreground shadow-[0_12px_28px_rgba(214,0,0,0.25)] transition-transform hover:scale-110 hover:bg-[var(--accent-deep)] active:scale-90 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12","aria-label":"Scroll to top",children:r.jsx(l,{size:24})}):null}export{p as S};
