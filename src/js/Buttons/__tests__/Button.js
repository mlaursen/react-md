/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { mount } from 'enzyme';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
} from 'react-dom/test-utils';

import Button from '../Button';
import FontIcon from '../../FontIcons/FontIcon';

function getButton(wrapper) {
  return wrapper.instance().getComposedComponent().getComposedComponent();
}

describe('Button', () => {
  it('merges className and style', () => {
    const props = {
      flat: true,
      children: 'Test',
      style: { background: 'black' },
      className: 'test',
    };

    const button = renderIntoDocument(<Button {...props} />);
    const btn = findDOMNode(button);
    expect(btn.style.background).toBe(props.style.background);
    expect(btn.className).toContain(props.className);
  });

  it('allows for the event listeners to be triggered correctly', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onClick = jest.fn();

    const props = {
      onFocus,
      onBlur,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseLeave,
      onKeyDown,
      onKeyUp,
      onClick,
      flat: true,
      children: 'Hello',
    };
    const button = renderIntoDocument(<Button {...props} />);
    const btn = findDOMNode(button);

    Simulate.focus(btn);
    expect(onFocus).toBeCalled();

    Simulate.blur(btn);
    expect(onBlur).toBeCalled();

    Simulate.touchStart(btn);
    expect(onTouchStart).toBeCalled();

    Simulate.touchMove(btn);
    expect(onTouchMove).toBeCalled();

    Simulate.touchEnd(btn);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(btn);
    expect(onTouchCancel).toBeCalled();

    Simulate.mouseDown(btn);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(btn);
    expect(onMouseUp).toBeCalled();

    Simulate.mouseOver(btn);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(btn);
    expect(onMouseLeave).toBeCalled();

    Simulate.keyDown(btn);
    expect(onKeyDown).toBeCalled();

    Simulate.keyUp(btn);
    expect(onKeyUp).toBeCalled();

    Simulate.click(btn);
    expect(onClick).toBeCalled();
  });

  it('renders a button component if there is no href prop', () => {
    const props = { children: 'test', flat: true };
    const button = renderIntoDocument(<Button {...props} />);
    const btns = scryRenderedDOMComponentsWithTag(button, 'button');
    const links = scryRenderedDOMComponentsWithTag(button, 'a');
    expect(btns.length).toBe(1);
    expect(links.length).toBe(0);
  });

  it('renders a link component if there is a href prop', () => {
    const props = { children: 'test', flat: true, href: '#' };
    const button = renderIntoDocument(<Button {...props} />);
    const btns = scryRenderedDOMComponentsWithTag(button, 'button');
    const links = scryRenderedDOMComponentsWithTag(button, 'a');
    expect(btns.length).toBe(0);
    expect(links.length).toBe(1);
  });

  it('removes the button type if there is a href prop', () => {
    const props = { children: 'test', flat: true, href: '#' };
    const button = renderIntoDocument(<Button {...props} />);
    const link = findRenderedDOMComponentWithTag(button, 'a');
    expect(link.getAttribute('type')).toBe(null);
  });

  it('renders a FontIcon for the icon button', () => {
    const props = { children: 'menu', icon: true };
    const button = renderIntoDocument(<Button {...props} />);
    const icon = findRenderedComponentWithType(button, FontIcon);
    expect(icon.props.children).toBe(props.children);
  });

  describe('theming', () => {
    describe('flat buttons', () => {
      it('should correctly apply the text color themes', () => {
        const flat = mount(<Button flat primary>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(true);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(true);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(true);
      });

      it('should correctly swap the text color themes', () => {
        const flat = mount(<Button flat primary swapTheming>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(true);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(true);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);
      });
    });

    describe('raised buttons', () => {
      it('should correctly apply the text color themes', () => {
        const flat = mount(<Button raised primary>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(true);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(true);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);
      });

      it('should correctly swap the text color themes', () => {
        const flat = mount(<Button raised primary swapTheming>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(true);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(true);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(true);
      });
    });

    describe('icon buttons', () => {
      it('should correctly apply the text color themes', () => {
        const flat = mount(<Button icon primary>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(true);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(true);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(true);
      });

      it('should correctly swap the text color themes', () => {
        const flat = mount(<Button icon primary swapTheming>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(true);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(true);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);
      });
    });

    describe('floating buttons', () => {
      it('should correctly apply the text color themes', () => {
        const flat = mount(<Button floating primary>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(true);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(true);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);
      });

      it('should correctly swap the text color themes', () => {
        const flat = mount(<Button floating primary swapTheming>Hello</Button>);
        expect(flat.hasClass('md-text--theme-primary')).toBe(true);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(false);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: false });
        flat.setProps({ primary: false, secondary: true });
        expect(flat.hasClass('md-text--theme-primary')).toBe(false);
        expect(flat.hasClass('md-background--primary')).toBe(false);
        expect(flat.hasClass('md-text--theme-secondary')).toBe(true);
        expect(flat.hasClass('md-background--secondary')).toBe(false);
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(false);

        getButton(flat).setState({ hover: true });
        expect(flat.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(flat.hasClass('md-btn--color-secondary-active')).toBe(true);
      });
    });
  });
});
