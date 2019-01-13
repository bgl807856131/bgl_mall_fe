/**
 * @Author buguoliang
 * @Date 2019/01/13 21:40
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bglMall      = require('util/bglMall.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword      : _bglMall.getUrlParam('keyword')      || '',
            categoryId   : _bglMall.getUrlParam('categoryId')   || '',
            orderBy      : _bglMall.getUrlParam('orderBy')      || 'default',
            pageNum      : _bglMall.getUrlParam('pageNum')      || 1,
            pageSize     : _bglMall.getUrlParam('pageSize')     || 10,
        }
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadList();
    },
    bindEvent : function () {
        
    },
    loadList : function () {
        var _this       = this,
            listHtml    = '';
        var listParam   = this.data.listParam;
        _product.getProductList(listParam, function (res) {
            listHtml = _bglMall.renderHtml(templateIndex, {
                list : res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination(res.pageNum, res.pages);
        }, function (errMsg) {
            _bglMall.errorTips(errMsg);
        })
    },
    loadPagination : function (pageNum, pages) {
        
    }
};

$(function () {
    page.init();
});