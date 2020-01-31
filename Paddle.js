class Paddle {
  constructor(x, y, color = '#0099dd', width = 75, height = 10) {
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
