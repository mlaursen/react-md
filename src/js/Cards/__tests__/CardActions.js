/*eslint-env jest*/
jest.unmock('../Card');
jest.unmock('../CardActions');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import Card from '../Card';
import CardActions from '../CardActions';

describe('CardActions', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const actions = renderIntoDocument(
      <Card>
        <CardActions className={className} style={style} />
      </Card>
    );

    const actionsNode = findRenderedDOMComponentWithClass(actions, 'md-card-actions');
    expect(actionsNode.style.display).toBe(style.display);
    expect(actionsNode.classList.contains(className)).toBe(true);
  });

  it('allows for normal event listeners to be passed to the actions component', () => {
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const actions = renderIntoDocument(
      <Card>
        <CardActions
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
        />
      </Card>
    );

    const actionsNode = findRenderedDOMComponentWithClass(actions, 'md-card-actions');
    Simulate.click(actionsNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(actionsNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(actionsNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(actionsNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(actionsNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(actionsNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(actionsNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(actionsNode);
    expect(onTouchCancel).toBeCalled();
  });
});
