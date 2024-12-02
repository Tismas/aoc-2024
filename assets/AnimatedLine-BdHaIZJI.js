var A=Object.defineProperty;var f=(s,t,i)=>t in s?A(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var n=(s,t,i)=>f(s,typeof t!="symbol"?t+"":t,i);class r{constructor(t,i){n(this,"x");n(this,"y");this.x=t,this.y=i}subtract(t){return new r(this.x-t.x,this.y-t.y)}distanceTo(t){return t.subtract(this).getLength()}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}}const u=(s,t,i)=>s+(t-s)*i,y=(s,t,i)=>new r(u(s.x,t.x,i),u(s.y,t.y,i));class o{constructor({getCurrentValue:t,targetValue:i,duration:e,delay:a=0}){n(this,"startValue");n(this,"getCurrentValue");n(this,"targetValue");n(this,"startTime");n(this,"duration");n(this,"isFinished");this.startValue=null,this.getCurrentValue=t,this.targetValue=i,this.duration=e,this.startTime=Date.now()+a,this.isFinished=!1}get runningTime(){return Date.now()-this.startTime}hasStarted(){return this.runningTime>=0}isVectorAnimation(){return this.targetValue instanceof r}isNumberAnimation(){return typeof this.targetValue=="number"}tick(){const t=this.runningTime/this.duration;if(!this.hasStarted())return this.getCurrentValue();if(this.runningTime>=this.duration)return this.isFinished=!0,this.targetValue;if(this.startValue===null)return this.startValue=this.getCurrentValue(),this.startValue;if(this.isVectorAnimation())return y(this.startValue,this.targetValue,t);if(this.isNumberAnimation())return u(this.startValue,this.targetValue,t);throw new Error("Invalid animation")}}class w{constructor({ctx:t,label:i,position:e,fontSize:a=24,fontFamily:h="Inter",color:l=getComputedStyle(t.canvas).getPropertyValue("--fg"),rotation:g=0,opacity:m=1,textAlign:d="center",rotationOrigin:p="center",keepDrawingAfterAnimation:c=!1}){n(this,"ctx");n(this,"label");n(this,"font");n(this,"color");n(this,"textAlign");n(this,"positionAnimations");n(this,"position");n(this,"opacityAnimations");n(this,"opacity");n(this,"rotationAnimations");n(this,"rotation");n(this,"rotationOrigin");n(this,"keepDrawingAfterAnimation");this.ctx=t,this.label=i,this.font=`${a}px ${h}`,this.color=l,this.textAlign=d,this.positionAnimations=[],this.position=e,this.opacityAnimations=[],this.opacity=m,this.rotationAnimations=[],this.rotation=g,this.rotationOrigin=p,this.keepDrawingAfterAnimation=c}animatePosition(t,i,e=0){return this.positionAnimations.push(new o({getCurrentValue:()=>this.position,targetValue:t,duration:i,delay:e})),this}animateOpacity(t,i,e=0){return this.opacityAnimations.push(new o({getCurrentValue:()=>this.opacity,targetValue:t,duration:i,delay:e})),this}animateRotation(t,i,e=0){return this.rotationAnimations.push(new o({getCurrentValue:()=>this.rotation,targetValue:t,duration:i,delay:e})),this}update(){for(const t of this.positionAnimations)!t.hasStarted()||t.isFinished||(this.position=t.tick());for(const t of this.opacityAnimations)!t.hasStarted()||t.isFinished||(this.opacity=t.tick());for(const t of this.rotationAnimations)!t.hasStarted()||t.isFinished||(this.rotation=t.tick())}draw(t){t.save(),t.textAlign=this.textAlign,t.textBaseline="middle",t.globalAlpha=this.opacity,t.fillStyle=this.color,t.font=this.font;const i=t.measureText(this.label).width;this.rotationOrigin==="left"&&t.translate(-i/2,0),this.rotationOrigin==="right"&&t.translate(i/2,0),t.translate(this.position.x,this.position.y),t.rotate(this.rotation),this.rotationOrigin==="left"&&t.translate(i/2,0),this.rotationOrigin==="right"&&t.translate(-i/2,0),t.fillText(this.label,0,0),t.restore()}tick(){return this.update(),this.draw(this.ctx),(this.opacityAnimations.every(t=>t.isFinished)??!0)&&(this.positionAnimations.every(t=>t.isFinished)??!0)&&(this.rotationAnimations.every(t=>t.isFinished)??!0)}}class P{constructor({ctx:t,startPosition:i,targetPosition:e,color:a=getComputedStyle(t.canvas).getPropertyValue("--fg"),keepDrawingAfterAnimation:h=!1}){n(this,"ctx");n(this,"color");n(this,"drawingAnimations");n(this,"startPosition");n(this,"targetPosition");n(this,"endPosition");n(this,"keepDrawingAfterAnimation");this.ctx=t,this.color=a,this.startPosition=i,this.targetPosition=e,this.endPosition=e,this.drawingAnimations=[],this.keepDrawingAfterAnimation=h}animateDrawing(t,i=0){return this.endPosition=this.startPosition,this.drawingAnimations.push(new o({getCurrentValue:()=>this.startPosition,targetValue:this.targetPosition,duration:t,delay:i})),this}update(){for(const t of this.drawingAnimations)!t.hasStarted()||t.isFinished||(this.endPosition=t.tick())}draw(t){t.strokeStyle=this.color,t.beginPath(),t.moveTo(this.startPosition.x,this.startPosition.y),t.lineTo(this.endPosition.x,this.endPosition.y),t.stroke()}tick(){return this.update(),this.draw(this.ctx),this.drawingAnimations.every(t=>t.isFinished)??!0}}export{w as A,r as V,P as a};