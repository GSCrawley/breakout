// Lives class ---------------

import Sprite from './Sprite';
import { canvas } from './index';


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

export default Lives;
