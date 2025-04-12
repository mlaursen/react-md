import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import {
  fireEvent,
  rmdRender,
  screen,
  userEvent,
} from "@react-md/core/test-utils";

import SimpleExample from "@/components/autocomplete/SimpleExample.jsx";

describe("SimpleExample", () => {
  it("should be able to change the value", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleExample />);

    const autocomplete = screen.getByRole("combobox", { name: "Fruit" });
    expect(autocomplete).toHaveValue("");

    await user.type(autocomplete, "Apple");
    expect(autocomplete).toHaveValue("Apple");

    // or fireEvent
    fireEvent.change(autocomplete, { target: { value: "Orange" } });
    expect(autocomplete).toHaveValue("Orange");
  });
});
`;

export default function AutocompleteFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
