import * as React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";

import KeyboardClickable from "../KeyboardClickable";

describe("KeyboardClickable", () => {
  it('should apply the aria-disabled="true" attribute instead of disabled when the disabled prop is enabled', () => {
    const Example: React.SFC<any> = ({ disabled }) => (
      <KeyboardClickable disabled={disabled}>
        {clickableProps => <div {...clickableProps}>content</div>}
      </KeyboardClickable>
    );

    expect(renderer.create(<Example disabled={true} />).toJSON()).toMatchSnapshot();

    const example = mount(<Example disabled={true} />);
    const div = example.find("div");
    expect(div.props().disabled).toBeUndefined();
    expect(div.props()["aria-disabled"]).toBe("true");
  });

  it("should correctly update the event listeners and tabIndex to be undefined when disabled", () => {
    const props = {
      tabIndex: 100,
      onKeyUp: jest.fn(),
      onKeyDown: jest.fn(),
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onClick: jest.fn(),
      onMouseUp: jest.fn(),
      onMouseDown: jest.fn(),
      onTouchStart: jest.fn(),
      onTouchEnd: jest.fn(),
    };

    const Example: React.SFC<any> = ({ disabled }) => (
      <KeyboardClickable {...props} disabled={disabled}>
        {clickableProps => <div {...clickableProps}>content</div>}
      </KeyboardClickable>
    );

    const tree1 = renderer.create(<Example disabled={false} />);
    const tree2 = renderer.create(<Example disabled={true} />);
    expect(tree1.toJSON()).toMatchSnapshot();
    expect(tree2.toJSON()).toMatchSnapshot();

    const example = mount(<Example disabled={false} />);

    let div = example.find("div");
    expect(div.props().tabIndex).toBeDefined();
    expect(div.props().onKeyUp).toBeDefined();
    expect(div.props().onKeyDown).toBeDefined();
    expect(div.props().onBlur).toBeDefined();
    expect(div.props().onClick).toBeDefined();
    expect(div.props().onMouseUp).toBeDefined();
    expect(div.props().onMouseDown).toBeDefined();
    expect(div.props().onTouchStart).toBeDefined();
    expect(div.props().onTouchEnd).toBeDefined();

    example.setProps({ disabled: true });
    div = example.find("div");
    expect(div.props().tabIndex).toBeUndefined();
    expect(div.props().onKeyUp).toBeUndefined();
    expect(div.props().onKeyDown).toBeUndefined();
    expect(div.props().onBlur).toBeUndefined();
    expect(div.props().onClick).toBeUndefined();
    expect(div.props().onMouseUp).toBeUndefined();
    expect(div.props().onMouseDown).toBeUndefined();
    expect(div.props().onTouchStart).toBeUndefined();
    expect(div.props().onTouchEnd).toBeUndefined();
  });

  it("should correctly call the onKeyDown prop when space or enter is pressed on the element", () => {
    const onKeyDown = jest.fn();
    const Example: React.SFC<any> = () => (
      <KeyboardClickable onKeyDown={onKeyDown}>
        {clickableProps => <div {...clickableProps}>content</div>}
      </KeyboardClickable>
    );

    const currentTarget = { click: () => undefined };
    const preventDefault = () => undefined;

    const example = shallow(<Example />).dive();
    example.simulate("keyDown", { key: " ", preventDefault, currentTarget });
    expect(onKeyDown).toBeCalled();

    onKeyDown.mockClear();
    example.simulate("keyDown", {
      key: "Enter",
      preventDefault,
      currentTarget,
    });
    expect(onKeyDown).toBeCalled();
  });

  it("should call preventDefault when the space key is pressed to stop page scrolling", () => {
    const Example: React.SFC<any> = () => (
      <KeyboardClickable>
        {clickableProps => <div {...clickableProps}>content</div>}
      </KeyboardClickable>
    );

    const example = shallow(<Example />).dive();
    const currentTarget = { click: () => undefined };
    const preventDefault = jest.fn();

    example.simulate("keyDown", {
      key: "Enter",
      preventDefault,
      currentTarget,
    });
    expect(preventDefault).not.toBeCalled();

    example.simulate("keyDown", { key: " ", preventDefault, currentTarget });
    expect(preventDefault).toBeCalled();
  });

  it("should call the currentTarget's click function when the space or enter key is pressed", () => {
    const Example: React.SFC<any> = () => (
      <KeyboardClickable>
        {clickableProps => <div {...clickableProps}>content</div>}
      </KeyboardClickable>
    );

    const example = shallow(<Example />).dive();
    const click = jest.fn();
    const currentTarget = { click };
    const preventDefault = () => undefined;

    example.simulate("keyDown", {
      key: "Enter",
      preventDefault,
      currentTarget,
    });
    expect(click).toBeCalled();

    click.mockClear();
    example.simulate("keyDown", { key: " ", preventDefault, currentTarget });
    expect(click).toBeCalled();
  });
});
