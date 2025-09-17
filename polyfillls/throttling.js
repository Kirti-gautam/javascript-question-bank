/**
 * Throttle Implementation in JavaScript
 *
 * Throttle ensures a function executes at most once
 * within a given interval, no matter how many times it’s triggered.
 *
 * Example use cases:
 * - Scroll/resize event listeners
 * - Button spamming prevention
 * - Limiting API calls
 */

// -------------------------------------------
// Throttle using setTimeout
// -------------------------------------------
function useThrottle(callback, delay) {
  let shouldWait = false;

  return function (...args) {
    const context = this;

    if (!shouldWait) {
      callback.apply(context, args);
      shouldWait = true;

      setTimeout(() => {
        shouldWait = false;
      }, delay);
    }
  };
}

// -------------------------------------------
// Example usage
// -------------------------------------------
const counter = {
  i: 0,
  increment() {
    this.i++;
    console.log("Throttled value of i:", this.i);
  },
};

// ✅ Bind to preserve `this`
const throttledIncrement = useThrottle(counter.increment.bind(counter), 2000);

// Call multiple times quickly
throttledIncrement();
throttledIncrement();
throttledIncrement();
// Only one increment happens immediately,
// the next one is allowed after 2 seconds
