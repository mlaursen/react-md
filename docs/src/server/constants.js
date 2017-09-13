import path from 'path';
import { GITHUB_URL, VERSION } from 'constants/application';

const REACT_MD_SRC = path.resolve(process.cwd(), '..', 'src');

export const REACT_MD_JS = path.join(REACT_MD_SRC, 'js');
export const REACT_MD_SCSS = path.join(REACT_MD_SRC, 'scss');
export const REACT_MD_PROP_TYPES = path.join(REACT_MD_JS, 'utils', 'PropTypes');

export const NESTED_GROUPS = ['helpers', 'pickers', 'progress'];

const SERVER_PATH = path.resolve(process.cwd(), 'src', 'server');
const DBS_PATH = path.join(SERVER_PATH, 'databases');
export const JSDOC_DATABASE = path.join(DBS_PATH, 'jsdocs.json');
export const DOCGEN_DATABASE = path.join(DBS_PATH, 'docgens.json');
export const PROP_TYPE_DATABASE = path.join(DBS_PATH, 'proptypeLinks.json');
export const SASSDOC_DATABASE = path.join(DBS_PATH, 'sassdocs.json');
export const SASSDOC_LINKS_DATABASE = path.join(DBS_PATH, 'sassdocLinks.json');

export const BASE_SOURCE_PATH = `${GITHUB_URL}/blob/release/${VERSION.replace(/([0-9]\.[0-9]\.)([0-9A-z]|-)+/, '$1x')}`;
