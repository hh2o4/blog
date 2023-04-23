---
author: hh2o4_1
title: 记一次Async/Await使用过程中的思维误区
label: js
updated: 2022-03-03 00:00:00 +0800
---

对于一个 promise 对象，我们都可以用 async/await 语法糖将其回调操作写成同步的形式，但是使用过程中，陷入了一个误区，这里记录一下。

首先假设同一目录下有如下两个 js 文件：

```js
// asyncFunc.js
module.exports = function asyncFunc() {
  console.log('asyncFunc start');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.log('asyncFunc resolved');
    }, 0);
  });
};
```

```js
// main.js
const asyncFunc = require('./asyncFunc.js');

async function test() {
  console.log('test function start');
  await asyncFunc();
  console.log('test function end');
}

test();

console.log('end main');
```

一开始误以为期望的输出为：

```
test function start
asyncFunc start
asyncFunc resolved
test function end
end main
```

但发现实际输出为：

```
test function start
asyncFunc start
end main
asyncFunc resolved
test function end
```

这个误区在于，以为按照函数调用顺序，只要遇到 await，就会同步等待异步操作结果。但实际上，只有在同一个 async 函数中的语句，才会在执行到 await 时等待异步操作结果。

也就是说，在 test 函数中，`console.log('test function start');` -> `console.log('asyncFunc start');` -> `console.log('asyncFunc resolved');` -> `console.log('test function end');` 会按照顺序输出。

但是`console.log('end main');`并不在 test 函数里，所以会根据所有同步代码的执行顺序来输出。

由此获得一条 tip: 所有跟异步操作结果返回顺序相关的操作，最好都放到同一个 async 函数下。把`main.js`文件修改如下，就可以得到期望的输出了：

```js
// main.js

const asyncFunc = require('./asyncFunc.js');

async function test() {
  console.log('test function start');
  await asyncFunc();
  console.log('test function end');
}

async function main() {
  await test();
  console.log('end main');
}

main();
```

输出：

```
test function start
asyncFunc start
asyncFunc resolved
test function end
end main
```

### 引申对 promise.then 中回调函数执行时机的思考

考虑如下代码的输出内容：

```js
function asyncFunc() {
  console.log('asyncFunc start');
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        console.log('exec deep setTimeout');
      }, 0);
      resolve();
      console.log('asyncFunc resolved');
    }, 0);
  });
}

asyncFunc().then(() => {
  console.log('in asyncFunc then');
});
```

猜想，resolve 方法调用后，then 中的回调函数会被推入事件循环队列，排在`console.log('exec deep setTimeout');`之后，所以推测输出为：

```
asyncFunc start
asyncFunc resolved
exec deep setTimeout
in asyncFunc then
```

但实际上这个猜想是错的，程序运行的输出为（chrome & node）：

```
asyncFunc start
asyncFunc resolved
in asyncFunc then
exec deep setTimeout
```

所以还是要回到对 resolve 函数中如何处理 then 方法注册的事件的理解上。
