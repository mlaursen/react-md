import React, { PureComponent, PropTypes } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import PhoneSize from 'components/PhoneSize';
import Markdown from 'components/Markdown';

const description = `
The current example will need to be opened in a dialog to be viewed because
it requires the full screen on mobile devices to be viewed correctly.
`;

export default class PhoneDemo extends PureComponent {
  static propTypes = {
    demoId: PropTypes.string,
    description: PropTypes.string,
    buttonLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    buttonLabel: 'View Example',
    description,
    iconLeft: 'arrow_back',
  };

  static childContextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
    this._handleShow = this._handleShow.bind(this);
    this._handleHide = this._handleHide.bind(this);
  }

  getChildContext() {
    return { hideDemo: this._handleHide };
  }

  _handleShow(e) {
    const { pageX, pageY } = e;
    this.setState({ visible: true, pageX, pageY });
  }

  _handleHide() {
    this.setState({ visible: false });
  }

  render() {
    const { visible, pageX, pageY } = this.state;
    const {
      buttonLabel,
      description,
      ...props
    } = this.props;

    let markdown;
    if (description) {
      markdown = <Markdown markdown={description} />;
    }

    return (
      <div>
        {markdown}
        <Button raised onClick={this._handleShow} label={buttonLabel} />
        <Dialog
          id="phoneDemo"
          isOpen={visible}
          pageX={pageX}
          pageY={pageY}
          onClose={this._handleHide}
          fullPage
          aria-label="A demo for phones"
        >
          <PhoneSize {...props} mobile />
        </Dialog>
      </div>
    );
  }
}
