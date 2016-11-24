/*包含map.js,widget.js,PagerView.js,jquery.pagination.js*/
/*map.js*/
document.write('<link rel="stylesheet" type="text/css" href="http://api.map.baidu.com/res/13/bmap.css"/>');
//document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=1.3&key=&services=&t=20121127154746"></script>');//百度地图

document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=DmW4qep2ovbGuFSEPS63LMCf"></script>');//百度地图

/*widget.js*/
//二维码


//留言回复js方法
var MsgCommon = {};
(function (Msg) {
    $(function () {
        $("#validimg").click(function () {
            $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
        });
        Msg.btnClick = function () {

            var fgtitle = I18NSWYLAN.fgTitle;//$("#hidTitle").val();
            var fgMsg = I18NSWYLAN.fgMsg;//$("#hidMsg").val();
            var fgTelPhone = I18NSWYLAN.fgTelPhone; //$("#hidTelPhone").val();
            var fgPhoneType = I18NSWYLAN.fgPhoneType;//$("#hidPhoneType").val();
            var fgMsgSuccess = I18NSWYLAN.fgMsgSuccess; //$("#hidMsgSuccess").val();
            var fgSuccess = I18NSWYLAN.fgSuccess; //$("#hidSuccess").val();
            var fgFail = I18NSWYLAN.fgFail; //$("#hidFail").val();
            var fgNotVild = I18NSWYLAN.fgNotVild; //$("#hidNotVild").val();
            var data = {};
            var CTxtAddent = $.trim($("#lecontent").val());
            var fg = $("#hffg").val();

            var regBox = {

                regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱 

                regName: /^[a-z0-9_-]{3,16}$/,//用户名 

                regMobile: /^0?1[3|4|5|8][0-9]\d{8}$/,//手机 

                regTel: /^0[\d]{2,3}-[\d]{7,8}$/

            }
            if (fg == "True") {
                var vildtxt = $("#vaildtxt").val();
                data.vild = vildtxt;
            }
            if (document.getElementById("hidMesageType")) {
                data.MesageType = $("#hidMesageType").val();//留言类型，MsgType=4为询价
            }
            data.lecontent = $("#lecontent").val();
            data.email = $("#msg_email").val();
            data.telphone = $("#msg_telphone").val();
            data.company = $("#msg_company").val();
            data.phone = $("#msg_phone").val();
            data.address = $("#msg_address").val();
            data.sex = $("input[name='sex']").val();
            data.title = $("#msg_title").val();
            if ($("input[name='msg_ckemail']").attr("checked") == "checked") {
                data.msg_hidchemail = 1;
            }
            else {
                data.msg_hidchemail = 0;
            }
            if ($("input[name='msg_ckphone']").attr("checked") == "checked") {
                data.msg_hidchphone = 1;
            }
            else {
                data.msg_hidchphone = 0;
            }

            var fg = false;
            var msg = "";
            if (data.title.length == 0) {
                msg += fgtitle + ' \n';
            }
            if (CTxtAddent.length == 0) {
                msg += fgMsg + ' \n';
            }
            if (data.telphone.length == 0) {
                //msg += "手机号码为空；\n";
                msg += fgTelPhone + " \n";

            }
            else {
                var mflag = regBox.regMobile.test(data.telphone);
                if (!mflag) {
                    msg += fgPhoneType + " \n";
                }
            }
            if (msg == "") {
                fg = true;
            }
            if (msg != "" && fg == false) {
                alert(msg);
            }
            if (fg) {
            	var RepDay = $("#hidRepDay").val();
            	var IsOpenMsg = $("#hidIsOpenMsg").val();
                $.ajax({
                    type: "post",
                    url: "/Message/MsgAdd",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        if (data != null) {
                            if (data.code == 0) {
                            	if (data.fg == true) {
                            		if (IsOpenMsg > 0) {
                            			alert("欢迎您的咨询，我们会在" + RepDay + "工作日以内给您回复！");
                            		}
                                	$('.logerro_tip').text(fgMsgSuccess);
                                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                }
                                else {
                                    var html = "<li><div class='lg_top'>";
                                    html += "<a href='' class='lg_name'>" + data.names + "</a><span class='lg_time'>" + data.addtime + "</span></div>";
                                    html += "<div class='lg_content'>" + data.cxt + "</div></li>";
                                    $("#msgList").prepend(html);
                                    $('.logerro_tip').text(fgSuccess);
                                    $("#lecontent").val("");
                                    $("#msg_email").val("");
                                    $("#msg_telphone").val("");
                                    $("#msg_company").val("");
                                    $("#msg_phone").val("");
                                    $("#msg_address").val("");
                                    $("#msg_title").val("");
                                	//留言成功后增加自动刷新功能
                                    if (IsOpenMsg > 0) {
                                    	alert("欢迎您的咨询，我们会在" + RepDay + "工作日以内给您回复！");
                                    }
                                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                    setTimeout("location.reload();", 3000);

                                }
                                $("#lecontent").val('');
                            }
                            else if (data.code == 2) {
                                $('.logerro_tip').text(fgNotVild);
                                $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                            }
                            else if (data.code == 1) {
                                $('.logerro_tip').text(fgFail);
                                $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                            }
                        }
                    }
                })
            }
        }
        $(".MsgList").find('.toggle_adreplay').toggle(function (event) {//展开收起回复
            event.preventDefault();
            var fgClose = $("#hidClose").val();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").show();
            $(this).text(fgClose);
        }, function (event) {
            event.preventDefault();
            var fgOpen = $("#hidOpen").val();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").hide();
            $(this).text(fgOpen);
        });
    });
})(MsgCommon);
//2014-08-25 留言扩展回复js方法
var MsgCommonExpend = {};
(function (Msge) {
    $(function () {
        $("#validimg").click(function () {
            $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
        });
        Msge.btnClick = function () {

            var fgContacts = I18NSWYLAN.fgContacts; //$("#hidContacts").val();
            var fgMsg = I18NSWYLAN.fgMsg; //$("#hidMsg").val();
            var fgContact = I18NSWYLAN.fgContact; //$("#hidContact").val();
            var fgTimeFormat = I18NSWYLAN.fgTimeFormat; //$("#hidTimeFormat").val();
            var fgOnlineAppSuccess = I18NSWYLAN.fgOnlineAppSuccess; //$("#hidOnlineAppSuccess").val();
            var fgOAppSuccess = I18NSWYLAN.fgOAppSuccess; //$("#hidOAppSuccess").val();
            var fgOnlineAppFail = I18NSWYLAN.fgOnlineAppFail; //$("#hidOnlineAppFail").val();
            var fgNotVild = I18NSWYLAN.fgNotVild; //$("#hidNotVild").val();

            var data = {};
            var CTxtAddent = $.trim($("#msg_content").val());
            var fg = $("#hffg").val();
            var regBox = {

                regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱 

                regName: /^[a-z0-9_-]{3,16}$/,//用户名 

                regMobile: /^0?1[3|4|5|8][0-9]\d{8}$/,//手机 

                regTel: /^0[\d]{2,3}-[\d]{7,8}$/,

                regDate: /^((((19|20)(([02468][048])|([13579][26]))-02-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((01,3-9])|(1[0-2]))-(29|30)))))$/

            }
            if (fg == "True") {
                var vildtxt = $("#vaildtxt").val();
                data.vild = vildtxt;
            }
            data.company = $("#msg_company").val();
            data.address = $("#msg_address").val();
            data.contacts = $("#msg_contacts").val();
            data.ctype = $("#msg_phone").val();
            data.title = $("#msg_title").val();
            data.model = $("#msg_model").val();
            data.date = $("#msg_time").val();
            data.lecontent = $("#msg_content").val();
            data.leremark = $("#msg_remark").val();
            data.email = "";
            data.telpone = "";
            data.phone = data.ctype;
            if (regBox.regEmail.test(data.ctype)) {
                data.email = data.ctype;
            }
            if (regBox.regMobile.test(data.ctype)) {
                data.telpone = data.ctype;
            }

            var fg = false;
            var msg = "";

            if (CTxtAddent.length == 0) {
                msg += fgMsg + '\n';
            }
            if (data.contacts.length == 0) {
                msg += fgContacts + "\n";
            }
            if (data.phone.length == 0) {
                msg += fgContact + "\n";
            }
            else {
                var mflag = regBox.regDate.test(data.date);
                if (!mflag) {
                    msg += fgTimeFormat + "XXXX-XX-XX \n";
                }
            }
            if (msg == "") {
                fg = true;
            }
            if (msg != "" && fg == false) {
                alert(msg);
            }
            if (fg) {
                $.ajax({
                    type: "post",
                    url: "/Message/MsgExpendAdd",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        if (data != null) {
                            if (data.code == 0) {
                                if (data.fg == true) {
                                    $('.logerro_tip').text(fgOnlineAppSuccess);
                                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                }
                                else {
                                    var html = "<li><div class='lg_top'>";
                                    html += "<a href='' class='lg_name'>" + data.names + "</a><span class='lg_time'>" + data.addtime + "</span></div>";
                                    html += "<div class='lg_content'>" + data.cxt + "</div></li>";
                                    $("#msgList").prepend(html);
                                    $('.logerro_tip').text(fgOAppSuccess);
                                    $("#msg_company").val();
                                    $("#msg_address").val();
                                    $("#msg_contacts").val();
                                    $("#msg_phone").val();
                                    $("#msg_title").val();
                                    $("#msg_model").val();
                                    $("#msg_time").val();
                                    $("#msg_content").val();
                                    $("#msg_remark").val();

                                    //留言成功后增加自动刷新功能
                                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                    setTimeout("location.reload();", 3000);

                                }
                                $("#lecontent").val('');
                            }
                            else if (data.code == 2) {
                                $('.logerro_tip').text(fgNotVild);
                                $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                            }
                            else if (data.code == 1) {
                                $('.logerro_tip').text(fgOnlineAppFail);
                                $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                            }
                        }
                    }
                })
            }
        }
        $(".MsgList").find('.toggle_adreplay').toggle(function (event) {//展开收起回复
            event.preventDefault();
            var fgClose = $("#hidClose").val();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").show();
            $(this).text(fgClose);
        }, function (event) {
            event.preventDefault();
            var fgOpen = $("#hidOpen").val();
            $(this).parents('.adm_reply').find(".replay_lists li:gt(0)").hide();
            $(this).text(fgOpen);
        });
    });
})(MsgCommonExpend);
//留言回复js方法结束
//评论回复js方法
var CommentReply = {};
(function (CRY) {
    $(function () {
        CRY.CP_AddCommentReply = function (id, rid) {

            var fgMsgReply = I18NSWYLAN.fgMsgReply; //$("#hidMsgReply").val();
            var fgReply = I18NSWYLAN.fgReply; //$("#hidReply").val();

            var TXtid = "#lecontentReply" + rid;
            var CTxt = $.trim($(TXtid).val());
            var datas = {};
            datas.lecontent = CTxt;
            datas.msgid = id;
            datas.rid = rid;
            if (CTxt.length == 0) {
                alert(fgMsgReply);
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/message/AddCommentReply",
                    data: datas,
                    success: function (data) {
                        console.log(data);
                        if (data != null) {
                            if (data.Code == 0) {
                                var html = "<li class='rp_li'><div class='lg_top'><a href='#' class='reply_link sec_link'>" + fgReply + "</a>";
                                if (data.RNames == null || data.RNames == '') {
                                    html += "<a href='' class='lg_name'>" + data.Names + "</a>";
                                }
                                else {
                                    html += "<a href='' class='lg_name'>" + data.Names + "</a> @ <a href='' class='lg_name'>" + data.RNames + "</a>";
                                }
                                html += "<span class='lg_time'>" + data.Times + "</span></div>";
                                html += "	<div class='lg_content'>" + data.txt + "</div>";
                                html += "<div class='replay_form sec_form'><div class='rpy_abx'>";
                                html += "<textarea name='lecontentReply" + data.selfid + "' id='lecontentReply" + data.selfid + "' class='second_area'></textarea></div>";
                                html += "<div class=''><a href='#' class='rpy_btn' onclick='return CommentReply.CP_AddCommentReply(" + data.mid + "," + data.selfid + ")'>";
                                html += fgReply + "</a></div></div></li>";
                                var ULID = "#ulReply" + data.mid;
                                $(ULID).prepend(html);
                                var TXtidT = "#lecontentReply" + rid;
                                $(TXtidT).val('');
                                CRY.fir_click();
                                CRY.sec_click();
                            }
                        }
                    }
                })
            }
            return false;
        };
        $("#validimgT").click(function () {
            $("#validimgT").attr('src', '/ValidationCode/CreateImage?' + Math.random());
        });
        CRY.CP_AddComment = function () {

            var fgMsgComment = I18NSWYLAN.fgMsgComment; //$("#hidMsgComment").val();
            var fgCommentSuccess = I18NSWYLAN.fgCommentSuccess; //$("#hidCommentSuccess").val();
            var fgComSuccess = I18NSWYLAN.fgComSuccess; //$("#hidComSuccess").val();
            var fgNotVild = I18NSWYLAN.fgNotVild; //$("#hidNotVild").val();
            var fgReply = I18NSWYLAN.fgReply; //$("#hidReply").val();

            var datas = {};
            var CTxtAdd = $.trim($("#lecontentCom").val());
            datas.ware = $("#cr_hfcid").val();
            datas.wareitemid = $("#cr_hfitemid").val();
            datas.txtNewComment = $("#lecontentCom").val();
            var fg = $("#hffgs").val();
            if (fg == "True") {
                var vildtxt = $("#vaildtxtT").val();
                datas.vild = vildtxt;
            }
            if (CTxtAdd.length == 0) {
                alert(fgMsgComment);
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/message/AddComments",
                    data: datas,
                    success: function (data) {
                        if (data.Code == 0) {
                            if (data.fg == false) {
                                var html = "<li class='for_page'><div class='lg_top'><a href='#' class='reply_link fir_link'>" + fgReply + "<a href='' class='lg_name'>" + data.Names + "</a>";
                                html += "<span class='lg_time'>" + data.Times + "</span></div>";
                                html += "<div class='lg_content'>" + data.Txt + "</div>";
                                html += "<div class='replay_form first_form'>";
                                html += "<div class='rpy_abx'><textarea name='lecontentReply" + data.mid + "' id='lecontentReply" + data.mid + "' class='rpy_area'></textarea></div>";
                                html += "<div class=''><a href='#' class='rpy_btn' onclick='return CommentReply.CP_AddCommentReply(" + data.mid + "," + data.mid + ")'>" + fgReply + "</a></div></div>";
                                html += "<ul id='ulReply" + data.mid + "' class='rp_lists'></ul></li>";
                                $('.lmg_lists').prepend(html);
                                $("#lecontentCom").val('');
                                $('.Com_logerro_tip').text(fgComSuccess);
                                $("#validimgT").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                CRY.fir_click();
                                CRY.sec_click();
                            }
                            else {
                                $('.Com_logerro_tip').text(fgCommentSuccess);
                                $("#validimgT").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                                $("#lecontentCom").val('');
                            }
                        }
                        else if (data.Code == 2) {
                            $('.Com_logerro_tip').text(fgNotVild);
                            $("#validimgT").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                        }
                    }
                });
            }
        };
        CRY.fir_click = function () {
            $('.CommentReply').find('.fir_link').each(function () {
                var data = $(this).data('rclickbinded');
                if (!data) {
                    $(this).click(function (event) {
                        event.preventDefault();
                        $('.CommentReply').find('.first_form').not(this).hide(0);
                        $('.CommentReply').find('.sec_form').hide(0);
                        $(this).parents('.for_page').find('.first_form').show();
                    });
                    $(this).data('rclickbinded', 'rclickbinded');

                }

            });
        };
        CRY.fir_click();
        CRY.sec_click = function () {
            $('.CommentReply').find('.sec_link').each(function () {
                var data = $(this).data('rclickbinded');
                if (!data) {
                    $(this).click(function (event) {
                        event.preventDefault();
                        $('.CommentReply').find('.sec_form').not(this).hide(0);
                        $('.CommentReply').find('.first_form').hide(0);
                        $(this).parents('.rp_li').find('.sec_form').show();
                    });
                    $(this).data('rclickbinded', 'rclickbinded');

                }

            });
        };
        CRY.sec_click();
    })

})(CommentReply)
//评论回复js方法结束

