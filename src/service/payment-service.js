/**
 * @Author buguoliang
 * @Date 2019/02/22 23:32
 */
var _bglMall = require('util/bglMall.js');

var _payment = {
    //获取商品列表
    getPaymentInfo : function (orderNumber, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getPaymentStatus : function (orderNumber, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _payment;