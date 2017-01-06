/* utils Dom 库 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;



    function getByClass(strClass,obj){
        //getByClass 根据class获取元素   p 2 r []
        obj=obj||document;
        if(flag){
            // 标准浏览器下  直接返回
            return Array.prototype.slice.call(obj.getElementsByClassName(strClass));
        }
        // 字符串转数组 遍历元素
        var aryClass = strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        var domList = obj.getElementsByTagName('*');

        var domAry=[];
        for(var i=0;i<domList.length;i++){
            var cur=domList[i];
            var flag=true;
            for(var j=0;j<aryClass.length;j++){
                var reg = new RegExp('(^| +)'+aryClass[j]+'( +|$)','g');
                if(!reg.test(cur.className)){
                    flag=false;
                    break;
                }
            }
            if(flag){
                domAry.push(cur)
            }
        }
        return domAry;
    }
    function hasClass(obj,strClass){
        var reg=new RegExp('(^| +)'+strClass+'( +|$)');
        return reg.test(obj.className);  // 返回布尔值
    }
    function addClass(obj,strClass){
        // 字符串转数组 遍历 判断有没有className
        var aryClass = strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            var cur = aryClass[i];
            if(!utils.hasClass(obj,cur)){
                obj.className+=' '+cur;
            }
        }
    }
    function removeClass(obj,strClass){
        // 字符串转数组 遍历 判断有没有className
        var aryClass = strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            var cur = aryClass[i];
            if(utils.hasClass(obj,cur)){
                var reg = new RegExp('(^| +)'+cur+'( +|$)','gi')
                obj.className = obj.className.replace(reg,' ');
            }
        }
    }
    function getCss(obj,attr){
        // 获取css 样式  opacity
        var val=null;
        var reg=null;
        if(flag){
            // 标准
            val = getComputedStyle(obj,false)[attr];
        }else{
            // IE  filter:alpha(opacity=20)
            if(attr=='opacity'){
                reg=/^alpha\(opacity[:=](\d+)\)$/gi;
                //if(reg.test(obj.currentStyle.filter)){
                //    val= RegExp.$1/100;
                //}else{
                //    val=1;
                //}
                return reg.test(obj.currentStyle.filter)?RegExp.$1/100:1;
            }else{
                val = obj.currentStyle[attr];
            }
        }
        // 处理单位  20px pt em rem
        reg= /^([+-])?(\d+(\.\d+)?)(px|pt|em|rem)?$/gi;
        return reg.test(val)?parseFloat(val):val;
    }
    function setCss(obj,attr,val){
        //给元素设置一个样式  opacity float  单位

        if(attr=='float'){
            obj.style.cssFloat=obj.style.styleFloat=val;
            return;
        }

        if(attr=='opacity'){
            obj.style.opacity=val;
            obj.style.filter = 'alpha(opacity='+val+')';
            return
        }
        // 处理单位  width height left bottom right top  margin padding 处理 100%
        var reg = /^(width|height|left|bottom|right|top|(margin|padding(left|bottom|right|top)?))$/;

        if(reg.test(attr)){
            // 注意100% auto 的时候不加单位
            if( !(/(%|auto)/gi).test(val) ){
                val= parseInt(val)+'px';
            }
        }
        obj.style[attr] =val;
    }
    function setGroupCss(obj,attrObj){
        for(var attr in attrObj){
            utils.setCss(obj,attr,attrObj[attr])
        }
    }
    function css(obj,arg1,arg2){
        // 3个参数 设置一个css
        if(arguments.length==3){
            utils.setCss(obj,arg1,arg2);
        }
        if(arguments.length==2){
            // 两个参数  获取或者设置一组样式
            if(typeof arg1=='string'){
                // 获取一个样式
                utils.getCss(obj,arg1)
            }
            if(typeof arg1=='object'){
                // 设置一组样式
                utils.setGroupCss(obj,arg1)
            }
        }
    }

    return {
        makeArray:makeArray,
        //getByClass 根据class获取元素
        getByClass:getByClass ,
        //8 hasClass 判断元素是否包含class
        hasClass:hasClass,
            //9 addClass 给元素加上class
        addClass:addClass,
        //10 removeClass 给元素移除class
        removeClass:removeClass,
            //11 getCss 获取css 样式
        getCss:getCss,
            //12 setCss 设置一个css样式
        setCss:setCss,
        //13 setGroupCss 批量设置css
        setGroupCss:setGroupCss,
            //14 css 集 获取 设置一体
        css:css
    }
})()