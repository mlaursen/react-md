import React from 'react';
import CardExamples from './CardExamples';
import CardExamplesRaw from '!!raw!./CardExamples';
import CardVideoExample from './CardVideoExample';
import CardVideoExampleRaw from '!!raw!./CardVideoExample';
import CardWeather from './CardWeather';
import CardWeatherRaw from '!!raw!./CardWeather';

export default [{
  title: 'Expandable Card Example with Media',
  code: CardExamplesRaw,
  children: <CardExamples />,
}, {
  title: 'Card With a Video',
  code: CardVideoExampleRaw,
  children: <CardVideoExample />,
}, {
  code: CardWeatherRaw,
  children: <CardWeather />,
}];
