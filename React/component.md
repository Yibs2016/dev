//数据流
  //state组件内部状态
  //prop外部参数

##### 组件通信
1. 子-父级  属性回调函数；自定义事件机制
2. 跨级组件 context 
3. 无嵌套关系 自定义事件机制

##### 组件抽象
1. mixin 
  - 破坏组件封装 命名冲突 增加复杂性
2. 高阶组件
  - 接收函数，输出函数 
  - 复用性，抽象性
  1. 属性代理 (render返回组件参数)
  a. 生命周期调用类似堆栈 didmount→HOC didmount→(HOCs didmount)→(HOCs will unmount)→HOC will unmount→unmount
  b. 控制 props、通过 refs 使用引用、抽象 state 和使用其他元素包裹 WrappedComponent
  2. 反向继承 (继承组件，super.render())
  a. 生命周期调用类似队列 didmount→HOC didmount→(HOCs didmount)→will unmount→HOC will unmount→(HOCs will unmount)
  b. 渲染劫持 if super.render() else return null、控制state
  



