import{s as c}from"./showInConstructionMessage-BHFZNiT9.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-CCi37Fdq.js";const h=(t,n)=>{const[r,o]=n.split(`

`),e=r.split(", "),i=o.split(`
`);e.sort((s,a)=>a.length-s.length);let l=0;for(const s of i)p(s,e)&&l++;c(t,l)},p=(t,n)=>{if(t.length===0)return!0;for(const r of n)if(t.startsWith(r)&&p(t.replace(r,""),n))return!0;return!1},P=(t,n)=>{const[r,o]=n.split(`

`),e=r.split(", "),i=o.split(`
`);e.sort((s,a)=>a.length-s.length);let l=0;for(const s of i)l+=f(s,e);c(t,l)},b={},f=(t,n)=>{if(t.length===0)return 1;if(b[t])return b[t];let r=0;for(const o of n)t.startsWith(o)&&(r+=f(t.replace(o,""),n));return b[t]=r,r},m=`r, wr, b, g, bwu, rb, gb, br\r
\r
brwrr\r
bggr\r
gbbr\r
rrbgbr\r
ubwu\r
bwurrg\r
brgr\r
bbrgwb`;export{m as input,h as part1,P as part2};
