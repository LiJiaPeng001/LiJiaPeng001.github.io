---
layout: doc
title: 什么是Babel
---

# Babel 的用途

主要用 babel 来做 3 种事情：

## 转译 esnext、typescript、flow 等到目标环境支持的 js

将代码中新的语法、typescript 和 flow 的语法转成基于目标环境支持语法的实现，并且可以将目标环境不支持的语法进行 polyfill

## 一些特定用途的代码转换

babel 是一个转译器，暴露了很多 api，用这些 api 可以完成代码到 AST 的解析、转换、以及目标代码的生成

比如小程序框架 taro 基于 babel 的 api 来实现的。

## 代码的静态分析

1. 对代码进行类型检查。
2. Api 文档自动生成工具，可以提取源码中的注释，然后生成文档。
3. type checker 会根据从 AST 中提取的或者推导的类型信息，对 AST 进行类型是否一致的检查，从而减少运行时因类型导致的错误。
4. 压缩混淆工具，这个也是分析代码结构，进行删除死代码、变量名混淆、常量折叠等各种编译优化，生成体积更小、性能更优的代码。
5. js 解释器，除了对 AST 进行各种信息的提取和检查以外，可以直接解释执行 AST。