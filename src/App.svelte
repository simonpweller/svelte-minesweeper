<script>
  import generate from "./generate";
  import Cell from "./Cell.svelte";
  let rows = generate();
  let gameState = "playing";

  function reveal(cell) {
    if (gameState !== "playing" || !cell.covered || cell.flagged) return;
    rows[cell.rowIndex][cell.colIndex].covered = false;
    rows[cell.rowIndex][cell.colIndex].flagged = false;
    if (cell.bombCount === 0) {
      getNeighbours(cell).forEach(reveal);
    }
    updateGameState(cell);
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
    rows[cell.rowIndex][cell.colIndex].flagged = !rows[cell.rowIndex][
      cell.colIndex
    ].flagged;
    window.navigator.vibrate(50);
  }

  function updateGameState() {
    gameState = getGameState();
  }

  function getGameState() {
    let coveredCells = 0;
    let bombs = 0;
    for (const row of rows) {
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
            (rows[cell.rowIndex + rowOffset] || [])[cell.colIndex + colOffset]
        )
      )
      .filter(Boolean);
  }
</script>

<main>
  <h1>Minesweeper</h1>
  {#if gameState === 'playing'}
    <p>Sweep those mines</p>
  {:else if gameState === 'won'}
    <p>You won!</p>
  {:else if gameState === 'lost'}
    <p>You lost!</p>
  {/if}

  <div class="board">
    {#each rows as row}
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
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .board {
    border: 5px solid #a3a3a3;
  }

  .row {
    display: flex;
  }
</style>
