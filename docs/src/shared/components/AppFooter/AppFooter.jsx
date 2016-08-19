import React, { PureComponent } from 'react';

import './_footer.scss';
import Contact from './Contact';
import Contribute from './Contribute';

export default class AppFooter extends PureComponent {
  render() {
    return (
      <footer className="react-doc-footer">
        <div className="container">
          <Contact />
          <Contribute />
        </div>
      </footer>
    );
  }
}
