// apply() is a built-in JavaScript method that allows you to call a function with an explicit this value,
// and pass arguments as an array(or array - like object).

Function.prototype.myApply = function (context, args) {
  if (context === null || context === undefined) {
    context = globalThis;
  }
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// Example usage
const obj1 = { firstName: "Kirti" };

function printName(lastName) {
  console.log("Hello,", this.firstName, lastName);
}

printName.myApply(obj1, ["Gautam"]); // Hello, Kirti Sharma
printName.myApply(null, ["Gupta"]); // Works → Hello, undefined Gupta (this = globalThis)
