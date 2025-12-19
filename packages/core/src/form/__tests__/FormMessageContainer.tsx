import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import {
  FormMessageContainer,
  type FormMessageContainerProps,
} from "../FormMessageContainer.js";

describe("FormMessageContainer", () => {
  it("should just render the children if messageProps are not defined", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "container",
      ref,
      children: <span data-testid="children">Children</span>,
    } as const;
    render(<FormMessageContainer {...props} />);
    expect(() => screen.getByTestId("container")).toThrowError();
    expect(() => screen.getByTestId("children")).not.toThrowError();
    expect(ref.current).toBe(null);
  });

  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props: PropsWithRef<FormMessageContainerProps> = {
      "data-testid": "container",
      ref,
      children: <span>Children</span>,
      messageProps: {
        children: "Message!",
      },
    };
    const { rerender } = render(<FormMessageContainer {...props} />);

    const container = screen.getByTestId("container");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(container);
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessageContainer
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <FormMessageContainer
        {...props}
        inline
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
