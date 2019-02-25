/**
 * @Author buguoliang
 * @Date 2019/02/14 22:42
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bglMall      = require('util/bglMall.js');
var _product      = require('service/product-service.js');
var _cart         = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId : _bglMall.getUrlParam('productId') || ''
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        if (!this.data.productId) {
            _bglMall.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function () {
        var _this = this;
        //图片预览
        $(document).on('mouseenter', '.p-img-item', function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        //购物车加减算法
        $(document).on('click', '.p-count-btn', function () {
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        //立即购买
        $(document).on('click', '.go-buy', function () {
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            }, function (res) {
                window.location.href = './order-confirm.html';
            }, function (errMsg) {
                _bglMall.errorTips(errMsg);
            });
        });
        //加入购物车
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _bglMall.errorTips(errMsg);
            });
        });
    },
    //加载商品详情数据
    loadDetail : function () {
        var _this     = this,
            html      = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res);
            //缓存detail信息，用于计算购物车
            _this.data.detailInfo = res;
            html = _bglMall.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了！</p>');
        });
    },
    filter : function (data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function () {
    page.init();
});