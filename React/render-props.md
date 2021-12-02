##### Render Props及其使用场景
目的: render代理给使用它的组件，仅重用state
场景：非UI复用

###### 使用
1 context api中, props.children为函数
```javascript
<ThemeContext.Consumer>
  {theme => (
    <button
      {...props}
      style={{backgroundColor: theme.background}}
    />
  )}
</ThemeContext.Consumer>
```
2 withRouter [withRouter](https://github.com/remix-run/react-router/blob/v5/packages/react-router/modules/withRouter.js)

3 props.children
```javascript
const Test = props => props.children('hello world')  //函数
const App = () => (
    <Test>
        {text => <div>{text}</div>}
    </Test>
)
ReactDOM.render((<App />, root)  // 返回<div>hello world</div>

const ByDevice = ({children: {mobile, other}}) => {  //对象
  return Utils.isMobile() ? mobile : other
}
<ByDevice> 
  {{
    mobile: <div>mobile</div>,
    other: <div>other</div>,
  }}
</ByDevice>
``` 

4 封装 “state”
```
// 封装
class Mouse extends React.Component {
  state = { x: 0, y: 0 }
  handleMouseMove = (e) => 
    this.setState({ x: e.clientX, y: e.clientY })
  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    )
  }
}
// 重用
const Cat = () => 
  <Mouse>
    {({x,y}) => 
      <img src="/cat.jpg" 
        style={{ position: 'absolute', left: x, top: y }} 
      />
    }
  <Mouse>
```
5 modal封装(不推荐)
带状态的组件作为参数，有点激进
限用无loading场景，loading: modal状态变更，props.children拿到全新参数,组件re-render，modal闪屏
```javascript
const UseModal = (props)=> {
  const [on, setOn] = useState(false)
  const toggle = () => setOn((pre)=> !pre);
  const MyButton = props => <Button {...props} onClick={toggle} />;
  const MyModal = ({ onOK, ...rest }) => (
    <Modal
      {...rest}
      visible={on}
      onOk={() => {
        onOK && onOK();
        toggle();
      }}
      onCancel={toggle}
    />
  );
  return props.children({
    on,
    toggle,
    Button: MyButton,
    Modal: MyModal
  });
}
function MyShow() {
  return (
    <>
      <UseModal>
        {({ Button, Modal, toggle }) => (
          <React.Fragment>
            <button onClick={toggle}>Click me!</button>
            <Button>Click me!</Button>
            <Modal title="Simple" onOK={() => alert("everything is OK")}></Modal>
          </React.Fragment>
        )}
      </UseModal> 
    </>
  );
}
```