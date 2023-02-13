---
layout: doc
title: React
---

# React 相关基础

## React 相关理解

React 是一个用于构建用户界面的 JavaScript 库，只提供了 UI 层面的解决方案。有以下特性

- 组件化：将界面成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，构成整体页面，提高代码的复用率和开发效率。
- 数据驱动试图 （setState）
- JSX 语法：用于声明组件结构，是一个 JavaScript 的语法扩展。
- 单向数据绑定：从高阶组件到低阶组件的单向数据流，单向响应的数据流会比双向绑定的更安全，速度更快

## VDOM 和 DOM 的区别

- 真实 DOM 存在重排和重绘，虚拟 DOM 不存在；
- 虚拟 DOM 的总损耗是“虚拟 DOM 增删改+真实 DOM 差异增删改+排版与重绘（可能比直接操作真实 DOM 要少）”，真实 DOM 的总损耗是“真实 DOM 完全增删改+排版与重绘”

### 两者优缺点

真实 Dom

- 易用
- 效率低，解析速度慢，内存占用量过高
- 性能差：频繁操作真实 DOM，易于导致重绘与回流

虚拟 Dom

- 简单方便：如果使用手动操作真实 DOM 来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难
- 性能方面：使用 Virtual DOM，能够有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流，提高性能
- 跨平台：React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行
- 在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化，首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢

## 生命周期

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

更新

- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

卸载

- componentWillUnmount()

错误处理

- componentDidCatch()：打印错误信息
