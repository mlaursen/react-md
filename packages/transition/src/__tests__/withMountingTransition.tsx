import * as React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { default as withMountingTransition, IInjectedMountingTransitionProps } from "../withMountingTransition";

describe("withMountingTransition", () => {
  const wrapper = withMountingTransition("some-class-name");

  it("should render correctly based on the visible prop", () => {
    class Test extends React.Component<IInjectedMountingTransitionProps, {}> {
      render() {
        const { transitioning, ...props } = this.props;
        return <div {...props} />;
      }
    }

    const TestWithAnimation = wrapper(Test);
    expect(renderer.create(<TestWithAnimation visible={false} />)).toMatchSnapshot();
    expect(renderer.create(<TestWithAnimation visible={true} />)).toMatchSnapshot();
  });

  it("should follow the rendering flow when the visible prop is changed from false to true", () => {
    // fake timers so we can step-by-step render snapshots during the transitions
    // also "mock" the requestAnimationFrame so that it uses a timeout since I don't know a way to
    // get jest to update after an animation frame
    jest.useFakeTimers();
    const { requestAnimationFrame } = global;
    global.requestAnimationFrame = cb => setTimeout(cb, 0);

    class Test extends React.Component<IInjectedMountingTransitionProps, {}> {
      render() {
        const { transitioning, ...props } = this.props;
        return <div {...props} />;
      }
    }

    const TestWithAnimation = wrapper(Test);

    // test enter animation
    const test = mount(<TestWithAnimation visible={false} />);
    expect(test.render()).toMatchSnapshot();

    test.setProps({ visible: true });
    expect(test.render()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(test.render()).toMatchSnapshot();

    test.simulate("transitionEnd");
    expect(test.render()).toMatchSnapshot();

    // test leave animation
    test.setProps({ visible: false });
    expect(test.render()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(test.render()).toMatchSnapshot();

    test.simulate("transitionEnd");
    expect(test.render()).toMatchSnapshot();

    global.requestAnimationFrame = requestAnimationFrame;
  });
});
