// jsx
  // 类xml语法的ecma script扩展 js写html React.createElement dom元素+自定义元素 
  // React将所有dom的字符串转义，防止xss
  // jsx会被编译为React.createElement，是函数调用和表达式的语法糖，
  <div id={condition ? 'msg' : null}>Hello World!</div>
  React.createElement(
    'div',                            // Element "tag" name.
    { id: condition ? 'msg' : null }, // Properties object.
    'Hello World!'                    // Element contents.
  );

  <div id={(function () {
    if (condition) {
        return "msg";
    } else {
        return null;
    }
})()}>Hello World!</div>
// will compile into following valid js
  React.createElement(
    "div",
    {
        id: (function () {
            if (condition) {
                return "msg";
            } else {
                return null;
            }
        })()
    },
    "Hello World!"
  );
// createElement底层无法运行js

