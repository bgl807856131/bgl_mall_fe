/**
 * @Author buguoliang
 * @Date 2019/01/14 23:32
 */
require('./index.css');
var templatePage    = require('./index.string');
var _bglMall        = require('util/bglMall.js');

var Pagination = function () {
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件处理
    $(document).on('click', '.pg-item', function () {
        var $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
    })
};
// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    //合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //判断是否只有1页
    if (this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHtml());
};
//获取分页的html
Pagination.prototype.getPaginationHtml = function () {
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = option.pageNum - option.pageRange > 0 ?
            option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.pages ?
            option.pageNum + option.pageRange : option.pages;
    //上一页按钮的数据
    pageArray.push({
        name        : '上一页',
        value       : this.option.prePage,
        disabled    : !this.option.hasPreviousPage
    });
    //数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name        : i,
            value       : i,
            active      : (i === option.pageNum)
        });
    }
    //下一页按钮的数据
    pageArray.push({
        name        : '下一页',
        value       : this.option.nextPage,
        disabled    : !this.option.hasNextPage
    });
    html = _bglMall.renderHtml(templatePage, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;