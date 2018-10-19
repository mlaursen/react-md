/* tslint:disable:max-line-length */
import * as React from "react";
import { mount } from "enzyme";

import RelativeTooltip from "../RelativeTooltip";

describe("RelativeTooltip", () => {
  const id = "tooltip-id";
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    addEventListener.mockClear();
    removeEventListener.mockClear();
    jest.spyOn(document, "querySelector").mockImplementation(query => {
      if (query === `[aria-describedby="${id}"]`) {
        return { addEventListener, removeEventListener };
      }

      return null;
    });
  });

  it("should attach/remove the mouseenter, mouseleave, keydown, keyup, and blur events to the container element on mount/unmount", () => {
    const tooltip = mount(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);

    expect(addEventListener.mock.calls.length).toBe(5);

    tooltip.unmount();
    expect(removeEventListener.mock.calls.length).toBe(5);
  });

  it("should throw an error if there are no element found with the aria-describedby query selector", () => {
    jest.spyOn(console, "error").mockImplementation(() => false);
    let caughtInfo: React.ErrorInfo;
    let caughtError: Error;

    class ErrorCatch extends React.Component {
      public state = { error: false };
      public componentDidCatch(error: Error, info: React.ErrorInfo) {
        caughtInfo = info;
        caughtError = error;
        this.setState({ error: true });
      }

      public render() {
        if (this.state.error) {
          return null;
        }

        return <RelativeTooltip id="fake-id">Tooltip</RelativeTooltip>;
      }
    }

    mount(<ErrorCatch />);
    expect(caughtError).toEqual(
      new Error(
        'A tooltip\'s container must have the attribute `aria-describedby="TOOLTIP_ID"` for accessibility ' +
          "but none were found for a tooltip with id: `fake-id`"
      )
    );
    expect(caughtInfo).toBeDefined();
  });

  describe("entering", () => {
    it("should do the enter animation correctly from the component show function", () => {
      jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({ position: "relative" }));
      jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation(cb => window.setTimeout(cb, 0));

      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      expect(tooltip.state("visible")).toBe(false);
      expect(tooltip.state("animatingIn")).toBe(false);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);

      tooltip.instance().show(false);
      expect(window.setTimeout.mock.calls.length).toBe(1);
      expect(window.requestAnimationFrame.mock.calls.length).toBe(0);
      expect(tooltip.state("visible")).toBe(false);
      expect(tooltip.state("animatingIn")).toBe(false);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);

      jest.runOnlyPendingTimers();
      expect(window.requestAnimationFrame.mock.calls.length).toBe(1);
      expect(window.setTimeout.mock.calls.length).toBe(2);
      expect(tooltip.state("visible")).toBe(false);
      expect(tooltip.state("animatingIn")).toBe(true);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);

      jest.runOnlyPendingTimers();
      expect(window.requestAnimationFrame.mock.calls.length).toBe(1);
      expect(window.setTimeout.mock.calls.length).toBe(3);
      expect(tooltip.state("visible")).toBe(true);
      expect(tooltip.state("animatingIn")).toBe(true);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);

      jest.runOnlyPendingTimers();
      expect(window.requestAnimationFrame.mock.calls.length).toBe(1);
      expect(window.setTimeout.mock.calls.length).toBe(3);
      expect(tooltip.state("visible")).toBe(true);
      expect(tooltip.state("animatingIn")).toBe(false);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);
    });

    it("should not restart the enter timeout if the show function is called again before the initial delay finishes", () => {
      jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({ position: "relative" }));

      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);

      tooltip.instance().show(false);
      expect(window.setTimeout.mock.calls.length).toBe(1);
      expect(window.clearTimeout.mock.calls.length).toBe(0);

      tooltip.instance().show(false);
      expect(window.setTimeout.mock.calls.length).toBe(1);
      expect(window.clearTimeout.mock.calls.length).toBe(0);
    });

    it("should not restart the enter timeout if the show function is called again while already visible and the keyboard boolean is different from the state value", () => {
      jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({ position: "relative" }));

      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);

      tooltip.instance().show(false);
      expect(tooltip.state("keyboard")).toBe(false);
      expect(window.setTimeout.mock.calls.length).toBe(1);
      expect(window.clearTimeout.mock.calls.length).toBe(0);
      jest.runAllTimers();

      expect(window.setTimeout.mock.calls.length).toBe(5);

      tooltip.instance().show(true);
      expect(window.setTimeout.mock.calls.length).toBe(5);
      expect(window.clearTimeout.mock.calls.length).toBe(0);
    });

    it("should set the animatingIn or animatingOut state to false if they are true when the show animation starts", () => {
      jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({ position: "relative" }));

      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      tooltip.setState({ animatingIn: true });

      tooltip.instance().show(false);
      expect(tooltip.state("animatingIn")).toBe(false);

      jest.runAllTimers();
      tooltip.setState({ visible: false, animatingOut: true });

      tooltip.instance().show(false);
      expect(tooltip.state("animatingOut")).toBe(false);
      jest.runAllTimers();
    });

    it("should update the keyboard state if it was different than the state keyboard", () => {
      jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({ position: "relative" }));
      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      expect(tooltip.state("keyboard")).toBe(false);

      tooltip.instance().show(true);
      jest.runAllTimers();
      expect(tooltip.state("keyboard")).toBe(true);
      expect(tooltip.state("visible")).toBe(true);

      tooltip.setState({ visible: false });
      tooltip.instance().show(false);
      jest.runAllTimers();
      expect(tooltip.state("keyboard")).toBe(false);
    });
  });

  describe("leaving", () => {
    it("should clear all timeouts and animation frames immediately", () => {
      jest.spyOn(window, "cancelAnimationFrame").mockImplementation(t => window.clearTimeout(t));
      const tooltip = mount<RelativeTooltip>(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      tooltip.instance().timeout = 1;
      tooltip.instance().transitionTimeout = 2;
      tooltip.instance().frame = 3;

      tooltip.instance().hide(false);
      expect(window.clearTimeout.mock.calls.length).toBe(3);
      expect(window.clearTimeout).toBeCalledWith(1);
      expect(window.clearTimeout).toBeCalledWith(2);
      expect(window.clearTimeout).toBeCalledWith(3);

      expect(tooltip.instance().timeout).toBeUndefined();
      expect(tooltip.instance().transitionTimeout).toBeUndefined();
      expect(tooltip.instance().fame).toBeUndefined();
    });

    it("should start the transitionTimeout if visible and the keyboard bool is equal the the state value", () => {
      const tooltip = mount(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      tooltip.setState({ keyboard: false, visible: true });

      tooltip.instance().hide(false);
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(tooltip.state("visible")).toBe(false);
      expect(tooltip.state("animatingIn")).toBe(false);
      expect(tooltip.state("animatingOut")).toBe(true);
      expect(tooltip.state("keyboard")).toBe(false);

      jest.runOnlyPendingTimers();
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(tooltip.state("visible")).toBe(false);
      expect(tooltip.state("animatingIn")).toBe(false);
      expect(tooltip.state("animatingOut")).toBe(false);
      expect(tooltip.state("keyboard")).toBe(false);
    });

    it("should not start the leave transition if the keyboard state is different", () => {
      const tooltip = mount(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
      tooltip.setState({ keyboard: true, visible: true });

      tooltip.instance().hide(false);
      expect(setTimeout.mock.calls.length).toBe(0);

      tooltip.setState({ keyboard: false });
      tooltip.instance().hide(true);
      expect(setTimeout.mock.calls.length).toBe(0);
    });
  });

  it("should render correctly at the different stages of animation", () => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => window.setTimeout(cb, 0));
    const tooltip = mount(<RelativeTooltip id={id}>Tooltip</RelativeTooltip>);
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.instance().show(true);
    expect(tooltip.render()).toMatchSnapshot();
    jest.runOnlyPendingTimers();
    expect(tooltip.render()).toMatchSnapshot();
    jest.runOnlyPendingTimers();
    expect(tooltip.render()).toMatchSnapshot();
    jest.runAllTimers();
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.instance().hide(true);
    expect(tooltip.render()).toMatchSnapshot();
    jest.runAllTimers();
    expect(tooltip.render()).toMatchSnapshot();
  });
});
