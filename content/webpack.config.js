const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './content/src/index.js',

  output: {
    filename: 'content.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './content/icons' }
    ])
  ],

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
