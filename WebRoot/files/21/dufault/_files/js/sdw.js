var tools={GetResolution:function(){return window.screen.width+"*"+window.screen.height},GetPdfSupport:function(){if(navigator.plugins){for(var i=0;i<navigator.plugins.length;i++){if(navigator.plugins[i].description){if(navigator.plugins[i].description.indexOf("PDF-XChange Viewer")>-1||navigator.plugins[i].description.indexOf("Adobe PDF")>0){return"1"}}}}if(window.ActiveXObject){for(var x=2;x<10;x++){try{var oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");if(oAcro){return"1"}}catch(e){}}try{var oAcro4=eval('new ActiveXObject("PDF.PdfCtrl.1")');if(oAcro4){return"1"}}catch(e){}try{var oAcro7=eval('new ActiveXObject("AcroPDF.PDF.1")');if(oAcro7){return"1"}}catch(e){return"0"}}return"0"},GetFlashVersion:function(){if(navigator.plugins&&navigator.plugins.length&&navigator.plugins["Shockwave Flash"]){return navigator.plugins["Shockwave Flash"].description.split("Shockwave Flash ")[1].split(" ")[0]}if(window.ActiveXObject){for(var i=2;i<=10;i++){try{var fl=eval('new ActiveXObject("ShockwaveFlash.ShockwaveFlash."'+i+");");if(fl){return i+".0"}}catch(e){}}}return"0"},GetJavaSupport:function(){return navigator.javaEnabled()?"1":"0"},GetCookieSupport:function(){return navigator.cookieEnabled?"1":"0"},GetVBScriptSupport:function(){return(!!document.all)?"1":"0"},GetActiveX:function(){return(!!window.ActiveXObject)?"1":"0"},GetOpenTime:function(){if(typeof performance!="undefined"){if(typeof performance.timing!="undefined"){if(typeof performance.timing.navigationStart!="undefined"){return new Date().getTime()-performance.timing.navigationStart}}}return 0}};var browser={language:(navigator.browserLanguage||navigator.language).toLowerCase()};var lan=browser.language;var headName="HD_E_8_S";var leaveName="LB_E_2_S";var sessionName="SE_E_3_S";var sessionTime="ST_E_4_S";var isOld="1";var leaveName_v="";var sessionName_v="";var headName_v=getCookie(headName);if(headName_v==""){leaveName_v=panda();setCookie(headName,"1",360);setCookie(leaveName,leaveName_v,360);isOld="0"}else{leaveName_v=getCookie(leaveName)}var sessionName_v=getCookie(sessionName);if(sessionName_v==""){sessionName_v=panda();setSessionCookie(sessionName,sessionName_v)}else{var der=new Date();var sessionTime_v=der.getTime();var sessionTime_o=getCookie(sessionTime);if(sessionTime_o==""){sessionTime_o="0"}var tt=(sessionTime_v/1000-sessionTime_o/1000);if(tt>900){sessionName_v=panda();setSessionCookie(sessionName,sessionName_v)}}var d=new Date();var sessionTime_v=d.getTime();setSessionCookie(sessionTime,sessionTime_v);var visitorInfos={domain:encodeURIComponent(document.domain),inpage:encodeURIComponent(location.href),sourcePage:encodeURIComponent(document.referrer),ipTitle:encodeURIComponent(document.title.substring(0,50)),flashVersion:tools.GetFlashVersion(),resolution:tools.GetResolution(),pdf:tools.GetPdfSupport(),java:tools.GetJavaSupport(),cookie:tools.GetCookieSupport(),vbscript:tools.GetCookieSupport(),activex:tools.GetActiveX(),opentime:tools.GetOpenTime()};var transd={Create:function(){var a=document.createElement("SCRIPT");var b="http://2016.iezhan.com/apiplugin/images/s.gif";a.src=b+"?sup="+visitorInfos.sourcePage+"&inp="+visitorInfos.inpage+"&int="+encodeURIComponent(visitorInfos.ipTitle)+"&res="+visitorInfos.resolution+"&isj="+visitorInfos.java+"&isv="+visitorInfos.vbscript+"&isc="+visitorInfos.cookie+"&isa="+visitorInfos.activex+"&isp="+visitorInfos.pdf+"&flv="+visitorInfos.flashVersion+"&opt="+visitorInfos.opentime+"&iso="+isOld+"&lan="+lan+"&rnd="+Math.random()+"&recp="+leaveName_v+"&tckn="+sessionName_v+"&date="+(new Date().getTime()*10000+621355968000000000);a.type="text/javascript";a.language="javascript";a.defer="defer";document.getElementsByTagName("head")[0].appendChild(a)},Success:function(){}};function panda(){function a(){return(((1+Math.random())*65536)|0).toString(16).substring(1)}return(a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a())}function setSessionCookie(b,e){var c=!-[1,];if(c){if(e){var a="; expires=At the end of the Session";document.cookie=b+"="+escape(e)+a+";path=/"}}else{if(e){var a="; expires=Session";document.cookie=b+"="+escape(e)+a+";path=/"}}}function setCookie(b,f,c){var e=new Date();e.setTime(e.getTime()+(c*24*60*60*1000));var a="expires="+e.toUTCString();document.cookie=b+"="+f+"; "+a+";path=/"}function getCookie(e){var b=e+"=";var a=document.cookie.split(";");for(var f=0;f<a.length;f++){var g=a[f];while(g.charAt(0)==" "){g=g.substring(1)}if(g.indexOf(b)!=-1){return g.substring(b.length,g.length)}}return""}transd.Create();function addEvtListener(g,e,f){if(document.addEventListener){if(g){g.addEventListener(e,f,false)}else{addEventListener(e,f,false)}}else{if(attachEvent){if(g){g.attachEvent("on"+e,f)}else{attachEvent("on"+e,f)}}}}var clickHeatGroup="",clickHeatSite="",clickHeatServer="",clickHeatLastIframe=-1,clickHeatTime=0,clickHeatQuota=-1,clickHeatBrowser="",clickHeatDocument="",clickHeatWait=500,clickHeatLocalWait=0,clickHeatDebug=(document.location.href.indexOf("debugclickheat")!==-1);function catchClickHeat(y){var x,H,D,E,C,A,B,I,J,e,l,G,t,w,h=false,c=false;
try{if(clickHeatQuota===0){return true}if(clickHeatGroup===""){return true}if(!y){y=window.event}x=y.which||y.button;H=y.srcElement||null;if(x===0){return true}if(H!==null&&H.tagName.toLowerCase()==="iframe"){if(H.sourceIndex===clickHeatLastIframe){return true}clickHeatLastIframe=H.sourceIndex}else{clickHeatLastIframe=-1}D=y.clientX;E=y.clientY;C=clickHeatDocument.clientWidth||window.innerWidth;A=clickHeatDocument.clientHeight||window.innerHeight;J=window.pageXOffset||clickHeatDocument.scrollLeft;e=window.pageYOffset||clickHeatDocument.scrollTop;B=Math.max(clickHeatDocument.scrollWidth,clickHeatDocument.offsetWidth,C);I=Math.max(clickHeatDocument.scrollHeight,clickHeatDocument.offsetHeight,A);if(D>C||E>A){return true}D+=J;E+=e;if(D<0||E<0||D>B||E>I){return true}l=new Date();if(l.getTime()-clickHeatTime<1000){return true}clickHeatTime=l.getTime();if(clickHeatQuota>0){clickHeatQuota=clickHeatQuota-1}w="g="+encodeURIComponent(location.href)+"&x="+D+"&y="+E+"&w="+C+"&b="+clickHeatBrowser+"&c="+x;if(h===false){if(clickHeatDebug===true){}else{t=new Image();t.src=clickHeatServer+"?"+w}}}catch(F){}return true}function initClickHeat(){var k,i,b,l,j,h;if(clickHeatDebug===true){h=document.createElement("div");h.id="clickHeatDebuggerDiv";h.style.padding="5px";h.style.display="none";h.style.position="absolute";h.style.top="200px";h.style.left="200px";h.style.border="1px solid #888";h.style.backgroundColor="#eee";h.style.color="#a00";h.style.zIndex=99;h.innerHTML='<a href="#" onmouseover="document.getElementById(\'clickHeatDebuggerDiv\').style.display = \'none\'; return false" style="float:right">Rollover to close</a><strong>ClickHeat debug:</strong><br/><br/><span id="clickHeatDebuggerSpan"></span>';document.body.appendChild(h)}if(clickHeatGroup===""||clickHeatServer===""){return false}j=document.location.protocol+"//"+document.location.host;if(clickHeatServer.indexOf(j)===0){clickHeatServer=clickHeatServer.substring(j.length,clickHeatServer.length)}addEvtListener(document,"mousedown",catchClickHeat);i=document.getElementsByTagName("iframe");for(k=0;k<i.length;k+=1){addEvtListener(i[k],"focus",catchClickHeat)}clickHeatDocument=document.documentElement&&document.documentElement.clientHeight!==0?document.documentElement:document.body;b=navigator.userAgent?navigator.userAgent.toLowerCase().replace(/-/g,""):"";l=["chrome","firefox","safari","msie","opera"];clickHeatBrowser="unknown";for(k=0;k<l.length;k+=1){if(b.indexOf(l[k])!==-1){clickHeatBrowser=l[k];break}}}clickHeatSite="";clickHeatGroup=encodeURIComponent(window.location.pathname+window.location.search);clickHeatServer="http://2016.iezhan.com/hot/click";initClickHeat();