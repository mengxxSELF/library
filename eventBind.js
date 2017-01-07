/* 事件库  绑定 解绑  */
// 在IE下有 1 顺序问题 2 this指向问题 3 多次重复执行

//   bind(oDiv,'click',fn1);

//  处理不同事件 同一方法问题


function bind(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn);
    }else { // IE
        var tmp= function () {
            fn.call(obj); // 改变this指向 指向到正确的obj
        };
        tmp.name = fn; // 添加一个私有属性name 用来进行区分

        // 添加到自定义事件池  起到筛选功能  然后在放入系统事件池里面
        if(!obj[type+'aEvent']){
            obj[type+'aEvent']=[];
        }

        // 自定义事件池 [fn1 fn2]   每次行为发生时 判断自定义事件池中 没有该函数 则推入
        var aE = obj[type+'aEvent'];
        for(var i=0;i<aE.length;i++){
            if(aE[i].name==fn) return;
        }
        aE.push(tmp);
        obj.attachEvent('on'+type,obj.tmp);
    }
}

function unbind(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn);
    }else{ // IE
        // 从事件池中删除 fn
        var aE = obj[type+'aEvent'];
        if(aE.length<=0) return; // 如果长度小于1 直接返回
        for(var i=0;i<aE.length;i++){
            if(aE[i].name==fn){
                obj.detachEvent('on'+type,obj.tmp); // 在系统事件池中 也进行删除
                // 注意这里的删除事件要写在事件池删除之后 不然会发生数组塌陷
                aE.splice(i,1); // 在自定义事件池中 也要删除该事件
            }
        }

    }
}

