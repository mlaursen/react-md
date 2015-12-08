import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { List, ListItem, ListDivider, ListSubheader, FontIcon, Avatar } from '../../../../src/js/index';
import DocPage from '../../DocPage';
import ListOutline from './ListOutline.jsx';

export default class Lists extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['List', 'ListItem', 'ListDivider']}
        defaultImport="List"
        examples={[
          <ListOutline>
            <List>
              <ListItem primaryText="Inbox" />
              <ListItem primaryText="Starred" />
              <ListItem primaryText="Sent Mail" />
              <ListItem primaryText="Drafts" />
            </List>
          </ListOutline>,
          <ListOutline primary={true}>
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
          </ListOutline>,
          <ListOutline secondary={true}>
            <List subheader="Files" altSubheader={true}>
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Photos" secondaryText="Jan 9, 2014" />
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Recipes" secondaryText="Jan 17, 2014" />
              <ListItem leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />} primaryText="Work" secondaryText="Jan 28, 2014" />
            </List>
          </ListOutline>,
          <ListOutline primary={true}>
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
          </ListOutline>,
        ]}
        components={[{
          component: List,
          details: [{
            name: 'subheader',
            propType: 's',
            desc: 'An optional subheader to start the list with.',
          }, {
            name: 'primarySubheader',
            propType: 'ba',
            desc: 'Boolean if the subheader should be styled as the primary color.',
          }, {
            name: 'children',
            propType: 'arrayOf(node)',
            desc: `A list of ListItem, ListDivider, and ListSubheader to display in the list
            component. This component adds additional css classes to style your list
            according to the material design specs for additional margin and other things.`,
          }, {
            name: 'textOnly',
            propType: 'ba',
            desc: 'Boolean if this list is only text without icons, avatars, or buttons.',
          }],
        }, {
          component: ListItem,
          allRemaining: true,
          details: [{
            name: 'primaryText',
            propType: 's',
            desc: 'The primary text to display in the list.',
          }, {
            name: 'secondaryText',
            propType: 's',
            desc: 'The secondary text to display on line 2.',
          }, {
            name: 'secondaryText2',
            propType: 's',
            desc: 'The secondary text to display on line 3.',
          }, {
            name: 'leftIcon',
            propType: 'no',
            desc: 'An icon to display to the left of the primary text.',
          }, {
            name: 'leftAvatar',
            propType: 'no',
            desc: 'An avatar to display to the left of the primary text.',
          }, {
            name: 'rightIcon',
            propType: 'no',
            desc: 'An icon to display to the right of the primary text.',
          }, {
            name: 'rightAvatar',
            propType: 'no',
            desc: 'An avatar to display to the right of the primary text.',
          }, {
            name: 'component',
            propType: 'f',
            desc: `An optional react component to render the list item as.
            This is useful if you are using react-router and want to have a list
            of Link.`,
          }],
        }, {
          component: ListDivider,
          allRemaining: true,
          details: [{ name: 'inset', propType: 'ba', desc: 'Boolean if the divider is inset instead of full width' }],
        }, {
          component: ListSubheader,
          allRemaining: true,
          details: [{
            name: 'primaryText',
            propType: 's',
            desc: 'The primary text to display in the subheader.',
          }, {
            name: 'primary',
            propType: 'ba',
            desc: 'Boolean if the subheader should be styled with the primary color.',
          }],
        }]}
      />
    );
  }
}
