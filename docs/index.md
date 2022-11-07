---
title: 不知道什么东西
lang: zh-ZN
---

# Hello VitePress

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

::: tip 买菜的家朋
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

```js
export default {
  name: 'MyComponent',
  // ...
}
```
```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
