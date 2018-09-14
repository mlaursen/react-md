import * as React from "react";
import * as renderer from "react-test-renderer";
import { SVGIcon, ISVGIconProps } from "@react-md/icon";

import TreeItemContent from "../TreeItemContent";

const HomeSVGIcon: React.SFC<ISVGIconProps> = props => (
  <SVGIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SVGIcon>
);

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
