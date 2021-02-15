import React, { KeyboardEvent, FormHTMLAttributes, ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { tryToSubmitRelatedForm } from "../tryToSubmitRelatedForm";

interface TestProps {
  id?: string;
  submit?: "external" | "internal" | null;
  onSubmit: FormHTMLAttributes<HTMLFormElement>["onSubmit"];
  onNotSubmit(): void;
}

function Test({
  id = "form",
  submit = "internal",
  onSubmit,
  onNotSubmit,
}: TestProps): ReactElement {
  const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
    if (tryToSubmitRelatedForm(event)) {
      return;
    }

    onNotSubmit();
  };
  return (
    <>
      <form id={id} onSubmit={onSubmit}>
        <div
          id="radio"
          role="radio"
          aria-checked={false}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          Radio
        </div>
        {submit === "internal" && <button type="submit">Submit</button>}
      </form>
      {submit === "external" && (
        <button form={id} type="submit">
          Submit External
        </button>
      )}
    </>
  );
}

describe("tryToSubmitRelatedForm", () => {
  it("should do nothing if the key is not enter", () => {
    const onSubmit = jest.fn();
    const onNotSubmit = jest.fn();
    const { getByRole } = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} />
    );
    const radio = getByRole("radio", { name: "Radio" });

    fireEvent.keyDown(radio, { key: "A" });
    fireEvent.keyDown(radio, { key: "Tab" });
    expect(onSubmit).not.toBeCalled();
    expect(onNotSubmit).toBeCalledTimes(2);
  });

  it("should do nothing if the form does not have a submit button", () => {
    const onSubmit = jest.fn();
    const onNotSubmit = jest.fn();
    const { getByRole } = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} submit={null} />
    );

    const radio = getByRole("radio", { name: "Radio" });
    fireEvent.keyDown(radio, { key: "Enter" });
    expect(onSubmit).not.toBeCalled();
    expect(onNotSubmit).not.toBeCalled();
  });

  it("should attempt to find a submit button that has the form attribute set to the form id if the form has no submit button inside", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});

    const onSubmit = jest.fn();
    const onNotSubmit = jest.fn();
    const { getByRole } = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} submit="external" />
    );

    const radio = getByRole("radio", { name: "Radio" });
    fireEvent.keyDown(radio, { key: "Enter" });
    expect(onSubmit).toBeCalledTimes(1);
    expect(onNotSubmit).not.toBeCalled();

    error.mockRestore();
  });

  it("should do nothing if the element is not in a form", () => {
    function WithoutForm({
      onNotSubmit,
    }: {
      onNotSubmit(): void;
    }): ReactElement {
      const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
        if (tryToSubmitRelatedForm(event)) {
          return;
        }

        onNotSubmit();
      };

      return (
        <>
          <div
            id="radio"
            role="radio"
            aria-checked={false}
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            Radio
          </div>
        </>
      );
    }

    const onNotSubmit = jest.fn();
    const { getByRole } = render(<WithoutForm onNotSubmit={onNotSubmit} />);

    const radio = getByRole("radio", { name: "Radio" });
    fireEvent.keyDown(radio, { key: "Enter" });
    expect(onNotSubmit).not.toBeCalled();
  });
});
