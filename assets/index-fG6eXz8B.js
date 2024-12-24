import{s as c}from"./showInConstructionMessage-DAWy1VTI.js";import{s as h}from"./array-BsYRcXjQ.js";import"./AnimatedLabel-CVP5itg0.js";import"./index-CWLejmAq.js";const I=(n,r)=>{const f=r.split(`
`).map(BigInt);let s=0n;for(const m of f){let a=m;for(let t=0;t<2e3;t++)a=b(a);s+=a}c(n,Number(s))},b=n=>(n^=n*64n,n%=16777216n,n^=n/32n,n%=16777216n,n^=n*2048n,n%=16777216n,n),i={},v=(n,r)=>{var m,a;const f=r.split(`
`).map(BigInt);for(const t in f){let o=f[t],l=[];for(let u=0;u<2e3;u++){const e=g(o),P=e%10n-o%10n;l.push(P),l.length>4&&l.shift(),o=e,l.length===4&&(i[m=l.join(",")]||(i[m]=[]),(a=i[l.join(",")])[t]||(a[t]=Number(o%10n)))}}let s=0;for(const t of Object.values(i)){const o=h(t);o>s&&(s=o)}c(n,s)},g=n=>(n^=n*64n,n%=16777216n,n^=n/32n,n%=16777216n,n^=n*2048n,n%=16777216n,n),w=`1\r
2\r
3\r
2024`;export{w as input,I as part1,v as part2};
