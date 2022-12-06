---
layout: doc
title: 什么是BFC
---

# 关于 BFC

## BFC 是什么

`BFC`是块级上下文，是一个独立的渲染区域，**让处于`BFC`内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。**

## 触发条件

- `position: absolute`/`fixed`
- `display: inline-block`/`table`/`flex`
- `float` 设置除 `none` 以外的值（只要设置了浮动，当前元素就创建了 BFC）
- `overflow: hidden`/`auto`/`scroll`

## 特性和应用

- 阻止 `margin` 重叠: 同一个 `BFC` 下外边距（`margin`）会发生折叠

```css
.flex {
  width: 100px;
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 100px;
  height: 100px;
}

.item:nth-child(1) {
  background-color: green;
  margin-bottom: 20px;
}

.item:nth-child(2) {
  background-color: pink;
  margin-top: 20px;
}
```

```html
<div class="flex">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

- 清除浮动：清除内部浮动（清除浮动的原理是两个 `div` 都处于同一个 `BFC` 区域内）

```
DDDD
```

- 自适应两栏布局：左 `float`+右 `BFC`，是利用了 `BFC` 的区域不会与 `float` 的元素区域重叠的机制

```css
.app div {
  width: 100px;
  height: 100px;
}

.float {
  background-color: green;
  float: left;
}

.flex {
  background-color: pink;
  display: flex;
}
```

```html
<div class="app">
  <div class="float"></div>
  <div class="flex"></div>
</div>
```
