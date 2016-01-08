import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Checkbox, RadioGroup, Radio, Switch } from 'react-md/SelectionControls';

import DocPage from 'react-md-documentation';
import CheckboxExamples from './CheckboxExamples';
import CheckboxExamplesRaw from '!!raw!./CheckboxExamples';
import RadioExamples from './RadioExamples';
import RadioExamplesRaw from '!!raw!./RadioExamples';
import SwitchExamples from './SwitchExamples';
import SwitchExamplesRaw from '!!raw!./SwitchExamples';


const commonDetails = [{
  name: 'disabled',
  pt: 'ba',
  desc: 'Boolean if this component is disabled.',
}, {
  name: 'isInitiallyChecked',
  pt: 'ba',
  desc: 'Boolean if this component is initially checked',
}, {
  name: 'onChange',
  pt: 'f',
  desc: 'Optional function to call on value change.',
}, {
  name: 'label',
  pt: 's',
  desc: 'The label for this component.',
}, {
  name: 'labelBefore',
  pt: 'ba',
  desc: 'Boolean if the label comes before the component.',
}, {
  name: 'rippleTimeout',
  pt: 'nu',
  desc: 'The timeout for the ripple on this component. These are controlled by css classes.',
}];

export default class SelectionControls extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Checkbox,
          details: commonDetails,
        }, {
          component: RadioGroup,
          details: [{
            name: 'initialValue',
            pt: 's',
            desc: 'An optional initial value to be selected for the group of Radio Buttons.',
          }, {
            name: 'onChange',
            pt: 'f',
            desc: 'An optional function to call when a radio button has been clicked in this group. It is called as `onChange(event, value)`',
          }, {
            name: 'component',
            pt: 's',
            desc: 'The component to render the radio group as.',
          }, {
            name: 'stacked',
            pt: 'b',
            desc: 'Boolean if the radio group is stacked instead of inline.',
          }, {
            name: 'children',
            pt: 'arrayOf(node)',
            desc: 'The Radio buttons you want to control.',
          }],
        }, {
          component: Radio,
          details: commonDetails.concat([{
            name: 'name',
            pt: 's',
            desc: 'A name for the radio.',
          }]),
        }, {
          component: Switch,
          details: commonDetails,
        }]}
        examples={[{
          name: 'Checkbox',
          markdown: CheckboxExamplesRaw,
          children: <CheckboxExamples />,
        }, {
          name: 'Radio',
          markdown: RadioExamplesRaw,
          children: <RadioExamples />,
        }, {
          name: 'Switch',
          markdown: SwitchExamplesRaw,
          children: <SwitchExamples />,
        }]}
        >
        Selection controls allow the user to select options. There are three kinds: checkboxes, radio buttons, and on/off switches. Selection controls use the theme’s accent color.
      </DocPage>
    );
  }
}
