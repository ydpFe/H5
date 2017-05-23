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
/**
 * formatSeconds 设置剩余时间格式
 * @param  value {number} 对应秒数
 */
function formatSeconds(value) {
    var value = parseInt(value);// 秒
    var mins = 0;// 分
    var hours = 0;// 小时
    var day = 0;
    //超过一分钟 并且时间不到一天 返回:小时+分钟
    if (value > 60 && value < 86400) {
        mins = parseInt(value / 60);//所有分钟
        if (mins >= 60) {
            hours = parseInt(mins / 60) + "小时";
            hoursNum = parseInt(mins / 60);
            lowM = value - hoursNum * 3600;//剩余秒数
            if (lowM >= 60) {
                mins = parseInt(lowM / 60) + "分钟";
            } else {
                mins = '';
            }
            result = hours;
        } else {
            result = '不足1小时';
        }
    }
    //超过一天 返回:天数+小时
    if (value >= 86400) {
        day = parseInt(value / 86400) + "天";//天数
        dayNum = parseInt(value / 86400);
        //剩余时间
        lowH = value - 86400 * dayNum;//是秒数
        if (lowH >= 3600) {
            hours = parseInt(lowH / 60 / 60) + "小时";
        } else {
            hours = '';
        }
        result = day + hours
    }
    //不超过一分钟的
    if (value < 60) {
        result = '不足1小时';
    }

    return result;
}
/**
 * 判断是否是APP内部
 */
function selectApp() {
    if (navigator.userAgent.indexOf('cheyuanbaoios') != -1 || navigator.userAgent.indexOf('cheyuanbaoand') != -1) {
        return true;
    } else {
        return false;
    }
}
/**
 * 修改warp和footer样式
 */
