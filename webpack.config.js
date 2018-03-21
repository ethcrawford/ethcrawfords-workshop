const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const stylus = require('./webpack/stylus');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
  source: path.join(__dirname, 'source/'),
  buildDev: path.join(__dirname, 'build/dev/'),
  buildProd: path.join(__dirname, 'build/prod/')
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + 'index.js'
    },
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      HtmlWebpackHelper('index'),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'bundle'
      // }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  fonts(),
  images()
]);

module.exports = function(env) {
  if (env === 'development') {
    return merge([
      { output: { path: PATHS.buildDev } },
      common,
      pug.dev(),
      // css.dev(),
      // stylus.dev(),
      extractCSS.css(),
      extractCSS.stylus(),
      devserver()
    ]);
  }

  if (env === 'production') {
    return merge([
      { output: { path: PATHS.buildProd } },
      common,
      pug.prod(),
      // css.prod(),
      // stylus.prod(),
      extractCSS.css(),
      extractCSS.stylus(),
      uglifyJS()
    ]);
  }
};

function HtmlWebpackHelper(pageName) {
  return new HtmlWebpackPlugin({
    filename: pageName + '.html',
    chunks: ['index'],
    template: PATHS.source + '/pages/' + pageName + '/' + pageName + '.pug'
  });
};
