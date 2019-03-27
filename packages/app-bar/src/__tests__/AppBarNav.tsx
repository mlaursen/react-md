import React from "react";
import { render, cleanup } from "react-testing-library";

import AppBarNav from "../AppBarNav";

afterEach(cleanup);

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
});
