import React from "react";
import { render } from "@testing-library/react";

import { FormThemeOptions, FormThemeProvider } from "../FormThemeProvider";
import { TextField } from "../text-field/TextField";

describe("FormThemeProvider", () => {
  it("should default to the outline theme and left direction", () => {
    function Test(props: FormThemeOptions) {
      return (
        <FormThemeProvider {...props}>
          <TextField id="field" label="Label" />
        </FormThemeProvider>
      );
    }

    const { container, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    rerender(<Test theme="underline" underlineDirection="center" />);
    expect(container).toMatchSnapshot();
  });
});
