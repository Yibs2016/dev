##### hooks
hook into React state and lifecycle features from components

###### basic built-in
useState useEffect useContext
useReducer useCallback useMemo useRef useImperativeHandle useLayoutEffect
1. useState During the next renders, useState gives us the current state
2. tell React that your component needs to do something after render

###### custom 
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


 