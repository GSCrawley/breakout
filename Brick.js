class Brick {
  constructor(x, y, color = '#0099dd', width = 75, height = 20) {
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
