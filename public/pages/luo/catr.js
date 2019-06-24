//style  info,yes
var global_infoST, mouse = {
	'x': 0,
	'y': 0
};
$(function() {
	$(document).mousemove(function(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	});
});

function gm_alert(text, style, showTime, _callback) {
	console.log(_callback);
	if (typeof(text) == "undefined") return;
	if (typeof(style) == "undefined") style = 'info';
	if (typeof(showTime) == "undefined") showTime = false;

	if (style == 'yes') {
		var classes = 'PopupYes';
	} else {
		var classes = 'PopupInfo';
	}
	_callback = (typeof(_callback) != 'undefined' && _callback.length > 0) ? 'close_msg();' + _callback : 'close_msg();';

	if (typeof($("#msgPopupBox")) != "undefined") {
		$("#msgPopupBox").remove();
		clearTimeout(global_infoST);
	}
	text = text.replace(/[\n]+/ig, '<br />');
	if (text.indexOf('<br') == -1 && text.length < 14) {
		text = '<font color="#15B6FF">系统消息：</font>' + text;
	}
	var dlgHtml = '<div class="PopupBox" id="msgPopupBox"><div class="PopupBoxUp" ><div class="PopupText ' + classes + '">' + text + '</div><div class="wancheng" ><input type="button" class="clientSubmit" name="" value="确 定" onclick="' + _callback + '"></div></div></div>';

	lockWindow();
	$(dlgHtml).appendTo("body");
	var t = $(document).scrollTop() + $(window).height() / 2 - $("#msgPopupBox").height() / 1.2;
	var l = $(document).scrollLeft() + $(window).width() / 2 - $("#msgPopupBox").width() / 2;
	$("#msgPopupBox").css({
		top: t + 'px',
		left: l + 'px'
	}).show().addClass('active');

	if (showTime) {
		global_infoST = setTimeout(close_msg, showTime);
	}
}
/*
 * -text 提示信息
 * -url  确定后跳转地址
 * -callback 确定后执行的操作
 */
function gm_confirm(text, url, _callback) {
	console.log([text, url, _callback]);
	if (typeof(text) == "undefined") return;
	if (typeof($("#msgPopupBox")) != "undefined") {
		$("#msgPopupBox").remove();
		clearTimeout(global_infoST);
	}
	var clickEvent = '';
	clickEvent = typeof(url) != "undefined" && url.length > 0 ? "window.location.href='" + url + "'" : typeof(_callback) != "undefined" && _callback.length > 0 ? ('close_msg();' + _callback) : 'close_msg();';

	text = text.replace(/[\n]+/ig, '<br />');
	//  if(text.indexOf('<br') == -1 && text.length < 14)
	//  {
	//      text = '<font color="#111">系统确认:</font><br />' + text ;
	//  }
	var dlgHtml = '<div class="PopupBox" id="msgPopupBox"><div class="PopupBoxUp" ><div class="PopupText PopupInfo">' + text + '</div><div class="wancheng" ><input type="button" class="clientSubmitf floatL" name="" value="取 消" onclick="close_msg();"><input type="button" class="clientSubmit floatR" onclick="' + clickEvent + '" value="确 定" /></div></div></div>';
	lockWindow();
	$(dlgHtml).appendTo("body");

	var t = Math.min(mouse.y - 100, $(document).scrollTop() + $(window).height() / 2 - $("#msgPopupBox").height() / 2);
	t = Math.max(100, t);
	var l = $(document).scrollLeft() + $(window).width() / 2 - $("#msgPopupBox").width() / 2;
	$("#msgPopupBox").css({
		top: t + 'px',
		left: l + 'px'
	}).show().addClass('active');
}

function close_msg() {
	var t = $(window).height() / 4;
	$("#msgPopupBox").fadeOut().removeClass('active');
	unlockWindow();
	return false;
}

//页面遮盖层显示
function lockWindow(speed) {
	if (typeof(speed) == "undefined") speed = 200;
	if (typeof($("#lockDiv").html()) != "undefined") $("#lockDiv").remove();
	var wHeight = Math.max($(document.body).outerHeight(true), $(window).height());
	var wWidth = Math.max($(document.body).outerWidth(true), $(window).width());
	var lockDiv = '<div id="lockDiv" style="position:absolute;left:0px;top:0px;width:' + wWidth + 'px;height:' + wHeight + 'px;background-color:#333;z-index:9998;"></div>';
	$(lockDiv).appendTo("body");
	$("#lockDiv").css("opacity", "0");
	$("#lockDiv").fadeTo(speed, "0.4");
}

function unlockWindow() {
	if (typeof($("#lockDiv").html()) != "undefined") $("#lockDiv").fadeOut('fast');
}
// <i class="icon iconfont icon-close" onclick="close_msg();"></i>