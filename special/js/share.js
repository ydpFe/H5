/**
 * 今日主推模板
 */
var todayFirst=function(){
    var HTML=[
				'{@each data.list as it, i}',
					'<li class="activityBg">',
					'{@if OBJAPP === true}',
							'{@if it.sellOut === true}',
								'<a>',
							'{@else}',
								'<a href="cybapp://car/id/${it.id}">',
							'{@/if}',
					'{@else}',
							'{@if it.sellOut === true}',
								'<a>',
							'{@else}',
								'<a href="http://wap.b.kuaiqiangche.com/carsource.html?car_id=${it.id}">',
							'{@/if}',
					'{@/if}',
					'<div class="bgImgBox"><img src="img/sale.png" class="bgImg"></div>',
          '<div class="positionImg">',
              '<img src="" data-src="${it.carImg}"  class="carZindex"/>',
          '{@if it.sellOut === true}',
          		'<img src="" data-src="img/sell_outbig.png"  class="sellOut"/>',
          '{@/if}',
          '</div>',
          '<div class="positionText">',
              '<div class="carMessage carNameBox strongText ellipsisObj">${it.carName}</div>',
              '<div class="carMessage fontColor fontSize-14 out">',
                  '<span>外观/内饰:</span>',
                  '<span class="marginLeft-5">${it.carFace}/${it.carInterior}</span>',
              '</div>',
              '<div class="carMessage fontColor fontSize-14 out">',
          '{@if it.carPrice !=null && it.carPrice !=0}',
          		'<span>指导价:</span>',
                 '<span class="marginLeft-5">${it.carPrice}万/${it.carDiscount}</span>',
          '{@/if}',
          '</div>',
           		'</div>',
                '<div class="positionSale"><span class="fontSize-16">￥</span>${it.carSale}<span class="fontSize-16">万</span></div>',
                    '</a>',
          '</li>',
				'{@/each}'
		].join('\n');
    
    return HTML;
}

var todaySecond=function(){
		var HTML=[
				'{@each data.list as it, i}',
					'<li class="todaybox">',
							'{@if OBJAPP === true}',
									'{@if it.sellOut === true}',
										'<a>',
									'{@else}',
										'<a href="cybapp://car/id/${it.id}">',
									'{@/if}',
							'{@else}',
									'{@if it.sellOut === true}',
										'<a>',
									'{@else}',
										'<a href="http://wap.b.kuaiqiangche.com/carsource.html?car_id=${it.id}">',
									'{@/if}',
							'{@/if}',
							'<div class="todayCarImgBox">',
								'<img src="" data-src="${it.carImg}" class="todayCarImg">',
							'{@if it.sellOut === true}',
								'<img src="img/sell_outbig.png" class="todayCarSellOut">',
							'{@/if}',
							'</div>',
							'<div class="todayCarName strongText ellipsisObj">',
								'${it.carName}',
							'</div>',
							'<div class="todayCarin font-size-14">',
								'外观内饰: ${it.carFace}/${it.carInterior}',
							'</div>',
							'{@if it.carPrice !=null && it.carPrice !=0}',
								'<div class="todayCarPrice font-size-14">',
									'指导价: ${it.carPrice}/${it.carDiscount}',
								'</div>',
							'{@/if}',
							'<div class="todayCarBigPrice">',
							'<span class="fontColor-orange font-size-16">￥</span>',
							'<span class="fontColor-orange font-size-30 strongText font-style-oblique">${it.carSale}</span>',
							'<span class="fontColor-orange font-size-14">万</span>',
							'</div>',
						'</a>',
          '</li>',
				'{@/each}'
		].join('\n');
		return HTML;
}

var todayThird=function(){
	var HTML=[
			'{@each data.list as it, i}',
				'<li class="todayXbox">',
								'{@if OBJAPP === true}',
										'{@if it.sellOut === true}',
											'<a>',
										'{@else}',
											'<a href="cybapp://car/id/${it.id}">',
										'{@/if}',
								'{@/if}',
								'{@if OBJAPP === false}',
										'{@if it.sellOut === true}',
											'<a>',
										'{@else}',
											'<a href="http://wap.b.kuaiqiangche.com/carsource.html?car_id=${it.id}">',
										'{@/if}',
								'{@/if}',
								'<div class="todayXCarBox">',
									'<div class="positionBox">',
										'{@if it.sellOut == true}',
											'<img src="img/sell_outsmall.png" class="todayXCarSellOut">',
										'{@/if}',
										'<img src="" data-src="${it.carImg}" class="todayXCarImg">',
									'</div>',
								'<span class="todayXCarButton font-size-14">点击查看</span>',
								'</div>',
								'<div class="todayXCarMessageBox">',
									'<div class="todayXCarName ellipsisObj">${it.carName}</div>',
									'<div class="todayXCarIn">外观内饰: ${it.carFace}/${it.carInterior}</div>',
									'{@if it.carPrice !=null && it.carPrice !=0}',
										'<div class="todayXCarPrice">指导价: ${it.carPrice}/${it.carDiscount}</div>',
									'{@/if}',
									'<div class="todayXCarBigPrice">',
										'<span class="fontColor-yellow font-size-16">￥</span>',
										'<span class="fontColor-yellow font-size-30 strongText font-style-oblique">${it.carSale}</span>',
										'<span class="fontColor-yellow font-size-14">万</span>',
									'</div>',
								'</div>',
								'</a>',
				 '</li>',
			'{@/each}'
	].join('\n');
	return HTML;
}