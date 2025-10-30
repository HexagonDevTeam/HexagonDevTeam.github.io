// Snake Game in pure JS
// Call startSnake() to start
const script = document.createElement('script');
script.src = '/snake.js';
document.body.appendChild(script);


function startSnake() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.95)';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    document.body.appendChild(overlay);

    // Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.background = '#111';
    canvas.style.border = '2px solid #4da3ff';
    overlay.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const grid = 20;
    let snake = [{x: 8*grid, y: 8*grid}];
    let dx = 0, dy = 0;
    let apple = {x: Math.floor(Math.random()*20)*grid, y: Math.floor(Math.random()*20)*grid};
    let score = 0;
    let gameOver = false;

    function draw() {
        if(gameOver) return;
        // Background
        ctx.fillStyle = '#111';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Snake
        ctx.fillStyle = '#4da3ff';
        snake.forEach(seg => ctx.fillRect(seg.x, seg.y, grid-2, grid-2));

        // Apple
        ctx.fillStyle = '#ff5555';
        ctx.fillRect(apple.x, apple.y, grid-2, grid-2);

        // Move Snake
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        // Eat apple
        if(head.x === apple.x && head.y === apple.y){
            score++;
            apple = {x: Math.floor(Math.random()*20)*grid, y: Math.floor(Math.random()*20)*grid};
        } else {
            snake.pop();
        }

        // Collision with walls
        if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height){
            gameOver = true;
        }
        // Collision with self
        for(let i=1;i<snake.length;i++){
            if(head.x===snake[i].x && head.y===snake[i].y){
                gameOver = true;
            }
        }

        // Score
        ctx.fillStyle = '#fff';
        ctx.font = '16px monospace';
        ctx.fillText('Score: '+score, 10, 20);

        if(!gameOver) requestAnimationFrame(draw);
        else {
            ctx.fillStyle = '#fff';
            ctx.font = '24px monospace';
            ctx.fillText('Game Over! Press ESC', 40, 200);
        }
    }

    draw();

    // Controls
    document.addEventListener('keydown', e=>{
        switch(e.key){
            case 'ArrowUp': if(dy===0){dx=0;dy=-grid;} break;
            case 'ArrowDown': if(dy===0){dx=0;dy=grid;} break;
            case 'ArrowLeft': if(dx===0){dx=-grid;dy=0;} break;
            case 'ArrowRight': if(dx===0){dx=grid;dy=0;} break;
            case 'Escape': overlay.remove(); break;
        }
    });
}
