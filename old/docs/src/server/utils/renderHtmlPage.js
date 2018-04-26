import fs from 'fs';
import path from 'path';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { get } from 'lodash';
import { DEFAULT_DESCRIPTION } from 'state/helmet/meta';

let manifest;
try {
  if (!__SSR__) {
    throw new Error('Server side rendering must be enabled for inlining manifiest.');
  }

  /* eslint-disable global-require */
  const manifestJSON = require('../../../public/manifest.json');

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

function getStyleLinks(assets) {
  const { css } = assets.main;
  if (!css) {
    return '';
  }

  return (Array.isArray(css) ? css : [css]).reduce((links, href) => {
    let link;
    if (href) {
      link = `<link rel="stylesheet" type="text/css" href="${href}">`;
    }

    if (!links) {
      return link || '';
    } else if (!href) {
      return links;
    }

    return `${links}${link}`;
  }, '');
}

function getScriptLinks(assets) {
  const js = get(assets, 'main.js', null);
  const manifest = get(assets, 'manifest.js', null);

  const links = [];
  if (manifest) {
    links.push(manifest);
  }

  if (js) {
    links.push(js);
  }

  return links.reduce((links, src) => {
    let script;
    if (src) {
      script = `<script src="${src}"></script>`;
    }

    if (!links) {
      return script || '';
    } else if (!script) {
      return links;
    }

    return `${links}${script}`;
  }, '');
}

const ANALYTICS_CODE = process.env.GOOGLE_ANALYTICS_CODE || 'UA-76079335-1';

let assets;
export default function renderHtmlPage(store, bundles = [], html = '') {
  const head = Helmet.renderStatic();
  if (__DEV__ || !assets) {
    assets = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'webpack-assets.json'), 'utf-8'));
  }

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
  page += getStyleLinks(assets);
  page += manifest;

  page += `</head><body ${head.bodyAttributes.toString()}><div id="app">${html}</div>`;
  page += `<script>window.Prism=${serialize({ manual: true })};window.__WEBPACK_BUNDLES__=${serialize(bundles)};`;
  if (store) {
    page += `window.__INITIAL_STATE__=${serialize(store.getState())};`;
  }
  page += '</script>';
  page += getScriptLinks(assets);
  page += head.script.toString();
  if (!__DEV__) {
    // google analytics
    page += '<script>';
    page += '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){';
    page += '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),';
    page += 'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)';
    page += '})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');';
    page += `ga('create', '${ANALYTICS_CODE}', 'auto');`;
    page += 'ga(\'send\', \'pageview\');';
    page += '</script>';
  }
  page += '</body></html>';

  return page;
}

