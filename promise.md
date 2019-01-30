### Promise特性
promise有点类似于事件侦听器，但有一下两点区别：
1. promise只成功或失败一次，而不能成功或失败两次，也不能从成功转为失败或从失败转为成功。
2. 如果promise已成功或失败，且您之后添加了成功/失败回调，则将会调用正确的回调，即使事件发生在先。
#### Promise捕获错误与 try catch等同
  js中能用的错误捕获也只能是try catch了，而try catch只能捕获同步错误，并且在没有传入错误监听的时候会将捕获到的错误抛出。

手写promise的try catch回调代调

#### Promise拥有状态变化
Promise是一个状态的容器，当状态被凝固了，后面的resolve或reject就不会被触发了。就是同一个个Promise只能触发一个状态监听（onFullfilled或onRejected）。

#### Promise方法中的回调是异步的
promise中then、catch、finally中的回调都是异步执行的

promise的then方法返回一个新的promise,而不是返回this.


#### Promise会存储返回值

#### Promise方法每次都返回一个新的Promise

``` javascript
function Promise(fn) { // 接收一个异步函数
   this._state = 0 // 状态标记
   this._value = undefined // 存储返回值
   doResolve(fn, this)
}

function doResolve(fn, self) {
    let  done = false // 保证只能执行一次
    try {
        fn(function(value) {
           if (done) return
           done = true
           resolve(self,value)
        },
        function(reason){
            if (done) return
            done = true
            reject(self, value)
        })
    } catch (err) {
        if (done) return
        done = true
        reject(self, err)
    }
}

Promise.prototype.then = function(onFullfilled, onRejected) {
    try {
       onFullfilled(value)
    } catch (err) {
        reject(err)
    }
}
function resolve(self, newValue) {
    try {
        self._state = 1
    }
    catch(err) {
        reject(self, err)
    }
}
function reject(self, newValue) {
    self._state = 2
    ...
    if (!self._handled) {
        Promise._unhandledRejectionFn(self._value)
    } 
}

function handle(self, deferred) {
    ...
    setTimeout(function(){
        let cb = self._state === 1?deferred.onFullfilled : deferred.onRejected
        if (cb === null) {
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value)
            return
        }
        var ret
        try{
            ret = cb(self._value)
        } catch(err) {
            reject(deferred.promise, e)
            return
        }
        resolve(deferred.promise, ret)
    }, 0)
}
```