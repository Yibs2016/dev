##### 合成事件
SyntheticEvent，模拟原生DOM事件所有能力的事件对象，包裹了原生的event对象.  
兼容所有浏览器  
> 获取原生事件 e.nativeEvent   
> 所有事件以`事件委托`绑定到最外层上（16: document; 17: Root Dom）
>> 在 React 17 中，不再向 document 附加事件处理器。而会将事件处理器附加到渲染 React 树的根 DOM 容器中 

- ![avatar](/images/react-event-delegation.jpg)  

使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。   
当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象  
当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。  

###### 目的 
1. 浏览器兼容  
2. 性能提升  
 
##### React 事件与原生事件执行顺序
当真实 DOM 触发事件，冒泡到 *外层* 对象 -> 处理 *React* 事件  
```javascript
class App extends React.Component<any, any> { 
  constructor(props: any) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }
  componentDidMount() {
    console.log("React componentDidMount！");
    this.parentRef.current?.addEventListener("click", () => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    this.childRef.current?.addEventListener("click", () => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }
  parentClickFun = () => {
    console.log("React 事件：父元素事件监听！");
  };
  childClickFun = () => {
    console.log("React 事件：子元素事件监听！");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    );
  }
}
// 原生事件：子元素 DOM 事件监听！ 
// 原生事件：父元素 DOM 事件监听！ 
// React 事件：子元素事件监听！ 
// React 事件：父元素事件监听！ 
// 原生事件：document DOM 事件监听！ 
```



##### 合成事件对象池
不同类型不同事件池 (SyntheticMouseEvent,SyntheticKeyboardEvent)
- 未满时，创建新的事件对象，派发给组件   
- 装满时，复用事件池事件对象   
- ![avatar](/images/react-event-pool01.jpg)    
- ![avatar](/images/react-event-pool02.jpg)  

> 每次派发事件，React会新建或从对象池中复用SyntheticEvent对象，派发完毕事件对象把所有属性置null——> 无法在监听函数外使用事件对象
> e.persist() 持久化实践对象
> e.stopPropagation() / e.preventDefault() 阻止React事件的冒泡 [React合成事件的冒泡实际上是节点的遍历。]   
> e.nativeEvent.stopImmediatePropagation 阻止真实的 DOM 事件冒泡
```javascript
// react16
  const handleClick = (event) => {
    console.log(event.type); // => "click"
    const eventType = event.type;  
    setTimeout(function() {
       console.log(event.type); // => null
       console.log(eventType); // => "click"
    }, 0);   
  };


```  
> React 17 中移除了 event pooling（事件池）——> 顺利读取事件字段

