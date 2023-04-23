---
author: hh2o4_4
title: 关于对象遍历的一些常见方法以及对比
label: js
updated: 2023-04-23 16:49:27 +0800
---

### for...of...遍历**可迭代对象**

```js
const obj = [1, 2, 3, 4];

for (let value of obj) {
  console.log(value);
}

// output:
// 1
// 2
// 3
// 4
```

```js
const obj = {
  a: 1,
  b: 2,
};

for (let value of obj) {
  console.log(value);
}

// 报错，obj不是一个可迭代对象
// Uncaught TypeError: obj is not iterable
//    at <anonymous>:6:20
```

### for...in...遍历对象上的可枚举属性

不保证按属性创建顺序遍历，遍历顺序：先遍历出整数属性（integer properties，按照升序），然后其他属性按照创建时候的顺序遍历出来（Object.keys 也是这个顺序，视浏览器实现而定，新标准都是遵循这个排序原则）

```js
const obj = {
  a21f: 1,
  a12g: 2,
  1: 1,
  1.2: 1.2,
};

for (let key in obj) {
  console.log(key);
}

// 1
// a21f
// a12g
// 1.2
```

会遍历到原型链上的**所有可枚举属性**

```js
const obj = {
  a: 1,
  b: 2,
};

const objChild = Object.create(obj);

for (let key in objChild) {
  console.log(key);
}

// output:
// a
// b
```

### Object.keys 方法遍历对象**自身可枚举属性**

不会遍历到对象原型链上的属性

返回一个属性 key 的数组，方便调用数组方法。

```js
const obj = {
  a: 1,
  b: 2,
};

const objChild = Object.create(obj);

console.log(Object.keys(objChild));

// []
```

```js
const obj = {
  a21f: 1,
  a12g: 2,
  1: 1,
  1.2: 1.2,
};

console.log(Object.keys(obj));

// ['1', 'a21f', 'a12g', '1.2']
```
