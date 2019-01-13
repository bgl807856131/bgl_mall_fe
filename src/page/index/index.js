/*
* @Author: buguoliang
* @Date:   2018-12-05 22:35:26
* @Last Modified by:   buguoliang
* @Last Modified time: 2018-12-06 00:00:37
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');

var templateBanner  = require('./banner.string');
var _bglMall        = require('util/bglMall.js');


$(function() {
    var bannerHtml = _bglMall.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
        dots: true
    });
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});