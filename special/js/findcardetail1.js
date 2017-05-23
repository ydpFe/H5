/**
 * 计算根元素大小 3.75为设计稿尺寸/100
 */
var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 640) deviceWidth = 640;
document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
/**
 * 设置title
 * @returns {document.title}
 */
window.GetTitle = function () {
    return document.title;
}
/**
 * 下载路径
 */
function startApp() {
    window.location = "http://wap.b.kuaiqiangche.com/qrcode.html";
}
/**
 * 获取get请求参数
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
var id = getFinal();
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
 * 根据是不是在APP内部 修改footer和warp的样式
 */
function setStyle() {
    var obj = selectApp();
    if (obj == true) {
        var FOOTER = document.getElementById('footerButton');
        FOOTER.style.display = "none";
        var WARP = document.getElementById('warp');
        WARP.style.marginBottom = "0px";
    }
}
setStyle();
/**
 * 根据是否是cc还是com还是本地区自动选择host
 * @returns {HOST}
 */
function getHost() {
    var OLDURL = document.domain;
    var NUM = OLDURL.lastIndexOf('.');
    var newUrl = OLDURL.substring(NUM + 1, OLDURL.length);
    if (newUrl == 'cc') {//cc情况
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    } else if (newUrl == 'com') {//com情况
        var HOST = "https://api.cyb.kuaiqiangche.com";
    } else {//本地打开
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    }
    return HOST;
}
var HOST = getHost();//获取HOST
/**
 * 获取普通寻车接口
 * @param id {number} 编号
 */
ajax({
    type: "GET",
    url: HOST + "/findcar/find_detail/?find_id=" + id.id,
    dataType: "json",
    data: {},
    success: function (res, xml) {
        if (res.code == 0) {
            //设置title
            document.title = '急寻 ' + res.data.type;
            //定义对象
            var BRAND = document.getElementById('brand');//车名
            var TYPE = document.getElementById('type');//汽车类型
            var DEALPRICE = document.getElementById('deal_price');//期望价格
            var OUTCOLOR = document.getElementById('out_color');//外观
            var INCOLOR = document.getElementById('in_color');//内饰
            var ONCARDPROVINCE = document.getElementById('oncard_province');//上牌地区
            var CARTYPE = document.getElementById('car_type');//车辆状态
            var VALID = document.getElementById('valid');//发布有效期
            var INVOICETYPE1 = document.getElementById('invoice_type1');//开票方式
            var REMARK = document.getElementById('remark');//备注
            var MARKETPRICEBOX = document.getElementById('marketPirceBox');//定义容器
            //车辆状态
            if (res.data.car_type == '0') {
                carTypeText = '不限'
            } else if (res.data.car_type == '1') {
                carTypeText = '现车'
            } else if (res.data.car_type == '2') {
                carTypeText = '期车'
            } else {
                carTypeText = ''
            }
            //发布有效期
            if (res.data.valid == '1') {
                valIdText = '24小时内'
            } else if (res.data.valid == '2') {
                valIdText = '3天内'
            } else if (res.data.valid == '3') {
                valIdText = '7天内'
            } else {
                valIdText = ''
            }
            //开票方式
            if (res.data.invoice_type1 == '1') {
                invoiceType1Text = '不限'
            } else if (res.data.invoice_type1 == '2') {
                invoiceType1Text = '增票'
            } else if (res.data.invoice_type1 == '3') {
                invoiceType1Text = '后票'
            } else {
                invoiceType1Text = ''
            }
            //指导价
            if (res.data.market_price != '' && res.data.market_price != '0') {
                var html = "<div class='carMessage borderBottom'>\
                                <div class='carLeft floatLeft font999'>指导价</div>\
                                <div class='floatLeft' id='market_price'>"+ res.data.market_price + "万</div>\
                            </div>";
                MARKETPRICEBOX.innerHTML = html;
            }
            //判断汽车是否是平行进口
            if(res.data.channel==2){
                channelText=' (美规)';
            }else if(res.data.channel==4){
                channelText=' (欧版) ';
            }else if(res.data.channel==8){
                channelText=' (加版)';
            }else if(res.data.channel==16){
                channelText=' (中东版)';
            }else if(res.data.channel==32){
                channelText=' (墨西哥版)';
            }else{
                channelText='';
            }
            BRAND.innerHTML = (res.data.series || '')+channelText;//汽车名称
            TYPE.innerHTML = (res.data.type || '');//汽车类型
            // 期望价格
            if (res.data.deal_price == '' || res.data.deal_price == 0) {
                dealPriceText = '电议';
            } else {
                dealPriceText = res.data.deal_price + '万元';
            }
            DEALPRICE.innerHTML = dealPriceText;//期望价格
            OUTCOLOR.innerHTML = (res.data.out_color || '');//外观
            INCOLOR.innerHTML = (res.data.in_color || '');//内饰
            ONCARDPROVINCE.innerHTML = (res.data.oncard_province || '') + " " + (res.data.oncard_city || '');//上牌地区
            CARTYPE.innerHTML = carTypeText;//车辆状态
            VALID.innerHTML = valIdText;//发布有效期
            INVOICETYPE1.innerHTML = invoiceType1Text;//开票方式
            REMARK.innerHTML = (res.data.remark || '');//备注
        }
    }
})