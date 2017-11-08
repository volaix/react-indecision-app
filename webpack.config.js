const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const publicPath = path.join(__dirname, 'public')

module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new ExtractTextPlugin('styles.css')

    console.log(`isProduction = ${isProduction}`) 
    isProduction ? console.log('Running with devtool for Production') :
    console.log ('Running with devtool for developing')
    
    return {
        entry: "./src/app.js",
        output: {
            path: publicPath,
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
               use:CSSExtract.extract({
                   use: [
                       {
                           loader: 'css-loader',
                           options: {
                               sourceMap: true
                           }
                       },
                       {
                           loader: 'sass-loader',
                           options: {
                               sourceMap: true
                           }
                       }
                   ]
               })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: publicPath
        }
    }
}