/*eslint-env jest*/
jest.unmock('../Overlay');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Overlay from '../Overlay';

describe('Overlay', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const overlayStyle = { background: 'black' };
    const overlayClassName = 'what-what';
    const overlay = renderIntoDocument(
      <Overlay
        isOpen={true}
        style={style}
        className={className}
        overlayStyle={overlayStyle}
        overlayClassName={overlayClassName}
      />
    );

    const overlayContainerNode = findDOMNode(overlay);
    expect(overlayContainerNode.style.display).toBe(style.display);
    expect(overlayContainerNode.classList.contains(className)).toBe(true);

    const overlayNode = findRenderedDOMComponentWithClass(overlay, 'md-overlay');
    expect(overlayNode.style.background).toBe(overlayStyle.background);
    expect(overlayNode.classList.contains(overlayClassName)).toBe(true);
  });

  it('toggles the overlay when the isOpen prop is changed', () => {
    let overlay = renderIntoDocument(<Overlay isOpen={false} />);

    let overlayNodes = scryRenderedDOMComponentsWithClass(overlay, 'md-overlay');
    expect(overlayNodes.length).toBe(0);

    overlay = renderIntoDocument(<Overlay isOpen={true} />);
    overlayNodes = scryRenderedDOMComponentsWithClass(overlay, 'md-overlay');

    expect(overlayNodes.length).toBe(1);
  });

  it('passes event listeners to the overlay instead of the CSSTransitionGroup', () => {
    const onClick = jest.genMockFunction();
    const overlay = renderIntoDocument(
      <Overlay isOpen={true} onClick={onClick} />
    );

    const overlayNode = findRenderedDOMComponentWithClass(overlay, 'md-overlay');
    Simulate.click(overlayNode);

    expect(onClick.mock.calls.length).toBe(1);
  });
});
