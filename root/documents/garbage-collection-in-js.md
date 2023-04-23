---
author: hh2o4_4
title: Some surprising behavior of garbage collection in JS
label: js
updated: 2023-04-03 00:00:00 +0800
---

### Reviewing the garbage collection mechanism of JavaScript

#### [Reference-counting garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#reference-counting_garbage_collection) (Python\Ruby prior to 2.0\Perl\Swift\Objective-C)

> Note: no modern browser uses reference counting for garbage collection anymore.

##### Summary

1. Each object in memory is associated with a reference count that keeps track of how many references point to that object.
2. The reference count is updated accordingly whenever a reference to an object is created or destroyed.
3. When the reference count of an object reaches zero, the object can be safely deleted and its memory can be reclaimed.

##### Advantages

1. Simple and efficient
2. Can provide deterministic memory management, meaning that memory is released immediately when it is no longer needed.

##### Disadvantages

1.  Can lead to memory leaks when dealing with cyclic references.

```js
function f() {
  const x = {};
  const y = {};
  x.a = y; // x references y
  y.a = x; // y references x

  return 'azerty';
}

f();

// memory of x and y can not be released
```

[Mark-and-sweep algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#mark-and-sweep_algorithm) (JavaScript\Ruby 2.0 and later\Lua\Lisp)

##### Summary

1. Marking phase, the algorithm traverses all objects in the heap and marks them as either reachable or unreachable.
   1.1 starting from a set of root objects (e.g., global variables, stack frames), and recursively following all references to other objects.
   1.2 marks all objects that are reachable from the roots as alive and leaves all other objects as unmarked.
2. Sweeping phase
   2.1 frees up all unmarked objects by adding them to the **free list** for later use.
   `The free list is a data structure used by memory managers to keep track of the memory blocks that have been deallocated and are available for reuse.`

##### Advantages

1. Being able to handle circular references

consider this example, x, y is not reachable from root, so they will be marked and sweeped.

![image](https://user-images.githubusercontent.com/20169617/229758508-1f65aad6-97a3-4a35-a508-98ea3d6f17b7.png)

##### Disadvantages

1. Requires a significant amount of memory to maintain the mark bits
2. Can cause performance issues during the sweep phase when there is a large amount of garbage.

##### Tips to overcome disadvantages

1. Minimize memory usage: by using efficient data structures and algorithms that avoid unnecessary object allocations.
2. Avoid creating unnecessary objects: such as temporary objects that are used only once and discarded.
3. Use object pooling: creating a pool of reusable objects that can be recycled rather than being constantly allocated and deallocated.**(particle example)**
4. Use the latest version of the JavaScript engine: the performance of the garbage collector can vary between different versions of the JavaScript engine, so it is essential to use the latest version of the JavaScript engine to take advantage of any performance improvements.
5. Use manual memory management: While manual memory management is not recommended in most cases, it can be useful in performance-critical code sections, such as game loops or graphics rendering.

### Experiments of JavaScript Garbage Collector

#### Using `FinalizationRegistry` to track collection of variable

```js
const registry = new FinalizationRegistry((message) => console.log(message));

function example() {
  const x = {};
  registry.register(x, 'x has been collected');
}

example();

// Some time later: "x has been collected"
```

![image](https://user-images.githubusercontent.com/20169617/229758639-c55bef85-b4ea-4e12-a3bf-72bdd3bfe92f.png)

#### Experiment 1: Nested Objects

```js
const registry = new FinalizationRegistry((message) => console.log(message));

function example() {
  const x = {};
  const y = {};
  const z = { x, y };

  registry.register(x, 'x has been collected');
  registry.register(y, 'y has been collected');
  registry.register(z, 'z has been collected');

  globalThis.temp = x;
}

example();
```

<details><summary>Output after gc</summary>

```
z has been collected
y has been collected
```

</details>

And if run `global.temp = undefined`, then call gc, then `x` will be successfully collected.
![image](https://user-images.githubusercontent.com/20169617/229758757-1713ba67-f22a-41af-92dd-a7e01a3c34f5.png)

#### Experiment 2: Closures

```js
const registry = new FinalizationRegistry((message) => console.log(message));

function example() {
  const x = {};
  const y = {};
  const z = { x, y };

  registry.register(x, 'x has been collected');
  registry.register(y, 'y has been collected');
  registry.register(z, 'z has been collected');

  globalThis.temp = () => z.x;
}

example();
```

<details><summary>Output after gc</summary>

```
no output, x, y, z will not be collected
```

</details>

#### Experiment 3: Direct Eval

```js
const registry = new FinalizationRegistry((message) => console.log(message));

function example() {
  const x = {};

  registry.register(x, 'x has been collected');

  globalThis.temp = (string) => eval(string);
}

example();
```

<details><summary>Output after gc</summary>

```
no output, x will not be collected
```

</details>

##### Experiment 4: DOM Elements

```js
const registry = new FinalizationRegistry((message) => console.log(message));

function example() {
  const x = document.createElement('div');
  const y = document.createElement('div');
  const z = document.createElement('div');

  z.append(x);
  z.append(y);

  registry.register(x, 'x has been collected');
  registry.register(y, 'y has been collected');
  registry.register(z, 'z has been collected');

  globalThis.temp = x;
}

example();
```

<details><summary>Output after gc</summary>

```
no output, x, y, z will not be collected
```

Unlike plain objects, DOM elements have links to their parents and siblings. You can reach z through temp.parentElement, and y through temp.nextSibling. So all three elements will stay alive.

But if you execute `temp.remove()`, y and z will be collected, because x has been detached from its parent, and has no siblings as well.
![image](https://user-images.githubusercontent.com/20169617/229758903-150f338b-d4c5-480f-8507-510425a6e910.png)

</details>

ref: [Experiments with the JavaScript Garbage Collector](https://dev.to/codux/experiments-with-the-javascript-garbage-collector-2ae3)
