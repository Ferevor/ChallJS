  const GRID_WIDTH = 50;
  const GRID_HEIGHT = 25;
  const fps = 10
  const keys = {
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
  }
  
let currentLevel = 0;
let levelData;
let playerPos = { x: 0, y: 0 };
let steps = 0;

function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}

// Animation frames for walking
const playerFrames = [
    "assets/PNG/Default size/Player/player_01.png",
    "assets/PNG/Default size/Player/player_24.png"
];
let animFrame = 0;
let animPlaying = false;
let lastAnimTime = 0;
let idle = true;
let idleFrame = 0;

function animatePlayer(time) {
    if (animPlaying) {
        if (time - lastAnimTime > 100) { // Walking animation
            animFrame = (animFrame + 1) % playerFrames.length;
            lastAnimTime = time;
            render();
        }
        requestAnimationFrame(animatePlayer);
    } else if (idle) {
        if (time - lastAnimTime > 500) { // Idle animation (slow blink)
            idleFrame = (idleFrame + 1 ) % playerFrames.length; // Toggle between frame 0 and 1
            lastAnimTime = time;
            render();
        }
        requestAnimationFrame(animatePlayer);
    }
}

function findPlayer(level) {
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === 3) return { x, y };
        }
    }
    return null;
}

function loadLevel(idx) {
    levelData = deepCopy(levels[idx]);
    playerPos = findPlayer(levelData);
    if (!playerPos) {
        alert("Erreur : Aucun joueur (3) dans ce niveau !");
        return;
    }
    steps = 0;
    updateStepCounter();
    render();
}

function updateStepCounter() {
    document.getElementById('step-counter').textContent = `Steps: ${steps}`;
}

function render() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    container.style.gridTemplateRows = `repeat(${levelData.length}, 40px)`;
    container.style.gridTemplateColumns = `repeat(${levelData[0].length}, 40px)`;

    for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            let img = document.createElement('img');
            img.style.width = "100%";
            img.style.height = "100%";
            let type = levelData[y][x];

            switch (type) {
                case 1:
                    img.src = "assets/PNG/Default size/Blocks/block_06.png";
                    break;
                case 2:
                    img.src = "assets/PNG/Default size/Crates/crate_03.png";
                    break;
                case 3:
                    if (animPlaying) {
                        img.src = playerFrames[animFrame];
                    } else if (idle) {
                        img.src = idleFrame === 0 ? playerFrames[0] : playerFrames[1]; // Idle: blink between 01 and 24
                    } else {
                        img.src = playerFrames[0];
                    }
                    break;
                case 4:
                    img.src = "assets/PNG/Default size/Environment/environment_05.png";
                    break;
                case 5:
                    img.src = "assets/PNG/Default size/Crates/crate_05.png";
                    cell.style.background = "yellow";
                    break;
                default:
                    img = null;
            }
            if (img) cell.appendChild(img);
            container.appendChild(cell);
        }
    }
}

function isWin() {
    for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
            // Si dans le niveau original il y a un but (4)
            // et que dans la grille courante il n'y a PAS une boîte sur but (5)
            if (levels[currentLevel][y][x] === 4 && levelData[y][x] !== 5) {
                return false;
            }
        }
    }
    return true;
}

function move(dx, dy) {
    const { x, y } = playerPos;
    const nx = x + dx, ny = y + dy;
    const next = levelData[ny][nx];

    // Si mur, on ne bouge pas
    if (next === 1) return;

    // Si boîte ou boîte sur but
    if (next === 2 || next === 5) {
        const bx = nx + dx, by = ny + dy;
        const boxNext = levelData[by][bx];
        if (boxNext === 1 || boxNext === 2 || boxNext === 5) return; // bloqué

        // Déplacement de la boîte
        if (boxNext === 4) {
            levelData[by][bx] = 5; // boîte sur but
        } else {
            levelData[by][bx] = 2; // boîte sur sol
        }

        // La case que la boîte quitte redevient but ou sol
        if (next === 5) {
            levelData[ny][nx] = 4; // but
        } else {
            levelData[ny][nx] = 0; // sol
        }
    }

    // Déplacement du joueur
    // La case que le joueur quitte redevient but ou sol
    if (levelData[y][x] === 3 && isGoal(x, y)) {
        levelData[y][x] = 4;
    } else if (levelData[y][x] === 3) {
        levelData[y][x] = 0;
    }

    // La case où va le joueur reste 3
    levelData[ny][nx] = 3;
    playerPos = { x: nx, y: ny };
    steps++;
    updateStepCounter();
    render();

    if (isWin()) {
        setTimeout(() => {
            if (currentLevel < levels.length - 1) {
                alert('Level Complete!');
                currentLevel++;
                loadLevel(currentLevel);
            } else {
                alert('Congratulations, you won!');
            }
        }, 100);
    }
}

// Helper pour savoir si la case est un but 
function isGoal(x, y) {
    // On regarde dans la map d'origine si c'est un but
    return levels[currentLevel][y][x] === 4;
}

document.addEventListener('keydown', (e) => {
    if (!animPlaying && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        animPlaying = true;
        idle = false;
        requestAnimationFrame(animatePlayer);
    }
    if (e.key === 'ArrowUp') move(0, -1);
    if (e.key === 'ArrowDown') move(0, 1);
    if (e.key === 'ArrowLeft') move(-1, 0);
    if (e.key === 'ArrowRight') move(1, 0);
});

document.addEventListener('keyup', (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        animPlaying = false;
        animFrame = 0;
        idle = true;
        lastAnimTime = performance.now();
        requestAnimationFrame(animatePlayer);
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    loadLevel(currentLevel);
});

window.onload = () => {
    idle = true;
    requestAnimationFrame(animatePlayer);
    loadLevel(currentLevel);
};