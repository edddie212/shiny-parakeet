//Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

//Mouse Interactivity
let canvasPostion = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
};

canvas.addEventListener('mousedown',(e)=>{
   mouse.click = true;
   mouse.x = e.x - canvasPostion.left;
   mouse.y = e.y - canvasPostion.top;
});

canvas.addEventListener('mouseup',()=>{
   mouse.click = false;
});

//Player setup
const playerLeft = new Image();
playerLeft.src = './assets/f-left.png';
const playerRight = new Image();
playerRight.src = './assets/f-right.png';

class Player {
    constructor() {
     this.x = canvas.width;
     this.y = canvas.height/2;
     this.radius = 50;
     this.angle = 0;
     this.framex = 0;
     this.framey = 0;
     this.spriteWidth = 498;
     this.spriteHeight = 327;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if(mouse.x != this.x){
            this.x -= dx/20;
        }
        if(mouse.y != this.y){
           this.y -= dy/20;
        }
    }

    draw() {
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if(this.x >= mouse.x){
          ctx.drawImage(playerLeft, this.framex * this.spriteWidth, this.framey *
          this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x -55 ,
          this.y -50 , this.spriteWidth/2, this.spriteHeight/2);
        } else {
            ctx.drawImage(playerRight, this.framex * this.spriteWidth, this.framey *
                this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x -55 ,
                this.y -50 , this.spriteWidth/2, this.spriteHeight/2);
        }


    }
}

const player = new Player();

//Bubbles
const bubblesArray = [];

class Bubble {
    constructor() {
     this.x = Math.random() * canvas.width;
     this.y = canvas.height +100;
     this.radius = 50;
     this.speed = Math.random() * 5 + 3;
     this.distance;
     this.counted = false;
     this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
}

//Bubble pop sounds
const bubblePop1 = document.createElement('audio');
bubblePop1.src = './assets/pop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = './assets/water.wav';

function handleBubbles() {
  if(gameFrame % 50 == 0) {
      bubblesArray.push(new Bubble())
      console.log(bubblesArray.length)
  }
  for(let i = 0; i < bubblesArray.length; i++ ){
      bubblesArray[i].update();
      bubblesArray[i].draw();
      if(bubblesArray[i].y < 1 - this.radius * 2) {
          bubblesArray.splice(1, 1);
      }
      if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
          if(!bubblesArray[i].counted) {
              if(bubblesArray[i].sound === 'sound1'){
                  bubblePop1.play();
              } else {
                  bubblePop2.play();
              }
              score++;
              bubblesArray[i].counted = true;
              bubblesArray.splice(i, 1);
          }
      }
    }
}

//Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 50)
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

