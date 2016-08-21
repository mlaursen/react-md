import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import FontIcon from 'react-md/lib/FontIcons';
import Subheader from 'react-md/lib/Subheaders';

const InboxList = () => (
  <List className="white-rel">
    <ListItem primaryText="Inbox" leftIcon={<FontIcon>inbox</FontIcon>} />
    <ListItem primaryText="Starred" leftIcon={<FontIcon>star</FontIcon>} />
    <ListItem primaryText="Sent Mail" leftIcon={<FontIcon>send</FontIcon>} />
    <ListItem primaryText="Drafts" leftIcon={<FontIcon>drafts</FontIcon>} />
    <Subheader primaryText="Subheader" />
    <ListItem primaryText="All Mail" leftIcon={<FontIcon>email</FontIcon>} />
    <ListItem primaryText="Trash" leftIcon={<FontIcon>delete</FontIcon>} />
    <ListItem primaryText="Spam" leftIcon={<FontIcon>info</FontIcon>} />
  </List>
);

export default InboxList;
