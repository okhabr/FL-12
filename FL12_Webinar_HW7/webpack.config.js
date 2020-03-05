const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: __dirname + "/src/app/index.js", 
  output: {
    path: __dirname + '/dist', 
    filename: 'js/app.js',  
    publicPath: '' 
  },
  module: {  
      rules: [ 
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: [
            /node_modules/
          ]
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: isDevelopment
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
              }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
              }
          ]
        }
      ]
    },
  resolve: {extensions: ['.js', '.jsx', '.scss']},            
  plugins: [  
      new HtmlWebpackPlugin({
          template: __dirname + "/src/index.html",
          inject: 'body',
          filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : 'styles/styles.css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
  ],
  devServer: { 
      contentBase: './src/public',  
      port: 7700,
  }
};

// new CopyPlugin([{
//   from: __dirname + "/src/img/spinner.gif",
//   to: path.resolve(__dirname, 'dist')
// }]),
// new ImageminPlugin()


// {
//   test: /\.(jpe?g|png|gif|svg)$/i,
//   loader: "file-loader",
//   options: {
//     outputPath: '__dirname + '/dist,
//   },
// }