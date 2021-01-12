import React, { FormEvent } from "react";
import { fireEvent, render } from "@testing-library/react";

import { Form } from "../Form";

describe("Form", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Form>
        <button type="submit">Submit</button>
      </Form>
    );

    expect(container).toMatchSnapshot();
  });

  it("should prevent default form submission by default", () => {
    let isStopped = false;
    const onSubmit = jest.fn((event: FormEvent<HTMLFormElement>) => {
      isStopped = event.isDefaultPrevented();
    });
    const { container, rerender } = render(
      <Form onSubmit={onSubmit} disablePreventDefault />
    );

    const form = container.firstElementChild;
    if (!form) {
      throw new Error();
    }
    expect(onSubmit).not.toBeCalled();

    fireEvent.submit(form);
    expect(isStopped).toBe(false);
    expect(onSubmit).toBeCalledTimes(1);

    rerender(<Form onSubmit={onSubmit} />);

    fireEvent.submit(form);
    expect(isStopped).toBe(true);
    expect(onSubmit).toBeCalledTimes(2);
  });
});
