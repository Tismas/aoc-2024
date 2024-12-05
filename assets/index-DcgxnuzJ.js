import{V as c,A as r}from"./AnimatedLabel-CAWg7D6J.js";import{r as A}from"./index-BtqK7B7T.js";const S=`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,m=n=>{const e=S.split(`
`),i=["XMAS"];let s=0;for(let t=0;t<e.length;t++)for(let M=0;M<e.length;M++)for(const l of i)e[t][M]===l[0]&&(s+=X(e,l,M,t));const a=new c(n.canvas.width/2,n.canvas.height/2),o=new r({ctx:n,label:`Animation in construction... Result for example input: ${s}`,position:a,opacity:0}).animateOpacity(1,1e3);A(n,[o])},X=(n,e,i,s)=>{let a=0;for(let o=-1;o<=1;o++)for(let t=-1;t<=1;t++)t===0&&o===0||(a+=f(n,e,i,s,t,o));return a},f=(n,e,i,s,a,o)=>{for(let t=0;t<e.length;t++){const M=i+a*t,l=s+o*t;if(l<0||M<0||l>=n.length||M>=n[0].length||n[l][M]!==e[t])return 0}return 1},d=n=>{const e=S.split(`
`);let i=0;for(let o=0;o<e.length;o++)for(let t=0;t<e.length;t++)e[o][t]==="A"&&h(e,t,o)&&(i+=1);const s=new c(n.canvas.width/2,n.canvas.height/2),a=new r({ctx:n,label:`Animation in construction... Result for example input: ${i}`,position:s,opacity:0}).animateOpacity(1,1e3);A(n,[a])},h=(n,e,i)=>{try{const s=n[i+1][e-1],a=n[i+1][e+1],o=n[i-1][e-1],t=n[i-1][e+1];return[s==="M"&&t==="S",a==="M"&&o==="S",o==="M"&&a==="S",t==="M"&&s==="S"].filter(Boolean).length===2}catch{return!1}};export{m as part1,d as part2};
