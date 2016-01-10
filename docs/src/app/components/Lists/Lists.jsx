import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, ListItem, ListSubheader, ListDivider } from 'react-md/Lists';

import DocPage from 'react-md-documentation';
import ListExamples from './ListExamples';
import ListExamplesRaw from '!!raw!./ListExamples';

export default class Lists extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: List,
          details: [{
            name: 'subheader',
            pt: 's',
            desc: 'An optional subheader to start the list with.',
          }, {
            name: 'primarySubheader',
            pt: 'ba',
            desc: 'Boolean if the subheader should be styled as the primary color.',
          }, {
            name: 'children',
            pt: 'arrayOf(node)',
            desc: `A list of ListItem, ListDivider, and ListSubheader to display in the list
            component. This component adds additional css classes to style your list
            according to the material design specs for additional margin and other things.`,
          }, {
            name: 'textOnly',
            pt: 'ba',
            desc: 'Boolean if this list is only text without icons, avatars, or buttons.',
          }],
        }, {
          component: ListItem,
          details: [{
            name: 'primaryText',
            pt: 's',
            desc: 'The primary text to display in the list.',
          }, {
            name: 'secondaryText',
            pt: 's',
            desc: 'The secondary text to display on line 2.',
          }, {
            name: 'secondaryText2',
            pt: 's',
            desc: 'The secondary text to display on line 3.',
          }, {
            name: 'leftIcon',
            pt: 'no',
            desc: 'An icon to display to the left of the primary text.',
          }, {
            name: 'leftAvatar',
            pt: 'no',
            desc: 'An avatar to display to the left of the primary text.',
          }, {
            name: 'rightIcon',
            pt: 'no',
            desc: 'An icon to display to the right of the primary text.',
          }, {
            name: 'rightAvatar',
            pt: 'no',
            desc: 'An avatar to display to the right of the primary text.',
          }, {
            name: 'component',
            pt: 'f',
            desc: `An optional react component to render the list item as.
            This is useful if you are using react-router and want to have a list
            of Link.`,
          }],
        }, {
          component: ListDivider,
          details: [{
            name: 'primaryText',
            pt: 's',
            desc: 'The primary text to display in the subheader.',
          }, {
            name: 'primary',
            pt: 'ba',
            desc: 'Boolean if the subheader should be styled with the primary color.',
          }],
        }, {
          component: ListSubheader,
          details: [{
            name: 'inset',
            pt: 'ba',
            desc: 'Boolean if the divider is inset instead of full width',
          }],
        }]}
        examples={[{
          markdown: ListExamplesRaw,
          children: <ListExamples />,
        }]}
        >
        Lists present multiple line items vertically as a single continuous element.
      </DocPage>
    );
  }
}
