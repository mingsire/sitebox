// JavaScript Document
function getDomainList(type){
	if(type=='1'||type=='0'){
		$.get("/ajaxs/getDomainList.ajax.php",function(data){
			if(data!=null){
				$("#domainlist").html('<li class="list-items"><a url="nDomainList.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>��������</a></li>'+data);
				setLesten2();
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	} 
	if(type=='2'||type=='0'){
		$.get("/ajaxs/getVhostList.ajax.php?prefix="+window.FolderListTypeShow,function(data){
			if(data!=null){
				switch(window.FolderListTypeShow){
					case 'H':
						//����
						$("#vhostlist").html('<li class="list-items"><a url="nVhost.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>��������</a></li>'+data);
						break;
					case 'F':
						//ħ��
						$("#vhostlist").html('<li class="list-items"><a url="nVhostPifa.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>��������</a></li>'+data);
						break;
					case 'D':
						//���ݿ�
						$("#vhostlist").html('<li class="list-items"><a url="nDB_list.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>�������ݿ�</a></li>'+data);
						break;
				}
				setLesten3();
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	}
	if(type=='3'||type=='0'){
		$.get("/ajaxs/getVhostList.ajax.php?prefix=E",function(data){
			if(data!=null){
				$("#youjulist").html('<li class="list-items"><a url="nEmail.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>�����ʾ�</a></li>'+data);
				setLesten4();
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	}
	if(type=='4'||type=='0'){
		$.get("/ajaxs/getVhostList.ajax.php?prefix=X",function(data){
			if(data!=null){
				$("#folderX").html('<li class="list-items"><a url="nNicebox.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>���б���</a></li>'+data);
				setLestenFolder('X');
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	}
	if(type=='5'||type=='0'){
		$.get("/ajaxs/getVhostList.ajax.php?prefix="+window.FolderListTypeShowServer,function(data){
			if(data!=null){
				switch(window.FolderListTypeShowServer){
					case 'Y':
						//��
						$("#folderY").html('<li class="list-items"><a url="nCloud.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>��������</a></li>'+data);
						break;
					case 'I':
						//����
						$("#folderY").html('<li class="list-items"><a url="nNidc.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>��������</a></li>'+data);
						break;
				}
				setLestenFolder('Y');
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	}
	/*if(type=='6'||type=='0'){ 
		$.get("/ajaxs/getVhostList.ajax.php?prefix=C",function(data){
			if(data!=null){
				
				$("#folderC").html('<li class="list-items"><a url="nNc_list.php?folder=all" class="list-items-link"><i class="fa fa-folder"></i>������վ����</a></li>'+data);
				
				setLestenFolder('C');
				if(!window.isMobile){$("#left-menu-two").getNiceScroll().resize();}
			}
		});
	}*/
}
var FolderListTypeShowServer='Y';
var FolderListTypeShow='H';
function changeFolderListShow(type){
	switch(type){
		case 'H':
			//����
			$("#folder-title-show").html("�����ļ���<a href=\"javascript:void(0)\" class=\"fa fa-plus-square\" style=\"color: #aaa;vertical-align: -1px;padding-left: 8px;text-indent: 0;\" onClick=\"return openWindows(0,'','H');\"></a>");
			window.FolderListTypeShow='H';
			break;
		case 'F':
			//ħ��
			$("#folder-title-show").html("ħ���ļ���<a href=\"javascript:void(0)\" class=\"fa fa-plus-square\" style=\"color: #aaa;vertical-align: -1px;padding-left: 8px;text-indent: 0;\" onClick=\"return openWindows(0,'','F');\"></a>");
			window.FolderListTypeShow='F';
			break;
		case 'D':
			//���ݿ�
			$("#folder-title-show").html("���ݿ��ļ���<a href=\"javascript:void(0)\" class=\"fa fa-plus-square\" style=\"color: #aaa;vertical-align: -1px;padding-left: 8px;text-indent: 0;\" onClick=\"return openWindows(0,'','D');\"></a>");
			window.FolderListTypeShow='D';
			break;
	}
	getDomainList('2');
}
function changeFolderListServerShow(type){
	switch(type){
		case 'Y':
			//������
			$("#folder-title-show-server").html("�������ļ���<a href=\"javascript:void(0)\" class=\"fa fa-plus-square\" style=\"color: #aaa;vertical-align: -1px;padding-left: 8px;text-indent: 0;\" onClick=\"return openWindows(0,'','Y');\"></a>");
			window.FolderListTypeShowServer='Y';
			break;
		case 'I':
			//����������
			$("#folder-title-show-server").html("���������ļ���<a href=\"javascript:void(0)\" class=\"fa fa-plus-square\" style=\"color: #aaa;vertical-align: -1px;padding-left: 8px;text-indent: 0;\" onClick=\"return openWindows(0,'','I');\"></a>");
			window.FolderListTypeShowServer='I';
			break;
	}
	getDomainList('5');
}
function delFolder(id,name){
	if(window.confirm('ȷ��ɾ�� '+name+' �ļ�����')){
		$.post('../ajaxs/folderAction.ajax.php',{'act':'delfolder','folderid':id},function(rdate){
			if(rdate==null){
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			}else if(rdate.flag=='1'){
				getDomainList('0');
				if(rdate.msg!=''){
					//rdate.msg=decodeURI(rdate.msg);
					showMsg(rdate.msg);
				}else{
					showMsg('�����ɹ�');
				}
				return;	
			}else if(rdate.msg!=''){
				//rdate.msg=decodeURI(rdate.msg);
				showMsg(rdate.msg);
				return;	
			}else{
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			}
		},"json").error(function(){
			showMsg("��������ʧ�ܣ������ԣ�");
			return;	
		});
	}
}
var folderType='0';//folderid
var subFolderType=0;
function subFolder(){
	/*if(window.subFolderType==0){*/
		if(window.folderType=='0'){
			//--------�½�
			if($("#folderName").val()==''){
				alert("����д�ļ�������");
				return;	
			}
			$.post('../ajaxs/folderAction.ajax.php',{'act':'addfolder','prefix':window.subFolderType,'newfolder':$("#folderName").val()},function(rdate){
				if(rdate==null){
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}else if(rdate.flag=='1'){
					closeWindows();
					getDomainList('0');
					if(rdate.msg!=''){
						//rdate.msg=decodeURI(rdate.msg);
						showMsg(rdate.msg);
					}else{
						showMsg('�����ɹ�');
					}
					return;	
				}else if(rdate.msg!=''){
					//rdate.msg=decodeURI(rdate.msg);
					showMsg(rdate.msg);
					return;	
				}else{
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}
			},"json").error(function(){
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			});
			//--------------
		}else{
			//--------------�༭
			if($("#folderName").val()==''){
				alert("����д�ļ�������");
				return;	
			}
			$.post('../ajaxs/folderAction.ajax.php',{'act':'modfolder','folderid':window.folderType,'foldername':$("#folderName").val()},function(rdate){
				if(rdate==null){
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}else if(rdate.flag=='1'){
					closeWindows();
					getDomainList('0');
					if(rdate.msg!=''){
						//rdate.msg=decodeURI(rdate.msg);
						showMsg(rdate.msg);
					}else{
						showMsg('�����ɹ�');
					}
					return;	
				}else if(rdate.msg!=''){
					//rdate.msg=decodeURI(rdate.msg);
					showMsg(rdate.msg);
					return;	
				}else{
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}
			},"json").error(function(){
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			});
		}
	/*}*/
	/*else{
		if(window.folderType=='0'){
			if($("#folderName").val()==''){
				alert("����д�ļ�������");
				return;	
			}
			$.post('../ajaxs/folderAction.ajax.php',{'act':'addfolder','prefix':'H','newfolder':$("#folderName").val()},function(rdate){
				if(rdate==null){
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}else if(rdate.flag=='1'){
					closeWindows();
					getDomainList(1);
					getDomainList(2);
					if(rdate.msg!=''){
						//rdate.msg=decodeURI(rdate.msg);
						showMsg(rdate.msg);
					}else{
						showMsg('�����ɹ�');
					}
					return;	
				}else if(rdate.msg!=''){
					//rdate.msg=decodeURI(rdate.msg);
					showMsg(rdate.msg);
					return;	
				}else{
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}
			},"json").error(function(){
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			});
		}else{
			if($("#folderName").val()==''){
				alert("����д�ļ�������");
				return;	
			}
			$.post('../ajaxs/folderAction.ajax.php',{'act':'modfolder','folderid':window.folderType,'foldername':$("#folderName").val()},function(rdate){
				if(rdate==null){
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}else if(rdate.flag=='1'){
					closeWindows();
					getDomainList(1);
					getDomainList(2);
					if(rdate.msg!=''){
						//rdate.msg=decodeURI(rdate.msg);
						showMsg(rdate.msg);
					}else{
						showMsg('�����ɹ�');
					}
					return;	
				}else if(rdate.msg!=''){
					//rdate.msg=decodeURI(rdate.msg);
					showMsg(rdate.msg);
					return;	
				}else{
					showMsg("��������ʧ�ܣ������ԣ�");
					return;	
				}
			},"json").error(function(){
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			});
		}
	}
	*/
}
function showMsg(msg){
	$(".windowMsg span").html(msg);
	$(".windowMsg").css({"display":"block","opacity":0}).stop().animate({opacity:1},500,function(){
		setTimeout(function(){
			$(".windowMsg").stop().animate({opacity:0},500,function(){
				$(".windowMsg").css({"display":"none"});
			});
		},3000);
	});
}
$(function(){
	/*getDomainList('0');
	ajaxshowmsg();
	if(!isMobile){
		ajaxshowshop();
	}*/
});
$(window).load(function(e) {
    getDomainList('0');
	ajaxshowmsg();
	if(!isMobile){
		ajaxshowshop();
	}
});
function ajaxshowshop(){
	setTimeout(function(){
	$.get("/cart/shoppingcart_ajax.php",{'act':'getcountnumonly'},function(data){
		if(data!=null){
			if(data.flag=="1"){
				$('#showcount').html(data.num);
				setTimeout(ajaxshowshop,29500);
			}
		}
	},"json");
	},500);
}
function ajaxshowmsg(){
	setTimeout(function(){
	$.get("/ajaxs/getNum.ajax.php",{'act':'getNum'},function(data){
		if(data!=null){
			if(data.flag=="1"){
				$('#showMsgCount').html(data.msgCount);
				$('#wt-num').html(data.gdCount);
				$("#ye-num").html(data.userMoney);
				setTimeout(ajaxshowmsg,29500);
			}
		}
	},"json");
	},500);
}
function closeWindows(){
	$("#showWindows_1").stop().animate({opacity:0},500,function(){
		$("#showWindows_1").css({"display":"none"});
	});
	return false;
}
function closeWindows2(){
	$("#showWindows_2").stop().animate({opacity:0},500,function(){
		$("#showWindows_2").css({"display":"none"});
	});
	return false;
}
function openWindows(type,name,folder){
	window.subFolderType=folder;
	window.folderType=type;
	if(type=='0'){
		$("#showWindows_1 #formBox-title").html('����ļ���');
		$("#showWindows_1 #formBox-name").html('�ļ�������');
		$("#folderName").val('');
	}else{
		$("#showWindows_1 #formBox-title").html(name+' �ļ���������');
		$("#showWindows_1 #formBox-name").html('�ļ�������');
		$("#folderName").val(name);
	}
	$("#showWindows_1").css({"display":"block","opacity":0}).stop().animate({opacity:1},500);
	return false;
}
function openWindows2(ids,prefix){
	$("#suffix_father").html('<select class="sec suffixCheack" name="suffix[]" onChange="folderListen(this)"><option value="">���ڼ����ļ����б�...</option></select>');
	$("#formBox-name2").html('&nbsp;');
	$("#folderName2").css({"display":"none"});
	$("#prefix_N").val(prefix);
	$("#ids_N").val(ids);
	$("#folderName2").val('');
	getDomainFolderList(prefix);
	$("#showWindows_2").css({"display":"block","opacity":0}).stop().animate({opacity:1},500);
	return false;
}
function getDomainFolderList(prefix){
	$.get('../ajaxs/getDomainFolder.ajax.php',{'prefix':prefix},function(redate){
		if(redate!=""){
			$("#suffix_father").html(redate);
			if(redate.length==('<select onchange="folderListen(this)" name="suffix[]" class="sec suffixCheack"><option value="+">+��ӵ����ļ���</option></select>').length){
				$("#formBox-name2").html('���ļ�������');
				$("#folderName2").css({"display":"block"});
			}
		}else{
			closeWindows2();
			showMsg("��������ʧ�ܣ������ԣ�");
		}
	}).error(function(){
		closeWindows2();
		showMsg("��������ʧ�ܣ������ԣ�");
	});
}
function folderListen(obj){
	if($(obj).val()=="+"){
		$("#formBox-name2").html('���ļ�������');
		$("#folderName2").css({"display":"block"});
	}else{
		$("#formBox-name2").html('&nbsp;');
		$("#folderName2").css({"display":"none"});
	}
}
function subFolder2(){
	var folder=$(".suffixCheack").val();
	var prefix_N=$("#prefix_N").val();
	var ids_N=$("#ids_N").val();
	var folderName2=$("#folderName2").val();
	if(folder==''){
		showMsg("��ѡ����ӵ����ļ��У�");
		return false;
	}
	if(folder=='+'){
		if(folderName2==''){
			showMsg("����д�ļ������ƣ�");
			return false;	
		}
	}
	$.post('../ajaxs/folderAction.ajax.php',{'act':'add','folderid':folder,'prefix':prefix_N,'ids':ids_N,'newfolder':folderName2},function(rdate){
		if(rdate==null){
			showMsg("��������ʧ�ܣ������ԣ�");
			return;	
		}else if(rdate.flag=='1'){
			closeWindows2();
			getDomainList('0');
			if(rdate.msg!=''){
				//rdate.msg=decodeURI(rdate.msg);
				showMsg(rdate.msg);
			}else{
				showMsg('�����ɹ�');
			}
			return;	
		}else if(rdate.msg!=''){
			//rdate.msg=decodeURI(rdate.msg);
			showMsg(rdate.msg);
			return;	
		}else{
			showMsg("��������ʧ�ܣ������ԣ�");
			return;	
		}
	},"json").error(function(){
		showMsg("��������ʧ�ܣ������ԣ�");
		return;	
	});
}
function delFormFolder(ids,folder){
	if(window.confirm('ȷ��Ҫ�Ƴ��ļ�����')){
		loadTipsStart();
		$.get('../ajaxs/folderAction.ajax.php',{'act':'del','folderid':folder,'ids':ids},function(rdate){
			if(rdate==null){
				loadTipsEnd();
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			}else if(rdate.flag=='1'){
				loadTipsEnd();
				if(rdate.msg!=''){
					showMsg(rdate.msg);
				}else{
					showMsg('�����ɹ�');
				}
				getDomainList('0');
				document.getElementById('frame').contentWindow.location.reload(true);
				return;	
			}else if(rdate.msg!=''){
				loadTipsEnd();
				showMsg(rdate.msg);
				return;	
			}else{
				loadTipsEnd();
				showMsg("��������ʧ�ܣ������ԣ�");
				return;	
			}
		},"json").error(function(){
			loadTipsEnd();
			showMsg("��������ʧ�ܣ������ԣ�");
		});
	}
}