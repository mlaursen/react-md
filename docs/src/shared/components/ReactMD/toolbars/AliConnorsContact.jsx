import React, { PureComponent } from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';

// Don't actually have a hangouts icon.. Using chat instead
const hangouts = <FontIcon key="hangouts">chat_bubble</FontIcon>;

export default class AliConnorsContact extends PureComponent {
  render() {
    return (
      <List>
        <ListItem
          primaryText="(650 555-1234)"
          secondaryText="Mobile"
          leftIcon={<FontIcon className="md-color--primary">phone</FontIcon>}
          rightIcon={hangouts}
        />
        <ListItem
          primaryText="(323) 555-6780"
          secondaryText="Work"
          rightIcon={hangouts}
          inset
        />
        <Divider inset />
        <ListItem
          primaryText="aliconnors@example.com"
          secondaryText="Personal"
          leftIcon={<FontIcon className="md-color--primary">email</FontIcon>}
        />
        <ListItem
          primaryText="ali_connors@exampe.com"
          secondaryText="Work"
          inset
        />
        <Divider inset />
        <ListItem
          primaryText="2000 Main Street"
          secondaryText={[
            <div key="addr2" className="md-color--text">San Francisco, CA 94112</div>,
            'Home',
          ]}
          leftIcon={<FontIcon className="md-color--primary">location_on</FontIcon>}
          threeLines
        />
        <ListItem
          primaryText="1600 Amphitheatre Pkwy"
          secondaryText={[
            <div key="addr2" className="md-color--text">Mountain View, CA 94043</div>,
            'Work',
          ]}
          inset
          threeLines
        />
      </List>
    );
  }
}
