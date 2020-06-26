<script>
  import { createEventDispatcher } from "svelte";

  export let cell;
  const dispatch = createEventDispatcher();
</script>

{#if cell.isOpen}
  <div class="cell open" class:bomb={cell.isBomb}>
    {#if cell.bombCount}{cell.bombCount}{/if}
  </div>
{:else}
  <div class="cell closed" on:click={() => dispatch('reveal', { cell })} />
{/if}

<style>
  .cell {
    height: 30px;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closed {
    background: #c7bfc7;
    border: 3px solid #ffffff;
    border-right-color: #877f87;
    border-bottom-color: #877f87;
  }

  .open {
    background: #c0c0c0;
    border: 1px solid #a3a3a3;
  }

  .bomb {
    background-image: url("/mine.png");
    background-size: contain;
  }
</style>
