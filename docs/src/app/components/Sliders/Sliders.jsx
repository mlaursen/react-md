import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Slider from 'react-md/Sliders';

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
        components={[{
          component: Slider,
          details: [],
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
