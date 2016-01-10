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

import './_selection-controls.scss';


const commonDetails = [{
  name: 'disabled',
  pt: 'ba',
  desc: 'Boolean if this component is disabled.',
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
}];

const controlDetails = commonDetails.concat([{
  name: 'checkedIcon',
  pt: 'no',
  desc: 'The FontIcon to use when checked.',
}, {
  name: 'uncheckedIcon',
  pt: 'no',
  desc: 'The FontIcon to use when unchecked',
}, {
  name: 'defaultChecked',
  pt: 'ba',
  desc: 'Boolean if the component is checked by default.',
}, {
  name: 'style',
  pt: 'o',
  desc: 'Any additional styles you want to apply to the container',
}]);

export default class SelectionControls extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        sectionName="Selection Controls"
        components={[{
          component: Checkbox,
          details: controlDetails,
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
          details: controlDetails.concat([{
            name: 'name',
            pt: 's',
            desc: 'A name for the radio.',
          }]),
        }, {
          component: Switch,
          details: commonDetails.concat([{
            name: 'defaultToggled',
            pt: 'ba',
            desc: 'Boolean if the switch is toggled by default',
          }]),
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
