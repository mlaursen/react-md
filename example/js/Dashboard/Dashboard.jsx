import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Avatar, Paper, FontIcon, IconButton, List, ListItem, ListDivider, Toolbar } from '../../../src/js/index';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <section style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Paper zDepth={3} style={{ width: 256, margin: '1em' }}>
          <Toolbar primary>
            <IconButton>menu</IconButton>
          </Toolbar>
          <List>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent Mail" />
            <ListItem primaryText="Drafts" />
          </List>
        </Paper>
        <Paper zDepth={3} style={{ width: 256, margin: '1em' }}>
          <Toolbar secondary>
            <IconButton>menu</IconButton>
          </Toolbar>
          <List>
            <ListItem leftIcon={<FontIcon>inbox</FontIcon>} primaryText="Inbox" />
            <ListItem leftIcon={<FontIcon>access_time</FontIcon>} primaryText="Snoozed" />
            <ListItem leftIcon={<FontIcon>done</FontIcon>} primaryText="Done" />
            <ListDivider />
            <ListItem leftIcon={<FontIcon>drafts</FontIcon>} primaryText="Drafts" />
            <ListItem leftIcon={<FontIcon>send</FontIcon>} primaryText="Sent" />
            <ListItem leftIcon={<FontIcon>touch_app</FontIcon>} primaryText="Reminders" />
            <ListItem leftIcon={<FontIcon>delete</FontIcon>} primaryText="Trash" />
            <ListItem leftIcon={<FontIcon>report</FontIcon>} primaryText="Spam" />
          </List>
        </Paper>
        <Paper zDepth={3} style={{ width: 256, margin: '1em' }}>
          <Toolbar primary>
            <IconButton>menu</IconButton>
          </Toolbar>
          <List>
            <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Photos" secondaryText="Jan 9, 2014" />
            <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Recipes" secondaryText="Jan 17, 2014" />
            <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Work" secondaryText="Jan 28, 2014" />
          </List>
        </Paper>
        <Paper zDepth={3} style={{ width: 256, margin: '1em' }}>
          <Toolbar primary>
            <IconButton>menu</IconButton>
          </Toolbar>
          <List>
            <ListItem
              leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
              primaryText="Brunch this weekend?"
              secondaryText="Ali Connors"
              secondaryText2="I'll be in your neighborhood sometime this week"
            />
            <ListItem
              leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
              primaryText="Summer BBQ"
              secondaryText="Ali Connors"
            />
            <ListItem
              leftAvatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />}
              primaryText="Oui Oui"
              secondaryText="Ali Connors"
            />
          </List>
        </Paper>
      </section>
    );
  }
}
