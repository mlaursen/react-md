import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import loremIpsum from 'lorem-ipsum';

import Button from 'react-md/lib/Buttons';
import Paper from 'react-md/lib/Papers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Menu from 'react-md/lib/Menus';
import { List, ListItem } from 'react-md/lib/Lists';

import { randomAvatars } from 'utils/RandomUtils';

const noop = () => {};
const avatars = randomAvatars(8);
const items = [0, 1, 2, 3];
const primaryTexts = items.map(() => {
  const s = loremIpsum({ count: 5, units: 'words' });
  return s.charAt(0).toUpperCase() + s.substring(1, s.length);
});
const secondaryTexts = items.map(() => loremIpsum());

export default class InToolbarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { focus: false, value: '' };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  _handleChange = value => this.setState({ value });
  _resetValue = () => this.setState({ value: '' });
  _handleFocus = () => this.setState({ focus: true });
  _handleBlur = () => this.setState({ focus: false });

  render() {
    const { focus, value } = this.state;

    return (
      <Paper className="phone-size-container">
        <Toolbar primary={false}>
          <Button icon className="action-left">arrow_back</Button>
          <TextField
            id="searchFakePeople"
            placeholder="Search"
            onChange={this._handleChange}
            value={value}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            block
            fullWidth
          />
          <Button icon className="md-toolbar-item" onClick={this._resetValue}>close</Button>
        </Toolbar>
        <Menu isOpen={focus && !!value.length} position={Menu.Positions.TOP_LEFT} onClose={noop}>
          <ListItem primaryText="Aaron Bennett" rightAvatar={avatars[0]} />
          <ListItem primaryText="Abbey Christensen" rightAvatar={avatars[1]} />
          <ListItem primaryText="Ali Connors" rightAvatar={avatars[2]} />
          <ListItem primaryText="Alex Nelson" rightAvatar={avatars[3]} />
        </Menu>
        <List>
          {items.map(key => (
            <ListItem
              key={key}
              primaryText={primaryTexts[key]}
              secondaryText={secondaryTexts[key]}
              leftAvatar={avatars[key + 4]}
            />
          ))}
        </List>
        <CSSTransitionGroup
          component="div"
          transitionName="md-overlay"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {focus && <div key="overlay" className="md-overlay" />}
        </CSSTransitionGroup>
      </Paper>
    );
  }
}
