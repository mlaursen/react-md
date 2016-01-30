import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { FlatButton, IconButton, FloatingButton, RaisedButton } from 'react-md/lib/Buttons';

import DocPage from 'react-md-documentation';
import FlatButtonExamples from './FlatButtonExamples';
import FlatButtonExamplesRaw from '!!raw!./FlatButtonExamples';
import RaisedButtonExamples from './RaisedButtonExamples';
import RaisedButtonExamplesRaw from '!!raw!./RaisedButtonExamples';
import FloatingButtonExamples from './FloatingButtonExamples';
import FloatingButtonExamplesRaw from '!!raw!./FloatingButtonExamples';
import IconButtonExamples from './IconButtonExamples';
import IconButtonExamplesRaw from '!!raw!./IconButtonExamples';
import './_buttons.scss';

const commonDetails = [{
  name: 'onClick',
  pt: 'f',
  desc: 'The onClick function for the button.',
}, {
  name: 'disabled',
  pt: 'ba',
  desc: 'Boolean if the button is disabled',
}];

const flatRaisedDetails = commonDetails.concat([{
  name: 'label',
  pt: 's',
  desc: 'The label for the button. This is the text that is rendered in the button.',
}, {
  name: 'children',
  pt: 'no',
  desc: 'Should be a FontIcon to display in the button.',
}, {
  name: 'type',
  pt: 's',
  desc: 'The type of button. Defaults to button.',
}, {
  name: 'iconBefore',
  pt: 'ba',
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
        sectionName="Buttons"
        components={[{
          component: FlatButton,
          details: flatRaisedDetails,
        }, {
          component: RaisedButton,
          details: flatRaisedDetails,
        }, {
          component: FloatingButton,
          details: commonDetails.concat([{
            name: 'children',
            pt: 's',
            desc: 'An optional child element that is used in FontIcon to render the icon.',
          }, {
            name: 'iconClassName',
            pt: 's',
            desc: 'The icon className to use in FontIcon.',
          }]),
        }, {
          component: IconButton,
          details: commonDetails.concat([{
            name: 'iconClassName',
            pt: 's',
            desc: 'The iconClassName to use in FontIcon.',
          }, {
            name: 'children',
            pt: 'no',
            desc: 'Any children to use to render the font icon.',
          }, {
            name: 'href',
            pt: 's',
            desc: 'A link to use when the IconButton should be a link instead of button.',
          }]),
        }]}
        examples={[{
          name: 'Flat Button',
          markdown: FlatButtonExamplesRaw,
          children: <FlatButtonExamples />,
        }, {
          name: 'Raised Button',
          markdown: RaisedButtonExamplesRaw,
          children: <RaisedButtonExamples />,
        }, {
          name: 'Floating Button',
          markdown: FloatingButtonExamplesRaw,
          children: <FloatingButtonExamples />,
        }, {
          name: 'Icon Button',
          markdown: IconButtonExamplesRaw,
          children: <IconButtonExamples />,
        }]}
        >
        A button clearly communicates what action will occur when the user touches it. It consists of text, an image, or both, designed in accordance with your app’s color theme.
      </DocPage>
    );
  }
}
