import * as React from "react";
import renderer from "react-test-renderer";

import TreeItem from "../TreeItem";

const BASE_PROPS = {
  "aria-level": 1,
  "aria-posinset": 1,
  "aria-setsize": 1,
};

// TODO: Write more tests once enzyme supports the new react context API.
describe("TreeItem", () => {
  it("should render correctly with the provided props", () => {
    expect(renderer.create(<TreeItem {...BASE_PROPS}>content</TreeItem>).toJSON()).toMatchSnapshot();
  });
});
