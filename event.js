/* �¼���
* ˼· �� fn ���Զ����¼���  Ȼ����ϵͳ�¼����з���һ��run����
* */
// on off  run

//  �¼���  1 ���ݴ��� 2 �Զ����¼���
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false); // ��֤�¼�������ð�ݽ׶�
    }else{
        // ie ��ͬattachEvent ������������� 1 this 2 �ظ�ִ�� 3 ˳��
        if(!obj[type+'onEvent']){
            obj[type+'onEvent']=[];
            obj.attachEvent('on'+type, function () {
                run.call(obj); // ������ȷ��thisָ��
            }); //  ֻ��һ�� -�� ����ظ�ִ��
        }
        var aE = obj[type+'onEvent'];
        // ����fn ֮ǰ��Ҫ�Ƚ����ж�
        for(var i=0;i<aE.length;i++){
            if(aE[i]==fn) return;
        }
        aE.push(fn);
    }
}

// ˳��ִ�������з���
function run(e){
    e=window.event; // run ����ֻ��IE��ʹ�� ����������¼�����ʹ�ò���e
    // ����һ�� ��ļ�������
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
                // ��һ��������ʱ�� ��ִ��
                aE[i].call(this,e);// ��thisָ��ǰԪ��
            }else{
                aE.splice(i,1);
                i--; // ��ֹ��������
            }
        }
    }
}

// ���  ֻҪ����Զ���������fn
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        //ie
        var aE = obj[type+'onEvent'];
        if(aE && aE.length){
            for(var i=0;i<aE.length;i++){
                if(aE[i]==fn){
                    aE[i]=null; // ���ܽ���ɾ������
                    return;
                }
            }
        }
    }
}

