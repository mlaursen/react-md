/* eslint-env jest*/
import React from 'react';
import { shallow } from 'enzyme';

import Avatar from '../../Avatars';
import Paper from '../../Papers';
import TooltipContainer from '../TooltipContainer';

import Tooltipped from '../Tooltipped';


describe('Tooltipped', () => {
  it('renders the given element without modification', () => {
    function check(element, name) {
      const wrapper = shallow(<Tooltipped>{element}</Tooltipped>);

      expect(wrapper.name()).toBe(name);
      expect(wrapper.equals(element)).toBe(true);
    }

    check(<div>Test element</div>, 'div');
    check(<Paper component="h3" zDepth={3} />, 'Paper');
  });

  it('renders the given element and adds TooltipContainer as a child', () => {
    function check(element, props) {
      let wrapper = shallow(<Tooltipped {...props}>{element}</Tooltipped>);

      expect(wrapper.type()).toBe(element.type);

      wrapper = wrapper.children();
      expect(wrapper.length).toBeGreaterThan(0);

      wrapper = wrapper.find(TooltipContainer);
      expect(wrapper.length).toBe(1);
      expect(wrapper.first().props()).toEqual({ ...TooltipContainer.defaultProps, ...props });
    }

    check(
      <article />,
      {
        label: 'Empty element',
        className: 'tool',
        style: { zIndex: 3 },
      }
    );
    check(
      <div>Test tooltip</div>,
      {
        label: 'Test text',
        position: 'top',
      }
    );
    check(
      (
        <span>
          Some text
          <div>Another line of text</div>
          <Avatar random>T</Avatar>
        </span>
      ),
      {
        label: 'Tooltip for compound element',
        delay: 500,
        position: 'left',
      }
    );
    check(
      (
        <Paper zDepth={2}>
          <Avatar random>P</Avatar>
        </Paper>
      ),
      {
        label: 'Tooltip for paper',
      }
    );
  });

  it('should add "position: relative" to style of the wrapped component when "setPosition" property is true', () => {
    function check(element, props) {
      const wrapper = shallow(element);
      const style = shallow(<Tooltipped label="Some label" {...props} setPosition>{element}</Tooltipped>).props().style;

      expect(style).toEqual({ ...wrapper.props().style, ...{ position: 'relative' } });
    }

    check(
      <span style={{ position: 'absolute', top: '10px', left: '70%' }}>Test setPosition</span>,
      {
        className: 'tool',
        style: { zIndex: 3 },
      }
    );
    check(
      <div style={{ position: 'relative', background: '#ccc' }}>Test setPosition</div>,
      {
        className: 'tool',
        style: { zIndex: 3 },
      }
    );
    check(
      (
        <div style={{ position: 'fixed', margin: 0 }}>
          <span style={{ position: 'absolute', border: '1px solid #abc' }}>111</span>
          <span>222</span>
        </div>
      ),
      {
        label: 'Test #2',
        enterTimeout: 300,
        style: { position: 'fixed' },
      }
    );
  });

  it('should not change position style of the wrapped component when "setPosition" property is false', () => {
    function check(element, props) {
      const wrapper = shallow(element);
      const style = shallow(<Tooltipped label="Some label" {...props}>{element}</Tooltipped>).props().style;

      expect(style.position).toBe(wrapper.props().style.position);
    }

    check(
      <span style={{ position: 'absolute', top: '10px', left: '70%' }}>Test without setPosition</span>,
      {
        style: { position: 'fixed' },
      }
    );
    check(
      (
        <Paper component="article" zDepth={1} style={{ position: 'fixed', color: '#00c' }}>
          <div>111</div>
          <div>222</div>
          <div>333</div>
        </Paper>
      ),
      {
        label: 'Click me',
        delay: 100,
        className: 'content',
        setPosition: false,
      }
    );
  });

  it('throws an error when several children are wrapped', () => {
    function check(element, props) {
      expect(() => {
        shallow(<Tooltipped label="Some label" {...props}>{element}</Tooltipped>);
      }).toThrow();
    }

    /* eslint-disable no-console */
    const consoleError = console.error;
    console.error = () => {};

    check([
      <div key="item1">Item 1</div>,
      <div key="item2">Item 2</div>,
      <div key="item3">Item 3</div>,
    ]);

    console.error = consoleError;
    /* eslint-enable no-console */
  });
});
