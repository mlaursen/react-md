import { render } from "@testing-library/react";
import { createRef } from "react";

import { appBarTitle, AppBarTitle } from "../AppBarTitle";

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
