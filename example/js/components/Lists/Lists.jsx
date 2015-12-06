import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Paper, List, ListItem, ListDivider, FontIcon, Avatar } from '../../../../src/js/index';

export default class Lists extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <section className="examples examples-list">
          <Paper>
            <List>
              <ListItem primaryText="Inbox" />
              <ListItem primaryText="Starred" />
              <ListItem primaryText="Sent Mail" />
              <ListItem primaryText="Drafts" />
            </List>
          </Paper>
          <Paper>
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
          <Paper>
            <List>
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Photos" secondaryText="Jan 9, 2014" />
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Recipes" secondaryText="Jan 17, 2014" />
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Work" secondaryText="Jan 28, 2014" />
            </List>
          </Paper>
        </section>
      </div>
    );
  }
}
