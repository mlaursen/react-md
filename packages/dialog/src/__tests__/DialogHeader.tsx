import React from "react";
import { cleanup, render } from "react-testing-library";
import { create } from "react-test-renderer";

import DialogHeader from "../DialogHeader";
import DialogTitle from "../DialogTitle";

afterEach(cleanup);

describe("DialogHeader", () => {
  it("should render correctly", () => {
    const { container } = render(<DialogHeader>Content</DialogHeader>);
    const header = container.querySelector("header") as HTMLElement;

    expect(header).not.toBeNull();
    expect(header.className).toBe("rmd-dialog__header");
    expect(header.textContent).toBe("Content");
  });

  it("should render correctly (with snapshots)", () => {
    expect(
      create(<DialogHeader>Content</DialogHeader>).toJSON()
    ).toMatchSnapshot();
    expect(
      create(<DialogHeader id="dialog-header">Content</DialogHeader>).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <DialogHeader id="dialog-header">
          <button id="dialog-close" type="button">
            Close
          </button>
          <DialogTitle id="dialog-title">Title</DialogTitle>
        </DialogHeader>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