//订单卡号密码验证
var OrderCheck = {};
(function (OCK) {
    $(function () {
        OCK.Order_Check = function () {
            var datas = {};
            datas.cardnum = $("input[name='username']").val();;
            datas.pass = $("input[name='pwd']").val();
            var tzweb = $("input[name='tzweb']").val();
            $.ajax({
                type: "POST",
                url: "/OrderPicking/CheckGift",
                data: datas,
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if (data.Code == 1) {

                            alert('验证成功！');
                            window.location = "/"+tzweb + ".html?gid="+data.giftid;
                        }
                        else if (data.Code == 5) {
                            alert('验证失败-卡号或者密码错误！');
                        }
                        else if (data.Code == 0) {
                            alert('验证失败-卡号未售出！');
                        }
                        else if (data.Code == 2) {
                            alert('已经提货 商家未发货！');
                        }
                        else if (data.Code == 21) {
                            var msg = "快递公司：" + data.express + "; 快递号：" + data.expressnum
                            alert('已经提货 商家已经发货！' + msg);
                        }
                        else if (data.Code == 3) {
                            alert('验证失败-卡号已作废！');
                        }
                        else if (data.Code == 4) {
                            alert('验证失败-卡号已过期！');
                        }
                    }
                }
            })
        }



        OCK.Order_Add = function () {
            var datas = {};
            datas.uname = $("input[name='username']").val();;
            datas.uaddress = $("input[name='useraddress']").val();
            datas.uphone = $("input[name='userphone']").val();
            datas.umsg = $("input[name='usermsg']").val();
            datas.ucode = $("input[name='usercode']").val();
            datas.rid = $("input[name='rid']").val();
            datas.gid = $("input[name='giftid']").val();
            $.ajax({
                type: "POST",
                url: "/OrderPicking/InsertUserInfo",
                data: datas,
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if (data.Code == 1) {
                            alert('提货成功！');
                            window.location = "/" + tzweb + ".html";
                        }
                        else if (data.Code == 10) {
                            alert('提货失败--请联系管理员');
                        }
                        else if (data.Code == 9) {
                            alert('提货失败-无此卡号！');
                        }
                        else if (data.Code == 3) {
                            alert('提货失败-卡号已作废！');
                        }
                        else if (data.Code == 2) {
                            alert('提货失败-卡号已提货！');
                        }
                        else if (data.Code == 0) {
                            alert('提货失败-卡号未售出！');
                        }
                    }
                }
            })
        }
    })
}
)(OrderCheck)








