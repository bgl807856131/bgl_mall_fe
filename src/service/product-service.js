/**
 * @Author buguoliang
 * @Date 2019/01/13 21:46
 */
var _bglMall = require('util/bglMall.js');

var _product = {
    //获取商品列表
    getProductList : function (listParam, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/product/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取商品列表
    getProductDetail : function (productId, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _product;