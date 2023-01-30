---
layout: doc
title: JS
---

## 实现 new

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
