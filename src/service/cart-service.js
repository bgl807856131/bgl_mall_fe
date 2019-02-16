/**
 * @Author buguoliang
 * @Date 2018/12/10 23:09
 */
var _bglMall = require('util/bglMall.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/get_cart_product_count.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/add.do'),
            data    : productInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId, resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId, resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllProduct : function(resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct : function(resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _bglMall.request({
            url     : _bglMall.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;