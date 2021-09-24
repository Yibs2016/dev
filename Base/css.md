1. 1个占宽100%，2个50%，3个33%
- nth-last-child 从后往前匹配处于某位置的元素
- ~ 组合器选择兄弟元素，后节点在前节点后任意位置，共享同一个父节
```css
li {width: 100%;}
li:first-child:nth-last-child(2),
li:first-child:nth-last-child(2) ~li { width: 50%; }     
li:first-child:nth-last-child(3),
li:first-child:nth-last-child(3) ~li { width: 33%; }
```
2. 2个item时，隐藏第一个或者第二个
```css
.terms-box + .terms-box { display: none; }
.terms-box:nth-of-type(1):nth-last-of-type(2) { display: none; }
```
3. input
```css
.input[type=search]:focus + .icon-search { color: #111; }  //聚焦放大镜颜色加深
.input[type=email]:invalid + .next-steo { opacity: .5; }  //聚焦放大镜颜色加深
```
4. hover title
```css
span[data-title] {
	position: relative;;
}
span[data-title]:hover:before{
	content: attr(data-title);
	position: absolute;
	top: -150%;
	left: 50%;
	transform: translateX(-50%);
	white-space: nowrap;
}
```




####### css 模块化
1. 遇到的问题
  a. 导入与导出以便复用，导出时要隐藏内部作用域，避免全局污染；sass,less,postcss解决css编程能力弱，没解决模块化
  b. 全局污染；web compontents标准中的shadow dom解决了这个问题，把样式彻底局部化却会造成外部无法重写，不够灵活
  c. 命名混乱
  d. 依赖管理不彻底
  e. 没有跨js和css共享变量
  f. 代码压缩不彻底 对移动端要求比较高
2. css modules模块化方案
  a. :import :export 繁琐，用得少
  b. .a{} .b{}
    import styles from './index.css'
    styles.a styles.b
  c. 所有样式局部化--解决命名冲突和全局污染
  d. 生成规则配置灵活，提高压缩率
  f. 按需引用

3. 使用
```css
.normal {}  === :local(.normal) {}  //局部
:global(.btn) {} :global{.a{} .b{}}   //全局
.normal {composes: base} .noraml{composes: $primary-color from './setting.css'}  //组合复用
```
4. 命名
BEM Block模块 Element节点 Modifier状态 disabled, highlight
css modules中css文件对应block，只需考虑节点和状态
5. 建议
a. 只使用class名定义样式
b. 不层叠，不嵌套，只使用一个class定义
c. composes组合复用
6. 注意事项
a. 使用id,伪类和标签选择器将原样出现在编译后的css (只会转换class名)
b. 覆盖样式,无法得知最终class名，不能通过一般选择器覆盖；方法是加上data-role，然后通过属性选择器覆盖样式[data-role="dialog-root"] {}







