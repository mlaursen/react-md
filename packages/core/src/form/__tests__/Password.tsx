import { type MouseEventHandler, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen, userEvent } from "../../test-utils/index.js";
import { Password } from "../Password.js";

describe("Password", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      label: "Password",
      ref,
    } as const;
    const { rerender } = render(<Password {...props} />);

    const field = screen.getByLabelText("Password");
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(field);
    expect(field).toMatchSnapshot();

    rerender(
      <Password
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(field).toMatchSnapshot();

    rerender(
      <Password
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
        inputClassName="input-class-name"
      />
    );
    expect(field).toMatchSnapshot();
  });

  it("should allow the user to temporarily show the password", async () => {
    const user = userEvent.setup();
    render(<Password label="Password" />);

    const password = screen.getByLabelText("Password");
    const toggle = screen.getByRole("button", { name: "Show password" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(password).toHaveAttribute("type", "password");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(password).toHaveAttribute("type", "text");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(password).toHaveAttribute("type", "password");
  });

  it("should allow for a custom visibility icon", () => {
    const { rerender } = render(<Password />);

    const toggle = screen.getByRole("button", { name: "Show password" });
    expect(toggle).toHaveTextContent("remove_red_eye");

    rerender(<Password visibilityIcon={<span data-testid="visibility" />} />);
    expect(toggle).not.toHaveTextContent("remove_red_eye");
    expect(() => screen.getByTestId("visibility")).not.toThrow();
  });

  it("should allow for a custom visibility icon for the visible and invisible states as a function", async () => {
    const user = userEvent.setup();
    render(
      <Password
        visibilityIcon={(visible) => {
          if (visible) {
            return <span data-testid="visible" />;
          }
          return <span data-testid="invisible" />;
        }}
      />
    );

    expect(() => screen.getByTestId("visible")).toThrow();
    expect(() => screen.getByTestId("invisible")).not.toThrow();

    await user.click(screen.getByRole("button"));

    expect(() => screen.getByTestId("visible")).not.toThrow();
    expect(() => screen.getByTestId("invisible")).toThrow();
  });

  it("should allow for a custom visibility icon for the visible and invisible states as an object", async () => {
    const user = userEvent.setup();
    render(
      <Password
        visibilityIcon={{
          visible: <span data-testid="visible" />,
          invisible: <span data-testid="invisible" />,
        }}
      />
    );

    expect(() => screen.getByTestId("visible")).toThrow();
    expect(() => screen.getByTestId("invisible")).not.toThrow();

    await user.click(screen.getByRole("button"));

    expect(() => screen.getByTestId("visible")).not.toThrow();
    expect(() => screen.getByTestId("invisible")).toThrow();
  });

  it("should allow for overriding the visibility button props", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Password />);

    const toggle = screen.getByRole("button", { name: "Show password" });
    expect(toggle).toMatchSnapshot();

    const onClick = vi.fn<MouseEventHandler<HTMLButtonElement>>();
    rerender(
      <Password
        visibilityProps={{
          id: "custom-id",
          buttonType: "icon-square",
          className: "custom-class-name",
          onClick,
          children: <span>Toggle</span>,
        }}
      />
    );
    expect(toggle).toMatchSnapshot();

    await user.click(toggle);
    expect(onClick).toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    onClick.mockImplementation((event) => {
      event.stopPropagation();
    });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toMatchSnapshot();
  });

  it("should allow the visibility button label to be customized", () => {
    const { rerender } = render(
      <Password visibilityLabel="Passwort anzeigen" />
    );
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-label", "Passwort anzeigen");

    rerender(
      <Password
        visibilityLabel="Label1"
        visibilityProps={{
          "aria-label": undefined,
          "aria-labelledby": "some-id",
        }}
      />
    );
    expect(toggle).not.toHaveAttribute("aria-label");
    expect(toggle).toHaveAttribute("aria-labelledby", "some-id");
  });

  it("should allow the name to be customized", () => {
    const { rerender } = render(<Password label="Password" />);

    const field = screen.getByLabelText("Password");
    expect(field).toHaveAttribute("name", "password");

    rerender(<Password label="Password" name="confirmPassword" />);
    expect(field).toHaveAttribute("name", "confirmPassword");
  });
});
