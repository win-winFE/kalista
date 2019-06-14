import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import moment from 'moment';

const pkg = require('./package');

const currentYear = moment().year();
const realEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'test';
const baseUrl = process.env.NODE_ENV === 'production' ? '//prod.host.com' : '//test.host.com';
const cdnPrefix = `/pc/${currentYear}/${pkg.name}/${realEnv}/`;

const projectVersion = pkg.version;

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
  __DEV__: false,
};

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: baseUrl + cdnPrefix,
    filename: `${projectVersion}/js/[name].js?v=[hash:7]`,
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      trackJSToken: '',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']},
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: `${pkg.version}/imgs/[name].[ext]?v=[hash:7]`,
          },
        },
      },
    ],
  },
};
