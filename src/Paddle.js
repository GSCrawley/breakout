// Paddle class --------
import Sprite from './Sprite';
import { canvas } from './index';

class Paddle extends Sprite {
  constructor(x, y, color = '#0099dd', width = 75, height = 20) {
    super(x, y);
    this.x = (canvas.width - width) / 2;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  move(x) {
    this.x += x;
    this.checkLimits();
  }

  moveTo(x) {
    this.x = x;
    this.checkLimits();
  }

  checkLimits() {
    this.x = this.x < this.minX ? this.minX : this.x;
    this.x = this.x > this.maxX ? this.maxX : this.x;
  }
}

export default Paddle;
