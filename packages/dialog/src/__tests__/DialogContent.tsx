import React from "react";
import { render } from "@testing-library/react";
import { create } from "react-test-renderer";

import { DialogContent } from "../DialogContent";

describe("DialogContent", () => {
  it("should render correctly", () => {
    const { container } = render(
      <DialogContent>Some dialog content</DialogContent>
    );
    const content = container.querySelector("div") as HTMLDivElement;

    expect(content).not.toBeNull();
    expect(content.textContent).toBe("Some dialog content");
    expect(content.className).toContain("rmd-dialog__content");
  });

  it("should render correctly (with snapshots)", () => {
    expect(
      create(
        <DialogContent id="content-1">Some dialog content</DialogContent>
      ).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <DialogContent id="content-2" disablePadding>
          Some dialog content
        </DialogContent>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
