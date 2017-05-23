/**
 * 活动专场模板
 */
var activityFirst = function (res) {
    var HTML = [
        '{@each data.rows as it, i}',
        '<a href="${it.linkUrl}?id=${it.id}">',
        '<img src="" data-src="${it.carImg}" class="activityImgStyle01"/>',
        '</a>',
        '{@/each}'
    ].join('\n');
    return HTML;
}

var activitySecond = function (res) {
    var HTML = [
        '{@each data.rows as it, i}',
        '<a href="${it.linkUrl}?id=${it.id}" >',
        '<img src="" data-src="${it.carImg}" class="activityImgStyle02"/>',
        '</a>',
        '{@/each}'
    ].join('\n');
    return HTML;
}