function setStyle() {
    var obj = selectApp();
    if (obj == true) {
        var footer = document.getElementById('footerButton');
        footer.style.display = "none";
        var warp = document.getElementById('warp');
        warp.style.marginBottom = "0px";
    }
}
setStyle();//调用
var id = getFinal();//获取get参数
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
            var data = res.data;
            var RESTTIME = document.getElementById('rest_time');//剩余时间
            var BRAND = document.getElementById('brand');//汽车名
            var STATUS = document.getElementById('status');//状态
            //竞价状态
            if (data.status == 1) {
                statusText = '待支付';
            } else if (data.status == 5) {
                statusText = '已发布';
            } else if (data.status == 10) {
                if (data.bidding_num == 0 || data.bidding_num == null || data.bidding_num == '') {
                    statusText = '竞价中';
                } else {
                    statusText = data.bidding_num + '人参与竞价';
                }
            } else if (data.status == 15) {
                statusText = '竞价成功';
            } else if (data.status == 20) {
                statusText = '竞价失效';
            } else {
                statusText = '';
            }
            var TYPE = document.getElementById('type');//汽车type
            var MARKETPRICE = document.getElementById('market_price');//指导价
            var OUTCOLOR = document.getElementById('out_color');//外观
            var DISCOUNTTYPE = document.getElementById('discount_type');//期望行情
            //期望行情
            if (data.discount_type == 1) {
                discountTypeText = '优惠';
                discountValueText = data.discount_value + '点';
            } else if (data.discount_type == 2) {
                discountTypeText = '优惠';
                discountValueText = data.discount_value + '万';
            } else if (data.discount_type == 3) {
                discountTypeText = '加价';
                discountValueText = data.discount_value + '万';
            } else if (data.discount_type == 4) {
                discountTypeText = '报价';
                discountValueText = data.discount_value + '万';
            } else {
                discountTypeText = '';
                discountValueText = '';
            }
            var DEALPRICE = document.getElementById('deal_price');//期望价格
            //车辆状态
            var CARTYPE = document.getElementById('car_type');
            if (data.car_type == 0) {
                carTypeText = '不限'
            } else if (data.car_type == 1) {
                carTypeText = '现车'
            } else if (data.car_type == 2) {
                carTypeText = '期车'
            } else {
                carTypeText = ''
            }
            var PUTCARTIME = document.getElementById('put_car_time');//提车时间
            if (data.put_car_time == 0) {
                putCarTimeText = '不限';
            } else if (data.put_car_time == 1) {
                putCarTimeText = '3天内';
            } else if (data.put_car_time == 2) {
                putCarTimeText = '7天内';
            } else if (data.put_car_time == 3){
                putCarTimeText = '15天内';
            } else if (data.put_car_time == 4){
                putCarTimeText = '30天内';
            } else{
                putCarTimeText = '';
            }
            //上牌地区
            var ONCARDPROVINCE = document.getElementById('oncard_province');
            var ACCESSDISTANCE = document.getElementById('access_distance');
            var VALID = document.getElementById('valid');
            if (data.valid == 1) {
                valIdText = '24小时内';
            } else if (data.valid == 2) {
                valIdText = '3天内';
            } else if (data.valid == 3) {
                valIdText = '7天内';
            } else {
                valIdText = '';
            }
            //票据来源
            var INVOICETYPE2 = document.getElementById('invoice_type2');
            if (data.invoice_type2 == 1) {
                invoiceType2Text = '不限';
            } else if (data.invoice_type2 == 2) {
                invoiceType2Text = '店票';
            } else if (data.invoice_type2 == 3) {
                invoiceType2Text = '汽贸票';
            } else {
                invoiceType2Text = '';
            }
            //开票方式
            var INVOICETYPE1 = document.getElementById('invoice_type1');
            if (data.invoice_type1 == 1) {
                invoiceType1Text = '不限';
            } else if (data.invoice_type1 == 2) {
                invoiceType1Text = '增票';
            } else if (data.invoice_type1 ==3) {
                invoiceType1Text = '后票';
            } else {
                invoiceType1Text = '';
            }
            //生产日期
            var PRODUCTIONDATE = document.getElementById('production_date');
            if (data.production_date == 1) {
                productionDateText = '三个月内';
            } else if (data.production_date == 2) {
                productionDateText = '半年内';
            } else if (data.production_date == 3) {
                productionDateText = '一年内';
            } else if (data.production_date == 4) {
                productionDateText = '1-3年';
            } else {
                productionDateText = '';
            }
            //手续情况
            var PROCEDURE = document.getElementById('procedure');
            if (data.procedure == 1) {
                proceDureText = '手续随车';
            } else if (data.procedure == 2) {
                proceDureText = '手续3天内';
            } else if (data.procedure == 3) {
                proceDureText = '手续一周内';
            } else if (data.procedure == 4) {
                proceDureText = '手续15天内';
            } else if (data.procedure == 5) {
                proceDureText = '手续30天内';
            } else {
                proceDureText = '';
            }
            //备注
            var REMARK = document.getElementById('remark');
            //参与竞价人员信息
            var PEOPLEMESSAGE = document.getElementById('peopleMessage');
            if (data.bidding_num != 0 && data.bidding_num != '' && data.bidding_num != null) {
                var html = "<div class='fontOrange peopleTitle'>共" + data.bidding_num + "人参与竞价</div>";
                html += "<div class='my-group borderTop'>";
                for (var i = 0; i < data.bidding.length; i++) {
                    html += "<div class='bidPeople borderBottom'>";
                    html += "<span>" + data.bidding[i].name + "参与了报价</span>";
                    if (data.bidding[i].status == 3) {
                        html += "<span class='fontOrange bidSuccess'>竞价成功</span>";
                    }
                    html += "</div>";
                }
                html += "</div>";
                PEOPLEMESSAGE.innerHTML = html;

            }
            var FCNUM = document.getElementById('fc_no');

            RESTTIME.innerHTML = '剩:' + (formatSeconds(data.rest_time) || ' ');//剩余时间
            //判断汽车是否是平行进口
            if(data.channel==2){
                channelText=' (美规)';
            }else if(data.channel==4){
                channelText=' (欧版) ';
            }else if(data.channel==8){
                channelText=' (加版)';
            }else if(data.channel==16){
                channelText=' (中东版)';
            }else if(data.channel==32){
                channelText=' (墨西哥版)';
            }else{
                channelText='';
            }
            BRAND.innerHTML = (data.series || '')+channelText;//汽车名称
            STATUS.innerHTML = statusText;//竞价状态
            TYPE.innerHTML = (data.type || '');//汽车type
            //指导价
            if (res.data.market_price != '' && res.data.market_price != '0') {
                marketPriceText = '指导价:' + data.market_price + '万';
            } else {
                marketPriceText = '';
            }
            MARKETPRICE.innerHTML = marketPriceText;//指导价
            OUTCOLOR.innerHTML = (data.out_color || '') + '/' + (data.in_color || '');//外观/内饰
            DISCOUNTTYPE.innerHTML = discountTypeText + discountValueText;//期望行情
            if (data.deal_price == '' || data.deal_price == 0) {
                dealPriceText = '电议';
            } else {
                dealPriceText = data.deal_price + "万";
            }
            DEALPRICE.innerHTML = dealPriceText;//期望价格
            CARTYPE.innerHTML = carTypeText;//车辆状态
            PUTCARTIME.innerHTML = putCarTimeText;//提车时间
            ONCARDPROVINCE.innerHTML = (data.oncard_province || '') + ' ' + (data.oncard_city || '');//上牌地区
            if (data.access_distance == '' || data.access_distance == undefined) {
                accessDistanceText = '';
            } else {
                accessDistanceText = data.access_distance + "公里"
            }
            ACCESSDISTANCE.innerHTML = accessDistanceText;//接受自提距离
            VALID.innerHTML = valIdText;//发布有效期
            INVOICETYPE2.innerHTML = invoiceType2Text;//票据来源
            INVOICETYPE1.innerHTML = invoiceType1Text;//开票方式
            PRODUCTIONDATE.innerHTML = productionDateText;//生产日期
            PROCEDURE.innerHTML = proceDureText;//手续情况
            REMARK.innerHTML = (data.remark || '');//备注
            FCNUM.innerHTML = (data.fc_no || ' ');//寻车编号
        }
    }
})