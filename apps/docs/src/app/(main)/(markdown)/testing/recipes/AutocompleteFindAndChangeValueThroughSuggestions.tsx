import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import SimpleExample from "@/components/autocomplete/SimpleExample.js";

describe("SimpleExample", () => {
  it("should be able to quickly change the value by clicking a suggestion", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleExample />);

    const autocomplete = screen.getByRole("combobox", { name: "Fruit" });
    expect(autocomplete).toHaveValue("");

    await user.click(autocomplete);
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(autocomplete).toHaveValue("Apple");
  });

  // this is a more verbose test
  it("should be able to change the value by clicking a suggestion", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleExample />);

    const autocomplete = screen.getByRole("combobox", { name: "Fruit" });
    expect(autocomplete).toHaveValue("");

    // these aren't required, but just helps show some of the state
    // - the autocomplete listbox is currently not visible
    // - there are no keyboard focused items
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
    expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
    expect(() => screen.getByRole("listbox")).toThrow();

    await user.type(autocomplete, "a");

    // the listbox should now be visible and displaying the filtered suggestions
    const listbox = screen.getByRole("listbox", { name: "Fruits" });

    // this could also be \`within(listbox).getAllByRole("option")\` if needed
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);

    const [apple, apricot] = options;
    expect(apple).toHaveTextContent("Apple");
    expect(apricot).toHaveTextContent("Apricot");

    await user.click(apricot);
    expect(autocomplete).toHaveValue("Apricot");

    // these aren't required, but showing that the listbox as been removed
    // along with the suggestions
    expect(listbox).not.toBeInTheDocument();
    expect(apple).not.toBeInTheDocument();
    expect(apricot).not.toBeInTheDocument();
  });
});
`;

export default function AutocompleteFindAndChangeValueThroughSuggestions(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
