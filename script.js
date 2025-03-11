const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const box = 25; // Increased size of each grid box
const canvasSize = canvas.width;

let snake = [{ x: 8 * box, y: 8 * box }]; // Initial snake position
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
  y: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
};
let score = 0;
let game;

// Draw the snake with rounded segments
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.beginPath();
    ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fillStyle = index === 0 ? "#00ff88" : "#00cc66"; // Head is brighter, body is darker
    ctx.fill();
    ctx.closePath();
  });
}

// Draw the food as a circle
function drawFood() {
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4444";
  ctx.fill();
  ctx.closePath();
}

// Move the snake
function moveSnake() {
  let head = { ...snake[0] };

  switch (direction) {
    case "UP":
      head.y -= box;
      break;
    case "DOWN":
      head.y += box;
      break;
    case "LEFT":
      head.x -= box;
      break;
    case "RIGHT":
      head.x += box;
      break;
  }

  // Check for collision with walls or itself
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
      y: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
    };
  } else {
    snake.pop(); // Remove the tail
  }
}

// Game over function
function gameOver() {
  clearInterval(game);
  ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  ctx.fillStyle = "white";
  ctx.font = "35px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvasSize / 2, canvasSize / 2);
}

// Restart game
document.getElementById("restart-btn").addEventListener("click", () => {
  snake = [{ x: 8 * box, y: 8 * box }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").innerText = score;
  food = {
    x: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
    y: Math.floor(Math.random() * (canvasSize / box - 2) + 1) * box,
  };
  clearInterval(game);
  game = setInterval(gameLoop, 100);
});

// Handle keyboard input for both arrow keys and WASD
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    // Arrow keys
    case "ArrowUp":
    case "w":
    case "W":
      if (direction !== "DOWN") direction = "UP";
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (direction !== "UP") direction = "DOWN";
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (direction !== "RIGHT") direction = "LEFT";
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (direction !== "LEFT") direction = "RIGHT";
      break;
  }
});

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawFood();
  moveSnake();
}

// Start the game
game = setInterval(gameLoop, 100);
