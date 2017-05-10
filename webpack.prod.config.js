var path = require('path')
var webpack = require('webpack')
var banner = require('./webpack.banner')
var TARGET = process.env.TARGET || null

var externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'react-aria': {
    root: 'ReactARIA',
    commonjs2: 'react-aria',
    commonjs: 'react-aria',
    amd: 'react-aria',
  },
  'react-measure': {
    root: 'Measure',
    commonjs2: 'react-measure',
    commonjs: 'react-measure',
    amd: 'react-measure',
  },
  'react-popper': {
    root: 'ReactPopper',
    commonjs2: 'react-popper',
    commonjs: 'react-popper',
    amd: 'react-popper',
  },
  'react-travel': {
    root: 'Portal',
    commonjs2: 'react-travel',
    commonjs: 'react-travel',
    amd: 'react-travel',
  },
}

var config = {
  entry: {
    index: './src/selectly.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'selectly.js',
    sourceMapFilename: 'selectly.sourcemap.js',
    library: 'SelectlyPrerelease',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{ test: /\.(js|jsx)/, loader: 'babel-loader' }],
  },
  plugins: [new webpack.BannerPlugin(banner)],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: externals,
}

if (TARGET === 'minify') {
  config.output.filename = 'selectly.min.js'
  config.output.sourceMapFilename = 'selectly.min.js'
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['React', 'ReactDOM'],
      },
    })
  )
}

module.exports = config
