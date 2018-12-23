/**
 * @Author buguoliang
 * @Date 2018/12/10 22:33
 */
var _bglMall = require('util/bglMall.js');

var _user = {
    //用户登录
    login : function (userInfo, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检查用户名是否可用
    checkUsername : function (username, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //注册提交
    register : function (userInfo, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取提示问题
    getQuestion : function (username, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkAnswer : function (userInfo, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    resetPassword : function (userInfo, resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkLogin : function (resolve, reject) {
        _bglMall.request({
            url     : _bglMall.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;
