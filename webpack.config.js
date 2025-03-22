// filepath: /Users/gideoncrawley/Projects/Breakout/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js', // Adjust this path if needed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Cleans the dist folder before each build
        new HtmlWebpackPlugin({
            template: './src/index.html', // Adjust this path if needed
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS file
        }),
    ],
    mode: 'production',
};