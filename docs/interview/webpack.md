---
layout: doc
title: React
---

# Webpack 相关基础

## webpack 的构建流程

- 初始化参数：从配置文件读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，webpack 会在特定的时间点广播出特定的事件，plugin 监听相关事件后会执行特定的逻辑

## Webpack plugin

在 Webpack 官方推荐：使用 es6 class 去定义每一个 plugin，使用 new 实例化出一个构造函数后，可以再 constructor 获取到对应的传参。并且 apply 方法会在插件初始化时被调用一次，内部方法就是插件的功能，而 compiler.hooks 后可以选择插件在某一个生命周期时去执行，并且可以在 class 中声明多个这样的钩子函数。

```js
class HelloPlugin {
	constructor(options) {
		console.log(options);
	}
	apply(compiler) {
		compiler.hooks.done.tap('HelloPlugin', () => {
			console.log('HelloPlugin');
		}
	}
}
```

## webpack loader

loader 必须返回 undefined 让 Webpack 知道 loader 返回的结果在 this.callback 中，而不是在 return

```js
module.exports = function (source, sourceMaps) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source.replace("world", ", I am Xiaolang"), sourceMaps);
  return;
};
```
