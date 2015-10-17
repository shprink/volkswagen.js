var path = require('path'),
    demoPath = path.join(__dirname, 'demo'),
    wwwPath = path.join(__dirname, 'www'),
    docsPath = path.join(__dirname, 'docs'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(demoPath, 'index.js'),
    output: {
        path: wwwPath,
        filename: 'demo.js'
    },
    module: {
        loaders: [{
            test: /[\/]angular\.js$/,
            loader: 'expose?angular!exports?window.angular'
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/],
            loader: 'file?name=fonts/[name].[ext]'
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: "ng-annotate?add=true!babel"
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        pkg: pkg,
        template: path.join(demoPath, 'index.html')
    })]
};
