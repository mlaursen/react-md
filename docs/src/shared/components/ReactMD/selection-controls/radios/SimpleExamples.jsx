import React, { PureComponent } from 'react';
import Radio from 'react-md/lib/SelectionControls/Radio';

export default class SimpleExamples extends PureComponent {
  state = { stackedValue: 'A', inlineValue: 'C' };

  _handleStackedChange = (stackedValue) => {
    this.setState({ stackedValue });
  };

  _handleInlineChange = (e) => {
    // Basically how the `SelectionControlGroup` works
    this.setState({ inlineValue: e.target.value });
  };

  render() {
    const { stackedValue, inlineValue } = this.state;
    return (
      <div>
        <fieldset>
          <legend className="md-subheading-1">Stacked Radios</legend>
          <Radio
            id="stackedRadio1"
            name="stackedRadios"
            value="A"
            label="Item one"
            checked={stackedValue === 'A'}
            onChange={this._handleStackedChange}
          />
          <Radio
            id="stackedRadio2"
            name="stackedRadios"
            value="B"
            label="Item two"
            checked={stackedValue === 'B'}
            onChange={this._handleStackedChange}
          />
          <Radio
            id="stackedRadio3"
            name="stackedRadios"
            value="C"
            label="Item three"
            checked={stackedValue === 'C'}
            onChange={this._handleStackedChange}
          />
          <Radio
            id="stackedRadio4"
            name="stackedRadios"
            value="D"
            label="Item four"
            checked={stackedValue === 'D'}
            onChange={this._handleStackedChange}
          />
          <Radio
            id="stackedRadio5"
            name="stackedRadios"
            value="E"
            label="Item five"
            checked={stackedValue === 'E'}
            onChange={this._handleStackedChange}
          />
        </fieldset>
        <fieldset onChange={this._handleInlineChange}>
          <legend className="md-subheading-1">Inline Radios</legend>
          <Radio
            id="inlineRadio1"
            inline
            name="inlineRadios"
            value="A"
            label="Item one"
            checked={inlineValue === 'A'}
          />
          <Radio
            id="inlineRadio2"
            inline
            name="inlineRadios"
            value="B"
            label="Item two"
            checked={inlineValue === 'B'}
          />
          <Radio
            id="inlineRadio3"
            inline
            name="inlineRadios"
            value="C"
            label="Item three"
            checked={inlineValue === 'C'}
          />
        </fieldset>
      </div>
    );
  }
}
