<script>
  import generate from "./generate";
  import Cell from "./Cell.svelte";
  let rows = generate();

  function reveal(cell) {
    if (!cell.covered || cell.flagged) return;
    rows[cell.rowIndex][cell.colIndex].covered = false;
    if (cell.bombCount === 0) {
      getNeighbours(cell).forEach(reveal);
    }
  }

  function toggleFlag(cell) {
    if (!cell.covered) return;
    rows[cell.rowIndex][cell.colIndex].flagged = !rows[cell.rowIndex][
      cell.colIndex
    ].flagged;
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
  <p>Sweep those mines</p>
  <div class="board">
    {#each rows as row}
      <div class="row">
        {#each row as cell}
          <Cell
            {cell}
            on:reveal={() => reveal(cell)}
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
