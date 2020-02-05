/* eslint-disable max-classes-per-file */
// /* eslint-disable no-mixed-operators */

// /* eslint-disable brace-style */
// /* eslint-disable no-use-before-define */
// /* eslint-disable no-alert */
// /* eslint-disable vars-on-top */

function getRandomColor() {
  const h = Math.floor(Math.random() * 256);
  const s = 100;
  const l = 50;
  return [`hsl(${h},${s}%,${l}%)`, `hsl(${h+180%360},${s}%,${l}%)`]
}


// step 1 - define values //
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ------- Classes ---------------

// Sprite Class
class Sprite {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

// Ball class 
class Ball extends Sprite {
  constructor(x, y, radius = 10, color = 'red') {
    super(x, y);
    this.x = 230;
    this.y = 460;
    this.dx = 1;
    this.dy = -1;
    this.radius = radius;
    this.ballColor = color;
  }

  move(x, y) {
    this.x += this.dx;
    this.y -= this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
  }
}

const b1 = new Ball(100, 30, 10, this.ballColor);
const b2 = new Ball(120, 50, 15);


// Paddle class --------
class Paddle extends Sprite {
  constructor(x, y, color = '#0099dd', width = 75, height = 10) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
}

// const paddle = new Paddle(canvas.width / 2, canvas.height - game.paddleHeight)
// Brick class
class Brick extends Sprite {
  constructor(x, y, color = '#0099dd', width = 75, height = 20) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.status = true;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;// "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}
//Score class ---------------
class Score extends Sprite {

  constructor(x, y, font = '16px Arial', fillStyle = '#0095DD') {
    super(x, y);
    this.font = font;
    this.fillStyle = fillStyle;
  }

  render(ctx, score) {
    ctx.font = this.font;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(`Score: ${score * 2}`, 8, 20);
  }
}
//Lives class ---------------
class Lives extends Sprite {
  constructor(x, y, font = '16px Arial', fillStyle = '#0095DD') {
    super(x, y);
    this.font = font;
    this.fillStyle = fillStyle;
  }

  render(ctx, lives) {
    ctx.font = this.font;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
  }
}


// const ball = {
//   x: canvas.width / 2,
//   y: canvas.height - 30,
//   radius: 10,
//   dx: 3,
//   dy: -3,
//   move: () => {
//     this.x += this.dx;
//     this.y -= this.dy;
//   },
// };




// ----------------------
// ------- Game ---------
// =========================================================================

class Game {
  constructor() {
    this.ctx = canvas.getContext('2d');
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    const [ballColor, backgroundColor] = getRandomColor();
    console.log(ballColor, backgroundColor);
    this.backgroundColor = backgroundColor;
    this.ballColor = ballColor;
    this.ball = new Ball(100, 30, 10, ballColor);
    this.paddle = new Paddle(canvas.width / 2, canvas.height - 10);
    this.scoreLabel = new Score(30, 120, '16px Arial', 'white');
    this.livesLabel = new Lives(120, 30, '16px Arial', 'white');

    this.score = 0
    this.lives = 3

    this.initBricks();

    console.log(this.bricks)

    this.draw()
  }

  initBricks() {
    this.bricks = [];
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        // bricks[c][r] = { x: 0, y: 0, status: 1 };
        const x = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const y = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        console.log(x, y, this.brickWidth, this.brickPadding, this.brickOffsetLeft)
        this.bricks[c][r] = new Brick(x, y, this.ballColor);
      }
    }
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === true) {
          this.bricks[c][r].render(this.ctx);
        }
      }
    }
  }

  draw() {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // this.canvas.drawBackground();
    this.ball.move(2, 2);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.drawBricks(ctx);
    collisionDetection(ctx);
    this.scoreLabel.render(ctx, this.score);
    // drawLives(ctx);
    this.livesLabel.render(ctx, this.lives);

    requestAnimationFrame(() => {
      this.draw()
    })
  }
}

// ========================================================

const game = new Game();

// -------- Game ----------


let paddleX = (canvas.width - 75) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;


if (game.ball.x + game.ball.dx > canvas.width - game.ball.radius
  || game.ball.x + game.ball.dx < game.ball.radius) {
  game.ball.dx = -game.ball.dx;
  console.log('something happening');
  getRandomColor();
  // drawBackground();
}
if (game.ball.y + game.ball.dy < game.ball.radius) {
  game.ball.dy = -game.ball.dy;
  getRandomColor();
  // backgroundColor = drawBackground();
} else if (game.ball.y + game.ball.dy > canvas.height - game.ball.radius) {
  if (game.ball.x > paddleX && game.ball.x < paddleX + 75) {
    game.ball.dy = -game.ball.dy;
    getRandomColor();
    // backgroundColor = drawBackground();
  } else {
    lives -= 1;
    if (!lives) {
      alert('GAME OVER');
      document.location.reload();
    } else {
      game.ball.x = canvas.width / 2;
      game.ball.y = canvas.height - 30;
      game.ball.dx = 2;
      game.ball.dy = -2;
      paddleX = (canvas.width - 75) / 2;
    }
  }
} if (rightPressed) {
  paddleX += 7;
  if (paddleX + 75 > canvas.width) {
    paddleX = canvas.width - 75;
  }
} else if (leftPressed) {
  paddleX -= 7;
  if (paddleX < 0) {
    paddleX = 0;
  }
}
requestAnimationFrame(() => {
  game.draw();
});
// }

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - 75 / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
}
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', this.keyDownHandler, false);
document.addEventListener('keyup', this.keyUpHandler, false);
document.addEventListener('mousemove', this.mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < this.brickColumnCount; c += 1) {
    for (let r = 0; r < this.brickRowCount; r += 1) {
      const b = this.bricks[c][r];
      // console.log(game);
      if (b.status === 1) {
        if (game.ball.x > b.x && game.ball.x < b.x + 75
          && game.ball.y > b.y && game.ball.y < b.y + 20) {
          game.ball.dy = -game.ball.dy;
          b.status = 0;
          // getRandomColor();
          // drawBackground();
          score += 1;
          if (score === this.brickRowCount * this.brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// function drawBackground() {
//   let rgb_value = parseRgb(ballColor);
//   let compliment = rgbComplimentary(rgb_value[0], rgb_value[1], rgb_value[2]);
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = compliment;
//   ctx.fill();
// }


game.draw();
