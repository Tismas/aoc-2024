import{s as x}from"./showInConstructionMessage-DEUZpbEc.js";import{V as m}from"./AnimatedLabel-CVP5itg0.js";import"./index-ds8x3FWa.js";const f=(r,s)=>{const e=s.split(`

`).map(B);let o=0;e.forEach(t=>{const n=d(t.buttonA,t.buttonB,t.prizeLocation);n&&(o+=n)}),x(r,o)},B=r=>{var i,b,a;const[s,e,o]=r.split(`
`),t=/Button \w: X\+(?<x>\d+), Y\+(?<y>\d+)/,n=(i=s.match(t))==null?void 0:i.groups,c=(b=e.match(t))==null?void 0:b.groups,p=/Prize: X=(?<x>\d+), Y=(?<y>\d+)/,u=(a=o.match(p))==null?void 0:a.groups;if(!n||!c||!u)throw new Error("Regex sucks! Or I suck...");return{buttonA:new m(Number(n.x),Number(n.y)),buttonB:new m(Number(c.x),Number(c.y)),prizeLocation:new m(Number(u.x),Number(u.y))}},d=(r,s,e)=>{const o=r.x,t=s.x,n=r.y,c=s.y,p=e.x,u=e.y,i=o*c-t*n;if(i===0)return 0;const b=(p*c-t*u)/i,a=(o*u-p*n)/i;return Math.round(b)!==b||Math.round(a)!==a?0:b*3+a},w=(r,s)=>{const e=s.split(`

`).map(y);let o=0;e.forEach(t=>{const n=z(t.buttonA,t.buttonB,t.prizeLocation);n&&(o+=n)}),x(r,o)},y=r=>{var i,b,a;const[s,e,o]=r.split(`
`),t=/Button \w: X\+(?<x>\d+), Y\+(?<y>\d+)/,n=(i=s.match(t))==null?void 0:i.groups,c=(b=e.match(t))==null?void 0:b.groups,p=/Prize: X=(?<x>\d+), Y=(?<y>\d+)/,u=(a=o.match(p))==null?void 0:a.groups;if(!n||!c||!u)throw new Error("Regex sucks! Or I suck...");return{buttonA:new m(Number(n.x),Number(n.y)),buttonB:new m(Number(c.x),Number(c.y)),prizeLocation:new m(Number(u.x)+1e13,Number(u.y)+1e13)}},z=(r,s,e)=>{const o=r.x,t=s.x,n=r.y,c=s.y,p=e.x,u=e.y,i=o*c-t*n;if(i===0)return 0;const b=(p*c-t*u)/i,a=(o*u-p*n)/i;return Math.round(b)!==b||Math.round(a)!==a?0:b*3+a},N=`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;export{N as input,f as part1,w as part2};
