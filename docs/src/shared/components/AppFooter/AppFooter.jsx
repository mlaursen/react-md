import React, { PureComponent } from 'react';

import './_footer.scss';
import Contact from './Contact';
import Contribute from './Contribute';
import { version } from '../../../../../package.json';

export default class AppFooter extends PureComponent {
  render() {
    return (
      <footer className="react-doc-footer">
        <div className="container">
          <Contact />
          <Contribute />
          <div className="site-version">
            Current version: <i>{`${version}`}</i>
          </div>
        </div>
      </footer>
    );
  }
}
