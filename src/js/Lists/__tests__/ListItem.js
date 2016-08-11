/*eslint-env jest*/
jest.unmock('../List');
jest.unmock('../ListItem');
jest.unmock('../ListTile');
jest.unmock('../ListItemText');
jest.unmock('../../Buttons');
jest.unmock('../../Buttons/IconButton');
jest.unmock('../../Buttons/AccessibleFakeButton');
jest.unmock('../../constants/keyCodes');
jest.unmock('../../Transitions');
jest.unmock('../../Transitions/Height');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  Simulate,
} from 'react-addons-test-utils';

import ListItem from '../ListItem';
import ListTile from '../ListTile';
import ListItemText from '../ListItemText';
import { Height } from '../../Transitions';
import { IconButton } from '../../Buttons';
import { LEFT_MOUSE } from '../../constants/keyCodes';

describe('ListItem', () => {
  it('applies className and style to the md-list-item and tileClassName and tileStyle to the md-list-tile', () => {
    const style = { display: 'block' };
    const tileStyle = { display: 'inline-block' };
    const li = renderIntoDocument(
      <ListItem
        style={style}
        className="test"
        tileStyle={tileStyle}
        tileClassName="tile-test"
        primaryText="Test"
      />
    );

    const item = findDOMNode(li);
    const tile = findDOMNode(findRenderedComponentWithType(li, ListTile));

    expect(item.style.display).toBe(style.display);
    expect(item.classList.contains('test')).toBe(true);
    expect(item.classList.contains('tile-test')).toBe(false);

    expect(tile.style.display).toBe(tileStyle.display);
    expect(tile.classList.contains('test')).toBe(false);
    expect(tile.classList.contains('tile-test')).toBe(true);
  });

  it('renders as an li component', () => {
    const li = renderIntoDocument(<ListItem primaryText="Test" />);
    const liNode = findDOMNode(li);

    expect(liNode.nodeName).toBe('LI');
  });

  it('renders an optional component inside of the li component', () => {
    const divItem = renderIntoDocument(<ListItem primaryText="Text" />);
    const aItem = renderIntoDocument(<ListItem primaryText="Text" component="a" />);
    const divItemNode = findDOMNode(divItem);
    const aItemNode = findDOMNode(aItem);

    expect(divItemNode.childNodes[0].nodeName).toBe('DIV');
    expect(aItemNode.childNodes[0].nodeName).toBe('A');
  });

  it('renders an optional React component inside the li component and passes remaining props to the component', () => {
    class Custom extends React.Component {
      render() {
        const { customProp, what, ...props } = this.props; // eslint-disable-line no-unused-vars,react/prop-types
        return <section {...props} />;
      }
    }

    const customItem = renderIntoDocument(<ListItem primaryText="Test" component={Custom} customProp="Hello, World!" what={() => {}} />);

    const customItems = scryRenderedComponentsWithType(customItem, Custom);
    expect(customItems.length).toBe(1);
    const [customItemNode] = customItems;
    expect(customItemNode.props.customProp).toBe('Hello, World!');
    expect(typeof customItemNode.props.what).toBe('function');
  });

  it('passes all remaining props to .md-list-tile', () => {
    const onClick = jest.genMockFunction();
    const onFocus = jest.genMockFunction();
    const onBlur = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      />
    );

    const tileNode = findDOMNode(li).querySelector('.md-list-tile');

    Simulate.click(tileNode);
    expect(onClick).toBeCalled();

    Simulate.focus(tileNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(tileNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(tileNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(tileNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(tileNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(tileNode);
    expect(onMouseUp).toBeCalled();

    const touchEvent = { changedTouches: [{}] };
    Simulate.touchStart(tileNode, touchEvent);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(tileNode, touchEvent);
    expect(onTouchEnd).toBeCalled();
  });

  it('updates the list tile\'s className to adjust for an avatar\'s height', () => {
    const li = renderIntoDocument(<ListItem primaryText="Test" />);
    const leftAvatar = renderIntoDocument(<ListItem primaryText="Test" leftAvatar={<div />} />);
    const rightAvatar = renderIntoDocument(<ListItem primaryText="Test" rightAvatar={<div />} />);
    const secondaryTextAvatar = renderIntoDocument(<ListItem primaryText="Test" secondaryText="Test" leftAvatar={<div />} />);

    const find = tree => findDOMNode(findRenderedComponentWithType(tree, ListTile));
    let tile = find(li);
    expect(tile.classList.contains('avatar-height')).toBe(false);

    tile = find(leftAvatar);
    expect(tile.classList.contains('avatar-height')).toBe(true);

    tile = find(rightAvatar);
    expect(tile.classList.contains('avatar-height')).toBe(true);

    tile = find(secondaryTextAvatar);
    expect(tile.classList.contains('avatar-height')).toBe(false);
    expect(tile.classList.contains('two-lines')).toBe(true);
  });

  it('updates the list tile\'s className to adjust for two or three lines of secondary text', () => {
    const singleLine = renderIntoDocument(<ListItem primaryText="Test" />);
    const twoLines = renderIntoDocument(<ListItem primaryText="test" secondaryText="test" />);
    const threeLines = renderIntoDocument(<ListItem primaryText="test" secondaryText="test" threeLines={true} />);

    const find = tree => findDOMNode(findRenderedComponentWithType(tree, ListTile));
    let tile = find(singleLine);
    expect(tile.classList.contains('two-lines')).toBe(false);
    expect(tile.classList.contains('three-lines')).toBe(false);

    tile = find(twoLines);
    expect(tile.classList.contains('two-lines')).toBe(true);
    expect(tile.classList.contains('three-lines')).toBe(false);

    tile = find(threeLines);
    expect(tile.classList.contains('two-lines')).toBe(false);
    expect(tile.classList.contains('three-lines')).toBe(true);
  });

  it('updates the list tile\'s text className for offsetting for avatars or icons', () => {
    const leftAvatar = renderIntoDocument(<ListItem primaryText="Test" leftAvatar={<div />} />);
    const leftIcon = renderIntoDocument(<ListItem primaryText="Test" leftIcon={<div />} />);
    const rightAvatar = renderIntoDocument(<ListItem primaryText="Test" rightAvatar={<div />} />);
    const rightIcon = renderIntoDocument(<ListItem primaryText="Test" rightIcon={<div />} />);

    const find = tree => findDOMNode(findRenderedComponentWithType(tree, ListItemText));

    let text = find(leftAvatar);
    expect(text.classList.contains('icon-offset')).toBe(false);
    expect(text.classList.contains('avatar-offset')).toBe(true);

    text = find(leftIcon);
    expect(text.classList.contains('icon-offset')).toBe(true);
    expect(text.classList.contains('avatar-offset')).toBe(false);

    text = find(rightAvatar);
    expect(text.classList.contains('icon-offset')).toBe(false);
    expect(text.classList.contains('avatar-offset')).toBe(false);

    text = find(rightIcon);
    expect(text.classList.contains('icon-offset')).toBe(false);
    expect(text.classList.contains('avatar-offset')).toBe(false);
  });

  it('injects a customizable expander icon button if there are nested items', () => {
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        nestedItems={[
          <ListItem key={0} primaryText="Test" />,
        ]}
      />
    );

    let btn = findRenderedComponentWithType(li, IconButton);
    expect(btn.props.children).toBe(ListItem.defaultProps.expanderIconChildren);
    expect(btn.props.iconClassName).toBe(ListItem.defaultProps.expanderIconClassName);

    const custom = renderIntoDocument(
      <ListItem
        primaryText="Test"
        expanderIconChildren={null}
        expanderIconClassName="fa fa-arrow-down"
        nestedItems={[
          <ListItem key={0} primaryText="Test" />,
        ]}
      />
    );

    btn = findRenderedComponentWithType(custom, IconButton);
    expect(btn.props.children).toBe(null);
    expect(btn.props.iconClassName).toBe('fa fa-arrow-down');
  });

  it('toggles the nested item list on click', () => {
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );

    let liNodes = findDOMNode(li).childNodes;
    expect(liNodes.length).toBe(1);

    const tile = findDOMNode(findRenderedComponentWithType(li, ListTile));
    Simulate.click(tile, { button: LEFT_MOUSE });

    const nestedList = findDOMNode(findRenderedComponentWithType(li, Height));
    expect(nestedList).not.toBe(null);
  });

  it('allows for nested items to be initially open', () => {
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        initiallyOpen={true}
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );

    const nestedList = findDOMNode(findRenderedComponentWithType(li, Height));
    expect(nestedList).not.toBe(null);
  });

  it('allows for the nested items to be controlled', () => {
    let state = { isOpen: false };
    const updateState = () => {
      state = Object.assign({}, state, { isOpen: !state.isOpen });
    };

    let controlledItem = renderIntoDocument(
      <ListItem
        isOpen={state.isOpen}
        onClick={updateState}
        primaryText="Test"
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );

    const controlledItemNode = findDOMNode(controlledItem);
    expect(controlledItemNode.childNodes.length).toBe(1);

    const tile = findDOMNode(findRenderedComponentWithType(controlledItem, ListTile));
    Simulate.click(tile, { button: LEFT_MOUSE });

    controlledItem = renderIntoDocument(
      <ListItem
        isOpen={state.isOpen}
        onClick={updateState}
        primaryText="Test"
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );
    expect(findDOMNode(controlledItem).childNodes.length).toBe(2);
  });

  it('will prevent clicking the list item to toggle the nested items if the prop expandOnClick is false', () => {
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        expandOnClick={false}
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );

    const tile = findDOMNode(findRenderedComponentWithType(li, ListTile));
    const btn = findDOMNode(findRenderedComponentWithType(li, IconButton));

    Simulate.click(tile, { button: LEFT_MOUSE });
    expect(findDOMNode(li).childNodes.length).toBe(1);

    Simulate.click(btn, { button: LEFT_MOUSE });
    expect(findDOMNode(li).childNodes.length).toBe(2);
  });

  it('allows for an optional onExpanderClick function', () => {
    const onExpanderClick = jest.genMockFunction();
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        onExpanderClick={onExpanderClick}
        nestedItems={[<ListItem key={0} primaryText="Test" />]}
      />
    );

    const btn = findDOMNode(findRenderedComponentWithType(li, IconButton));
    Simulate.click(btn, { button: LEFT_MOUSE });

    expect(onExpanderClick).toBeCalled();
  });

  it('allows the list item to be disabled', () => {
    const onClick = jest.genMockFunction();
    const li = renderIntoDocument(
      <ListItem
        primaryText="Test"
        disabled={true}
        onClick={onClick}
      />
    );

    const tile = findDOMNode(findRenderedComponentWithType(li, ListTile));

    Simulate.click(tile, { button: LEFT_MOUSE });
    expect(onClick).not.toBeCalled();
  });
});
