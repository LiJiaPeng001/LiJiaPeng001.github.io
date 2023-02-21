---
layout: doc
title: TS
---

# TS 相关基础

## interface 和 type 的区别

可以交叉继承，type 使用&而 interface 使用 extends

### type 可以 interface 不可以的

- type 可以定义 基本类型的别名，如 type myString = string
- type 可以通过 typeof 操作符来定义，如 type myType = typeof someObj
- type 可以申明 联合类型，如 type unionType = myType1 | myType2
- type 可以申明 元组类型，如 type yuanzu = [myType1, myType2]

### interface 可以而 type 不可以的

- interface 可以声明合并,type 会报重复错误

```ts
interface test {
  name: string;
}
interface test {
  age: number;
}

/*
        test实际为 {
            name: string
            age: number
        }
    */
```

## any unknow vaid never

- 定义 any 后，typescript 会跳过这个变量的类型检查
- unknown 类型的对象不可以直接赋值给其它非 unknown 或 any 类型的对象，并且不可以访问上面的任何属性

```ts
let name: unknow = "IU";
let newName: string = name; // error
console.log(name.slice(0, 1)); //error
```

使用的话需判断

```ts
let name: unknow = "IU";
let newName: string = name as string;
if (typeof name === "string") name.slice(0, 10);
```

- never 类型只接受 never 类型的对象，甚至万金油 any 类型都不可以赋值给 never 类型

```ts
// 因为这个是无限循环，我们可以使用never作为返回值表示它永远不会返回
function foreverLoop(): never {
  while (true) {}
}

// 因为这个函数会抛出异常，所以也是不会返回的
function crashFunc(): never {
  throw new Error("this function will crash");
}
```

- void 其实可以理解为 null 和 undefined 的联合类型，它表示空值。
