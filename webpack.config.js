const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
    //Entry point of webpack
    entry: ['@babel/polyfill','./src/js/index.js'],
    output: 
    {   // Needs to be resolved to absolute path
        path: path.resolve(__dirname, 'dist'),
        // bundled/compiled file name
        filename: 'js/bundle.js'
        // for webpack dev server to identify the full path
      //publicPath: '/dist'
    },
    devServer: 
    {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};