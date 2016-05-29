'use strict';

// Depends
var path              = require('path');
var webpack           = require('webpack');
var autoprefixer      = require('autoprefixer-core');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var stylesLoader = 'css-loader?sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true';

const paths = {
  src: 'src',
  dist: 'dist',
};

module.exports = {
  // entry points
  watch: true,
  entry: {
    vendor: path.resolve(path.join(paths.src, '/app/index.vendor.js')),
    app: path.resolve(path.join(paths.src, '/app/index.bootstrap.js')),
  },

  // output system
  output: {
    path: paths.dist,
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  // resolves modules
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    // preLoaders: [{
    //   test: /\.js$/,
    //   include: [
    //     path.resolve(path.join(paths.src, 'app')),
    //   ],
    //   loader: 'eslint-loader',
    // }],
    loaders: [
      {
        test: /\.html$/,
        loaders: [
          'ngtemplate-loader?relativeTo='+ paths.src,
          'html-loader?attrs[]=img:src&attrs[]=img:data-src'
        ]
      },
      {
        test: /\.js$/,
        loaders: [
          'baggage-loader?[file].html&[file].css'
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(path.join(paths.src, 'app')),
        ],
        loaders: [
          'ng-annotate-loader'
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(path.join(paths.src, 'app')),
        ],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'add-module-exports'],
          presets: ['angular', 'es2017']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        include: [
          path.resolve(path.join(paths.src, 'app')),
        ],
        loader: ExtractTextPlugin.extract('style-loader', stylesLoader)
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          'url-loader?name=assets/fonts/[name]_[hash].[ext]'
        ]
      },
      {
        test: require.resolve('angular'),
        loaders: [
          'expose?angular'
        ]
      },
    ]
  },

  // post css
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })],

  // load plugins
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      moveToParents: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      async: true,
      children: true,
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('assets/styles/[name]' + '.[chunkhash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.src, 'index.html'),
      inject:   'body',
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   warnings: false,
    //   sourceMap: true
    // })
  ],

  devtool: 'cheap-source-map',
};
