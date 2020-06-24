<script>
  const createRow = () => Array.from({ length: 9 }, () => 0);
  let rows = Array.from({ length: 9 }, createRow);
  console.log(rows);
</script>

<div class="board">
  {#each rows as row}
    <div class="row">
      {#each row as cell}
        <div class="cell" />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }

  .cell {
    height: 30px;
    width: 30px;
    background: antiquewhite;
    border: 2px solid cadetblue;
  }
</style>
