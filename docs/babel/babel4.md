---
layout: doc
title: Babel的API
---

# Babel 的 Api

## babel 编译流程三步骤

- parse 阶段有`@babel/parse`,功能是把源码改为 AST
- transform 阶段有`@babel/traverse`，可以遍历 AST,并调用 visitor 函数修改 AST，修改 AST 设计到判断创建修改等，这时候需要`@babel/types`，当需要批量创建 AST 时候可以使用`@babel/template` 简化 AST 创建逻辑
- generate 阶段会把 AST 打印为目标代码字符串，并生成 sourcemap，需要`@babel/generator`包
- 遇到错误需要打印代码位置，需要`@babel/code-frame`
- babel 整体功能通过`@babel/core`提供

从[文档](https://www.babeljs.cn/docs/babel-parser)可以查看

## @babel/parser
