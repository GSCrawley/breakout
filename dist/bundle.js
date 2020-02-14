/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Ball.js":
/*!*********************!*\
  !*** ./src/Ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// Ball class\n\n\nclass Ball extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, radius = 10, color = 'black') {\n    super(x, y);\n    this.x = x - 30;\n    this.y = y / 2;\n    this.dx = 1;\n    this.dy = -1;\n    this.radius = radius;\n    this.ballColor = color;\n  }\n\n  move() {\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.ballColor;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n// const b1 = new Ball(100, 30, 10, this.ballColor);\n// const b2 = new Ball(120, 50, 15);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n\n//# sourceURL=webpack:///./src/Ball.js?");

/***/ }),

/***/ "./src/Brick.js":
/*!**********************!*\
  !*** ./src/Brick.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// Brick class\n\n\n\nclass Brick extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, color = '#0099dd', width = 75, height = 20) {\n    super(x, y);\n    this.x = x;\n    this.y = y;\n    this.status = true;\n    this.color = color;\n    this.width = width;\n    this.height = height;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;// \"#0095DD\";\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Brick);\n\n\n//# sourceURL=webpack:///./src/Brick.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.js\");\n/* harmony import */ var _Paddle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Paddle */ \"./src/Paddle.js\");\n/* harmony import */ var _Brick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Brick */ \"./src/Brick.js\");\n/* harmony import */ var _Lives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Lives */ \"./src/Lives.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Score */ \"./src/Score.js\");\n/* eslint-disable prefer-destructuring */\n\n// ----------------------\n// ------- Game ---------\n// =======================================================================\n\n\n\n\n\n\n\n\n// ***************************************************\nclass Game extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y) {\n    super(x, y);\n    this.canvas = document.getElementById('myCanvas');\n    this.ctx = _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].getContext('2d');\n    this.brickRowCount = 5;\n    this.brickColumnCount = 5;\n    this.brickWidth = 75;\n    this.brickHeight = 20;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.rightPressed = false;\n    this.leftPressed = false;\n    const [ballColor, backgroundColor] = Object(_index__WEBPACK_IMPORTED_MODULE_1__[\"getRandomColor\"])();\n    this.backgroundColor = backgroundColor;\n    this.ballColor = ballColor;\n    this.ball = new _Ball__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].width / 2, _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].height - 30);\n    const paddleWidth = 90;\n    const paddleX = (this.canvas.width - paddleWidth) / 2;\n    this.paddle = new _Paddle__WEBPACK_IMPORTED_MODULE_3__[\"default\"](paddleX, 0, 'black', paddleWidth);\n    this.scoreLabel = new _Score__WEBPACK_IMPORTED_MODULE_6__[\"default\"](30, 120, '16px Arial', 'white');\n    this.livesLabel = new _Lives__WEBPACK_IMPORTED_MODULE_5__[\"default\"](120, 30, '16px Arial', 'white');\n    this.score = 0;\n    this.lives = 3;\n\n    this.initBricks();\n    this.draw();\n  }\n\n  // --------------------------------\n\n  initBricks() {\n    this.bricks = [];\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      this.bricks[c] = [];\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        // bricks[c][r] = { x: 0, y: 0, status: 1 };\n        const x = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;\n        const y = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;\n        this.bricks[c][r] = new _Brick__WEBPACK_IMPORTED_MODULE_4__[\"default\"](x, y, this.ballColor);\n      }\n    }\n  }\n\n  // -----------------------------\n  // Draws Bricks\n\n  drawBricks() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        if (this.bricks[c][r].status === true) {\n          this.bricks[c][r].render(this.ctx);\n        }\n      }\n    }\n  }\n\n  // Changes color of bricks when hit with ball\n\n  changeBrickColor(color) {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        const brick = this.bricks[c][r];\n        brick.color = color;\n      }\n    }\n  }\n  // -----------------------------\n  // Detects when ball collides with walls, paddle, or bricks\n\n  collisionDetection() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        const b = this.bricks[c][r];\n        // // console.log(game);\n        if (b.status === true) {\n          if (this.ball.x > b.x && this.ball.x < b.x + 75\n            && this.ball.y > b.y && this.ball.y < b.y + 20) {\n            this.ball.dy = -this.ball.dy; // bounce back\n            b.status = 0;\n            const [backgroundColor, brickColor] = Object(_index__WEBPACK_IMPORTED_MODULE_1__[\"getRandomColor\"])();\n            this.backgroundColor = backgroundColor;\n            this.changeBrickColor(brickColor);\n            this.score += 1;\n            if (this.score >= this.brickRowCount * this.brickColumnCount) {\n              alert('YOU WIN, CONGRATULATIONS!');\n              document.location.reload();\n            }\n          }\n        }\n      }\n    }\n  }\n\n  // -------------------------------------\n  // Handles left and right paddle keys\n\n  keyDownHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = true;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = true;\n    }\n  }\n\n  // --------------------------------------\n\n  keyUpHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = false;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = false;\n    }\n  }\n\n  // --------------------------------------\n  // Handles mouse sensor\n\n  mouseMoveHandler(e) {\n    const relativeX = e.clientX - _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].offsetLeft;\n    if (relativeX > 0 && relativeX < _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].width) {\n      this.paddle.x = relativeX - 75 / 2;\n    }\n  }\n\n  // ------------------------------\n\n  draw() {\n    _index__WEBPACK_IMPORTED_MODULE_1__[\"ctx\"].fillStyle = this.backgroundColor;\n    _index__WEBPACK_IMPORTED_MODULE_1__[\"ctx\"].fillRect(0, 0, this.canvas.width, this.canvas.height);\n    // this.canvas.drawBackground();\n    this.ball.move(1, 1);\n    this.ball.render(this.ctx);\n    this.paddle.render(this.ctx, this.canvas);\n    this.drawBricks(this.ctx);\n    this.scoreLabel.render(this.ctx, this.score);\n    this.livesLabel.render(this.ctx, this.lives);\n\n    this.collisionDetection(this.ctx);\n    this.mouseMoveHandler(this.ctx);\n    this.keyDownHandler(this.ctx);\n    this.keyUpHandler(this.ctx);\n    // console.log(this.rightPressed);\n\n    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius\n      || this.ball.x + this.ball.dx < this.ball.radius) {\n      console.log('AAAAA')\n      this.ball.dx = -this.ball.dx;\n      console.log('something is happening');\n      Object(_index__WEBPACK_IMPORTED_MODULE_1__[\"getRandomColor\"])();\n    }\n    if (this.ball.y + this.ball.dy < this.ball.radius) {\n      console.log('BBBBB')\n      this.ball.dy = -this.ball.dy;\n      Object(_index__WEBPACK_IMPORTED_MODULE_1__[\"getRandomColor\"])();\n      // backgroundColor = drawBackground();\n    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n      Object(_index__WEBPACK_IMPORTED_MODULE_1__[\"getRandomColor\"])();\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n        this.ball.dy = -this.ball.dy;\n      } else {\n        console.log('?????????');\n        this.lives -= 1;\n        if (!this.lives) {\n          alert('GAME OVER');\n          document.location.reload();\n        } else {\n          this.ball.x = this.canvas.width / 2;\n          this.ball.y = this.canvas.height - 30;\n          this.ball.dx = 1;\n          this.ball.dy = -1;\n          // console.log(this.paddle.x);\n          this.paddle.x = (this.canvas.width - 75) / 2;\n        }\n      }\n    }\n    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {\n      this.paddle.x += 4;\n    } else if (this.leftPressed && this.paddle.x > 0) {\n      this.paddle.x -= 4;\n    }\n    this.ball.x += this.ball.dx;\n    this.ball.y += this.ball.dy;\n\n    requestAnimationFrame(() => {\n      this.draw();\n    });\n  }\n}\n\n// *******************************************************\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/Lives.js":
