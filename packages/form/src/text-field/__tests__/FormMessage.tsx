import React from "react";
import { render } from "@testing-library/react";

import FormMessage from "../FormMessage";

describe("FormMessage", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<FormMessage id="message" />);

    expect(container).toMatchSnapshot();

    rerender(<FormMessage id="message">This is a help message!</FormMessage>);
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessage id="message" error>
        Something broke.
      </FormMessage>
    );
    expect(container).toMatchSnapshot();
  });

  it("should set the aria-live attribute to polite unless the role is changed to alert", () => {
    const props = { id: "message", "data-testid": "message" };
    const { rerender, getByTestId } = render(<FormMessage {...props} />);
    const message = getByTestId("message");
    expect(message.getAttribute("role")).toBe(null);
    expect(message.getAttribute("aria-live")).toBe("polite");

    rerender(<FormMessage {...props} role="alert" />);
    expect(message.getAttribute("role")).toBe("alert");
    expect(message.getAttribute("aria-live")).toBe(null);
  });

  it("should render an inline counter when the length and maxLength props are provided", () => {
    const props = { id: "message", "data-testid": "message", maxLength: 10 };
    const { rerender, getByTestId } = render(
      <FormMessage {...props} length={0} />
    );

    const message = getByTestId("message");
    expect(message).toMatchSnapshot();
    rerender(<FormMessage {...props} length={10} />);
    expect(message).toMatchSnapshot();

    rerender(
      <FormMessage {...props} length={10} error>
        Too long
      </FormMessage>
    );
    expect(message).toMatchSnapshot();
  });
});
