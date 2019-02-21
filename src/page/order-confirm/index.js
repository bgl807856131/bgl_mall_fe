/**
 * @Author buguoliang
 * @Date 2019/02/19 21:32
 */
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _bglMall        = require('util/bglMall.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal    = require('./address-modal.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function () {
        var _this = this;
        //选择地址
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //订单提交
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId : shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _bglMall.errorTips(errMsg);
                });
            } else {
                _bglMall.errorTips('请选择地址后再提交');
            }
        });
        //地址的添加
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate    : false,
                onSuccess   : function () {
                    _this.loadAddressList();
                }
            });
        });
        //地址的编辑
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                _bglMall.errorTips(errMsg);
            });
        });
        //地址的删除
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确定要删除该地址？')) {
                _address.deleteAddress(id, function (res) {
                    _this.loadAddressList();
                }, function (errMsg) {
                    _bglMall.errorTips(errMsg);
                })
            }
        });
    },
    //加载地址列表数据
    loadAddressList : function () {
        var _this = this;
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHtml = _bglMall.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    addressFilter : function (data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, iLength = data.list.length; i < iLength; i++) {
                if (data.list[i] === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            //如果以前选中的地址不在地址列表里，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    //加载商品列表数据
    loadProductList : function () {
        _order.getProductList(function (res) {
            var productListHtml = _bglMall.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    }
};

$(function () {
    page.init();
});