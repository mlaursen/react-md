import React from "react";
import { render } from "@testing-library/react";

import { InputToggle } from "../InputToggle";

describe("InputToggle", () => {
  it("should render correctly", () => {
    const props = { id: "toggle" };
    const { container, rerender } = render(
      <InputToggle {...props} type="radio" />
    );

    expect(container).toMatchSnapshot();

    rerender(<InputToggle {...props} type="checkbox" />);
    expect(container).toMatchSnapshot();
  });

  it("should correctly pass the inputStyle and inputClassName to the invisible input element", () => {
    const props = {
      id: "toggle",
      style: { color: "orange" },
      className: "custom-container",
      inputStyle: { color: "red" },
      inputClassName: "custom-input",
    };

    const { container, rerender, getByRole } = render(
      <InputToggle type="checkbox" {...props} />
    );

    const toggleContainer = container.firstElementChild as HTMLDivElement;
    expect(toggleContainer.style.color).toBe("orange");
    expect(toggleContainer.className).toContain(props.className);
    const checkbox = getByRole("checkbox");
    expect(checkbox.style.color).toBe("red");
    expect(checkbox.className).toContain(props.inputClassName);
    expect(container).toMatchSnapshot();

    rerender(<InputToggle type="radio" value="a" {...props} />);
    const radio = getByRole("radio");
    expect(toggleContainer.style.color).toBe("orange");
    expect(toggleContainer.className).toContain(props.className);
    expect(radio.style.color).toBe("red");
    expect(radio.className).toContain(props.inputClassName);
    expect(container).toMatchSnapshot();
  });
});
