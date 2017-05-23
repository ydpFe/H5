/**
 * 获取HOST
 */
var HOST = getHost();
/*
 juicer配置项
 */
juicer.set('cache', false);
juicer.set('errorhandling', false);
juicer.set('strip', true);
juicer.set('detection', false);
/**
 * 设置banner和背景色
 */
ajax({
    type: "GET",
    url: HOST + "/event/source/activity_background",
    dataType: "json",
    data: {},
    success: function (data) {
        if (data.code == 0) {
            var data = data.data.configs;
            if (data.bgImageStatus == 1 && data.bgImage != '') {
                var BANNERMESSAGE = document.getElementById("bannerMessage");
                var systemObj = selectSystem();//判断系统
                var objAPP = selectApp();//判断是否在APP内部
                var flagSelect;//判断是在浏览器打开还是在APP内部打开
                var param = {};//存放链接
                var linkLength = data.bgImageLinkExtra[0].url;//判断URL是链接 还是数字（数字的情况指定到http://wap.b.kuaiqiangche.com/carsource.html?car_id=数字）
                var str = /^[0-9]*$/;
                var r = linkLength.match(str);
                //判断URL是链接 还是数字（数字的情况指定到http://wap.b.kuaiqiangche.com/carsource.html?car_id=数字）
                if (r == null) {
                    param["linkUrl"] = linkLength;
                    param["clickUrl"] = '';
                } else {
                    if (objAPP == true) {
                        param["linkUrl"] = "cybapp://car/id/" + linkLength;
                        param["clickUrl"] = '';
                    } else {
                        param["linkUrl"] = "http://wap.b.kuaiqiangche.com/carsource.html?car_id=" + linkLength;
                        param["clickUrl"] = '';
                    }
                }
                //配置了唤起原生的链接
                if (data.bgImageLinkExtra[0].json != null) {
                    if (objAPP == true) {//在APP里面打开走内部函数唤起APP
                        flagSelect = false;
                        if (systemObj == 'android') {
                            param["linkUrl"] = '';
                            var message = JSON.stringify(data.bgImageLinkExtra[0].json.android);
                            param["clickUrl"] = "(function(){ NewJavaInjectedUtils.startJump(JSON.stringify(" + message + "));})()";

                        } else if (systemObj == 'iphone') {

                            param["linkUrl"] = '';
                            var message = JSON.stringify(data.bgImageLinkExtra[0].json.ios)
                            param["clickUrl"] = "(function(){var str =" + message + ";iOSJump(str);})()";

                        }
                    } else {//在浏览器里唤起APP走协议
                        flagSelect = true;
                        if (systemObj == 'android') {
                            param["linkUrl"] = '';
                            if (data.bgImageLinkExtra[0].json.android.params != '' && data.bgImageLinkExtra[0].json.android.params != null) {
                                andParams = ",params:[{hint:" + data.bgImageLinkExtra[0].json.android.params[0].hint + ",key:" + data.bgImageLinkExtra[0].json.android.params[0].key + ",type:" + data.bgImageLinkExtra[0].json.android.params[0].type + "}]";
                            } else {
                                andParams = " ";
                            }
                            param["clickUrl"] = "intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg={clazz:" + data.bgImageLinkExtra[0].json.android.clazz + andParams + "};end\"";

                        } else if (systemObj == 'iphone') {
                            param["linkUrl"] = '';
                            iosParams = JSON.stringify(data.bgImageLinkExtra[0].json.ios);
                            param["clickUrl"] = "cheyuanbao://?params=" + iosParams;
                        }
                    }
                }
                var arr = [];
                arr.push(param);//将数据放在map里面
                if (arr[0].clickUrl != '') {//如果配置了唤起APP参数
                    if (flagSelect == true) {//在浏览器走协议唤起APP
                        var HTML = "<a href='" + arr[0].clickUrl + "'><img  data-src='" + data.bgImage + "' style='display:block'/></a>"
                    } else if (flagSelect == false) {//在APP内部走函数唤起APP
                        var HTML = "<a onclick='" + arr[0].clickUrl + "'><img  data-src='" + data.bgImage + "' style='display:block'/></a>"
                    }
                } else {//没有配置唤起APP的参数
                    var HTML = "<a href='" + arr[0].linkUrl + "'><img src='' data-src='" + data.bgImage + "' style='display:block'/></a>"
                }
                BANNERMESSAGE.innerHTML = HTML;
                //执行懒加载
                lazyloadImg("bannerMessage");

            }
        }
    }
})
/**
 * 根据是否认证和登陆动态设置跳转方式
 */
