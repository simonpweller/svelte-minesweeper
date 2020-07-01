<div class="wrapper">
  <div class="bomb">
    <div class="pin-1" />
    <div class="pin-2" />
    <div class="pin-3" />
    <div class="pin-4" />
    <div class="pin-5" />
    <div class="pin-6" />
    <div class="pin-7" />
    <div class="pin-8" />
    <div class="shine" />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bomb {
    width: 16px;
    height: 16px;
    background: black;
    border-radius: 50%;
    position: relative;
  }

  .pin-1,
  .pin-2,
  .pin-3,
  .pin-4,
  .pin-5,
  .pin-6,
  .pin-7,
  .pin-8 {
    width: 2px;
    height: 4px;
    position: absolute;
    background: black;
  }

  .pin-1 {
    top: 6px;
    left: -2px;
    transform: rotate(90deg);
  }

  .pin-2 {
    top: 0;
    left: 0;
    transform: rotate(-45deg);
  }

  .pin-3 {
    top: -3px;
    left: 7px;
  }

  .pin-4 {
    top: 0;
    right: 0;
    transform: rotate(45deg);
  }

  .pin-5 {
    top: 6px;
    right: -2px;
    transform: rotate(90deg);
  }

  .pin-6 {
    right: 0;
    bottom: 0;
    transform: rotate(-45deg);
  }

  .pin-7 {
    left: 7px;
    bottom: -3px;
  }

  .pin-8 {
    left: 0;
    bottom: 0;
    transform: rotate(45deg);
  }

  .shine {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, white 0%, white 20%, black 70%);
    top: 3px;
    left: 3px;
  }
</style>
