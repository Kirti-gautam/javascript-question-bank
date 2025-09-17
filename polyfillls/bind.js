// Polyfill for Function.prototype.bind

/*
  bind() is a method on Function.prototype.

  ✔ It creates a new function with 'this' permanently set to the provided value (thisArg).
  ✔ Unlike call() or apply(), bind() does not invoke the function immediately.
  ✔ Instead, it returns a new function that you can call later.
  ✔ Supports partial application (pre-setting some arguments).
*/

Function.prototype.myBind = function (context, ...args) {
  const func = this; // the original function
  return function (...args1) {
    // ⭐ Unlike call/apply, bind does not immediately execute
    // It returns a new function with 'this' bound to the given context
    func.apply(context, [...args, ...args1]);
  };
};

// Example usage
const obj1 = { firstName: "Kirti" };

function printName(lastName, message) {
  console.log("Hello,", this.firstName, lastName, message);
}

const boundFn = printName.myBind(obj1, "Gautam");
boundFn(".How are you ?"); // Hello, Kirti Sharma
