/**
 * @Author buguoliang
 * @Date 2019/02/19 21:39
 */
var _bglMall = require('util/bglMall.js');

var _order = {
    //获取商品列表
    getProductList : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/get_order_cart_product.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    createOrder : function (orderInfo, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/create.do'),
            data    : orderInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getOrderList : function (listParam, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getOrderDetail : function (orderNumber, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    cancelOrder : function (orderNumber, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _order;
