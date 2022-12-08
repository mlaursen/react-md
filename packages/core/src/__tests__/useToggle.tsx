import { fireEvent, render } from "@testing-library/react";
import { ReactElement } from "react";

import { useToggle } from "../useToggle";

function Test(): ReactElement {
  const { toggle, toggled, enable, disable } = useToggle();

  return (
    <>
      <div data-testid="output">{`${toggled}`}</div>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <button type="button" onClick={enable}>
        Enable
      </button>
      <button type="button" onClick={disable}>
        Disable
      </button>
    </>
  );
}

describe("useToggle", () => {
  it("should work as expected with no arguments", () => {
    const { getByRole, getByTestId } = render(<Test />);

    const output = getByTestId("output");
    const toggle = getByRole("button", { name: "Toggle" });
    const enable = getByRole("button", { name: "Enable" });
    const disable = getByRole("button", { name: "Disable" });
    expect(output).toHaveTextContent("false");

    fireEvent.click(toggle);
    expect(output).toHaveTextContent("true");
    fireEvent.click(toggle);
    expect(output).toHaveTextContent("false");

    fireEvent.click(disable);
    expect(output).toHaveTextContent("false");

    fireEvent.click(enable);
    expect(output).toHaveTextContent("true");
    fireEvent.click(enable);
    expect(output).toHaveTextContent("true");

    fireEvent.click(disable);
    expect(output).toHaveTextContent("false");
  });

  it("should allow for a default state", () => {
    function Test(): ReactElement {
      const { toggled } = useToggle(true);

      return <div data-testid="output">{`${toggled}`}</div>;
    }

    const { getByTestId } = render(<Test />);

    const output = getByTestId("output");
    expect(output).toHaveTextContent("true");
  });

  it("should allow for a default state using a callback function", () => {
    function Test(): ReactElement {
      const { toggled } = useToggle(() => true);

      return <div data-testid="output">{`${toggled}`}</div>;
    }

    const { getByTestId } = render(<Test />);

    const output = getByTestId("output");
    expect(output).toHaveTextContent("true");
  });
});
