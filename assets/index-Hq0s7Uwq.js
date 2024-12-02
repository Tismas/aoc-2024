const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BhTIEjEc.js","assets/AnimatedLine-BdHaIZJI.js","assets/index-BeTXIG6t.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const A="modulepreload",B=function(e){return"/aoc-2024/"+e},v={},E=function(t,o,r){let n=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(o.map(a=>{if(a=B(a),a in v)return;v[a]=!0;const f=a.endsWith(".css"),P=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${P}`))return;const l=document.createElement("link");if(l.rel=f?"stylesheet":A,f||(l.as="script"),l.crossOrigin="",l.href=a,c&&l.setAttribute("nonce",c),document.head.appendChild(l),f)return new Promise((b,_)=>{l.addEventListener("load",b),l.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return n.then(s=>{for(const c of s||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})},O=(e,t,o)=>{const r=e[t];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((n,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==o?". Note that variables only represent file names one level deep.":""))))})};let u=[],m=[];const L=(e,t)=>{if(u.length===0)return t();e.clearRect(0,0,e.canvas.width,e.canvas.height),m.forEach(r=>r.draw(e));const o=[];u.forEach(r=>{r.tick()?r.keepDrawingAfterAnimation&&m.push(r):o.push(r)}),u=o,requestAnimationFrame(()=>L(e,t))},S=(e,t)=>(u.push(...t),new Promise(o=>{L(e,o)})),p=()=>{u=[],m=[]},D=e=>{m=m.filter(t=>!e.includes(t))},k=document.getElementById("ui"),w=document.getElementById("days"),h=document.getElementById("part"),y=document.getElementById("solution"),C=y.getContext("2d");window.addEventListener("resize",g);let d=null;R();function g(){y.width=window.innerWidth,y.height=window.innerHeight-k.getBoundingClientRect().height}function I(){const e=document.createElement("button");e.textContent="Part 1",e.onclick=()=>{p(),d==null||d.part1(C),e.classList.add("active"),t.classList.remove("active")};const t=document.createElement("button");t.textContent="Part 2",t.onclick=()=>{p(),d==null||d.part2(C),e.classList.remove("active"),t.classList.add("active")},h.appendChild(e),h.appendChild(t),g()}async function R(){for(let e=1;e<=25;e++)try{const t=await O(Object.assign({"./solutions/1/index.ts":()=>E(()=>import("./index-BhTIEjEc.js"),__vite__mapDeps([0,1])),"./solutions/2/index.ts":()=>E(()=>import("./index-BeTXIG6t.js"),__vite__mapDeps([2,1]))}),`./solutions/${e}/index.ts`,4),o=document.createElement("button");o.classList.add("day-tile"),o.textContent=`Day ${e}`,o.onclick=()=>{d=t,p(),h.replaceChildren();for(const r of w.getElementsByClassName("day-tile"))r.classList.remove("active");o.classList.add("active"),I()},w.appendChild(o)}catch{break}g()}export{D as a,S as r};