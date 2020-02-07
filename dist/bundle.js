!function(t){var i={};function s(e){if(i[e])return i[e].exports;var h=i[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)s.d(e,h,function(i){return t[i]}.bind(null,h));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=0)}([function(t,i,s){"use strict";s.r(i);var e=class{constructor(){this.x=0,this.y=0}};var h=class extends e{constructor(t,i,s=10,e="black"){super(t,i),this.x=t-30,this.y=i/2,this.dx=1,this.dy=-1,this.radius=s,this.ballColor=e}move(){this.x+=this.dx,this.y+=this.dy}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.ballColor,t.fill(),t.closePath()}};var l=class extends e{constructor(t,i,s="#0099dd",e=75,h=20){super(t,i),this.x=(c.width-e)/2,this.y=i,this.color=s,this.width=e,this.height=h}render(t){t.beginPath(),t.rect(this.x,c.height-this.height,this.width,this.height),t.fillStyle="black",t.fill(),t.closePath()}move(t){this.x+=t,this.checkLimits()}moveTo(t){this.x=t,this.checkLimits()}checkLimits(){this.x=this.x<this.minX?this.minX:this.x,this.x=this.x>this.maxX?this.maxX:this.x}};var r=class extends e{constructor(t,i,s="#0099dd",e=75,h=20){super(t,i),this.x=t,this.y=i,this.status=!0,this.color=s,this.width=e,this.height=h}render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}};var o=class extends e{constructor(t,i,s="16px Arial",e="#0095DD"){super(t,i),this.font=s,this.fillStyle=e}render(t,i){t.font=this.font,t.fillStyle=this.fillStyle,t.fillText(`Lives: ${i}`,c.width-65,20)}};var n=class extends e{constructor(t,i,s="16px Arial",e="#0095DD"){super(t,i),this.font=s,this.fillStyle=e}render(t,i){t.font=this.font,t.fillStyle=this.fillStyle,t.fillText(`Score: ${2*i}`,8,20)}};var a=class extends e{constructor(t,i){super(t,i),this.canvas=document.getElementById("myCanvas"),this.ctx=c.getContext("2d"),this.brickRowCount=5,this.brickColumnCount=5,this.brickWidth=75,this.brickHeight=20,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=30,this.rightPressed=!1,this.leftPressed=!1;const[s,e]=d();this.backgroundColor=e,this.ballColor=s,this.ball=new h(c.width/2,c.height-30);const r=(this.canvas.width-110)/2;this.paddle=new l(r,0,"black",110),this.scoreLabel=new n(30,120,"16px Arial","white"),this.livesLabel=new o(120,30,"16px Arial","white"),this.score=0,this.lives=999,this.initBricks(),this.draw()}initBricks(){this.bricks=[];for(let t=0;t<this.brickColumnCount;t+=1){this.bricks[t]=[];for(let i=0;i<this.brickRowCount;i+=1){const s=t*(this.brickWidth+this.brickPadding)+this.brickOffsetLeft,e=i*(this.brickHeight+this.brickPadding)+this.brickOffsetTop;this.bricks[t][i]=new r(s,e,this.ballColor)}}}drawBricks(){for(let t=0;t<this.brickColumnCount;t+=1)for(let i=0;i<this.brickRowCount;i+=1)!0===this.bricks[t][i].status&&this.bricks[t][i].render(this.ctx)}changeBrickColor(t){for(let i=0;i<this.brickColumnCount;i+=1)for(let s=0;s<this.brickRowCount;s+=1){this.bricks[i][s].color=t}}collisionDetection(){for(let t=0;t<this.brickColumnCount;t+=1)for(let i=0;i<this.brickRowCount;i+=1){const s=this.bricks[t][i];if(!0===s.status&&this.ball.x>s.x&&this.ball.x<s.x+75&&this.ball.y>s.y&&this.ball.y<s.y+20){this.ball.dy=-this.ball.dy,s.status=0;const[t,i]=d();this.backgroundColor=t,this.changeBrickColor(i),this.score+=1,this.score>=this.brickRowCount*this.brickColumnCount&&(alert("YOU WIN, CONGRATULATIONS!"),document.location.reload())}}}keyDownHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)}keyUpHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)}mouseMoveHandler(t){const i=t.clientX-c.offsetLeft;i>0&&i<c.width&&(this.paddle.x=i-37.5)}draw(){u.fillStyle=this.backgroundColor,u.fillRect(0,0,c.width,c.height),this.ball.move(2,2),this.ball.render(this.ctx),this.paddle.render(this.ctx,this.canvas),this.drawBricks(this.ctx),this.scoreLabel.render(this.ctx,this.score),this.livesLabel.render(this.ctx,this.lives),this.collisionDetection(this.ctx),this.mouseMoveHandler(this.ctx),this.keyDownHandler(this.ctx),this.keyUpHandler(this.ctx),(this.ball.x+this.ball.dx>c.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx,d()),this.ball.y+this.ball.dy<this.ball.radius?(this.ball.dy=-this.ball.dy,d()):this.ball.y+this.ball.dy>c.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width?(this.ball.dy=-this.ball.dy,d()):(this.lives-=1,this.lives?(this.ball.x=c.width/2,this.ball.y=c.height-30,this.ball.dx=1,this.ball.dy=-1,this.paddle.x=(c.width-75)/2):(alert("GAME OVER"),document.location.reload()))),this.rightPressed&&this.paddle.x<c.width-this.paddle.width?this.paddle.x+=4:this.leftPressed&&this.paddle.x>0&&(this.paddle.x-=4),this.ball.x+=this.ball.dx,this.ball.y+=this.ball.dy,requestAnimationFrame(()=>{this.draw()})}};function d(){const t=Math.floor(256*Math.random());return[`hsl(${t},100%,50%)`,`hsl(${t+180},100%,50%)`]}s.d(i,"getRandomColor",(function(){return d})),s.d(i,"canvas",(function(){return c})),s.d(i,"ctx",(function(){return u}));const c=document.getElementById("myCanvas"),u=c.getContext("2d"),b=new a;document.addEventListener("keydown",b.keyDownHandler.bind(b),!1),document.addEventListener("keyup",b.keyUpHandler.bind(b),!1),document.addEventListener("mousemove",b.mouseMoveHandler.bind(b),!1),requestAnimationFrame(()=>{b.draw()}),b.draw()}]);