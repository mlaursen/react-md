import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "test-utils";

import { Button } from "../../button/Button.js";
import { useMenuVisibility } from "../MenuVisibilityProvider.js";

describe("MenuVisibilityProvider", () => {
  it("should throw an error if it has not been initialized correctly", () => {
    let error: unknown;
    function Test() {
      const { setVisible } = useMenuVisibility();
      return (
        <Button
          onClick={() => {
            try {
              setVisible(true);
            } catch (e) {
              error = e;
            }
          }}
        >
          Button
        </Button>
      );
    }

    render(<Test />);
    const button = screen.getByRole("button", { name: "Button" });
    fireEvent.click(button);
    expect(error instanceof Error && error.message).toBe(
      '"MenuVisibilityProvider" must be a parent component'
    );
  });
});
