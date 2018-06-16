/* eslint-env jest*/
import React from 'react';
import Avatar from '../Avatar';
import { shallow } from 'enzyme';

import FontIcon from '../../FontIcons/FontIcon';
import SVGIcon from '../../SVGIcons/SVGIcon';

describe('Avatar', () => {
  it('should correctly apply style and className', () => {
    global.expectSnapshot(<Avatar style={{ width: 100 }} className="test-avatar" label="Woop" />);
  });

  it('should be able to render an icon or a letter', () => {
    global.expectSnapshot(<Avatar icon={<FontIcon>home</FontIcon>} />);
    global.expectSnapshot(<Avatar icon={<SVGIcon use="#some-tag" />} />);
    global.expectSnapshot(<Avatar icon={<SVGIcon><path d="jfkdsfsd" /></SVGIcon>} />);
    global.expectSnapshot(<Avatar>K</Avatar>);
  });

  it('should render as an image when the src prop is provided', () => {
    global.expectSnapshot(<Avatar src="/something.png" alt="some alt" />);
    global.expectSnapshot(<Avatar src="/something.png" role="presentation" />);
  });

  it('should be able to apply a suffix or be icon sized', () => {
    global.expectSnapshot(<Avatar suffix="blue">D</Avatar>);
    global.expectSnapshot(<Avatar iconSized>D</Avatar>);
  });

  it('should be able to get a random color', () => {
    const avatar = shallow(<Avatar random>D</Avatar>);
    expect(Avatar.defaultProps.suffixes).toContain(avatar.state('color'));
  });
});
