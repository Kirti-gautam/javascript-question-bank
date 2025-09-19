# 📘 Interview Questions: Shallow vs Deep Copy

## 🔹 Basic Concept Check

**Q:** What is the difference between shallow copy and deep copy in JavaScript? Can you give an example of each?

**Answer:**

- Shallow copy copies only the **top-level properties**; nested objects are shared by reference.
- Deep copy makes a **fully independent copy**, including nested objects.

```js
const obj = { name: "Kirti", address: { city: "Delhi" } };

// Shallow copy
const shallow = { ...obj };
shallow.address.city = "Mumbai";
console.log(obj.address.city); // "Mumbai" ❌ also updated

// Deep copy
const deep = structuredClone(obj);
deep.address.city = "Bangalore";
console.log(obj.address.city); // "Mumbai" ✅ unaffected
```

## 🔹 **Object References**

**Q:** Suppose you copy an object using `Object.assign()`. If the object has nested objects, what happens when you modify a nested property in the copied object?

**Answer:**  
The original object will also update because `Object.assign()` makes a **shallow copy**.

```javascript
const original = { user: { name: "Kirti" } };
const copy = Object.assign({}, original);

copy.user.name = "Sharma";
console.log(original.user.name); // "Sharma" ❌ original changed
```

## 🔹 **Primitives vs Objects**

**Q:** Do shallow copy and deep copy behave the same way for primitive values? Why or why not?

**Answer:**  
Yes ✅, because **primitives** (numbers, strings, booleans) are copied by **value**, not by reference.

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 ✅ unchanged
```

🔹 **Array Example**

**Q:** If you create a shallow copy of an array using `slice()`, and the array contains objects, what happens when you update a property inside one of those objects?

**Answer:**  
The original array’s object will also update, because the **objects inside are still references**.

```javascript
const arr = [{ city: "Delhi" }, { city: "Mumbai" }];
const shallowArr = arr.slice();

shallowArr[0].city = "Bangalore";
console.log(arr[0].city); // "Bangalore" ❌ updated
```

## 🔹 **Real-Life Scenario**

**Q:** Can you describe a situation in a React project where using a shallow copy might cause bugs? How would you fix it with a deep copy?

**Answer:**  
In React state updates, if you shallow copy state with nested objects, modifying nested properties **mutates the original state**, causing bugs.

**Fix:** Use deep copy (`structuredClone`, libraries like `lodash.cloneDeep`).

```javascript
// ❌ Buggy (mutates state)
setState((prev) => {
  const shallow = { ...prev };
  shallow.user.address.city = "Mumbai"; // mutates original
  return shallow;
});

// ✅ Correct (deep copy)
setState((prev) => {
  const deep = structuredClone(prev);
  deep.user.address.city = "Mumbai";
  return deep;
});
```

## 🔹 **Implementation**

**Q:** How would you create a deep copy in JavaScript without external libraries? What are the drawbacks of using JSON.parse(JSON.stringify(obj))?

**Answer:**  
Simple way:

```javascript
const deep = JSON.parse(JSON.stringify(obj));
```

Drawbacks:

Loses functions, undefined, Symbol.
Can’t handle circular references.

```javascript
//Example:

const obj = { name: "Kirti", date: new Date(), greet: () => "Hi" };
const deep = JSON.parse(JSON.stringify(obj));

console.log(deep.date); // string, not Date ❌
console.log(deep.greet); // undefined ❌
```

## 🔹 **Advanced**

**Q:** What is the difference between `structuredClone()` and JSON-based deep copy? Why might you prefer one?

**Answer:**

- `structuredClone()` is a modern deep copy built into JS.
- Supports more types: `Date`, `Map`, `Set`, `RegExp`, `Blob`, `File`, etc.
- Handles circular references.

JSON-based copy is limited and **loses special types**.

```javascript
const obj = { date: new Date(), map: new Map([["a", 1]]) };
const clone = structuredClone(obj);

console.log(clone.date instanceof Date); // true ✅
console.log(clone.map.get("a")); // 1 ✅
```

## Immutable Data in React / Redux

**Q:** You’re using Redux, and you accidentally mutate a nested object in the state. How can shallow copy make it worse? How would you prevent it?

**Answer:**

Shallow copy copies only top-level references. Nested mutation still affects the original state.

Use `structuredClone` or libraries like **Immer** to handle deep immutable updates.

```javascript
const state = { user: { name: "Kirti" } };
const newState = { ...state };
newState.user.name = "Sharma"; // mutates original state
```

## 🔹 Drawbacks of JSON-based Deep Copy

**Serialization Explained**

Serialization is the process of converting a data structure or object into a string format so that it can be stored, transmitted, or recreated later.

Think of it as “flattening” your object into text.

The serialized form is just a string; it no longer keeps things like functions, prototypes, or complex object types.

**Why We Serialize**

Storage: Save objects to a file or database.

Transmission: Send objects over a network (e.g., API requests).

Copying: Used in JSON.parse(JSON.stringify(obj)) for deep copying simple objects.
