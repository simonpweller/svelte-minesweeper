<script>
  import generate from "./generate";
  const rows = generate();
</script>

<main>
  <h1>Minesweeper</h1>
  <p>Sweep those mines</p>
  <div class="board">
    {#each rows as row}
      <div class="row">
        {#each row as cell}
          <div class="cell" class:bomb={cell.isBomb}>
            {#if !cell.isBomb && cell.bombCount}{cell.bombCount}{/if}
          </div>
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

  .row {
    display: flex;
  }

  .cell {
    height: 30px;
    width: 30px;
    background: #c7bfc7;
    border: 3px solid #ffffff;
    border-right-color: #877f87;
    border-bottom-color: #877f87;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bomb {
    background-image: url("/mine.png");
    background-size: contain;
  }
</style>
