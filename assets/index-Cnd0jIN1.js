import{s as d}from"./showInConstructionMessage-BHFZNiT9.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-CCi37Fdq.js";const k=(c,i)=>{const n={};for(const t of i.split(`
`)){const[o,e]=t.split("-");n[o]||(n[o]=[]),n[o].push(e),n[e]||(n[e]=[]),n[e].push(o)}let s=new Set;const r=Object.keys(n).filter(t=>t.startsWith("t"));for(const t of r){const o=n[t];for(const e of o){const a=n[e];for(const l of a)n[l].includes(t)&&s.add([t,e,l].sort((p,h)=>p.localeCompare(h)).join(","))}}d(c,s.size)},m=(c,i)=>{const n={};for(const r of i.split(`
`)){const[t,o]=r.split("-");n[t]||(n[t]=[]),n[t].push(o),n[o]||(n[o]=[]),n[o].push(t)}let s=new Set(Object.keys(n));for(;s.size>1;){let r=new Set;for(const t of[...s]){const o=t.split(",")[0],e=n[o].filter(a=>!t.includes(a));for(const a of e){const l=[...t.split(","),a];u(l,n)&&r.add(l.sort((f,p)=>f.localeCompare(p)).join(","))}}s=r}d(c,[...s][0])},u=(c,i)=>c.every(n=>q(n,c.filter(s=>s!==n),i)),q=(c,i,n)=>{for(const s of i)if(!n[s].includes(c))return!1;return!0},y=`kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;export{y as input,k as part1,m as part2};
