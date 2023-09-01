---
layout: doc
title: JS
---

# JS 相关基础

## 数据类型

js分为两种数据类型，一种是基本数据类型，一种是复杂数据类型。两种类型的主要区别是它们的存储位置不同，基本数据类型数据保存在栈中，复杂数据类型保存在堆中

### 栈和堆的区别
= 栈主要用于存储基本数据类型和引用值的地址。堆主要用于存储复杂的数据结构和对象。在堆上存储的是对象本身的值。
- 栈存储数据量较小。堆较大但是不受限制，首操作系统和浏览器因素的影响
- 栈上的数据的生命周期是由作用域和函数调用关系决定的，局部变量和函数参数等在其作用域结束后会被自动销毁。堆上数据的生命周期由程序员手动控制，当不再有引用指向一个堆上的对象时

### 基本数据类型有`Undefined`,`Null`,`Boolean`,`Number`,`String`,`Symbol`,`BigInt`
- `undefined`表示未定义或未初始化的变量，`null`表示空对象的特殊值，表示对象为空对象指针，在使用typeof操作符检查，`undefined`会返回`undefined`，而`null`会返回字符串“`object`”，这由于历史原因造成。在比较相等性时，undefined和null都与自身以及彼此相等，但与其他值不想等，比如`null == undefined`为true，而`null === 0`为false 
> 在js初始版本中，所有值都被表示为32位的二进制数，前三位用于表示类型标签，`000`用于表示对象，而`null`的二进制表示刚好是`000`，与对象标签匹配。因为检测一个值为`null`时，会返回`object`
- `Symbol`用于创建独一无二的、不可变标识符，在内存中是唯一的可以用作对象属性的键值，因为不会被常规属性遍历比如`for in`和`Object.keys()`获取到，可以定义一些私有属性、自定义行为等,如若获取可使用Object.getOwnPropertySymbols
```js
const obj = {
  [Symbol('222')]: '222',
  [Symbol('333')]: '222',
  name: "peng"
}

for (const key in obj) {
  console.log(key) // name
}    
console.log(Object.getOwnPropertySymbols(obj)) // Symbol('222') & Symbol('333')
```
- `BigInt`是用来表示任意精度的整数，远超普通数字类型的范围

### 复杂数据类型（引用数据类型）有Object，Array，Function，Map和Set

## 数据类型检测的方式及缺点

- `typeof` 只能检测出除null外的基本数据类型和引用数据类型中的function
- `instanceof` 用于检测对象是否属于某个构造函数的实例，能检测出引用类型不能检测出基本类型
- `Object.prototype.toString.call`通过调用对象的`toString`方法，可以获取其内部的原型类型字符串
```js
Object.prototype.toString.call("Hello"); // "[object String]"
```

## this指向

`this`关键字表示当前正在执行代码所属的对象。`this`的指向是动态的，它的值取决于函数被调用的方式以及函数的上下文。
- 全局作用域，在全局this指向全局对象`window`，在node环境中是`global`对象
- 函数中：作为普通函数调用`this`指向全局对象，如果是以对象的方法调用，`this`指向该对象
- 箭头函数：会捕获外层函数的this值，不会根据函数的调用方式改变
```js
const obj = {
  name: "Alice",
  greet: function() {
    const innerFunc = () => {
      console.log(this.name);
    };
    innerFunc();
  }
};

obj.greet(); // 输出 "Alice"

```
- 构造函数：`this`指向新创建的对象实例
- 在事件处理函数中，this 指向触发事件的 DOM 元素。

### 改变this指向
- bind：创建一个新的函数，该函数的this绑定到指定的对象值，原函数不会被调用，而是返回一个新函数
- call：立即调用函数，传递参数列表
- apply：传递参数数组

## 类数组如何遍历
类数组有`callee`和`length`属性，但是没有数组的forEach和reduce方法等
> callee是一个指向当前正在执行的函数的引用，主要用于函数内部实现递归而不需要引用函数的名称，这在匿名函数中很有用

```js
function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    // 使用 callee 调用自身
    return n * arguments.callee(n - 1);
  }
}

const result = factorial(5); // 计算 5 的阶乘
console.log(result); // 输出 120

```

- es5可以使用`Array.prototype.foreach.call(arguments,a=>console.log(a))`
- es6可使用`扩展运算符`，或者`Array.from`

