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
var getHtmlConfig = function(name, title) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config = {
    entry : {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'about'             : ['./src/page/about/index.js'],
        'result'            : ['./src/page/result/index.js']
    },
    output : {
        path        : __dirname + '/dist/',
        publicPath  : '/dist/',
        // publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.bglmall.top/bgl_mall_fe/dist/',
        filename    : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            {test : /\.css$/, loader : Ex.extract('style-loader', 'css-loader')},
            //woff|svg|eot|tff为字体格式处理
            {test : /\.(gif|png|jpg|woff|svg|eot|ttf|otf|woff2)\??.*$/, loader : 'url-loader?limit=100&name=resource/[name].[ext]'},
            {
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    resolve : {
        alias : {
            'node_modules'  : __dirname + '/node_modules',
            'util'          : __dirname + '/src/util',
            'page'          : __dirname + '/src/page',
            'service'       : __dirname + '/src/service',
            'image'         : __dirname + '/src/image',
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于BGLMall')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ],
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                // target: 'http://www.bglmall.top',
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    }
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}

module.exports = config;