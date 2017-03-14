import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';

import './_google-docs.scss';
import OptionsToolbar from './OptionsToolbar';
import Playground from './Playground';

@connect(({ ui: { drawer: { desktop } } }) => ({ desktop }))
export default class GoogleDocsClone extends PureComponent {
  static propTypes = {
    desktop: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  _close = () => {
    this.setState({ visible: false });
  };

  _toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { desktop } = this.props;
    if (!desktop) {
      return (
        <h2>
          Sorry, I didn&apos;t feel like making this clone fully responsive. View on
          a desktop screen if it interests you.
        </h2>
      );
    }

    const { visible } = this.state;
    return (
      <div>
        <Button label="Open Google Docs Clone" raised onClick={this._toggle} />
        <Dialog
          id="google-docs-clone-dialog"
          fullPage
          aria-label="A google docs clone with about 0.01% of the functionality"
          visible={visible}
          onHide={this._close}
        >
          <OptionsToolbar close={this._close} />
          <Playground />
        </Dialog>
      </div>
    );
  }
}
