import React from "react";
import { render } from "@testing-library/react";

import { Chip } from "../Chip";

const getIcon = () => document.querySelector(".rmd-chip__selected-icon");

describe("Chip", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<Chip {...props} />);

    expect(container).toMatchSnapshot();

    const leftIcon = <i className="material-icons">keyboard_arrow_left</i>;
    const rightIcon = <i className="material-icons">keyboard_arrow_right</i>;

    rerender(<Chip {...props} leftIcon={leftIcon} />);
    expect(container).toMatchSnapshot();

    rerender(<Chip {...props} rightIcon={rightIcon} />);
    expect(container).toMatchSnapshot();
  });

  it("should disable wrapping the children in a content span if the disableContentWrap prop is enabled", () => {
    const props = {
      children: <span>Content</span>,
      contentStyle: { color: "red" },
      contentClassName: "content-class-name",
    };
    const { container, rerender } = render(<Chip {...props} />);

    const getContent = () =>
      container.querySelector(`.${props.contentClassName}`);

    expect(container).toMatchSnapshot();
    expect(getContent()).not.toBeNull();

    rerender(<Chip {...props} disableContentWrap />);
    expect(container).toMatchSnapshot();
    expect(getContent()).toBeNull();
  });

  it("should render the selected icon when the selected prop is a boolean and the leftIcon prop is undefined", () => {
    const props = { children: "Content", selected: false };
    const { container, rerender } = render(<Chip {...props} />);

    expect(container).toMatchSnapshot();
    expect(getIcon()).not.toBeNull();

    rerender(<Chip {...props} selected />);
    expect(container).toMatchSnapshot();
    expect(getIcon()).not.toBeNull();

    rerender(<Chip {...props} leftIcon={null} />);
    expect(container).toMatchSnapshot();
    expect(getIcon()).toBeNull();
  });

  it("should not render the selected icon until the selected prop is true if the disableIconTransition prop is enabled", () => {
    const props = {
      children: "Content",
      selected: false,
      disableIconTransition: true,
    };
    const { container, rerender } = render(<Chip {...props} />);
    expect(container).toMatchSnapshot();
    expect(getIcon()).toBeNull();

    rerender(<Chip {...props} selected />);
    expect(container).toMatchSnapshot();
    expect(getIcon()).toBeNull();
  });

  it("should render as a span when the noninteractable prop is enabled", () => {
    const props = {
      "data-testid": "chip",
      children: "Content",
    };
    const { getByTestId, rerender } = render(
      <Chip {...props} noninteractable />
    );

    let chip = getByTestId("chip");
    expect(chip).toBeInstanceOf(HTMLSpanElement);
    expect(chip).not.toHaveAttribute("aria-pressed");
    expect(chip).not.toHaveAttribute("type");
    expect(chip).not.toHaveAttribute("disabled");
    expect(chip.className).toContain("rmd-chip--noninteractable");
    expect(chip).toMatchSnapshot();

    rerender(<Chip {...props} />);
    chip = getByTestId("chip");
    expect(chip).toBeInstanceOf(HTMLButtonElement);
    expect(chip).toHaveAttribute("type", "button");
    expect(chip).not.toHaveAttribute("disabled");
    expect(chip.className).not.toContain("rmd-chip--noninteractable");
    expect(chip).toMatchSnapshot();
  });
});
