/**
 * Double Click & Single Click Listener Implementation
 *
 * Provides utilities to handle double clicks and optionally distinguish
 * between single and double clicks. Preserves `this` and passes the event.
 *
 * Features:
 * - Custom double click with configurable delay
 * - Optional single vs double click distinction
 * - Works for multiple elements independently
 */

// -------------------------------------------
// 1. Custom double click listener
// -------------------------------------------
function addDoubleClickListener(element, callback, delay = 300) {
  let clickTimer = null;

  element.addEventListener("click", function (event) {
    const context = this;

    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
      callback.apply(context, [event]); // ✅ second click detected
    } else {
      clickTimer = setTimeout(() => {
        clickTimer = null; // reset if no second click
      }, delay);
    }
  });
}

// -------------------------------------------
// 2. Single + Double Click listener
// -------------------------------------------
function addClickAndDoubleClickListener(
  element,
  doubleClickHandler,
  singleClickHandler,
  delay = 250
) {
  let clickTimer = null;

  element.addEventListener("click", function (event) {
    const context = this;

    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
      doubleClickHandler.apply(context, [event]); // ✅ double click
    } else {
      clickTimer = setTimeout(() => {
        singleClickHandler.apply(context, [event]); // ✅ single click
        clickTimer = null;
      }, delay);
    }
  });
}

// -------------------------------------------
// Example Usage
// -------------------------------------------

// Example 1: Double click only
const btn1 = document.getElementById("btn1");
addDoubleClickListener(
  btn1,
  function () {
    console.log("Button 1 double clicked!");
  },
  400
);

// Example 2: Single vs double click
const btn2 = document.getElementById("btn2");
addClickAndDoubleClickListener(
  btn2,
  function () {
    console.log("Button 2 double clicked!");
  },
  function () {
    console.log("Button 2 single clicked!");
  },
  300
);

//   ✅ Key Features / Interview Points
//   Preserves this — callbacks can reference the clicked element (this).
//   Independent timers per element — multiple buttons won’t interfere.
//   Customizable delay — you control what counts as a double click.
//   Single vs double click support — optional, useful for UIs like file explorers or galleries.
