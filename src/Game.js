/* eslint-disable prefer-destructuring */

// ----------------------
// ------- Game ---------
// =======================================================================
import Sprite from './Sprite';
import { canvas, getRandomColor, ctx } from './index';
import Ball from './Ball';
import Paddle from './Paddle';
import Brick from './Brick';
import Lives from './Lives';
import Score from './Score';

// ***************************************************
class Game extends Sprite {
  // -------------------------------------------------
  constructor(x, y) {
    super(x, y);
    this.canvas = document.getElementById('myCanvas');
    this.ctx = canvas.getContext('2d');
    this.brickRowCount = 5;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.rightPressed = false;
    this.leftPressed = false;
    const [ballColor, backgroundColor] = getRandomColor();
    this.backgroundColor = backgroundColor;
    this.ballColor = ballColor;
    this.ball = new Ball(canvas.width / 2, canvas.height - 30);
    const paddleWidth = 90;
    const paddleX = (this.canvas.width - paddleWidth) / 2;
    this.paddle = new Paddle(paddleX, 0, 'black', paddleWidth);
    this.scoreLabel = new Score(30, 120, '16px Arial', 'white');
    this.livesLabel = new Lives(120, 30, '16px Arial', 'white');
    this.score = 0;
    this.lives = 5;

    this.initBricks();
    this.draw();
  }

  // --------------------------------

  initBricks() {
    this.bricks = [];
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        // bricks[c][r] = { x: 0, y: 0, status: 1 };
        const x = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const y = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(x, y, this.ballColor);
      }
    }
  }

  // -----------------------------
// Draws Bricks

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === true) {
          this.bricks[c][r].render(this.ctx);
        }
      }
    }
  }

  // Changes color of bricks when hit with ball

  changeBrickColor(color) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        brick.color = color;
      }
    }
  }
  // -----------------------------
// Detects when ball collides with walls, paddle, or bricks

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = this.bricks[c][r];
        // // console.log(game);
        if (b.status === true) {
          if (this.ball.x > b.x && this.ball.x < b.x + 75
            && this.ball.y > b.y && this.ball.y < b.y + 20) {
            this.ball.dy = -this.ball.dy; // bounce back
            b.status = 0;
            const [backgroundColor, brickColor] = getRandomColor();
            this.backgroundColor = backgroundColor;
            this.changeBrickColor(brickColor);
            this.score += 1;
            if (this.score >= this.brickRowCount * this.brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  // -------------------------------------
// Handles left and right paddle keys

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  // --------------------------------------

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  // --------------------------------------
// Handles mouse sensor

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.x = relativeX - 75 / 2;
    }
  }

  // ------------------------------

  draw() {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // this.canvas.drawBackground();
    this.ball.move(1, 1);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx, this.canvas);
    this.drawBricks(this.ctx);
    this.scoreLabel.render(this.ctx, this.score);
    this.livesLabel.render(this.ctx, this.lives);

    this.collisionDetection(this.ctx);
    this.mouseMoveHandler(this.ctx);
    this.keyDownHandler(this.ctx);
    this.keyUpHandler(this.ctx);
    // console.log(this.rightPressed);

    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      // console.log('something is happening');
      getRandomColor();
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      getRandomColor();
      // backgroundColor = drawBackground();
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      }
      getRandomColor();
    } else {
      this.lives -= 1;
      if (!this.lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        this.ball.x = canvas.width / 2;
        this.ball.y = canvas.height - 30;
        this.ball.dx = 1;
        this.ball.dy = -1;
        // console.log(this.paddle.x);
        this.paddle.x = (canvas.width - 75) / 2;
      }
    }
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.x += 4;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 4;
    }
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    requestAnimationFrame(() => {
      this.draw();
    });
  }
}

// *******************************************************

export default Game;
