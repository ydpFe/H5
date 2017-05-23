/**
 * 懒加载
 * @param data {string} 懒加载容器
 */
function lazyloadImg(data) {
    var lazyloading = lazyload({
        id: data,
        lazyTime: 0,
        lazyRange: 100
    });
}
/**
 * 获取HOST请求参数
 * @returns {HOST}
 */
function getYZHost() {
    var oldUrl = document.domain;
    var num = oldUrl.lastIndexOf('.');
    var newUrl = oldUrl.substring(num + 1, oldUrl.length);
    if (newUrl == 'cc') {
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    } else if (newUrl == 'com') {
        var HOST = "https://api.cyb.kuaiqiangche.com";
    } else {
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    }
    return HOST;
}
/**
 * 给验证接口设置HOST
 * @returns {HOST}
 */
function getHost() {
    var oldUrl = document.domain;
    var num = oldUrl.lastIndexOf('.');
    var newUrl = oldUrl.substring(num + 1, oldUrl.length);
    if (newUrl == 'cc') {
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    } else if (newUrl == 'com') {
        var HOST = "https://api.cyb.kuaiqiangche.com";
    } else {
        var HOST = "http://dev.cyb.kuaiqiangche.cc";
    }
    return HOST;
}
/**
 * 获取到传参的参数例如?id=1212
 * @returns {obj}
 */
var getFinal = function () {
    var oldUrl = window.location.href;
    var arr = (oldUrl.substring(oldUrl.lastIndexOf('?') + 1, oldUrl.length)).split('&');
    // alert(arr)
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=');
        obj[arr[i][0]] = arr[i][1];
    }

    return obj;
};
/**
 * 判断是否是在APP内部
 */
function selectApp() {
    if (navigator.userAgent.indexOf('cheyuanbaoios') != -1 || navigator.userAgent.indexOf('cheyuanbaoand') != -1) {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断系统
 */
function selectSystem(){
    var ua = navigator.userAgent.toLowerCase();	
    if (/iphone|ipad|ipod/.test(ua)) {
            return "iphone";		
    } else if (/android/.test(ua)) {
            return "android";	
    }
}
/**
 * 判断微信
 */
function isWeiXin(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}