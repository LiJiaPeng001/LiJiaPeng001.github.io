---
layout: doc
title: Vue
---

# VUE 相关基础

## 编译器原理

## vue2 与 vue3 区别

- vue2 依赖 Object.defineProperty 实现，只能监听指定对象的指定属性的 getter 和 setter 行为，比如声明对象 person 增加了一个新的属性就会失去响应式，Vue 提供$set 来增加响应式
- vue3 引入反射和代理的概念，反射是 Reflect 代理是指 Proxy，利用 Proxy 直接代理一个普通对象，这个过程在 vue3 中通过 reactive 这个方法进行实现
- proxy 只能代理复杂数据类型，所以 vue 额外实现了 ref 方法处理简单数据类型，通过 set 和 get 标记了 value 函数以此来实现，所以 ref 只能使用.value 进行触发
- 编译器原理 parse =》 transformer =〉 generate

## Diff 算法

> diff 算法本质是一个对比的方法，其核心在于：旧 Dom 组更新为新 Dom 组时，如何更新效率更高，想要触发 diff 必须时一组 dom 的变化

### v-for key 属性的意义

```js
/**
 * 根据 key || type 判断是否为相同类型节点
 */
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  return n1.type === n2.type && n1.key === n2.key;
}
```

- isSameVNodeType 的作用是判断两个 vnode 是否是相同的
- 判断的方式是利用 VNode 的 type 和 key 进行对比，如果两个 Vnode 的 type、key 相等，则两个 vnode 为相同的 vnode
- type 是 Vnode 节点类型，比如 div、li、comment、Component 组件实例
- key 就是 v-for 循环时绑定的 key，key 变化则判断两者是否相同

### diff 执行五大步骤

- from start 自前向后的对比
- from end 自后向前的对比
- 新节点多于旧节点 需要挂载
- 旧节点多于新节点 需要卸载
- 乱序

## 路由钩子

- 全局守卫 beforeEach afterEach
- beforeEnter 只在进入路由时触发，不会在 params、query 或 hash 改变时触发
- 组件路由 beforeRouteEnter beforeRouteUpdate beforeRouteLeave

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
};
```

## 路由模式 hash history

`hash`模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `onhashchange` 事件。

- hash 变化会触发网页跳转，即浏览器的前进和后退。
- hash 可以改变 url ，但是不会触发页面重新加载（hash 的改变是记录在 window.history 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 http 请求，所以这种模式不利于 SEO 优化。hash 只能修改 # 后面的部分，所以只能跳转到与当前 url 同文档的 url.
- hash 通过 window.onhashchange 的方式，来监听 hash 的改变，借此实现无刷新跳转的功能。

`history API` 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。

- 通过 `pushState` 、 `replaceState` 来实现无刷新跳转的功能。
- 使用 history 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 url ，就会出现 404 的页面。
- `hash` 模式虽然改变了 `url` 但并不包括在 http 请求中不影响服务端
- 通过 js 操作 window.history 来改变浏览器地址栏的路径并没有发送 http 请求，当页面刷新会请求 www.website.com/login,这个目录在服务器并不存在所以会返回404

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

## vue3 相关 API

- toRef 创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, "foo");

// 更改该 ref 会更新源属性
fooRef.value++;
console.log(state.foo); // 2

// 更改源属性也会更新该 ref
state.foo++;
console.log(fooRef.value); // 3
```

- toRefs 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经“链接上了”
state.foo++;
console.log(stateAsRefs.foo.value); // 2

stateAsRefs.foo.value++;
console.log(state.foo); // 3
```

- shalowRef 和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```js
const state = shallowRef({ count: 1 });

// 不会触发更改
state.value.count = 2;

// 会触发更改
state.value = { count: 2 };
```
