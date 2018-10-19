/* tslint:disable max-line-length */
import * as React from "react";
import { mount, shallow } from "enzyme";

import Collapse from "../Collapse";

describe("Collapse", () => {
  describe("rendering", () => {
    it("should render as null when collapsed by default", () => {
      const children = jest.fn();
      const collapse = shallow(<Collapse collapsed={true}>{children}</Collapse>);
      expect(collapse.type()).toBe(null);
    });

    it("should not call the children callback function when it is rendered as null", () => {
      const children = jest.fn();
      mount(<Collapse collapsed={true}>{children}</Collapse>);

      expect(children).not.toBeCalled();
    });

    it("should not render as null if any of minHeight, minPaddingTop, or minPaddingBottom are greater than 0", () => {
      const collapse = shallow(
        <Collapse collapsed={true} minHeight={1} minPaddingTop={1} minPaddingBottom={1}>
          {() => <div />}
        </Collapse>
      );

      expect(collapse.type()).not.toBeNull();

      collapse.setProps({ minPaddingTop: 0, minPaddingBottom: 0 });
      expect(collapse.type()).not.toBeNull();

      collapse.setProps({ minHeight: 0, minPaddingBottom: 1 });
      expect(collapse.type()).not.toBeNull();

      collapse.setProps({ minPaddingTop: 1, minPaddingBottom: 0 });
      expect(collapse.type()).not.toBeNull();
    });

    it("should use the value of the isEmptyCollapsed prop over the values of minHeight, minPaddingTop, minPaddingBottom if it is defined", () => {
      const collapse = shallow(
        <Collapse
          collapsed={true}
          isEmptyCollapsed={true}
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
          {() => <div />}
        </Collapse>
      );

      expect(collapse.type()).toBe(null);

      collapse.setProps({
        minHeight: 0,
        minPaddingTop: 0,
        minPaddingBottom: 0,
        isEmptyCollapsed: false,
      });
      expect(collapse.type()).not.toBe(null);
    });
  });

  describe("transition", () => {
    const REAL_COMPUTED_STYLE = window.getComputedStyle;
    const REAL_RAF = window.requestAnimationFrame;
    beforeEach(() => {
      jest.useFakeTimers();

      window.getComputedStyle = () => ({
        paddingTop: "12px",
        paddingBottom: "12px",
      });

      // fake that the scrollHeight is 100px
      Object.defineProperty(Element.prototype, "scrollHeight", {
        writable: true,
        value: 100,
      });
    });

    it("should correctly stagger the rendering, applying class and style during an enter transition", () => {
      const collapse = mount(
        <Collapse collapsed={true}>
          {({ style, className, refCallback }) => (
            <h2 ref={refCallback} style={style} className={className}>
              Content!
            </h2>
          )}
        </Collapse>
      );

      expect(collapse.state("entering")).toBe(false);
      expect(collapse.state("maxHeight")).toBe(0);
      expect(collapse.state("paddingTop")).toBe(0);
      expect(collapse.state("paddingBottom")).toBe(0);
      expect(window.setTimeout).toHaveBeenCalledTimes(0);

      collapse.setProps({ collapsed: false });
      expect(collapse.state("entering")).toBe(true);
      expect(collapse.state("maxHeight")).toBe(100);
      expect(collapse.state("paddingTop")).toBe(12);
      expect(collapse.state("paddingBottom")).toBe(12);
      expect(window.setTimeout).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(collapse.state("entering")).toBe(false);
      expect(collapse.state("maxHeight")).toBeUndefined();
      expect(collapse.state("paddingTop")).toBeUndefined();
      expect(collapse.state("paddingBottom")).toBeUndefined();
      expect(window.setTimeout).toHaveBeenCalledTimes(1);
    });

    it("should correctly stagger the rendering, applying class and style during an enter transition", () => {
      const collapse = mount(
        <Collapse collapsed={false}>
          {({ style, className, refCallback }) => (
            <h2 ref={refCallback} style={style} className={className}>
              Content!
            </h2>
          )}
        </Collapse>
      );

      expect(collapse.state("leaving")).toBe(false);
      expect(collapse.state("maxHeight")).toBeUndefined();
      expect(collapse.state("paddingTop")).toBeUndefined();
      expect(collapse.state("paddingBottom")).toBeUndefined();
      expect(window.setTimeout).toHaveBeenCalledTimes(0);

      collapse.setProps({ collapsed: true });
      expect(collapse.state("leaving")).toBe(true);
      expect(collapse.state("maxHeight")).toBe(100);
      expect(collapse.state("paddingTop")).toBe(12);
      expect(collapse.state("paddingBottom")).toBe(12);
      expect(window.setTimeout).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(collapse.state("leaving")).toBe(true);
      expect(collapse.state("maxHeight")).toBe(0);
      expect(collapse.state("paddingTop")).toBe(0);
      expect(collapse.state("paddingBottom")).toBe(0);
      expect(window.setTimeout).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();
      expect(collapse.state("leaving")).toBe(false);
      expect(collapse.state("maxHeight")).toBeUndefined();
      expect(collapse.state("paddingTop")).toBeUndefined();
      expect(collapse.state("paddingBottom")).toBeUndefined();
      expect(window.setTimeout).toHaveBeenCalledTimes(2);
    });

    it("should be able to switch transitions if one transition hasn't finished yet", () => {
      const collapse = mount(
        <Collapse collapsed={true}>
          {({ style, className, refCallback }) => (
            <h2 ref={refCallback} style={style} className={className}>
              Content!
            </h2>
          )}
        </Collapse>
      );

      expect(collapse.state("entering")).toBe(false);
      expect(collapse.state("leaving")).toBe(false);
      expect(collapse.state("maxHeight")).toBe(0);
      expect(collapse.state("paddingTop")).toBe(0);
      expect(collapse.state("paddingBottom")).toBe(0);
      expect(window.setTimeout).toHaveBeenCalledTimes(0);
      expect(window.clearTimeout).toHaveBeenCalledTimes(0);

      collapse.setProps({ collapsed: false });
      expect(collapse.state("entering")).toBe(true);
      expect(collapse.state("leaving")).toBe(false);
      expect(collapse.state("maxHeight")).toBe(100);
      expect(collapse.state("paddingTop")).toBe(12);
      expect(collapse.state("paddingBottom")).toBe(12);
      expect(window.setTimeout).toHaveBeenCalledTimes(1);
      expect(window.clearTimeout).toHaveBeenCalledTimes(1);

      collapse.setProps({ collapsed: true });
      expect(window.clearTimeout).toHaveBeenCalledTimes(2);
      expect(window.setTimeout).toHaveBeenCalledTimes(2);
      expect(collapse.state("leaving")).toBe(true);
      expect(collapse.state("maxHeight")).toBe(100);
      expect(collapse.state("paddingTop")).toBe(12);
      expect(collapse.state("paddingBottom")).toBe(12);

      jest.runOnlyPendingTimers();
      expect(window.clearTimeout).toHaveBeenCalledTimes(2);
      expect(window.setTimeout).toHaveBeenCalledTimes(3);
      expect(collapse.state("entering")).toBe(false);
      expect(collapse.state("leaving")).toBe(true);
      expect(collapse.state("maxHeight")).toBe(0);
      expect(collapse.state("paddingTop")).toBe(0);
      expect(collapse.state("paddingBottom")).toBe(0);

      jest.runOnlyPendingTimers();
      expect(collapse.state("entering")).toBe(false);
      expect(collapse.state("leaving")).toBe(false);
      expect(collapse.state("maxHeight")).toBeUndefined();
      expect(collapse.state("paddingTop")).toBeUndefined();
      expect(collapse.state("paddingBottom")).toBeUndefined();
      expect(window.setTimeout).toHaveBeenCalledTimes(3);
    });
  });
});
