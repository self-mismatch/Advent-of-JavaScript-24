const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};
