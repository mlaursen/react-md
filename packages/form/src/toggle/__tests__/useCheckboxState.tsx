import React, { Dispatch, SetStateAction, MutableRefObject, FC } from "react";
import { cleanup, render, fireEvent, act } from "react-testing-library";

import useCheckboxState from "../useCheckboxState";

afterEach(cleanup);

type SetChecked = Dispatch<SetStateAction<boolean>>;
const result: MutableRefObject<SetChecked | undefined> = { current: undefined };

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultChecked: boolean | (() => boolean);
}

const Test: FC<Props> = ({ onChange, defaultChecked }) => {
  const [checked, handleChange, setChecked] = useCheckboxState(
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
};

describe("useCheckboxState", () => {
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
