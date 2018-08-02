import * as React from "react";
import renderer from "react-test-renderer";
import { HomeSVGIcon } from "@react-md/material-icons";

import TreeItemContent from "../TreeItemContent";

// TODO: write more tests when enzyme supports new React context api
describe("TreeItemContent", () => {
  it("should render correctly with the provided props", () => {
    expect(renderer.create(<TreeItemContent>Content!</TreeItemContent>).toJSON()).toMatchSnapshot();
    expect(
      renderer.create(<TreeItemContent leftIcon={<HomeSVGIcon />}>Content with icon</TreeItemContent>).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer.create(<TreeItemContent rightIcon={<HomeSVGIcon />}>Content with icon</TreeItemContent>).toJSON()
    ).toMatchSnapshot();
  });
});
