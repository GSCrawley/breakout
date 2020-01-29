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

// function componentToHex(c) {
//   const hex = c.toString(16);
//   return hex.length === 1 ? `0${hex}` : hex;
// }

// function hexToRgb(hex) {
//   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16),
//   } : null;
// }

// function rgbComplimentary(r, g, b) {
//   let hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//   let rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

//   // Get array of RGB values
//   rgb = rgb.replace(/[^\d,]/g, '').split(',');

//   let r2 = rgb[0]/255.0, g2 = rgb[1]/255.0, b2 = rgb[2]/255.0;

//   let max = Math.max(r2, g2, b2);
//   let min = Math.min(r2, g2, b2);
//   let h, s, l = (max + min) / 2.0;

//   if (max === min) {
//     h = s = 0; //achromatic
//   } else {
//     var d = max - min;
//     s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

//     if (max === r2 && g2 >= b2) {
//       h = 1.0472 * (g2 - b2) / d;
//     } else if (max === r2 && g2 < b2) {
//       h = 1.0472 * (g2 - b2) / d + 6.2832;
//     } else if (max === g2) {
//       h = 1.0472 * (b2 - r2) / d + 2.0944;
//     } else if (max === b) {
//       h = 1.0472 * (r2 - g2) / d + 4.1888;
//     }
//   }

//   h = h / 6.2832 * 360.0 + 0;

//   // Shift hue to opposite side of wheel and convert to [0-1] value
//   h += 180;
//   if (h > 360) { h -= 360; }
//   h /= 360;

//   // Convert h s and l values into r g and b values
//   // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
//   if (s === 0) {
//     r2 = g2 = b2 = l; // achromatic
//   } else {
//     var hue2rgb = function hue2rgb(p, q, t) {
//       if(t < 0) t += 1;
//       if(t > 1) t -= 1;
//       if(t < 1 / 6) return p + (q - p) * 6 * t;
//       if(t < 1 / 2) return q;
//       if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };

//     var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     var p = 2 * l - q;

//     r2 = hue2rgb(p, q, h + 1 / 3);
//     g2 = hue2rgb(p, q, h);
//     b2 = hue2rgb(p, q, h - 1 / 3);
//   }

//   r2 = Math.round(r2 * 255);
//   g2 = Math.round(g * 255);
//   b2 = Math.round(b * 255);

//   // Convert r b and g values to hex
//   rgb = b2 | (g2 << 8) | (r2 << 16);
//   return hexToRgb("#" + (0x1000000 | rgb).toString(16).substring(1));
// }
// console.log('>>>> 0 >>>>', rgbComplimentary);


// console.log('--------------------------');
// const color = getRandomColor();
// console.log(color);
// const compliment = getComplementColor();
// console.log(compliment);

// step 1 - define values //
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


// const ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 2;
// let dy = -2;

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
  dx: 3,
  dy: -3,
  move: () => {
    this.x += this.dx;
    this.y -= this.dy;
  },
};

ball.move();

const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];


// ------- Game ---------
const game = {
  ctx: canvas.getContext('2d'),
  paddleHeight: 10,
  paddleWidth: 75,
  brickRowCount: 3,
  brickColumnCount: 5,
  brickWidth: 75,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
  bricks: [],
  draw() {
    this.drawBall();
  },
  drawBall() {
    this.ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  },
};
// -------- Game ----------

let ballColor = getRandomColor();
// let backgroundColor = rgbComplimentary();

console.log('>>> 1 >>>', ballColor);
// console.log('>>>>', backgroundColor);

let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - game.paddleHeight, game.paddleWidth, game.paddleHeight);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = ballColor;// "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  collisionDetection();
  drawBricks();
  drawScore();
  drawLives();
  // drawBackground();
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    ballColor = getRandomColor();
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    ballColor = getRandomColor();
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
      ballColor = getRandomColor();
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  } if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
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
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          ballColor = getRandomColor();
          // backgroundColor = rgbComplimentary();
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

// function drawBackground() {
//   ctx.backgroundColor = 
// }

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

draw();
