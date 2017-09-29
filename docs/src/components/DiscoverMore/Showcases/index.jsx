import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Markdown from 'components/Markdown';
import withMinHeight from 'components/hoc/withMinHeight';
import LesPassionsdePeronnes from './LesPassionsdePeronnes';
import './_styles.scss';

const markdown = `
## Showcases

The following is a list of products/apps that use react-md other than this documentation site. Their entire
interface might not be implemented with react-md, but it should give a good idea of how it is used.

Want to showcase your app/product? Either open a pull request adding your application or look at
[the github issue](https://github.com/mlaursen/react-md/issues/196) for getting your site added.
`;

const Showcases = ({ style, className }) => (
  <div className={cn('md-grid', className)} style={style}>
    <Markdown markdown={markdown} className="md-text-container md-cell md-cell--12" />
    <ul className="md-grid md-grid--no-spacing md-list-unstyled md-cell md-cell--12">
      <LesPassionsdePeronnes />
    </ul>
  </div>
);

Showcases.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default withMinHeight(Showcases);
