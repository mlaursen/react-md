/* eslint-disable react/prop-types */
/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Waypoint from 'react-waypoint';

import { renderRouterSnapshot, mountWithRouter, captureConsole } from 'utils/testing';
import { PureSearch as Search } from '../';

// Don't know how to surround with StaticRouter and then set this component's state
jest.mock('react-router-dom', () => ({ children, className, to }) => <a className={className} href={to}>{children}</a>);

const PROPS = {
  mobile: false,
  searching: true,
  search: () => {},
  searchNext: () => {},
  showSearch: () => {},
  hideSearch: () => {},
};

const RESULTS = [{
  name: 'Autocompletes',
  type: 'Info',
  ref: '/components/autocompletes',
}, {
  name: 'Autocompletes',
  type: 'Prop Types',
  ref: '/components/autocompletes?tab=1',
}];

describe('Search', () => {
  captureConsole();

  it('should render correctly while not searching', () => {
    const tree = renderRouterSnapshot(<Search {...PROPS} searching={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly while searching', () => {
    const tree = renderRouterSnapshot(<Search {...PROPS} searching />);
    expect(tree).toMatchSnapshot();
  });

  it('should call the showSearch prop when the icon is clicked and it is currently not searching', () => {
    const showSearch = jest.fn();
    const props = { ...PROPS, showSearch, searching: false };

    const search = mount(<Search {...props} />);
    let icon = search.find('.md-icon');
    expect(icon.length).toBe(1);
    icon.simulate('click');

    expect(showSearch).toBeCalled();

    showSearch.mockClear();
    search.setProps({ searching: true });
    icon = search.find('.md-icon');
    expect(icon.length).toBe(2);
    icon.first().simulate('click');
    icon.at(1).simulate('click');

    expect(showSearch).not.toBeCalled();
  });

  it('should create an animating timeout when the searching prop changes to false', () => {
    const search = shallow(<Search {...PROPS} searching={false} />);
    expect(search.state('animating')).toBe(false);

    search.setProps({ searching: true });
    expect(setTimeout).not.toBeCalled();

    search.setProps({ searching: false });
    expect(setTimeout).toBeCalled();
    expect(search.state('animating')).toBe(true);
    jest.runOnlyPendingTimers();
    expect(search.state('animating')).toBe(false);
  });

  it('should clear any timeouts if it unmounts', () => {
    const search = shallow(<Search {...PROPS} />);
    expect(setTimeout).not.toBeCalled();
    search.setProps({ searching: false });
    expect(setTimeout).toBeCalled();

    search.unmount();
    jest.runAllTimers();
  });

  it('should set the internal value state when the value changes', () => {
    const search = mount(<Search {...PROPS} />);
    expect(search.state('value')).toBe('');
    const input = search.find('input');
    expect(input.length).toBe(1);

    const value = 'data tab';
    input.simulate('change', { target: { value } });
    expect(search.state('value')).toBe(value);
  });

  it('should clear the internal value state when the searching prop changes', () => {
    const search = mount(<Search {...PROPS} />);
    search.setState({ value: 'buttons' });

    search.setProps({ searching: false });
    expect(search.state('value')).toBe('');
  });

  it('should call the search prop when the value changes in the autocomplete', () => {
    const searchFn = jest.fn();
    const search = mount(<Search {...PROPS} search={searchFn} searching />);
    const input = search.find('input');
    expect(input.length).toBe(1);

    const value = 'data tab';
    input.simulate('change', { target: { value } });
    expect(searchFn).toBeCalledWith(value);
  });

  it('should update the data list when the results prop changes', () => {
    const search = shallow(<Search {...PROPS} />);
    expect(search.state('data')).toEqual([]);

    const instance = search.instance();
    const mapToLink = instance.mapToLink;
    // Mock it just to make sure it is called
    instance.mapToLink = jest.fn(item => mapToLink(item));

    search.setProps({ results: RESULTS });

    expect(instance.mapToLink).toBeCalled();
    expect(instance.mapToLink.mock.calls.length).toBe(RESULTS.length);
  });

  it('should inject the Waypoint component when there are more search results', () => {
    let search = mountWithRouter(<Search {...PROPS} />);
    let input = search.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'aut' } });
    expect(search.find(Waypoint).length).toBe(0);
    const props = {
      ...PROPS,
      results: RESULTS,
      meta: {
        next: '/some-url',
        previous: null,
        start: 0,
        limit: 2,
        total: 300,
      },
    };

    search = mountWithRouter(<Search {...props} />);
    input = search.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'aut' } });
    expect(search.find(Waypoint).length).toBe(1);
  });

  it('should call the hideSearch prop when the hide button is closed', () => {
    const hideSearch = jest.fn();
    const search = mount(<Search {...PROPS} hideSearch={hideSearch} />);
    expect(hideSearch).not.toBeCalled();

    const btn = search.find('#documentation-search-hide');
    expect(btn.length).toBe(1);

    btn.simulate('click');
    expect(hideSearch).toBeCalled();
  });
});
