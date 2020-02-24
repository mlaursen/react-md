import React from "react";
import { cnb } from "cnbuilder";
import { render } from "@testing-library/react";

import TextContainer from "../TextContainer";

describe("TextContainer", () => {
  it("should render as a div by default", () => {
    const { getByTestId } = render(<TextContainer data-testid="container" />);
    const container = getByTestId("container");
    expect(container.tagName).toBe("DIV");
    expect(getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render as a string component prop", () => {
    const component = "section";
    const { getByTestId } = render(
      <TextContainer data-testid="container" component={component} />
    );

    const container = getByTestId("container");
    expect(container.tagName).toBe("SECTION");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render as a functional component", () => {
    const Component = ({ className, children }: any) => (
      <section data-testid="container" className={`${className} custom`}>
        {children}
      </section>
    );

    const { getByTestId } = render(
      <TextContainer component={Component}>Hello, world!</TextContainer>
    );
    const container = getByTestId("container");
    expect(container.tagName).toBe("SECTION");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render as a class component", () => {
    class Component extends React.Component<any> {
      public render() {
        const { children, className } = this.props;
        return (
          <section data-testid="container" className={`${className} custom`}>
            {children}
          </section>
        );
      }
    }

    const { getByTestId } = render(
      <TextContainer component={Component}>Hello, world!</TextContainer>
    );
    const container = getByTestId("container");
    expect(container.tagName).toBe("SECTION");
    expect(container).toMatchSnapshot();
  });

  it("should be able to use a children render function", () => {
    const { container } = render(
      <TextContainer>
        {({ className }) => (
          <span className={cnb("span", className)}>Content</span>
        )}
      </TextContainer>
    );
    expect(container).toMatchSnapshot();
  });

  it("should default to the auto suffix for the rmd-text-container className", () => {
    const { getByTestId, rerender } = render(
      <TextContainer data-testid="container" />
    );
    const container = getByTestId("container");
    expect(container.className).toBe(
      "rmd-text-container rmd-text-container--auto"
    );

    rerender(<TextContainer data-testid="container" size="mobile" />);
    expect(container.className).toBe(
      "rmd-text-container rmd-text-container--mobile"
    );

    rerender(<TextContainer data-testid="container" size="desktop" />);
    expect(container.className).toBe(
      "rmd-text-container rmd-text-container--desktop"
    );
  });

  it("should correctly merge the prop className", () => {
    const { getByTestId } = render(
      <TextContainer data-testid="container" className="test-class-name" />
    );
    const container = getByTestId("container");
    expect(container.className).toBe(
      "rmd-text-container rmd-text-container--auto test-class-name"
    );
  });
});
