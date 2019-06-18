const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  entry: {
    vendors: ['react', "react-dom", "axios", "braft-editor", "braft-extensions",
              'mobx', 'mobx-react', 'react-router-dom']//需要打包的第三方库文件
  },

  output: {
    filename: '[name].[chunkhash:4].js',//生成的文件名
    path: resolve('../dll'),//生成的文件存放的路径
    library: '[name]_[chunkhash:4]'//决定了manifest中的格式
  },

  plugins: [
    // Minify the code.
    new UglifyJsPlugin({
      uglifyOptions: {
        parse: {
          // we want uglify-js to parse ecma 8 code. However we want it to output
          // ecma 5 compliant code, to avoid issues with older browsers, this is
          // whey we put `ecma: 5` to the compress and output section
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Don't inline functions with arguments, to avoid name collisions:
          // https://github.com/mishoo/UglifyJS2/issues/2842
          inline: 1,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: false,
    }), // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    
    new webpack.DllPlugin({
      path: resolve('../dll/manifest.json'),
      name: '[name]_[chunkhash:4]',//生成的第三方库文件， 要和上面的library一致
      context:__dirname
    }),
  ],
}
