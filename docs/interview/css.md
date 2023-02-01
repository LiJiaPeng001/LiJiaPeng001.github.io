---
layout: doc
title: CSS
---

# CSS 相关基础

## 伪类和伪元素

伪类：通过单冒号展示，比如:hover
伪元素：通过双冒号展示，比如::before

## em 和 rem

`em` 的值等于该元素的父级元素的计算字体大小

`rem` 永远只相对于 `HTML` 节点的 `fontSize`

## ⽤ translate 来改变位置⽽不是定位

translate 是 transform 属性的⼀个值。改变 transform 或 opacity 不会触发浏览器重排（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重排，进⽽触发重绘和复合。
