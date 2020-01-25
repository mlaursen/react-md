import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Password from "../Password";

const getById = (id: string) => {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error();
  }

  return el;
};

describe("Password", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Password id="password" />);

    expect(container).toMatchSnapshot();

    rerender(
      <Password id="password" label="Password" placeholder="Password..." />
    );
    expect(container).toMatchSnapshot();
  });

  it("should switch to a text input when the visibility button is clicked", () => {
    render(<Password id="password" label="Label" />);

    const password = getById("password");
    const toggle = getById("password-password-toggle");

    expect(password).toMatchSnapshot();
    expect(password.getAttribute("type")).toBe("password");

    fireEvent.click(toggle);
    expect(password).toMatchSnapshot();
    expect(password.getAttribute("type")).toBe("text");

    fireEvent.click(toggle);
    expect(password).toMatchSnapshot();
    expect(password.getAttribute("type")).toBe("password");
  });

  it("should not render the password toggle button if the disableVisibility prop is enabled", () => {
    const { container, rerender } = render(<Password id="password" />);
    const getToggle = () => getById("password-password-toggle");

    expect(container).toMatchSnapshot();
    expect(getToggle).not.toThrow();

    rerender(<Password id="password" disableVisibility />);
    expect(container).toMatchSnapshot();
    expect(getToggle).toThrow();
  });
});
