/**
 * @Author buguoliang
 * @Date 2018/12/10 23:09
 */
var _bglMall = require('util/bglMall.js');

var _cart = {
    getCartCount : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl() + '/user/get_cart_product_count.do',
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports= _cart;