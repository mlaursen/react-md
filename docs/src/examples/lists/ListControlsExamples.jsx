import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { List, ListItemControl } from 'react-md/lib/Lists';
import { Checkbox, Switch } from 'react-md/lib/SelectionControls';

const formatDate = date => {
  const lang = typeof window !== 'undefined'
    ? window.navigator.userLanguage || window.navigator.language
    : 'en-US';
  return Intl.DateTimeFormat(lang, {
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
export default class ListControlsExamples extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getSyncMessage = () => {
    const { checked } = this.state;
    if (!checked) {
      return 'Calendars not synced.';
    }

    return `Last Synced on ${formatDate(new Date())}`;
  };

  render() {
    const { checked } = this.state;
    const SyncCalendars = (
      <Checkbox
        checked={checked}
        onChange={() => this.setState({ checked: !this.state.checked })}
      />
    );

    return (
      <List subheader="Notifications" primarySubheader className="example-list">
        <ListItemControl
          primaryAction={<Checkbox />}
          primaryText="Notifications"
          secondaryText="Allow Notifications"
        />
        <ListItemControl
          secondaryAction={<Switch />}
          primaryText="Sounds"
          secondaryText="Hangouts message"
        />
        <ListItemControl
          secondaryAction={SyncCalendars}
          primaryText="Sync Google Calendars"
          secondaryText={this.getSyncMessage()}
        />
      </List>
    );
  }
}
