$(function(){
	$(".leftMenu .topMenu li").hover(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		$(this).find(".xlcd").stop(true,true).slideDown();
		$(this).siblings("li").find(".xlcd").stop(true,true).slideUp();
	})
})

