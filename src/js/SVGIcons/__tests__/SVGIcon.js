/* eslint-env jest */
import React from 'react';
import SVGIcon from '../SVGIcon';
import { shallow } from 'enzyme';

describe('SVGIcon', () => {
  it('should render correctly based on props', () => {
    const icon = shallow(<SVGIcon />);
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ children: <path d="9fdsf jjjfasodjfads" /> });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ disabled: true });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ primary: true });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ disabled: false });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ primary: false, secondary: true });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ secondary: false, inherit: true });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ inherit: false, error: true });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ error: false, children: null, use: '#some-hash-tag' });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps(({ size: 100 }));
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ style: { width: 30, background: 'red' } });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ style: { background: 'red' } });
    expect(icon.render()).toMatchSnapshot();
  });

  it('should correctly apply style since it is cached', () => {
    const icon = shallow(<SVGIcon style={{ background: 'red' }} use="#some-img" />);
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ style: { background: 'orange' } });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ size: 32 });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ style: { background: 'red', width: 20 } });
    expect(icon.render()).toMatchSnapshot();
  });
});
