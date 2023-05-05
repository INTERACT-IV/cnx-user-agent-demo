const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    filename: 'cnx-user-agent-demo.js',
  },
  resolve: {
    modules: [
      __dirname,
      path.resolve( __dirname, 'node_modules' )
    ]
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader',
          options: {
            hot: false, // set it to true if you are using hmr
            // add here all the other @riotjs/compiler options riot.js.org/compiler
            // template: 'pug' for example
          }
        }]
      }
    ]
  }
};