import{r as s,j as e}from"./index-R_aA3I9k.js";import{c,A as a,m as n}from"./Footer-UUiy42bp.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],p=c("chevron-up",l);function h(){const[i,o]=s.useState(!1);s.useEffect(()=>{const t=()=>{window.scrollY>500?o(!0):o(!1)};return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]);const r=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e.jsx(a,{children:i&&e.jsx(n.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},whileHover:{scale:1.1},whileTap:{scale:.9},onClick:r,className:"fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center border border-accent bg-accent text-accent-foreground shadow-[0_12px_28px_rgba(214,0,0,0.25)] transition-all hover:bg-[var(--accent-deep)]","aria-label":"Scroll to top",children:e.jsx(p,{size:24})})})}export{h as S};
