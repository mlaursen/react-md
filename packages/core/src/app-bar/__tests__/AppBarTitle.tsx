import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";
import { AppBarTitle } from "../AppBarTitle.js";
import { appBarTitle } from "../styles.js";

describe("AppBarTitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const { rerender } = render(<AppBarTitle ref={ref}>Title</AppBarTitle>);

    const title = screen.getByRole("heading", { name: "Title" });
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(title);
    expect(title).toMatchSnapshot();

    rerender(
      <AppBarTitle style={{ color: "aqua" }} className="custom-class-name">
        Title
      </AppBarTitle>
    );
    expect(title).toMatchSnapshot();

    rerender(<AppBarTitle keyline="nav">Title</AppBarTitle>);
    expect(title).toMatchSnapshot();

    rerender(<AppBarTitle keyline="list">Title</AppBarTitle>);
    expect(title).toMatchSnapshot();

    rerender(<AppBarTitle textOverflow="allow">Title</AppBarTitle>);
    expect(title).toMatchSnapshot();
  });

  describe("styling utils", () => {
    it("should be callable without any arguments", () => {
      expect(appBarTitle()).toMatchSnapshot();
    });
  });
});
