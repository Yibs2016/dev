
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x)  reject(new TypeError('Chaining cycle'));
    if (x && typeof x === 'object' || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y)=> {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)  //递归
                }, (r)=> {
                    if (called) return;
                    called = true;
                    reject(r);
                })
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch(err){
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class Promise1{
    constructor(executor) {
        this.status = PENDING
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledQueue = []
        this.onRejectedQueue = []
        const resolve = (data)=> {
            if(data instanceof Promise1) { 
                return data.then(resolve, reject)
            }
            if(this.status !== PENDING) return 
            this.status = FULFILLED
            this.value = data
            this.onFulfilledQueue.forEach(item=> item(this.value))
        }
        const reject = (reason)=> {
            if(this.status !== PENDING) return 
            this.status = REJECTED
            this.reason = reason
            this.onRejectedQueue.forEach(item=> item(this.reason))
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = onFulfilled || ((data)=> data )
        onRejected = onRejected || ((err)=> err )
        let promise2 = new Promise1((resolve, reject)=>{
            switch (this.status) {
                case PENDING:
                this.onFulfilledQueue.push(()=> { 
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                })
                this.onRejectedQueue.push(()=> {
                    setTimeout(()=> {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
                break;
                case FULFILLED:
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject); 
                    } catch (error) {
                        reject(error)
                    }
                break;
                case REJECTED:
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject); 
                    } catch (error) {
                        reject(error)
                    } 
                break;
            } 
        })
 
        return promise2
    }
}

Promise1.resolve = (val)=> { 
  return new Promise1((resolve, reject)=>{
      resolve(val)
  })
}


new Promise1((res, rej)=> {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(100)
        },100)
    }).then(data=> {
        console.log('s:'+data)
    })
})
Promise1.resolve(new Promise1((res, rej)=>{
    setTimeout(()=> {
        res(999)
    })
})).then((data)=>{
    console.log(data)
})


// 分析
    // constructor executor执行器立即执行， 参数对应resolve和reject
    // pending到fulfilled/rejected
    // then对应成功回调onFulfilled,失败回调onRejected,参数可省略
    // pendding态需要预存回调,状态确定后依次执行(发布订阅)
    // then返回promise 


// promises-aplus-tests 
Promise1.deferred = function() {
    var result = {};
    result.promise = new Promise1(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    
    return result;
};
    
module.exports = Promise1;