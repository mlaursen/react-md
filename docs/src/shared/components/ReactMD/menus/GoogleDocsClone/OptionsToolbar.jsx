import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

import StarDocument from './StarDocument';
import DocMenus from './DocMenus';

const resize = {
  min: 180,
  max: 375,
};

const OptionsToolbar = ({ close }) => (
  <Toolbar
    nav={<Button icon onClick={close}>arrow_back</Button>}
    title={<TextField id="document-title" block customSize="docs-title" placeholder="Untitled Document" className="google-docs-title" resize={resize} />}
    className="google-docs-toolbar md-background--card"
    actions={<Button flat label="some.email@gmail.com" />}
    fixed
    zDepth={1}
  >
    <StarDocument />
    <Button icon tooltipLabel="Move to..." tooltipDelay={300} className="md-btn--toolbar">folder</Button>
    <DocMenus />
  </Toolbar>
);

OptionsToolbar.propTypes = {
  close: PropTypes.func.isRequired,
};

export default OptionsToolbar;
