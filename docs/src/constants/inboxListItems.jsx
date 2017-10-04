import React from 'react';
import { FontIcon } from 'react-md';

export default [{
  key: 'inbox',
  primaryText: 'Inbox',
  leftIcon: <FontIcon>inbox</FontIcon>,
  active: true,
}, {
  key: 'starred',
  primaryText: 'Starred',
  leftIcon: <FontIcon>star</FontIcon>,
}, {
  key: 'send-mail',
  primaryText: 'Send mail',
  leftIcon: <FontIcon>send</FontIcon>,
}, {
  key: 'drafts',
  primaryText: 'Drafts',
  leftIcon: <FontIcon>drafts</FontIcon>,
}, { key: 'divider', divider: true }, {
  key: 'all-mail',
  primaryText: 'All mail',
  leftIcon: <FontIcon>mail</FontIcon>,
}, {
  key: 'trash',
  primaryText: 'Trash',
  leftIcon: <FontIcon>delete</FontIcon>,
}, {
  key: 'spam',
  primaryText: 'Spam',
  leftIcon: <FontIcon>info</FontIcon>,
}];
