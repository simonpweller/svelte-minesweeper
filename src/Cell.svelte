<script>
  import { createEventDispatcher } from "svelte";
  import Flag from "./Flag.svelte";
  import Bomb from "./Bomb.svelte";

  export let cell;
  const dispatch = createEventDispatcher();
</script>

<div
  class={`cell ${!cell.covered && !cell.bomb && cell.bombCount && `bombs bombs-${cell.bombCount}`}`}
  class:covered={cell.covered}
  on:click={() => (cell.covered ? dispatch('reveal') : dispatch('chord'))}
  on:contextmenu={(e) => {
    dispatch('toggle-flag');
    e.preventDefault();
  }}>
  {#if !cell.covered && !cell.bomb && cell.bombCount}{cell.bombCount}{/if}
  {#if cell.flagged}
    <Flag />
  {/if}
  {#if !cell.covered && cell.bomb}
    <Bomb />
  {/if}
</div>

<style>
  .cell {
    height: 30px;
    width: 30px;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: monospace;
    font-size: 20px;

    background: #c0c0c0;
    border: 1px solid #a3a3a3;

    cursor: default;
  }

  .bombs {
    user-select: none;
  }

  .bombs-1 {
    color: #0000ff;
  }

  .bombs-2 {
    color: #007b00;
  }

  .bombs-3 {
    color: #ff0000;
  }

  .bombs-4 {
    color: #00007b;
  }

  .bombs-5 {
    color: #7b0000;
  }

  .bombs-6 {
    color: #007b7b;
  }

  .bombs-7 {
    color: #000000;
  }

  .bombs-8 {
    color: #7b7b7b;
  }

  .covered {
    background: #c7bfc7;
    border: 3px solid #ffffff;
    border-right-color: #877f87;
    border-bottom-color: #877f87;
  }
</style>
