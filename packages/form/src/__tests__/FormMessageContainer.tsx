import React from "react";
import { render } from "@testing-library/react";

import { FormMessageContainer } from "../FormMessageContainer";
import { TextField } from "../text-field/TextField";

describe("FormMessageContainer }", () => {
  it("should only return the children if there are no message props", () => {
    const { container, rerender } = render(
      <FormMessageContainer>
        <TextField id="text-field" />
      </FormMessageContainer>
    );

    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toContain(
      "rmd-text-field-container"
    );

    rerender(
      <FormMessageContainer messageProps={{ id: "text-field-message" }}>
        <TextField id="text-field" />
      </FormMessageContainer>
    );
    expect(container.firstElementChild?.className).toContain(
      "rmd-field-message-container"
    );
  });
});
