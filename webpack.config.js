require('es6-promise').polyfill();
module.exports = {
    entry: './app.js',

    output: {
        // path: 'build',
        filename: 'bundle.js'   
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot','babel-loader']
            },
			{
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$/,
                loader: "file"
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};