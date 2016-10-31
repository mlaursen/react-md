import { version, bugs } from '../../../../package.json';

export const VERSION = version;
export const GITHUB_URL = bugs.url.replace('/issues', '');
export const THEME_STORAGE_KEY = 'save-theme';
export const CUSTOM_THEME_CLASS_NAME = 'custom-theme';
