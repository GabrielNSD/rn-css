/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const { displayName } = require('./app.json')
const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: path.resolve(__dirname, 'index.tsx'),
    cssToRN: path.resolve(__dirname, 'src/cssToRN')
  },
  output: {
    path: path.resolve(__dirname),
    filename: chunkData => chunkData.chunk.name === 'index'
      ? 'demo/index.bundle.js'
      : 'dist/cssToRN.bundle.js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, 'demo'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({ title: displayName, filename: 'demo/index.html' })
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js'
    ], // read files in fillowing order
    alias: Object.assign({
      'react-native$': 'react-native-web'
    })
  }
}
