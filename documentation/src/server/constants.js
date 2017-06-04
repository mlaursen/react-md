import path from 'path';

const REACT_MD_SRC = path.resolve(process.cwd(), '..', 'src');

export const REACT_MD_JS = path.join(REACT_MD_SRC, 'js');
export const REACT_MD_SCSS = path.join(REACT_MD_SRC, 'scss');
export const REACT_MD_PROP_TYPES = path.join(REACT_MD_JS, 'utils', 'PropTypes');
