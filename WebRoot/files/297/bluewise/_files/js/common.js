$(function(){
	if(isIE6){
		try {document.execCommand("BackgroundImageCache", false, true);} catch(r) {}
	}
});
/*	$('.menu').children().children().mouseover(function(){
		$(this).addClass('current').siblings().removeClass('current');
	});


  


$("#TTop").click(function(){
		$("body").animate({"scrollTop":"0px"},1000)
	});

	    $('#TTop').hide();
});


window.onscroll = function(){ 
    var t = document.documentElement.scrollTop || document.body.scrollTop;  

	if(t>183)
        {	
          $('#TTop').fadeIn();
		  $('#top_bg').css({"height":"0px"});
          $('#mainmenu_bg').css({"opacity":"1","box-shadow":"0 0 20px #666","top":"0px","height":"66px","position":"fixed"});
		  $('#mainmenu').css({"height":"66px"});
		  $('#container').css({"margin-top":"275px"});
		  $('#top').fadeIn();
	}
	
       else{
	    $('#mainmenu_bg').css({"box-shadow":"none", "opacity":"1","top":"183px","height":"75px","position":"static"});
		$('#top_bg').css({"height":"183px","position":"static"});
		$('#mainmenu').css({"height":"90px"});
		$('#container').css({"margin-top":"0px"});
	    $('#TTop').hide();
		$('#top').fadeout();
	}
   

}*/