# 源码
`node-lesson` (https://github.com/alsotang/node-lessons)

##### 线上部署：heroku
Heroku是一个支持多种编程语言的云平台即服务  

##### 测试平台：travis
Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。  
持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。  [阮一峰 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
```yaml
language: node_js
node_js:
 - '0.8'
 - '0.10'
 - '0.11'
script: make test
```

###### travis部署  
```yaml
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN # Set in travis-ci.org dashboard
  on:
    branch: master
```


###### Mongodb 与 Mongoose
存json nosql 数据库 -> collection -> document -> 字段  
hbase 存海量数据的，redis 用来做缓存  
```javascript
var mongoose = require('mongoose');
// mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。 
mongoose.connect('mongodb://localhost/test');

// 在这里，我们创建了一个名为 Cat 的 model，它在数据库中的名字根据传给 mongoose.model 的第一个参数决定，mongoose 会将名词变为复数，在这里，collection 的名字会是 `cats`。
// mongodb 中大多数的数据类型都可以用 js 的原生类型来表示。String 的最大限度是 16MB，Number 的整型是 64-bit
// 这里可以看到各种示例：http://mongoosejs.com/docs/schematypes.html
var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number,
});

// new 一个新对象，名叫 kitty
// 接着为 kitty 的属性们赋值
var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
```
```shell
$ mongo
MongoDB shell version: 2.6.4
connecting to: test
> show dbs
> use test
> show collections
> db.cats.find()
```


###### cookie和session