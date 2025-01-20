import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { Button } from "../../button/Button.js";
import { render, screen } from "../../test-utils/index.js";
import { CardHeader } from "../CardHeader.js";
import { CardSubtitle } from "../CardSubtitle.js";
import { CardTitle } from "../CardTitle.js";

describe("CardHeader", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "header",
      ref,
      children: "Header",
    } as const;
    const { rerender } = render(<CardHeader {...props} />);

    const header = screen.getByTestId("header");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(header);
    expect(header).toMatchSnapshot();

    rerender(
      <CardHeader
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(header).toMatchSnapshot();

    const contentRef = createRef<HTMLDivElement>();
    rerender(
      <CardHeader
        {...props}
        contentProps={{
          ref: contentRef,
          style: { color: "orange" },
          className: "custom-class-name",
        }}
      />
    );
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(header).toMatchSnapshot();
  });

  it("should allow addons before and after the children", () => {
    render(
      <CardHeader
        data-testid="header"
        beforeAddon={<img src="/some-image.png" alt="" />}
        afterAddon={
          <Button buttonType="icon" aria-label="Expand" theme="clear" />
        }
      >
        <CardTitle>Elizabeth Park</CardTitle>
        <CardSubtitle>Work contact</CardSubtitle>
      </CardHeader>
    );

    const header = screen.getByTestId("header");
    expect(header).toMatchSnapshot();
  });
});
