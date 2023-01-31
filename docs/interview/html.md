---
layout: doc
title: HTML
---

# HTML 相关基础

## BFC

`BFC`是块级上下文，是一个独立的渲染区域，**让处于`BFC`内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。**

### 触发条件

- `position: absolute`/`fixed`
- `display: inline-block`/`table`/`flex`
- `float` 设置除 `none` 以外的值（只要设置了浮动，当前元素就创建了 BFC）
- `overflow: hidden`/`auto`/`scroll`

### 特性和应用

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

## 重绘和重排

从字面意思就可以理解，
重排，重新排列，一般发生在布局变化或者元素大小发生变化时
重绘，重新绘制，一般发生在布局不变，视觉上变化的时候譬如阴影颜色啥的

重排会导致重绘，重绘不会导致重排

## 标准盒模型与怪异盒模型的区别

#### 盒模型顾名思义就是在 css 中的盒子，把 HTML 的元素封装成盒子用来设计和布局时使用

- 内容（content）：盒子的内容，主要用来显示文字和图像。
- 填充（padding）：也叫内边距，用来清除内容周围的区域，它是透明的。
- 边框（border）：围绕在内边距和内容外的边框，盒子的外壳。
- 边距（margin）：也叫外边距，用来清除边框外的区域，它跟填充一样都是透明的。

#### 怪异盒模型就是 IE 盒模型

内盒尺寸（大小）=width
外盒尺寸（空间尺寸）= width+ margin
