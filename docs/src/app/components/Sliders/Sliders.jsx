import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Slider from 'react-md/lib/Sliders';

import DocPage from 'react-md-documentation';
import SliderExamples from './SliderExamples';
import SliderExamplesRaw from '!!raw!./SliderExamples';
//import './_slider.scss';

export default class Sliders extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Slider,
          details: [{
            name: 'defaultValue',
            pt: 'nu',
            desc: 'The default value for the slider.',
          }, {
            name: 'value',
            pt: 'nu',
            desc: `An optional value to use for the slider if you want to control it.`,
          }, {
            name: 'onChange',
            pt: 'f',
            desc: `An optional function to call when the value has been changed by clicking
            somehere on the slider, using the left/right arrow keys, or when the user stops
            dragging the slider. The function is called with \`onChange(newValue, event)\``,
          }, {
            name: 'onDragChange',
            pt: 'f',
            desc: `An optional f unction to call when the value has been changed while
            the user is dragging the slider. The function is called with \`onDragChange(newValue, event)\``,
          }, {
            name: 'min',
            pt: 'nu',
            desc: `The min value for the slider. This has only been tested with whole numbers between
            0 and 100. No idea how reliable it is with decimals and numbers below 0.`,
          }, {
            name: 'max',
            pt: 'nu',
            desc: `The max value for the slider. This has only been tested with whole numbers above 0.`,
          }, {
            name: 'step',
            pt: 'nu',
            desc: `Any number to use for converting the slider into a discrete slider.`,
          }, {
            name: 'stepPrecision',
            pt: 'nu',
            desc: `Any precision to use when the step isn't a whole number. Haven't really tested it yet.`,
          }],
        }]}
        examples={[{
          markdown: SliderExamplesRaw,
          children: <SliderExamples />,
        }]}
        >
          Sliders let users select a value from a continuous or discrete range of
          values by moving the slider thumb. The smallest value is to the left,
          the largest to the right. Sliders can have icons to the left and right of
          the bar that reflect the value intensity. The interactive nature of the
          slider makes it a great choice for settings that reflect intensity levels,
          such as volume, brightness, or color saturation.
      </DocPage>
    );
  }
}
