import { writable } from "svelte/store";

function createTimer() {
  const { subscribe, set } = writable(0);
  let interval;

  function reset() {
    clearInterval(interval);
    const start = new Date().getTime();

    interval = setInterval(() => {
      const secondsSinceStart = (new Date().getTime() - start) / 1000;
      set(Math.round(secondsSinceStart));
    }, 100);
  }

  reset();

  return {
    subscribe,
    stop: () => clearInterval(interval),
    reset,
  };
}

export const timer = createTimer();
