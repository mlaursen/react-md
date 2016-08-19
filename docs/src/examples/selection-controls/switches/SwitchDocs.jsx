import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import DocPage from 'react-doc-page';
import SwitchExamples from './SwitchExamples';
import SwitchExamplesRaw from '!!raw!./SwitchExamples';

import Switch from './SwitchDocgen.json';

const text = `
On/off switches toggle the state of a single settings option. The option that the switch
controls, as well as the state it’s in, should be made clear from the corresponding inline
label. Switches take on the same visual properties of the radio button.
`;

export default class SwitchDocs extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        text={text}
        sectionName="Switches"
        examples={[{
          code: SwitchExamplesRaw,
          children: <SwitchExamples />,
        }]}
        docgens={Switch}
      />
    );
  }
}
