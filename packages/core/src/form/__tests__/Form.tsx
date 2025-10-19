import { type FormEvent, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "../../test-utils/index.js";
import { type NonNullMutableRef } from "../../types.js";
import { Form } from "../Form.js";

describe("Form", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLFormElement>();

    const { rerender } = render(<Form ref={ref} name="form" />);

    const form = screen.getByRole("form");
    expect(ref.current).toBeInstanceOf(HTMLFormElement);
    expect(ref.current).toBe(form);
    expect(form).toMatchSnapshot();

    rerender(
      <Form
        ref={ref}
        name="form"
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(form).toMatchSnapshot();
  });

  it("should prevent default form behavior unless disablePreventDefault is enabled", () => {
    // hide the `Error: Not implemented: HTMLFormElement.prototype.requestSubmit`
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const prevented: NonNullMutableRef<boolean> = { current: false };
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      prevented.current = event.isDefaultPrevented();
    });
    const { rerender } = render(
      <Form name="name">
        <button>Submit</button>
      </Form>
    );

    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);
    expect(error).not.toHaveBeenCalled();

    rerender(
      <Form onSubmit={onSubmit} name="name">
        <button>Submit</button>
      </Form>
    );
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(error).not.toHaveBeenCalled();
    expect(prevented.current).toBe(true);

    rerender(
      <Form onSubmit={onSubmit} name="name" disablePreventDefault>
        <button>Submit</button>
      </Form>
    );
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(prevented.current).toBe(false);
    expect(error).toHaveBeenCalled();
  });
});
