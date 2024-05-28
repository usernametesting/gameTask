const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let rectX = canvas.width / 2;
let gameRunning = true; 
const circle = {
  x: 200,
  y: 200,
  size: 30,
  dx: 1,
  dy: 1,
};

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCircle();

  // Hızı artır
  circle.dx += 0.02; 
  circle.dy += 0.1; 

  // change position
  circle.x += circle.dx;
  circle.y += circle.dy;

  // Detect side walls
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }

  // Detect top and bottom walls
  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  if (
    circle.y + circle.size >= canvas.height - 10 &&
    (circle.x + circle.size < rectX || circle.x - circle.size > rectX + 200)
  ) {
    gameRunning = false;

    ctx.fillStyle = 'red';
    ctx.fillRect(rectX, canvas.height - 10, 200, 10); 
    if (gameRunning) {
      requestAnimationFrame(update);
    }
  }

  update();

  document.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(event) {
    if (!gameRunning) return; 
    if (event.key === 'ArrowRight') {
      rectX += 100; 
    } else if (event.key === 'ArrowLeft') {
      rectX -= 100; 
    }
    if (rectX < 0) {
      rectX = 0;
    } else if (rectX + 100 > canvas.width) {
      rectX = canvas.width - 100;
    }
  }
}
