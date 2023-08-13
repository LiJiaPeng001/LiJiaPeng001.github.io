---
layout: doc
title: Node
---

# Node 相关基础

## koa2

### 中间件
中间件是koa的函数，在请求和响应的生命周期中执行，比如身份验证、日志记录、错误处理等。使用koa2的app.use()来加载中间件，中间件函数通过`next`参数来传递控制权

```js
// 打印请求日志
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`Received request: ${ctx.method} ${ctx.url}`);
  await next();
  const ms = Date.now() - start;
  console.log(`Response sent in ${ms}ms`);
});
```

### 洋葱模型，先从皮到心，然后从心到皮

```js
const Koa = require("koa2");
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "3";
});

app.use(async (ctx, next) => {
  ctx.body += "4";
  await delay();
  await next();
  ctx.body += "5";
});

app.use(async (ctx, next) => {
  ctx.body += "6";
});

async function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

app.listen(3000);

//  1 4 6 5 3
```
