import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import Tooltipped from "../Tooltipped";

jest.useFakeTimers();

describe("Tooltipped", () => {
  it("should correctly add a tooltip when needed to a cloneable child", () => {
    const { getByText, queryByRole } = render(
      <Tooltipped id="button" tooltip="Look at me!">
        <button type="button">Button</button>
      </Tooltipped>
    );

    const button = getByText("Button");
    expect(button).not.toHaveAttribute("aria-describedby");
    expect(queryByRole("tooltip")).toBe(null);

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByRole("tooltip")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-describedby", "button-tooltip");

    fireEvent.mouseLeave(button);
    expect(queryByRole("tooltip")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-describedby", "button-tooltip");

    act(() => {
      jest.runAllTimers();
    });
    expect(queryByRole("tooltip")).not.toBeInTheDocument();
    expect(button).not.toHaveAttribute("aria-describedby");
  });
});