## 浅拷贝和深拷贝（针对于引用数据类型）

### 浅拷贝
- es6:Object.assign()、扩展运算法
- es5:slice，concat，对象使用for in循环

### 深拷贝

递归的循环原始对象的所有层级属性或元素，遇到正则和日期可先转为字符串
```js
const regex = /pattern/g;

const regexString = regex.source; // 获取正则表达式的模式部分
const flags = regex.flags; // 获取正则表达式的标志部分

const regexAsString = `/${regexString}/${flags}`;
console.log(regexAsString); // 输出 "/pattern/g"

const date = new Date("2013-12-23")
console.log(date.valueOf)
```
JSON.stringify 的缺点

- 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式，而不是对象的形式
- 如果 obj 里有 RegExp(正则表达式的缩写)、Error 对象，则序列化的结果将只得到空对象；
- 如果 obj 里有函数，undefined，则序列化的结果会把函数或 undefined 丢失；
- 如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
- JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor；
- 如果对象中存在循环引用的情况也无法正确实现深拷贝；

## 缓存机制

- localStorage数据再浏览器关闭后仍然保留，sessionStorage数据在会话结束时清楚（浏览器关闭或标签关闭），相同域名下打开的多个标签页面是不可以使用sessionStorage通信的
- 两个标签页如果想实现本地缓存共享可使用`window.postMessage`或者更复杂的`WebSocket`,`postMessage`通过`window.open`打开新窗口，或者在同一页面中使用`iframe`
### storage和cookie不同处
- 存储空间以chrome为例storage大概10mb配额，cookie可以存180个，每个4kb。
- cookie可设置过期时间，storage需手动清除。
- cookie每次http请求都会自动发送至服务器，本地缓存不会
```js
// 发送消息给目标窗口
const targetWindow = window.open('https://www.example.com');
const message = 'Hello from Sender!';

// 发送消息
targetWindow.postMessage(message, 'https://www.example.com');
// 监听消息事件
window.addEventListener('message', event => {
  // 检查消息源
  if (event.origin === 'https://www.example.com') {
    // 处理接收到的消息
    const receivedMessage = event.data;
    console.log('Received message:', receivedMessage);
  }
});
- 

```
## fetch
```js
// 发起 POST 请求
fetch('https://api.example.com/submit', {
  method: 'POST', // 请求方式
  headers: {
    'Content-Type': 'application/json'
  }, // 请求头
  body: JSON.stringify({ key: 'value' }) // 请求体
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
 //fetch第一个then用于处理网络请求的响应，这个阶段获取响应状态码验证是否成功，第二个then用于解析数据
```
### 优势
- Promise风格链式调用
- 语法简介，更加语义化
- 更强大和灵活的请求和响应对象
### 缺点
- fetch默认不会带cookie
- Fetch 没有办法原生监测请求的进度，而 XHR 可以。
## Event Loop

JS的运行环境是称之为宿主环境。JS语言不止运行在浏览器

EventLoop用于处理异步操作和事件驱动的变成，为了解决js单线程执行模型下的并发性和异步编程问题而设计

### 宏队列和微队列

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

### 执行流程

- 主栈队列就是一个宏任务，每一个宏任务执行完就会执行宏任务中的微任务，直到微任务全部都执行完，才开始执行下一个宏任务。
- JS 中任务的执行顺序优先级是：主栈全局任务(宏任务) > 宏任务中的微任务 > 下一个宏任务。，所以 `promise(微任务)` 的执行顺序优先级高于`setTimeout`定时器。
- await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 下面的代码加入到 micro task 中这个微任务是 promise 队列中微任务，然后就会跳出整个 async 函数来继续执行后面的代码。
- 每一个宏任务和宏任务的微任务执行完后都会对页面 UI 进行渲染。
### 事件监听

事件监听用于捕获用户交互、浏览器操作以及其他事件，便于事件发生来执行响应的代码逻辑。事件监听分为三个阶段
- `捕获阶段` 从根节点向目标元素传播
- `目标阶段` 事件到达目标元素，触发目标元素的事件监听器
- `冒泡阶段` 事件从目标元素向根元素传播
可通过`addEventListener`的第三个参数来改变
```js
// 示例：捕获阶段
element.addEventListener('click', () => {
    console.log('捕获阶段事件监听器');
}, true);

// 示例：冒泡阶段
element.addEventListener('click', () => {
    console.log('冒泡阶段事件监听器');
}, false);

```
### 作用域

