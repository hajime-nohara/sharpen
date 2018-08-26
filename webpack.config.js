const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015'
        ],
        plugins: []
      },
      include: [
        path.resolve(__dirname, './')
      ]
    }, {
      test: /\.styl$/,
      include: __dirname + '/src',
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader',
        options: { sourceMap: true }
      }, {
        loader: 'css-loader',
        options: {
          localIdentName: '[sha512:hash:base32]-[name]-[local]',
          modules: true,
          sourceMap: true
        }
      }, {
        loader: 'stylus-loader',
        options: { sourceMap: true }
      }]
    }, {
      test: /\.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]


    }, {
      test: /\.pug$/,
      use: 'pug-loader'
    }, {
      test: /\.(jpg|png|svg|gif|ttf|woff2|woff|eot)$/,
      loaders: 'url-loader'
    }]
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: 'inline-source-map',
  plugins: [

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new CopyWebpackPlugin([
      { from: 'semantic/dist/**/*', to: '', force: true },
      { from: 'assets/**/*', to: '', force: true },
    ], []),

    //new WriteFileWebpackPlugin([
    //  { from: 'semantic/dist/**/*', to: '', force: true },
    //  { from: 'node_modules/semantic-ui-calendar/dist/*', to: '', force: true },
    //  { from: 'assets/**/*', to: '', force: true },
    //], []),

    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [require('nib')()],
          import: [
            '~nib/lib/nib/index.styl',
            path.join(__dirname, 'src/styles/index.styl')
          ]
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    })
  ]
}
