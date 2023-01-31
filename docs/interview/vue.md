---
layout: doc
title: Vue
---

# VUE 相关基础

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

## 简述 Vue 的生命周期

- beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到 data、computed、watch、methods 上的方法和数据。
- created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。
- beforeMount（挂载前） ：在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成以下的配置：编译模板，把 data 里面的数据和模板生成 html。此时还没有挂载 html 到页面上。
- mounted（挂载后） ：在 el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的 html 内容替换 el 属性指向的 DOM 对象。完成模板中的 html 渲染到 html 页面中。此过程中进行 ajax 交互。
- beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。
- updated（更新后）：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- beforeDestroy（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
- destroyed（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。
  另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `activated` 钩子函数。

#### 加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

#### 子组件更新过程

父 beforeUpdate -> 子 beforeUpdate -> 子 updaed -> 父 updated

#### 销毁过程

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed ->父 destroyed

## Vue2 computed 和 watch 的区别和运用的场景

- 功能上：computed 是计算属性，watch 是监听一个值的变化，然后执行对应的回调。
- 是否调用缓存：computed 中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而 watch 在每次监听的值发生变化的时候都会执行回调。
- 是否调用 return：computed 中的函数必须要用 return 返回，watch 中的函数不是必须要用 return
- computed 默认第一次加载的时候就开始监听；watch 默认第一次加载不做监听，如果需要第一次加载做监听，添加 immediate 属性，设置为 true（immediate:true）
- 使用场景：computed----当一个属性受多个属性影响的时候，使用 computed-----用户名展示、列表展示、购物车商品结算。watch–当一条数据影响多条数据的时候，使用 watch-----搜索框
