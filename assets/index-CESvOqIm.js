import{s as u}from"./showInConstructionMessage-lHx6hXkK.js";import{V as p}from"./AnimatedLabel-CVP5itg0.js";import"./index-s9GqJJj1.js";const a=["E","W","N","S"],I=(o,e)=>{const n=e.split(`
`).map(i=>i.trim().split(""));let[t,s]=w(n);n[t.y][t.x]=".",n[s.y][s.x]=".";const c=x(n,t,s);u(o,c.cost)},w=o=>{let e,n;for(let t=0;t<o.length;t++)for(let s=0;s<o[0].length;s++)o[t][s]==="S"&&(e=new p(s,t)),o[t][s]==="E"&&(n=new p(s,t));if(!e||!n)throw new Error("Start or end not found");return[e,n]},x=(o,e,n)=>{const t={},s={cost:0,direction:"E",position:e,prev:null};t[e.toString()]=s;let c=[s];for(;c.length;){const i=[];for(const d of c)for(const f of a){const r=N(d,f);if(o[r.position.y][r.position.x]!==".")continue;const l=t[r.position.toString()];(!l||l.cost>r.cost)&&(t[r.position.toString()]=r,i.push(r))}c=i}return t[n.toString()]},N=(o,e)=>{const n=o.cost+(e===o.direction?1:e===g[o.direction]?2001:1001),t=o.position.add(E[e]);return{cost:n,direction:e,position:t,prev:o}},E={W:new p(-1,0),E:new p(1,0),N:new p(0,-1),S:new p(0,1)},g={W:"E",N:"S",E:"W",S:"N"},y=["E","W","N","S"],O=(o,e)=>{const n=e.split(`
`).map(f=>f.trim().split(""));let[t,s]=W(n);n[t.y][t.x]=".",n[s.y][s.x]=".";const c=m(n,t,s),i=new Set;let d=c?[c]:[];for(;d.length;){const f=[];for(const r of d)i.add(r.position.toString()),f.push(...r.prev);d=f}u(o,i.size)},W=o=>{let e,n;for(let t=0;t<o.length;t++)for(let s=0;s<o[0].length;s++)o[t][s]==="S"&&(e=new p(s,t)),o[t][s]==="E"&&(n=new p(s,t));if(!e||!n)throw new Error("Start or end not found");return[e,n]},m=(o,e,n)=>{const t={},s={cost:0,direction:"E",position:e,prev:[]};t[`${e.toString()},${s.direction}`]=s;let c=[s];for(;c.length;){const i=[];for(const d of c)for(const f of y){const r=d.position.add($[f]);if(o[r.y][r.x]!==".")continue;const l=v(d,r,f),h=`${l.position.toString()},${l.direction}`,S=t[h];S&&S.cost==l.cost&&S.prev.push(d),(!S||S.cost>l.cost)&&(t[h]=l,i.push(l))}c=i}return Object.values(t).sort((i,d)=>i.cost-d.cost).find(i=>i.position.equals(n))},v=(o,e,n)=>n===o.direction?{cost:o.cost+1,direction:n,position:e,prev:[o]}:{cost:o.cost+(n===C[o.direction]?2e3:1e3),direction:n,position:o.position,prev:[o]},$={W:new p(-1,0),E:new p(1,0),N:new p(0,-1),S:new p(0,1)},C={W:"E",N:"S",E:"W",S:"N"},P=`#################\r
#...#...#...#..E#\r
#.#.#.#.#.#.#.#.#\r
#.#.#.#...#...#.#\r
#.#.#.#.###.#.#.#\r
#...#.#.#.....#.#\r
#.#.#.#.#.#####.#\r
#.#...#.#.#.....#\r
#.#.#####.#.###.#\r
#.#.#.......#...#\r
#.#.###.#####.###\r
#.#.#...#.....#.#\r
#.#.#.#####.###.#\r
#.#.#.........#.#\r
#.#.#.#########.#\r
#S#.............#\r
#################`;export{P as input,I as part1,O as part2};
