<script>
  import generate from "./generate";
  import Cell from "./Cell.svelte";
  let rows = generate();

  function reveal(event) {
    const { cell } = event.detail;
    rows[cell.rowIndex][cell.colIndex].isOpen = true;
  }
</script>

<main>
  <h1>Minesweeper</h1>
  <p>Sweep those mines</p>
  <div class="board">
    {#each rows as row}
      <div class="row">
        {#each row as cell}
          <Cell {cell} on:reveal={reveal} />
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
