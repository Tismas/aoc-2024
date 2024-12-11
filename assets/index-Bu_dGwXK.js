import{s as f}from"./showInConstructionMessage-rA6ZRDlM.js";import{V as i}from"./AnimatedLabel-CjwdShHn.js";import"./index-2dU2DQl5.js";const p=(n,o)=>{const r=o.split(`
`).map(e=>e.split("").map(Number));let t=0;r.forEach((e,c)=>{e.forEach((h,s)=>{h===0&&(t+=u(r,new i(s,c)))})}),f(n,t)},u=(n,o,r=new Set)=>{const t=n[o.y][o.x];return t===9&&r.add(o.toString()),w(n,o,t).forEach(e=>{u(n,e,r)}),r.size},w=(n,o,r)=>{const t=[],e=n[0].length,c=n.length;for(const h of[new i(-1,0),new i(1,0),new i(0,-1),new i(0,1)]){const s=o.add(h);s.isInBound(0,e-1,0,c-1)&&n[s.y][s.x]===r+1&&t.push(s)}return t},b=(n,o)=>{const r=o.split(`
`).map(e=>e.split("").map(Number));let t=0;r.forEach((e,c)=>{e.forEach((h,s)=>{h===0&&(t+=g(r,new i(s,c)))})}),f(n,t)},g=(n,o,r=0)=>{const t=n[o.y][o.x];return t===9?1:(l(n,o,t).forEach(e=>{r+=g(n,e)}),r)},l=(n,o,r)=>{const t=[],e=n[0].length,c=n.length;for(const h of[new i(-1,0),new i(1,0),new i(0,-1),new i(0,1)]){const s=o.add(h);s.isInBound(0,e-1,0,c-1)&&n[s.y][s.x]===r+1&&t.push(s)}return t},E=`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;export{E as input,p as part1,b as part2};
