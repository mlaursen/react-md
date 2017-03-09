import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';

import './_google-docs.scss';
import StarDocument from './StarDocument';
import DocMenus from './DocMenus';

const resize = {
  min: 180,
  max: 375,
};

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
          aria-label="A google docs clone with about 1% of the functionality"
          visible={visible}
          onHide={this._close}
        >
          <div className="google-docs-clone">
            <Toolbar
              nav={<Button icon onClick={this._close}>arrow_back</Button>}
              title={<TextField id="document-title" block customSize="docs-title" placeholder="Untitled Document" resize={resize} />}
              className="google-docs-toolbar"
              actions={<Button flat label="some.email@gmail.com" />}
            >
              <StarDocument />
              <Button icon tooltipLabel="Move to..." className="md-btn--toolbar">folder</Button>
              <DocMenus />
            </Toolbar>
            <div className="md-background google-docs-playground">
              <Card className="md-text-container">
                <CardText>
                  <TextField
                    aria-label="Google Doc Clone input area"
                    id="document"
                    block
                    rows={20}
                  />
                </CardText>
              </Card>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
