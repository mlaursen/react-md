import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import DocPage from '../../DocPage';

import { CircularProgress, LinearProgress, RaisedButton } from '../../../../src/js';

export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { determinateValue: 0 };
    this.interval = null;
  }

  componentDidMount() {
    this.resetDeterminateValues();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  updateDeterminateValues = () => {
    const { determinateValue } = this.state;
    if(determinateValue >= 100) {
      clearInterval(this.interval);
      this.interval = null;
    }

    const nextValue = Math.min(100, determinateValue + 3);
    this.setState({ determinateValue: nextValue });
  }


  resetDeterminateValues = () => {
    this.interval = setInterval(this.updateDeterminateValues, 100);
    this.setState({ determinateValue: 0 });
  }

  render() {
    const { determinateValue } = this.state;
    return (
      <DocPage
        imports={['CircularProgress', 'LinearProgress']}
        code={code}
        sectionName="Progress"
        examples={[
          <div>
            <h3>Linear Progress</h3>
            <div>
              Determinate
              <LinearProgress value={determinateValue} />
            </div>
            <div>
              Indeterminate
              <LinearProgress />
            </div>
          </div>,
          <div>
            <h3>Circular Progress</h3>
            <div>
              <div>Determinate</div>
              <CircularProgress value={determinateValue} />
              <CircularProgress value={determinateValue} scale={1.5} />
              <CircularProgress value={determinateValue} scale={2} />
            </div>
            <div>
              <div>Indeterminate</div>
              <CircularProgress />
              <CircularProgress scale={1.5} />
              <CircularProgress scale={2} />
            </div>
          </div>,
          <RaisedButton onClick={this.resetDeterminateValues} label="Reset determinate progress" />,
        ]}
        components={[{
          component: CircularProgress,
          details: [{
            name: 'value',
            propType: 'nu',
            desc: 'An optional current value if the progress bar is determinate.',
          }, {
            name: 'scale',
            propType: 'nu',
            desc: 'The scale for the progress bar.',
          }, {
            name: 'determinateDashoffset',
            propType: 'nu',
            desc: 'Hopefully you don\'t need to update this one. It is used to help with rotating correctly',
          }],
        }, {
          component: LinearProgress,
          details: [{
            name: 'value',
            propType: 'nu',
            desc: 'An optional current value if the progress bar is determinate.',
          }],
        }]}
      />
    );
  }
}
