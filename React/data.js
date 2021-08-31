// setState
	// 多次state更新会合并(减少渲染频次，优化性能), 异步
	// ajax, setTimeout等异步行为会阻止合并, 同步
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

// 依赖注入 高阶组件
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



	


