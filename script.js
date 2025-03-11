const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const box = 20; // Size of each grid box
const canvasSize = canvas.width;

let snake = [{ x: 9 * box, y: 10 * box }]; // Initial snake position
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
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
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop(); // Remove the tail
  }
}

// Game over function
function gameOver() {
  clearInterval(game);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over!", canvasSize / 2 - 80, canvasSize / 2);
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawFood();
  moveSnake();
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "DOWN") direction = "UP";
      break;
    case "ArrowDown":
      if (direction !== "UP") direction = "DOWN";
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") direction = "LEFT";
      break;
    case "ArrowRight":
      if (direction !== "LEFT") direction = "RIGHT";
      break;
  }
});

// Start the game
let game = setInterval(gameLoop, 100);
