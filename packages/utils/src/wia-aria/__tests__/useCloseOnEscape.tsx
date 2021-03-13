import React, { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";

import { useCloseOnEscape } from "../useCloseOnEscape";

interface Props {
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  disabled?: boolean;
  onRequestClose: () => void;
}

function Test({
  onKeyDown,
  onRequestClose,
  disabled = false,
}: Props): ReactElement {
  const handleKeyDown = useCloseOnEscape(onRequestClose, disabled, onKeyDown);

  return <div tabIndex={-1} onKeyDown={handleKeyDown} data-testid="div" />;
}

describe("useCloseOnEscape", () => {
  it("should call the onRequestClose function when the escape key is pressed", () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(<Test onRequestClose={onRequestClose} />);

    const div = getByTestId("div");
    fireEvent.keyDown(div, { key: " " });
    fireEvent.keyDown(div, { key: "A" });
    fireEvent.keyDown(div, { key: "B" });
    fireEvent.keyDown(div, { key: "Enter" });

    expect(onRequestClose).not.toBeCalled();

    fireEvent.keyDown(div, { key: "Escape" });
    expect(onRequestClose).toBeCalled();
  });

  it("should not trigger the onRequestClose if disabled", () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <Test onRequestClose={onRequestClose} disabled />
    );
    const div = getByTestId("div");

    fireEvent.keyDown(div, { key: "Escape" });
    expect(onRequestClose).not.toBeCalled();
  });

  it("should call the onKeyDown prop if it was provided", () => {
    const onKeyDown = jest.fn();
    const onRequestClose = jest.fn();
    const { getByTestId, rerender } = render(
      <Test onRequestClose={onRequestClose} onKeyDown={onKeyDown} />
    );
    const div = getByTestId("div");

    fireEvent.keyDown(div, { key: "A" });
    expect(onKeyDown).toBeCalled();
    expect(onRequestClose).not.toBeCalled();

    fireEvent.keyDown(div, { key: "Escape" });
    expect(onKeyDown).toBeCalledTimes(2);
    expect(onRequestClose).toBeCalledTimes(1);

    onKeyDown.mockClear();
    onRequestClose.mockClear();
    rerender(
      <Test onRequestClose={onRequestClose} disabled onKeyDown={onKeyDown} />
    );
    fireEvent.keyDown(div, { key: "Escape" });
    expect(onKeyDown).toBeCalled();
    expect(onRequestClose).not.toBeCalled();
  });
});
