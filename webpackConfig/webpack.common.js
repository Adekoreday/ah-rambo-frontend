const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /joi-browser/],
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      actions: path.resolve(__dirname, './src/actions'),
      components: path.resolve(__dirname, './src/components'),
      reducers: path.resolve(__dirname, './src/reducers'),
      containers: path.resolve(__dirname, './src/containers'),
      store: path.resolve(__dirname, './src/store'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      title: 'Authors Haven',
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ],

  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};
