/**
 * @Author buguoliang
 * @Date 2019/02/22 23:19
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bglMall      = require('util/bglMall.js');
var _payment      = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _bglMall.getUrlParam('orderNumber')
    },
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function () {
        var _this           = this,
            paymentHtml     = '',
            $pageWrap       = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber, function (res) {
            paymentHtml = _bglMall.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    listenOrderStatus : function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5e3);
    }
};

$(function () {
    page.init();
});