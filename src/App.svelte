<script>
  import generate from "./generate";
  import { timer } from "./stores";
  import Cell from "./Cell.svelte";
  let board = generate();
  let bombs = 9;
  let gameState = "playing";

  $: if (gameState !== "playing") timer.stop();
  $: flags = board.reduce(
    (count, row) => count + row.filter((cell) => cell.flagged).length,
    0
  );
  $: flagsLeft = bombs - flags;

  function reveal(cell) {
    if (gameState !== "playing" || !cell.covered || cell.flagged) return;
    board[cell.rowIndex][cell.colIndex].covered = false;
    board[cell.rowIndex][cell.colIndex].flagged = false;
    if (cell.bombCount === 0) {
      getNeighbours(cell).forEach(reveal);
    }
    gameState = getGameState();
  }

  function chord(cell) {
    if (gameState !== "playing" || cell.flagged) return;
    const neighbours = getNeighbours(cell);
    if (cell.bombCount === neighbours.filter((cell) => cell.flagged).length) {
      neighbours.forEach(reveal);
    }
  }

  function toggleFlag(cell) {
    if (gameState !== "playing") return;
    if (!cell.covered) return;
    board[cell.rowIndex][cell.colIndex].flagged = !board[cell.rowIndex][
      cell.colIndex
    ].flagged;
    window.navigator.vibrate(50);
  }

  function getGameState() {
    let coveredCells = 0;
    let bombs = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell.bomb && !cell.covered) return "lost";
        if (cell.covered) coveredCells++;
        if (cell.bomb) bombs++;
      }
    }
    return coveredCells === bombs ? "won" : "playing";
  }

  function getNeighbours(cell) {
    return [-1, 0, 1]
      .flatMap((rowOffset) =>
        [-1, 0, 1].map(
          (colOffset) =>
            (board[cell.rowIndex + rowOffset] || [])[cell.colIndex + colOffset]
        )
      )
      .filter(Boolean);
  }

  function startGame(difficulty) {
    gameState = "playing";
    timer.reset();
    switch (difficulty) {
      case "beginner":
        board = generate(9, 9, 9);
        bombs = 9;
        break;
      case "intermediate":
        board = generate(16, 16, 40);
        bombs = 40;
        break;
      case "expert":
        board = generate(16, 30, 99);
        bombs = 99;
        break;
    }
  }
</script>

<main>
  <h1>Minesweeper</h1>
  <p class="game-state">
    {#if gameState === 'playing'}
      <span class="timer">Timer: {$timer}</span>
      <span>{flagsLeft} flags left</span>
    {:else if gameState === 'won'}
      <span>You won in {$timer} seconds!</span>
    {:else if gameState === 'lost'}
      <span>You lost after {$timer} seconds!</span>
    {/if}
  </p>

  <div class="difficulty">
    <button on:click={() => startGame('beginner')}>Beginner</button>
    <button on:click={() => startGame('intermediate')}>Intermediate</button>
    <button on:click={() => startGame('expert')}>Expert</button>
  </div>
  <div class="board-wrapper">
    <div class="board">
      {#each board as row}
        <div class="row">
          {#each row as cell}
            <Cell
              {cell}
              on:reveal={() => reveal(cell)}
              on:chord={() => chord(cell)}
              on:toggle-flag={() => toggleFlag(cell)} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-state {
    display: flex;
  }

  .timer {
    margin-right: 10px;
  }

  .difficulty button {
    cursor: pointer;
  }

  .board-wrapper {
    margin: auto;
  }

  .board {
    border: 5px solid #a3a3a3;
  }

  .row {
    display: flex;
  }
</style>
