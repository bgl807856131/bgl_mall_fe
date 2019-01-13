/**
 * @Author buguoliang
 * @Date 2019/01/13 21:46
 */
var _bglMall = require('util/bglMall.js');

var _product = {
    //用户登录
    getProductList : function (listParam, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/product/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _product;