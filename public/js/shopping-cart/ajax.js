/**
 *  ajax请求方法
 **/
!function ($) {
    $.extend({
        gimiAjax: function (options) {
            var defaults = {
                baseURL: '',
                type: 'get',
                url: '',
                data: {},
                async: true,
                success: function () {
                },
                error: function () {
                },
                beforeSend: function () {
                },
                complete: function () {
                },
                xhrFields: {
                    withCredentials: true
                },
                timeout: 1000 * 60 * 3,
                dataType: '',
                isAlertError: true
            };

            var opts = $.extend({}, defaults, options);

            $.ajaxSetup({
                timeout: opts.timeout,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type: opts.type,
                url: opts.baseURL + opts.url,
                data: opts.data,
                async: opts.async,
                beforeSend: opts.beforeSend,
                xhrFields: opts.xhrFields,
                dataType: opts.dataType
            }).done(function (data, textStatus, XMLHttpRequest) {
                if (typeof data === 'string') {
                    return opts.success(data, textStatus, XMLHttpRequest);
                }

                if (data.code === 401) {
                    return window.location.href = 'https://account.xgimi.com/pass/login?callback=' + window.location.href;
                }

                if (data.ret || data.code === 200 || !opts.isAlertError) {
                    opts.success(data, textStatus, XMLHttpRequest);
                } else {
                    var msg = data.message ? data.message : data.msg ? data.msg : 'gimiAjax:系统错误';

                    gm_alert ? gm_alert(msg) : alert(msg);
                }
            }).fail(function (XMLHttpRequest, textStatus) {
                gm_alert ? gm_alert('系统错误') : alert('系统错误');
                opts.error(XMLHttpRequest, textStatus);
            }).always(function (XMLHttpRequest, textStatus) {
                opts.complete(XMLHttpRequest, textStatus);
            });
        }
    });
}(jQuery || Zepto);

/**
 *   节流函数
 *   @param {Function} fun 要执行的函数
 *   @param {Number} delay ms,延迟
 *   @param {Number} time ms,在time时间内必须执行一次
 **/
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function () {
        var context = this,
            args = arguments,
            curTime = new Date();

        timeout && clearTimeout(timeout);

        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
}

/**
 * 获取url相对路径
 * @returns {string}
 * @constructor
 */

function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

/**
 *   获取url参数
 *   @params {String} name 参数名
 *   @return {String} 参数值
 **/
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
}

/**
 * 自定义cookie方法
 * @type {{set: cookie.set, get: (function(*): *)}}
 */

var cookie = {
    set: function (key, val, time) {//设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        var domain = ".xgimi.com";
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + escape(val) + ";expires=" + date.toGMTString() + ";domain=" + domain + ";path=/"; //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = unescape(arr[1]);   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
    },
};

/**
 * 判断登录设备
 * @returns {string} 2（Mobile） or 1（PC）
 */
function equipment() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "2";
    } else {
        return "1";
    }
}

/**
 * 发送用户操作信息
 * @param params
 * actionType (integer, optional): 操作类型（1、首页 2：详情页、3：加入购物车、4：下单、5：结算） ,
 channel (string, optional): 广告来源 ,
 address (string, optional): 地址信息 ,
 city (string, optional): 市 ,
 cookie (string, optional): COOKIE ,
 dimension (string, optional): 维度 ,
 district (string, optional): 区 ,
 equipment (integer, optional): 操作设备(1:电脑、2：手机) ,
 goodsId (integer, optional): 商品ID ,
 goodsName (string, optional): 商品名称 ,
 ip (string, optional): IP ,
 longitudinal (string, optional): 经度 ,
 orderId (string, optional): 订单ID ,
 productOrderId (string, optional): 产品订单ID ,
 province (string, optional): 省 ,
 source (string, optional): 广告名称 ,
 userId (string, optional): 用户ID
 * @constructor
 */

function ADTracking(actionType, goodsId, goodsName, orderId, productOrderId) {

    /**
     * 搜狐接口获取IP地址
     * 返回格式 var returnCitySN = {"cip": "182.148.123.56", "cid": "510100", "cname": "四川省成都市"};
     */
    if (typeof(returnCitySN) == "undefined") {
        returnCitySN = {};
    }
    //设置结束时间戳
    cookie.set("GM_ADEndTime", new Date().getTime(), 60);//设置为60天过期
    /**
     * 页面停留时间 毫秒数，加入购物车为0
     * @type {number}
     */
    var stayTime = actionType ===3 ? 0 :getTimeDifference(Number(cookie.get("GM_ADStartTime")),Number(cookie.get("GM_ADEndTime")));

    var params = {
        actionType: actionType,
        source: cookie.get("GM_ADTracking").split("/")[1],
        channel: cookie.get("GM_ADTracking").split("/")[0],
        cookie: cookie.get("GM_ADTracking").split("/")[2],
        ip: returnCitySN && returnCitySN.cip || '',
        address: returnCitySN && returnCitySN.cname || '',
        equipment: Number(equipment()),
        userId: '',
        orderId: orderId || null,
        productOrderId: productOrderId || '',
        goodsId: goodsId || null,
        goodsName: goodsName || '',
        stayTime: stayTime
    };

    $.ajax({
        url: "/api/hd/userAction",
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        async:false,
        data: JSON.stringify(params),
        success: function (data) {

        },
        error: function (request) {

        }
    });
}

/**
 * 计算时间差
 * @param startTime 开始时间戳
 * @param endTime 结束时间戳
 */
function getTimeDifference(startTime, endTime) {
    var date1 = new Date(startTime);  //开始时间
    var date2 = new Date(endTime);    //结束时间
    var date3 = date2.getTime() - date1.getTime();//时间差的毫秒数
    /*//计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);//计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);//计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);
    //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    console.log(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");*/
    return date3 ? date3 : 0;
}

//页面加载时只执行onload window.onload遇阻塞可能不会执行
$(window).load(function () {
    /*进入页面,设置时间戳*/
    cookie.set("GM_ADStartTime", new Date().getTime(), 60);//设置为60天过期
});
//页面离开时触发，pagehide兼容移动端
window.addEventListener('pagehide', function () {
    /*离开页面,设置时间戳*/
    //cookie.set("GM_ADEndTime", new Date().getTime(), 60);//设置为60天过期
    /*离开活动页发送收集信息*/
    if (getQueryString("utm_source") || getQueryString("utm_campaign")) {
        ADTracking(1);
    }

    /**
     * 参加过活动,离开商品详情,算作追踪统计
     */
    if (cookie.get("GM_ADTracking")) {
        //通过url判断进入地址
        if (GetUrlRelativePath().split("/")[1] === 'goods') {
            //获取商品名称
            var goodsName = $(".goods-title").find("h3").text(); //PC
            goodsName ? goodsName : goodsName = $(".goods-con").find("h4").text(); //mobile
            ADTracking(2, parseInt(GetUrlRelativePath().split("/")[2]), goodsName);
        }
    }
});
$(function () {
    /**
     * 如果是广告进入的地址，设置cookie
     * utm_source:广告来源 utm_campaign:广告名称
     */
    if (getQueryString("utm_source") || getQueryString("utm_campaign")) {
        //如果已有cookie只覆盖广告来源和名称
        cookie.get("GM_ADTracking") && cookie.get("GM_ADTracking").split("/")[2] ? code = cookie.get("GM_ADTracking").split("/")[2] : code = new Date().getTime();
        var ad = getQueryString("utm_source") + "/" + getQueryString("utm_campaign") + "/" + code;
        cookie.set("GM_ADTracking", ad, 60);//设置为60天过期
    }
});