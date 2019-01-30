// 1.图片的加载
const preloadImage = function (path) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    })
}

// 2. 用promise实现一个简单的axios
const getJson = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
           if (this.readyState !== 4) {
               return;
           }
           if (status === 200) {
               resolve(this.response);
           } else {
               reject(new Error(this.statusText));
           }
        };
        const client = new XMLHttpRequest();
        client.open('get', url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader('Accept', "application/json");
        client.send();
    })
    return promise;
}

// 调用getJson
getJson('/post').then((res) => {
    console.log('responseData' + res)
},(err) => {
    console.log('err', err)
})

// 一步一步实现promise
// pedding(进行中)、fulfilled(已成功)、rejected(已失败)
function Promise (executor) {
    var self = thiss;
    self.status = 'pedding'; // promise当前状态
    self.data = undefined; // promise的值
    self.onResolvedCallback = []; // promise resolve回调函数集
    self.onRejectedCallback = []; // promise reject回调函数集

    executor(resolve, reject) // 执行excutor并传入响应的参数

    try {
        executor(resolve.bind(this), reject.bind(this))
    } catch (e) {
        reject.bind(this)(e)
    }
}

function resolve (value) {
  if (value instanceof Promise) {
      return value.then(resolve, reject)
  }  

  setTimeout(function () {
    if (self.status === 'pedding') {
        self.status = 'fulfilled';
        self.data = value;
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
            self.onResolvedCallback[i](value);
        }
    }
  })
}

function reject (reason) {
   setTimeout(function(){
    if (self.status === 'pedding') {
        self.status = 'rejected';
        self.data = reason;
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason);
        }
    } 
   })
}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;

    var promise2
    // 根据标准，如果then参数不是function，则我们需要忽略他
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {return v};
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) {return r};

    if (self.status === 'fulfilled') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onResolved(self.data)
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
            
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onRejected(self.data)
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (self.status === 'pedding') {
        return promise2 = new Promise(function(resolve, reject) {
            
        })
    }
 }

 Promise.prototype.catch = function (onRejected) {
     return this.then(null, onRejected)
 }