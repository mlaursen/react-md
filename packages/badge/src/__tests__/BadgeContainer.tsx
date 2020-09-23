import React from "react";
import { render } from "@testing-library/react";
import { Button } from "@react-md/button";

import { BadgeContainer } from "../BadgeContainer";
import { Badge } from "../Badge";

describe("BadgeContainer", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(
      <BadgeContainer>
        <Badge id="badge" />
      </BadgeContainer>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <BadgeContainer className="custom-badged-button">
        <Button
          id="custom-badged-button"
          aria-describedby="custom-badged-button-badge"
          buttonType="icon"
        >
          <i className="material-icons">notification</i>
        </Button>
        <Badge id="custom-badged-button-badge">8</Badge>
      </BadgeContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
