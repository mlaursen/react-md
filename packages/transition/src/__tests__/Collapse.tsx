import React from "react";
import { mount, shallow } from "enzyme";

import Collapse from "../Collapse";

describe("Collapse", () => {
  describe("rendering", () => {
    it("should render as null when collapsed by default", () => {
      const children = jest.fn();
      const collapse = shallow(<Collapse collapsed>{children}</Collapse>);
      expect(collapse.type()).toBe(null);
    });

    it("should not call the children callback function when it is rendered as null", () => {
      const children = jest.fn();
      mount(<Collapse collapsed>{children}</Collapse>);

      expect(children).not.toBeCalled();
    });

    it("should not render as null if any of minHeight, minPaddingTop, or minPaddingBottom are greater than 0", () => {
      const collapse = shallow(
        <Collapse
          collapsed
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
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
          collapsed
          isEmptyCollapsed
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
});
