---
author: hh2o4_2
title: 如何定义一个方法，生成一个组件，并将其挂载到合适的位置
label: vue
updated: 2023-04-23 16:49:27 +0800
---

## 要解决的问题

这里要解决的问题是，如何像一些组件库提供的 api 一样（比如 this.$showAlert(options)），只要调用，就可以生成一个组件，并在界面中展示。

1. 生成组件

可以调用 new Vue()的方式生成一个 VNode。而 Vue.extend()方法，可以让这个 VNode 内容更丰富（比如完成一个特定模板的 VNode），所以生成组件，可以通过以下方式完成：

```js
// AlertComponent.vue

<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'alert',
    props: ['message'],
}
</script>
```

```js
// alert.js

import Alert from 'AlertComponent.vue'

const AlertConstructor = Vue.extend(Alert);

export function showAlert(options) {
    // 完成组件实例的创建
    const AlertComp = new AlertConstructor({
        el: document.createElement('div'),
        propsData: {
            message: options.message
        }
    })
    ...
}
```

2. 挂载组件到当前页面

思路是，获取 body 这个 DOM 元素，以及刚生成的组件的 DOM 元素引用，将后者通过 appendChild 的方式，引入到页面的 DOM 树中，完成组件的挂载。

```js
// alert.js

import Alert from 'AlertComponent.vue';

const AlertConstructor = Vue.extend(Alert);

export function showAlert(options) {
  // 完成组件实例的创建
  const AlertComp = new AlertConstructor({
    el: document.createElement('div'),
    propsData: {
      message: options.message,
    },
  });

  // 进行组件的挂载
  const container = document.querySelector('body'); // 不一定就是body，只要能获取到DOM元素引用即可
  const el = AlertComp.$el;

  container.appendChild(el);
}
```
