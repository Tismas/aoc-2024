import{A as w,a as P,V as r}from"./AnimatedLine-BdHaIZJI.js";import{r as u,a as $}from"./index-BaTq7jN3.js";const I=(...n)=>{const e=[];for(let t=0;t<n[0].length;t++){e[t]=[];for(let a=0;a<n.length;a++)e[t][a]=n[a][t]}return e},z=n=>n.reduce((e,t)=>e+t,0),L=`3   4
4   3
2   5
1   3
3   9
3   3`,h=200,y=100,f=200,Y=24,j=async n=>{const e=L.split(`
`).map(m=>m.split("   ").map(Number)),[t,a]=I(...e),c=[...t].sort((m,i)=>m-i),p=[...a].sort((m,i)=>m-i);await Promise.all([O(n,t,-f/2),O(n,a,f/2)]);const s=await V(n,c,p),o=await M(n,s);console.log("Part 1",o)},O=(n,e,t)=>{const a=e.map((s,o)=>({value:s,id:o})),c=[...a].sort((s,o)=>s.value-o.value),p=a.map((s,o)=>{const m=c.findIndex(b=>b.id===s.id),i=n.canvas.width/2+t,g=new r(i,h+o*y),v=new r(i,h+m*y);return new w({ctx:n,position:g,opacity:0,label:s.value.toString(),fontSize:Y,keepDrawingAfterAnimation:!0}).animateOpacity(1,500).animatePosition(v,1e3,1e3)});return u(n,p)},V=async(n,e,t)=>{const a=[],c=[],s=e.length;for(let o=0;o<s;o++){const m=h+y*o,i=Math.abs(e[o]-t[o]);c.push(i),a.push(new P({ctx:n,startPosition:new r(n.canvas.width/2-f/2+20,m),targetPosition:new r(n.canvas.width/2-20,m),keepDrawingAfterAnimation:!0}).animateDrawing(500,o*100)),a.push(new P({ctx:n,startPosition:new r(n.canvas.width/2+f/2-20,m),targetPosition:new r(n.canvas.width/2+20,m),keepDrawingAfterAnimation:!0}).animateDrawing(500,o*100));const g=new r(n.canvas.width/2,h+o*y);a.push(new w({ctx:n,position:g,label:i.toString(),opacity:0,keepDrawingAfterAnimation:!0}).animateOpacity(1,500,o*100))}return await u(n,a),c},M=async(n,e)=>{const t=z(e),a=new w({ctx:n,position:new r(n.canvas.width/2,h-30),rotation:Math.PI/2,opacity:0,label:"=",keepDrawingAfterAnimation:!0}).animateOpacity(1,500),c=new w({ctx:n,position:new r(n.canvas.width/2,h-60),opacity:0,label:t.toString(),keepDrawingAfterAnimation:!0}).animateOpacity(1,500);return await u(n,[a,c]),t},l=200,S=100,A=200,N=24,q=async n=>{const e=L.split(`
`).map(p=>p.split("   ").map(Number)),[t,a]=I(...e);await Promise.all([D(n,t,-A/2),D(n,a,A/2)]);let c=0;k(n,c);for(let p=0;p<t.length;p++){const s=await T(n,t,a,p);c+=s,s&&k(n,c)}console.log("Part 2",c)},D=(n,e,t)=>{const a=e.map((c,p)=>{const s=n.canvas.width/2+t,o=new r(s,l+p*S);return new w({ctx:n,position:o,opacity:0,label:c.toString(),fontSize:N,keepDrawingAfterAnimation:!0}).animateOpacity(1,500)});return u(n,a)},T=async(n,e,t,a)=>{const c=e[a],p=t.map((i,g)=>i===c?g:-1).filter(i=>i!==-1),s=[],o=p.map((i,g)=>{const v=new r(n.canvas.width/2-A/2,l+a*S),b=new r(n.canvas.width/2+A/2,l+i*S);return new P({ctx:n,startPosition:v,targetPosition:b,keepDrawingAfterAnimation:!0}).animateDrawing(500,g*500)});await u(n,o),$(o);const m=p.length*c;if(m>0){const i=n.canvas.width/2;s.push(new w({ctx:n,position:new r(i-30,l),label:p.length.toString(),opacity:0}).animateOpacity(1,500).animatePosition(new r(i,l),500,500).animateOpacity(0,500,500)),s.push(new w({ctx:n,position:new r(i,l),label:"*",opacity:0}).animateOpacity(1,500).animateOpacity(0,500,500)),s.push(new w({ctx:n,position:new r(i+30,l),label:c.toString(),opacity:0}).animateOpacity(1,500).animatePosition(new r(i,l),500,500).animateOpacity(0,500,500)),s.push(new w({ctx:n,position:new r(i,l),label:`+ ${m.toString()}`,opacity:0}).animateOpacity(1,250,1e3).animatePosition(new r(i,l-25),250,1250).animateOpacity(0,250,1300))}return await u(n,s),m};let d=null;const k=(n,e)=>(d&&$([d]),d=new w({ctx:n,label:e.toString(),position:new r(n.canvas.width/2,l-50),opacity:0,keepDrawingAfterAnimation:!0}).animateOpacity(1,500),u(n,[d]));export{j as part1,q as part2};
