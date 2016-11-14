import { version, bugs } from '../../../../package.json';
const { port, host } = require('../../../serverConfig.json');
const {
  port: apiPort,
  host: apiHost,
  path: apiPath,
} = require('../../../../api/serverConfig.json');

export const VERSION = version;
export const GITHUB_URL = bugs.url.replace('/issues', '');
export const THEME_STORAGE_KEY = 'save-theme';
export const CUSTOM_THEME_CLASS_NAME = 'custom-theme';
export const FOOD_DATA_URL = 'https://data.cityofchicago.org/api/views/4ijn-s7e5/rows.json?accessType=DOWNLOAD';

export const API_URL = `http://${apiHost}:${apiPort}${apiPath}`;
export const BASE_URL = `http://${host}:${port}`;
export const PROXY_URL = `${BASE_URL}/proxy?url=`;
