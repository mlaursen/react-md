/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Chip from '../Chip';
import Avatar from '../../Avatars/Avatar';
import FontIcon from '../../FontIcons/FontIcon';
import SVGIcon from '../../SVGIcons/SVGIcon';

describe('Chip', () => {
  it('should apply the correct styles', () => {
    const chip = shallow(<Chip label="Chip" style={{ width: 200 }} className="custom-chip" />);
    expect(chip.render()).toMatchSnapshot();
  });

  it('should render correctly based on the props', () => {
    const chip = shallow(<Chip label="Chip" />);
    expect(chip.render()).toMatchSnapshot();

    chip.setProps({ removable: true });
    expect(chip.render()).toMatchSnapshot();

    chip.setProps({ avatar: <Avatar>D</Avatar> });
    expect(chip.render()).toMatchSnapshot();

    chip.setProps({ children: <FontIcon>close</FontIcon> });
    expect(chip.render()).toMatchSnapshot();

    chip.setProps({ children: <SVGIcon><path d="i932jfds" /></SVGIcon> });
    expect(chip.render()).toMatchSnapshot();
  });

  it('should update the class name based on hoer state', () => {
    const chip = shallow(<Chip label="Chip" />);
    expect(chip.state('hover')).toBe(false);

    chip.simulate('mouseEnter');
    expect(chip.state('hover')).toBe(true);
    expect(chip.render()).toMatchSnapshot();

    chip.simulate('mouseLeave');
    expect(chip.state('hover')).toBe(false);
    expect(chip.render()).toMatchSnapshot();
  });

  it('should still call the onMouseEnter and onMouseLeave props', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const chip = shallow(<Chip label="Chip" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
    chip.simulate('mouseEnter');
    expect(onMouseEnter).toBeCalled();

    chip.simulate('mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });
});
