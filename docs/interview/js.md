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

## 数据类型检测的方式及缺点

- `typeof` 只能检测出除 null 外的基本数据类型和引用数据类型中的 function
- `instanceof` 能检测出引用类型不能检测出基本类型，且不能跨 iframe
- `constructor` 基本能检测所有的类型（除了 null 和 undefined）constructor 易被修改
- `Object.prototype.toString.call` 检测出所有的类型 IE6 下，undefined 和 null 均为 Object

## 0.1+0.2 ! == 0.3

二进制转十进制，es6 中提供`Number.EPSILON`来解决

```js
function numberepsilon(arg1,arg2){                  
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        
​
console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
```

## Promise 相关

Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。

#### 静态方法

- all 接受一个数组，所有的 promise 的状态都达到 resolved，all 方法的状态就会变成 resolved，如果有一个状态变成了 rejected，那么 all 方法的状态就会变成 rejected
- race 跟 all 差不多，当最先执行完的事件执行完之后，就直接返回值。如果第一个 promise 对象状态变成 resolved，那自身的状态变成了 resolved；反之 reject
- any 接受数组，数组内的任意一个 promise 变成了 resolved 状态，那么由该方法所返回 resolved,反之 reject

#### 手写 MyPromise
