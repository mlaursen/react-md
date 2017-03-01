import { version, bugs } from '../../../../package.json';
const { port, host, path, protocol } = require('../../server/config');
const {
  port: apiPort,
  host: apiHost,
  path: apiPath,
  protocol: apiProtocol,
} = require('../../../../api/src/server/config');

export const VERSION = version;
export const GITHUB_URL = bugs.url.replace('/issues', '');
export const THEME_STORAGE_KEY = 'save-theme';
export const CUSTOM_THEME_CLASS_NAME = 'custom-theme';
export const FOOD_DATA_URL = 'https://data.cityofchicago.org/api/views/4ijn-s7e5/rows.json?accessType=DOWNLOAD';

export const API_URL = `${apiProtocol}://${apiHost}${apiPort ? `:${apiPort}` : ''}${apiPath}`;

export const BASE_URL = `${protocol}://${host}${port ? `:${port}` : ''}${path}`;
export const PROXY_URL = `${BASE_URL}/proxy?url=`;
