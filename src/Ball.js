// Ball class
import Sprite from './Sprite';

class Ball extends Sprite {
  constructor(x, y, radius = 10, color = 'black') {
    super(x, y);
    this.x = x - 30;
    this.y = y / 2;
    this.dx = 1;
    this.dy = -1;
    this.radius = radius;
    this.ballColor = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
  }
}

// const b1 = new Ball(100, 30, 10, this.ballColor);
// const b2 = new Ball(120, 50, 15);

export default Ball;
