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


##### Q & A
1. AST VS VDOM
ast用来描述语法，vdom用来描述dom结构，可以加入需要的字段


