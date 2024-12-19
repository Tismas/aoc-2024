const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DKKTWhXJ.js","assets/AnimatedLabel-CdFvQLtw.js","assets/AnimatedLine-BjDiZPth.js","assets/array-BsYRcXjQ.js","assets/index-DEv7N6wX.js","assets/showInConstructionMessage-OeQxt8hy.js","assets/index-DcB8LcRJ.js","assets/index-BqWN1e9t.js","assets/index-klGl0_Pe.js","assets/index-BGBpOkfN.js","assets/index-ChDEkHDq.js","assets/index-DxOy9r3Q.js","assets/index-DPRznj9-.js","assets/index-C6DsxNRG.js","assets/index-C6OLb00R.js","assets/index-DpK39tBh.js","assets/index-BNos1X5n.js","assets/index-FCSpr0Lq.js","assets/index-DaEBLywN.js","assets/index-D3cfipV5.js","assets/index-BUImP2E2.js","assets/index-C7wRPvep.js","assets/index-Cq9EewvV.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const S="modulepreload",B=function(t){return"/aoc-2024/"+t},I={},i=function(e,n,s){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=Promise.allSettled(n.map(c=>{if(c=B(c),c in I)return;I[c]=!0;const p=c.endsWith(".css"),w=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${w}`))return;const a=document.createElement("link");if(a.rel=p?"stylesheet":S,p||(a.as="script"),a.crossOrigin="",a.href=c,u&&a.setAttribute("nonce",u),document.head.appendChild(a),p)return new Promise((b,C)=>{a.addEventListener("load",b),a.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return o.then(l=>{for(const u of l||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})},k=(t,e,n)=>{const s=t[e];return s?typeof s=="function"?s():Promise.resolve(s):new Promise((o,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==n?". Note that variables only represent file names one level deep.":""))))})};let _=[],m=[];const V=(t,e)=>{if(_.length===0)return e();t.clearRect(0,0,t.canvas.width,t.canvas.height),m.forEach(s=>s.draw(t));const n=[];_.forEach(s=>{s.tick()?s.keepDrawingAfterAnimation&&m.push(s):n.push(s)}),_=n,requestAnimationFrame(()=>V(t,e))},U=(t,e)=>(_.push(...e),new Promise(n=>{V(t,n)})),x=()=>{_=[],m=[]},K=t=>{m=m.filter(e=>!t.includes(e))},z=document.getElementById("ui"),A=document.getElementById("days"),g=document.getElementById("part"),L=document.getElementById("solution"),E=document.getElementById("puzzle-input-wrapper"),v=document.getElementById("puzzle-input"),q=document.getElementById("run-button"),O=L.getContext("2d");window.addEventListener("resize",y);const T="last-active-module";let R=localStorage.getItem(T);const h="last-active-part";let D=localStorage.getItem(h),d=null,f=null;N();const P=()=>{d&&(y(),x(),f===1?d.part1(O,v.value):f===2&&d.part2(O,v.value))};function y(){L.width=window.innerWidth,L.height=window.innerHeight-z.getBoundingClientRect().height-E.getBoundingClientRect().height-10}function $(){const t=document.createElement("button");t.textContent="Part 1",t.onclick=()=>{d&&(f=1,v.value=d.input||"",E.style.visibility="visible",P(),t.classList.add("active"),e.classList.remove("active"),localStorage.setItem(h,"1"))};const e=document.createElement("button");e.textContent="Part 2",e.onclick=()=>{d&&(f=2,v.value=d.input||"",E.style.visibility="visible",P(),t.classList.remove("active"),e.classList.add("active"),localStorage.setItem(h,"2"))},g.appendChild(t),g.appendChild(e),y(),D==="1"&&t.click(),D==="2"&&e.click()}async function N(){for(let t=1;t<=25;t++)try{const e=await k(Object.assign({"./solutions/1/index.ts":()=>i(()=>import("./index-DKKTWhXJ.js"),__vite__mapDeps([0,1,2,3])),"./solutions/10/index.ts":()=>i(()=>import("./index-DEv7N6wX.js"),__vite__mapDeps([4,5,1])),"./solutions/11/index.ts":()=>i(()=>import("./index-DcB8LcRJ.js"),__vite__mapDeps([6,5,1,3])),"./solutions/12/index.ts":()=>i(()=>import("./index-BqWN1e9t.js"),__vite__mapDeps([7,5,1,3])),"./solutions/13/index.ts":()=>i(()=>import("./index-klGl0_Pe.js"),__vite__mapDeps([8,5,1])),"./solutions/14/index.ts":()=>i(()=>import("./index-BGBpOkfN.js"),__vite__mapDeps([9,5,1,3])),"./solutions/15/index.ts":()=>i(()=>import("./index-ChDEkHDq.js"),__vite__mapDeps([10,5,1])),"./solutions/16/index.ts":()=>i(()=>import("./index-DxOy9r3Q.js"),__vite__mapDeps([11,5,1])),"./solutions/17/index.ts":()=>i(()=>import("./index-DPRznj9-.js"),__vite__mapDeps([12,5,1])),"./solutions/18/index.ts":()=>i(()=>import("./index-C6DsxNRG.js"),__vite__mapDeps([13,5,1])),"./solutions/19/index.ts":()=>i(()=>import("./index-C6OLb00R.js"),__vite__mapDeps([14,5,1])),"./solutions/2/index.ts":()=>i(()=>import("./index-DpK39tBh.js"),__vite__mapDeps([15,1,2])),"./solutions/20/index.ts":()=>i(()=>import("./index-Di5_bdBc.js"),[]),"./solutions/21/index.ts":()=>i(()=>import("./index-DsHkFCQ2.js"),[]),"./solutions/22/index.ts":()=>i(()=>import("./index-CkB5vKqX.js"),[]),"./solutions/23/index.ts":()=>i(()=>import("./index-Dz7y58Rw.js"),[]),"./solutions/24/index.ts":()=>i(()=>import("./index-DGtMBB2D.js"),[]),"./solutions/25/index.ts":()=>i(()=>import("./index-Cnp3EzX9.js"),[]),"./solutions/3/index.ts":()=>i(()=>import("./index-BNos1X5n.js"),__vite__mapDeps([16,5,1,3])),"./solutions/4/index.ts":()=>i(()=>import("./index-FCSpr0Lq.js"),__vite__mapDeps([17,5,1])),"./solutions/5/index.ts":()=>i(()=>import("./index-DaEBLywN.js"),__vite__mapDeps([18,5,1])),"./solutions/6/index.ts":()=>i(()=>import("./index-D3cfipV5.js"),__vite__mapDeps([19,5,1])),"./solutions/7/index.ts":()=>i(()=>import("./index-BUImP2E2.js"),__vite__mapDeps([20,5,1])),"./solutions/8/index.ts":()=>i(()=>import("./index-C7wRPvep.js"),__vite__mapDeps([21,5,1])),"./solutions/9/index.ts":()=>i(()=>import("./index-Cq9EewvV.js"),__vite__mapDeps([22,5,1]))}),`./solutions/${t}/index.ts`,4),n=document.createElement("button");n.classList.add("day-tile"),n.textContent=`Day ${t}`,n.onclick=()=>{R=t.toString(),localStorage.setItem(T,t.toString()),d=e,x(),g.replaceChildren(),E.style.visibility="hidden";for(const s of A.getElementsByClassName("day-tile"))s.classList.remove("active");n.classList.add("active"),$()},R===t.toString()&&n.click(),A.appendChild(n)}catch{break}y()}q.addEventListener("click",P);export{K as a,U as r};