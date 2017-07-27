/* eslint-env jest */
/* eslint-disable react/prop-types */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import ToolbarTitle from '../ToolbarTitle';

describe('ToolbarTitle', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      title: 'woop',
    };

    const toolbarTitle = renderIntoDocument(<ToolbarTitle {...props} />);

    const toolbarTitleNode = findDOMNode(toolbarTitle);
    expect(toolbarTitleNode.style.background).toBe(props.style.background);
    expect(toolbarTitleNode.className).toContain(props.className);
  });

  it('clones the className if the title is a valid element itself', () => {
    class Test extends React.Component {
      render() {
        return <div className={`test-thing ${this.props.className}`}>Woooo</div>;
      }
    }

    const props = {
      className: 'something',
      priminent: true,
      offset: true,
      title: <Test className="another-test" />,
    };

    const title = renderIntoDocument(<ToolbarTitle {...props} />);
    const node = findDOMNode(title);
    expect(node.className).toContain(props.className);
    expect(node.className).toContain('another-test');
    expect(node.className).toContain('test-thing');
  });

  it('should apply the provided id', () => {
    const title = shallow(<ToolbarTitle id="some-title" title="Hello" />);
    expect(title.is('#some-title')).toBe(true);
  });

  it('should clone the id into the title if it is a valid element', () => {
    const titleEl = <h3>Hello!</h3>;
    const title = shallow(<ToolbarTitle id="some-title" title={titleEl} />);
    expect(title.matchesElement(<h3 id="some-title">Hello!</h3>)).toBe(true);
  });
});
