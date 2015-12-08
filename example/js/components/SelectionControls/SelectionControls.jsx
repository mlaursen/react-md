import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Switch, RadioGroup, Radio, Checkbox } from '../../../../src/js';
import DocPage from '../../DocPage';

export default class SelectionControls extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const commonDetails = [{
      name: 'disabled',
      propType: 'ba',
      desc: 'Boolean if this component is disabled.',
    }, {
      name: 'isInitiallyChecked',
      propType: 'ba',
      desc: 'Boolean if this component is initially checked',
    }, {
      name: 'onChange',
      propType: 'f',
      desc: 'Optional function to call on value change.',
    }, {
      name: 'label',
      propType: 's',
      desc: 'The label for this component.',
    }, {
      name: 'labelBefore',
      propType: 'ba',
      desc: 'Boolean if the label comes before the component.',
    }, {
      name: 'rippleTimeout',
      propType: 'nu',
      desc: 'The timeout for the ripple on this component. These are controlled by css classes.',
    }];
    return (
      <DocPage
        imports={['Switch', 'Checkbox', 'RadioGroup', 'Radio']}
        examples={[
          <div>
            <Checkbox label="Default" />
            <Checkbox label="Initially checked" isInitiallyChecked={true} />
            <Checkbox label="Disabled" disabled />
          </div>,
          <RadioGroup stacked>
            <Radio name="woop" value="A" label="Click Me, A" />
            <Radio name="woop" value="B" label="Click Me, B" />
            <Radio name="woop" value="C" label="Click Me, C" />
          </RadioGroup>,
          <div>
            <Switch label="Some switch" />
            <Switch label="Initially checked" isInitiallyChecked={true} />
            <Switch label="Disabled" disabled />
          </div>,
        ]}
        components={[{
          component: Checkbox,
          allRemaining: true,
          details: commonDetails,
        }, {
          component: RadioGroup,
          desc: `This is a wrapper component for radio buttons that will automatically handle
          changing the selected radio button in the given group. The intial value will
          be the default checked radio button or the first radio button will be checked
          by default.`,
          allRemaining: true,
          details: [{
            name: 'initialValue',
            propType: 's',
            desc: 'An optional initial value to be selected for the group of Radio Buttons.',
          }, {
            name: 'onChange',
            propType: 'f',
            desc: 'An optional function to call when a radio button has been clicked in this group. It is called as `onChange(event, value)`',
          }, {
            name: 'component',
            propType: 's',
            desc: 'The component to render the radio group as.',
          }, {
            name: 'stacked',
            propType: 'b',
            desc: 'Boolean if the radio group is stacked instead of inline.',
          }, {
            name: 'children',
            propType: 'arrayOf(node)',
            desc: 'The Radio buttons you want to control.',
          }],
        }, {
          component: Radio,
          allRemaining: true,
          details: [{
            name: 'name',
            propType: 's',
            desc: 'A name for the radio.',
          }].concat(commonDetails),
        }, {
          component: Switch,
          allRemaining: true,
          details: commonDetails,
        }]}
        sectionName="SelectionControls"
      />
    );
  }
}