//会员js方法
var MemberJquery = {};
(
function (MBJ) {
    //会员登录
    MBJ.MemberLogin = function () {
        var loginname = $("input[name='username']").val();// $("#username").val();
        var loginpass = $("input[name='pwd']").val(); //$("#pwd").val();
        var data = {};
        if ($("input[name='remLogin']").is(":checked")) {      //判断复选框是否被选中
            data.ckfg = "true";
        }
        else {
            data.ckfg = "false";
        }
        var keyvalue = $("input[name='hidkey']").val(); //$("#hidkey").val();
        if (keyvalue == "true") {
            data.keyvalue = $("input[name='vaildtxt']").val();//$("#vaildtxt").val();
            data.key = "true";
        }
        else {
            data.key = "false";
        }
        data.loginname = loginname;
        data.loginpass = loginpass;
        $.ajax({
            type: "POST",
            url: "/Member/MLogin",
            data: data,
            success: function (data) {
                if (data.Code == 1) {
                    alert(data.Msg);
                    //                    $('.Message_logerro_tip').text(data.Msg);
                    //						var ui = document.getElementById("login_form");
                    //						ui.style.display = "none";
                    //						var ui = document.getElementById("MemberForm");
                    //						ui.style.display = "";
                    window.location.reload();
                    $("input[name='hidmid']").val(data.Mid);
                    $("input[name='hidmname']").val(data.Mname);
                    $("input[name='PMember']").val(data.Mname);
                    //                    $("#hidmid").val(data.Mid);
                    //                    $("#hidmname").val(data.Mname)
                    //                    $("#PMember").text(data.Mname);
                }
                else if (data.Code == 0) {
                    alert(data.Msg);
                    //                       $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                }
                else if (data.Code == 2) {
                    alert(data.Msg);
                    //                        $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                }
                else if (data.Code == 3) {
                    alert(data.Msg);
                    //                         $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());
                }
                else if (data.Code == 4) {
                    alert(data.Msg);
                    $("input[name='PhoneNum']").val(data.MPhone);
                    $("input[name='hidmid']").val(data.Mid);
                    //                    $("#PhoneNum").val(data.MPhone);w
                    //                    $("#hidmid").val(data.Mid);
                    //                         $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());

                }
                else if (data.Code == 5) {
                    alert(data.Msg);
                    //                    $("#EmailUrl").val(data.MEmail);
                    $("input[name='EmailUrl']").val(data.MEmail);
                    //                    $("#hidmid").val(data.Mid);
                    $("input[name='hidmid']").val(data.Mid);
                    //                         $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());

                }
                else if (data.Code == 6) {
                    alert(data.Msg);
                    $("input[name='PhoneNum']").val(data.MPhone);
                    //                    $("#PhoneNum").val(data.MPhone);
                    //                    $("#EmailUrl").val(data.MEmail);
                    $("input[name='EmailUrl']").val(data.MEmail);
                    //                    $("#hidmid").val(data.Mid);
                    $("input[name='hidmid']").val(data.Mid);
                    //                         $('.Message_logerro_tip').text(data.Msg);
                    //                    $("#validimg").attr('src', '/ValidationCode/CreateImage?' + Math.random());

                }
            }
        });
    }
    //会员登出
    MBJ.MemberLoginout = function () {
        if (confirm('确定退出登录吗?')) {
            $.ajax({
                type: "POST",
                url: "/Member/MLoginout",
                data: "",
                success: function (data) {
                    if (data.Code == 1) {
                        window.location.reload();
                    }
                }
            });
        }
    }

}
)(MemberJquery)
//会员js方法结束


// 会员注册
var MembeRegister = {};
(
function (MRE) {
    //短信发送
    MRE.NoteSend = function () {
        var data = {};
        data.PhoneNum = $("input[name='txtUserMobile']").val();// $("#txtUserMobile").val();
        $.ajax({
            type: "POST",
            url: "/Member/PhoneReg",
            data: data,
            success: function (data) {
                if (data.Code == 1) {
                    alert('发送成功');
                }
            }
        })
    }
    //短信验证
    MRE.NoteCheck = function () {
        var data = {};
        data.keycode = $("input[name='txtPhoneNum']").val();// $("#txtPhoneNum").val();
        $.ajax({
            type: "POST",
            url: "/Member/PhoneCodeCheck",
            data: data,
            success: function (data) {
                if (data.Code == 1) {
                    $("#phonefg").val("true");
                    alert('验证成功');
                }
            }
        })
    }
    //邮箱验证
    MRE.EmailSend = function () {
        var data = {};
        data.id = $("input[name='hidmid']").val(); //$("#hidmid").val();
        data.emails = $("input[name='EmailUrl']").val(); //$("#EmailUrl").val();
        $.ajax({
            type: "POST",
            url: "/Member/EmailReg",
            data: data,
            success: function (data) {
                if (data.Code == 1) {
                    alert('发送成功');
                }
            }
        })
    }

    MRE.MemberPhone = function () {
        var code = $("input[name='hidcode']").val();// $("#hidcode").val();
        var phone = $("input[name='txtUserMobile']").val();//$("#txtUserMobile").val();
        var data = {};
        data.code = code;
        data.phone = phone;
        $.ajax({
            type: "POST",
            url: "/Member/MemberRegedit",
            data: data,
            success: function (data) {
                if (data.Code == 1) {
                    // alert(data.Msg);
                }
            }
        });
    }
    MRE.MemberReg = function () {
        var code = $("input[name='hidcode']").val();//$("#hidcode").val();
        var phonenum = $("input[name='txtPhoneNum']").val();//$("#txtPhoneNum").val();
        if (code == phonenum) {
            $("#phonefg").val("true");
        }
        else {
            $("#phonefg").val("false");
        }
    }

}
)(MembeRegister)
//会员注册结束

//Survey
var SurveyComment = {};
(function (Survey) {
    $(function () {

        Survey.toJSON = function (txtOrObj, hasIndent) {
            var data = txtOrObj;
            if (typeof data == 'string') try { data = eval('(' + data + ')') } catch (e) { return "" };
            var draw = [], last = false, isLast = true, indent = 0;
            function notify(name, value, isLast, formObj) {
                if (value && value.constructor == Array) {
                    draw.push((formObj ? ('"' + name + '":') : '') + '[');
                    for (var i = 0; i < value.length; i++) notify(i, value[i], i == value.length - 1, false);
                    draw.push(']' + (isLast ? '' : (',')));
                } else if (value && typeof value == 'object') {
                    draw.push((formObj ? ('"' + name + '":') : '') + '{');
                    var len = 0, i = 0;
                    for (var key in value) len++;
                    for (var key in value) notify(key, value[key], ++i == len, true);
                    draw.push('}' + (isLast ? '' : (',')));
                } else {
                    if (typeof value == 'string') value = '"' + value + '"';
                    draw.push((formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ','));
                };
            };
            notify('', data, isLast, false);
            return draw.join('');
        };

        //提交保存调查结果（挂件模块编号 在线调查编号 调查完成是否需要跳转页面 跳转到的页面）
        Survey.SurveySave = function (modelid, sid, isurl, url) {
            var d = {};
            var tid = '';
            var tclass = '';
            var topic = {};
            var $otemp;
            var tv = 0;
            var flag = true;
            d.surveyid = sid;
            d.answertopics = new Array();
            $('#survey_' + modelid).find('.topic').each(function () {
                topic = {};
                tid = $(this).attr('TopicID');
                tclass = $(this).attr('TopicClass');
                if (!Survey.SurveyValidate(tid, tclass, $(this))) {
                    flag = false;
                }
                if (tclass == "TextArea") {
                    $otemp = $(this).find('textarea');
                    topic.answerid = 0;
                    topic.surveytopicid = tid;
                    topic.value = $otemp.val().trim();
                    d.answertopics.push(topic);
                }
                else if (tclass == "Radio") {
                    topic.answerid = 0;
                    topic.surveytopicid = tid;
                    topic.value = "";
                    $(this).find('input:checked').each(function () {
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv);
                        topic.value += tv;
                        if ($otemp && $otemp.val()) {
                            topic.value += "@" + $otemp.val().trim();
                        }
                    });
                    d.answertopics.push(topic);
                }
                else if (tclass == "CheckBox") {
                    topic.answerid = 0;
                    topic.surveytopicid = tid;
                    topic.value = "";
                    $(this).find('input:checked').each(function () {
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv);
                        topic.value += "|" + tv;
                        if ($otemp && $otemp.val()) {
                            topic.value += "@" + $otemp.val().trim();
                        }
                    });
                    if (topic.value.length > 0) {
                        topic.value = topic.value.substring(1);
                    }
                    d.answertopics.push(topic);
                }
            });
            if (flag) {
                $.ajax({
                    url: "/Survey/SurveySave",
                    data: Survey.toJSON(d),
                    type: "post",
                    dataType: "json",
                    success: function (val) {
                        if (val.Code == 1) {
                            alert(val.Msg);
                            if (isurl) {
                                location.href = url;
                            }
                            Survey.SurveyClear(modelid);
                        }
                        else {
                            alert(val.Msg);
                        }
                    } //success
                }); //ajax
            } //if(flag)
        }; //Survey.SurveySave
        //验证在线调查
        Survey.SurveyValidate = function (tid, tclass, $obj) {
            var $error = $obj.find('#' + tid + '_errormsg')
            var $otemp;
            var tv = 0;
            var flag = true;
            var errflg = true;
            if ($error[0]) {
                $error.text("")
                if (tclass == "TextArea") {
                    $otemp = $obj.find('textarea');
                    if ($otemp.val().trim().length <= 0) {
                        $error.text("请填写答案");
                        errflg = false;
                    }
                }
                else if (tclass == "Radio") {
                    $obj.find('input:checked').each(function () {
                        flag = false;
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv); //$(this).next().next("input:text:");
                        if ($otemp && $otemp.attr('type')) {
                            if ($otemp.val().trim().length <= 0) {
                                $error.text("请填写选择项连带的输入框");
                                errflg = false;
                            }
                        }
                    });
                    if (flag) {
                        $error.text("请填写答案");
                        errflg = false;
                    }
                }
                else if (tclass == "CheckBox") {
                    $obj.find('input:checked').each(function () {
                        flag = false;
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv);
                        if ($otemp && $otemp.attr('type')) {
                            if ($otemp.val().trim().length <= 0) {
                                $error.text("请填写选择项连带的输入框");
                                errflg = false;
                            }
                        }
                    });
                    if (flag) {
                        $error.text("请填写答案");
                        errflg = false;
                    }
                }
            }
            return errflg;
        }; //Survey.SurveyValidate
        //清空选项
        Survey.SurveyClear = function (modelid) {
            $('#survey_' + modelid).find('.topic').each(function () {
                topic = {};
                tid = $(this).attr('TopicID');
                tclass = $(this).attr('TopicClass');
                if (!Survey.SurveyValidate(tid, tclass, $(this))) {
                    flag = false;
                }
                if (tclass == "TextArea") {
                    $otemp = $(this).find('textarea');
                    $otemp.val('');
                }
                else if (tclass == "Radio") {
                    $(this).find('input:checked').each(function () {
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv);
                        $(this).attr("checked", false);
                        if ($otemp && $otemp.val()) {
                            $otemp.val('');
                        }
                    });
                }
                else if (tclass == "CheckBox") {
                    $(this).find('input:checked').each(function () {
                        tv = $(this).attr('value');
                        $otemp = $("#" + tid + "_Text_" + tv);
                        $(this).attr("checked", false);
                        if ($otemp && $otemp.val()) {
                            $otemp.val('');
                        }
                    });
                }
            });
        }; //Survey.SurveyValidate
        //查看投票结果（挂件模块编号 在线调查编号）
        Survey.SurveyOutcome = function (modelid, sid) {
            var OPrefix = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //题目选项前缀
            var data = {};
            data.id = sid;
            //投票结果弹出层
            $("#" + modelid + "_pop").dialog({ "autoOpen": false, "position": ["center", 100], "width": 800, "draggable": false });
            $("#" + modelid + "_pop").dialog("open");
            $.ajax({
                url: '/Survey/SurveyStatistics',
                data: data,
                type: 'post',
                dataType: 'json',
                //async: false,
                beforeSend: function () {

                },
                success: function (v) {//v的格式{Code:0,List[{id:1,type:0,require:true,title:"标题"},{id:2,type:0,require:true,title:"标题"}]}
                    if (v.Code == 1) {//用返回的json拼接结构
                        $("#" + modelid + "_title_pop").text(v.Survey.title); //显示标题
                        var $listpop = $("#" + modelid + "_list_pop");
                        $("#" + modelid + "_list_pop").html("");
                        var temp = "";
                        var opts = [];
                        for (var i = 0; i < v.Survey.surveytopics.length; i++) {
                            temp = "<div>"; //题目的问题 
                            temp += v.Survey.surveytopics[i].title;
                            if (v.Survey.surveytopics[i].isrequired == 1) {
                                temp += " （必填）";
                            }
                            temp += "【<label class=\"topic_style\">" + v.Survey.surveytopics[i].topicclassname;
                            if (v.Survey.mode == "Questionnaire") {
                                temp += "" + v.Survey.surveytopics[i].scores + " 分 ";
                            }
                            temp += "</label>】";
                            temp += "</div>";
                            //题目选项
                            temp += "<div>";
                            if (v.Survey.surveytopics[i].topicclass == "") {//填空题

                            }
                            else {
                                opts = v.Survey.surveytopics[i].options.split("|");
                                for (var j = 0; j < opts.length; j++) {
                                    temp += "" + OPrefix[j] + ". " + opts[j] + "    【选择数：" + v.Survey.surveytopics[i].optionselects[j + 1] + " 人 选择百分比： ";
                                    if (v.Survey.answercount > 0) {
                                        temp += Math.round((v.Survey.surveytopics[i].optionselects[j + 1] / v.Survey.answercount) * 100);
                                    }
                                    else {
                                        temp += "0";
                                    }
                                    temp += "%】<br />";
                                }
                            }
                            temp += "</div>";
                            $listpop.append(temp);
                        }
                    }
                    else if (v.Code == -402) {
                        alert(v.Msg);
                    }
                }
            }); //$.ajax

        };

    })
})(SurveyComment)
//endSurvey

