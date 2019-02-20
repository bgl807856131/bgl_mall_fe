/**
 * @Author buguoliang
 * @Date 2019/02/20 21:07
 */
var _bglMall = require('util/bglMall.js');

var _address = {
    //获取地址列表
    getAddressList : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _address;
