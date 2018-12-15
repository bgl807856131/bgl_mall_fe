/**
 * @Author buguoliang
 * @Date 2018/12/13 23:53
 */

require('./index.css');
require('page/common/nav-simple/index.css');
var _bglMall = require('util/bglMall.js');

$(function () {
    var type = _bglMall.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
})
