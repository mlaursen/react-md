/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Button from '../Button';
import FontIcon from '../../FontIcons/FontIcon';
import SVGIcon from '../../SVGIcons/SVGIcon';

describe('Button', () => {
  it('should apply styles correctly', () => {
    const button = shallow(<Button flat className="custom-btn" style={{ fontSize: 200 }}>Hello</Button>);
    expect(button.render()).toMatchSnapshot();

    button.setProps({ primary: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ primary: false, secondary: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ flat: false, raised: true, secondary: false });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ primary: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ primary: false, secondary: true });
    expect(button.render()).toMatchSnapshot();
  });

  it('should render as either a <button> or an <a> based on the href prop', () => {
    global.expectRenderSnapshot(<Button flat>Woop</Button>);
    global.expectRenderSnapshot(<Button flat href="#woop">Woop</Button>);
  });

  it('should correctly call the overidden event listeners', () => {
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const button = shallow(
      <Button
        flat
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Button
      </Button>
    );

    button.simulate('touchStart');
    expect(onTouchStart).toBeCalled();

    button.simulate('touchEnd');
    expect(onTouchEnd).toBeCalled();

    button.simulate('mouseDown');
    expect(onMouseDown).toBeCalled();

    button.simulate('mouseUp');
    expect(onMouseUp).toBeCalled();

    button.simulate('keyDown');
    expect(onKeyDown).toBeCalled();

    button.simulate('keyUp');
    expect(onKeyUp).toBeCalled();

    button.simulate('mouseEnter');
    expect(onMouseEnter).toBeCalled();

    button.simulate('mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should be able to render FontIcons or SVGIcons using the iconEl prop', () => {
    const fi = <FontIcon>close</FontIcon>;
    const svg1 = <SVGIcon><path d="2i90rdsjf" /></SVGIcon>;
    const svg2 = <SVGIcon use="#some-href" />;

    // Buttons with text
    global.expectRenderSnapshot(<Button flat iconEl={fi}>Close</Button>);
    global.expectRenderSnapshot(<Button flat iconEl={svg1}>Close</Button>);
    global.expectRenderSnapshot(<Button flat iconEl={svg2}>Close</Button>);
    global.expectRenderSnapshot(<Button raised iconEl={fi}>Close</Button>);
    global.expectRenderSnapshot(<Button raised iconEl={svg1}>Close</Button>);
    global.expectRenderSnapshot(<Button raised iconEl={svg2}>Close</Button>);

    // Icon Button types
    global.expectRenderSnapshot(<Button icon iconEl={fi} />);
    global.expectRenderSnapshot(<Button icon iconEl={svg1} />);
    global.expectRenderSnapshot(<Button icon iconEl={svg2} />);
    global.expectRenderSnapshot(<Button floating iconEl={fi} />);
    global.expectRenderSnapshot(<Button floating iconEl={svg1} />);
    global.expectRenderSnapshot(<Button floating iconEl={svg2} />);
  });

  it('should be able to render FontIcons or SVGIcons as children when using the icon or floating types', () => {
    const fi = <FontIcon>close</FontIcon>;
    const svg1 = <SVGIcon><path d="2i90rdsjf" /></SVGIcon>;
    const svg2 = <SVGIcon use="#some-href" />;

    global.expectRenderSnapshot(<Button icon svg>{fi}</Button>);
    global.expectRenderSnapshot(<Button icon svg>{svg1}</Button>);
    global.expectRenderSnapshot(<Button icon svg>{svg2}</Button>);
    global.expectRenderSnapshot(<Button floating svg>{fi}</Button>);
    global.expectRenderSnapshot(<Button floating svg>{svg1}</Button>);
    global.expectRenderSnapshot(<Button floating svg>{svg2}</Button>);
  });

  describe('theming', () => {
    describe('flat buttons', () => {
      it('should correctly apply the text color themes', () => {
        const flat = mount(<Button flat primary>Hello</Button>);
        let btn = flat.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(true);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = flat.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        flat.setProps({ primary: false, secondary: true });
        btn = flat.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(true);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = flat.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(true);
      });

      it('should correctly swap the text color themes', () => {
        const flat = mount(<Button flat primary swapTheming>Hello</Button>);
        let btn = flat.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(true);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = flat.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        flat.setProps({ primary: false, secondary: true });
        btn = flat.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(true);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = flat.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);
      });
    });

    describe('raised buttons', () => {
      it('should correctly apply the text color themes', () => {
        const raised = mount(<Button raised primary>Hello</Button>);
        let btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(true);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        raised.setProps({ primary: false, secondary: true });
        btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(true);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);
      });

      it('should correctly swap the text color themes', () => {
        const raised = mount(<Button raised primary swapTheming>Hello</Button>);
        let btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(true);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        raised.setProps({ primary: false, secondary: true });
        btn = raised.find('button');
        raised.setProps({ primary: false, secondary: true });
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(true);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(true);
      });
    });

    describe('icon buttons', () => {
      it('should correctly apply the text color themes', () => {
        const icon = mount(<Button icon primary>Hello</Button>);
        let btn = icon.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(true);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = icon.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        icon.setProps({ primary: false, secondary: true });
        btn = icon.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(true);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = icon.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(true);
      });

      it('should correctly swap the text color themes', () => {
        const icon = mount(<Button icon primary swapTheming>Hello</Button>);
        let btn = icon.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(true);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = icon.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        icon.setProps({ primary: false, secondary: true });
        btn = icon.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(true);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = icon.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);
      });
    });

    describe('floating buttons', () => {
      it('should correctly apply the text color themes', () => {
        const raised = mount(<Button floating primary>Hello</Button>);
        let btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(true);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        raised.setProps({ primary: false, secondary: true });
        btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(true);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);
      });

      it('should correctly swap the text color themes', () => {
        const raised = mount(<Button floating primary swapTheming>Hello</Button>);
        let btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(true);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(false);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(true);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseLeave');
        raised.setProps({ primary: false, secondary: true });
        btn = raised.find('button');
        expect(btn.hasClass('md-text--theme-primary')).toBe(false);
        expect(btn.hasClass('md-background--primary')).toBe(false);
        expect(btn.hasClass('md-text--theme-secondary')).toBe(true);
        expect(btn.hasClass('md-background--secondary')).toBe(false);
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(false);

        btn.simulate('mouseEnter');
        btn = raised.find('button');
        expect(btn.hasClass('md-btn--color-primary-active')).toBe(false);
        expect(btn.hasClass('md-btn--color-secondary-active')).toBe(true);
      });
    });
  });
});
