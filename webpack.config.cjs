const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

function getHtmlFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.html') && fs.statSync(path.join(dir, file)).isFile());
}

const partials = getHtmlFiles('./src/html/pages');

function createHtmlPlugins(partials) {
  return partials.map(partial => {
    const templateContent = fs.readFileSync('./src/html/layout.html', 'utf8');
    const contentWithPartial = templateContent.replace('<!-- %%PARTIAL%% -->', fs.readFileSync(`./src/html/pages/${partial}`, 'utf8'));

    return new HtmlWebpackPlugin({
      filename: `${partial}`,
      templateContent: contentWithPartial,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    });
  });
}

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...createHtmlPlugins(partials),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'images' },
        { from: 'src/assets/pdf', to: 'pdf' },
        { from: 'src/assets/css', to: 'css' },
        { from: 'src/assets/js', to: 'js' },
        { from: 'src/html/newsletters', to: 'newsletters' },
        { from: 'src/assets/icons/favicon.ico', to: 'favicon.ico' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new HtmlMinimizerPlugin(),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            'imagemin-gifsicle',
            'imagemin-mozjpeg',
            'imagemin-pngquant',
            'imagemin-svgo',
          ],
        },
      },
    }),
  ],
};
