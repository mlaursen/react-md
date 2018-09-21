import * as React from "react";
import * as renderer from "react-test-renderer";

import TreeLinkItem from "../TreeLinkItem";

const BASE_PROPS = {
  "aria-level": 1,
  "aria-posinset": 1,
  "aria-setsize": 1,
  href: "/",
};

describe("TreeLinkItem", () => {
  it("should render correctly with the provided props", () => {
    expect(
      renderer.create(<TreeLinkItem {...BASE_PROPS}>Hello!</TreeLinkItem>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer
        .create(
          <TreeLinkItem {...BASE_PROPS} selected={true}>
            Hello!
          </TreeLinkItem>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