function setJump() {
    var systemObj = selectSystem();
    //取消
    var cancel = document.getElementById("cancel");
    cancel.addEventListener("click", function () {
        var markContainer = document.getElementById("mark_container");
        var dialogContainer = document.getElementById("dialog_container");
        markContainer.style.display = "none";
        dialogContainer.style.display = "none";
    })
    //去认证
    var handler = function () {
        if (systemObj == 'android') {
            var url = "{\"clazz\": \"com.kqc.b2b.ui.main.MainActivity\",\"name\": \"首页\",\"params\": [{\"hint\": \"3\",\"key\": \"targetFragmentIndex\",\"type\": \"java.lang.Integer\"}]}";
            NewJavaInjectedUtils.startJump(url);
        } else {
            var url = "{\"p\": [{\"k\": \"pushSelectedIndex\",\"t\": \"NSUInteger\",\"v\": \"3\"}],\"n\": \"MainTabBarController\",\"c\": {\"t\": \"0\",\"s\": \"\",\"i\": \"\"}}";
            iOSJump(url);
        }
    };
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", handler, false);
}
/**
 * 根据是否完善资料 进行跳转 
 */
function newSetJump(){
    var systemObj = selectSystem();
    if (systemObj == 'android') {
        var obj={
                    "clazz": "com.kqc.b2b.ui.user.info.UserInfoActivity",
                    "name": "车源列表的搜索和筛选结果页面",
                    "params": [
                        {
                        "hint": "true",
                        "key": "INTENT_SHOW_BACK",
                        "type": "java.lang.Boolean"
                        },
                        {
                        "hint": "true",
                        "key": "INTENT_SHOW_NEXT",
                        "type": "java.lang.Boolean"
                        },
                        {
                        "hint": "false",
                        "key": "INTENT_SKIP_AUTH",
                        "type": "java.lang.Boolean"
                        }
                    ]
            };
            var url=JSON.stringify(obj);
            NewJavaInjectedUtils.startJump(url);
    } else {
        var obj={
                    "p": [
                        {
                        "k":"isInfoNotComplete",
                        "t":"BOOL",
                        "v":1
                        },
                        {
                        "k":"entrance",
                        "t":"NSUInteger",
                        "v":601
                        }
                    ],
                    "n": "PersonalInfoViewController",
                    "c": {
                        "t": "1",
                        "s": "Mine",
                        "i": "PersonalInfoViewControllerId"
                    }
                };
        var url=JSON.stringify(obj);
        iOSJump(url);
    }
}
window.onload = function () {
    /**
     *特价车报名
     */
    var wxObj = isWeiXin();//判断微信
    var appObj = selectApp();//判断是否在APP内部
    var token = getFinal();//获取到token
    var systemObj = selectSystem();//获取到系统
    var signUpButton = document.getElementById("signUpButton");
    var wxTask = document.getElementById("wxTask");
    //如果是在微信内部  后续可能还有需求 不能删除
    // if(wxObj==true){
    //     signUpButton.addEventListener("click",function(){
    //         wxTask.style.display='block';
    //         wxTask.addEventListener("click",function(){
    //             wxTask.style.display='none';
    //         })
    //     })
    // }
    //如果在APP内部
    if (appObj == true) {
        signUpButton.addEventListener("click", function () {
            if (token.token != '' && token.token != undefined) {
                var HT = getYZHost();
                var markContainer = document.getElementById("mark_container");
                var dialogContainer = document.getElementById("dialog_container");
                //获取用户信息
                ajax({
                    type: "GET",
                    url: HT + "/user_info?token=" + token.token,
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        var data = data.data;
                        if (data.name.length==0) {
                            //目前交互是取消了弹窗交互 直接进行跳转  但是以后可能会改回来 所以先不删除下边的代码
                            // markContainer.style.display = "block";
                            // dialogContainer.style.display = "block";
                            // setJump();
                            newSetJump();
                        } else {//特价车发布
                            if (systemObj == "android") {
                                var url ={
                                    clazz: "com.kqc.b2b.ui.publish.publish.PublishCarActivity",
                                    name: "发布车源",
                                    params: [
                                        {
                                            hint: "是否全渠道",
                                            "key": "IS_ALL_CHANNEL_FLAG",
                                            "type": "java.lang.Boolean"
                                        },
                                        {
                                            "hint": 1,
                                            "key": "channel",
                                            "type": "java.lang.Integer"
                                        },
                                        {
                                            hint: 6,
                                            "key": "brand_entrance",
                                            "type": "java.lang.Integer"
                                        },
                                        {
                                            "hint": 1,
                                            "key": "orderBy",
                                            "type": "java.lang.Integer"
                                        },
                                        {
                                            "hint": 6,
                                            "key": "target",
                                            "type": "java.lang.Integer"
                                        },
                                        {
                                            "hint": "自定义车型",
                                            "key": "isCustomCarModel",
                                            "type": "java.lang.Boolean"
                                        },
                                        {
                                            "hint":true,
                                            "key": "is_import_offten_brand_visibile",
                                            "type": "java.lang.Boolean"
                                        },
                                        {
                                            "hint": "",
                                            "key": "b_page_name",
                                            "type": "java.lang.String"
                                        },
                                        {
                                            "hint": 6,
                                            "key": "type_id",
                                            "type": "java.lang.Integer"
                                        }
                                    ]
                                };
                                //var url = "{\"clazz\": \"com.kqc.b2b.ui.publish.publish.PublishCarActivity\",\"name\": \"发布车源\",\"params\": [{\"hint\": \"2\",\"key\": \"SOURCE_TYPE\",\"type\": \"java.lang.Integer\"}]}";
                                NewJavaInjectedUtils.startJump(JSON.stringify(url));
                            } else {
                                 var url="{\"p\": [{\"k\": \"type\",\"t\": \"NSString\",\"v\": \"2\"},{\"k\": \"title\",\"t\": \"NSString\",\"v\": \"发布特价车源\"}],\"n\": \"PublishViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"PublishViewController\"}}";
                                //var url = {
                                //    "p": [
                                //        {
                                //            "k": 'isPubLish',
                                //            "t": "BOOL",
                                //            "v": 1
                                //        },
                                //        {
                                //            "k": 'isSpeical',
                                //            "t": "BOOL",
                                //            "v": 1 //特价车传yes 其他为NO
                                //        },
                                //    ],
                                //    "n": "CarsourceListViewController",
                                //    "c": {
                                //        "a": "0",
                                //        "g": "0",
                                //        "t": "1",
                                //        "s": "CarSource",
                                //        "i": "CarsourceListVCId"
                                //    }
                                //};
                                iOSJump(url);
                            }

                        }
                    }
                })//ajax end
            } else {
                if (systemObj == "android") {
                    var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
                    NewJavaInjectedUtils.startJump(url);
                } else {
                    var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
                    iOSJump(url);
                }
            }
        })
    }
    /**
     *强制唤起APP到车源广场首页原生页面
     */
    if (appObj == false) {
        var selectObj = selectSystem();//判断系统
        if (selectObj == 'android') {
            var urls='https://h5.cyb.kuaiqiangche.com/special/activityDetails.html';
                var jumpObj='{"clazz":"com.kqc.b2b.ui.webview.WebViewActivity","name":"通用web","params":[{"hint":"'+urls+'","key":"wap_url","type":"java.lang.String"},{"hint":"标题","key":"wap_title","type":"java.lang.String"},{"hint":"false","key":"isShare","type":"java.lang.Boolean"}]}';
                var href="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+jumpObj+";end\"";
                window.location=href;
        } else {
             var urls='https://h5.cyb.kuaiqiangche.com/special/activityDetails.html';
                var jumpObj='{"p":[{"k":"urlString","t":"NSString","v":"'+urls+'"}],"n":"KQCWebViewController","c":{"t":"0","s":"","i":""}}';
                var href="cheyuanbao://?params="+jumpObj;
                window.location=href;
        }

    }
}
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
            //渲染titile
            var TPDATRECOMMENDTITLE = document.getElementById("todayRecommendTitle");
            if (res.data.image == '') {
                var IMGTITLE = "<img data-src='img/tpdayPush.png'/>";
            } else {
                var IMGTITLE = "<img data-src='" + res.data.image + "'/>";
            }
            TPDATRECOMMENDTITLE.innerHTML = IMGTITLE;
            //定义对象
            var TODATRECOMMEND = document.getElementById("todayRecommend");
            //设置背景色
            if (res.data.color != '') {
                TODATRECOMMEND.style.background = '#' + res.data.color;
                TPDATRECOMMENDTITLE.style.background = '#' + res.data.color;
            }
            // TODATRECOMMEND.style.background = '#6897e3';
            // TPDATRECOMMENDTITLE.style.background = '#6897e3';
            //挂载模板
            if (res.data.tpl == 1) {
                var HTML = juicer(todayFirst(), res);
            } else if (res.data.tpl == 2) {
                var HTML = juicer(todaySecond(), res);
            } else if (res.data.tpl == 3) {
                var HTML = juicer(todayThird(), res);
            } else {
                var HTML = juicer(todayFirst(), res);
            }
            TODATRECOMMEND.innerHTML = HTML;
            //指定懒加载容器
            lazyloadImg("todayRecommend");
            lazyloadImg("todayRecommendTitle");
            activityFun();
        }
    }
})
/**
 *活动专场
 * @param type {number} 活动专场
 */
