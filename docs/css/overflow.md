---
layout: doc
title: overflow的hidden和visible失效
---

# overflow 的 hidden 和 visible 在同一个元素使用失效

## 问题

当我对一个 swiper 列表增加一个 button 绝对定位并且超出了父元素的高度，理想状况下，在 X 轴超出部分隐藏，Y 轴超出部分显示。然而，元素属性并没有生效。
::: info [W3C](https://www.w3.org/TR/css-box-3/#overflow-x)
The computed values of ‘overflow-x’ and ‘overflow-y’ are the same as their specified values, except that some combinations with ‘visible’ are not possible: if one is specified as ‘visible’ and the other is ‘scroll’ or ‘auto’, then ‘visible’ is set to ‘auto’. The computed value of ‘overflow’ is equal to the computed value of ‘overflow-x’ if ‘overflow-y’ is the same; otherwise it is the pair of computed values of ‘overflow-x’ and ‘overflow-y’.
:::

大概意思是 overflow-x 和 overflow-y 会进行同步设置,无法分开设置其中一个

## 解决方法

在目标元素外再包裹一层元素 css 加上以下属性

```css
padding-bottom: button-height;
margin-bottom: button-height;
overflow: hidden;
```

目标元素 swiper

```css
overflow: visible;
```
