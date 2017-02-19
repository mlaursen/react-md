import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';

import './_google-docs.scss';
import AutogrowingTextField from './AutogrowingTextField';
import StarDocument from './StarDocument';
import DocMenus from './DocMenus';

@connect(({ ui: { drawer: { desktop } } }) => ({ desktop }))
export default class GoogleDocsClone extends PureComponent {
  static propTypes = {
    desktop: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

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

    return (
      <div className="google-docs-clone">
        <Toolbar
          title={<AutogrowingTextField desktop={desktop} />}
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
    );
  }
}
