/**
 * @Author buguoliang
 * @Date 2018/12/10 22:33
 */
var _bglMall = require('util/bglMall.js');

var _user = {
    //登出
    logout : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl() + '/user/logout.do',
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkLogin : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl() + '/user/get_user_info.do',
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;
