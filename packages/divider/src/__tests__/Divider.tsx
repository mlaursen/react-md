import React from "react";
import { render } from "@testing-library/react";

import { Divider } from "../Divider";

describe("Divider", () => {
  it("should render as an hr by default", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).not.toBeNull();
  });

  it("should render as a div when the vertical prop is enabled", () => {
    const { container } = render(<Divider vertical />);
    expect(container.querySelector("hr")).toBeNull();
    expect(container.querySelector("div")).not.toBeNull();
  });

  it("should apply the rmd-divider className for both horizontal and vertical dividers", () => {
    const { container, rerender } = render(<Divider />);
    expect(container.querySelector(".rmd-divider")).not.toBeNull();

    rerender(<Divider vertical />);
    expect(container.querySelector(".rmd-divider")).not.toBeNull();
  });

  it("should correctly apply the inset and vertical class names", () => {
    const { container, rerender } = render(<Divider />);
    const getClassName = () =>
      (container.querySelector(".rmd-divider") as HTMLElement).className;

    expect(getClassName()).toBe("rmd-divider");

    rerender(<Divider className="my-divider" />);
    expect(getClassName()).toBe("rmd-divider my-divider");

    rerender(<Divider vertical />);
    expect(getClassName()).toBe("rmd-divider rmd-divider--vertical");

    rerender(<Divider inset />);
    expect(getClassName()).toBe("rmd-divider rmd-divider--inset");

    rerender(<Divider inset vertical />);
    expect(getClassName()).toBe("rmd-divider rmd-divider--vertical");

    rerender(<Divider inset vertical className="my-divider" />);
    expect(getClassName()).toBe("rmd-divider rmd-divider--vertical my-divider");
  });

  it("should render correctly (with snapshots)", () => {
    const { container, rerender } = render(<Divider />);

    expect(container).toMatchSnapshot();

    rerender(<Divider id="divider-id" />);
    expect(container).toMatchSnapshot();
  });
});
