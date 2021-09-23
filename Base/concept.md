###### 定义 [[DefineOwnProperty]] (P, Desc, Throw)
Object.defineProperty(obj, 'prop', propDesc) —— obj.[[DefineOwnProperty]](propName, desc, true)
- 不存在该属性-obj可扩展的话，添加属性并赋值
- 存在-可配置的话，重新配置属性特性

###### 赋值  [[Put]] (P, Value, Throw)
obj.prop = value ——obj.[[Put]]("prop", v, isStrictModeOn) 
- 不存在-找原型链 没有 ? obj上赋值 : （只读属性-拒绝; setter访问器属性-调用setter）
- 存在-修改值

###### 属性
- 命名数据属性（最常用）   ——[[Value]] [[Writable]]
- 命名访问器属性 getter setter读取与赋值 ——[[Get]] [[Set]]
- 内部属性 js引擎内部属性，不可直接访问  ——[[Enumerable]] [[Configurable]]

##### 属性描述符
使用于：Object.defineProperty, Object.getOwnPropertyDescriptor, Object.create
##### 内部属性
[[Prototype]] [[Extensible]] [[DefineOwnProperty]] [[Put]]


> 原型链同名属性只读属性会阻止赋值操作，但不会阻止定义
> 对象字面量中的属性是通过定义操作添加的

> 创建新属性-属性定义   改变旧属性-属性赋值
但是属性定义用起来不方便，TC39关于为属性批量赋值和批量定义属性的运算符":="
最终的决定是不使用运算符,而使用合并函数配合对象字面量的方式
Object.assign(target, sourcce)