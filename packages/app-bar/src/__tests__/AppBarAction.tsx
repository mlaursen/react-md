import React from "react";
import { render, cleanup } from "@testing-library/react";

import AppBarAction from "../AppBarAction";

afterEach(cleanup);

describe("AppBarAction", () => {
  it("should default to rendering as a clear icon button", () => {
    const { container } = render(<AppBarAction />);

    const button = container.querySelector(".rmd-button") as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.classList.contains("rmd-button--icon")).toBe(true);
    expect(button.classList.contains("rmd-button--primary")).toBe(false);
    expect(button.classList.contains("rmd-button--secondary")).toBe(false);
    expect(button.classList.contains("rmd-button--warning")).toBe(false);
    expect(button.classList.contains("rmd-button--error")).toBe(false);
  });

  it("should apply the correct class names", () => {
    const { container, rerender } = render(<AppBarAction />);
    const getClassList = () =>
      (container.querySelector(".rmd-button") as HTMLButtonElement).classList;
    let classList = getClassList();
    expect(classList.contains("rmd-app-bar__action")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--first")).toBe(false);
    expect(classList.contains("rmd-app-bar__action--last")).toBe(false);

    rerender(<AppBarAction first />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar__action")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--first")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--last")).toBe(false);

    rerender(<AppBarAction last />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar__action")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--first")).toBe(false);
    expect(classList.contains("rmd-app-bar__action--last")).toBe(true);

    rerender(<AppBarAction first last />);
    classList = getClassList();
    expect(classList.contains("rmd-app-bar__action")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--first")).toBe(true);
    expect(classList.contains("rmd-app-bar__action--last")).toBe(true);
  });
});
