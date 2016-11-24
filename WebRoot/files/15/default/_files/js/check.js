//������
function CheckForm(oForm)
{
    var els = oForm.elements;
    //�������б�Ԫ��
    for(var i=0;i<els.length;i++)
    {
        //�ж�input�Ƿ���Ҫ��֤
		check=els[i].getAttribute("check"); 
		warning=els[i].getAttribute("warning"); 
        if(check)
        {
            //ȡ����֤�������ַ���
            var sReg = check;
            //ȡ�ñ���ֵ,��ͨ��ȡֵ����
            var sVal = GetValue(els[i]);
            //�ַ���->������ʽ,�����ִ�Сд
            var reg = new RegExp(sReg,"i");
            if(!reg.test(sVal))
            {
                //��֤��ͨ��,������ʾwarning
                alert(warning);
                //�ñ�Ԫ��ȡ�ý���,��ͨ�÷��غ��� 
                GoBack(els[i])  
                return false;
            }
        }
    }
}


//ͨ��ȡֵ�������������ȡֵ
//�ı������,ֱ��ȡֵel.value
//����ѡ,��������ѡ��ȡ�ñ�ѡ�еĸ������ؽ��"00"��ʾѡ������
//���������˵�,��������ѡ��ȡ�ñ�ѡ�еĸ������ؽ��"0"��ʾѡ��һ��
function GetValue(el)
{
    //ȡ�ñ�Ԫ�ص�����
    var sType = el.type;
    switch(sType)
    {
        case "text":
			el.value=Trim(el.value);
        case "hidden":
        case "password":
        case "file":
        case "textarea": 
			el.value=Trim(el.value);
			return el.value;
        case "checkbox":
        case "radio": return GetValueChoose(el);
        case "select-one":
        case "select-multiple": return GetValueSel(el);
    }
    //ȡ��radio,checkbox��ѡ����,��"0"����ʾѡ�еĸ���,����д�����ʱ��Ϳ���ͨ��0{1,}����ʾѡ�и���
    function GetValueChoose(el)
    {
        var sValue = "";
        //ȡ�õ�һ��Ԫ�ص�name,�������Ԫ����
        var tmpels = document.getElementsByName(el.name);
        for(var i=0;i<tmpels.length;i++)
        {
            if(tmpels[i].checked)
            {
                sValue += "0";
            }
        }
        return sValue;
    }
    //ȡ��select��ѡ����,��"0"����ʾѡ�еĸ���,����д�����ʱ��Ϳ���ͨ��0{1,}����ʾѡ�и���
    function GetValueSel(el)
    {
        var sValue = "";
        for(var i=0;i<el.options.length;i++)
        {
            //��ѡ��������ʾѡ������Ϊvalue=""
            if(el.options[i].selected && el.options[i].value!="")
            {
                sValue += "0";
            }
        }
        return sValue;
    }
}

//ͨ�÷��غ���,��֤ûͨ�����ص�Ч��.���������ȡֵ
//�ı������,��궨λ���ı�������ĩβ
//����ѡ,��һѡ��ȡ�ý���
//���������˵�,ȡ�ý���
function GoBack(el)
{
    //ȡ�ñ�Ԫ�ص�����
    var sType = el.type;
	var sFather=el.name.toLowerCase().substr(0,1);
	var iexit=eval('document.all.'+sFather+'check?1:0');

	if (iexit==1){
		eval('document.all.'+sFather+'check.checked=""');
		show(sFather);
	}	

    switch(sType)
    {
        case "text":
        case "hidden":
        case "password":
        case "file":
        case "textarea": el.focus(); //var rng = el.createTextRange(); rng.collapse(false); rng.select();
        case "checkbox":
        case "radio": var els = document.getElementsByName(el.name);els[0].focus();
        case "select-one":
        case "select-multiple":el.focus();
    }
}

  function show(obj)
  {
  var tmp=eval('document.all.'+obj+'check.checked');//eval('document.all.'+obj+'check.checked');
	if (tmp!=true)
		{
		eval("document.all."+obj+".style.display=''");
		eval('document.all.'+obj+'check.checked=true');
		eval('document.getElementById("'+obj+'Close").innerHTML="[<span class=webdings>5</span>����]"');	
		}else{
		eval("document.all."+obj+".style.display='none'");
		eval('document.all.'+obj+'check.checked=false');
		eval('document.getElementById("'+obj+'Close").innerHTML="[<span class=webdings>6</span>չ��]"');	   
	   }
	}

function LTrim(str) 
{ 
	var i; 
	for(i=0;i<str.length;i++) 
	{ 
		if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break; 
	} 
	str=str.substring(i,str.length); 
	return str; 
} 
function RTrim(str) 
{ 
	var i; 
	for(i=str.length-1;i>=0;i--) 
	{ 
		if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break; 
	} 
	str=str.substring(0,i+1); 
	return str; 
} 
function Trim(str) 
{ 
	return LTrim(RTrim(str)); 
} 


function checkValue(obj){
		check=obj.getAttribute("check");
		
		warning=obj.getAttribute("warning");
		obj.value=Trim(obj.value);
        if(check)
        {
            //ȡ����֤�������ַ���
            var sReg = check;
            //ȡ�ñ���ֵ,��ͨ��ȡֵ����
            var sVal = obj.value;
            //�ַ���->������ʽ,�����ִ�Сд
            var reg = new RegExp(sReg,"i");
            if(!reg.test(sVal))
            {
                //��֤��ͨ��,����Ϊwarning
				eval("document.getElementById('"+obj.name+"Info').innerHTML='<span class=\"wInfo\">"+warning+"</span>';")
                //�ñ�Ԫ��ȡ�ý���,��ͨ�÷��غ���
                GoBack(obj)  
                return false;
            }else{
				//��֤ͨ��,����Ϊͨ��
				eval("document.getElementById('"+obj.name+"Info').innerHTML='<span class=\"rInfo\">������ȷ.</span>';")
			}
        }
}

function check2Pass(objA,objB){
	//objAΪold,//objBΪnew	
	if(objA.value==objB.value){
		eval("document.getElementById('"+objB.name+"Info').innerHTML='<span class=\"rInfo\">������ȷ.</span>';")
	}else{
		eval("document.getElementById('"+objB.name+"Info').innerHTML='<span class=\"wInfo\">�����������벻��ͬ</span>';")
	}
}