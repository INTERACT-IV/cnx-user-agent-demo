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
  target: 'web'
};