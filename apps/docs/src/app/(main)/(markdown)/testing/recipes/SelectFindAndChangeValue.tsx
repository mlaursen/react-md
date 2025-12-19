import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import SimpleSelect from "@/components/select/SimpleSelect.js";

describe("SimpleSelect", () => {
  it("should be able to change value", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleSelect />);

    // this is the clickable element that allows the listbox of options to appear
    const select = screen.getByRole("combobox", { name: "Label" });
    // this stores the current value
    const selectInput = screen.getByRole("textbox", { hidden: true });
    expect(selectInput).toHaveValue("");

    await user.click(select);
    // the \`name\` should be the accessible text in any of the available options
    await user.click(screen.getByRole("option", { name: "Option 1" }));
    expect(selectInput).toHaveValue("a");

    await user.click(select);

    // the \`Option 1\` should now be selected
    expect(() =>
      screen.getByRole("option", { name: "Option 1", selected: true })
    ).not.toThrow();
  });
});
`;

export default function SelectFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
