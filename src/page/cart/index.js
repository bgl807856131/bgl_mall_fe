/**
 * @Author buguoliang
 * @Date 2019/02/18 21:48
 */
require('./index.css');
require('page/common/header/index.js');
var nav           = require('page/common/nav/index.js');
var _bglMall      = require('util/bglMall.js');
var _cart         = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadCart();
    },
    bindEvent : function () {
        var _this = this;
        //商品选中 / 反选
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            //选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消选中
            else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        //商品全选中 / 全反选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            //全选中
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
            //取消全选中
            else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        //商品数量的变化
        $(document).on('click', '.count-btn', function () {
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _bglMall.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            //更新商品购物车数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确定要删除该商品？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中
        $(document).on('click', '.delete-selected', function () {
            if (window.confirm('确定要删除选中的商品？')) {
                var arrProductIds = [],
                    $selected = $('.cart-select:checked');
                for (var i = 0, iLength = $selected.length; i < iLength; i++) {
                    arrProductIds.push($($selected[i]).parents('.cart-table').data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _bglMall.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        //删除选中
        $(document).on('click', '.btn-submit', function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './confirm.html';
            } else {
                _bglMall.errorTips('亲，请选择商品后再进行结算');
            }
        });
    },
    //加载商品详情数据
    loadCart : function () {
        var _this     = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    renderCart : function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = _bglMall.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航的购物车更新数量
        nav.loadCartCount();
    },
    deleteCartProduct : function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    filter : function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError : function () {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试</p>');
    }
};

$(function () {
    page.init();
});