/*!**********************!*\
  !*** ./src/Lives.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n// Lives class ---------------\n\n\n\n\n\nclass Lives extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, font = '16px Arial', fillStyle = '#0095DD') {\n    super(x, y);\n    this.font = font;\n    this.fillStyle = fillStyle;\n  }\n\n  render(ctx, lives) {\n    this.lives = 3;\n    ctx.font = this.font;\n    ctx.fillStyle = this.fillStyle;\n    ctx.fillText(`Lives: ${lives}`, _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].width - 65, 20);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Lives);\n\n\n//# sourceURL=webpack:///./src/Lives.js?");

/***/ }),

/***/ "./src/Paddle.js":
/*!***********************!*\
  !*** ./src/Paddle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n// Paddle class --------\n\n\n\nclass Paddle extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, color = '#0099dd', width = 75, height = 20) {\n    super(x, y);\n    this.x = (_index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].width - width) / 2;\n    this.y = y;\n    this.color = color;\n    this.width = width;\n    this.height = height;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, _index__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"].height - this.height, this.width, this.height);\n    ctx.fillStyle = 'black';\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  move(x) {\n    this.x += x;\n    this.checkLimits();\n  }\n\n  moveTo(x) {\n    this.x = x;\n    this.checkLimits();\n  }\n\n  checkLimits() {\n    this.x = this.x < this.minX ? this.minX : this.x;\n    this.x = this.x > this.maxX ? this.maxX : this.x;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Paddle);\n\n\n//# sourceURL=webpack:///./src/Paddle.js?");

/***/ }),

/***/ "./src/Score.js":
/*!**********************!*\
  !*** ./src/Score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n// Score class ---------------\n\n\nclass Score extends _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, font = '16px Arial', fillStyle = '#0095DD') {\n    super(x, y);\n    this.font = font;\n    this.fillStyle = fillStyle;\n  }\n\n  render(ctx, score) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.fillStyle;\n    ctx.fillText(`Score: ${score * 2}`, 8, 20);\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Score);\n\n\n//# sourceURL=webpack:///./src/Score.js?");

/***/ }),

/***/ "./src/Sprite.js":
/*!***********************!*\
  !*** ./src/Sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Sprite Class\nclass Sprite {\n  constructor() {\n    this.x = 0;\n    this.y = 0;\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n\n//# sourceURL=webpack:///./src/Sprite.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: getRandomColor, canvas, ctx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomColor\", function() { return getRandomColor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ctx\", function() { return ctx; });\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* eslint-disable no-lone-blocks */\n/* eslint-disable max-classes-per-file */\n// /* eslint-disable no-mixed-operators */\n\n// /* eslint-disable brace-style */\n// /* eslint-disable no-use-before-define */\n// /* eslint-disable no-alert */\n// /* eslint-disable vars-on-top */\n\n\n\n\nfunction getRandomColor() {\n  const h = Math.floor(Math.random() * 256);\n  const s = 100;\n  const l = 50;\n  return [`hsl(${h},${s}%,${l}%)`, `hsl(${h + 180 % 360},${s}%,${l}%)`];\n}\n\n// step 1 - define values //\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n// -------- Game ----------\ndocument.addEventListener('keydown', game.keyDownHandler.bind(game), false);\ndocument.addEventListener('keyup', game.keyUpHandler.bind(game), false);\ndocument.addEventListener('mousemove', game.mouseMoveHandler.bind(game), false);\n\nrequestAnimationFrame(() => {\n  game.draw();\n});\n\ngame.draw();\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });