import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import {
  getSelectTestElements,
  rmdRender,
  screen,
  userEvent,
} from "@react-md/core/test-utils";

import SimpleSelect from "@/components/select/SimpleSelect.jsx";

describe("SimpleSelect", () => {
  it("should be able to verify the display value", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleSelect />);

    const { select, selectInput, selectedOption } = getSelectTestElements({
      name: "Label",
    });
    // this isn't required, but added to show what element this is
    expect(selectedOption).toHaveClass("rmd-selected-option");

    // there is currently no selected value
    expect(selectedOption).toHaveTextContent("");

    await user.click(select);
    await user.click(screen.getByRole("option", { name: "Option 1" }));
    expect(selectInput).toHaveValue("a");
    expect(selectedOption).toHaveTextContent("Option 1");
  });
});
`;

export default function SelectVerifyTheDisplayValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
