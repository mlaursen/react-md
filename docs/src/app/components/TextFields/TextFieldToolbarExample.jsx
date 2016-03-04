import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Paper from 'react-md/lib/Papers';
import { IconButton } from 'react-md/lib/Buttons';
import { ListItem } from 'react-md/lib/Lists';
import Menu from 'react-md/lib/Menus';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

import { randomAvatars } from '../../utils';
import MessageList from '../../commonExamples/MessageList';

const avatars = randomAvatars(4);

export default class TextFieldToolbarExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { focus: false, value: '' };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  resetValue = () => {
    this.setState({ value: '' });
  };

  handleFocus = () => {
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    const { focus, value } = this.state;
    return (
      <div>
        <p>Text fields can also be placed in toolbars.</p>
        <Paper style={{ position: 'relative', maxWidth: 360, height: 600 }}>
          <Toolbar style={{ background: '#fff', position: 'relative', zIndex: '4' }}>
            <IconButton className="action-left">arrow_back</IconButton>
            <TextField
              label="Search"
              onChange={this.handleChange}
              fullWidth
              floatingLabel={false}
              onChange={this.handleChange}
              value={value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <IconButton className="action-right" onClick={this.resetValue}>close</IconButton>
          </Toolbar>
          <Menu isOpen={focus && !!value.length} position="tl" className="no-left-icon-adjust">
            <ListItem primaryText="Aaron Bennett" rightAvatar={avatars[0]} />
            <ListItem primaryText="Abbey Christensen" rightAvatar={avatars[1]} />
            <ListItem primaryText="Ali Connors" rightAvatar={avatars[2]} />
            <ListItem primaryText="Alex Nelson" rightAvatar={avatars[3]} />
          </Menu>
          <MessageList />
          <CSSTransitionGroup transitionName="md-overlay" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {focus &&
            <div key="overkay" className="md-overlay" style={{ minWidth: '100%', minHeight: '100%' }}/>
            }
          </CSSTransitionGroup>
        </Paper>
      </div>
    );
  }
}