定义变量的区域，决定变量的可见性和访问范围
- 全局作用域 可以在整个程序访问到
- 局部作用域 函数内部定义变量用于局部作用域
- 块级作用域 es6的let和const关键字，在块级作用域内定义的变量只能在该块内部访问
```js
console.log(x); // 抛出错误，x 在这里是暂时性死区
let x = 10;
```
## 高阶函数

高阶函数是指接受一个或多个函数作为参考，并返回一个函数的函数，例如map，filter，reduce
```js
const multi10 = function(x) { return x * 10; }
const add100 = function(x) { return x + 100; }
const compose = function(f,g) { 
    return function(x) { 
        return f(g(x))
    }
}

console.log(compose(add100, multi10)(7))
```
### 柯里化 == 闭包 + 递归

把接受多个参数的函数变换成接受一个单一参数（或部分）的函数，并且返回接受余下的参数和返回结果的新函数的技术
- 缓存穿参
```js
function ajax(url, data, callback) {
  // ...
}
function ajaxTest1(data, callback) {
  ajax('http://www.test.com/test1', data, callback);
}
// 柯里化后
let ajaxTest2 = partial(ajax,'http://www.test.com/test2')

ajaxTest2(data,callback)
function partial(fn, ...presetArgs) { // presetArgs 是需要先被绑定下来的参数
  return function partiallyApplied(...laterArgs) { //  ...laterArgs 是后续参数
        let allArgs =presetArgs.concat(laterArgs) // 收集到一起
        return fn.apply(this, allArgs) // 传给回调函数 fn
  }
}
```
- 缓存判断
```js
const handleOption = ((param) =>{
     console.log('从始至终只用执行一次 if...else...')
     if(param === 'A'){
         return ()=>console.log('A')
     }else{
         return ()=>console.log('others')
     }
})

const tmp = handleOption('A')

tmp()
tmp()
tmp()

```
- 缓存计算

```js
function cached(fn){
  const cacheObj = Object.create(null); // 创建一个对象
  return function cachedFn (str) { // 返回回调函数
    if ( !cacheObj [str] ) { // 在对象里面查询，函数结果是否被计算过
        let result = fn(str);
        cacheObj [str] = result; // 没有则要执行原函数，并把计算结果缓存起来
    }
    return cacheObj [str] // 被缓存过，直接返回
  }
}

const calculateFn = (num)=>{
    console.log("计算即缓存")
    const startTime = new Date()
    for(let i=0;i<num;i++){} // 大数计算
    const endTime = new Date()
    console.log(endTime - startTime) // 耗时
    return "Calculate big numbers"
}

let cashedCalculate = cached(calculateFn) 

console.log(cashedCalculate(10_000_000_000)) // 计算即缓存 // 9944 // Calculate big numbers
console.log(cashedCalculate(10_000_000_000)) // Calculate big numbers

console.log(cashedCalculate(20_000_000_000)) // 计算即缓存 // 22126 // Calculate big numbers
console.log(cashedCalculate(20_000_000_000)) // Calculate big numbers

```

高阶函数和柯里化的好处
- 模块化，将复杂问题分解为简单的函数调用
- 代码复用，可以将通用操作定义一次，并在多个地方重复使用
代码示例：request,闭包，节流

## ES6
### weakMap || weakSet
- 键值对，键如果没有引用会被垃圾回收
- 键必须是对象，值是任意类型
## Class

### 定义
类是一种用于创建对象的模版。可使用类创建对象、定义属性和方法实现面向对象的编程
### 继承
- extends + super 
### 修复符
- static 静态方法
- public 可访问，默认值
- private 只能从类内部访问，js使用#name来代表私有属性，私有方法目前不支持
- protected 只能从类的内部和子类中访问
### 实现 new

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
## 垃圾回收机制

Javascript 垃圾回收机制的原理也就是定期找出那些不再利用的内存（变量），然后释放其内存，实时开销较大，这个流程算法有两种方式

- 标记清除算法
- 引用计数算法

### 标记清除算法

标记阶段即为所有活动对象打上标记，清除阶段则把没有标记（也就是非活动对象）销毁，大致流程是这样

