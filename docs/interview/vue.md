---
layout: doc
title: Vue
---

# Vue about

## 路由模式 hash history

`hash`模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `onhashchange` 事件。

- hash 变化会触发网页跳转，即浏览器的前进和后退。
- hash 可以改变 url ，但是不会触发页面重新加载（hash 的改变是记录在 window.history 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 http 请求，所以这种模式不利于 SEO 优化。hash 只能修改 # 后面的部分，所以只能跳转到与当前 url 同文档的 url.
- hash 通过 window.onhashchange 的方式，来监听 hash 的改变，借此实现无刷新跳转的功能。

`history API` 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。

- 通过 `pushState` 、 `replaceState` 来实现无刷新跳转的功能。
- 使用 history 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 url ，就会出现 404 的页面。
- `hash` 模式虽然改变了 `url` 但并不包括在 http 请求中不影响服务端

#### 两者比较

- `to B` 的系统推荐用 hash ，相对简单且容易使用，且因为 hash 对 url 规范不敏感；
- `to C` 的系统，可以考虑选择 H5 history ，但是需要服务端支持；
