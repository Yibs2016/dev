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
  
##### 纯函数
a. 给定输入返回相同输出
b. 没有副作用
c. 没有额外状态依赖
实际项目中，需要发送网络请求以获取数据(数据不固定，是一种副作用)，如何最大限度保证应用由纯组件或准组件组成？

##### HOC
接收一个组件，返回一个新的组件
特点：劫持，代理


##### 组件性能优化
主因：影响网页性能--浏览器重绘重排
主题：避免不必要的渲染
常用：shouldComponentUpdate 默认true，始终执行render-vdom比较-是否需要更新 ——带来很多不必要渲染，例如父组件下未变动的子组件
1. PureRender
state,props深比较昂贵，浅比较覆盖的场景不够多
```javascript
import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'; 
class NameItem extends Component {
 constructor(props) {
  super(props);
  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this); //避免 Item 组件的重复渲染
 }    
 render() {    
  return (
    <Item>
      <span>Arcthur</span>
    </Item>
  );
 }
} 
``` 

以下都会触发重新render
a. 直接props设置对象或数组
<Acount style = {{color: 'black'}}>
<Item items={this.props.items.filter(item => item.val > 30)} /> 
解决：让对象或数组保持在内存中，使用同一份引用
b. 设置 props 方法，事件绑定在元素上 ——> 把绑定移到构造器内


2. immutable
背景：对象一般是可变的mutable,引用赋值可以节约内存，但是难以维护；深浅拷贝又会造成内存浪费
原理：持久化数据结构，对象树中一个节点变化，只修改影响到的节点，其他节点共享
特点：
a. 一旦创建就不可更改
b. 修改immutable返回新immutable对象
缺点：侵入性强

3.immutable 与 pureRender
pureRender的困境：深比较昂贵，引用比较覆盖场景不足
immutable的is
```javascript
shouldComponentUpdate(nextProps, nextState) {
 const thisProps = this.props || {};
  const thisState = this.state || {};
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
    Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }
  for (const key in nextProps) {
    if (nextProps.hasOwnProperty(key) &&
      !is(thisProps[key], nextProps[key])) {
      return true;
    }
  }
  for (const key in nextState) {
    if (nextState.hasOwnProperty(key) &&
      !is(thisState[key], nextState[key])) {
      return true;
    }
  }
    return false;
  }
}  
```

4. 性能检测react-addons-perf
组件渲染各个阶段
Perf.printInclusive(measurements)：所有阶段时间。
Perf.printExclusive(measurements)：不包含挂载组件的时间，即初始化 props、state，
调用 componentWillMount 和 componentDidMount 方法的时间等。
Perf.printWasted(measurements)：监测渲染的内容保持不变的组件（查看哪些组件没有被 shouldComponentUpdate 命中）。


// 高阶组件
```javascript
  var title = 'React Dependency Injection';
  export default function inject(Component) {
    return class Injector extends React.Component {
      render() {
        return (
          <Component
            {...this.state}
            {...this.props}
            title={ title }
          />
        )
      }
    };
  }
  function withPersistence(storageKey, storage) {
    return function(WrappedComponent) {
      return class PersistentComponent extends Component {
        constructor(props) {
          super(props) {
            this.state = {inintialValue: storage.getItem(storageKey)}
          }
        }
        render() {
          return (
            <WrappedComponent
              initialValue={this.state.initialValue}
              saveValue={this.saveValue}
              {...this.perops}
            >
          )
        }
        saveValue(value) {
          storage.setItem(storageKey, value)
        } 
      }
    }
  }
  const LocalStoragePersistentForm = withPersistence('key', localStorage)(PersistentForm);
  const LocalStorageMyOtherForm = withPersistence('key', localStorage)(MyOtherForm);
  const SessionStoragePersistentForm = withPersistence('key', sessionStorage)(MyOtherForm);
```

##### forwardRef
React.forwardRef会创建一个React组件：能够将其接受的ref属性转发到其下组件树下的另一个组件中
```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```



##### 组件设计
###### 单一职责
在项目中将全部组件拆散，使它们具备单一职责，反而增加繁琐程度，那么应该按照什么原则呢：如果一个功能集合有可能发生变化就需要最大程度保持单一职责
优点：全局掌控，组件维护方便


###### 组合是灵魂








###### 最佳实践
####### TypographyComponent
```javascript
import { alternateFont, typeScale, boldFontWeight } from './styles';
const Text = ({
  tag = 'span',
  size = 4,
  alt,
  center,
  bold,
  caps,
  ...props
  }) => {
  const Tag = tag;
  const sx = {
    fontFamily: alt ? alternateFont : null,
    fontSize: typeScale[size],
    fontWeight: bold ? boldFontWeight : null,
    textAlign: center ? 'center' : null,
    textTransform: caps ? 'uppercase' : null
  };

  return <Tag {...props} style={sx}/>
};

const LeadText = (props) => <Text {...props} tag='p' size={3}/>;
const Caps = (props) => <Text {...props} caps/>;
const TypographyComponent = () => (
  <div>
    <LeadText>
      This is a lead with some<Caps>all caps</Caps>.
    It has a larger font size than the default paragraph.
    </LeadText>
    <MetaText>
      This is smaller text, like form helper copy.
    </MetaText>
  </div>
);
```
