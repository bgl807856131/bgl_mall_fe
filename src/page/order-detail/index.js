/**
 * @Author buguoliang
 * @Date 2019/02/22 21:46
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _navSide      = require('page/common/nav-side/index.js');
var _bglMall      = require('util/bglMall.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _bglMall.getUrlParam('orderNumber')
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        //初始化左侧菜单
        _navSide.init({
            name : 'order-list'
        });
        this.loadDetail();
    },
    bindEvent : function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确定要取消该订单？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _bglMall.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function (errMsg) {
                    _bglMall.errorTips(errMsg);
                });
            }
        });
    },
    loadDetail : function () {
        var _this           = this,
            orderDetailHtml = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(_this.data.orderNumber, function (res) {
            _this.filterData(res);
            orderDetailHtml = _bglMall.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    filterData : function (data) {
        data.needPay      = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function () {
    page.init();
});