import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import { FormMessage } from "../FormMessage.js";
import { type ConfigurableFormMessageProps } from "../types.js";

describe("FormMessage", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props: PropsWithRef<ConfigurableFormMessageProps> = {
      "data-testid": "container",
      ref,
    };
    const { rerender } = render(<FormMessage {...props} />);

    const container = screen.getByTestId("container");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(container);
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessage
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessage
        {...props}
        error
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessage
        {...props}
        error
        theme="filled"
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should wrap the children in a p tag unless disableMessage is provided", () => {
    const { rerender } = render(
      <FormMessage data-testid="container">Hello, world!</FormMessage>
    );
    const container = screen.getByTestId("container");

    expect(container.firstChild).toBeInstanceOf(HTMLParagraphElement);
    expect(container).toMatchSnapshot();
    rerender(
      <FormMessage data-testid="container" disableWrap>
        Hello, world!
      </FormMessage>
    );
    expect(container.firstChild).not.toBeInstanceOf(HTMLParagraphElement);
    expect(container.firstChild).toBeInstanceOf(Text);
    expect(container).toMatchSnapshot();
  });

  it("should allow for simple props to be provided to the paragraph element", () => {
    render(
      <FormMessage
        data-testid="container"
        messageStyle={{ color: "blue" }}
        messageClassName="message-class-name"
      >
        <span>Help text</span>
      </FormMessage>
    );
    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });

  it('should automatically add aria-live="polite" if the role is not set to alert', () => {
    const { rerender } = render(<FormMessage data-testid="container" />);

    const container = screen.getByTestId("container");
    expect(container).not.toHaveAttribute("role");
    expect(container).toHaveAttribute("aria-live", "polite");

    rerender(<FormMessage data-testid="container" role="alert" />);
    expect(container).toHaveAttribute("role", "alert");
    expect(container).not.toHaveAttribute("aria-live");
  });

  it("should be able to render an inline counter if length and maxLength are provided", () => {
    const props = {
      "data-testid": "container",
      counterProps: { "data-testid": "counter" },
    };
    const { rerender } = render(<FormMessage {...props} />);
    expect(() => screen.getByTestId("counter")).toThrowError();

    rerender(<FormMessage {...props} length={12} />);
    expect(() => screen.getByTestId("counter")).toThrowError();

    rerender(<FormMessage {...props} length={12} maxLength={20} />);
    const counter = screen.getByTestId("counter");
    expect(counter).toHaveTextContent("12 / 20");
    expect(counter).toMatchSnapshot();
  });
});
