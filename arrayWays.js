/* array 的数组方法探究 */

// filter  过滤函数   两个参数：回调函数 上下文 有返回值[]
Array.prototype.myFilter = function (cb, context) {
    context = context || window;
    var filterEnd = [];
    // 标准浏览器
    if('filter' in Array.prototype){
     return  this.filter(cb,context);
     };
    // IE
    for (var i = 0, len = this.length; i < len; i++) {
        var ifEnd = cb.call(context, this[i], i, this);
        if (ifEnd) {
            filterEnd.push(this[i]); // 如果函数返回值是true  拿到的是当前元素
        }
    }
    return filterEnd;
};
// forEach 遍历 没有返回值
Array.prototype.myForEach = function (cb, context) {
    context = context || window;
    if ('forEach' in  Array.prototype) {
        this.forEach(cb, context);
        return;
    }
    // ie
    for (var i = 0, len = this.length; i < len; i++) {
        cb.call(context, this[i], i, this);
    }
};
// map 遍历 有返回值
Array.prototype.myMap = function (cb, context) {
    var ary = [];
    if ('map' in  Array.prototype) {
        return this.map(cb, context);
    }

    for (var i = 0, len = this.length; i < len; i++) {
        ary.push(cb.call(context, this[i], i, this));
    }
    return ary;
};
