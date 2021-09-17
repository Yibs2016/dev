 	// generator 生成器函数 创建迭代器
 		// 协程
 			// 多个任务互相协作，完成任务

    	// 特性
			// 状态机，yield多次
			// 执行函数，返回内部指针[遍历器]
			// 暂停执行，恢复执行
			// 数据交换，try catch错误捕获

			// 生成器执行yield语句时，生成器的堆栈结构（本地变量、参数、临时值、生成器内部当前的执行位置）被移出堆栈。但生成器对象保留了对这个堆栈结构的引用（备份），所以后续调用.next()可重新激活堆栈结构并且继续执行
			// 示例
			function* A() { 
				console.log("我是A"); 
				yield B();   // 协程A执行到一半，进入暂停，执行权转移到协程B。
				console.log("结束了");  // 协程B交还执行权,协程A恢复
			} 
			// 异步操作
			var g = gen();
			var result = g.next();

			result.value.then(function(data){
				return data.json();
			}).then(function(data){
				g.next(data);
			});
			// 终止迭代器
				// it.throw()
				// it.return()
			// 手写generator

	// Thunk函数   柯里化  
		// 背景 
			// 传值调用 vs 传名调用
			const x = 1; f(x + 5);
			// 传值调用时，等同于
			f(6)
			// 传名调用时，等同于
			(x + 5) 
		// 概念
			//将参数放到临时函数，再将其传入函数体。这个临时函数：Thunk函数 （编译器传名调用的实现） 
			f(x + 5); 
			// 等同于 
			const thunk = ()=> x+5; 
			function f(thunk){}
		// thunkify 	callback拿回generator执行控制权
			
	// co
		// 柯里化 promise拿回generator执行控制权


	// async Generator 函数的语法糖 
		// 特点
			// 自带执行器
			// async：函数里有异步操作 await需要等待结果
			// 更广的适用性, co中yield后只能是Thunk或者Promise
		// 实现
		async function fn(args){}
		// 等同于
		function fn(args){ return spawn(function*() {}); }
		function spawn(genF) {
			return new Promise((resolve, reject)=> {
				var gen = genF()
				function step(nextF) {
					var next = nextF();
					if(next.done) {
						return resolve(next.value);
					}
					Promise.resolve(next.value).then((v)=> {
						step(function() { return gen.next(v); });      
					}, (e)=> step(function() { return gen.throw(e); }) 
					) 
				} 
			})
		}