var SharingEvent = {};
(function (se) {
    se.GetUrl = function () {
        var u = window.location.href;
        u = escape(u)
        return u;
    }
    se.GetTitle = function () {
        var t = document.title;
        t = escape(t);
        return t;
    }
    se.ConfigSharing = function () {
        $(".BasicSharing a").each(function () {
            var h = $(this).attr("href");
            var u = se.GetUrl();
            h = h.replace("@url", u);
            var t = se.GetTitle();
            h = h.replace("@title", t);
            $(this).attr("href", h);
        })
    }
})(SharingEvent)
//下载计数
var DownloadClick = {};
(function (DC) {
    DC.AddClicks = function () {
        var data = {};
        data.id = $("#hidid").val();
        data.urls = $("#hidurl").val();
        data.downCode = $("#website_DownCode").val();
        $.ajax({
            url: "/Download/AddClicks",   // 提交的页面
            data: data, // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            success: function (data) {
                if (data.Code == 1) {
                    if (data.OpenType == "self") {
                        window.location = data.src;//本页
                    } else if (data.OpenType == "blank") {
                        window.open(data.src);//新页面
                    }
                }
                else {
                    alert("验证码错误，无法下载");
                }
            }
        })
    }
})(DownloadClick)
//下载计数结束
//预加载产品图片
var PreLoadProduct = {};
(function (o) {
    o.PreLoadProductPics = function () {
        //if ($("#manu_act_tools").size()) {//设计环境
        //    return;
        //}
        //var data = {};
        //$.ajax({
        //    url: "/Preload/PreLoadProductPics",   // 提交的页面PreLoadProductPics
        //    data: data, // 从表单中获取数据
        //    type: "POST",                   // 设置请求类型为"POST"，默认为"GET",
        //    dataType: "json",
        //    success: function (v) {
        //        if (v != null) {
        //            if (v.Code > 0) {
        //                var imgObj;
        //                for (var i = 0; i < v.list.length; i++) {
        //                    imgObj = new Image();
        //                    imgObj.src = v.list[i].OrginalImgeURL;
        //                    imgObj.alt = v.list[i].ProductName;
        //                    imgObj.style.width = 1;
        //                    imgObj.width = 0;
        //                    imgObj.height = 0;
        //                    $("body").append(imgObj);
        //                }//for
        //            }//if
        //        }
        //    }//success
        //});//ajax
    };
})(PreLoadProduct)
//PreLoadProduct.PreLoadProductPics();


