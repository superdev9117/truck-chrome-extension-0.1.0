const path = require('path');

module.exports = {
  entry: {
    index: './src/popup.tsx',
    background: './src/background.ts',
    content: './src/contentScript.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