- 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为 0
- 然后从各个根对象开始遍历，把不是垃圾的节点改成 1
- 清理所有标记为 0 的垃圾，销毁并回收他们所占用的内存空间
- 最后，把所有内存中对象标记修改为 0，等待下一轮垃圾回收

优点就是标记简单，缺点就是内存回收剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了`内存碎片`
内存分配大多数使用 First-fit 策略，找到大于等于 size 的块立即返回，分配效率慢

### 引用计数算法

如果没有引用指向该对象，对象就会被垃圾回收机制回收，他的问题很多

- 当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
- 如果同一个值又被赋给另一个变量，那么引用数加 1
- 如果该变量的值被其他的值覆盖了，则引用次数减 1
- 当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存

```js
let a = new Object() 	// 此对象的引用计数为 1（a引用）
let b = a 		// 此对象的引用计数是 2（a,b引用）
a = null  		// 此对象的引用计数为 1（b引用）
b = null 	 	// 此对象的引用计数为 0（无引用）
...			// GC 回收此对象
```

### 使用场景优化

```js
const arr = [1, 2, 3, 4];
console.log("浪里行舟");
arr.length = 0; // 可以直接让数字清空，而且数组类型不变。
// arr = []; 虽然让a变量成一个空数组,但是在堆上重新申请了一个空数组对象。
```

```js
var t = {};
for (var i = 0; i < 10; i++) {
  // var t = {};// 每次循环都会创建一个新对象。
  t.age = 19;
  t.name = "123";
  t.index = i;
  console.log(t);
}
t = null; //对象如果已经不用了，那就立即设置为null；等待垃圾回收。
```

## 高性能向下取整

```js
// 不推荐
const num = parseFloat(1.2);
const num = parseFloat('1.2');

// 推荐
const num = 1.2 >>> 0;
const num = '1.2' >>> 0;

```

## for of 以及能遍历到哪些数据

for of 遍历的是值，允许遍历数组、string、Map、Set 集合等可迭代的数据结构

实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器，return 和 throw 是可选值，这三个借口必须返回以下两个属性：

- done 如果迭代器能够生成序列中的下一个值，则返回 false 布尔值。（这等价于没有指定 done 这个属性。）如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
- value 迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

```js
// 自定义可迭代对象
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

console.log([...myIterable]); // [1, 2, 3]
// 简单迭代器
function makeIterator(array) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length
        ? {
            value: array[nextIndex++],
            done: false,
          }
        : {
            done: true,
          };
    },
  };
}

const it = makeIterator(["yo", "ya"]);\

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done); // true

```
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

```js
console.log("landing...")
```

## 判断是否为原生函数

vue中是这么判断的
```js
const reIsNative = /native code/;

const isObject = value => {
  return value && ['object', 'function'].includes(typeof value);
};

const isNative = value => {
  return isObject(value) && reIsNative.test(value.toString());
};

// 使用：
isNative([].push); // true
isNative(myFunction); // false

```

## 对象打印顺序

```js
const object = { a2: '', 2: '', 1: '', a1: '' };

for (const key in object) {
  console.log(key);
}
// 1、2、a2、a1
```
js 在对对象的 key 进行遍历的时候，会先判断 key 的类型，如果是 number 类型，则会放在前面，并且进行排序，如果是 string 类型，则放在后面，不进行排序（对 number 排序是为了方便内存寻址，string 不能进行四则运算，所以排序没有意义）。

## webWorker

赋予js操作多线程的能力
- 不存在`window`,`parent`,`document`对象
- `location`,`navigator`对象可以可读方式访问
- worker线程上下文也有顶层对象`self`

```js
// main.js
// 在主线程中创建 Web Worker 实例
const worker = new Worker('worker.js');

// 监听来自 Worker 的消息
worker.onmessage = function (event) {
  const message = event.data;
  // 处理消息
  console.log("message:",message)
};

// 监听 Worker 的错误信息
worker.onerror = function (error) {
  console.error('Worker error:', error);
};
// worker.js
// self代表子线程自身，即子线程的全局对象，使用onmessage方法监控主程序的消息
self.onmessage = function (event) {
  // 获取主应用发送的消息
  var message = event.data;
  
  // 处理接收到的消息
  console.log('Received message:', message);

  // 发送消息给主线程
  self.postMessage('Message from Worker');
};
```

