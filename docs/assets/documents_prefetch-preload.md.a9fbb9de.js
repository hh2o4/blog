import{_ as e,c as t,o as r,V as o}from"./chunks/framework.668e4b97.js";const u=JSON.parse('{"title":"是什么作用， 和rel=\\"preload\\"有什么区别？","description":"","frontmatter":{"title":"<link rel=\\"prefetch\\" href=\\"xxx\\">是什么作用， 和rel=\\"preload\\"有什么区别？","author":"hh2o4_3","label":"html","updated":"2023-04-23 16:49:27 +0800"},"headers":[],"relativePath":"documents/prefetch-preload.md","lastUpdated":1682239767000}'),a={name:"documents/prefetch-preload.md"},l=o('<h3 id="相关前提" tabindex="-1">相关前提 <a class="header-anchor" href="#相关前提" aria-label="Permalink to &quot;相关前提&quot;">​</a></h3><ol><li><p>rel 指定的是链接类型，是<code>&lt;a&gt;</code> <code>&lt;area&gt;</code> <code>&lt;link&gt;</code>元素的属性。链接类型的可用取值详见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types" target="_blank" rel="noreferrer">MDN 链接类型</a></p></li><li><p><code>&lt;link rel=&quot;prefetch&quot;&gt;</code> 是链接预取机制，利用浏览器空闲是按来下载或预取用户在不久的将来可能访问的文档，存储在其缓存中，待用户访问预取文档之一时，可以从浏览器缓存中快速提供（<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ" target="_blank" rel="noreferrer">点击查看详细概念</a>）。</p></li><li><p><code>&lt;link rel=&quot;preload&quot;&gt;</code> 是预加载，用来指定页面很快要用到的资源，会在浏览器渲染机制启动之前开始加载这些资源，让这些资源能更早可用，降低阻止页面渲染的风险，从而提高性能（<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload" target="_blank" rel="noreferrer">点击查看详细概念</a>）。</p></li></ol><h3 id="总结区别" tabindex="-1">总结区别 <a class="header-anchor" href="#总结区别" aria-label="Permalink to &quot;总结区别&quot;">​</a></h3><p><code>&lt;link rel=&quot;prefetch&quot;&gt;</code>是标记需要预先加载的资源，这些资源在当前页面完成加载后，浏览器空闲时进行加载，而这些资源并不是当前页面立即要用到的。</p><p><code>&lt;link rel=&quot;preload&quot;&gt;</code> 是在当前页生命周期的早期就开始下载，以期待在页面加载过程中能尽快用到对应资源。</p>',5),d=[l];function c(p,n,i,s,_,h){return r(),t("div",null,d)}const k=e(a,[["render",c]]);export{u as __pageData,k as default};