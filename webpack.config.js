import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      { 
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/statics/index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  entry: './statics/scripts/main.js',
  output: {
    clean: true,
  },
};
