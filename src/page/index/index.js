/*
* @Author: buguoliang
* @Date:   2018-12-05 22:35:26
* @Last Modified by:   buguoliang
* @Last Modified time: 2018-12-06 00:00:37
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _navSide = require('page/common/nav-side/index.js');
// var _bglMall = require('util/bglMall.js');


_navSide.init({
    name : 'user-center'
});