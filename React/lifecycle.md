##### 生命周期
###### React 15
```
constructor()
componentWillReceiveProps()  //父组件更新即触发
shouldComponentUpdate()
componentWillMount()
componentWillUpdate()
componentDidUpdate()
componentDidMount()
render()
componentWillUnmount()
```
[React 15生命周期](https://s0.lgstatic.com/i/image/M00/5E/31/Ciqc1F-GZbGAGNcBAAE775qohj8453.png)

 
###### React 16
```
constructor()
getDerivedStatrFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
render()
componentDidUpdate()
componentDidMount()
componentWillUnmount()
```
[React 16生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[对比](https://s0.lgstatic.com/i/image/M00/5F/BB/CgqCHl-KlxyAB5MpAAFaH-Kgggo887.png)
**废弃 componentWillMount componentWillReceiveProps，新增 getDerivedStateFromProps**


###### getDerivedStateFromProps
static getDerivedStateFromProps(props, state)  //父组件传的props和自身state
> 静态方法，不依赖实例，无法访问this
> 返回对象或null

###### getSnapshotBeforeUpdate
getSnapshotBeforeUpdate(prevProps, prevState)









  