import{s as f}from"./showInConstructionMessage-DEUZpbEc.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-ds8x3FWa.js";const g=(t,o)=>{const n=o.split(`

`),s=[],r=[];n.forEach(e=>{e[0][0]==="#"?r.push(c(e.split(`
`))):s.push(c(e.split(`
`).toReversed()))});let i=0;for(const e of s)for(const l of r)p(e,l)&&i++;f(t,i)},c=t=>{const o=[0,0,0,0,0];for(let n=1;n<t.length;n++)for(let s=0;s<t[n].length;s++)t[n][s]==="#"&&o[s]++;return o},p=(t,o)=>{for(let n=0;n<t.length;n++)if(t[n]+o[n]>5)return!1;return!0},m=t=>{f(t,"","Mission accomplished")},k=`#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;export{k as input,g as part1,m as part2};
