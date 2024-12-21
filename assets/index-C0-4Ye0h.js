import{s as u}from"./showInConstructionMessage-lHx6hXkK.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-s9GqJJj1.js";const d=(i,n)=>{const t=n.split(`
`);let s=0;for(const o of t){const[e,r]=o.split(": ");c(Number(e),r.split(" ").map(Number))&&(s+=Number(e))}u(i,s)},c=(i,n)=>{let t=new Set;t.add(n[0]);for(const s of n.slice(1)){const o=new Set;for(const e of t)o.add(s*e),o.add(s+e);t=o}return t.has(i)},b=(i,n)=>{const t=n.split(`
`);let s=0;for(const o of t){const[e,r]=o.split(": ");l(Number(e),r.split(" ").map(Number))&&(s+=Number(e))}u(i,s)},l=(i,n)=>{let t=new Set;t.add(n[0]);for(const s of n.slice(1)){const o=new Set;for(const e of t)o.add(e*s),o.add(e+s),o.add(Number(String(e)+String(s)));t=o}return t.has(i)},f=`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;export{f as input,d as part1,b as part2};
