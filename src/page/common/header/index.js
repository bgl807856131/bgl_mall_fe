/**
 * @Author buguoliang
 * @Date 2018/12/12 23:10
 */
require('./index.css');
var _bglMall = require('util/bglMall.js');

var header = {
    init : function () {
        this.bindEvent();
    },
    onLoad : function () {
        var keyword = _bglMall.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function () {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        else{
            _bglMall.goHome();
        }
    }
}

header.init();
