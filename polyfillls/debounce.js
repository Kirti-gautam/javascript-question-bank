/**
 * Debounce Implementation in JavaScript
 *
 * Debounce ensures a function is executed only after
 * the user stops triggering it for a given delay.
 *
 * Example use cases:
 * - Search input (wait until user stops typing)
 * - Resize/scroll events (avoid flooding handlers)
 * - Button clicks (prevent double submission)
 */

// -------------------------------------------
// Example counter object
// -------------------------------------------
const counter = {
  i: 0,
  increment: function () {
    this.i++;
    console.log("Updated value of i:", this.i);
  },
};

// -------------------------------------------
// Debounce implementation
// -------------------------------------------
function useDebounce(callback, wait) {
  let timer;

  return function (...args) {
    const context = this; // preserve `this`
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args); // preserve arguments + context
    }, wait);
  };
}

// -------------------------------------------
// Usage
// -------------------------------------------

// ⚠️ If we pass `counter.increment` directly, `this` will be lost
// -> In strict mode: `this` = undefined
// -> In non-strict mode: `this` = window/global
// ✅ Solution: bind the method to the object
const debouncedIncrement = useDebounce(counter.increment.bind(counter), 2000);

debouncedIncrement();
debouncedIncrement();
// Only one increment after 2s
