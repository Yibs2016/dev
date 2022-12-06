#### compile
从template到render函数--编译过程(拼接字符串)

##### 阶段
框架控制编译和运行时
1. parse 正则解析字符串，生成ast
2. optimize 静态节点标记
3. generate new Function+with=staticRenderFns

```js
<div id="app">{{ msg }}</div>
// 编译后
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_v(_s(msg))])
  }
}
```

##### render pipeline
1. Compile
templates are complied into render function, which return virtual tree.
2. Mount 
invokes the render functions, walks the returned virtual DOM tree, and creates actual DOM nodes based on it. This step is performed as reactive effect, so it keeps track of all reactive dependencies that were used.
3. Patch
Dependency used during mount changes, the effect re-runs. A new vdom tree is created. The runtime renderer compares it with the old one, and applies necessary updates to the actual DOM.

##### 依赖收集
1. `observer` 的过程中会注册 `get` 方法，该方法用来进行「**依赖收集**」，「**依赖收集**」的过程就是把 `Watcher` 实例存放到对应的 `Dep` 对象中去。（Watcher 对象+触发 `get` 方法）
2. notify通知所有观察者更新视图，使用队列来的策略异步更新视图
 
##### 异步更新
1. 数据变更就更新视图是低效的
```
for(let i = 0; i < 1000; i++) {
    this.number++;
}
```
2. 对应的 `Watcher` 对象会被 `push` 进一个队列 `queue` 中，在下一个 tick 的时候遍历这个队列 `queue` 的 `run`方法（ `Watcher` 对象的一个方法，用来触发 `patch` 操作） 一遍。
3. 源码中分别用 `Promise`、`setTimeout`、`setImmediate` 等去模拟

##### 要点
1. 每个vue组件都是个vue实例，构造器继承与Vue; 初始化时创建一个渲染watcher
2. 对于属性为对象的情况，会继续收集这个对象的依赖


##### Q & A
1. AST VS VDOM
ast用来描述语法，vdom用来描述dom结构，可以加入需要的字段

2. WHY VDOM
js描述dom节点信息，vdom把渲染过程抽象化，使得组件的抽象能力得到提升，并可以适配dom以外的渲染目标（跨平台能力），比如weex, node


