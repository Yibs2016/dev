##### 内存泄漏
系统进程不再用到内存没有及时释放
1. 为什么会发生？
- 虽然有垃圾回收机制，但当回收机制识别不到某块无用内存，就发生内存泄漏
2. 原生事件不移除，为什么可能导致内存泄漏
```
var button = document.getElementById('button');
function onClick(event) {
    button.innerHTML = 'text';
}
button.addEventListener('click', onClick);
// 处理器使用了button,老版ie无法检测DOM节点与js之间的循环引用，导致内存泄漏
```
2.容易导致内存泄漏的点
  a. 全局变量(缓存大数据时确保用完设置为null)
  b. 定时器
  c. 闭包
  d. Dom元素引用
  e. 监听事件，eventBus需要解绑
  f. 第三方库创建的实例需要销毁，如chart需要destory
3.建议
  - 使用weakset 和 weakmap
```javascript
// 1
ele.addEventListener('click', handler, false)
// 2
const listener = new WeakMap()  listener.set(ele, handler)
ele.addEventListener('click', listener.get(ele), false)  //ele消失，监听函数也会移除
```

