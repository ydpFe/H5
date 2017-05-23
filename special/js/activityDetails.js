
/**
 * 懒加载
 */
function lazyloadImg() {
    var lazyloading = lazyload({
        id: "warp",
        lazyTime: 0,
        lazyRange: 100
    });
}
/**
 * 获取get请求参数
 * @returns {obj}
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
        var HOST = "https://api.cyb.kuaiqiangche.com";
    }
    return HOST;
}
var HOST = getHost();
/**
 * 设置banner和背景色 
 */
ajax({
    type: "GET",
    url: HOST + "/event/source/activity_background",
    dataType: "json",
    data: {},
    success: function (res, xml) {
        if (0 == res.code) {
            //创建对象
            var bannerMessage = document.getElementById("bannerMessage");
            var loading = document.getElementById("loading");
            var body = document.querySelector("body");
            //设置背景色
            body.style.background = "#" + res.data.bgColor;
            loading.style.background = "#" + res.data.bgColor;
            //渲染banner
            var html = "<img src='' alt='banner' data-src='" + res.data.banner.src + "'>"
            bannerMessage.innerHTML = html;
            //执行懒加载
            lazyloadImg();
        }
    },
    fail: function (status) {
        //执行失败 do something
    }
})
/**
 *今日主推
 * @param type {number} 表示今日主推
 * @param page {number} 当前页数
 * @param size {number} 每页的条数
 */
ajax({
    type: "GET",
    url: HOST + "/event/source/special_car?type=recommend&page=1&size=1000",
    dataType: "json",
    data: {},
    success: function (res, xml) {
        if (0 == res.code) {
            //填充title
            var title = document.getElementById('todayRecommendTitle');
            title.innerHTML = '今日主推';
            //创建对象
            var todayRecommend = document.getElementById("todayRecommend");
            var data = res.data.rows;
            for (var i = 0; i < data.length; i++) {
                var html = "<li class='activityBg'>";
                if (data[i].sellOut == true) {
                    html += "<a>";
                } else {
                    html += "<a href='cybapp://car/id/" + data[i].id + "'>";
                }

                html += "<div class='bgImgBox'><img src='img/sale.png' class='bgImg'></div>\
                        <div class='positionImg'>\
                            <img src='' data-src='"+ data[i].carImg + "'  class='carZindex'/>";
                if (data[i].sellOut == true) {
                    html += "<img src='' data-src='img/sell_outbig.png'  class='sellOut'/>";
                }
                html += "</div>\
                            <div class='positionText'>\
                                <div class='carMessage carNameBox strongText ellipsisObj'>"+ data[i].carName + "</div>\
                                <div class='carMessage fontColor fontSize-14 out'>\
                                    <span>外观/内饰:</span>\
                                    <span class='marginLeft-5'>"+ data[i].carFace + "/" + data[i].carInterior + "</span>\
                                </div>\
                                <div class='carMessage fontColor fontSize-14 out'>";
                if (data[i].carPrice != null && data[i].carPrice != 0 && data[i].carPrice != undefined) {
                    html += "<span>指导价:</span>\
                                        <span class='marginLeft-5'>"+ data[i].carPrice + "万/" + data[i].carDiscount + "</span>";
                }

                html += "</div>\
                                </div>\
                                <div class='positionSale'><span class='fontSize-16'>￥</span>"+ data[i].carSale + "<span class='fontSize-16'>万</span></div>\
                            </a>\
                        </li>";
                todayRecommend.innerHTML += html;
            }
            //执行懒加载
            lazyloadImg();
        }
    },
    fail: function (status) {
        //执行失败 do something
    }
})
/**
 *活动专场
 * @param type {number} 活动专场
 */
ajax({
    type: "GET",
    url: HOST + "/event/source/activity?type=0",
    dataType: "json",
    data: {},
    success: function (res, xml) {
        if (res.code == 0) {
            //填充title
            var title = document.getElementById('specialTitle');
            title.innerHTML = '活动专场';
            var carOrginTitle = document.getElementById('carOrginTitle');
            carOrginTitle.innerHTML = '推荐车源';
            //创建对象
            var specialBox = document.getElementById("specialBox");
            var data = res.data;
            for (var i = 0; i < data.length; i++) {
                var html = "<a href='" + data[i].linkUrl + "?id=" + data[i].id + "'><img src='' data-src='" + data[i].carImg + "'></a>";
                specialBox.innerHTML += html;
            }
            //执行懒加载
            lazyloadImg();
        }
    },
    fail: function (status) {
        //执行失败 do something
    }
})
//创建对象
var carOrgin = document.getElementById("carOrgin");//推荐车源容器
var loading = document.getElementById("loading");
var page = 1;//页数
var totalPage = 0;//总页数
var size = 10;//每页条数
var scrollSelect = true;//控制滚动
/**
 * 推荐车源 首次加载十条
 * @param type {number} 展示全部
 * @param page {number} 当前页数
 * @param size {number} 每页的条数
 */
