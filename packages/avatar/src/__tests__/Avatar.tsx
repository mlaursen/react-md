import React from "react";
import { render } from "@testing-library/react";

import Avatar from "../Avatar";

describe("Avatar", () => {
  it("should render as a span by default", () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("should apply the rmd-avarar class name", () => {
    const { container } = render(<Avatar />);
    const avatar = container.querySelector("span") as HTMLSpanElement;
    expect(avatar.className).toBe("rmd-avatar");
  });

  it("should use the color prop as a suffix value", () => {
    const { container, rerender } = render(<Avatar color="red" />);
    const getClassName = () =>
      (container.querySelector("span") as HTMLSpanElement).className;
    expect(getClassName()).toBe("rmd-avatar rmd-avatar--red");

    rerender(<Avatar color="blue" />);
    expect(getClassName()).toBe("rmd-avatar rmd-avatar--blue");
  });

  it("should merge in the provided class name", () => {
    const { container, rerender } = render(
      <Avatar color="red" className="custom-class" />
    );
    const getClassName = () =>
      (container.querySelector("span") as HTMLSpanElement).className;
    expect(getClassName()).toBe("rmd-avatar rmd-avatar--red custom-class");

    rerender(<Avatar color="red" className="custom-class names" />);
    expect(getClassName()).toBe(
      "rmd-avatar rmd-avatar--red custom-class names"
    );
  });

  it("should render an img if the src prop is provided", () => {
    const { container, rerender } = render(
      <Avatar src="https://example.com" />
    );
    expect(container.querySelector("img")).not.toBeNull();

    rerender(<Avatar />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("should render an img with an empty alt tag by default", () => {
    const { container } = render(<Avatar src="https://example.com" />);
    const img = container.querySelector("img") as HTMLImageElement;
    expect(img.alt).toBe("");
  });

  it("should apply the rmd-avatar__image class name to the img tag", () => {
    const { container } = render(<Avatar src="https://example.com" />);
    const img = container.querySelector("img") as HTMLImageElement;
    expect(img.className).toBe("rmd-avatar__image");
  });

  it("should render any children within the avatar", () => {
    const { container, rerender } = render(<Avatar>A</Avatar>);
    const getAvatar = () =>
      container.querySelector(".rmd-avatar") as HTMLSpanElement;
    expect(getAvatar().textContent).toBe("A");

    rerender(
      <Avatar>
        <span>A</span>
      </Avatar>
    );
    const span = getAvatar().querySelector("span");
    expect(span).not.toBeNull();
    expect((span as HTMLSpanElement).className).toBe("");
    expect((span as HTMLSpanElement).textContent).toBe("A");
  });
});
