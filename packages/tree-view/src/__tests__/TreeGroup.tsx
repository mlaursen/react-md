import * as React from "react";
import renderer from "react-test-renderer";

import TreeGroup from "../TreeGroup";

// TODO: Write more tests once enzyme supports the new react context API.
describe("TreeGroup", () => {
  it("should render correctly with the provided props", () => {
    expect(
      renderer
        .create(
          <TreeGroup expanded={false}>
            <li>Something!</li>
          </TreeGroup>
        )
        .toJSON(`null`)
    ).toMatchSnapshot();
    expect(
      renderer
        .create(
          <TreeGroup expanded={true}>
            <li>Something!</li>
          </TreeGroup>
        )
        .toJSON(`null`)
    ).toMatchSnapshot();
  });
});
