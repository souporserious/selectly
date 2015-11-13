var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;
var filename = 'selectly'
var library = 'Selectly'

var config = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: filename + '.js',
    sourceMapFilename: filename + '.sourcemap.js',
    library: library,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)/, loader: 'babel?stage=0'}
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-tether': 'TetherElement'
  },
};

if(TARGET === 'minify') {
  config.output.filename = filename + '.min.js';
  config.output.sourceMapFilename = filename + '.sourcemap.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', library]
    }
  }));
}

module.exports = config