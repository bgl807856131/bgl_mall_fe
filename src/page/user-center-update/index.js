/**
 * @Author buguoliang
 * @Date 2018/12/24 21:51
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _navSide      = require('page/common/nav-side/index.js');
var _bglMall      = require('util/bglMall.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        _navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val()),
            };
            var validateResult = _this.formValidate(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _bglMall.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) {
                    _bglMall.errorTips(errMsg);
                });
            } else {
                _bglMall.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo : function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _bglMall.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _bglMall.errorTips(errMsg);
        });
    },
    formValidate : function (formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        if (!_bglMall.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_bglMall.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }if (!_bglMall.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_bglMall.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
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