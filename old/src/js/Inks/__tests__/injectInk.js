/* eslint-env jest */
/* eslint-disable react/prop-types, react/no-multi-comp, max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';

import injectInk from '../injectInk';
import InkContainer from '../InkContainer';

class Test extends React.Component {
  render() {
    return <div />;
  }
}
const InkedTest = injectInk(Test);

class Test2 extends React.Component {
  render() {
    return <div>{this.props.ink}</div>;
  }
}
const InkedTest2 = injectInk(Test2);

describe('injectInk', () => {
  it('should create a higher order component that has an ink prop', () => {
    const inkedTest = shallow(<InkedTest />);

    expect(inkedTest.props().ink).toBeDefined();
  });

  it('should inject the ink prop when the component has not been disabled', () => {
    const inkedTest = shallow(<InkedTest disabled />);
    expect(inkedTest.props().ink).not.toBeDefined();

    inkedTest.setProps({ disabled: false });
    expect(inkedTest.props().ink).toBeDefined();
  });

  it('should inject the ink prop when the ink has not been disabled by inkDisabled', () => {
    const inkedTest = shallow(<InkedTest inkDisabled />);
    expect(inkedTest.props().ink).not.toBeDefined();

    inkedTest.setProps({ inkDisabled: false });
    expect(inkedTest.props().ink).toBeDefined();
  });

  it('should not inject the ink prop if either the component or the ink has been disabled', () => {
    const inkedTest = shallow(<InkedTest />);
    expect(inkedTest.props().ink).toBeDefined();

    inkedTest.setProps({ inkDisabled: true });
    expect(inkedTest.props().ink).not.toBeDefined();

    inkedTest.setProps({ disabled: true });
    expect(inkedTest.props().ink).not.toBeDefined();

    inkedTest.setProps({ inkDisabled: false });
    expect(inkedTest.props().ink).not.toBeDefined();

    inkedTest.setProps({ disabled: false });
    expect(inkedTest.props().ink).toBeDefined();
  });

  it('should render the ink prop as the InkContainer component', () => {
    const inkedTest = mount(<InkedTest2 />);

    expect(inkedTest.find(InkContainer).length).toBe(1);
  });

  it('should pass corresponding props to the InkContainer', () => {
    const props = {
      inkTransitionOverlap: 300,
      inkTransitionEnterTimeout: 150,
      inkTransitionLeaveTimeout: 100,
      inkStyle: { width: 200 },
      inkClassName: 'some-ink-class-name',
      inkContainerStyle: { height: 100 },
      inkContainerClassName: 'some-ink-container-class-name',
      disabledInteractions: ['touch'],
      waitForInkTransition: false,
    };

    const inkedTest = mount(<InkedTest2 {...props} />);
    const [container] = inkedTest.find(InkContainer);
    expect(container.props.style).toEqual(props.inkContainerStyle);
    expect(container.props.className).toBe(props.inkContainerClassName);
    expect(container.props.inkStyle).toEqual(props.inkStyle);
    expect(container.props.inkClassName).toBe(props.inkClassName);
    expect(container.props.transitionOverlap).toBe(props.inkTransitionOverlap);
    expect(container.props.transitionEnterTimeout).toBe(props.inkTransitionEnterTimeout);
    expect(container.props.transitionLeaveTimeout).toBe(props.inkTransitionLeaveTimeout);
    expect(container.props.waitForInkTransition).toBe(props.waitForInkTransition);
    expect(container.props.disabledInteractions).toEqual(props.disabledInteractions);
  });

  it('should inherit the inkDisabled from context', () => {
    const inkedTest = shallow(<InkedTest />, { context: { inkDisabled: true } });
    expect(inkedTest.props().ink).not.toBeDefined();
  });

  it('should inherit the disabled interactions from context', () => {
    const inkedTest = mount(<InkedTest2 />, { context: { inkDisabledInteractions: ['keyboard'] } });
    const [container] = inkedTest.find(InkContainer);
    expect(container.props.disabledInteractions).toEqual(['keyboard']);
  });

  it('should inherit the inkDisabled and inkDisabledInteractions from context but with a prop definition precidence', () => {
    const context = { inkDisabled: true, inkDisabledInteractions: ['touch'] };
    const inkedTest = mount(<InkedTest2 inkDisabled={false} disabledInteractions={['keyboard']} />, { context });
    const [container] = inkedTest.find(InkContainer);
    expect(container.props.disabledInteractions).toEqual(['keyboard']);
  });
});
