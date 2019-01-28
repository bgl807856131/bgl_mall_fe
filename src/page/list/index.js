/**
 * @Author buguoliang
 * @Date 2019/01/13 21:40
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bglMall      = require('util/bglMall.js');
var _product      = require('service/product-service.js');
var Pagination    = require('util/pagination/index.js');
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
        var _this = this;
        $('.sort-item').click(function () {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    loadList : function () {
        var _this       = this,
            listHtml    = '';
        var listParam   = this.data.listParam;
        var $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getProductList(listParam, function (res) {
            listHtml = _bglMall.renderHtml(templateIndex, {
                list : res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasNextPage     : res.hasNextPage,
                hasPreviousPage : res.hasPreviousPage,
                nextPage        : res.nextPage,
                prePage         : res.prePage,
                pageNum         : res.pageNum,
                pageSize        : res.pageSize,
                pages           : res.pages,
            });
        }, function (errMsg) {
            _bglMall.errorTips(errMsg);
        })
    },
    loadPagination : function (pageInfo) {
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            pagination  : $('.pagination')
        }));
    }
};

$(function () {
    page.init();
});