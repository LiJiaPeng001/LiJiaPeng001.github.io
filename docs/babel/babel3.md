---
layout: doc
title: Babel的AST
---

# 常见的 AST 节点

JS parser 的 AST 大多是[estree 标准](https://github.com/estree/estree)

AST 是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST。

## Literal

Literal 是字面量的意思，比如 _let name = 'lijiapeng'_ 中，_'lijiapeng'_ 就是一个字符串字面量 StringLiteral

![Literal](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29185815036a4ea1878484ba773a3b6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

babel 通过 xxxLiteral 来抽象这部分内容

## Identifier

Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是 Identifer。JS 中的标识符只能包含字母或数字或下划线("\_")或美元符号("$")，不能以数字揩油。

```js
const name = "guang";

function say(name) {
  console.log(name);
}

const obj = {
  name: "guang",
};
```

![answer](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a4b54e6512a4da7ad5c99e7a61a62e9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## Statement

statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句

```js
break;
continue;
return;
debugger;
throw Error();
{}
try {} catch(e) {} finally{}
for (let key in obj) {}
for (let i = 0;i < 10;i ++) {}
while (true) {}
do {} while (true)
switch (v){case 1: break;default:;}
with (a){}
```

所对应的 AST 节点
![statement](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d711045e21bb44b68495088df6a9a60b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## Declaration

声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等

```js
const a = 1;
function b() {}
class C {}

import d from "e";

export default e = 1;
export { e };
export * from "e";
```

![declaration](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5303fa5530944a638d6b3d1af93f0e3f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

声明语句用于定义变量.

## Expression

exporession 是表达式，特点是执行完以后有返回时，

```js
[1,2,3]
a = 1
1 + 2;
-1;
function(){};
() => {};
class{};
a;
this;
super;
a::b;
```

![espression](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feabcb940982409b911dcbb6066e8aa7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

super 有返回值，符合表达式得特点，所以也是 expession

## Class

整个 class 的内容是 ClassBody，属性是 ClassProperty，方法是 ClassMethod

```js
class Guang extends Person {
  name = "guang";
  constructor() {}
  eat() {}
}
```

![class](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c62ec375157488780e2beae39e7620d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## modules

es module 模块

## import

import 有三种语法

```js
import { c, d } from "c";
import a from "a";
import * as b from "b";

export { b, d };
export default a;
export * from "c";
```

![import](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e501a0dfcce043c184e6320e22a4211c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## Program & Directive

program 是代表整个程序的节点，它有 body 属性代表程序题，存放 statement 数组，就是具体执行的语句的集合

Program 是包裹具体执行语句的节点，而 Directive 则是代码中的指令部分。

## File & Comment

babel 的 AST 最外层节点是 File，它有 program、comments、tokens 等属性，分别存放 Program 程序体、注释、token 等，是最外层节点

注释分为块注释和行内注释，对应 CommentBlock 和 CommentLine 节点。

![comment](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54eb07649db14476a27d61b4265fe547~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## AST 可视化查看工具

https://astexplorer.net/