//手机邮箱发送验证
var MemberPwd = {};
(function (Mpwd) {
    Mpwd.notesend = function () {
        var datas = {};
        datas.username = $("#txtUser").val();
        datas.phonenum = $("#txtPhone").val();
        $.ajax({
            url: "/Member/MemberPCheck",   // 提交的页面
            data: datas, // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            success: function (data) {
                if (data != null) {
                    alert(data.Msg);
                }
            }
        })
    }


    Mpwd.emailsend = function () {
        var datas = {};
        datas.username = $("#txtUser").val();
        datas.emailnum = $("#txtEmail").val();
        $.ajax({
            url: "/Member/MemberECheck",   // 提交的页面
            data: datas, // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            success: function (data) {
                if (data != null) {
                    alert(data.Msg);
                }
            }
        })
    }

})(MemberPwd)
//手机邮箱发送验证
var ProSpainPic = {};
(function (Spainpic) {
    Spainpic.SpainShow = function () {
        $(".slider-wrapper").hide();
        $(".spainshow").hide();
        $(".MAgic360class").show();
        $(".spainheid").show();
    }
    Spainpic.SpainHeid = function () {
        $(".slider-wrapper").show();
        $(".spainshow").show();
        $(".MAgic360class").hide();
        $(".spainheid").hide();
    }
})(ProSpainPic);

