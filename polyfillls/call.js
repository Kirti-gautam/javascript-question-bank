// call() is a built-in JavaScript method of Function.prototype.
// It allows you to invoke a function immediately, while explicitly specifying the value of this inside that function.
// Arguments are passed individually (comma-separated).

// Polyfill for Function.prototype.call
Function.prototype.myCall = function (context = {}, ...args) {
  // ⭐ In non–strict mode, if context is null/undefined:
  //    - Browser → window
  //    - Node.js → global
  //    - Unified standard → globalThis
  // So we mimic that behavior here:
  if (context === null || context === undefined) {
    context = globalThis;
  }

  // Create a unique property on the context to avoid overwriting existing keys
  const fnSymbol = Symbol();

  // 'this' is the function being called
  context[fnSymbol] = this;

  // Execute the function with spread args
  const result = context[fnSymbol](...args);

  // Clean up
  delete context[fnSymbol];

  return result;
};

// Example usage
const obj1 = { firstName: "Kirti" };

function printName(lastName) {
  console.log("Hello,", this.firstName, lastName);
}

printName.myCall(obj1, "Gautam"); // Hello, Kirti Sharma
printName.myCall(null, "Gupta"); // Works → Hello, undefined Gupta (this = globalThis)