function first() {
    ajax({
        type: "GET",
        url: HOST + "/event/source/special_car?type=all & page=1 & size=" + size,
        dataType: "json",
        data: '',
        success: function (res, xml) {
            if (res.code == 0) {
                //添加canvas
                var circle = new Sonic({

                    width: 20,
                    height: 20,
                    padding: 5,

                    strokeColor: '#000',

                    pointDistance: .01,
                    stepsPerFrame: 3,
                    trailLength: .7,

                    step: 'fader',

                    setup: function () {
                        this._.lineWidth = 3;
                    },

                    path: [
                        ['arc', 10, 10, 10, 10, 360]
                    ]

                });

                circle.play();

                var loadImg = document.getElementById('loading')
                loadImg.appendChild(circle.canvas);
                totalPage = res.data.total;//总页数
                var data = res.data.rows;
                for (var i = 0; i < data.length; i++) {

                    var html = "<li class='recommend'>";
                    if (data[i].sellOut == true) {
                        html += "<a>";
                    } else {
                        html += "<a href='cybapp://car/id/" + data[i].id + "'>";
                    }
                    html += "<div class='recommendImgBox'>\
                            <img src='' data-src='"+ data[i].carImg + "' class='recommendImg'>";
                    if (data[i].sellOut == true) {
                        html += " <img src='img/sell_outsmall.png' class='sellOutSmall'>";
                    }
                    html += "</div>\
                            <div class='recommendText'>\
                                <div class='recommendCarName strongText'>"+ data[i].carName + "</div>\
                                <div class='fontColor fontSize-14 smallOut'>\
                                    <span>外观/内饰:</span>\
                                    <span class='marginLeft-5'>"+ (data[i].carFace || ' ') + "/" + data[i].carInterior + "</span>\
                                </div>\
                                <div class='fontColor fontSize-14 smallPrice'>\
                                    <span class='recommendCarSale'>￥"+ data[i].carSale + "万</span>";
                    if (data[i].carPrice != null && data[i].carPrice != 0 && data[i].carPrice != undefined) {
                        html += "<span class='marginLeft-5 recommendCarPrice'>指导价:" + data[i].carPrice + "万</span>";
                    }

                    html += "</div>\
                                </div>\
                            </a>\
                        </li>";
                    carOrgin.innerHTML += html;
                }//for
                if (res.data.total == 1) {
                    loading.style.display = "none ";
                    return;
                }
                lazyloadImg();
            }//if
        }//sucess
    })//ajax end
}
first();
/**
 * 推荐车源
 * @param type {number} 展示全部
 * @param page {number} 当前页数
 * @param size {number} 每页的条数
 */
window.onscroll = function () {
    if (totalPage == 1) {
        loading.style.display = "none ";
        return;
    }
    if (scrollSelect == true) {
        //warp高度
        var warpHeight = document.getElementById('warp').offsetHeight;
        //当前屏幕的高度
        var nowHeight = window.innerHeight;
        //滚动条的scrolltop
        var topHeight = document.body.scrollTop;
        if (topHeight > warpHeight - nowHeight - 200) {
            //如果页数大于后台的总页数则return
            if (page >= totalPage && page != 1) {
                scrollSelect = false;
                loading.style.display = "none";
                return;
            } else {
                page++;
                loading.style.display = "block";
            }
            if (scrollSelect == true) {
                scrollSelect = false;
                ajax({
                    type: "GET",
                    url: HOST + "/event/source/special_car?type=all & page=" + page + " &size=" + size,
                    dataType: "json",
                    data: '',
                    success: function (res, xml) {
                        if (res.code == 0) {
                            totalPage = res.data.total;//总页数
                            var data = res.data.rows;
                            for (var i = 0; i < data.length; i++) {
                                var html = "<li class='recommend'>";
                                if (data[i].sellOut == true) {
                                    html += "<a>";
                                } else {
                                    html += "<a href='cybapp://car/id/" + data[i].id + "'>";
                                }
                                html += "<div class='recommendImgBox'>\
                                    <img src='' data-src='"+ data[i].carImg + "' class='recommendImg'>";
                                if (data[i].sellOut == true) {
                                    html += " <img src='img/sell_outsmall.png' class='sellOutSmall'>";
                                }
                                html += "</div>\
                                    <div class='recommendText'>\
                                        <div class='recommendCarName strongText'>"+ data[i].carName + "</div>\
                                        <div class='fontColor fontSize-14 smallOut'>\
                                            <span>外观/内饰:</span>\
                                            <span class='marginLeft-5'>"+ (data[i].carFace || ' ') + "/" + data[i].carInterior + "</span>\
                                        </div>\
                                        <div class='fontColor fontSize-14 smallPrice'>\
                                            <span class='recommendCarSale'>￥"+ data[i].carSale + "万</span>";
                                if (data[i].carPrice != null && data[i].carPrice != 0 && data[i].carPrice != undefined) {
                                    html += "<span class='marginLeft-5 recommendCarPrice'>指导价:" + data[i].carPrice + "万</span>";
                                }

                                html += "</div>\
                                        </div>\
                                    </a>\
                                </li>";
                                carOrgin.innerHTML += html;
                            }//for
                            scrollSelect = true;
                            lazyloadImg();
                        }//if
                    }//sucess
                })//ajax end
            }

        }//if end
    }//if
}//scroll end