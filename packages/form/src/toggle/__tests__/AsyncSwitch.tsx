import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { AsyncSwitch } from "../AsyncSwitch";

const getLabel = (container: Element) => {
  const el = container.querySelector("label");
  if (!el) {
    throw new Error();
  }

  return el;
};

describe("AsyncSwitch", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(
      <AsyncSwitch id="switch" loading={false} />
    );

    expect(container).toMatchSnapshot();

    rerender(<AsyncSwitch id="switch" loading />);
    expect(container).toMatchSnapshot();
  });

  it("should prevent changes while the loading prop is enabled without disabling the switch", () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <AsyncSwitch id="switch" loading onChange={onChange} />
    );

    const label = getLabel(container);
    fireEvent.click(label);
    expect(onChange).not.toBeCalled();

    rerender(<AsyncSwitch id="switch" loading={false} onChange={onChange} />);
    fireEvent.click(label);
    expect(onChange).toBeCalledTimes(1);
  });
});
