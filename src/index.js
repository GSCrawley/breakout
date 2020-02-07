/* eslint-disable no-lone-blocks */
/* eslint-disable max-classes-per-file */
// /* eslint-disable no-mixed-operators */

// /* eslint-disable brace-style */
// /* eslint-disable no-use-before-define */
// /* eslint-disable no-alert */
// /* eslint-disable vars-on-top */


import Game from './Game'


function getRandomColor() {
  const h = Math.floor(Math.random() * 256);
  const s = 100;
  const l = 50;
  return [`hsl(${h},${s}%,${l}%)`, `hsl(${h + 180 % 360},${s}%,${l}%)`];
}

// step 1 - define values //
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const game = new Game();

// -------- Game ----------
document.addEventListener('keydown', game.keyDownHandler.bind(game), false);
document.addEventListener('keyup', game.keyUpHandler.bind(game), false);
document.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);

requestAnimationFrame(() => {
  game.draw();
});

game.draw();

export { getRandomColor, canvas, ctx };
