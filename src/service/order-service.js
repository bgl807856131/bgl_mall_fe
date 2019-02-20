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
    }
}

module.exports = _order;
