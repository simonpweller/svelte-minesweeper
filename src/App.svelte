<script>
  import Board from "./Board.svelte";
  export let name;
</script>

<main>
  <h1>Minesweeper</h1>
  <p>Sweep those mines</p>
  <Board />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
