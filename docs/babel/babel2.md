---
layout: doc
title: Babel编译流程
---

# babel 的编译流程

- parse：通过 parser 把源码转成抽象语法树（AST）
- transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改
- generate：将转换后的 AST 打印成目标代码，并生成 sourcemap

![编辑流程](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee9eaa1f265c4c49ad156f2c691748d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## parse

parse 阶段的目的是把源码字符串转换成机器能够理解的 AST，这个过程分为词法分析、语法分析。

![parse](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03bdbe8096944a0fa09c86ac2ff09e56~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## transform

transform 阶段是对 parse 生成的 AST 的处理，会进行 AST 的遍历，遍历的过程中处理到不同的 AST 节点会调用注册的相应 visitor 函数，visitor 函数里可以对 AST 节点进行增删改，改回新的 AST（可以指定是否继续遍历新生成的 AST）。这样遍历完一遍 AST 之后就完成了对代码的修改。

![transform](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/494b0bc006f64c71a92947f560e97e8c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## generate

generate 阶段会把 AST 打印成目标代码字符串，并且会生成 sourcemap。不同的 AST 对应的不同结构的字符串。比如 _IfStatement_ 就可以打印成 _if(test) {}_ 格式的代码。这样从 AST 根节点进行递归的字符串拼接，就可以生成目标代码的字符串。

![generate](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84530b477a7540ee87e5bb12e9375569~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
