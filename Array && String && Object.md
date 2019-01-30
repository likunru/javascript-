### Array 常用方法 
1. indexOf() 返回数组中第一个与指定值相等的元素索引
2. splice() 给数组删除或添加任意个元素
3. reverse() 倒序排序
4. sort() 正序排序
5. concat() 合并数组
6. includes()  判断数组是否包含某指定值
7. filter() 将所有在过滤函数中返回true的数组元素放进一个新数组中并返回
8. keys(),values(), entries()
9. map() 返回一个由回调函数的返回值组成的新数组
10. reduce() 从左到右为数组每个元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中，传给下次回到函数，并返回最后一次回调函数的返回值


### String 常用方法
1. indexOf() 从字符串对象中返回首个被发现的给定值的索引值
2. concat() 连接两个字符串文本
3. includes() 判断一个字符串是否包含其他字符串
4. repeat() 返回一个新的字符串，该字符串包含被连接在一起的指定数量的字符串的副本
5. replace() 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串
6. split() 将字符串分隔成字符串数组
7. trim() 去除字符串开始和结尾的空格



### Object 常用方法
1. Object.assign() 通过复制一个或多个对象来创建一个新的对象
2. Object.entries() 返回给定对象自身可枚举属性的[key, value]数组
3. Object.getOwnPropertyNames() 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名
4. Object.is() 比较两个值是否相同。 所有NaN值都相等
5. Object.keys() 返回一个包含所有给定对象自身可枚举属性名称的数组
6. Object.values() 返回给定对象自身可枚举值的数组
7. Object.prototype.hasOwnProperty() 返回一个布尔值，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
8. Object.prototype.isPrototypeOf() 返回一个布尔值，表示指定的对象是否在本对象的原型链中
9. Object.defineProperty() 给对象添加一个属性并指定该属性的配置