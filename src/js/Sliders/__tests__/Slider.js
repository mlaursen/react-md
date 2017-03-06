/* eslint-env jest */
jest.unmock('../Slider');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Slider from '../Slider';
import Track from '../Track';
import TextField from '../../TextFields/TextField';

describe('Slider', () => {
  it('merges and passes all styles and all classNames', () => {
    const props = {
      style: { display: 'block' },
      className: 'test',
      trackStyle: { background: 'black' },
      trackClassName: 'test-2',
      thumbStyle: { background: 'red' },
      thumbClassName: 'test-3',
      discreteValueStyle: { background: 'orange' },
      discreteValueClassName: 'test-4',
    };

    const slider = renderIntoDocument(<Slider {...props} />);
    const sliderNode = findDOMNode(slider);
    const track = findRenderedComponentWithType(slider, Track);

    expect(sliderNode.style.display).toBe(props.style.display);
    expect(sliderNode.className).toContain(props.className);

    expect(track.props.style.background).toEqual(props.trackStyle.background);
    expect(track.props.className).toBe(props.trackClassName);
    expect(track.props.thumbStyle).toEqual(props.thumbStyle);
    expect(track.props.thumbClassName).toBe(props.thumbClassName);
    expect(track.props.discreteValueStyle).toEqual(props.discreteValueStyle);
    expect(track.props.discreteValueClassName).toBe(props.discreteValueClassName);
  });

  it('passes the event listeners correctly', () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();

    const props = {
      onClick,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onKeyUp,
      onKeyDown,
    };

    const slider = renderIntoDocument(
      <Slider {...props} />
    );
    const sliderNode = findDOMNode(slider);

    Simulate.click(sliderNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(sliderNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(sliderNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(sliderNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(sliderNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(sliderNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(sliderNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(sliderNode);
    expect(onTouchCancel).toBeCalled();

    Simulate.keyUp(sliderNode);
    expect(onKeyUp).toBeCalled();

    Simulate.keyDown(sliderNode);
    expect(onKeyDown).toBeCalled();
  });

  it('renders a text field with the correct props when the editable prop is true', () => {
    let slider = renderIntoDocument(<Slider />);
    let texts = scryRenderedComponentsWithType(slider, TextField);
    expect(texts.length).toBe(0);

    slider = renderIntoDocument(<Slider editable />);
    texts = scryRenderedComponentsWithType(slider, TextField);
    expect(texts.length).toBe(1);

    const [text] = texts;
    expect(text.props.type).toBe('number');
    expect(text.props.value).toBe(slider.state.value);
    expect(text.props.onChange).toBe(slider._handleTextFieldChange);
    expect(text.props.step).toBe(Slider.defaultProps.step);
  });

  it('renders the Track component with the correct props', () => {
    let slider = renderIntoDocument(<Slider />);
    let { props } = findRenderedComponentWithType(slider, Track);

    expect(props.active).toBe(false);
    expect(props.dragging).toBe(false);
    expect(props.disabled).toBeUndefined();
    expect(props.style).toEqual({ width: slider.state.trackWidth });
    expect(props.thumbLeft).toBe(slider.state.thumbLeft);
    expect(props.trackFillWidth).toBe(slider.state.trackFillWidth);
    expect(props.on).toBe(false);
    expect(props.off).toBe(true);
    expect(props.maskInked).toBe(slider.state.maskInked);
    expect(props.onThumbKeyUp).toBe(slider._handleKeyUp);
    expect(props.onThumbKeyDown).toBe(slider._handleKeyDown);
    expect(props.onThumbFocus).toBe(slider._handleFocus);
    expect(props.discrete).toBeUndefined();
    expect(props.tickWidth).toBe(Slider.defaultProps.tickWidth);
    expect(props.discreteTicks).toBeUndefined();
    expect(props.step).toBe(Slider.defaultProps.step);
    expect(props.scale).toBe(slider.state.scale);
    expect(props.value).toBe(slider.state.value);

    slider = renderIntoDocument(<Slider disabled />);
    props = findRenderedComponentWithType(slider, Track).props;
    expect(props.disabled).toBe(true);
  });

  it('renders the balloon on correct tick when min value is greater than 0 & defaultValue is not 0', () => {
    const renderSliderWithProps = (defaultValue, min, max) => {
      const props = { defaultValue, min, max };
      return renderIntoDocument(<Slider {...props} />);
    };

    let slider = renderSliderWithProps(5, 3, 12);
    expect(slider.state.distance).toEqual(22.22222222222222);

    slider = renderSliderWithProps(55, 40, 77);
    expect(slider.state.distance).toEqual(40.54054054054054);

    slider = renderSliderWithProps(1076, 200, 20000);
    expect(slider.state.distance).toEqual(4.424242424242424);
  });

  it('renders the slider correctly without a defaultValue', () => {
    const renderSliderWithProps = (defaultValue, max) => {
      const props = { defaultValue, max };
      return renderIntoDocument(<Slider {...props} />);
    };

    let slider = renderSliderWithProps(5, 12);
    expect(slider.state.distance).toEqual(41.66666666666667);

    slider = renderSliderWithProps(55, 77);
    expect(slider.state.distance).toEqual(71.42857142857143);

    slider = renderSliderWithProps(1076, 20000);
    expect(slider.state.distance).toEqual(5.38);
  });
});
