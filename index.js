/* eslint-disable no-mixed-operators */

/* eslint-disable brace-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable vars-on-top */

function getRandomColor() {
  // eslint-disable-next-line func-names
  let r = function () { return Math.floor(Math.random() * 256); };

  return `rgb(${r()},${r()},${r()})`;
}

function parseRgb(s) {
  s = s.slice(4, s.length-1);
  let comp = s.split(",");// [34,50,67]
  let result = [];
  comp.forEach(a => {
    result.push(parseInt(a, 10));
  });
  return result;
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function rgbComplimentary(r, g, b) {
  let r2 = r / 255.0;
  let g2 = g / 255.0;
  let b2 = b / 255.0;

  const max = Math.max(r2, g2, b2);
  const min = Math.min(r2, g2, b2);
  let h = (max + min) / 2.0;
  let s = (max + min) / 2.0;
  let l = (max + min) / 2.0;

  if (max === min) {
    h = s = 0; //achromatic
  } else {
    let d = max - min;
    s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

    if (max === r2 && g2 >= b2) {
      h = 1.0472 * (g2 - b2) / d;
    } else if (max === r2 && g2 < b2) {
      h = 1.0472 * (g2 - b2) / d + 6.2832;
    } else if (max === g2) {
      h = 1.0472 * (b2 - r2) / d + 2.0944;
    } else if (max === b) {
      h = 1.0472 * (r2 - g2) / d + 4.1888;
    }
  }

  h = h / 6.2832 * 360.0 + 0;

  // Shift hue to opposite side of wheel and convert to [0-1] value
  h += 180;
  if (h > 360) { h -= 360; }
  h /= 360;

  // Convert h s and l values into r g and b values
  // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
  if (s === 0) {
    r2 = g2 = b2 = l; // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  r2 = Math.round(r * 255);
  g2 = Math.round(g * 255);
  b2 = Math.round(b * 255);

  // Convert r b and g values to hex
  rgb = b | (g << 8) | (r << 16);
  return hexToRgb("#" + (0x1000000 | rgb).toString(16).substring(1));
}

console.log('--------------------------');
const color = getRandomColor();
console.log('###', color);
const compliment = rgbComplimentary();
console.log("***", compliment);

// step 1 - define values //
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


// ------------------------------------------------------


const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

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

// ball.move();

// Belong to Paddle
// const paddleHeight = 10;
// const paddleWidth = 75;


// Belong to Brick
// const brickWidth = 75;
// const brickHeight = 20;


const brickRowCount = 5;
const brickColumnCount = 3;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let bricks = []; 
for (var c = 0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

let ballColor = getRandomColor();
let backgroundColor = drawBackground();

// ------- Game ---------
const game = {
  ctx: canvas.getContext('2d'),
  // paddleHeight: 10,
  // paddleWidth: 75,
  brickRowCount: 3,
  brickColumnCount: 5,
  // brickWidth: 75,
  // brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
  bricks: new Brick(),
  ball: new Ball(),
  paddle: new Paddle(canvas.width / 2, canvas.height - 10),
  draw() {
    console.log('whats up');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      // this.canvas.drawBackground();
    this.ball.move();
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.bricks.render(ctx);
    collisionDetection(ctx);
    drawScore(ctx);
    drawLives(ctx);
  },
  // drawBall() {
  //   this.ctx.beginPath();
  //   ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  //   ctx.fillStyle = ballColor;
  //   ctx.fill();
  //   ctx.closePath();
  // },
};
// -------- Game ----------


console.log('>>> 1 >>>', color);
console.log('>>>>', ballColor);

let paddleX = (canvas.width - 75) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

function drawBricks() {
  console.log('drawbricks');
  for (let c = 0; c < brickColumnCount; c += 1) {
    game.bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (game.brickWidth + game.brickPadding)) + game.brickOffsetLeft;
        const brickY = (r * (game.brickHeight + game.brickPadding)) + game.brickOffsetTop;
        bricks[c][r] = new Brick(brickX, brickY, ballColor);
        bricks[c][r].render(ctx);
      }
    }
  }
}

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//   ctx.fillStyle = ballColor;
//   ctx.fill();
//   ctx.closePath();
// }

// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height - game.paddleHeight, game.paddleWidth, game.paddleHeight);
//   ctx.fillStyle = 'black';
//   ctx.fill();
//   ctx.closePath();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // drawBackground(color);
//   collisionDetection();
//   console.log('about to call drawBricks');
//   drawBricks();
//   console.log('back from drawBricks')
//   drawScore();
//   drawLives();
  // ball.x += ball.dx;
  // ball.y += ball.dy;

  if (game.ball.x + game.ball.dx > canvas.width - game.ball.radius
    || game.ball.x + game.ball.dx < game.ball.radius) {
    game.ball.dx = -game.ball.dx;
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
  requestAnimationFrame(game.draw);
// }

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

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

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      // console.log(game);
      if (b.status === 1) {
        if (game.ball.x > b.x && game.ball.x < b.x + 75
          && game.ball.y > b.y && game.ball.y < b.y + 20)
        {
          game.ball.dy = -game.ball.dy;
          b.status = 0;
          getRandomColor();
          // drawBackground();
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBackground() {
  let rgb_value = parseRgb(ballColor);
  let compliment = rgbComplimentary(rgb_value[0], rgb_value[1], rgb_value[2]);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = compliment;
  ctx.fill();
  // console.log('***', ballColor);
  // console.log('&&&', compliment);
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score * 2}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

game.draw();
