let timer;
let time = 0;
let isPaused = false;

function startGame() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
    isPaused = false;
    generateBoard();
  }
}

function pauseGame() {
  if (timer) {
    if (!isPaused) {
      clearInterval(timer);
      isPaused = true;
    } else {
      timer = setInterval(updateTimer, 1000);
      isPaused = false;
    }
  }
}

function restartGame() {
  clearInterval(timer);
  timer = null;
  time = 0;
  document.getElementById('time').textContent = '0';
  document.getElementById('board').innerHTML = '';
}

function updateTimer() {
  time++;
  document.getElementById('time').textContent = time;
}

function generateBoard() {
  const board = document.getElementById('board');
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  numbers.push('');
  numbers.sort(() => Math.random() - 0.5);

  numbers.forEach((number) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = number === '' ? '' : number;
    board.appendChild(tile);
    tile.addEventListener('click', () => moveTile(tile));
  });
}

function moveTile(tile) {
  const tiles = Array.from(document.getElementsByClassName('tile'));
  const emptyTile = tiles.find((t) => t.textContent === '');
  if (isAdjacent(tile, emptyTile)) {
    const temp = tile.textContent;
    tile.textContent = '';
    emptyTile.textContent = temp;
    checkWin();
  }
}

function isAdjacent(tile1, tile2) {
  const index1 = Array.from(tile1.parentNode.children).indexOf(tile1);
  const index2 = Array.from(tile2.parentNode.children).indexOf(tile2);
  const diff = Math.abs(index1 - index2);
  return (diff === 1 && Math.floor(index1 / 4) === Math.floor(index2 / 4)) || (diff === 4);
}

function checkWin() {
  const tiles = Array.from(document.getElementsByClassName('tile'));
  const numbers = tiles.map((tile) => tile.textContent);
  if (numbers.slice(0, -1).every((number, index) => number === '' || parseInt(number) === index + 1)) {
    clearInterval(timer);
    timer = null;
    alert('Congratulations! You won!');
  }
}
