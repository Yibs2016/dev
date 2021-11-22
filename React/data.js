// setState
	// 多次state更新会合并(减少渲染频次，优化性能), 异步
	// ajax, setTimeout等异步行为会阻止合并, 同步
	// React控制之内的事情处理中，setState异步，控制之外，同步更新
	onClickHandler = () => {
    this.setState({
      dollars: this.state.dollars + 10
    });
    console.log('State after (_onClickHandler): ' + JSON.stringify(this.state));  //不能拿到更改后的值
  }
	onTimeoutHandler = () => {
    this.setState({
      dollars: this.state.dollars + 30
    });
    console.log('State after (timeout): ' + JSON.stringify(this.state));     //能拿到更改后的值
  }
	setTimeout(this.onTimeoutHandler, 10000);
	// promise化
	const setStatePromise = (me, state)=> {
		new Promise(resolve=> {
			me.setState(state, ()=> {
				resolve()
			})
		})
	}


// context
	// context类似与事件总线(Event Bus)。context里面维持的是数据而非事件。context贯穿于整个组件树中，所有的组件都可以访问context
	// 官方不推荐使用
	getChildContext() { //父
    return {};
  }
	this.context.xxx    //子

	// 包裹context
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
	// usage
	import wire from './wire';
	function Title(props) {
		return <h1>{ props.title }</h1>;
	} //处理依赖，转化为props
	export default wire(Title, ['title'], title => ({ title }));   //处理依赖，转化为props



	

// 跨组件数据共享
// redux react-redux redux-saga
// redux一种机制：把state集中到顶部，灵活将所有state分发给需要的组件 
	// 整个应用状态存储到一个地方：store
	// 组件-store.dispatch-派发一个action，被reducer(管理员)处理，更新state
	// 组件dispatch(派发)action(行为)给store,而非直接通知其它组件
	// 其他组件订阅store中的state刷新视图
	// 创建指令(action) 创建reducer(处理函数) 创建store(createStore)

// react-redux react官方提供的react绑定库
	// 将组件分：容器组件(处理逻辑,不负责UI呈现) UI组件(显示和傻瓜交互: 外部参数,不处理逻辑)
	// provider(上下文共享store对象) connect(容器组件) mapStateToProps mapDispatchToProps

// 异步后派发actiondedux-saga
	// takeEvery 无限监听  
	  while(true){
		  yield take('INCREMENT_ASYNC');
		  yield fork(incrementAsync);
		}

	import { takeEvery, call, put } from 'redux-saga/effects'
	function* watchFetchData() {
		yield* takeEvery("FETCH_REQUESTED", fetchData)
	}
	export function* fetchData(action) {
		try {
				const apiAjax = (params) => fetch(url, params);
				const data = yield call(apiAjax);
				yield put({type: "FETCH_SUCCEEDED", data});
		} catch (error) {
				yield put({type: "FETCH_FAILED", error});
		}
	}
	// takeLatest
	function* watchFetchData() {
		yield* takeLatest('FETCH_REQUESTED', fetchData)
	}
	// 同一时间只允许执行1个最后启动的那个任务,之前的会被自定取消
	
	// take 监听action  
	// put 发生action
	// call 调用函数 阻塞effect
	// fork 调用函数 不阻塞
	// select 获取state

	// 使用
	const sagaMiddleware = createSagaMiddleware() // 创建了一个saga中间件实例
 
	const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
	const store = createStoreWithMiddleware(rootReducer)
	//等价于  const store = createStore(reducers,applyMiddlecare(sagaMiddleware))

	sagaMiddleware.run(rootSaga)

	// 总结:
		// saga中间件绑定到store
		// run saga 启动action监听函数




	// 处理loading


	