/*PagerView.js*/
/**
 * @version 1.1
 * @author ideawu@163.com
 * @link http://www.ideawu.net/
 * @class
 * 分页控件, 使用原生的JavaScript代码编写. 重写onclick方法, 获取翻页事件,
 * 可用来向服务器端发起AJAX请求.
 *
 * @param {String} id: HTML节点的id属性值, 控件将显示在该节点中.
 * @returns {PagerView}: 返回分页控件实例.
 *
 * @example
 * ### HTML:
 * <div id="pager"></div>
 *
 * ### JavaScript:
 * var pager = new PagerView('pager');
 * pager.index = 3; // 当前是第3页
 * pager.size = 16; // 每页显示16条记录
 * pager.itemCount = 100; // 一共有100条记录
 *
 * pager.onclick = function(index){
 *	alert('click on page: ' + index);
 *	// display data...
 * };
 *
 * pager.render();
 * 
 */

var PagerView = function (id) {
    var self = this;
    this.id = id;

    this._pageCount = 0; // 总页数
    this._start = 1; // 起始页码
    this._end = 1; // 结束页码

    /**
	  * 当前控件所处的HTML节点引用.
	  * @type DOMElement
	*/
    this.container = null;

    /**
      * 当前页码, 从1开始
      * @type int
    */
    this.index = 1;
    /**
	  * 每页显示记录数
      * @type int
     */
    this.size = 15;
    /**
	 * 显示的分页按钮数量
	 * @type int
	*/
    this.maxButtons = 9;
    /**
    * 记录总数
    * @type int
     */
    this.itemCount = 0;

    /**
    * 控件使用者重写本方法, 获取翻页事件, 可用来向服务器端发起AJAX请求.
    * 如果要取消本次翻页事件, 重写回调函数返回 false.
    * @param {int} index: 被点击的页码.
    * @returns {Boolean} 返回false表示取消本次翻页事件.
     * @event
    */
    this.onclick = function (index) {
        return true;
    };

    /**
  	 * 内部方法.
  	 */
    this._onclick = function (index) {
        var old = self.index;

        self.index = index;
        if (self.onclick(index) !== false) {
            self.render();
        } else {
            self.index = old;
        }
    };

    /**
  	 * 在显示之前计算各种页码变量的值.
  	 */
    this._calculate = function () {
        self._pageCount = parseInt(Math.ceil(self.itemCount / self.size));
        self.index = parseInt(self.index);
        if (self.index > self._pageCount) {
            self.index = self._pageCount;
        }
        if (self.index < 1) {
            self.index = 1;
        }

        self._start = Math.max(1, self.index - parseInt(self.maxButtons / 2));
        self._end = Math.min(self._pageCount, self._start + self.maxButtons - 1);
        self._start = Math.max(1, self._end - self.maxButtons + 1);
    };

    /**
 	 * 获取作为参数的数组落在相应页的数据片段.
 	 * @param {Array[Object]} rows
 	 * @returns {Array[Object]}
 	 */
    this.page = function (rows) {
        self._calculate();

        var s_num = (self.index - 1) * self.size;
        var e_num = self.index * self.size;

        return rows.slice(s_num, e_num);
    };

    /**
 	 * 渲染控件.
 	 */
    this.render = function () {
        var div = document.getElementById(self.id);
        div.view = self;
        self.container = div;

        self._calculate();

        var str = '';
        str += '<div class="PagerView">\n';
        if (self._pageCount > 1) {
            if (self.index != 1) {
                str += '<a href="javascript://1"><span>首页</span></a>';
                str += '<a style="margin-left: 3px" href="javascript://' + (self.index - 1) + '"><span>上一页</span></a>';
            } else {
                str += '<span>首页</span>';
                str += '<span>上一页</span>';
            }
        }
        for (var i = self._start; i <= self._end; i++) {
            if (i == this.index) {
                str += '<span class="on">' + i + "</span>";
            } else {
                str += '<a style="margin-left: 3px" href="javascript://' + i + '"><span>' + i + '</span></a>';
            }
        }
        if (self._pageCount > 1) {
            if (self.index != self._pageCount) {
                str += '<a style="margin-left: 3px" href="javascript://' + (self.index + 1) + '"><span>下一页</span></a>';
                str += '<a style="margin-left: 3px" href="javascript://' + self._pageCount + '"><span>末页</span></a>';
            } else {
                str += '<span>下一页</span>';
                str += '<span>末页</span>';
            }
        }
        str += ' 一共' + self._pageCount + '页, ' + self.itemCount + '条记录 ';
        str += '</div><!-- /.pagerView -->\n';

        self.container.innerHTML = str;

        var a_list = self.container.getElementsByTagName('a');
        for (var i = 0; i < a_list.length; i++) {
            a_list[i].onclick = function () {
                var index = this.getAttribute('href');
                if (index != undefined && index != '') {
                    index = parseInt(index.replace('javascript://', ''));
                    self._onclick(index)
                }
                return false;
            };
        }
    };

};

