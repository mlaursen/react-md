/* eslint-disable */

/**
 * Generates a template when compiled with HtmlWebpackPlugin.
 *
 * The template will include:
 * - The title
 * - An optional meta description
 * - An optional meta keywords
 * - Any links to css files
 * - An optional react root id
 * - An optional isomorphic template in the react root id to use server side rendering
 * - Any javascript file chunks
 * - An optional google analytics script
 */
module.exports = function(templateParams) {
  var htmlWebpackPlugin = templateParams.htmlWebpackPlugin;
  var options = htmlWebpackPlugin.options;

  var meta = '<meta charset="utf-8">'
    + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">';

  if(options.description) {
    meta += '<meta name="description" content="' + options.description + '">';
  }

  if(options.keywords) {
    meta += '<meta name="keywords" content="' + options.keywords + '">';
  }

  var css = htmlWebpackPlugin.files.css.concat(options.externalCSS || []).map(function(href) {
    return '<link href="' + href + '" rel="stylesheet">';
  }).join('');

  var title = '<title>' + options.title + '</title>';
  var head = '<head>' + meta + title + css + '</head>';

  var entry = '';
  if(options.appMountId) {
    entry = '<div id="' + options.appMountId + '">';
    if(options.isomorphic) {
      entry += '<%- ' + options.isomorphic + ' %>';
    }

    entry += '</div>';
  }

  // must load Intl Polyfill before our own files
  var js = (options.externalJS || []).concat(htmlWebpackPlugin.files.js).map(function(chunk) {
    return '<script src="' + chunk + '"></script>';
  }).join('');

  if(options.isomorphicState) {
    js = '<script>var '
      + options.isomorphicState.var
      + ' = <%- '
      + options.isomorphicState.val
      + ' %>;</script>'
      + js;
  }

  if(options.googleAnalytics) {
    js = js
      + "<script>"
      + "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"
      + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"
      + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"
      + "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"
      + "ga('create', '" + options.googleAnalytics + "', 'auto');"
      + "ga('send', 'pageview');"
      + "</script>";
  }

  var body = '<body>' + entry + js + '</body>';
  var html = '<html';
  if (options.isomorphicHtmlClassName) {
    html += ' class="<%= ' + options.isomorphicHtmlClassName + ' %>"';
  }

  html += '>' + head + body + '</html>';


  return '<!DOCTYPE html>' + html;
};

