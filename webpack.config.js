/*
* @Author: buguoliang
* @Date:   2018-12-05 22:43:14
* @Last Modified by:   buguoliang
* @Last Modified time: 2018-12-06 21:35:30
*/
var webpack               = require('webpack');
var Ex                    = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');

//环境变量配置， dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取webpack html-webpack-plugin的方法
var getHtmlConfig = function(name) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config = {
    entry : {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output : {
        path : './dist',
        publicPath : '/dist',
        filename : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            {test : /\.css$/, loader : Ex.extract('style-loader', 'css-loader')},
            //woff|svg|eot|tff为字体格式处理
            {test : /\.(gif|png|jpg|woff|svg|eot|tff)\??.*$/, loader : 'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins : [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //css单独打包
        new Ex("css/[name].css"),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http:localhost:8088');
}

module.exports = config;