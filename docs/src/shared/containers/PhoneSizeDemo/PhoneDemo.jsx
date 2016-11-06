import React, { PureComponent, PropTypes } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

import Markdown from 'components/Markdown';
import PhoneSizeDemo from 'components/PhoneSizeDemo';

const description = `
The current example will need to be opened in a dialog to be viewed because
it requires the full screen on mobile devices to be viewed correctly.
`;


export default class PhoneDemo extends PureComponent {
  static propTypes = {
    demoId: PropTypes.string.isRequired,
    demoLabel: PropTypes.string.isRequired,
    description: PropTypes.string,
    buttonLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    description,
    demoId: 'phoneDemo',
    demoLabel: 'A full page phone example',
    buttonLabel: 'View Example',
    iconLeft: 'arrow_back',
  };

  static childContextTypes = {
    hideDemo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { visible: false };
    this._showDemo = this._showDemo.bind(this);
    this._hideDemo = this._hideDemo.bind(this);
  }

  getChildContext() {
    return { hideDemo: this._hideDemo };
  }

  _showDemo(e) {
    const { pageX, pageY } = (e.changedTouches ? e.changedTouches[0] : e);
    this.setState({ visible: true, pageX, pageY });
  }

  _hideDemo() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const {
      demoId,
      demoLabel,
      buttonLabel,
      ...props
    } = this.props;
    delete props.description;

    let { description } = this.props;
    if (description) {
      description = <Markdown markdown={description} />;
    }

    return (
      <section>
        {description}
        <Button raised onClick={this._showDemo} label={buttonLabel} />
        <Dialog
          id={demoId}
          isOpen={visible}
          onClose={this._hideDemo}
          fullPage
          aria-label={demoLabel}
        >
          <PhoneSizeDemo {...props} mobile />
        </Dialog>
      </section>
    );
  }
}
