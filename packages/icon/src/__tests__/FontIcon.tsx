import * as React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";

import FontIcon from "../FontIcon";

describe("FontIcon", () => {
  it("should use render as an <i> tag", () => {
    const icon = mount(<FontIcon>home</FontIcon>);

    expect(icon.find("i").length).toBe(1);
  });

  it("should render correctly", () => {
    expect(create(<FontIcon>home</FontIcon>).toJSON()).toMatchSnapshot();
    expect(
      create(<FontIcon iconClassName="fa fa-github" />).toJSON()
    ).toMatchSnapshot();
  });

  it("should apply the correct class names", () => {
    const icon = mount(<FontIcon />);

    expect(icon.find("i").hasClass("rmd-icon")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--font")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--dense")).toBe(false);
    expect(icon.find("i").hasClass("material-icons")).toBe(true);
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ className: "test-thing", dense: true });
    expect(icon.find("i").hasClass("rmd-icon")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--font")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--dense")).toBe(true);
    expect(icon.find("i").hasClass("material-icons")).toBe(true);
    expect(icon.find("i").hasClass("test-thing")).toBe(true);
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ iconClassName: "fa fa-github" });
    expect(icon.find("i").hasClass("rmd-icon")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--font")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon--dense")).toBe(true);
    expect(icon.find("i").hasClass("material-icons")).toBe(false);
    expect(icon.find("i").hasClass("test-thing")).toBe(true);
    expect(icon.find("i").hasClass("fa")).toBe(true);
    expect(icon.find("i").hasClass("fa-github")).toBe(true);
    expect(icon.render()).toMatchSnapshot();
  });
});
