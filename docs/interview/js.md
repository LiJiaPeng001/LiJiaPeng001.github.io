---
layout: doc
title: JS
---

# JS 相关基础

## 实现 new

调用 new 的过程中会发生四件事情

- 新生成一个对象
- 链接到原型
- 绑定 this
- 返回新对象

```js
function Demo() {
  this.name = "李家朋";
  this.age = 11;
}

Demo.prototype.getName = function () {
  return this.name;
};

/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor) {
  if (typeof ctor !== "function") {
    throw "newOperator function the first param must be a function";
  }
  // ES6 new.target 是指向构造函数
  newOperator.target = ctor;
  // 1.创建一个全新的对象，
  // 2.并且执行[[Prototype]]链接
  // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
  var newObj = Object.create(ctor.prototype);
  // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
  // 除去ctor构造函数的其余参数
  var argsArr = [].slice.call(arguments, 1);
  // 3.生成的新对象会绑定到函数调用的`this`。
  // 获取到ctor函数返回结果
  var ctorReturnResult = ctor.apply(newObj, argsArr);
  // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  var isObject =
    typeof ctorReturnResult === "object" && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === "function";
  if (isObject || isFunction) {
    return ctorReturnResult;
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj;
}
let my = newOperator(Demo);

console.log(my.getName());
```

## Event Loop

#### 宏队列和微队列

宏队列

- setTimeout
- setInterval
- setImmediate (Node 独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

微队列

- process.nextTick (Node 独有)
- Promise
- Object.observe
- MutationObserver

#### 执行流程

- 主栈队列就是一个宏任务，每一个宏任务执行完就会执行宏任务中的微任务，直到微任务全部都执行完，才开始执行下一个宏任务。
- JS 中任务的执行顺序优先级是：主栈全局任务(宏任务) > 宏任务中的微任务 > 下一个宏任务。，所以 `promise(微任务)` 的执行顺序优先级高于`setTimeout`定时器。
- await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 下面的代码加入到 micro task 中这个微任务是 promise 队列中微任务，然后就会跳出整个 async 函数来继续执行后面的代码。
- 每一个宏任务和宏任务的微任务执行完后都会对页面 UI 进行渲染。

## JSON.stringify 的缺点

- 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式，而不是对象的形式
- 如果 obj 里有 RegExp(正则表达式的缩写)、Error 对象，则序列化的结果将只得到空对象；
- 如果 obj 里有函数，undefined，则序列化的结果会把函数或 undefined 丢失；
- 如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
- JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor；
- 如果对象中存在循环引用的情况也无法正确实现深拷贝；
