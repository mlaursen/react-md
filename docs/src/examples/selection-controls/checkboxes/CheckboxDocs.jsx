import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import DocPage from 'react-doc-page';
import CheckboxExamples from './CheckboxExamples';
import CheckboxExamplesRaw from '!!raw!./CheckboxExamples';

import Checkbox from './CheckboxDocgen.json';

const text = `
Checkboxes allow the user to select multiple options from a set.

If you have multiple options appearing in a list, you can preserve space by using
checkboxes instead of on/off switches.

If you have a single option, avoid using a checkbox and use an on/off switch instead.

Checkboxes can be toggle by clicking the label of the checkbox or the checkbox itself.
If the icon itself is clicked, ink will appear. There will be no ink when the label
is clicked.
`;

export default class CheckboxDocs extends Component {
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
        sectionName="Checkboxes"
        examples={[{
          code: CheckboxExamplesRaw,
          children: <CheckboxExamples />,
        }]}
        docgens={Checkbox}
      />
    );
  }
}
