/**
 * @Author buguoliang
 * @Date 2018/12/31 21:19
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _navSide      = require('page/common/nav-side/index.js');
var _bglMall      = require('util/bglMall.js');
var _user = require('service/user-service.js');

var page = {
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        _navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#passwordNew').val()),
                passwordConfirm : $.trim($('#passwordConfirm').val()),
            };
            var validateResult = _this.formValidate(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function (res, msg) {
                    _bglMall.successTips(msg);
                }, function (errMsg) {
                    _bglMall.errorTips(errMsg);
                });
            } else {
                _bglMall.errorTips(validateResult.msg);
            }
        });
    },
    formValidate : function (formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        if (!_bglMall.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密码长度不能小于6位';
            return result;
        }if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});