/**
 * webpack配置文件
 * Created by wangcheng on 15/12/10.
 */

/**
 * Todo : common组件抽取
 */

'use strict';


let path = require('path');
let glob = require('glob');

const BASE_DIR = __dirname;

/**
 * 获取client/page下所有的js入口文件
 * 计算相对webpack.config.js的相对路径  (value)
 * 获取js文件的basename (key)
 * 利用key和value返回entry数组
 */
function getPageEntry(){
    let ext = '.js';
    //采用glob方案,而非正则,跨语言文件匹配的标准方案 : https://github.com/isaacs/node-glob
    let entryPattern = BASE_DIR + '/client/mo/**/*.js';
    let entrys = {};
    let entryFiles = glob.sync(entryPattern, {});
    entryFiles.forEach(function(file, index){
        let basename = path.basename(file, ext);

        //将原始的JS入口路径,保留到webpack打包之后
        basename = file.replace( BASE_DIR + '/client/mo/', '').replace( /\.js$/, '');

        let relativePath = path.relative(BASE_DIR, file);
        let fixRelativePath = './' + relativePath;
        entrys[basename] = fixRelativePath;
    });
    return entrys;
}

function getCommonEntry(){

}

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config  = {
    entry: getPageEntry(),
    //vendors: [ 'console-polyfill', 'object-assign', 'es5-shim/es5-shim', 'es5-shim/es5-sham', './src/utils/mobileRem' ],
    //common : './src/css/common.less'
    output: {
        //定义js、css、image等url的前缀以及cdn, 非常重要
        publicPath: '',
        filename: '[name].pkg.js'
        //path : 产出路径在gulp中定义
    },
    module: {
        //webpack loader : http://webpack.github.io/docs/using-loaders.html
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader : 'babel',
                query : {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.woff$/,
                loader: 'url',
                query : {
                    limit : 512
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query : {
                    limit : 512,
                    name : '[path][name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.woff', '.png', '.jpg', '.less', '.css']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].pkg.css", {
            allChunks: true
        })
    ]
};

module.exports = config;
