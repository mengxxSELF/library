/* utils Dom �� */
var utils = (function () {
    var flag = 'getComputedStyle' in window;



    function getByClass(strClass,obj){
        //getByClass ����class��ȡԪ��   p 2 r []
        obj=obj||document;
        if(flag){
            // ��׼�������  ֱ�ӷ���
            return Array.prototype.slice.call(obj.getElementsByClassName(strClass));
        }
        // �ַ���ת���� ����Ԫ��
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
        return reg.test(obj.className);  // ���ز���ֵ
    }
    function addClass(obj,strClass){
        // �ַ���ת���� ���� �ж���û��className
        var aryClass = strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            var cur = aryClass[i];
            if(!utils.hasClass(obj,cur)){
                obj.className+=' '+cur;
            }
        }
    }
    function removeClass(obj,strClass){
        // �ַ���ת���� ���� �ж���û��className
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
        // ��ȡcss ��ʽ  opacity
        var val=null;
        var reg=null;
        if(flag){
            // ��׼
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
        // ����λ  20px pt em rem
        reg= /^([+-])?(\d+(\.\d+)?)(px|pt|em|rem)?$/gi;
        return reg.test(val)?parseFloat(val):val;
    }
    function setCss(obj,attr,val){
        //��Ԫ������һ����ʽ  opacity float  ��λ

        if(attr=='float'){
            obj.style.cssFloat=obj.style.styleFloat=val;
            return;
        }

        if(attr=='opacity'){
            obj.style.opacity=val;
            obj.style.filter = 'alpha(opacity='+val+')';
            return
        }
        // ����λ  width height left bottom right top  margin padding ���� 100%
        var reg = /^(width|height|left|bottom|right|top|(margin|padding(left|bottom|right|top)?))$/;

        if(reg.test(attr)){
            // ע��100% auto ��ʱ�򲻼ӵ�λ
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
        // 3������ ����һ��css
        if(arguments.length==3){
            utils.setCss(obj,arg1,arg2);
        }
        if(arguments.length==2){
            // ��������  ��ȡ��������һ����ʽ
            if(typeof arg1=='string'){
                // ��ȡһ����ʽ
                utils.getCss(obj,arg1)
            }
            if(typeof arg1=='object'){
                // ����һ����ʽ
                utils.setGroupCss(obj,arg1)
            }
        }
    }

    return {
        makeArray:makeArray,
        //getByClass ����class��ȡԪ��
        getByClass:getByClass ,
        //8 hasClass �ж�Ԫ���Ƿ����class
        hasClass:hasClass,
            //9 addClass ��Ԫ�ؼ���class
        addClass:addClass,
        //10 removeClass ��Ԫ���Ƴ�class
        removeClass:removeClass,
            //11 getCss ��ȡcss ��ʽ
        getCss:getCss,
            //12 setCss ����һ��css��ʽ
        setCss:setCss,
        //13 setGroupCss ��������css
        setGroupCss:setGroupCss,
            //14 css �� ��ȡ ����һ��
        css:css
    }
})()