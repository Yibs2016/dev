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
 

 
##### 控制权
栗子：受控组件与非受控组件
广义来说，完全受控组件是指：不含有内部 states，只接受 props 的函数式组件或无状态组件
渲染行为完全由外部传入props 控制，自身没有“自治权”。这类组件很好地实现了复用性，且具有良好的测试性。

UI轮子设计中，“半自治”或者“不完全受控”组件，有时也会是一个更好的选择 
control props模式
组件具有自身 state，当没有相关 porps 传入时，使用自身状态 statea 完成渲染和交互逻辑；当该组件被调用时，如果有相关 props 传入，那么将会交出控制权，由业务消费层面控制其行为。

对比
Redux-thunk 控制力较弱
```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
export default thunk;

dispatch(
    function(dispatch, getState) {
        dispatch({
            type: GET_USERE, 
            payload: userId
        })
        http.getUser(id)
            .then(response => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_DATA_FAILED,
                    payload: error
                })
            }) 
    }
) 
```
Redux-promise 控制力较强 
```javascript
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}
dispatch({
    type: GET_USER,
    payload: http.getUser(userId) // payload 为 promise 对象
})
```
- 无法乐观更新

Redux-promise-middleware 中间状态
```javascript
//action types
const GET_DATA = 'GET_DATA',
    GET_DATA_PENDING = 'GET_DATA_PENDING',
    GET_DATA_FULFILLED = 'GET_DATA_FULFILLED',
    GET_DATA_REJECTED = 'GET_DATA_REJECTED';
    
//action creator
const getData = function(id) {
    return {
        type: GET_DATA,
        payload: {
            promise: api.getData(id),
            data: id
        }
    }
}

//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case GET_DATA_PENDING :
        return oldState; // 可通过action.payload.data获取id
    case GET_DATA_FULFILLED : 
        return successState;
    case GET_DATA_REJECTED : 
        return errorState;
    }
}
```
- 每个type都有_PENDING,_FULFILLED, _REJECTED有点烦


redux-action-tools
```javascript
const GET_DATA = 'GET_DATA';

//action creator
const getData = createAsyncAction(GET_DATA, function(id) {
    return api.getData(id)
})

//reducer
const reducer = createReducer()
    .when(getData, (oldState, action) => oldState)
    .done((oldState, action) => successState)
    .failed((oldState, action) => errorState)
    .build()
// !!!在有业务意义的action层调用通用处理逻辑，既能按需调用，又不妨碍异步请求的组合。
```





React 封装的状态管理类库共同特性
1. setup
2. simplified reducers
3. async actions, async/await over thunks
4. no more action types(as variables)
5. reducers are action creators

总结：
控制权是一种设计思想，是第三方类库和业务消费的交锋和碰撞，与语言和框架无关
无论是ui抽象还是控制抽象都能看到控制权的影子，控制权与码农息息相关，它直接决定了我们的编程体验和开发效率。
优秀的控制权设计难以一蹴而就，只有投身到一线开发中，真正了解业务需求，参考社区精华，分析优秀开源作品，才能获得成长。