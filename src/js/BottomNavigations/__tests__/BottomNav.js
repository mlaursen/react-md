/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import BottomNav from '../BottomNav';
import FontIcon from '../../FontIcons/FontIcon';
import SVGIcon from '../../SVGIcons/SVGIcon';

describe('BottomNav', () => {
  it('should apply the correct styling based on props', () => {
    const nav = mount(<BottomNav label="Label" index={0} />);
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ active: true });
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ colored: true });
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ active: false });
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ colored: false, fixed: true });
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ active: true });
    expect(nav.render()).toMatchSnapshot();
  });

  it('should be able to render elements as the label prop', () => {
    const nav = mount(<BottomNav label={<span>Label</span>} index={0} active />);
    expect(nav.render()).toMatchSnapshot();

    nav.setProps({ label: [<span key={0}>Hello</span>, 'World'] });
    expect(nav.render()).toMatchSnapshot();
  });

  it('should be able to render an SVGIcon or a FontIcon', () => {
    const props = { label: 'Woop', index: 0, active: true };
    global.expectRenderSnapshot(<BottomNav {...props} icon={<FontIcon>woop</FontIcon>} />);
    global.expectRenderSnapshot(<BottomNav {...props} icon={<SVGIcon><path d="fjdkslfs" /></SVGIcon>} />);
    global.expectRenderSnapshot(<BottomNav {...props} icon={<SVGIcon use="#some-url" />} />);
  });
});
