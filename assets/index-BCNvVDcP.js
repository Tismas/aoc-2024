import{s as E}from"./showInConstructionMessage-0zp86OSb.js";import{V as I}from"./AnimatedLabel-CVP5itg0.js";import{g as u}from"./array-BsYRcXjQ.js";import"./index-CNKGbUPc.js";const F=(s,o)=>{const e=o.split(`
`).map(i=>i.split("").map(t=>({plant:t,visited:!1}))),c=[];e.forEach((i,t)=>{i.forEach((l,n)=>{l.visited||c.push(a(e,new I(n,t)))})}),E(s,c.reduce((i,t)=>i+t.perimeter*t.size,0))},a=(s,o,e=1,c=0)=>{const i=s.length,t=s[0].length,l=s[o.y][o.x];l.visited=!0;for(const n of o.getAdjacent()){if(!n.isInBound(0,t-1,0,i-1)){c++;continue}const f=s[n.y][n.x];if(f.plant===l.plant){if(f.visited)continue;const d=a(s,n);e+=d.size,c+=d.perimeter}else c++}return{size:e,perimeter:c,plant:l.plant}},w=(s,o)=>{const e=o.split(`
`).map(t=>t.split("").map(l=>({plant:l,visited:!1}))),c=[];e.forEach((t,l)=>{t.forEach((n,f)=>{n.visited||c.push(C(e,new I(f,l)))})});let i=0;for(const t of c){const l=Object.values(u(t.plots,r=>r.y)),n=Object.values(u(t.plots,r=>r.x)),f=g(l,r=>r.x),d=g(n,r=>r.y),p=h(f),V=h(d),R=p+V;i+=t.size*R}E(s,i)},C=(s,o,e=[o],c=1,i=0)=>{const t=s.length,l=s[0].length,n=s[o.y][o.x];n.visited=!0;for(const f of o.getAdjacent()){if(!f.isInBound(0,l-1,0,t-1)){i++;continue}const d=s[f.y][f.x];if(d.plant===n.plant){if(d.visited)continue;const p=C(s,f);c+=p.size,i+=p.perimeter,e.push(...p.plots)}else i++}return{size:c,perimeter:i,plots:e,plant:n.plant}},g=(s,o)=>{const e=[];return s.forEach((c,i)=>{const t=new Array;for(const l of c.toSorted((n,f)=>o(n)-o(f))){const n=o(l),f=t.find(d=>d.index===n&&d.side==="after");f?t.splice(t.indexOf(f),1):t.push({index:n-1,side:"before"}),t.push({index:n+1,side:"after"})}e[i]=t}),e},h=s=>{let o=s[0].length;for(let e=1;e<s.length;e++){const c=s[e-1],i=s[e];for(const t of i)c.find(n=>n.index===t.index&&n.side===t.side)||o++}return o},y=`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;export{y as input,F as part1,w as part2};
