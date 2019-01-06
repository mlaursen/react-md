import * as React from "react";
import { create } from "react-test-renderer";

import Text, { TextTypes, TextRenderFunction } from "../Text";
import { mount } from "enzyme";

describe("Text", () => {
  it("should render correctly based on type prop", () => {
    const tests: { type: TextTypes; expected: string }[] = [
      { type: "headline-1", expected: "h1" },
      { type: "headline-2", expected: "h2" },
      { type: "headline-3", expected: "h3" },
      { type: "headline-4", expected: "h4" },
      { type: "headline-5", expected: "h5" },
      { type: "headline-6", expected: "h6" },
      { type: "subtitle-1", expected: "h6" },
      { type: "subtitle-2", expected: "h6" },
      { type: "body-1", expected: "p" },
      { type: "body-2", expected: "p" },
      { type: "overline", expected: "span" },
      { type: "button", expected: "button" },
    ];

    tests.forEach(({ type, expected }) => {
      const text = mount(<Text type={type} />);
      expect(text.find(expected).length).toBe(1);
      expect(text.find(expected).hasClass("rmd-typography")).toBe(true);
      expect(text.find(expected).hasClass(`rmd-typography--${type}`)).toBe(
        true
      );
    });

    const text = mount(
      <table>
        <Text type="caption" />
      </table>
    );
    expect(text.find("caption").length).toBe(1);
  });

  it("should default to rendering as a paragraph tag with the body-1 styles", () => {
    const text = mount(<Text />);

    expect(text.find("p").length).toBe(1);
    expect(text.find("p").hasClass("rmd-typography--body-1")).toBe(true);
  });

  it("should be able to render as a string component prop", () => {
    const component = "section";
    const text = mount(<Text component={component} />);
    expect(text.find(component).length).toBe(1);
  });

  it("should be able to render as a functional component", () => {
    const Component = ({ className, children }: any) => (
      <section className={`${className} custom`}>{children}</section>
    );

    const text = mount(<Text component={Component}>Hello, world!</Text>);
    expect(text.find(Component).length).toBe(1);
    expect(text.render()).toMatchSnapshot();
  });

  it("should be able to render as a class component", () => {
    class Component extends React.Component<any> {
      public render() {
        const { children, className } = this.props;
        return <section className={`${className} custom`}>{children}</section>;
      }
    }

    const text = mount(<Text component={Component}>Hello, world!</Text>);
    expect(text.find(Component).length).toBe(1);
    expect(text.render()).toMatchSnapshot();
  });

  it("should be able to use a children render function", () => {
    expect(
      create(
        <Text>
          {({ className }) => (
            <span className={`${className} span`}>Content</span>
          )}
        </Text>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
