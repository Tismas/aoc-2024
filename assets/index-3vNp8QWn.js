import{s as m}from"./showInConstructionMessage-C9RX0ogS.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-ClbbcqQg.js";const R=(e,n)=>{const[o,r]=n.split(`

`),t=o.split(`
`).map(b),i=r.replace("Program: ","").split(",").map(Number);let c=0;const u=[];for(;c<i.length;){const s=i[c],l=i[c+1];if(s===0)t[0]=a(l,t);else if(s===1)t[1]=t[1]^l;else if(s===2)t[1]=p(l,t)%8;else if(s===3){if(t[0]!==0){c=l;continue}}else s===4?t[1]=t[1]^t[2]:s===5?u.push(p(l,t)%8):s===6?t[1]=a(l,t):s===7&&(t[2]=a(l,t));c+=2}m(e,u.join(","))},b=e=>{var r,t;const n=/Register [A|B|C]: (?<value>\d+)/,o=(t=(r=e.match(n))==null?void 0:r.groups)==null?void 0:t.value;if(!o)throw new Error(`Failed to parse register: ${e}`);return Number(o)},p=(e,n)=>{if(e<=3)return e;if(e<=6)return n[e-4];throw new Error("Invalid combo operand")},a=(e,n)=>n[0]>>p(e,n),C=(e,n)=>{const[o,r]=n.split(`

`),t=o.split(`
`).map(g),i=r.replace("Program: ","").split(",").map(BigInt),c=w(i,t);c?m(e,parseInt(c.join(""),8)):m(e,"Not found")},w=(e,n,o=new Array(16).fill(1),r=0)=>{if(r===e.length)return o;for(let t=0;t<8;t++){const i=[...o];i[r]=t;const u=[BigInt(parseInt(i.join(""),8)),n[1],n[2]],s=d(e,[...u]);if(s[s.length-1-r]===e[e.length-1-r]){const l=w(e,n,i,r+1);if(l)return l}}return null},g=e=>{var r,t;const n=/Register [A|B|C]: (?<value>\d+)/,o=(t=(r=e.match(n))==null?void 0:r.groups)==null?void 0:t.value;if(!o)throw new Error(`Failed to parse register: ${e}`);return BigInt(o)},d=(e,n)=>{let o=0;const r=[];for(;o<e.length;){const t=e[o],i=e[o+1];if(t===0n)n[0]=f(i,n);else if(t===1n)n[1]=n[1]^i;else if(t===2n)n[1]=h(i,n)%8n;else if(t===3n){if(n[0]!==0n){o=Number(i);continue}}else t===4n?n[1]=n[1]^n[2]:t===5n?r.push(h(i,n)%8n):t===6n?n[1]=f(i,n):t===7n&&(n[2]=f(i,n));o+=2}return r},h=(e,n)=>{if(e<=3n)return e;if(e<=6n)return n[Number(e-4n)];throw new Error("Invalid combo operand")},f=(e,n)=>n[0]>>h(e,n),B=`Register A: 52042868\r
Register B: 0\r
Register C: 0\r
\r
Program: 2,4,1,7,7,5,0,3,4,4,1,7,5,5,3,0`;export{B as input,R as part1,C as part2};
