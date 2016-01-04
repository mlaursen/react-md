import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { TextField, IconButton, Paper, AppBar, List, ListItem, Avatar } from '../../../../src/js';

const PERSONS = [{
  primaryText: 'Aaron Bennett',
  rightAvatar: <Avatar random>A</Avatar>,
}, {
  primaryText: 'Abbey Christensen',
  rightAvatar: <Avatar random>C</Avatar>,
}, {
  primaryText: 'Ali Connors',
  rightAvatar: <Avatar random>L</Avatar>,
}, {
  primaryText: 'Alex Nelson',
  rightAvatar: <Avatar random>N</Avatar>,
}, {
  primaryText: 'Anthony Stevens',
  rightAvatar: <Avatar random>S</Avatar>,
}];

export default class AppTextField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { persons: [] };
  }

  handleChange = (value) => {
    if(!value) {
      this.setState({ persons: [] });
    } else if(!this.state.persons.length) {
      this.setState({ persons: PERSONS });
    }
  }

  render() {
    return (
      <Paper>
        <AppBar
          leftNode={<IconButton>chevron_left</IconButton>}
          rightNode={<IconButton>close</IconButton>}
          >
          <TextField label="Search" floatingLabel={false} onChange={this.handleChange} />
        </AppBar>
        <CSSTransitionGroup component={List} transitionName="opacity" transitionEnterTimeout={1000} transitionLeaveTimeout={150}>
          {this.state.persons.map((person, i) => {
            return <ListItem key={i} {...person} />;
          })}
        </CSSTransitionGroup>
      </Paper>
    );
  }
}
