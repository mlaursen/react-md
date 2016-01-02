import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { FlatButton, RaisedButton, FloatingButton, IconButton, Tabs, Tab, FontIcon } from '../../../../src/js';

import DocPage from '../../DocPage';

const commonDetails = [{
  name: 'onClick',
  propType: 'f',
  desc: 'The onClick function for the button.',
}, {
  name: 'disabled',
  propType: 'ba',
  desc: 'Boolean if the button is disabled',
}];

const flatRaisedDetails = commonDetails.concat([{
  name: 'label',
  propType: 's',
  desc: 'The label for the button. This is the text that is rendered in the button.',
}, {
  name: 'children',
  propType: 'n',
  desc: 'Should be a FontIcon to display in the button.',
}, {
  name: 'type',
  propType: 's',
  desc: 'The type of button. Defaults to button.',
}, {
  name: 'iconBefore',
  propType: 'ba',
  desc: 'Boolean if the icon should come before the label.',
}]);

export default class Buttons extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Button', 'FlatButton', 'RaisedButton', 'FloatingButton']}
        code={code}
        sectionName="Buttons"
        examples={[
          <Tabs primary>
            <Tab label="Flat Buttons">
              <FlatButton default label="normal" />
              <FlatButton primary label="Talk">
                <FontIcon>chat_bubble_outline</FontIcon>
              </FlatButton>
              <FlatButton secondary label="Talk" iconBefore={false}>
                <FontIcon>chat_bubble_outline</FontIcon>
              </FlatButton>
              <FlatButton disabled>disabled</FlatButton>
            </Tab>
            <Tab label="Raised Buttons">
              <RaisedButton default>raised</RaisedButton>
              <RaisedButton primary label="Spock" iconBefore={false}>
                <FontIcon iconClassName="fa fa-hand-spock-o" />
              </RaisedButton>
              <RaisedButton secondary label="Paper">
                <FontIcon iconClassName="fa fa-hand-paper-o" />
              </RaisedButton>
              <RaisedButton disabled>raised</RaisedButton>
            </Tab>
            <Tab label="Floating Buttons">
              <FloatingButton default>home</FloatingButton>
              <FloatingButton primary>grade</FloatingButton>
              <FloatingButton secondary>favorite</FloatingButton>
              <FloatingButton primary disabled>favorite</FloatingButton>
            </Tab>
            <Tab label="Icon Buttons">
              <IconButton>chat_bubble_outline</IconButton>
              <IconButton>home</IconButton>
              <IconButton>favorite</IconButton>
            </Tab>
          </Tabs>,
        ]}
        components={[{
          component: FlatButton,
          allRemaining: true,
          details: flatRaisedDetails,
        }, {
          component: RaisedButton,
          allRemaining: true,
          details: flatRaisedDetails,
        }, {
          component: FloatingButton,
          allRemaining: true,
          details: commonDetails.concat([{
            name: 'children',
            propType: 's',
            desc: 'An optional child element that is used in FontIcon to render the icon.',
          }, {
            name: 'iconClassName',
            propType: 's',
            desc: 'The icon className to use in FontIcon.',
          }]),
        }, {
          component: IconButton,
          allRemaining: true,
          details: commonDetails.concat([{
            name: 'iconClassName',
            propType: 's',
            desc: 'The iconClassName to use in FontIcon.',
          }, {
            name: 'children',
            propType: 'no',
            desc: 'Any children to use to render the font icon.',
          }, {
            name: 'href',
            propType: 's',
            desc: 'A link to use when the IconButton should be a link instead of button.',
          }]),
        }]}
      />
    );
  }
}
