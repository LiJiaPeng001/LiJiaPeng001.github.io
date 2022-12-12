---
layout: doc
title: 好玩的API
---

# 好玩的 API

## 猫和狗

```js
let type = cat; // dog || cat
fetch(`https://api.the${type}api.com/v1/images/search?size=full`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

## 名言警句

```js
// 英文
let english = "https://api.quotable.io/random";
let chinese = "https://api.xygeng.cn/one";
fetch(`${english}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

## 笑话

```js
fetch(`https://api.vvhan.com/api/joke`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```
