##### Render Props及其使用场景
context api中, props.children为函数
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



##### 普通组件包装属性
```javascript
 
``` 