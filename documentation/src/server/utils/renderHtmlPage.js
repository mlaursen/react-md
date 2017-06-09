import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

let manifest;
try {
  if (!__SSR__) {
    throw new Error('Server side rendering must be enabled for inlining manifiest.');
  }

  /* eslint-disable global-require */
  const manifestJSON = require('../../../public/assets/chunk-manifest.json');

  manifest = `<script>
//<![CDATA[
window.webpackManifest = ${JSON.stringify(manifestJSON)}
//]]>
</script>`;
} catch (e) {
  manifest = '';
}

export default function renderHtmlPage(store, bundles = [], html = '') {
  const head = Helmet.renderStatic();
  const assets = global.webpackIsomorphicTools.assets();

  let page = `<!DOCTYPE html><html ${head.htmlAttributes.toString()}>`;

  page += '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
  page += '<meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">';
  page += head.base.toString() + head.title.toString() + head.meta.toString() + head.link.toString();

  const styleKeys = Object.keys(assets.styles);
  if (__DEV__ && !styleKeys.length) {
    // this should really be every scss file, but I just need the base styles
    const styles = require('../../client/styles.scss')._style;
    page += `<style>${styles}</style>`;

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
  page += `<script type="text/javascript">window.__WEBPACK_BUNDLES__=${serialize(bundles)};`;
  if (store) {
    page += `window.__INITIAL_STATE__=${serialize(store.getState())};`;
  }
  page += '</script>';

  page += Object.keys(assets.javascript).reverse().map(script =>
    `<script src="${assets.javascript[script]}"></script>`
  ).join('');
  page += head.script.toString();
  page += '</body></html>';

  return page;
}

