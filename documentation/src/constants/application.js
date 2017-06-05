import { version, bugs } from '../../../package.json';

export const VERSION = version;
export const GITHUB_URL = bugs.url.replace('/issues', '');
export const API_ENDPOINT = '/api';
export const SEARCH_ENDPOINT = '/search';
export const DOCGENS_ENDPOINT = '/docgens';
export const SASSDOCS_ENDPOINT = '/sassdocs';
