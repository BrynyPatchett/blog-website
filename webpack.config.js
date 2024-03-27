const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    entry: {
        app: ['./src/js/main.js',"./src/styles/homepage.css"],
        blogpost: ['./src/js/blogpost.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Blog',
            template:'./src/pages/index.html',
            filename:"pages/homepage.html",
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            title: 'Blog',
            template:'./src/pages/blogpost.html',
            filename:"pages/blogpost.html",
            chunks: ["blogpost"]
        }),
        new MiniCssExtractPlugin({
            filename:"styles/[name].css"
        }),

    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ]
    }
};