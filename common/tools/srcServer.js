const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const proxyMiddleware = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev.config');

const bundler = webpack(config);

const middleware = proxyMiddleware(['/proxy'], {
  target: 'http://10.10.10.10',
  changeOrigin: true,
  logLevel: 'debug',
  headers: {
    "Cookie": "cookie value"
  }
});

browserSync({
  port: 3000,
  ui: {
    port: 3001,
  },
  server: {
    baseDir: 'src',
    middleware: [
      middleware,
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
        },
      }),
      webpackHotMiddleware(bundler),
    ],
  },
  files: [
    'src/*.html',
  ],
});
