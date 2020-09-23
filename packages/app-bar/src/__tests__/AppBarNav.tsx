import React from "react";
import { render } from "@testing-library/react";

import { AppBarNav } from "../AppBarNav";
import { AppBar } from "../AppBar";

describe("AppBarNav", () => {
  it("should default to rendering as a clear icon button", () => {
    const { container } = render(<AppBarNav />);

    const button = container.querySelector(".rmd-button") as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.classList.contains("rmd-button--icon")).toBe(true);
    expect(button.classList.contains("rmd-button--primary")).toBe(false);
    expect(button.classList.contains("rmd-button--secondary")).toBe(false);
    expect(button.classList.contains("rmd-button--warning")).toBe(false);
    expect(button.classList.contains("rmd-button--error")).toBe(false);
  });

  it("should add the rmd-app-bar__nav class name", () => {
    const { container } = render(<AppBarNav />);
    expect(container.querySelector(".rmd-app-bar__nav")).not.toBeNull();
  });

  it("should merge provided class names", () => {
    const { container } = render(<AppBarNav className="custom-class" />);
    const nav = container.querySelector(
      ".rmd-app-bar__nav"
    ) as HTMLButtonElement;
    expect(nav.classList.contains("custom-class")).toBe(true);
  });

  it("should render correctly (with snapshots)", () => {
    const { container, rerender } = render(<AppBarNav />);

    expect(container).toMatchSnapshot();

    rerender(
      <AppBarNav id="app-bar-nav">
        <i className="material-icons">menu</i>
      </AppBarNav>
    );
    expect(container).toMatchSnapshot();
  });

  it("should automatically enable the inherit color state if the parent app bar enables the inheritColor prop", () => {
    const { container, rerender } = render(
      <AppBar inheritColor>
        <AppBarNav />
      </AppBar>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <AppBar inheritColor>
        <AppBarNav inheritColor={false} />
      </AppBar>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <AppBar>
        <AppBarNav />
      </AppBar>
    );
    expect(container).toMatchSnapshot();
  });
});
