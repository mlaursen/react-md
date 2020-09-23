import React from "react";
import { render } from "@testing-library/react";
import { create } from "react-test-renderer";

import { DialogTitle } from "../DialogTitle";

describe("DialogTitle", () => {
  it("should render correctly", () => {
    const { container } = render(<DialogTitle>Title</DialogTitle>);
    const title = container.querySelector("h2") as HTMLHeadingElement;

    expect(title).not.toBeNull();
    expect(title.className).toBe("rmd-dialog__title");
    expect(title.textContent).toBe("Title");
  });

  it("should render correctly (with snapshots)", () => {
    expect(
      create(<DialogTitle>Title 1</DialogTitle>).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <DialogTitle>
          <span>Some content</span>
        </DialogTitle>
      ).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <DialogTitle>
          <button type="button">Click Me</button>
        </DialogTitle>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
