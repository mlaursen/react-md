import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FontIcon } from "@react-md/icon";

import { Password, GetVisibilityIcon } from "../Password";

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

  it("should allow for a custom visibility icon node or null", () => {
    const { rerender } = render(
      <Password id="password" visibilityIcon={null} />
    );

    const toggle = getById("password-password-toggle");
    expect(toggle).toMatchSnapshot();

    rerender(
      <Password
        id="password"
        visibilityIcon={<FontIcon id="visibility-icon" />}
      />
    );
    expect(toggle).toMatchSnapshot();
    expect(() => getById("visibility-icon")).not.toThrow();
  });

  it("should allow the visibilityIcon to be an object for visible and invisible states", () => {
    const props = {
      id: "password",
      visibilityIcon: {
        visible: <FontIcon id="visible-icon">visibility_on</FontIcon>,
        invisible: <FontIcon id="invisible-icon">visibility_off</FontIcon>,
      },
    };
    const { container } = render(<Password {...props} />);

    const toggle = getById("password-password-toggle");
    expect(container).toMatchSnapshot();
    expect(() => getById("visible-icon")).toThrow();
    expect(() => getById("invisible-icon")).not.toThrow();

    fireEvent.click(toggle);
    expect(container).toMatchSnapshot();
    expect(() => getById("visible-icon")).not.toThrow();
    expect(() => getById("invisible-icon")).toThrow();
  });

  it("should allow the visibilityIcon to be rendered by the current input type and a getVisibilityIcon function", () => {
    const getVisibilityIcon: GetVisibilityIcon = (type) =>
      type === "password" ? (
        <span id="password-icon" />
      ) : (
        <span id="text-icon" />
      );

    render(<Password id="password" getVisibilityIcon={getVisibilityIcon} />);
    const toggle = getById("password-password-toggle");

    expect(() => getById("password-icon")).not.toThrow();
    expect(() => getById("text-icon")).toThrow();

    fireEvent.click(toggle);
    expect(() => getById("password-icon")).toThrow();
    expect(() => getById("text-icon")).not.toThrow();
  });

  it("should correctly call the onVisibilityClick callback", () => {
    const onVisibilityClick = jest.fn();
    render(<Password id="password" onVisibilityClick={onVisibilityClick} />);

    const toggle = getById("password-password-toggle");
    fireEvent.click(toggle);
    expect(onVisibilityClick).toBeCalledTimes(1);
  });
});
