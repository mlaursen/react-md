import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
} from "react";
import { act, fireEvent, render } from "@testing-library/react";

import { useChecked } from "../useChecked";

type SetChecked = Dispatch<SetStateAction<boolean>>;
const result: MutableRefObject<SetChecked | undefined> = { current: undefined };

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultChecked: boolean | (() => boolean);
}

function Test({ onChange, defaultChecked }: Props): ReactElement {
  const [checked, handleChange, setChecked] = useChecked(
    defaultChecked,
    onChange
  );
  result.current = setChecked;

  return (
    <input
      id="input"
      data-testid="input"
      type="checkbox"
      name="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

describe("useChecked", () => {
  it("should update the input state as expected", () => {
    const { getByTestId } = render(<Test defaultChecked={false} />);

    const input = getByTestId("input") as HTMLInputElement;
    expect(input.checked).toBe(false);

    fireEvent.click(input);
    expect(input.checked).toBe(true);

    fireEvent.click(input);
    expect(input.checked).toBe(false);

    const setChecked = result.current as SetChecked;
    act(() => {
      setChecked(true);
    });

    expect(input.checked).toBe(true);
  });

  it("should call the provied onChange handler", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Test defaultChecked={false} onChange={onChange} />
    );

    const input = getByTestId("input") as HTMLInputElement;

    fireEvent.click(input);
    expect(onChange).toBeCalledTimes(1);
  });
});
