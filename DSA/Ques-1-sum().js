// Namaster dev - https://namastedev.com/practice/sum

//Design a function sum that can take any number of arguments and return their total. The function should work for both fixed and variable number of arguments using JavaScript features. Only numerical arguments will be provided.

function sum(...args) {
  // Your implementation
  const arg = args;
  const total = arg.reduce((curr, acc) => {
    const current = Number(curr);
    acc = current + acc;
    return acc;
  }, 0);
  return total;
}

//For the purpose of user debugging.

module.exports = sum;

/**
 Learning - 
    1. How to use reduce function?
    2. How to use rest operator inside fucntion? - Here we can use args as an array.
  **/
