<div class="flag">
  <div class="banner" />
  <div class="pole" />
  <div class="base base-2" />
  <div class="base base-1" />
</div>

<style>
  .flag {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
  }

  .banner {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid red;
    border-bottom: 5px solid transparent;
    left: 5px;
  }

  .pole {
    margin-top: 3px;
    margin-left: 2px;
    height: 11px;
    width: 4px;
    background-color: black;
  }

  .base {
    background-color: black;
    border-radius: 15% 15% 0 0;
  }

  .base-2 {
    width: 10px;
    height: 3px;
  }

  .base-1 {
    width: 20px;
    height: 4px;
  }
</style>
