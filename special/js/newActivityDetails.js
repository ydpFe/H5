window.onload = function () {
	var spCar={
		/**
		 * 获取数据
		 */
		showPage:function(){
			var _this=this;
		    var HOST=getHOST();
			var id=getFinal().id;
			ajax({
				type: "GET",
				url: HOST + "/event/source/special_brand?id="+id,
				dataType: "json",
				data: {},
				success: function (data) {
					if(data.code==0){
						if(data.data.status==1){
							if(data.data.background.length!=0){
								_this.showBodyBg(data.data.background);//背景图和颜色
							}
							if(data.data.banner.length!=0){
								_this.showBanner(data.data.banner);//banner
							}
							if(data.data.top.length!=0){
								_this.showPushModule(data.data.top);//主推
							}
							if(data.data.ad.length!=0){
								_this.showCenterBanner(data.data.ad);//设置广告
							}
							if(data.data.list.length!=0){
								_this.showgoodsSource(data.data.list);//车辆列表
							}
							if(data.data.next.length!=0){
								_this.showNextBanner(data.data.next);//专场预告
							}
						}else if(data.data.status==0){//未开始
							_this.popup("抱歉，您所查看的特价车专场未开始");
							document.title="抱歉，您所查看的特价车专场未开始";//设置页面title
						}else if(data.data.status==2){//已结束
							_this.popup("抱歉，您所查看的特价车专场已结束");
							document.title="抱歉，您所查看的特价车专场已结束";//设置页面title
						}
					}
				}
			})
		},
		/**
		 * 弹窗
		 */
		 popup:function(data){
			 var popup=document.getElementById("popup");
			 var popupText=document.getElementById("popupText");
			 popup.style.display="block";
			 popupText.style.display="block";
			 popupText.innerHTML=data;
		 },
		/**
		 * 专场预告
		 */
		 showNextBanner:function(data){
			 var _this=this;
			if(data.image!=""){
				var nextBanner=document.getElementById("nextBanner");
				var html="<img src='"+data.image+setQnImg()+"' class='nextBannerStyle' id='nextabBanner'>";
				nextBanner.innerHTML=html;
				var nextabBanner=document.getElementById("nextabBanner");
				nextabBanner.addEventListener("click",function(){
					if(isWeiXin()==true){//微信环境
						_this.wx();
						return;
					}
					if(selectApp()==true){//APP内部
						if(data.json_code==1009){
							var token = getFinal();//获取到token
							var systemObj=selectSystem();//判断系统
							if (token.token == '' || token.token == undefined) {
								if (systemObj == "android") {
									var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
									if(selectApp()==true){//APP内部
										NewJavaInjectedUtils.startJump(url);
										return;
									}else{
										window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+url+";end\"";
										return;
									}
								} else {
									var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
									if(selectApp()==true){//APP内部
										iOSJump(url);
										return;
									}else{
										window.location="cheyuanbao://?params="+url;
										return;
									}
								}
							}
						}
						if(data.json!="" && data.json !=null){
							var systemObj=selectSystem();
							if(systemObj=='android'){
								var jumpObj=data.json.android;
								NewJavaInjectedUtils.startJump(JSON.stringify(jumpObj));
							}else{
								var jumpObj=data.json.ios;
								iOSJump(JSON.stringify(jumpObj));
							}
							return;
						}else{
							var href=data.url;
							window.location=href;
							return;
						}
					}else{//不是APP内部
						if(data.json_code==1009){
							var token = getFinal();//获取到token
							var systemObj=selectSystem();//判断系统
							if (token.token == '' || token.token == undefined) {
								if (systemObj == "android") {
									var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
									if(selectApp()==true){//APP内部
										NewJavaInjectedUtils.startJump(url);
										return;
									}else{
										window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+url+";end\"";
										return;
									}
								} else {
									var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
									if(selectApp()==true){//APP内部
										iOSJump(url);
										return;
									}else{
										window.location="cheyuanbao://?params="+url;
										return;
									}
								}
							}
						}
						if(data.json!="" && data.json!=null){
							var systemObj=selectSystem();
							if(systemObj=='android'){
								var jumpObj=data.json.android;
								window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+JSON.stringify(jumpObj)+";end\"";
							}else{
								var jumpObj=data.json.ios;
								window.location="cheyuanbao://?params="+JSON.stringify(jumpObj);
							}
							return;
						}else{
							var href=data.url;
							window.location=href;
							return;
						}
					}
					
				})
			}
		 },
		/**
		 * 设置车辆列表
		 */
		showgoodsSource:function(data){
			var _this=this;
			var jsonObj=[];
			if(data.length!=0){
				var goodsSourceBox=document.getElementById("goodsSourceBox");
				for(var i=0;i<data.length;i++){
					if(data[i].json!=""){
						var params={};
						params["android"] =JSON.stringify(data[i].json.android);
						params["ios"] =JSON.stringify(data[i].json.ios);
						jsonObj.push(params);
					}else{
						var params={};
						params["android"] ="";
						params["ios"] ="";
						jsonObj.push(params);
					}
					var html="<li class='carList' data-value='"+data[i].id+"'>\
							<img src='"+data[i].image+setQnImg()+"' class='sourceImg'>\
							<div class='sourceTitle'>"+data[i].title+"</div>\
							<div class='sourceMsg ellipsisObj'>外观/内饰:"+data[i].out_color+"/"+data[i].in_color+"</div>\
							<div class='sourceMsg ellipsisObj'>指导价:"+data[i].guide_price+"万</div>\
							<div class='sourceButton smallBtn'>"+data[i].price+"万</div>\
						</li>";
					goodsSourceBox.innerHTML+=html;
				}
				_this.carEvent(jsonObj);
			}
		},
		/**
		 * 设置车辆列表 点击事件
		 */
		carEvent:function(data){
			var _this=this;
			var carList=document.getElementsByClassName("carList");
			for(var i=0;i<carList.length;i++){
				(function(i){
					carList[i].addEventListener("click",function(){
						var val=this.getAttribute("data-value");//车辆ID
						//跳转
						if(isWeiXin()==true){//微信环境
							_this.wx();
							return;
						}
						if(selectApp()==true){//APP内部
							var href="cybapp://car/id/" + val;;
							window.location=href;
							return;
						}else{//不是APP内部
							if(data.length!=0){
								var systemObj=selectSystem();
								if(systemObj=='android'){
									var jumpObj=data[i].android;
									window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+jumpObj+";end\"";
								}else{
									var jumpObj=data[i].ios;
									window.location="cheyuanbao://?params="+jumpObj;
								}
								return;
							}
						}
					})
				}(i))
				
			}
		},
		/**
		 * 设置广告
		 */
		showCenterBanner:function(data){
			var _this=this;
			if(data.image!=""){
				var centerBanner=document.getElementById("centerBanner");
				var html="<img src='"+data.image+setQnImg()+"' class='centerBannerStyle' id='adBanner'>";
				centerBanner.innerHTML=html;
				var adBanner=document.getElementById("adBanner");
				adBanner.addEventListener("click",function(){
					if(isWeiXin()==true){//微信环境
						_this.wx();
						return;
					}
					if(selectApp()==true){//APP内部
						if(data.json_code==1009){
							var token = getFinal();//获取到token
							var systemObj=selectSystem();//判断系统
							if (token.token == '' || token.token == undefined) {
								if (systemObj == "android") {
									var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
									if(selectApp()==true){//APP内部
										NewJavaInjectedUtils.startJump(url);
										return;
									}else{
										window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+url+";end\"";
										return;
									}
								} else {
									var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
									if(selectApp()==true){//APP内部
										iOSJump(url);
										return;
									}else{
										window.location="cheyuanbao://?params="+url;
										return;
									}
								}
							}
						}
						if(data.json!="" && data.json !=null){
							var systemObj=selectSystem();
							if(systemObj=='android'){
								var jumpObj=data.json.android;
								NewJavaInjectedUtils.startJump(JSON.stringify(jumpObj));
							}else{
								var jumpObj=data.json.ios;
								iOSJump(JSON.stringify(jumpObj));
							}
							return;
						}else{
							var href=data.url;
							window.location=href;
							return;
						}
					}else{//不是APP内部
						if(data.json_code==1009){
							var token = getFinal();//获取到token
							var systemObj=selectSystem();//判断系统
							if (token.token == '' || token.token == undefined) {
								if (systemObj == "android") {
									var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
									if(selectApp()==true){//APP内部
										NewJavaInjectedUtils.startJump(url);
										return;
									}else{
										window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+url+";end\"";
										return;
									}
								} else {
									var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
									if(selectApp()==true){//APP内部
										iOSJump(url);
										return;
									}else{
										window.location="cheyuanbao://?params="+url;
										return;
									}
								}
							}
						}
						if(data.json!="" && data.json !=null){
							var systemObj=selectSystem();
							if(systemObj=='android'){
								var jumpObj=data.json.android;
								window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+JSON.stringify(jumpObj)+";end\"";
							}else{
								var jumpObj=data.json.ios;
								window.location="cheyuanbao://?params="+JSON.stringify(jumpObj);
							}
							return;
						}else{
							var href=data.url;
							window.location=href;
							return;
						}
					}
					
				})

			}
		},
		/**
		 * 设置背景图和颜色
		 */
		showBodyBg:function(data){
			var bodyBg=document.getElementById("bodyBg");
			if(data.color!=""){
				bodyBg.setAttribute("style","background-color:#"+data.color);
			}
			if(data.image!=""){
				bodyBg.setAttribute("style","background-image: url("+data.image+")");
			}
		},
		/**
		 * 渲染主推
		 */
		showPushModule:function(data){
			var pushModule=document.getElementById("pushModule");
			var jsonObj=[];
			for(var i=0;i<data.length;i++){
				var localData=getCookie("vals");
				var id=data[i].id;
				if(data[i].json!=""){
					var params={};
					params["android"] =JSON.stringify(data[i].json.android);
					params["ios"] =JSON.stringify(data[i].json.ios);
					jsonObj.push(params);
				}else{
					var params={};
					params["android"] ="";
					params["ios"] ="";
					jsonObj.push(params);
				}
				var html="<div class='pushGoodsHeader' data-value='"+data[i].id+"'>\
                    <div class='pushGoodsImgBox'>\
                        <img src='"+data[i].image+setQnImg()+"' class='pushGoodsImg'/>";
					if(localData==null || localData.indexOf(id)==-1){
						html+="<img class='icon'>";
					}
                    html+="</div>\
						<div class='goodsMsgBox'>\
							<div class='goodsTitle ellipsisObj'>"+data[i].title+"</div>\
							<div class='goodsMsg fontColor_5c5c5c nameWidth ellipsisObj'>外观/内饰:"+data[i].out_color+"/"+data[i].in_color+"</div>\
							<div class='goodsPrice fontColor_5c5c5c'><span class='textAlign_top'>售价:<small class='priceStyle'>"+data[i].price+"</small>万</span></div>\
							<div class='goodsMsg fontColor_5c5c5c ellipsisObj'>指导价:"+data[i].guide_price+"万/优惠"+data[i].discount+""+data[i].discount_unit+"</div>";
					if(data[i].company.length!=0){
						html+="<div class='goodsMsg fontColor_AB6E41'><img  class='goodsCompanyIcon fl'><span class='fl'>"+data[i].company+"</span></div>";
					}
					html+="</div>\
						<div class='goodsButton bigBtn'>发起担保交易</div>\
					</div>";
				pushModule.innerHTML+=html;
			}
			this.pushEvent(jsonObj);
			this.setIcon();
		},
		/**
		 * 渲染banner
		 */
		showBanner:function(data){
			document.title=data.title;//设置页面title
			if(data.image!=""){
				var headerBox=document.getElementById("headerBox");
				var html="<img src='"+data.image+setQnImg()+"'/>";
				headerBox.innerHTML=html;
			}

		},
		/**
		 * 设置 new icon
		 */
		setIcon:function(){
			var iconObj=document.getElementsByClassName("icon");
			for(var i=0;i<iconObj.length;i++){
				iconObj[i].setAttribute("src",iconSrc());
			}
			var goodsCompanyIconObj=document.getElementsByClassName("goodsCompanyIcon");
			for(var i=0;i<goodsCompanyIconObj.length;i++){
				goodsCompanyIconObj[i].setAttribute("src",goodsCompanyIconSrc());
			}
		},
		/**
		 * 存储用户选中车辆id
		 */
		pushEvent:function(data){
			var _thisObj=this;
			var pushGoodsHeader=document.getElementsByClassName("pushGoodsHeader");
			var valueMap=[];
			var oldMap=getCookie("vals");
			if(oldMap!=null){
				valueMap=oldMap.split(",");
			}
			for(var i=0;i<pushGoodsHeader.length;i++){
				(function(i){
					pushGoodsHeader[i].addEventListener("click",function(){
						var _this=this;
						var val=this.getAttribute("data-value");//车辆ID
						var mapString=JSON.stringify(valueMap);
						var valString=JSON.stringify(val);
						if(mapString.indexOf(valString)==-1){
							valueMap.push(val);
							var msg=valueMap.toString();
							setCookie('vals',msg,365)
							//设置icon隐藏
							var icon=_this.getElementsByClassName("icon");
							if(icon.length!=0){
								icon[0].style.display="none";
							}
						}
						//跳转
						if(isWeiXin()==true){//微信环境
							_thisObj.wx();
							return;
						}
						if(selectApp()==true){//APP内部
							var href="cybapp://car/id/" + val;;
							window.location=href;
							return;
						}else{//不是APP内部
							if(data.length!=0){
								var systemObj=selectSystem();
								if(systemObj=='android'){
									var jumpObj=data[i].android;
									window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+jumpObj+";end\"";
								}else{
									var jumpObj=data[i].ios;
									window.location="cheyuanbao://?params="+jumpObj;
								}
								return;
							}
						}
					})
				}(i))
			}
		},
		/**
		 * 设置微信下遮罩层
		 */
		wx:function(){
			var wxTask=document.getElementById("wxTask");
			wxTask.style.display="block";
		},
		/**
		 * 微信下 点击时间
		 */
		wxEvent:function(){
			wxTask.addEventListener("click", function () {
                wxTask.style.display = 'none';
            })
		},
		/**
		 * APP内部 跳转到登录页面
		 */
		setLogin:function(){
			var token = getFinal();//获取到token
			var systemObj=selectSystem();//判断系统
			if (token.token == '' || token.token == undefined) {
				if (systemObj == "android") {
                    var url = "{\"clazz\": \"com.kqc.b2b.ui.user.login.LoginActivity\",\"name\": \"登录\",\"params\": []}";
					if(selectApp()==true){//APP内部
						NewJavaInjectedUtils.startJump(url);
						return false;
					}else{
						window.location="intent://main/#Intent;scheme=kqc;package=com.kqc.b2b;S.msg="+url+";end\"";
						return false;
					}
                } else {
                    var url = "{\"p\": [],\"n\": \"SwiftLoginViewController\",\"c\": {\"t\": \"2\",\"i\": \"\",\"s\": \"SwiftLoginViewController\"}}";
					if(selectApp()==true){//APP内部
						iOSJump(url);
						return false;
					}else{
						window.location="cheyuanbao://?params="+url;
						return false;
					}
                }
			}

		},
		/**
		 * 解决安卓下 浮动像素差
		 */
		adaptation:function(){
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1) {
				document.getElementById('bodyBg').setAttribute("class", "androidObj");
			}
		},
		/**
		 * 初始化
		 */
		init:function(){
			this.showPage();
			this.wxEvent();
			this.adaptation();
		}
	}
	spCar.init();
}
window.GetTitle = function(){
	return document.title;
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
 * 获取HOST请求参数
 * @returns {HOST}
 */
function getHOST() {
    var oldUrl = document.domain;
    var num = oldUrl.lastIndexOf('.');
    var newUrl = oldUrl.substring(num + 1, oldUrl.length);
    if (newUrl == 'cc') {
        var HOST = "https://api.cyb.kuaiqiangche.cc";
    } else if (newUrl == 'com') {
        var HOST = "https://api.cyb.kuaiqiangche.com";
    } else {
        var HOST = "https://dev.cyb.kuaiqiangche.cc";
    }
    return HOST;
}
/**
 * 设置 base64 cion
 */
function iconSrc(){
	var iconSrc="data:image/png;base64,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";
	return iconSrc;
}
/**
 * 设置 base64 cion
 */
function goodsCompanyIconSrc(){
	var goodsCompanyIcon="data:image/png;base64,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";
	return goodsCompanyIcon;
}
/**
 * 设置 七牛
 */
function setQnImg(){
	// var deviceWidth = parseInt(document.documentElement.clientWidth);
	// var url="?imageView2/2/q/90/interlace/1/w/"+deviceWidth;
	return "";
}
