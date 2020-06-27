<script>
  import { createEventDispatcher } from "svelte";

  export let cell;
  const dispatch = createEventDispatcher();
</script>

<div
  class="cell"
  class:covered={cell.covered}
  class:bomb={cell.isBomb}
  class:flagged={cell.flagged}
  on:click={() => dispatch('reveal')}
  on:contextmenu={(e) => {
    dispatch('toggle-flag');
    e.preventDefault();
  }}>
  {#if !cell.covered && cell.bombCount}{cell.bombCount}{/if}
</div>

<style>
  .cell {
    height: 30px;
    width: 30px;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #c0c0c0;
    border: 1px solid #a3a3a3;

    cursor: default;
  }

  .bomb {
    background-image: url("/mine.png");
    background-size: contain;
  }

  .covered {
    background: #c7bfc7;
    border: 3px solid #ffffff;
    border-right-color: #877f87;
    border-bottom-color: #877f87;
  }

  .flagged {
    background-image: url("/flag.svg");
  }
</style>
