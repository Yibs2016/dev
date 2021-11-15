##### props.children包装属性
###### React.cloneElement
返回一个新 ReactElement ，新元素会保留有旧元素的 props、ref、key，也会集成新的 props（在第二个参数中定义）。
```javascript
const Parent = React.createClass({
  doSomething: function(value) {
    console.log('doSomething called by child with value:', value);
  },
  render: function() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, { doSomething: this.doSomething }));
    return <div>{childrenWithProps}</div>
  }
});
const ParentFn = (props) => {
  const Child = props.children;
  const childrenWithProps = React.Children.map(Child, (child) =>
    React.cloneElement(child, { age: 18 })
  );
  return <>{childrenWithProps}</>;
};
```


##### 普通组件包装属性
```javascript
export default function wire(Component, dependencies, mapper) {
  class Inject extends React.Component {
    render() {
      var resolved = dependencies.map(this.context.get.bind(this.context));
      var props = mapper(...resolved);

      return React.createElement(Component, props);
    }
  }
  Inject.contextTypes = {
    data: PropTypes.object,
    get: PropTypes.func,
    register: PropTypes.func
  };
  return Inject;
};
``` 