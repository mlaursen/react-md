/* eslint-env jest*/
jest.unmock('../Avatar');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Avatar from '../Avatar';
import FontIcon from '../../FontIcons/FontIcon';

describe('Avatar', () => {
  it('merges additional class names with md-avatar', () => {
    const avatar = TestUtils.renderIntoDocument(
      <Avatar className="something-else">M</Avatar>
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    expect(avatarNode.classList.contains('md-avatar')).toBe(true);
    expect(avatarNode.classList.contains('something-else')).toBe(true);
  });

  it('renders an letter or an icon in the avatar content', () => {
    const iconAvatar = TestUtils.renderIntoDocument(
      <Avatar icon={<FontIcon>wat</FontIcon>} />
    );
    const letterAvatar = TestUtils.renderIntoDocument(
      <Avatar>M</Avatar>
    );

    const iconAvatarNode = ReactDOM.findDOMNode(iconAvatar).querySelector('.md-avatar-content');
    const letterAvatarNode = ReactDOM.findDOMNode(letterAvatar).querySelector('.md-avatar-content');

    expect(iconAvatarNode).toBeDefined();
    expect(iconAvatarNode.querySelector('.md-icon')).toBeDefined();
    expect(letterAvatarNode).toBeDefined();
    expect(letterAvatarNode.textContent).toBe('M');
  });

  it('renders an image tag if the src attribute is given', () => {
    const avatar = TestUtils.renderIntoDocument(
      <Avatar src="../image.jpg" alt="Nothing" />
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);
    const img = avatarNode.querySelector('img');

    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('../image.jpg');
    expect(img.getAttribute('alt')).toBe('Nothing');
    expect(img.classList.contains('md-avatar-img')).toBe(true);
  });

  it('can apply a specific color suffix', () => {
    const avatar = TestUtils.renderIntoDocument(
      <Avatar suffix="color-1">M</Avatar>
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    expect(avatarNode.classList.contains('md-avatar--color-1')).toBe(true);
  });

  it('can apply a random color with the random prop', () => {
    const avatar = TestUtils.renderIntoDocument(
      <Avatar random>M</Avatar>
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    expect(avatarNode.className.indexOf('--')).not.toBe(-1);
  });

  it('can apply a random color with custom suffixes', () => {
    const avatar = TestUtils.renderIntoDocument(
      <Avatar random suffixes={['wat-wat', 'oh-no']}>M</Avatar>
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    expect(avatarNode.className).toMatch(/md-avatar--(wat-wat|oh-no)/);
  });

  it('will apply the style prop to the md-avatar div', () => {
    const style = {
      // #fff
      color: 'rgb(255, 255, 255)',
      display: 'block',
    };

    const avatar = TestUtils.renderIntoDocument(
      <Avatar style={style}>M</Avatar>
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    expect(avatarNode.style.color).toBe(style.color);
    expect(avatarNode.style.display).toBe(style.display);
  });

  it('will apply event listeners to the md-avatar', () => {
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();

    const avatar = TestUtils.renderIntoDocument(
      <Avatar onClick={onClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} />
    );

    const avatarNode = ReactDOM.findDOMNode(avatar);

    TestUtils.Simulate.click(avatarNode);
    expect(onClick).toBeCalled();

    TestUtils.Simulate.mouseOver(avatarNode);
    TestUtils.Simulate.mouseLeave(avatarNode);
    expect(onMouseOver).toBeCalled();
    expect(onMouseLeave).toBeCalled();
  });
});
