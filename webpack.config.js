
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');


/**
 * Options to clean dist folder
 */
const pathsToClean = [
  'dist'
];
const cleanOptions = {
  root: path.resolve(__dirname),
  verbose: true,
  dry: false,
  exclude: [],
};

module.exports = {
  entry: {
    script: './src/js/script.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/static/dist/',
      chunkFilename:'[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',   
    },
    minimizer: [new TerserPlugin()],
  },
  devServer: { 
    compress: true,
    port: 8090,
    hot: true,
  },
  resolve:{
    extensions:['.js', '.vue'],
    alias:{
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          '/(node_modules)/',
          '/src/__test__/'
        ],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          },
          'img-loader'
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
          test:/\.vue$/,
          loader: 'vue-loader',
          options:{
            loaders:{}
          }
      },
      {
        test: /\.styl$/,
        loader: ['css-loader']
      },      
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  sassOptions: {
                    fiber: require('fibers'),
                    indentedSyntax: true
                  },
                }
            }
        ]
    },      
    ],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),     
      filename: "[name].bundle.css",
      chunkFilename: "[name].bundle.css"
    }),    
    new HtmlWebpackPlugin({
      title: 'vue',
      template: path.resolve(__dirname) + '/src/index.html',
      filename: path.resolve(__dirname) + '/index.html'
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new CompressionPlugin(),
    new VuetifyLoaderPlugin(),
  ],
}
