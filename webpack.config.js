import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from 'html-inline-css-webpack-plugin';

const HtmlInlineCssWebpackPlugin = pkg.default;

export default {
  mode: 'production',
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svgo-loader',
      },
      {
        test: /\.(svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '/statics/index.html',
      minify: true,
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'policy.html',
      template: '/statics/policy.html',
      minify: true,
      chunks: ['policy'],
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: '/statics/404.html',
      minify: true,
      chunks: ['404'],
    }),
    new MiniCssExtractPlugin(),
    new HtmlInlineCssWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  entry: {
    main: './statics/scripts/index.js',
    policy: './statics/scripts/policy.js',
    404: './statics/scripts/404.js',
  },
  output: {
    clean: true,
  },
};
