##### API Loading & Errors
异步不可回避的两场景

如失败请求处理，每个项目都有一套教通用的处理逻辑，如弹窗提示，同时一些特定场景下，又需要绕过通用逻辑单独处理，比如表单异步校验

底层封装ajax库可轻松实现全局处理
```javascript
function fetchWrapper(args) {
    return fetch.apply(fetch, args)
        .catch(commonErrorHandler)
}
// 不足之处：
// 1扩展性不足：如少数场景需要绕过通用处理逻辑
// 2不易组合：如1个action需要多个异步请求，但异常处理和loading不需要重复
``` 
业务逻辑中处理，能按需，不妨碍异步
```javascript
function fetchWrapper(args) {
    return fetch.apply(fetch, args)
        .catch(commonErrorHandler)
}
// 不足之处：
// 1业务代码冗余
// 2不够内聚，侵入业务代码
``` 
reducer层监听业务action
```javascript
function commonErrorReducer(oldState, action) {
    switch(action.type) {
    case GET_DATA_FAILED:
    case PUT_DATA_FAILED:
    //... tons of action type
        return commonErrorHandler(action)
    }
}
// 不足之处：
// 1高耦合，高风险
// 2不易维护
``` 

比较完善的错误处理(Loading同理)特点
  - 面向异步动作(action)，而非直接面向请求
  - 不侵入业务代码
  - 默认使用通用逻辑处理逻辑
  - 可以绕过通用逻辑
```javascript
import _ from 'lodash'
import { ASYNC_PHASES } from 'redux-action-tools'
const customizedAction = createAsyncAction(
  type, 
  promiseCreator, //type 和 promiseCreator此处无不同故省略
  (payload, defaultMeta) => {
    return { ...defaultMeta, omitError: true }; //向meta中添加配置参数   
  }
)
function errorMiddleWare({dispatch}) {
  return next => action => {
    const asyncStep = _.get(action, 'meta.asyncStep');
    const omitError = _.get(action, 'meta.omitError'); //获取配置参数 可通过增量配置方式扩展loading
    if (!omitError && asyncStep === ASYNC_PHASES.FAILED) {
      dispatch({
        type: 'COMMON_ERROR',
        payload: {
          action
        }
      })
    }
    next(action);
  }
}
``` 

```javascript
const requestWithoutLoadingSpinner = createAsyncAction(type, promiseCreator, (payload, defaultMeta) => {
  return { ...defaultMeta, omitLoading: true };  //忽略loading拦截
})

import _ from 'lodash'
import { ASYNC_PHASES } from 'redux-action-tools'

export default function loadingMiddleWare({ dispatch }) {
  return next => (action) => {
    const asyncPhase = _.get(action, 'meta.asyncPhase');
    const omitLoading = _.get(action, 'meta.omitLoading');

    if (asyncPhase && !omitLoading) {
      dispatch({
        type: asyncPhase === ASYNC_PHASES.START
          ? 'ASYNC_STARTED'
          : 'ASYNC_ENDED',
        payload: {
          source: 'ACTION',
          action,
        },
      });
    }

    return next(action);
  };
}
``` 


//https://github.com/codeBelt/react-redux-architecture/tree/ts/function