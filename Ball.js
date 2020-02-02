class Ball {
  constructor(x, y, radius, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = 2;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
  }
}

// const b1 = new Ball(100, 30, 10, 'blue');
// const b2 = new Ball(120, 50, 15);