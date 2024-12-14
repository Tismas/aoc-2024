var A=Object.defineProperty;var c=(s,t,i)=>t in s?A(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var n=(s,t,i)=>c(s,typeof t!="symbol"?t+"":t,i);const l=(s,t,i)=>s>=t&&s<=i;class r{constructor(t,i){n(this,"x");n(this,"y");this.x=t,this.y=i}add(t){return new r(this.x+t.x,this.y+t.y)}subtract(t){return new r(this.x-t.x,this.y-t.y)}distanceTo(t){return t.subtract(this).getLength()}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}equals(t){return this.x==t.x&&this.y===t.y}modulo(t){return new r(this.x%t.x,this.y%t.y)}multiply(t){return new r(this.x*t,this.y*t)}isInBound(t,i,e,a){return l(this.x,t,i)&&l(this.y,e,a)}getAdjacent(){return[new r(this.x+1,this.y),new r(this.x-1,this.y),new r(this.x,this.y+1),new r(this.x,this.y-1)]}toString(){return`${this.x},${this.y}`}}const u=(s,t,i)=>s+(t-s)*i,V=(s,t,i)=>new r(u(s.x,t.x,i),u(s.y,t.y,i));class h{constructor({getCurrentValue:t,targetValue:i,duration:e,delay:a=0,onFinish:o}){n(this,"startValue");n(this,"getCurrentValue");n(this,"targetValue");n(this,"startTime");n(this,"duration");n(this,"onFinish");n(this,"isFinished");this.startValue=null,this.getCurrentValue=t,this.targetValue=i,this.duration=e,this.startTime=Date.now()+a,this.isFinished=!1,this.onFinish=o}get runningTime(){return Date.now()-this.startTime}hasStarted(){return this.runningTime>=0}isVectorAnimation(){return this.targetValue instanceof r}isNumberAnimation(){return typeof this.targetValue=="number"}tick(){var i;const t=this.runningTime/this.duration;if(!this.hasStarted())return this.getCurrentValue();if(this.runningTime>=this.duration)return this.isFinished=!0,(i=this.onFinish)==null||i.call(this,this.targetValue),this.targetValue;if(this.startValue===null)return this.startValue=this.getCurrentValue(),this.startValue;if(this.isVectorAnimation())return V(this.startValue,this.targetValue,t);if(this.isNumberAnimation())return u(this.startValue,this.targetValue,t);throw new Error("Invalid animation")}}class x{constructor({ctx:t,label:i,position:e,fontSize:a=24,fontFamily:o="Inter",color:g=getComputedStyle(t.canvas).getPropertyValue("--fg"),rotation:m=0,opacity:y=1,textAlign:p="center",rotationOrigin:d="center",keepDrawingAfterAnimation:f=!1}){n(this,"ctx");n(this,"label");n(this,"font");n(this,"textAlign");n(this,"color");n(this,"positionAnimations");n(this,"position");n(this,"opacityAnimations");n(this,"opacity");n(this,"rotationAnimations");n(this,"rotation");n(this,"rotationOrigin");n(this,"keepDrawingAfterAnimation");this.ctx=t,this.label=i,this.font=`${a}px ${o}`,this.color=g,this.textAlign=p,this.positionAnimations=[],this.position=e,this.opacityAnimations=[],this.opacity=y,this.rotationAnimations=[],this.rotation=m,this.rotationOrigin=d,this.keepDrawingAfterAnimation=f}animatePosition(t,i,{delay:e,onFinish:a}={}){return this.positionAnimations.push(new h({getCurrentValue:()=>this.position,targetValue:t,duration:i,delay:e,onFinish:a})),this}animateOpacity(t,i,{delay:e,onFinish:a}={}){return this.opacityAnimations.push(new h({getCurrentValue:()=>this.opacity,targetValue:t,duration:i,delay:e,onFinish:a})),this}animateRotation(t,i,{delay:e,onFinish:a}={}){return this.rotationAnimations.push(new h({getCurrentValue:()=>this.rotation,targetValue:t,duration:i,delay:e,onFinish:a})),this}update(){for(const t of this.positionAnimations)!t.hasStarted()||t.isFinished||(this.position=t.tick());for(const t of this.opacityAnimations)!t.hasStarted()||t.isFinished||(this.opacity=t.tick());for(const t of this.rotationAnimations)!t.hasStarted()||t.isFinished||(this.rotation=t.tick())}draw(t){t.save(),t.textAlign=this.textAlign,t.textBaseline="middle",t.globalAlpha=this.opacity,t.fillStyle=this.color,t.font=this.font;const i=t.measureText(this.label).width;this.rotationOrigin==="left"&&t.translate(-i/2,0),this.rotationOrigin==="right"&&t.translate(i/2,0),t.translate(this.position.x,this.position.y),t.rotate(this.rotation),this.rotationOrigin==="left"&&t.translate(i/2,0),this.rotationOrigin==="right"&&t.translate(-i/2,0),t.fillText(this.label,0,0),t.restore()}tick(){return this.update(),this.draw(this.ctx),(this.opacityAnimations.every(t=>t.isFinished)??!0)&&(this.positionAnimations.every(t=>t.isFinished)??!0)&&(this.rotationAnimations.every(t=>t.isFinished)??!0)}}export{x as A,h as F,r as V,l as i};
