import * as React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";

import TextContainer from "../TextContainer";

describe("TextContainer", () => {
  it("should render as a div by default", () => {
    const container = mount(<TextContainer />);

    expect(container.find("div").length).toBe(1);
  });

  it("should be able to render as a string component prop", () => {
    const component = "section";
    const container = mount(<TextContainer component={component} />);

    expect(container.find(component).length).toBe(1);
  });

  it("should be able to render as a functional component", () => {
    const Component = ({ className, children }: any) => (
      <section className={`${className} custom`}>{children}</section>
    );

    const container = mount(
      <TextContainer component={Component}>Hello, world!</TextContainer>
    );
    expect(container.find(Component).length).toBe(1);
    expect(container.render()).toMatchSnapshot();
  });

  it("should be able to render as a class component", () => {
    class Component extends React.Component<any> {
      public render() {
        const { children, className } = this.props;
        return <section className={`${className} custom`}>{children}</section>;
      }
    }

    const container = mount(
      <TextContainer component={Component}>Hello, world!</TextContainer>
    );
    expect(container.find(Component).length).toBe(1);
    expect(container.render()).toMatchSnapshot();
  });

  it("should default to the auto suffix for the rmd-text-container className", () => {
    const container = mount(<TextContainer />);

    expect(container.find("div").hasClass("rmd-text-container")).toBe(true);
    expect(container.find("div").hasClass("rmd-text-container--auto")).toBe(
      true
    );

    container.setProps({ size: "mobile" });
    expect(container.find("div").hasClass("rmd-text-container")).toBe(true);
    expect(container.find("div").hasClass("rmd-text-container--mobile")).toBe(
      true
    );

    container.setProps({ size: "desktop" });
    expect(container.find("div").hasClass("rmd-text-container")).toBe(true);
    expect(container.find("div").hasClass("rmd-text-container--desktop")).toBe(
      true
    );
  });

  it("should correctly merge the prop className", () => {
    const className = "test-class-name";
    const container = mount(<TextContainer className={className} />);

    expect(container.find("div").hasClass("rmd-text-container")).toBe(true);
    expect(container.find("div").hasClass("rmd-text-container--auto")).toBe(
      true
    );
    expect(container.find("div").hasClass(className)).toBe(true);
  });

  it("should be able to use a children render function", () => {
    expect(
      create(
        <TextContainer>
          {({ className }) => (
            <span className={`${className} span`}>Content</span>
          )}
        </TextContainer>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
