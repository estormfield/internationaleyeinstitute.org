const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


// Function to get all HTML files in a directory (excluding subdirectories)
function getHtmlFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.html') && fs.statSync(path.join(dir, file)).isFile());
}

// Get all partials from the src/html directory
const partials = getHtmlFiles('./src/base_pages');

// Function to create a list of HtmlWebpackPlugin instances
function createHtmlPlugins(partials) {
  return partials.map(partial => {
    // Read the template and replace the placeholder with the partial name
    const templateContent = fs.readFileSync('./src/layouts/template.html', 'utf8');
    const contentWithPartial = templateContent.replace('<!-- %%PARTIAL%% -->', fs.readFileSync(`./src/base_pages/${partial}`, 'utf8'));

    return new HtmlWebpackPlugin({
      filename: `${partial}`,
      templateContent: contentWithPartial,
    });
  });
}
module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'internationaleyeinstitute.org'),
    filename: 'js/bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...createHtmlPlugins(partials),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
        { from: 'src/scripts', to: 'scripts' },
        { from: 'src/pdf', to: 'pdf' },
        { from: 'src/css', to: 'css' },
        { from: 'src/html/newsletters', to: 'newsletters' },
        { from: './src/icons/favicon.ico', to: 'favicon.ico' }, // Update path accordingly

      ],
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['internationaleyeinstitute.org'] },
      files: [
        'src/**/*.html',
        'src/css/**/*.css',
        'src/js/**/*.js'
      ]
    })
  ],
 
};
