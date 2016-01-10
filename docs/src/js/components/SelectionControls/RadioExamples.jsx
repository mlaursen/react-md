import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-md/SelectionControls';
import FontIcon from 'react-md/FontIcon';

const customRadios = {
  stars: {
    checkedIcon: <FontIcon>star</FontIcon>,
    uncheckedIcon: <FontIcon>star_border</FontIcon>,
  },
  info: {
    checkedIcon: <FontIcon>info</FontIcon>,
    uncheckedIcon: <FontIcon>info_outline</FontIcon>,
  },
  warning: {
    checkedIcon: <FontIcon>error</FontIcon>,
    uncheckedIcon: <FontIcon>error_outline</FontIcon>,
  },
};

export default class RadioExamples extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, customRadios.stars, { className: 'custom-stars' });
  }

  changeCustomRadio = (value, e) => {
    console.log(e);
    this.setState(Object.assign({}, { className: `custom-${value}` }, customRadios[value]));
  };

  render() {
    return (
      <div>
        <h4 className="md-title">Inline</h4>
        <RadioGroup name="woop" inline>
          <Radio value="A" label="Click me for A" />
          <Radio value="B" label="Click me for B" />
          <Radio value="C" label="Click me for C" />
        </RadioGroup>

        <h4 className="md-title">Stacked</h4>
        <RadioGroup name="woop2" defaultValue="B">
          <Radio value="A" label="Click me for A" />
          <Radio value="B" label="Click me for B" />
          <Radio value="C" label="Click me for C" />
        </RadioGroup>

        <h4 className="md-title">Custom Radio</h4>
        <RadioGroup name="custom-radio" onChange={this.changeCustomRadio}>
          <Radio value="stars" label="I want to use stars!" {...this.state} />
          <Radio value="info" label="I have some information to give.." {...this.state} />
          <Radio value="warning" label="I am going to warn you.. This probably isn't that helpful." {...this.state} />
          <Radio disabled label="Help, I am disabled!" {...this.state} />
        </RadioGroup>
      </div>
    );
  }
}
