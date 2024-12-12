import{s as A}from"./showInConstructionMessage-pH6df4T3.js";import"./AnimatedLabel-7xKXnh4f.js";import"./index-RaChp7De.js";const u=(e,s)=>{const o=s.split(`
`),r=["XMAS"];let M=0;for(let t=0;t<o.length;t++)for(let n=0;n<o.length;n++)for(const c of r)o[t][n]===c[0]&&(M+=S(o,c,n,t));A(e,M)},S=(e,s,o,r)=>{let M=0;for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)n===0&&t===0||(M+=X(e,s,o,r,n,t));return M},X=(e,s,o,r,M,t)=>{for(let n=0;n<s.length;n++){const c=o+M*n,l=r+t*n;if(l<0||c<0||l>=e.length||c>=e[0].length||e[l][c]!==s[n])return 0}return 1},p=(e,s)=>{const o=s.split(`
`);let r=0;for(let M=0;M<o.length;M++)for(let t=0;t<o.length;t++)o[M][t]==="A"&&i(o,t,M)&&(r+=1);A(e,r)},i=(e,s,o)=>{try{const r=e[o+1][s-1],M=e[o+1][s+1],t=e[o-1][s-1],n=e[o-1][s+1];return[r==="M"&&n==="S",M==="M"&&t==="S",t==="M"&&M==="S",n==="M"&&r==="S"].filter(Boolean).length===2}catch{return!1}},g=`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;export{g as input,u as part1,p as part2};
