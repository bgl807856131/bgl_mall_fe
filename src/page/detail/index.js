/**
 * @Author buguoliang
 * @Date 2019/02/14 22:42
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bglMall      = require('util/bglMall.js');
var _product      = require('service/product-service.js');
var _cart         = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId : _bglMall.getUrlParam('productId') || ''
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        if (!this.data.productId) {
            _bglMall.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function () {
        var _this = this;

    },
    //加载商品详情数据
    loadDetail : function () {

    }
};

$(function () {
    page.init();
});