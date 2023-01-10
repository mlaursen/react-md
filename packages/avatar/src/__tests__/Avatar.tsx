import { render } from "@testing-library/react";
import { createRef } from "react";

import { Avatar } from "../Avatar";
import { avatarImage } from "../styles";

describe("Avatar", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      "data-testid": "avatar",
      ref,
    } as const;

    const { getByTestId, rerender } = render(<Avatar {...props} />);
    const avatar = getByTestId("avatar");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(avatar);
    expect(avatar).toMatchSnapshot();

    rerender(
      <Avatar
        {...props}
        style={{ color: "red" }}
        className="custom-class-name"
      />
    );
    expect(avatar).toMatchSnapshot();

    rerender(<Avatar {...props} color="primary" />);
    expect(avatar).toMatchSnapshot();
  });

  it("should render an img if a src or imgProps are provided", () => {
    const props = {
      "data-testid": "avatar",
      src: "/some-image.png",
    } as const;
    const { getByTestId, getByRole, rerender } = render(<Avatar {...props} />);

    const avatar = getByTestId("avatar");
    const img = getByRole("img");
    expect(img).toHaveAttribute("src", props.src);
    expect(img).toHaveAttribute("alt", "");
    expect(avatar).toMatchSnapshot();

    rerender(<Avatar {...props} referrerPolicy="no-referrer" />);
    expect(img).toHaveAttribute("referrerPolicy", "no-referrer");
    expect(avatar).toMatchSnapshot();

    const ref = createRef<HTMLImageElement>();
    rerender(
      <Avatar
        {...props}
        imgProps={{
          ref,
          src: "/another-image.png",
          style: { opacity: 0.5 },
          className: "custom-class-name",
        }}
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
    expect(ref.current).toBe(img);
    expect(img).toHaveAttribute("src", "/another-image.png");
    expect(avatar).toMatchSnapshot();
  });

  describe("styling utils", () => {
    it("should allow the avatarImage to be called without any parameters", () => {
      expect(avatarImage()).toMatchSnapshot();
    });
  });
});
