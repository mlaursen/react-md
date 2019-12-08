import React from "react";
import { render } from "@testing-library/react";

import AppBar from "../AppBar";

describe("AppBar", () => {
  it("should render as a header element by default", () => {
    const { container } = render(<AppBar />);
    expect(container.querySelector("header")).not.toBeNull();
  });

  it("should be able to render as another component", () => {
    const { container, rerender } = render(<AppBar component="div" />);
    const find = () => container.querySelector(".rmd-app-bar") as HTMLElement;
    expect(find().tagName).toBe("DIV");

    rerender(<AppBar component="header" />);
    expect(find().tagName).toBe("HEADER");

    rerender(<AppBar component="section" />);
    expect(find().tagName).toBe("SECTION");
  });

  it("should apply the primary theme by default", () => {
    const { container } = render(<AppBar />);
    const appBar = container.querySelector("header") as HTMLDivElement;
    expect(appBar.classList.contains("rmd-app-bar--primary")).toBe(true);
  });

  it("should apply the correct theme class name", () => {
    const { container, rerender } = render(<AppBar />);
    const getAppBar = () => container.querySelector("header") as HTMLDivElement;
    const getClassList = () => getAppBar().classList;
    let classList = getClassList();
    expect(classList.contains("rmd-app-bar--primary")).toBe(true);

    rerender(<AppBar theme="primary" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--primary")).toBe(true);
    expect(classList.contains("rmd-app-bar--secondary")).toBe(false);
    expect(classList.contains("rmd-app-bar--default")).toBe(false);

    rerender(<AppBar theme="secondary" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--primary")).toBe(false);
    expect(classList.contains("rmd-app-bar--secondary")).toBe(true);
    expect(classList.contains("rmd-app-bar--default")).toBe(false);

    rerender(<AppBar theme="default" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--primary")).toBe(false);
    expect(classList.contains("rmd-app-bar--secondary")).toBe(false);
    expect(classList.contains("rmd-app-bar--default")).toBe(true);

    // clear adds no additional classes
    rerender(<AppBar theme="clear" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--primary")).toBe(false);
    expect(classList.contains("rmd-app-bar--secondary")).toBe(false);
    expect(classList.contains("rmd-app-bar--default")).toBe(false);
    expect(getAppBar().className).toBe("rmd-app-bar");
  });

  it("should apply the correct dense and prominent class names", () => {
    const { container, rerender } = render(<AppBar />);
    const getClassList = () =>
      (container.querySelector("header") as HTMLDivElement).classList;
    let classList = getClassList();
    expect(classList.contains("rmd-app-bar--dense")).toBe(false);
    expect(classList.contains("rmd-app-bar--prominent")).toBe(false);
    expect(classList.contains("rmd-app-bar--prominent-dense")).toBe(false);

    rerender(<AppBar dense />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--dense")).toBe(true);
    expect(classList.contains("rmd-app-bar--prominent")).toBe(false);
    expect(classList.contains("rmd-app-bar--prominent-dense")).toBe(false);

    rerender(<AppBar prominent />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--dense")).toBe(false);
    expect(classList.contains("rmd-app-bar--prominent")).toBe(true);
    expect(classList.contains("rmd-app-bar--prominent-dense")).toBe(false);

    rerender(<AppBar prominent dense />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--dense")).toBe(false);
    expect(classList.contains("rmd-app-bar--prominent")).toBe(true);
    expect(classList.contains("rmd-app-bar--prominent-dense")).toBe(true);
  });

  it("should default to enabling the fixed elevation class and top classes when fixed is enabled", () => {
    const { container } = render(<AppBar fixed />);
    const getClassList = () =>
      (container.querySelector("header") as HTMLDivElement).classList;
    const classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(true);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(true);
    expect(classList.contains("rmd-app-bar--top")).toBe(true);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(false);
  });

  it("should apply the correct fixed class names", () => {
    const { container, rerender } = render(<AppBar />);
    const getClassList = () =>
      (container.querySelector("header") as HTMLDivElement).classList;
    let classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(false);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(false);
    expect(classList.contains("rmd-app-bar--top")).toBe(false);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(false);

    rerender(<AppBar fixedPosition="bottom" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(false);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(false);
    expect(classList.contains("rmd-app-bar--top")).toBe(false);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(false);

    rerender(<AppBar fixed fixedPosition="bottom" />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(true);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(true);
    expect(classList.contains("rmd-app-bar--top")).toBe(false);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(true);

    rerender(<AppBar fixed fixedPosition="top" fixedElevation={false} />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(true);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(false);
    expect(classList.contains("rmd-app-bar--top")).toBe(true);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(false);

    rerender(<AppBar fixed fixedPosition="bottom" fixedElevation={false} />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar--fixed")).toBe(true);
    expect(classList.contains("rmd-app-bar--fixed-elevation")).toBe(false);
    expect(classList.contains("rmd-app-bar--top")).toBe(false);
    expect(classList.contains("rmd-app-bar--bottom")).toBe(true);
  });

  it("should render children correctly", () => {
    const { container } = render(
      <AppBar>
        <h3>Hello</h3>
      </AppBar>
    );
    expect(container.querySelector("h3")).not.toBeNull();
  });
});
