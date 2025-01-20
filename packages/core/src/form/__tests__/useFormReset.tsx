import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, useRef, useState } from "react";

import { Button } from "../../button/Button.js";
import { act, rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { useFormReset } from "../useFormReset.js";

interface TestImplementationProps {
  form?: string;
  defaultValue?: string;
}

function TestImplementation({
  form,
  defaultValue = "Default Value",
}: TestImplementationProps): ReactElement {
  const elementRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  useFormReset({
    form,
    elementRef,
    defaultValue,
  });

  return (
    <label>
      Input
      <input
        ref={elementRef}
        form={form}
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />
    </label>
  );
}

describe("useFormReset", () => {
  it("should reset the value when a form is reset", async () => {
    const user = userEvent.setup();
    const onReset = jest.fn();
    function Test(): ReactElement {
      return (
        <form name="form" onReset={onReset}>
          <TestImplementation />
          <Button type="reset">Reset</Button>
        </form>
      );
    }

    rmdRender(<Test />);

    const form = screen.getByRole<HTMLFormElement>("form");
    const reset = screen.getByRole("button", { name: "Reset" });
    const input = screen.getByRole("textbox", { name: "Input" });

    expect(input).toHaveValue("Default Value");
    await user.click(reset);
    expect(onReset).toHaveBeenCalledTimes(1);

    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");
    await user.click(reset);
    expect(onReset).toHaveBeenCalledTimes(2);
    expect(input).toHaveValue("Default Value");

    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");
    act(() => {
      form.reset();
    });
    expect(onReset).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue("Default Value");
  });

  it("should be able to find a form by using the form prop", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      return (
        <>
          <TestImplementation form="main-form" />
          <form id="main-form" name="form">
            <Button type="reset">Reset</Button>
          </form>
        </>
      );
    }

    rmdRender(<Test />);

    const reset = screen.getByRole("button", { name: "Reset" });
    const input = screen.getByRole("textbox", { name: "Input" });
    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");
    await user.click(reset);
    expect(input).toHaveValue("Default Value");
  });

  it("should do nothing if an elementRef was not set", async () => {
    const user = userEvent.setup();
    const onReset = jest.fn();

    function Broken(): ReactElement {
      const elementRef = useRef<HTMLInputElement>(null);
      const [value, setValue] = useState("Default Value");
      useFormReset({
        elementRef,
        defaultValue: "Default Value",
      });

      return (
        <label>
          Input
          <input
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
            }}
          />
        </label>
      );
    }

    function Test(): ReactElement {
      return (
        <form name="form" onReset={onReset}>
          <Broken />
          <Button type="reset">Reset</Button>
        </form>
      );
    }

    rmdRender(<Test />);
    const reset = screen.getByRole("button", { name: "Reset" });
    const input = screen.getByRole("textbox", { name: "Input" });

    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");

    await user.click(reset);
    expect(input).toHaveValue("New Value");
  });

  it("should do nothing if a form cannot be found", async () => {
    const user = userEvent.setup();
    const onReset = jest.fn();

    function Broken(): ReactElement {
      const elementRef = useRef<HTMLInputElement>(null);
      const [value, setValue] = useState("Default Value");
      useFormReset({
        elementRef,
        defaultValue: "Default Value",
      });

      return (
        <label>
          Input
          <input
            ref={elementRef}
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
            }}
          />
        </label>
      );
    }

    function Test(): ReactElement {
      return (
        <>
          <Broken />
          <form name="form" onReset={onReset}>
            <Button type="reset">Reset</Button>
          </form>
        </>
      );
    }

    rmdRender(<Test />);
    const reset = screen.getByRole("button", { name: "Reset" });
    const input = screen.getByRole("textbox", { name: "Input" });

    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");

    await user.click(reset);
    expect(input).toHaveValue("New Value");
  });
});
