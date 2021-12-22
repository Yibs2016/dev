##### Component Organization
```javascript
  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }
  componentDidMount () {
    // React.getDOMNode()
  }
  componentWillUnmount () {
    // remove event listeners (Flux Store, WebSocket, document, etc.)
  }
  // Computed Props
  get fullName () {
    return `${this.props.firstName} ${this.props.lastName}`;
  }
```
```javascript
//Do not keep state in render
// bad
render () {
  let name = `Mrs. ${this.props.name}`;  
  return <div>{name}</div>;
}
// good
render () {
  return <div>{`Mrs. ${this.props.name}`}</div>;
}
// best
get fancyName () {
  return `Mrs. ${this.props.name}`;
}
// Use classNames to manage conditional classes.
// good
render () {
  let classes = {
    'MyComponent': true,
    'MyComponent--active': this.state.active
  };
  return <div className={classnames(classes)} />;
}
```

##### Function Component 
```javascript
// 解构
function MyButton({ className, ...props }) {
  let classNames = ["btn", className].join(" ");
  return <button className={classNames} {...props} />;
}
// props.children
// option 1: extra <>
return <>{children}</>;

// option 2: React.Children
return React.Children.only(props.children);

// add props 
const ParentFn = (props) => { 
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child, { age: 18 })
  );
  return <>{childrenWithProps}</>;
};
```

##### Layout/Style/Container component
```javascript
// bad
class PeopleWrappedInBSRow extends React.Component {
  render () {
    return (
      <div className="row">
        <People people={this.state.people} />
      </div>
    );
  }
}
// good
class BSRow extends React.Component {
  render () {
    return <div className="row">{this.props.children}</div>;
  }
} 
class SomeView extends React.Component {
  render () {
    return (
      <BSRow>
        <People people={this.state.people} />
      </BSRow>
    );
  }
}
``` 


##### State hoisting
函数组件没有状态，他们的数据传递给状态化的父容器组件--> 状态提升
[实现] -从容器组件传递回调函数到子组件

##### Controlled input
```javascript
// 不受控
<input type="text" />
// 受控(获取输入框值，拦截name)
  const handleChange = (e) => setName({ name: e.target.value })
  <input
    value={this.state.name}
    onChange={e => this.setState({ name: e.target.value })}
  />
 
``` 

##### Naming
 1. Naming Events
  - begin with handle
  - end with the name of the event they handle (eg, Click, Change)
  - be present-tense
  exp: onClick={this.handleClick} onDelete={this.handleDelete} handleNameChange, handleAgeChange  
  in-all: handleEvent 根据不同的 event.type 组织事件