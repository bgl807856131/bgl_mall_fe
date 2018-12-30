/**
 * @Author buguoliang
 * @Date 2018/12/24 21:44
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _navSide      = require('page/common/nav-side/index.js');
var _bglMall      = require('util/bglMall.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        _navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _bglMall.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _bglMall.errorTips(errMsg);
        });
    }
};

$(function () {
    page.init();
});