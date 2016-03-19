var webpack = require('webpack');
var path = require('path');

module.exports = {
   entry: './src/js/bookbook.js',
   output: {
       path: __dirname,
       filename: './client/js/bundle.js'
   },
   module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
  ]
  }
  ,plugins:[
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
  ]
};
