import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render } from "../../test-utils/index.js";

import { appBarTitle, AppBarTitle } from "../AppBarTitle.js";

describe("AppBarTitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const { getByRole, rerender } = render(
      <AppBarTitle ref={ref}>Title</AppBarTitle>
    );

    const title = getByRole("heading", { name: "Title" });
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

    rerender(<AppBarTitle lineWrap>Title</AppBarTitle>);
    expect(title).toMatchSnapshot();
  });

  describe("styling utils", () => {
    it("should be callable without any arguments", () => {
      expect(appBarTitle()).toMatchSnapshot();
    });
  });
});
