import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useChoice } from "../useChoice";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue: string | number | (() => string | number);
}

function Test({ onChange, defaultValue }: Props): ReactElement {
  const [value, handleChange] = useChoice(defaultValue, onChange);

  return (
    <>
      <input
        id="input-1"
        data-testid="input-1"
        type="radio"
        name="radio"
        value="A"
        checked={value === "A"}
        onChange={handleChange}
      />
      <input
        id="input-2"
        data-testid="input-2"
        type="radio"
        name="radio"
        value="B"
        checked={value === "B"}
        onChange={handleChange}
      />
      <input
        id="input-3"
        data-testid="input-3"
        type="radio"
        name="radio"
        value="C"
        checked={value === "C"}
        onChange={handleChange}
      />
    </>
  );
}

describe("useChoice", () => {
  it("should check the radio with the specified default value by default", () => {
    const { getByTestId } = render(<Test defaultValue="A" />);

    const radio1 = getByTestId("input-1") as HTMLInputElement;
    const radio2 = getByTestId("input-2") as HTMLInputElement;
    const radio3 = getByTestId("input-3") as HTMLInputElement;

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio1);
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio2);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio3);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(true);
  });

  it("should allow an empty default value so no inputs are checked by default", () => {
    const { getByTestId } = render(<Test defaultValue="" />);

    const radio1 = getByTestId("input-1") as HTMLInputElement;
    const radio2 = getByTestId("input-2") as HTMLInputElement;
    const radio3 = getByTestId("input-3") as HTMLInputElement;

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio1);
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio2);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio3);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(true);
  });
});
