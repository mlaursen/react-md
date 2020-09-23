import React from "react";
import { render } from "@testing-library/react";

import { ConditionalPortal } from "../ConditionalPortal";

const Test = () => <div data-testid="test" />;

describe("ConditionalPortal", () => {
  it("should render the children in place if none of the portal props are defined", () => {
    const { container, getByTestId } = render(
      <ConditionalPortal>
        <Test />
      </ConditionalPortal>
    );

    const el = getByTestId("test");
    expect(el.parentElement).toBe(container);
  });

  it("should render in the document.body if the portal flag is enabled", () => {
    const { container, getByTestId } = render(
      <ConditionalPortal portal>
        <Test />
      </ConditionalPortal>
    );

    // sanity check
    expect(container).not.toBe(document.body);

    const el = getByTestId("test");
    expect(el.parentElement).toBe(document.body);
  });
});
