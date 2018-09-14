import * as React from "react";
import * as renderer from "react-test-renderer";

import DefaultTreeItemRenderer from "../DefaultTreeItemRenderer";

const BASE_PROPS = {
  depth: 1,
  listSize: 1,
  itemIndex: 1,
  selected: false,
  expanded: false,
  updateTreeItems: () => undefined,
};

// TODO: write more tests when enzyme supports new React context api
describe("DefaultTreeItemRenderer", () => {
  it("should render correctly with the provided props", () => {
    expect(
      renderer.create(<DefaultTreeItemRenderer {...BASE_PROPS}>Content!</DefaultTreeItemRenderer>).toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...BASE_PROPS} expanded={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...BASE_PROPS} selected={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...BASE_PROPS} expanded={true} selected={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("should render correctly as a link with the provided props", () => {
    const props = { ...BASE_PROPS, href: "/" };
    expect(
      renderer.create(<DefaultTreeItemRenderer {...props}>Content!</DefaultTreeItemRenderer>).toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...props} expanded={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...props} selected={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();

    expect(
      renderer
        .create(
          <DefaultTreeItemRenderer {...props} expanded={true} selected={true}>
            Content!
          </DefaultTreeItemRenderer>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
