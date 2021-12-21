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
1. 数据描述符
  ** [[configurable]] ** 为true时，该属性可改变可delete。
  ** [[enumerable]] ** 为true时，该属性出现在对象的枚举属性中。可通过for...in 遍历属性。 
  ** [[value]] ** 默认为undefined。可以是任何有效的 js 值（数值，对象，函数等）。读取属性值时，从这个位置读；写入属性值时，把新值保存在这个位置。value针对属性。
  ** [[writable]] ** 为true时，value可改
  * defineProperty属性时不赋值configurable, enumerable, writable的话，默认均为false, 对象字面量定义的属性，默认值为true。
2. 存取描述符
  ** [[configurable]] [[enumerable]]** 同上
  ** [[get]] func ** 读取属性时调用，返回值为属性值。
  ** [[set]] func ** 写入属性时调用，接受唯一参数，并将该参数的新值分配给该属性。

[[get]]默认为undefined。在读取属性时调用的函数，一个给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。
[[set]]默认为undefined。在写入属性时调用的函数，一个给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。


##### 内部属性
[[Prototype]] [[Extensible]] [[DefineOwnProperty]] [[Put]]

> 原型链同名属性只读属性会阻止赋值操作，但不会阻止定义
> 对象字面量中的属性是通过定义操作添加的

> 创建新属性-属性定义   改变旧属性-属性赋值
但是属性定义用起来不方便，TC39关于为属性批量赋值和批量定义属性的运算符":="
最终的决定是不使用运算符,而使用合并函数配合对象字面量的方式
Object.assign(target, sourcce)


##### Array.from 
Array.from(arrayLike[, mapFn[, thisArg]])
方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
```javascript
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4] 
Array.from(new Set(['foo', 'bar', 'baz', 'foo']));
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)); 
range(0, 4, 1);
// [0, 1, 2, 3, 4]
// Generate numbers range 1..10 with step of 2
range(1, 10, 2);
// [1, 3, 5, 7, 9]
// Generate the alphabet using Array.from making use of it being ordered as a sequence
range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
// ["A", ..., "Z"]
```


##### 二进制
1. Blob 支持文件操作二进制对象 represents a file-like object of immutable, raw data. 
    blob-----URL.createObjectURL-----Blob URL  用于文件下载，图片显示
    blob.slice分隔二进制数据

    FileReader.readAsText(Blob)：Blob转文本字符串
    FileReader.readAsArrayBuffer(Blob)： Blob转ArrayBuffer格式数据
    FileReader.readAsDataURL(): Blob转Base64格式的Data URL
  - 欠缺二进制数据细节操作能力，如修改某一部分二进制数据

2. ArrayBuffer represent generic, fixed-length raw binary data buffer. 
  读取 FileReader将文件-->ArrayBuffer
  写入 TypeArray DataView

  vs Array 
  1. 初始化后固定大小，数组可自由增减
  2. ArrayBuffer数据放栈中
  3. 只读，写需要借助TypeArray/DataView

```javascript
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.setInt8(2, 42);
console.log(view.getInt8(2));
```
> ArrayBuffer vs Blob
> 1. ArrayBuffer可借助TypeArray/DataView修改，Blob则不可变；如果不需要编辑，blob优先
> 2. ArrayBuffer在内存中；Blob可在磁盘上，缓存存储器和其他地方
> 3. Blob --> ArrayBuffer readAsArrayBuffer()
> 4. ArrayBuffer --> new Blob([new Uint8Array(data])



3. Buffer nodejs中用于io操作
```javascript
const req = ctx.req;
    req.on('data', buf => {
    chunks.push(buf);  //装填
})
req.on('end', () => {
    let buffer = Buffer.concat(chunks); //拼接
    console.log(buffer.toString())  //转化
})
```



##### 浏览器内存泄漏
某块无用的内存没有及时得到释放
 
** 场景
- 全局变量
- 定时器
- 闭包
- 遗漏的dom
- 网络回调
- 
