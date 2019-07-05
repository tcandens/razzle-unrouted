const path = require('path');
const glob = require('glob');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  modify(config, { target, dev }) {
    if (target === 'web') {
      const paths = glob.sync('./src/views/**/*.js');

      config.entry = paths.reduce((prev, curr) => {
        prev[curr.replace('./src/views/', '').replace('.js', '')] = [
          dev && require.resolve('razzle-dev-utils/webpackHotDevClient'),
          path.resolve(curr),
        ].filter(Boolean);
        return prev;
      }, {});

      config.entry.runtime = path.resolve(__dirname, './src/runtime')

      config.output.filename = dev ? '[name].js' : '[name]-[hash:8].bundle.js';

      config.optimization = {
        splitChunks: {
          name: true,
          chunks: 'all',
          cacheGroups: {
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial'
            },
          }
        }
      }

      if (process.env.DEBUG_BUNDLE) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }

    }
    return config;
  }
}
