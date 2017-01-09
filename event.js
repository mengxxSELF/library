/* 事件库
* 思路 将 fn 放自定义事件池  然后在系统事件池中放入一个run方法
* */
// on off  run

//  事件绑定  1 兼容处理 2 自定义事件池
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false); // 保证事件发生在冒泡阶段
    }else{
        // ie 视同attachEvent 但是这个有问题 1 this 2 重复执行 3 顺序
        if(!obj[type+'onEvent']){
            obj[type+'onEvent']=[];
            obj.attachEvent('on'+type, function () {
                run.call(obj); // 保持正确的this指向
            }); //  只绑定一次 -》 解决重复执行
        }
        var aE = obj[type+'onEvent'];
        // 放入fn 之前需要先进行判断
        for(var i=0;i<aE.length;i++){
            if(aE[i]==fn) return;
        }
        aE.push(fn);
    }
}

// 顺序执行数组中方法
function run(e){
    e=window.event; // run 方法只在IE中使用 所以这里的事件对象不使用参数e
    // 处理一下 别的兼容问题
    e.target =e.srcElement;
    e.pageX =(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY =(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault = function (e) {
        e.returnValue=false;
    };
    e.stopPropagation= function (e) {
        e.cancelBubble=true;
    };
    var aE = this[e.type+'onEvent']
    if(aE && aE.length){
        for(var i=0;i<aE.length;i++){
            if(typeof aE[i] == 'function'){
                // 是一个函数的时候 才执行
                aE[i].call(this,e);// 将this指向当前元素
            }else{
                aE.splice(i,1);
                i--; // 防止数组塌陷
            }
        }
    }
}

// 解绑  只要清楚自定义数组中fn
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        //ie
        var aE = obj[type+'onEvent'];
        if(aE && aE.length){
            for(var i=0;i<aE.length;i++){
                if(aE[i]==fn){
                    aE[i]=null; // 不能进行删除操作
                    return;
                }
            }
        }
    }
}

