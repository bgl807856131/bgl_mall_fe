/*
* @Author: buguoliang
* @Date:   2018-12-05 22:54:42
* @Last Modified by:   buguoliang
* @Last Modified time: 2018-12-06 01:47:31
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.css');
var _bglMall = require('util/bglMall.js');
var _user = require('service/user-service.js');

var formError = {
    show : function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init : function () {
        this.bindEvent();
    },
    bindEvent : function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //表单提交
    submit : function () {
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _bglMall.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate : function (formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        if (!_bglMall.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_bglMall.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
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