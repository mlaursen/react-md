import React, { createRef } from "react";
import { render } from "@testing-library/react";

import { Avatar } from "../Avatar";

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

  it("should render correctly (with snapshots)", () => {
    const { container, rerender } = render(<Avatar>A</Avatar>);

    expect(container).toMatchSnapshot();

    rerender(<Avatar color="red">A</Avatar>);
    expect(container).toMatchSnapshot();

    rerender(<Avatar color="red" src="https://example.com" />);
    expect(container).toMatchSnapshot();
  });

  it("should pass the referrerPolicy to the img element when the src prop was provided", () => {
    const { getByAltText, rerender } = render(
      <Avatar referrerPolicy="no-referrer">A</Avatar>
    );

    expect(() => getByAltText("")).toThrow();

    rerender(<Avatar referrerPolicy="no-referrer" src="https://example.com" />);
    const img = getByAltText("");
    expect(img).toHaveAttribute("referrerpolicy", "no-referrer");
  });

  it("should render an img element if the imgProps are provided", () => {
    const imgProps = { src: "https://example.com" };
    const { getByAltText } = render(<Avatar imgProps={imgProps} />);

    expect(getByAltText("")).not.toBeNull();
  });

  it('should correctly merge the imgProps with the "src", "alt", and "referrerPolicy" props', () => {
    const props = {
      src: "https://example.com",
      alt: "",
      referrerPolicy: "no-referrer" as const,
      imgProps: {
        alt: "An Image",
        className: "custom",
        referrerPolicy: "origin" as const,
      },
    };

    const { getByAltText } = render(<Avatar {...props} />);
    const img = getByAltText("An Image");

    expect(img).toHaveAttribute("src", props.src);
    expect(img.className).toContain("custom");
    expect(img).toHaveAttribute("referrerpolicy", "origin");
  });

  it("should allow for a ref to be passed to the img element with the imgProps", () => {
    const ref = createRef<HTMLImageElement>();
    render(<Avatar src="https://example.com" imgProps={{ ref }} />);

    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});
