import React from "react";
import { render } from "@testing-library/react";
import { FontIcon } from "@react-md/icon";

import { Option } from "../Option";

describe("Option", () => {
  it("should render as an <li> with the correct attributes", () => {
    const props = {
      id: "listbox-option-1",
      focused: false,
      selected: false,
      "data-testid": "option",
      children: "Option 1",
    };

    const { getByTestId, rerender } = render(<Option {...props} />);

    const option = getByTestId("option");
    expect(option).toMatchSnapshot();
    expect(option.getAttribute("role")).toBe("option");
    expect(option.getAttribute("aria-selected")).toBe(null);

    rerender(<Option {...props} selected />);
    expect(option).toMatchSnapshot();
    expect(option.getAttribute("aria-selected")).toBe("true");

    rerender(<Option {...props} selected focused />);
    expect(option).toMatchSnapshot();
    expect(option.getAttribute("aria-selected")).toBe("true");

    rerender(<Option {...props} focused />);
    expect(option).toMatchSnapshot();
    expect(option.getAttribute("aria-selected")).toBe(null);
  });

  it("should be able to render with the SimpleListItem props", () => {
    const { getByTestId } = render(
      <Option
        id="option-1"
        data-testid="option"
        leftAddon={<FontIcon>home</FontIcon>}
        focused={false}
        selected={false}
      >
        <span>Some custom children </span>
      </Option>
    );

    expect(getByTestId("option")).toMatchSnapshot();
  });
});
