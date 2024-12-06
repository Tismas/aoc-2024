import{V as c,A as l}from"./AnimatedLabel-Y1v52lyK.js";import{r as p}from"./index-GOfKAnNf.js";const m=`47|53
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
97,13,75,29,47`,x=n=>{const[o,t]=m.split(`

`),s=o.split(`
`).map(e=>e.split("|").map(Number)),i=t.split(`
`).map(e=>e.split(",").map(Number));let r=0;for(const e of i)b(e,s)&&(r+=e[Math.floor(e.length/2)]);const a=new c(n.canvas.width/2,n.canvas.height/2),f=new l({ctx:n,label:`Animation in construction... Result for example input: ${r}`,position:a,opacity:0}).animateOpacity(1,1e3);p(n,[f])},b=(n,o)=>{for(const t of o){const[s,i]=t;if(n.includes(i)&&n.indexOf(s)>n.indexOf(i))return!1}return!0},A=n=>{const[o,t]=m.split(`

`),s=o.split(`
`).map(e=>e.split("|").map(Number)),i=t.split(`
`).map(e=>e.split(",").map(Number));let r=0;for(const e of i)if(!d(e,s)){const O=u(e,s);r+=O[Math.floor(e.length/2)]}const a=new c(n.canvas.width/2,n.canvas.height/2),f=new l({ctx:n,label:`Animation in construction... Result for example input: ${r}`,position:a,opacity:0}).animateOpacity(1,1e3);p(n,[f])},d=(n,o)=>{for(const t of o){const[s,i]=t;if(n.includes(i)&&n.indexOf(s)>n.indexOf(i))return!1}return!0},u=(n,o)=>{const t=[...n];for(const s of o){const[i,r]=s;n.includes(r)&&n.indexOf(i)>n.indexOf(r)&&(t.splice(t.indexOf(i),1),t.splice(t.indexOf(r),0,i))}return d(t,o)?t:u(t,o)};export{x as part1,A as part2};
