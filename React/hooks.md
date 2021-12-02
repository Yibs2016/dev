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

###### custom 按需更新
```javascript
export const useOnDemandDataHook = () => {
  const setter = useState({})[1];
  const forceUpdate = useCallback(() => setter({}), [setter]);
  const dependenciesRef = useRef({ info: false, count: false });
  const dataRef = useRef({ info: null, count: 0 });
  const dispatch = useCallback(
    (payload) => {
      dataRef.current = { ...dataRef.current, ...payload };
      const needUpdate = Object.keys(payload).some(
        (key) => dependenciesRef.current[key]
      );
      if (needUpdate) {
        forceUpdate();
      }
    },
    [forceUpdate]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ count: dataRef.current.count + 1 });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return useMemo(() => {
    return Object.defineProperties(
      {},
      {
        info: {
          get: function () {
            dependenciesRef.current.info = true;
            return dataRef.current.info;
          },
          enumerable: true
        },
        count: {
          get: function () {
            dependenciesRef.current.count = true;
            return dataRef.current.count;
          },
          enumerable: true
        }
      }
    );
  }, []);
};

```
 