import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';

import DocumentToolbar from './DocumentToolbar';
import DocumentContainer from './DocumentContainer';

export default class GoogleDocsDialog extends PureComponent {
  static propTypes = {
    hide: PropTypes.func,
    visible: PropTypes.bool,
  };

  static childContextTypes = {
    inkDisabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'mouse', 'touch'])),
  };

  getChildContext() {
    return { inkDisabledInteractions: ['keyboard'] };
  }

  render() {
    const { visible, hide } = this.props;
    return (
      <Dialog
        id="google-docs-clone-dialog"
        fullPage
        aria-label="Google docs clone"
        visible={visible}
        onHide={hide}
        closeOnEsc={false}
        className="menus__google-docs"
      >
        <DocumentToolbar hide={hide} />
        <DocumentContainer />
      </Dialog>
    );
  }
}
