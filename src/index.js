// Import styles
import './styles.css';

// Game state
const game = {
    canvas: null,
    ctx: null,
    ball: {
      x: 0,
      y: 0,
      dx: 2,
      dy: -2,
      radius: 10,
      color: '#FF5555',
      balls: []
    },
    paddle: {
      x: 0,
      width: 100,
      height: 20,
      dx: 8,
      color: '#4488FF',
      isPowerUp: false,
      powerUpType: null,
      powerUpTimer: 0,
      powerUpMaxTime: 10000 // 10 seconds
    },
    bricks: [],
    powerUps: [],
    brickRowCount: 6,
    brickColumnCount: 10,
    brickWidth: 0, // Will be calculated based on canvas width
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 60,
    brickOffsetLeft: 30,
    brickColors: [
      '#FF5555', // Red
      '#FFAA55', // Orange
      '#FFFF55', // Yellow
      '#55FF55', // Green
      '#55FFFF', // Cyan
      '#5555FF', // Blue
    ],
    rightPressed: false,
    leftPressed: false,
    baseSpeed: 2,
    startSpeed: 2,
    speedIncrease: 0.2,
    audio: {
      paddleHit: null,
      brickHit: null,
      powerUp: null,
      lifeLost: null,
      gameOver: null,
      levelUp: null,
    },
    score: 0,
    lives: 3,
    level: 1,
    running: false,
    paused: false,
    backgroundGradient: null,
    lastTimestamp: 0,
    leaderboard: [
      { name: 'Player1', score: 1500 },
      { name: 'Player2', score: 1200 },
      { name: 'Player3', score: 950 },
    ]
  };

  // Elements
  const startScreen = document.getElementById('start-screen');
  const gameCanvas = document.getElementById('game-canvas');
  const hud = document.getElementById('hud');
  const powerUpActive = document.getElementById('power-up-active');
  const powerUpIcon = document.getElementById('power-up-active-icon');
  const powerUpName = document.getElementById('power-up-name');
  const powerUpTimerFill = document.getElementById('power-up-timer-fill');
  const gameOverScreen = document.getElementById('game-over-screen');
  const finalScore = document.getElementById('final-score');
  const maxLevel = document.getElementById('max-level');
  const levelScreen = document.getElementById('level-screen');
  const levelCompleteTitle = document.getElementById('level-complete-title');
  const levelScore = document.getElementById('level-score');
  const leaderboardScreen = document.getElementById('leaderboard-screen');
  const leaderboardEntries = document.getElementById('leaderboard-entries');
  const playerNameInput = document.getElementById('player-name');
  
  // Buttons
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const nextLevelButton = document.getElementById('next-level-button');
  const leaderboardButton = document.getElementById('leaderboard-button');
  const leaderboardButtonEnd = document.getElementById('leaderboard-button-end');
  const closeLeaderboardButton = document.getElementById('close-leaderboard-button');
  
  // Init functions
  function initGame() {
    game.canvas = gameCanvas;
    game.ctx = gameCanvas.getContext('2d');
    
    // Set canvas dimensions
    resizeCanvas();
    
    // Create gradient background
    const gradient = game.ctx.createLinearGradient(0, 0, 0, game.canvas.height);
    gradient.addColorStop(0, '#111122');
    gradient.addColorStop(1, '#222244');
    game.backgroundGradient = gradient;
    
    // Initialize ball position
    resetBall();
    
    // Initialize paddle position
    game.paddle.x = (game.canvas.width - game.paddle.width) / 2;
    
    // Initialize ball array
    game.ball.balls = [
      {
        x: game.ball.x,
        y: game.ball.y,
        dx: game.ball.dx,
        dy: game.ball.dy,
        radius: game.ball.radius,
        color: game.ball.color
      }
    ];
    
    // Calculate brick width based on canvas
    game.brickWidth = (game.canvas.width - (game.brickOffsetLeft * 2) - (game.brickPadding * (game.brickColumnCount - 1))) / game.brickColumnCount;
    
    // Initialize bricks for the current level
    initBricks();
    
    // Update HUD
    updateScore();
    updateLives();
    updateLevel();
    
    // Set up event listeners
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    game.canvas.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('keydown', pauseHandler);
    window.addEventListener('resize', resizeCanvas);
    
    // Load audio effects
    loadAudio();
    
    // Start game loop
    game.running = true;
    game.lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
  }
  
  function resetBall() {
    game.ball.x = game.canvas.width / 2;
    game.ball.y = game.canvas.height - 50;
    
    // Start at 45 degree angle in random direction
    const direction = Math.random() > 0.5 ? 1 : -1;
    game.ball.dx = game.baseSpeed * direction;
    game.ball.dy = -game.baseSpeed;
  }
  
  function initBricks() {
    game.bricks = [];
    
    for (let c = 0; c < game.brickColumnCount; c++) {
      game.bricks[c] = [];
      for (let r = 0; r < game.brickRowCount; r++) {
        // Set brick properties based on level
        let hitPoints = 1;
        if (game.level > 2 && r < 2) hitPoints = 2;
        if (game.level > 4 && r < 1) hitPoints = 3;
        
        const brickX = c * (game.brickWidth + game.brickPadding) + game.brickOffsetLeft;
        const brickY = r * (game.brickHeight + game.brickPadding) + game.brickOffsetTop;
        
        // Determine if this brick has a power-up (approximately 10% chance)
        const hasPowerUp = Math.random() < 0.1;
        const powerUpType = hasPowerUp ? getRandomPowerUpType() : null;
        
        // Assign different colors based on row for visual appeal
        const colorIndex = r % game.brickColors.length;
        
        game.bricks[c][r] = {
          x: brickX,
          y: brickY,
          width: game.brickWidth,
          height: game.brickHeight,
          status: 1,
          hitPoints: hitPoints,
          color: game.brickColors[colorIndex],
          hasPowerUp: hasPowerUp,
          powerUpType: powerUpType,
        };
      }
    }
  }
  
  function resizeCanvas() {
    // Make canvas responsive
    const container = document.getElementById('game-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Maximum dimensions
    const maxWidth = 800;
    const maxHeight = 600;
    
    // Calculate aspect ratio
    const aspectRatio = maxWidth / maxHeight;
    
    let canvasWidth, canvasHeight;
    
    if (containerWidth / containerHeight > aspectRatio) {
      // Container is wider than canvas aspect ratio
      canvasHeight = Math.min(maxHeight, containerHeight - 40);
      canvasWidth = canvasHeight * aspectRatio;
    } else {
      // Container is taller than canvas aspect ratio
      canvasWidth = Math.min(maxWidth, containerWidth - 40);
      canvasHeight = canvasWidth / aspectRatio;
    }
    
    // Set canvas dimensions
    game.canvas.width = canvasWidth;
    game.canvas.height = canvasHeight;
    
    // Recalculate brick width
    if (game.running) {
      game.brickWidth = (game.canvas.width - (game.brickOffsetLeft * 2) - (game.brickPadding * (game.brickColumnCount - 1))) / game.brickColumnCount;
      
      // Reinitialize bricks to match new dimensions
      initBricks();
    }
  }
  
  function getRandomPowerUpType() {
    const powerUps = [
      'widen',      // Widen paddle
      'narrow',     // Narrow paddle
      'slowBall',   // Slow down the ball
      'fastBall',   // Speed up the ball
      'multiball',  // Add an extra ball
      'extraLife',  // Add an extra life
    ];
    
    const randomIndex = Math.floor(Math.random() * powerUps.length);
    return powerUps[randomIndex];
  }
  
  function loadAudio() {
    // This is a placeholder for audio loading
    // In a real implementation, we would load audio files
    game.audio = {
      paddleHit: { play: () => {} },
      brickHit: { play: () => {} },
      powerUp: { play: () => {} },
      lifeLost: { play: () => {} },
      gameOver: { play: () => {} },
      levelUp: { play: () => {} },
    };
  }
  
  // Event handlers
  function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      game.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      game.leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      game.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      game.leftPressed = false;
    }
  }
  
  function pauseHandler(e) {
    if (e.key === 'p' || e.key === 'P') {
      togglePause();
    }
  }
  
  function togglePause() {
    game.paused = !game.paused;
    if (game.paused) {
      showLeaderboard();
    } else {
      closeLeaderboard();
    }
  }
  
  function mouseMoveHandler(e) {
    const relativeX = e.clientX - game.canvas.getBoundingClientRect().left;
    
    if (relativeX > 0 && relativeX < game.canvas.width) {
      game.paddle.x = relativeX - game.paddle.width / 2;
      
      // Ensure paddle stays within canvas boundaries
      if (game.paddle.x < 0) {
        game.paddle.x = 0;
      } else if (game.paddle.x + game.paddle.width > game.canvas.width) {
        game.paddle.x = game.canvas.width - game.paddle.width;
      }
    }
  }
  
  // Drawing functions
  function drawBackground() {
    const ctx = game.ctx;
    const canvas = game.canvas;
    
    // Fill background
    ctx.fillStyle = game.backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    const now = Date.now() / 1000;
    for (let i = 0; i < 50; i++) {
      const x = Math.sin(i * 123.456 + now * 0.1) * canvas.width / 2 + canvas.width / 2;
      const y = Math.cos(i * 123.456 + now * 0.1) * canvas.height / 2 + canvas.height / 2;
      const size = Math.sin(i + now * 0.3) * 1.5 + 2.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function drawBalls() {
    const ctx = game.ctx;
    
    for (let i = 0; i < game.ball.balls.length; i++) {
      const ball = game.ball.balls[i];
      
      // Draw ball with 3D effect
      const gradient = ctx.createRadialGradient(
        ball.x - ball.radius / 3, 
        ball.y - ball.radius / 3, 
        0,
        ball.x, 
        ball.y, 
        ball.radius
      );
      
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, ball.color);
      gradient.addColorStop(1, '#000000');
      
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight
      ctx.beginPath();
      ctx.arc(
        ball.x - ball.radius / 2,
        ball.y - ball.radius / 2,
        ball.radius / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
  }
  
  function drawPaddle() {
    const ctx = game.ctx;
    const paddle = game.paddle;
    
    // Draw paddle base (3D effect)
    ctx.beginPath();
    ctx.rect(paddle.x, game.canvas.height - paddle.height, paddle.width, paddle.height);
    
    // Create gradient for paddle
    const gradient = ctx.createLinearGradient(
      paddle.x, 
      game.canvas.height - paddle.height, 
      paddle.x, 
      game.canvas.height
    );
    
    // Adjust paddle color based on power-ups
    let baseColor = paddle.color;
    if (paddle.isPowerUp) {
      switch (paddle.powerUpType) {
        case 'widen':
          baseColor = '#44FF44'; // Green for wider paddle
          break;
        case 'narrow':
          baseColor = '#FF4444'; // Red for narrow paddle
          break;
        case 'multiball':
          baseColor = '#FF44FF'; // Purple for multiball
          break;
        case 'extraLife':
          baseColor = '#44FFFF'; // Cyan for extra life
          break;
        default:
          baseColor = paddle.color;
      }
    }
    
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, '#222222');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add highlight to top of paddle
    ctx.beginPath();
    ctx.rect(paddle.x + 5, game.canvas.height - paddle.height + 3, paddle.width - 10, 5);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    
    // Add 3D edge to sides
    ctx.beginPath();
    ctx.moveTo(paddle.x, game.canvas.height - paddle.height);
    ctx.lineTo(paddle.x, game.canvas.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(paddle.x + paddle.width, game.canvas.height - paddle.height);
    ctx.lineTo(paddle.x + paddle.width, game.canvas.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.stroke();
  }
  
  function drawBricks() {
    const ctx = game.ctx;
    
    for (let c = 0; c < game.brickColumnCount; c++) {
      for (let r = 0; r < game.brickRowCount; r++) {
        const brick = game.bricks[c][r];
        if (brick.status > 0) {
          // Create 3D effect for bricks
          const gradient = ctx.createLinearGradient(
            brick.x, 
            brick.y, 
            brick.x, 
            brick.y + brick.height
          );
          
          let brickColor = brick.color;
          
          // Adjust color based on hit points
          if (brick.hitPoints > 1) {
            // Darken the color for multi-hit bricks
            const darkFactor = 0.7 / brick.hitPoints;
            brickColor = adjustColor(brick.color, darkFactor);
          }
          
          gradient.addColorStop(0, brickColor);
          gradient.addColorStop(1, adjustColor(brickColor, 0.7));
          
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Draw brick outline
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Add highlight to top of brick
          ctx.beginPath();
          ctx.rect(brick.x + 3, brick.y + 3, brick.width - 6, 3);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
          
          // Indicate power-up bricks with a small symbol
          if (brick.hasPowerUp) {
            ctx.beginPath();
            ctx.arc(
              brick.x + brick.width / 2,
              brick.y + brick.height / 2,
              5,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();
          }
        }
      }
    }
  }
  
  function adjustColor(color, factor) {
    // Simple helper to darken/lighten colors
    if (color.startsWith('#')) {
      // Convert hex to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Apply factor
      const newR = Math.min(255, Math.floor(r * factor));
      const newG = Math.min(255, Math.floor(g * factor));
      const newB = Math.min(255, Math.floor(b * factor));
      
      // Convert back to hex
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
    return color;
  }
  
  function drawPowerUps() {
    const ctx = game.ctx;
    
    for (let i = 0; i < game.powerUps.length; i++) {
      const powerUp = game.powerUps[i];
      
      // Save context for rotation
      ctx.save();
      ctx.translate(powerUp.x, powerUp.y);
      
      // Add rotation animation
      ctx.rotate((Date.now() / 500) % (Math.PI * 2));
      
      // Draw different icons based on power-up type
      switch (powerUp.type) {
        case 'widen':
          ctx.fillStyle = '#44FF44';
          ctx.fillRect(-10, -5, 20, 10);
          break;
        case 'narrow':
          ctx.fillStyle = '#FF4444';
          ctx.fillRect(-10, -5, 20, 10);
          break;
        case 'slowBall':
          ctx.fillStyle = '#4444FF';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'fastBall':
          ctx.fillStyle = '#FF4444';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'multiball':
          ctx.fillStyle = '#FF44FF';
          ctx.beginPath();
          ctx.arc(-4, -4, 6, 0, Math.PI * 2);
          ctx.arc(4, 4, 6, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'extraLife':
          ctx.fillStyle = '#44FFFF';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-5, 0);
          ctx.lineTo(5, 0);
          ctx.moveTo(0, -5);
          ctx.lineTo(0, 5);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    }
  }
  
  function updateScore() {
    document.getElementById('score').textContent = game.score;
  }
  
  function updateLives() {
    document.getElementById('lives').textContent = game.lives;
  }
  
  function updateLevel() {
    document.getElementById('level').textContent = game.level;
  }
  
  function addExtraBall() {
    if (game.ball.balls.length > 0) {
      const sourceBall = game.ball.balls[0];
      
      // Add a new ball with slightly different trajectory
      game.ball.balls.push({
        x: sourceBall.x,
        y: sourceBall.y,
        dx: -sourceBall.dx,
        dy: sourceBall.dy,
        radius: sourceBall.radius,
        color: sourceBall.color
      });
    }
  }
  
  function updatePowerUpDisplay(type) {
    // Update power-up UI
    powerUpActive.style.display = 'flex';
    
    switch (type) {
      case 'widen':
        powerUpName.textContent = 'Wide Paddle';
        break;
      case 'narrow':
        powerUpName.textContent = 'Narrow Paddle';
        break;
      case 'slowBall':
        powerUpName.textContent = 'Slow Ball';
        break;
      case 'fastBall':
        powerUpName.textContent = 'Fast Ball';
        break;
      case 'multiball':
        powerUpName.textContent = 'Multi Ball';
        break;
      case 'extraLife':
        powerUpName.textContent = 'Extra Life';
        break;
    }
  }
  
  function applyPowerUp(type) {
    // Apply power-up effect based on type
    switch (type) {
      case 'widen':
        game.paddle.width = Math.min(game.paddle.width * 1.5, game.canvas.width / 2);
        break;
      case 'narrow':
        game.paddle.width = Math.max(game.paddle.width * 0.75, 40);
        break;
      case 'slowBall':
        for (let i = 0; i < game.ball.balls.length; i++) {
          game.ball.balls[i].dx *= 0.75;
          game.ball.balls[i].dy *= 0.75;
        }
        break;
      case 'fastBall':
        for (let i = 0; i < game.ball.balls.length; i++) {
          game.ball.balls[i].dx *= 1.25;
          game.ball.balls[i].dy *= 1.25;
        }
        break;
      case 'multiball':
        addExtraBall();
        break;
      case 'extraLife':
        game.lives++;
        updateLives();
        break;
    }
    
    // Set power-up active state
    game.paddle.isPowerUp = true;
    game.paddle.powerUpType = type;
    game.paddle.powerUpTimer = game.paddle.powerUpMaxTime;
    
    // Update UI
    updatePowerUpDisplay(type);
  }
  
  function endPowerUp() {
    // Reset paddle properties
    if (game.paddle.powerUpType === 'widen') {
      game.paddle.width = 100; // Reset to original width
    } else if (game.paddle.powerUpType === 'narrow') {
      game.paddle.width = 100; // Reset to original width
    }
    
    // Reset power-up state
    game.paddle.isPowerUp = false;
    game.paddle.powerUpType = null;
    
    // Hide power-up UI
    powerUpActive.style.display = 'none';
  }
  
  // Game update functions
  function updatePaddle(deltaTime) {
    // Move paddle based on key presses
    if (game.rightPressed) {
      game.paddle.x += game.paddle.dx;
    } else if (game.leftPressed) {
      game.paddle.x -= game.paddle.dx;
    }
    
    // Keep paddle within boundaries
    if (game.paddle.x < 0) {
      game.paddle.x = 0;
    } else if (game.paddle.x + game.paddle.width > game.canvas.width) {
      game.paddle.x = game.canvas.width - game.paddle.width;
    }
  }
  
  function updateBalls(deltaTime) {
    for (let i = game.ball.balls.length - 1; i >= 0; i--) {
      const ball = game.ball.balls[i];
      
      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;
      
      // Collision detection with walls
      if (ball.x + ball.radius > game.canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
      
      if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }
      
      // Collision detection with paddle
      if (ball.y + ball.radius > game.canvas.height - game.paddle.height) {
        if (ball.x > game.paddle.x && ball.x < game.paddle.x + game.paddle.width) {
          // Ball hit the paddle
          ball.dy = -ball.dy;
          
          // Adjust ball angle based on where it hit the paddle
          const hitPosition = (ball.x - game.paddle.x) / game.paddle.width;
          ball.dx = 8 * (hitPosition - 0.5); // Range from -4 to 4
          
          // Play sound
          game.audio.paddleHit.play();
        } else if (ball.y + ball.radius > game.canvas.height) {
          // Ball went out of bounds
          
          // Remove this ball
          game.ball.balls.splice(i, 1);
          
          // If no balls left, lose a life
          if (game.ball.balls.length === 0) {
            game.lives--;
            updateLives();
            
            // Play sound
            game.audio.lifeLost.play();
            
            if (game.lives <= 0) {
              // Game over
              gameOver();
            } else {
              // Reset ball
              resetBall();
              
              // Initialize ball array
              game.ball.balls = [
                {
                  x: game.ball.x,
                  y: game.ball.y,
                  dx: game.ball.dx,
                  dy: game.ball.dy,
                  radius: game.ball.radius,
                  color: game.ball.color
                }
              ];
            }
          }
        }
      }
      
      // Collision detection with bricks
      for (let c = 0; c < game.brickColumnCount; c++) {
        for (let r = 0; r < game.brickRowCount; r++) {
          const brick = game.bricks[c][r];
          
          if (brick.status > 0) {
            // Check if ball hit brick
            if (ball.x + ball.radius > brick.x && 
                ball.x - ball.radius < brick.x + brick.width && 
                ball.y + ball.radius > brick.y && 
                ball.y - ball.radius < brick.y + brick.height) {
              
              // Reduce brick hit points
              brick.hitPoints--;
              
              // If brick is destroyed
              if (brick.hitPoints <= 0) {
                brick.status = 0;
                game.score += 10;
                updateScore();
                
                // Check if this brick had a power-up
                if (brick.hasPowerUp) {
                  // Create a power-up that falls from the brick
                  game.powerUps.push({
                    x: brick.x + brick.width / 2,
                    y: brick.y + brick.height / 2,
                    type: brick.powerUpType,
                    speed: 2
                  });
                }
              }
              
              // Determine bounce direction
              // Calculate collision point distance from brick center
              const brickCenterX = brick.x + brick.width / 2;
              const brickCenterY = brick.y + brick.height / 2;
              const collisionDistX = Math.abs(ball.x - brickCenterX);
              const collisionDistY = Math.abs(ball.y - brickCenterY);
              
              // If closer to top/bottom, reverse Y velocity, otherwise reverse X
              if (collisionDistX > collisionDistY) {
                ball.dx = -ball.dx;
              } else {
                ball.dy = -ball.dy;
              }
              
              // Play sound
              game.audio.brickHit.play();
              
              // Check if level is complete
              checkLevelCompletion();
            }
          }
        }
      }
    }
  }
  
  function updatePowerUps(deltaTime) {
    // Move power-ups down
    for (let i = game.powerUps.length - 1; i >= 0; i--) {
      const powerUp = game.powerUps[i];
      powerUp.y += powerUp.speed;
      
      // Check if power-up hits paddle
      if (powerUp.y > game.canvas.height - game.paddle.height &&
          powerUp.y < game.canvas.height &&
          powerUp.x > game.paddle.x && 
          powerUp.x < game.paddle.x + game.paddle.width) {
        // Apply power-up effect
        applyPowerUp(powerUp.type);
        
        // Remove power-up
        game.powerUps.splice(i, 1);
        
        // Play sound
        game.audio.powerUp.play();
      }
      
      // Remove if out of bounds
      else if (powerUp.y > game.canvas.height) {
        game.powerUps.splice(i, 1);
      }
    }
  }
  
  function checkLevelCompletion() {
    // Check if all bricks are destroyed
    let bricksRemaining = 0;
    
    for (let c = 0; c < game.brickColumnCount; c++) {
      for (let r = 0; r < game.brickRowCount; r++) {
        if (game.bricks[c][r].status > 0) {
          bricksRemaining++;
        }
      }
    }
    
    if (bricksRemaining === 0) {
      // Level completed
      
      // Show level complete screen
      levelScore.textContent = game.score;
      levelCompleteTitle.textContent = `Level ${game.level} Complete!`;
      levelScreen.style.display = 'flex';
      
      // Stop game
      game.running = false;
      
      // Play level up sound
      game.audio.levelUp.play();
    }
  }
  
  function nextLevel() {
    // Increase level
    game.level++;
    updateLevel();
    
    // Increase ball speed
    game.baseSpeed += game.speedIncrease;
    
    // Reset ball and paddle
    resetBall();
    game.paddle.x = (game.canvas.width - game.paddle.width) / 2;
    
    // Reset ball array
    game.ball.balls = [
      {
        x: game.ball.x,
        y: game.ball.y,
        dx: game.ball.dx,
        dy: game.ball.dy,
        radius: game.ball.radius,
        color: game.ball.color
      }
    ];
    
    // Clear any active power-ups
    game.paddle.isPowerUp = false;
    game.paddle.powerUpType = null;
    powerUpActive.style.display = 'none';
    
    // Initialize bricks for new level
    initBricks();
    
    // Hide level complete screen
    levelScreen.style.display = 'none';
    
    // Resume game
    game.running = true;
    game.lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
  }
  
  function gameOver() {
    // Stop game
    game.running = false;
    game.paused = false;
    
    // Hide game elements
    gameCanvas.classList.add('hidden');
    hud.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    
    // Update game over screen
    finalScore.textContent = `Final Score: ${game.score}`;
    maxLevel.textContent = `Level Reached: ${game.level}`;
    
    // Show game over screen
    gameOverScreen.classList.remove('hidden');
    gameOverScreen.classList.add('visible');
    
    // Play game over sound if available
    if (game.audio.gameOver) {
      game.audio.gameOver.play();
    }
  }
  
  function restart() {
    // Reset score and lives
    game.score = 0;
    game.lives = 3;
    game.level = 1;
    game.baseSpeed = game.startSpeed;
    
    // Reset ball and paddle
    resetBall();
    game.paddle.x = (game.canvas.width - game.paddle.width) / 2;
    
    // Reset ball array
    game.ball.balls = [
      {
        x: game.ball.x,
        y: game.ball.y,
        dx: game.ball.dx,
        dy: game.ball.dy,
        radius: game.ball.radius,
        color: game.ball.color
      }
    ];
    
    // Initialize bricks
    initBricks();
    
    // Update HUD
    updateScore();
    updateLives();
    updateLevel();
    
    // Hide game over screen
    gameOverScreen.classList.remove('visible');
    gameOverScreen.classList.add('hidden');
    
    // Show game elements
    gameCanvas.classList.remove('hidden');
    hud.classList.remove('hidden');
    
    // Resume game
    game.running = true;
    game.lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
  }
  
  function showLeaderboard() {
    // Hide other screens
    gameCanvas.classList.add('hidden');
    gameOverScreen.classList.remove('visible');
    gameOverScreen.classList.add('hidden');
    hud.classList.add('hidden');
    
    // Clear old entries
    leaderboardEntries.innerHTML = '';
    
    // Sort leaderboard by score
    game.leaderboard.sort((a, b) => b.score - a.score);
    
    // Create entries
    game.leaderboard.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      `;
      leaderboardEntries.appendChild(row);
    });
    
    // Show leaderboard screen
    leaderboardScreen.classList.remove('hidden');
    leaderboardScreen.classList.add('visible');
  }
  
  function closeLeaderboard() {
    leaderboardScreen.classList.remove('visible');
    leaderboardScreen.classList.add('hidden');
    
    // If we came from game over screen, show it again
    if (!game.running) {
      gameOverScreen.classList.remove('hidden');
      gameOverScreen.classList.add('visible');
    } else {
      // Otherwise show the game
      game.paused = false;
      gameCanvas.classList.remove('hidden');
      hud.classList.remove('hidden');
    }
  }
  
  function submitScore() {
    const playerName = playerNameInput.value.trim() || 'Anonymous';
    
    // Add new score to leaderboard
    game.leaderboard.push({
      name: playerName,
      score: game.score
    });
    
    // Sort and limit to top 10 scores
    game.leaderboard.sort((a, b) => b.score - a.score);
    if (game.leaderboard.length > 10) {
      game.leaderboard.length = 10;
    }
    
    // Show leaderboard
    showLeaderboard();
  }
  
  function draw() {
    // Clear the canvas
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Draw components
    drawBackground();
    drawBricks();
    drawPowerUps();
    drawPaddle();
    drawBalls();
  }
  
  function gameLoop(timestamp) {
    // Calculate delta time
    const deltaTime = timestamp - game.lastTimestamp;
    game.lastTimestamp = timestamp;
    
    if (!game.paused && game.running) {
      // Update game state
      updateBalls(deltaTime);
      updatePaddle(deltaTime);
      updatePowerUps(deltaTime);
      
      // Update power-up timer
      if (game.paddle.isPowerUp) {
        game.paddle.powerUpTimer -= deltaTime;
        
        // Update timer UI
        const percentLeft = game.paddle.powerUpTimer / game.paddle.powerUpMaxTime;
        powerUpTimerFill.style.width = `${percentLeft * 100}%`;
        
        // Check if power-up ended
        if (game.paddle.powerUpTimer <= 0) {
          endPowerUp();
        }
      }
      
      // Draw everything
      draw();
    }
    
    // Request next frame
    requestAnimationFrame(gameLoop);
  }
  
  // Event listeners for menu buttons
  startButton.addEventListener('click', () => {
    startScreen.classList.remove('visible');
    startScreen.classList.add('hidden');
    gameCanvas.classList.remove('hidden');
    gameCanvas.classList.add('visible');
    hud.classList.remove('hidden');
    hud.classList.add('visible');
    initGame();
  });
  
  restartButton.addEventListener('click', restart);
  nextLevelButton.addEventListener('click', nextLevel);
  leaderboardButton.addEventListener('click', showLeaderboard);
  leaderboardButtonEnd.addEventListener('click', submitScore);
  closeLeaderboardButton.addEventListener('click', closeLeaderboard);
  
  // Initialize game
  window.addEventListener('load', () => {
    // Make sure start screen is visible
    startScreen.classList.add('visible');
    gameCanvas.classList.add('hidden');
    hud.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    levelScreen.classList.add('hidden');
  });