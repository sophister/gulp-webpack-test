/**
 * Created by jess on 16/1/13.
 */


'use strict';

var gulp = require('gulp');
var gulpPlugin = require('gulp-load-plugins')();
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

var webpackConfig = require('./webpack.config.js');



// 下面只针对 mo 目录下代码测试,先不考虑 pc 下

var platform = 'mo';

var basePath = __dirname;
var prebuildPath = basePath + '/.prebuild/' + platform;
var buildPath = basePath + '/.build/' + platform;
var srcPath = basePath + '/client/' + platform;
var mapPath = basePath + '/.maps/' + platform;

var mobileManifestName = platform +  '-rev-manifest.json';
var imgManifest = mapPath + '/img/' + mobileManifestName;
var cssManifest = mapPath + '/css/' + mobileManifestName;

var publicPath = '/n/static/' + platform + '/';

//step 1 使用gulp拷贝 HTML/CSS 等资源到 prebuild 目录
gulp.task('copy2prebuild', function(){
    return gulp.src( [ srcPath + '/**/*.{jpg,png,gif,css,js,html}' ] )

        .pipe( gulp.dest( prebuildPath ) );
} );

//step 2 webpack处理各个页面的入口JS和JS依赖的 图片/CSS 等资源,输出到 prebuild 目录
gulp.task('webpack', [ 'copy2prebuild'], function(){

    //let pageGlob = srcPath  + '/mo/page/**/*.html';
    //
    ////webpack 只能处理js、css, 无法处理html, 需要gulp copy编译html
    //gulp.src(pageGlob)
    //    .pipe(gulp.dest(BUILD_DEST.prebuild_view + '/mo'));

    return gulp.src('./client/mo/**/*.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest( prebuildPath ));
} );

//step 3 处理图片的 md5,保留 map
gulp.task('rev-img', ['webpack'], function(){

    return gulp.src( [  prebuildPath + '/**/*.{jpg,png,gif}' ] )
        .pipe( rev() )
        .pipe( gulp.dest( buildPath ) )
        .pipe( rev.manifest( mobileManifestName ) )
        .pipe( gulp.dest( mapPath + '/img'));

} );

//step 4 处理 CSS md5
gulp.task('rev-css', ['rev-img'], function(){

    var manifest = gulp.src( imgManifest );

    return gulp.src( [  prebuildPath + '/**/*.css' ] )
        .pipe( revReplace( {
            manifest : manifest,
            prefix : publicPath
        }) )
        .pipe( rev() )
        .pipe( gulp.dest( buildPath ) )
        .pipe( rev.manifest( mobileManifestName ) )
        .pipe( gulp.dest( mapPath + '/css'));

} );

// step 5  js md5
gulp.task('rev-js', ['rev-css'], function(){

    var manifest = gulp.src( imgManifest );

    return gulp.src( [ prebuildPath + '/**/*.js' ] )
            .pipe( revReplace( {
                manifest : manifest,
                prefix : publicPath
            }) )
            .pipe( rev() )
            .pipe( gulp.dest( buildPath ) )
            .pipe( rev.manifest( mobileManifestName ) )
            .pipe( gulp.dest( mapPath + '/js'));

} );

//step 6 merge map
gulp.task('merge-map', [ 'rev-js'], function(){
    let mapGlob = mapPath + '/**/*.json';
    let finalResourceMap = mobileManifestName;
    return gulp.src(mapGlob)
        .pipe(gulpPlugin.extend(finalResourceMap))
        .pipe(gulp.dest( mapPath ));
} );

//step 6 替换HTML中的各个资源路径
gulp.task('html', ['merge-map'], function(){

    var manifest = gulp.src( mapPath + '/' + mobileManifestName );

    return gulp.src( [ prebuildPath + '/**/*.html'] )
        .pipe( revReplace( {
            manifest : manifest,
            prefix : publicPath
        }) )
        .pipe( gulp.dest( buildPath ) );

} );

