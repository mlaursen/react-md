/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import DropdownMenu from '../DropdownMenu';
import Menu from '../Menu';

describe('MenuButton', () => {
  it('should render the Menu component and the child element', () => {
    const child = <button type="button">example</button>;
    const dropdown = mount(<DropdownMenu id="test" menuItems={[]}>{child}</DropdownMenu>);
    expect(dropdown.find(Menu).length).toBe(1);
    expect(dropdown.containsMatchingElement(child)).toBe(true);
  });

  it('should toggle the menu open when the child is clicked', () => {
    const child = <button type="button">example</button>;
    const dropdown = mount(<DropdownMenu id="test" menuItems={[]}>{child}</DropdownMenu>);
    expect(dropdown.state('visible')).toBe(false);
    dropdown.find('button').simulate('click');
    expect(dropdown.state('visible')).toBe(true);
  });

  it('should call the onVisibilityChange prop when the child menu\'s visibility is changed', () => {
    const onVisibilityChange = jest.fn();
    const child = <button type="button">example</button>;
    const dropdown = mount(
      <DropdownMenu id="test" menuItems={[]} onVisibilityChange={onVisibilityChange}>
        {child}
      </DropdownMenu>
    );
    dropdown.find('button').simulate('click');
    expect(onVisibilityChange.mock.calls.length).toBe(1);
    expect(onVisibilityChange.mock.calls[0][0]).toBe(true);

    dropdown.find('button').simulate('click');
    expect(onVisibilityChange.mock.calls.length).toBe(2);
    expect(onVisibilityChange.mock.calls[1][0]).toBe(false);
  });

  it('should call the child\'s on click function still if it exists', () => {
    const onClick = jest.fn();
    const child = <button type="button" onClick={onClick}>example</button>;
    const dropdown = mount(<DropdownMenu id="test" menuItems={[]}>{child}</DropdownMenu>);
    dropdown.find('button').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('should update the child\'s id to be `id-toggle` if the child does not contain an id', () => {
    const child1 = <button type="button">example 1</button>;
    const child2 = <button type="button" id="example-2">example 2</button>;
    const dropdown = mount(<DropdownMenu id="test" menuItems={[]}>{child1}</DropdownMenu>);
    expect(dropdown.find('#test-toggle').length).toBe(1);

    dropdown.setProps({ children: child2 });
    expect(dropdown.find('#test-toggle').length).toBe(0);
    expect(dropdown.find('#example-2').length).toBe(1);
  });
});
