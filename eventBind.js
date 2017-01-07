/* �¼���  �� ���  */
// ��IE���� 1 ˳������ 2 thisָ������ 3 ����ظ�ִ��

//   bind(oDiv,'click',fn1);

//  ����ͬ�¼� ͬһ��������


function bind(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn);
    }else { // IE
        var tmp= function () {
            fn.call(obj); // �ı�thisָ�� ָ����ȷ��obj
        };
        tmp.name = fn; // ���һ��˽������name ������������

        // ��ӵ��Զ����¼���  ��ɸѡ����  Ȼ���ڷ���ϵͳ�¼�������
        if(!obj[type+'aEvent']){
            obj[type+'aEvent']=[];
        }

        // �Զ����¼��� [fn1 fn2]   ÿ����Ϊ����ʱ �ж��Զ����¼����� û�иú��� ������
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
        // ���¼�����ɾ�� fn
        var aE = obj[type+'aEvent'];
        if(aE.length<=0) return; // �������С��1 ֱ�ӷ���
        for(var i=0;i<aE.length;i++){
            if(aE[i].name==fn){
                obj.detachEvent('on'+type,obj.tmp); // ��ϵͳ�¼����� Ҳ����ɾ��
                // ע�������ɾ���¼�Ҫд���¼���ɾ��֮�� ��Ȼ�ᷢ����������
                aE.splice(i,1); // ���Զ����¼����� ҲҪɾ�����¼�
            }
        }

    }
}

