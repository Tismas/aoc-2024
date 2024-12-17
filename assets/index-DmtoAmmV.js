import{s as c}from"./showInConstructionMessage-B2oUJVp5.js";import"./AnimatedLabel-CdFvQLtw.js";import"./index-Cns8rucN.js";const O=(n,o)=>{const[t,s]=o.split(`

`),e=t.split(`
`).map(r=>r.split("|").map(Number)),i=s.split(`
`).map(r=>r.split(",").map(Number));let f=0;for(const r of i)d(r,e)&&(f+=r[Math.floor(r.length/2)]);c(n,f)},d=(n,o)=>{for(const t of o){const[s,e]=t;if(n.includes(e)&&n.indexOf(s)>n.indexOf(e))return!1}return!0},b=(n,o)=>{const[t,s]=o.split(`

`),e=t.split(`
`).map(r=>r.split("|").map(Number)),i=s.split(`
`).map(r=>r.split(",").map(Number));let f=0;for(const r of i)if(!p(r,e)){const a=l(r,e);f+=a[Math.floor(r.length/2)]}c(n,f)},p=(n,o)=>{for(const t of o){const[s,e]=t;if(n.includes(e)&&n.indexOf(s)>n.indexOf(e))return!1}return!0},l=(n,o)=>{const t=[...n];for(const s of o){const[e,i]=s;n.includes(i)&&n.indexOf(e)>n.indexOf(i)&&(t.splice(t.indexOf(e),1),t.splice(t.indexOf(i),0,e))}return p(t,o)?t:l(t,o)},h=`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;export{h as input,O as part1,b as part2};
