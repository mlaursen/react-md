import { describe, expect, it } from "@jest/globals";
import { type ReactElement } from "react";

import { render, screen } from "../test-utils/index.js";
import { useEnsuredId } from "../useEnsuredId.js";

function Test(props: { id?: string }): ReactElement {
  return <div data-testid="test" id={useEnsuredId(props.id, "test")} />;
}

describe("useEnsuredId", () => {
  it("should return the propId if it is defined", () => {
    render(<Test id="my-test-id" />);
    const test = screen.getByTestId("test");

    expect(test).toHaveAttribute("id", "my-test-id");
  });

  it("should return an auto-generated id with the component name prefixed", () => {
    render(<Test />);
    const test = screen.getByTestId("test");

    expect(test.id).toMatch(/^test-.+$/);
  });
});
