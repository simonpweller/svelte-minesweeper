<script>
  import generate from "./generate";
  import Cell from "./Cell.svelte";
  let rows = generate();

  function reveal(cell) {
    if (!cell.covered) return;
    rows[cell.rowIndex][cell.colIndex].covered = false;
    if (cell.bombCount === 0) {
      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        if (!rows[cell.rowIndex + rowOffset]) continue;
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          const neighbour =
            rows[cell.rowIndex + rowOffset][cell.colIndex + colOffset];
          if (neighbour) {
            reveal(neighbour);
          }
        }
      }
    }
  }
</script>

<main>
  <h1>Minesweeper</h1>
  <p>Sweep those mines</p>
  <div class="board">
    {#each rows as row}
      <div class="row">
        {#each row as cell}
          <Cell {cell} on:reveal={() => reveal(cell)} />
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
