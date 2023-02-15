---
layout: doc
title: Node
---

# Node 相关基础

## koa

- 洋葱模型，先从皮到心，然后从心到皮

```js
const KKB = require("./kkb");
const app = new KKB();

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
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, 1000);
  });
}

app.listen(3000);

//  1 4 6 5 3
```
