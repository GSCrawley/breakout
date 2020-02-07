// Score class ---------------
import Sprite from './Sprite';

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
export default Score;
