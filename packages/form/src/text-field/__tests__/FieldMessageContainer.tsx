import React from "react";
import { render } from "@testing-library/react";

import { FieldMessageContainer } from "../FieldMessageContainer";
import { TextField } from "../TextField";

describe("FieldMessageContainer }", () => {
  it("should only return the children if there are no message props", () => {
    const { container, rerender } = render(
      <FieldMessageContainer>
        <TextField id="text-field" />
      </FieldMessageContainer>
    );

    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toContain(
      "rmd-text-field-container"
    );

    rerender(
      <FieldMessageContainer messageProps={{ id: "text-field-message" }}>
        <TextField id="text-field" />
      </FieldMessageContainer>
    );
    expect(container.firstElementChild?.className).toContain(
      "rmd-field-message-container"
    );
  });
});