function activityFun() {
    ajax({
        type: "GET",
        url: HOST + "/event/source/activity?type=0",
        dataType: "json",
        data: {},
        success: function (res, xml) {
            if (res.code == 0 && res.data.rows.length != 0) {
                //填充title
                var TITLE = document.getElementById('specialTitle');
                if (res.data.image == '') {
                    var IMGTITLE = "<img data-src='img/activity.png'/>";
                } else {
                    var IMGTITLE = "<img data-src='" + res.data.image + "'/>";
                }
                TITLE.innerHTML = IMGTITLE;
                //创建对象
                var SPECIALBOX = document.getElementById("specialBox");
                //设置背景色
                if (res.data.color != '') {
                    SPECIALBOX.style.background = '#' + res.data.color;
                    TITLE.style.background = '#' + res.data.color;
                }
                // SPECIALBOX.style.background = '#6897e3';
                // TITLE.style.background = '#6897e3';
                //挂载模板
                if (res.data.tpl == 1) {
                    var HTML = juicer(activityFirst(), res);
                } else if (res.data.tpl == 2) {
                    var HTML = juicer(activitySecond(), res);
                } else {
                    var HTML = juicer(activityFirst(), res);
                }
                SPECIALBOX.innerHTML = HTML;
                //指定懒加载容器
                lazyloadImg("specialBox");
                lazyloadImg("specialTitle");
            }
            sourceFun();
        }
    })
}
function sourceFun() {
    //创建对象
    var page = 1;//页数
    var totalPage = 0;//总页数
    var size = 10;//每页条数
    var scrollSelect = true;//控制滚动
    //创建对象
    var CARORGIN = document.getElementById('carOrgin');//和屏幕同宽的容器
    var SOURCEFRAMEBOX = document.getElementById('sourceFrameBox')//不和屏幕同宽的容器
    var LOADING = document.getElementById('loading')//不和屏幕同宽的容器
    var ORGINBGCOLOR = document.getElementById('orginBgColor')//推荐车源背景色容器
    /**
     * 推荐车源
     * @param type {number} 展示全部
     * @param page {number} 当前页数
     * @param size {number} 每页的条数
     */
    ajax({
        type: "GET",
        url: HOST + "/event/source/special_car?type=all&page=1&size=" + size,
        dataType: "json",
        data: '',
        success: function (res, xml) {
            if (res.code == 0) {
                //将对象传入res
                var OBJAPP = selectApp();//判断是否是在APP 内部
                res.OBJAPP = OBJAPP;
                res.ImgObj = 0;//用来判断是否是首次加载的10条数据
                //设置title
                var CARORGINTITLE = document.getElementById('carOrginTitle');
                if (res.data.image == '') {
                    var IMGTITLE = "<img data-src='img/source.png'/>";
                } else {
                    var IMGTITLE = "<img data-src='" + res.data.image + "'/>";
                }
                CARORGINTITLE.innerHTML = IMGTITLE;
                //拿到总页数
                totalPage = res.data.total;//总页数
                //加载canvas loading
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
                LOADING.appendChild(circle.canvas);
                //设置背景色
                if (res.data.color != '') {
                    CARORGIN.style.background = '#' + res.data.color;
                    SOURCEFRAMEBOX.style.background = '#' + res.data.color;
                    CARORGINTITLE.style.background = '#' + res.data.color;
                    ORGINBGCOLOR.style.background = '#' + res.data.color;
                    LOADING.style.background = '#' + res.data.color;
                }
                // CARORGIN.style.background = '#6897e3';
                // SOURCEFRAMEBOX.style.background = '#6897e3';
                // CARORGINTITLE.style.background = '#6897e3';
                //挂载模板
                if (res.data.tpl == 1) {
                    var HTML = juicer(sourceFirst(), res);
                    CARORGIN.innerHTML = HTML;
                    lazyloadImg("carOrgin");
                } else if (res.data.tpl == 2) {
                    var HTML = juicer(sourceSecond(), res);
                    SOURCEFRAMEBOX.innerHTML = HTML;
                    lazyloadImg("sourceFrameBox");
                } else if (res.data.tpl == 3) {
                    var HTML = juicer(sourceThird(), res);
                    SOURCEFRAMEBOX.innerHTML = HTML;
                    lazyloadImg("sourceFrameBox");
                } else if (res.data.tpl == 4) {
                    var HTML = juicer(sourceFourth(), res);
                    CARORGIN.innerHTML = HTML;
                    lazyloadImg("carOrgin");
                } else {
                    var HTML = juicer(sourceFirst(), res);
                    CARORGIN.innerHTML = HTML;
                    lazyloadImg("carOrgin");
                }
                lazyloadImg("carOrginTitle");
                //如果页数只有一页则 return
                if (res.data.total == 1) {
                    LOADING.style.display = "none ";
                    return;
                }
            }//if
        }//sucess
    })//ajax end

    /**
     //  * 推荐车源 滚动加载剩余
     //  * @param type {number} 展示全部
     //  * @param page {number} 当前页数
     //  * @param size {number} 每页的条数
     //  */
    window.onscroll = function () {
        if (totalPage == 1) {
            LOADING.style.display = "none ";
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
                    LOADING.style.display = "none";
                    return;
                } else {
                    page++;
                    LOADING.style.display = "block";
                }
                if (scrollSelect == true) {
                    scrollSelect = false;
                    ajax({
                        type: "GET",
                        url: HOST + "/event/source/special_car?type=all&page=" + page + "&size=" + size,
                        dataType: "json",
                        data: '',
                        success: function (res, xml) {
                            if (res.code == 0) {
                                //将对象传入res
                                var OBJAPP = selectApp();//判断是否是在APP 内部
                                res.OBJAPP = OBJAPP;
                                res.ImgObj = 1;//用来判断是否是首次加载的10条数据
                                console.log(OBJAPP);
                                //挂载模板
                                if (res.data.tpl == 1) {
                                    var HTML = juicer(sourceFirst(), res);
                                    CARORGIN.innerHTML += HTML;
                                    lazyloadImg("carOrgin");
                                    if (OBJAPP == false) {
                                        buttonMore();
                                        scrollSelect = false;
                                        LOADING.style.display = "none";
                                        return;
                                    }
                                } else if (res.data.tpl == 2) {
                                    var HTML = juicer(sourceSecond(), res);
                                    SOURCEFRAMEBOX.innerHTML += HTML;
                                    lazyloadImg("sourceFrameBox");
                                    if (OBJAPP == false) {
                                        buttonMore();
                                        scrollSelect = false;
                                        LOADING.style.display = "none";
                                        return;
                                    }
                                } else if (res.data.tpl == 3) {//3
                                    var HTML = juicer(sourceThird(), res);
                                    SOURCEFRAMEBOX.innerHTML += HTML;
                                    lazyloadImg("sourceFrameBox");
                                    if (OBJAPP == false) {
                                        buttonMore();
                                        scrollSelect = false;
                                        LOADING.style.display = "none";
                                        return;
                                    }
                                } else if (res.data.tpl == 4) {
                                    var HTML = juicer(sourceFourth(), res);
                                    CARORGIN.innerHTML += HTML;
                                    lazyloadImg("carOrgin");
                                    if (OBJAPP == false) {
                                        buttonMore();
                                        scrollSelect = false;
                                        LOADING.style.display = "none";
                                        return;
                                    }
                                } else {
                                    var HTML = juicer(sourceFirst(), res);
                                    CARORGIN.innerHTML += HTML;
                                    lazyloadImg("carOrgin");
                                    if (OBJAPP == false) {
                                        buttonMore();
                                        scrollSelect = false;
                                        LOADING.style.display = "none";
                                        return;
                                    }
                                }
                                scrollSelect = true;
                            }//if
                        }//sucess
                    })//ajax end
                }

            }//if end
        }//if
    }//scroll end
}
function buttonMore() {
    var buttonMore = document.getElementById("buttonMore");
    buttonMore.addEventListener("click", function () {
        var wxObj = isWeiXin();
        var wxTask = document.getElementById("wxTask");
        if (wxObj == true) {
            wxTask.style.display = "block";
            wxTask.addEventListener("click", function () {
                wxTask.style.display = 'none';
            })
        }
        //添加唤起APP链接
        var selectObj = selectSystem();//判断系统
        if (selectObj == 'android') {
            var newurl = "intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg={\"clazz\":\"com.kqc.b2b.ui.main.MainActivity\",\"name\":\"首页\",\"params\":[{\"hint\":\"1\",\"key\":\"targetFragmentIndex\",\"type\":\"java.lang.Integer\"}]};end\"";
            document.location = newurl;
        } else {
            var url = "cheyuanbao://?params={\"p\":[{\"k\": \"pushSelectedIndex\",\"t\": \"NSUInteger\",\"v\": \"1\"}],\"n\": \"MainTabBarController\",\"c\": {\"t\": \"0\",\"s\": \"\",\"i\": \"\"}}";
            document.location = url;
        }
    })
}