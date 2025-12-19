import { screen, within } from "@testing-library/dom";

import { type GetPartsByRoleOptions } from "./types.js";

/**
 * @since 6.0.0
 */
export interface SelectTestElements {
  /**
   * The element that should be interacted with for showing and hiding the
   * listbox of available options in the `Select`.
   */
  select: HTMLDivElement;

  /**
   * The input element storing the current value for the `Select`. This should
   * be used to verify a specific option has been selected and will be the
   * `Option`'s `value` prop.
   *
   * i.e. Selecting `<Option value="a">Option 1</Option>` -> `selectInput`
   * would have value `"a"`.
   */
  selectInput: HTMLInputElement;

  /**
   * The current selected option that is shown in the `Select` underneath the
   * floating label. This should be used if the selected option label needs to
   * be verified instead of the value.
   *
   * i.e. Selecting `<Option value="a">Option 1</Option>` -> `selectedOption`
   * would have text content `"Option 1"`.
   */
  selectedOption: HTMLDivElement;
}

/**
 * @example Simple Example
 * ```tsx
 * import {
 *   getSelectTestElements,
 *   screen,
 *   rmdRender,
 *   userEvent,
 * } from "@react-md/core/test-utils";
 *
 * it("should be able to verify the display value", async () => {
 *   const user = userEvent.setup();
 *   rmdRender(<SimpleSelect />);
 *
 *   const { select, selectInput, selectedOption } = getSelectTestElements({
 *     name: "Label",
 *   });
 *   // this isn't required, but added to show what element this is
 *   expect(selectedOption).toHaveClass("rmd-selected-option");
 *
 *   // there is currently no selected value
 *   expect(selectedOption).toHaveTextContent("");
 *
 *   await user.click(select);
 *   await user.click(screen.getByRole("option", { name: "Option 1" }));
 *   expect(selectInput).toHaveValue("a");
 *   expect(selectedOption).toHaveTextContent("Option 1");
 * });
 * ```
 *
 * @since 6.0.0
 */
export function getSelectTestElements(
  options: GetPartsByRoleOptions
): SelectTestElements {
  const { container = screen, ...byRoleOptions } = options;
  const select = container.getByRole<HTMLDivElement>("combobox", byRoleOptions);
  const selectInput = within(select).getByRole<HTMLInputElement>("textbox", {
    hidden: true,
  });
  const selectedOption = select.firstElementChild;
  if (!(selectedOption instanceof HTMLDivElement)) {
    throw new TypeError("Unable to find the `Select` selected option element");
  }

  return {
    select,
    selectInput,
    selectedOption,
  };
}

/**
 * @see {@link getSelectTestElements}
 * @since 6.0.0
 */
export async function findSelectTestElements(
  options: GetPartsByRoleOptions
): Promise<SelectTestElements> {
  const { container = screen, ...byRoleOptions } = options;
  const select = await container.findByRole<HTMLDivElement>(
    "combobox",
    byRoleOptions
  );
  const selectInput = await within(select).findByRole<HTMLInputElement>(
    "textbox",
    {
      hidden: true,
    }
  );
  const selectedOption = select.firstElementChild;
  if (!(selectedOption instanceof HTMLDivElement)) {
    throw new TypeError("Unable to find the `Select` selected option element");
  }

  return {
    select,
    selectInput,
    selectedOption,
  };
}