/*jquery.pagination.js*/
/**
* This jQuery plugin displays pagination links inside the selected elements.
* 
* This plugin needs at least jQuery 1.4.2
*
* @author Gabriel Birke (birke *at* d-scribe *dot* de)
* @version 2.2
* @param {int} maxentries Number of entries to paginate
* @param {Object} opts Several options (see README for documentation)
* @return {Object} jQuery Object
*/
(function ($) {
    /**
	 * @class Class for calculating pagination values
	 */
    $.PaginationCalculator = function (maxentries, opts) {
        this.maxentries = maxentries;
        this.opts = opts;
    }

    $.extend($.PaginationCalculator.prototype, {
        /**
		 * Calculate the maximum number of pages
		 * @method
		 * @returns {Number}
		 */
        numPages: function () {
            return Math.ceil(this.maxentries / this.opts.items_per_page);
        },
        /**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @returns {Array}
		 */
        getInterval: function (current_page) {
            var ne_half = Math.floor(this.opts.num_display_entries / 2);
            var np = this.numPages();
            var upper_limit = np - this.opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half + (this.opts.num_display_entries % 2), np) : Math.min(this.opts.num_display_entries, np);
            return { start: start, end: end };
        }
    });

    // Initialize jQuery object container for pagination renderers
    $.PaginationRenderers = {}

    /**
	 * @class Default renderer for rendering pagination links
	 */
    $.PaginationRenderers.defaultRenderer = function (maxentries, opts) {
        this.maxentries = maxentries;
        this.opts = opts;
        this.pc = new $.PaginationCalculator(maxentries, opts);
    }
    $.extend($.PaginationRenderers.defaultRenderer.prototype, {
        /**
		 * Helper function for generating a single link (or a span tag if it's the current page)
		 * @param {Number} page_id The page id for the new item
		 * @param {Number} current_page 
		 * @param {Object} appendopts Options for the new item: text and classes
		 * @returns {jQuery} jQuery object containing the link
		 */
        createLink: function (page_id, current_page, appendopts) {
            var lnk, np = this.pc.numPages();
            page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
            appendopts = $.extend({ text: page_id + 1, classes: "" }, appendopts || {});
            if (page_id == current_page) {
                lnk = $("<span class='current'>" + appendopts.text + "</span>");
            }
            else {
                lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/, page_id));
            }
            if (appendopts.classes) { lnk.addClass(appendopts.classes); }
            lnk.data('page_id', page_id);
            return lnk;
        },
        // Generate a range of numeric links 
        appendRange: function (container, current_page, start, end, opts) {
            var i;
            for (i = start; i < end; i++) {
                this.createLink(i, current_page, opts).appendTo(container);
            }
        },
        getLinks: function (current_page, eventHandler) {
            var begin, end,
				interval = this.pc.getInterval(current_page),
				np = this.pc.numPages(),
				fragment = $("<div class='pagination'></div>");

            // Generate "Previous"-Link
            if (this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)) {
                fragment.append(this.createLink(current_page - 1, current_page, { text: this.opts.prev_text, classes: "prev" }));
            }
            // Generate starting points
            if (interval.start > 0 && this.opts.num_edge_entries > 0) {
                end = Math.min(this.opts.num_edge_entries, interval.start);
                this.appendRange(fragment, current_page, 0, end, { classes: 'sp' });
                if (this.opts.num_edge_entries < interval.start && this.opts.ellipse_text) {
                    $("<span>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                }
            }
            // Generate interval links
            this.appendRange(fragment, current_page, interval.start, interval.end);
            // Generate ending points
            if (interval.end < np && this.opts.num_edge_entries > 0) {
                if (np - this.opts.num_edge_entries > interval.end && this.opts.ellipse_text) {
                    $("<span>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                }
                begin = Math.max(np - this.opts.num_edge_entries, interval.end);
                this.appendRange(fragment, current_page, begin, np, { classes: 'ep' });

            }
            // Generate "Next"-Link
            if (this.opts.next_text && (current_page < np - 1 || this.opts.next_show_always)) {
                fragment.append(this.createLink(current_page + 1, current_page, { text: this.opts.next_text, classes: "next" }));
            }
            $('a', fragment).click(eventHandler);
            return fragment;
        }
    });

    // Extend jQuery
    $.fn.pagination = function (maxentries, opts) {

        // Initialize options with default values
        opts = $.extend({
            items_per_page: 10,
            num_display_entries: 11,
            current_page: 0,
            num_edge_entries: 0,
            link_to: "#",
            prev_text: "Prev",
            next_text: "Next",
            ellipse_text: "...",
            prev_show_always: true,
            next_show_always: true,
            renderer: "defaultRenderer",
            show_if_single_page: false,
            load_first_page: false,
            callback: function () { return false; }
        }, opts || {});

        var containers = this,
			renderer, links, current_page;

        /**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
        function paginationClickHandler(evt) {
            var links,
				new_current_page = $(evt.target).data('page_id'),
				continuePropagation = selectPage(new_current_page);
            if (!continuePropagation) {
                evt.stopPropagation();
            }
            return continuePropagation;
        }

        /**
		 * This is a utility function for the internal event handlers. 
		 * It sets the new current page on the pagination container objects, 
		 * generates a new HTMl fragment for the pagination links and calls
		 * the callback function.
		 */
        function selectPage(new_current_page) {
            // update the link display of a all containers
            containers.data('current_page', new_current_page);
            links = renderer.getLinks(new_current_page, paginationClickHandler);
            containers.empty();
            links.appendTo(containers);
            // call the callback and propagate the event if it does not return false
            var continuePropagation = opts.callback(new_current_page, containers);
            return continuePropagation;
        }

        // -----------------------------------
        // Initialize containers
        // -----------------------------------
        current_page = parseInt(opts.current_page);
        containers.data('current_page', current_page);
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;

        if (!$.PaginationRenderers[opts.renderer]) {
            throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
        }
        renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

        // Attach control events to the DOM elements
        var pc = new $.PaginationCalculator(maxentries, opts);
        var np = pc.numPages();
        containers.bind('setPage', { numPages: np }, function (evt, page_id) {
            if (page_id >= 0 && page_id < evt.data.numPages) {
                selectPage(page_id); return false;
            }
        });
        containers.bind('prevPage', function (evt) {
            var current_page = $(this).data('current_page');
            if (current_page > 0) {
                selectPage(current_page - 1);
            }
            return false;
        });
        containers.bind('nextPage', { numPages: np }, function (evt) {
            var current_page = $(this).data('current_page');
            if (current_page < evt.data.numPages - 1) {
                selectPage(current_page + 1);
            }
            return false;
        });

        // When all initialisation is done, draw the links
        links = renderer.getLinks(current_page, paginationClickHandler);
        containers.empty();
        if (np > 1 || opts.show_if_single_page) {
            links.appendTo(containers);
        }
        // call callback function
        if (opts.load_first_page) {
            opts.callback(current_page, containers);
        }
    } // End of $.fn.pagination block

})(jQuery);
