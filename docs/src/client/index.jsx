import 'babel-polyfill';
import 'svgxuse';

import configureStore from './configureStore';
import render from './render';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);
const locale = window.navigator.userLanguage || window.navigator.language || 'en-US';

const root = document.getElementById('app');
render(root, store, locale);
