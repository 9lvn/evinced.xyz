const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let stickman = {
    x: 100,
    y: 100,
    radius: 10,
    color: 'black',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stickman.draw();
    requestAnimationFrame(draw);
}

draw();
