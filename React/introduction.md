##### 简介
  - 专注视图层  
  - virtual dom 其他平台集成  
  - 函数式编程 简单函数，易于测试  
 
##### jsx
  - 类xml语法的ecma script扩展 js写html React.createElement dom元素+自定义元素  
  - React将所有dom的字符串转义，防止xss  
##### 组件 
	- 封装性  
	- 生命周期  
	- 数据流动  
	- 分层思想    
	- web compontents  
	  - html template, custom elements, shadow dom, html imports  
	- react组件 理念与web comp一致  
		- 继承顶层类React.Compontent(声明props, context, refs...,setState, forceUpdate)  
	  - props state 生命周期  
		- 将组件拆分到合理粒度，组合成业务组件  
	- 类组件(状态)，函数式组件(无状态，优化检查和内存分配)  

##### 数据流
##### 生命周期
##### dom

##### 事件系统
##### 组件通信
##### 组件抽象
##### 性能优化
##### 自动化测试

##### 源码

##### flux
##### redux
##### 服务器渲染
##### 可视化


##### 15-18演进
重运行时框架，虚拟dom,dom diff都于运机时  
纯js思路很灵活，但是难以做编译优化，几大版本的优化主要围绕运行时  
- cpu  
浏览器刷新频率一般是60hz[60/s, 16.6ms/次]，GUI渲染线程和js线程互斥，如果js执行时间超过16.6ms，这次刷新就没有时间绘制页面，用户感到卡顿  
- io  
网络延迟存在的情况下，减少用户的延迟感知  

###### React 15 - 半自动批处理
- 架构
	- Reconcile - 协调器，调用render生成虚拟dom进行diff,找出变化后的vdom  
	- Renderer 渲染器，将变化的组件渲染到宿主环境  
- 优化
1. 批处理  
react事件中合并多个setState  
js异步事件则同步执行  
2. 缺陷  
架构是递归同步更新  
如果节点非常多，一次setState也需要进行复杂的递归更新，一旦开始，无法中断，遍历完整颗树才会释放主线程，有明显卡顿    

###### React 16 Concurrnet Mode
- Concurrent模式  应用根据用户的设备性能和网速进行适当的调整，保持响应
- 架构 (后续几个大半本都沿用这个架构)  
	- Scheduler 调度器，调度任务优先级，高任务优先进入
	- Reconciler 协调器，找出变化的组件(fiber 重构)
	- Renderer 渲染器，将变化的组件渲染到页面  
- 保持响应
 	-	cpu: 利用浏览器每帧预留给js线程的时间更新组件，结束后线程控制权归还，让浏览器渲染UI，等待下一帧 （时间切片，长任务拆分）    
 	-	io: 控制组件渲染的优先级  
	     











