const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dq0c1aoO.js","assets/AnimatedLabel-CdFvQLtw.js","assets/AnimatedLine-BjDiZPth.js","assets/array-BsYRcXjQ.js","assets/index-O_ZtlmOv.js","assets/showInConstructionMessage-BJwZSrBn.js","assets/index-DbGalmto.js","assets/index-DH6-051M.js","assets/index-Dlbjq7hV.js","assets/index-BIz7XIgJ.js","assets/index-YcMBK46c.js","assets/index-e7ol1PkO.js","assets/index-Ck6Z3KFU.js","assets/index-BUWURN-w.js","assets/index-DuCLj3Ir.js","assets/index-DT1lx8dP.js","assets/index-DI0N5zni.js","assets/index-CviMRv3C.js","assets/index-EYZlcQW4.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const w="modulepreload",b=function(t){return"/aoc-2024/"+t},g={},n=function(e,i,s){let o=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=Promise.allSettled(i.map(d=>{if(d=b(d),d in g)return;g[d]=!0;const p=d.endsWith(".css"),x=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const c=document.createElement("link");if(c.rel=p?"stylesheet":w,p||(c.as="script"),c.crossOrigin="",c.href=d,u&&c.setAttribute("nonce",u),document.head.appendChild(c),p)return new Promise((T,V)=>{c.addEventListener("load",T),c.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return o.then(l=>{for(const u of l||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})},C=(t,e,i)=>{const s=t[e];return s?typeof s=="function"?s():Promise.resolve(s):new Promise((o,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})};let _=[],m=[];const O=(t,e)=>{if(_.length===0)return e();t.clearRect(0,0,t.canvas.width,t.canvas.height),m.forEach(s=>s.draw(t));const i=[];_.forEach(s=>{s.tick()?s.keepDrawingAfterAnimation&&m.push(s):i.push(s)}),_=i,requestAnimationFrame(()=>O(t,e))},$=(t,e)=>(_.push(...e),new Promise(i=>{O(t,i)})),R=()=>{_=[],m=[]},N=t=>{m=m.filter(e=>!t.includes(e))},B=document.getElementById("ui"),I=document.getElementById("days"),h=document.getElementById("part"),L=document.getElementById("solution"),E=document.getElementById("puzzle-input-wrapper"),v=document.getElementById("puzzle-input"),S=document.getElementById("run-button"),A=L.getContext("2d");window.addEventListener("resize",y);const D="last-active-module",k=localStorage.getItem(D);let a=null,f=null;q();const P=()=>{a&&(y(),R(),f===1?a.part1(A,v.value):f===2&&a.part2(A,v.value))};function y(){L.width=window.innerWidth,L.height=window.innerHeight-B.getBoundingClientRect().height-E.getBoundingClientRect().height-10}function z(){const t=document.createElement("button");t.textContent="Part 1",t.onclick=()=>{a&&(f=1,v.value=a.input||"",E.style.visibility="visible",P(),t.classList.add("active"),e.classList.remove("active"))};const e=document.createElement("button");e.textContent="Part 2",e.onclick=()=>{a&&(f=2,v.value=a.input||"",E.style.visibility="visible",P(),t.classList.remove("active"),e.classList.add("active"))},h.appendChild(t),h.appendChild(e),y()}async function q(){for(let t=1;t<=25;t++)try{const e=await C(Object.assign({"./solutions/1/index.ts":()=>n(()=>import("./index-Dq0c1aoO.js"),__vite__mapDeps([0,1,2,3])),"./solutions/10/index.ts":()=>n(()=>import("./index-O_ZtlmOv.js"),__vite__mapDeps([4,5,1])),"./solutions/11/index.ts":()=>n(()=>import("./index-DbGalmto.js"),__vite__mapDeps([6,5,1,3])),"./solutions/12/index.ts":()=>n(()=>import("./index-DH6-051M.js"),__vite__mapDeps([7,5,1,3])),"./solutions/13/index.ts":()=>n(()=>import("./index-Dlbjq7hV.js"),__vite__mapDeps([8,5,1])),"./solutions/14/index.ts":()=>n(()=>import("./index-BIz7XIgJ.js"),__vite__mapDeps([9,5,1,3])),"./solutions/15/index.ts":()=>n(()=>import("./index-YcMBK46c.js"),__vite__mapDeps([10,5,1])),"./solutions/16/index.ts":()=>n(()=>import("./index-Di5_bdBc.js"),[]),"./solutions/17/index.ts":()=>n(()=>import("./index-DsHkFCQ2.js"),[]),"./solutions/18/index.ts":()=>n(()=>import("./index-CkB5vKqX.js"),[]),"./solutions/19/index.ts":()=>n(()=>import("./index-Dz7y58Rw.js"),[]),"./solutions/2/index.ts":()=>n(()=>import("./index-e7ol1PkO.js"),__vite__mapDeps([11,1,2])),"./solutions/20/index.ts":()=>n(()=>import("./index-DGtMBB2D.js"),[]),"./solutions/21/index.ts":()=>n(()=>import("./index-Cnp3EzX9.js"),[]),"./solutions/22/index.ts":()=>n(()=>import("./index-CHg88vbI.js"),[]),"./solutions/23/index.ts":()=>n(()=>import("./index-DkLw_wHP.js"),[]),"./solutions/24/index.ts":()=>n(()=>import("./index-7o6AqUN_.js"),[]),"./solutions/25/index.ts":()=>n(()=>import("./index-C-TUD7mO.js"),[]),"./solutions/3/index.ts":()=>n(()=>import("./index-Ck6Z3KFU.js"),__vite__mapDeps([12,5,1,3])),"./solutions/4/index.ts":()=>n(()=>import("./index-BUWURN-w.js"),__vite__mapDeps([13,5,1])),"./solutions/5/index.ts":()=>n(()=>import("./index-DuCLj3Ir.js"),__vite__mapDeps([14,5,1])),"./solutions/6/index.ts":()=>n(()=>import("./index-DT1lx8dP.js"),__vite__mapDeps([15,5,1])),"./solutions/7/index.ts":()=>n(()=>import("./index-DI0N5zni.js"),__vite__mapDeps([16,5,1])),"./solutions/8/index.ts":()=>n(()=>import("./index-CviMRv3C.js"),__vite__mapDeps([17,5,1])),"./solutions/9/index.ts":()=>n(()=>import("./index-EYZlcQW4.js"),__vite__mapDeps([18,5,1]))}),`./solutions/${t}/index.ts`,4),i=document.createElement("button");i.classList.add("day-tile"),i.textContent=`Day ${t}`,i.onclick=()=>{localStorage.setItem(D,t.toString()),a=e,R(),h.replaceChildren(),E.style.visibility="hidden";for(const s of I.getElementsByClassName("day-tile"))s.classList.remove("active");i.classList.add("active"),z()},k===t.toString()&&i.click(),I.appendChild(i)}catch{break}y()}S.addEventListener("click",P);export{N as a,$ as r};
