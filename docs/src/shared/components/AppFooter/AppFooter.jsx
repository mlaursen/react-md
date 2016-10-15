import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import './_footer.scss';
import Contact from './Contact';
import Contribute from './Contribute';
import { version } from '../../../../../package.json';

export default class AppFooter extends PureComponent {
  static propTypes = {
    adjusted: PropTypes.bool,
  };

  render() {
    const { adjusted } = this.props;
    return (
      <footer className={cn('react-doc-footer md-grid', { 'react-doc-footer--bottom-adjust': adjusted })}>
        <Contact />
        <Contribute />
        <div className="site-version md-text-right md-cell md-cell--12">
          Current version: <i>{`${version}`}</i>
        </div>
      </footer>
    );
  }
}
