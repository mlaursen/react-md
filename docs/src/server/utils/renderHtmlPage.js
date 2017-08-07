import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { DEFAULT_DESCRIPTION } from 'state/helmet/meta';

let manifest;
try {
  if (!__SSR__) {
    throw new Error('Server side rendering must be enabled for inlining manifiest.');
  }

  /* eslint-disable global-require */
  const manifestJSON = require('../../../public/assets/manifest.json');

  manifest = `<script>
//<![CDATA[
window.webpackManifest = ${JSON.stringify(manifestJSON)}
//]]>
</script>`;
} catch (e) {
  manifest = '';
}

const META = [{
  charset: 'utf-8',
}, {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
}, {
  'http-equiv': 'X-UA-Compatible',
  content: 'IE=edge',
}, {
  property: 'og:title',
  content: 'react-md - Accessible React Material Design Components',
}, {
  property: 'og:url',
  content: 'https://react-md.mlaursen.com',
}, {
  property: 'og:type',
  content: 'website',
}, {
  property: 'og:description',
  content: DEFAULT_DESCRIPTION,
}, {
  property: 'og:image',
  content: '/react-md.png',
}, {
  property: 'og:image:alt',
  content: 'The landing page for react-md. It describes the purpose of the library and what it tries to accomplish.',
}, {
  name: 'twitter:site',
  content: 'react-md',
}, {
  name: 'twitter:creator',
  content: 'Mikkel Laursen',
}, {
  name: 'twitter:title',
  content: 'react-md - Accessible React Material Design Components',
}, {
  name: 'twitter:image',
  content: '/react-md.png',
}].reduce((allMeta, meta) => `${allMeta}<meta${Object.keys(meta).reduce((s, key) => `${s} ${key}="${meta[key]}"`, '')}>`, '');

export default function renderHtmlPage(store, bundles = [], html = '') {
  const head = Helmet.renderStatic();
  const assets = global.webpackIsomorphicTools.assets();

  let page = `<!DOCTYPE html><html ${head.htmlAttributes.toString()}>`;
  page += '<head>';
  page += head.base.toString();
  page += head.title.toString();
  page += head.meta.toString();
  page += META;
  page += head.link.toString();
  if (!__DEV__) {
    // manifest is only prod
    page += '<link rel="manifest" href="/manifest.json">';
  }

  page += '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">';

  const styleKeys = Object.keys(assets.styles).reverse();
  if (__DEV__ && !styleKeys.length) {
    // this should really be every scss file, but I just need the base styles
    // const styles = require('../../client/styles.scss')._style;
    // page += `<style>${styles}</style>`;

    // Can also do this for faster page loads, but have to reload page if styles get removed
    // const styles = require('../../client/styles.scss')._style
    //   + require('../../components/App/Footer/_styles.scss')._style
    //   + require('../../components/Customization/Colors/_styles.scss')._style
    //   + require('../../components/Customization/Themes/ThemeBuilder/_styles.scss')._style
    //   + require('../../components/DiscoverMore/Showcases/_styles.scss')._scss
    //   + require('../../components/DocumentationTabs/_styles.scss')._style
    //   + require('../../components/ExamplesPage/_styles.scss')._style
    //   + require('../../components/ExpandableSource/_styles.scss')._style
    //   + require('../../components/Home/_styles.scss')._style
    //   + require('../../components/SassDocPage/_styles.scss')._style
    //   + require('../../components/Search/_styles.scss')._style;

    // page += `<style>${styles}</style>`;
  }

  page += styleKeys.map(style =>
    `<link href="${assets.styles[style]}" rel="stylesheet" type="text/css">`
  ).join('');
  page += manifest;

  page += `</head><body ${head.bodyAttributes.toString()}><div id="app">${html}</div>`;
  page += `<script>window.__WEBPACK_BUNDLES__=${serialize(bundles)};`;
  if (store) {
    page += `window.__INITIAL_STATE__=${serialize(store.getState())};`;
  }
  page += '</script>';

  page += Object.keys(assets.javascript).reverse().map(script =>
    `<script src="${assets.javascript[script]}"></script>`
  ).join('');
  page += head.script.toString();
  if (!__DEV__) {
    // google analytics
    page += '<script>';
    page += '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){';
    page += '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),';
    page += 'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)';
    page += '})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');';
    page += `ga('create', '${process.env.GOOGLE_ANALYTICS_CODE || 'UA-76079335-1'}', 'auto');`;
    page += 'ga(\'send\', \'pageview\');';
    page += '</script>';
  }
  page += '</body></html>';

  return page;
}

