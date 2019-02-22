/**
 * @Author buguoliang
 * @Date 2019/02/22 19:59
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _navSide      = require('page/common/nav-side/index.js');
var _bglMall      = require('util/bglMall.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination    = require('util/pagination/index.js');

var page = {
    data : {
        listParam : {
            pageNum : 1,
            pageSize : 10
        }
    },
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        this.loadOrderList();
        //初始化左侧菜单
        _navSide.init({
            name : 'order-list'
        });
    },
    loadOrderList : function () {
        var _this         = this,
            orderListHtml = '',
            $orderCon     = $('.order-list-con');
        $orderCon.html('<div class="loading"></div>');
        _order.getOrderList(_this.data.listParam, function (res) {
            orderListHtml = _bglMall.renderHtml(templateIndex, res);
            $orderCon.html(orderListHtml);
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
            $orderCon.html('<p class="err-tip">加载订单信息失败，请刷新后重试</p>')
        });
    },
    loadPagination : function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function () {
    page.init();
});