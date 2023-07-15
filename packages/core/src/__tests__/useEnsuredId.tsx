import type { ReactElement } from "react";
import { render } from "../test-utils";

import { useEnsuredId } from "../useEnsuredId";

function Test(props: { id?: string }): ReactElement {
  return <div data-testid="test" id={useEnsuredId(props.id, "test")} />;
}

describe("useEnsuredId", () => {
  it("should return the propId if it is defined", () => {
    const { getByTestId } = render(<Test id="my-test-id" />);
    const test = getByTestId("test");

    expect(test).toHaveAttribute("id", "my-test-id");
  });

  it("should return an auto-generated id with the component name prefixed", () => {
    const { getByTestId } = render(<Test />);
    const test = getByTestId("test");

    expect(test.id).toMatch(/^test-.+$/);
  });
});
