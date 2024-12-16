import{s as C}from"./showInConstructionMessage-BJAcs5Og.js";import{V as w}from"./AnimatedLabel-CdFvQLtw.js";import"./index-qeC7srZf.js";let x={},m=1/0;const I=1e5,V=(f,l)=>{const t=l.split(`
`).map(s=>s.trim().split(""));let[e,n]=M(t);t[e.y][e.x]=".",t[n.y][n.x]=".",x={},m=1/0;const a=i(t,e,n);C(f,a)},M=f=>{let l,t;for(let e=0;e<f.length;e++)for(let n=0;n<f[0].length;n++)f[e][n]==="S"&&(l=new w(n,e)),f[e][n]==="E"&&(t=new w(n,e));if(!l||!t)throw new Error("Start or end not found");return[l,t]},i=(f,l,t,e="E",n=0)=>{const a=k[e],s=l.add(a),S=`${l},${e}`,p=x[S];return p&&p<=n||n>Math.min(I,m)?1/0:(x[S]=n,l.equals(t)?(m>n&&(m=n),n):f[s.y][s.x]==="#"?Math.min(i(f,l,t,r[e],n+1e3),i(f,l,t,y[e],n+1e3)):Math.min(i(f,s,t,e,n+1),i(f,l,t,r[e],n+1e3),i(f,l,t,y[e],n+1e3)))},k={W:new w(-1,0),E:new w(1,0),N:new w(0,-1),S:new w(0,1)},r={W:"N",N:"E",E:"S",S:"W"},y={W:"S",S:"E",E:"N",N:"W"};let W={},h=[],E=1/0;const v=1e5,b=(f,l)=>{const t=l.split(`
`).map(s=>s.trim().split(""));let[e,n]=q(t);t[e.y][e.x]=".",t[n.y][n.x]=".",W={},h=[],E=1/0,o(t,e,n);const a=h.reduce((s,S)=>s.union(S),new Set);C(f,a.size)},q=f=>{let l,t;for(let e=0;e<f.length;e++)for(let n=0;n<f[0].length;n++)f[e][n]==="S"&&(l=new w(n,e)),f[e][n]==="E"&&(t=new w(n,e));if(!l||!t)throw new Error("Start or end not found");return[l,t]},o=(f,l,t,e="E",n=0,a=new Set)=>{const s=A[e],S=l.add(s),p=`${l},${e}`,$=W[p];return $&&$<n||n>Math.min(E,v)?1/0:(W[p]=n,a.add(l.toString()),l.equals(t)?(E>n?(h=[a],E=n):E===n&&h.push(a),n):f[S.y][S.x]==="#"?Math.min(o(f,l,t,N[e],n+1e3,new Set(a)),o(f,l,t,u[e],n+1e3,new Set(a))):Math.min(o(f,S,t,e,n+1,new Set(a)),o(f,l,t,N[e],n+1e3,new Set(a)),o(f,l,t,u[e],n+1e3,new Set(a))))},A={W:new w(-1,0),E:new w(1,0),N:new w(0,-1),S:new w(0,1)},N={W:"N",N:"E",E:"S",S:"W"},u={W:"S",S:"E",E:"N",N:"W"},d=`#################\r
#...#...#...#..E#\r
#.#.#.#.#.#.#.#.#\r
#.#.#.#...#...#.#\r
#.#.#.#.###.#.#.#\r
#...#.#.#.....#.#\r
#.#.#.#.#.#####.#\r
#.#...#.#.#.....#\r
#.#.#####.#.###.#\r
#.#.#.......#...#\r
#.#.###.#####.###\r
#.#.#...#.....#.#\r
#.#.#.#####.###.#\r
#.#.#.........#.#\r
#.#.#.#########.#\r
#S#.............#\r
#################`;export{d as input,V as part1,b as part2};
