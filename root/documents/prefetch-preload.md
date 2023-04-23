---
title: <link rel="prefetch" href="xxx">是什么作用， 和rel="preload"有什么区别？
author: hh2o4_3
label: html
updated: 2023-04-23 16:49:27 +0800
---

### 相关前提

1. rel 指定的是链接类型，是`<a>` `<area>` `<link>`元素的属性。链接类型的可用取值详见 [MDN 链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)

2. `<link rel="prefetch">` 是链接预取机制，利用浏览器空闲是按来下载或预取用户在不久的将来可能访问的文档，存储在其缓存中，待用户访问预取文档之一时，可以从浏览器缓存中快速提供（[点击查看详细概念](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)）。

3. `<link rel="preload">` 是预加载，用来指定页面很快要用到的资源，会在浏览器渲染机制启动之前开始加载这些资源，让这些资源能更早可用，降低阻止页面渲染的风险，从而提高性能（[点击查看详细概念](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)）。

### 总结区别

`<link rel="prefetch">`是标记需要预先加载的资源，这些资源在当前页面完成加载后，浏览器空闲时进行加载，而这些资源并不是当前页面立即要用到的。

`<link rel="preload">` 是在当前页生命周期的早期就开始下载，以期待在页面加载过程中能尽快用到对应资源。
