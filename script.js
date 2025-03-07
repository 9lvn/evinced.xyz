const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of each box in the grid
let snake = [{ x: 9 * box, y: 9 * box }]; // Initial position of the snake
let direction = 'RIGHT'; // Initial direction
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Initial food position
let score = 0;

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen'; // Head is green, body is light green
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // New food position
    } else {
        snake.pop(); // Remove the tail
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
    }

    snake.unshift(newHead); // Add new head to the snake
}

// Check for collision with itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
});

// Start the game loop
let game = setInterval(draw, 100);
