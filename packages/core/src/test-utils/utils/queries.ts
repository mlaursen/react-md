import {
  type BoundFunctions,
  type ByRoleOptions,
  type queries,
  screen,
  within,
} from "@testing-library/dom";

/**
 * @since 6.0.0
 */
export interface SelectParts {
  select: HTMLDivElement;
  selectValue: HTMLInputElement;
  selectDisplay: HTMLDivElement;
}

/**
 * @since 6.0.0
 */
export interface GetSelectPartsOptions extends ByRoleOptions {
  /** @defaultValue `screen` */
  container?: BoundFunctions<typeof queries>;
}

/**
 * @example Simple Example
 * ```tsx
 * import {
 *   getSelectParts,
 *   screen,
 *   rmdRender,
 *   userEvent,
 * } from "@react-md/core/test-utils";
 *
 * it("should be able to verify the display value", async () => {
 *   const user = userEvent.setup();
 *   rmdRender(<SimpleSelect />);
 *
 *   const { select, selectValue, selectDisplay } = getSelectParts({
 *     name: "Label",
 *   });
 *   // this isn't required, but added to show what element this is
 *   expect(selectDisplay).toHaveClass("rmd-selected-option");
 *
 *   // there is currently no selected value
 *   expect(selectDisplay).toHaveTextContent("");
 *
 *   await user.click(select);
 *   await user.click(screen.getByRole("option", { name: "Option 1" }));
 *   expect(selectValue).toHaveValue("a");
 *   expect(selectDisplay).toHaveTextContent("Option 1");
 * });
 * ```
 *
 * @since 6.0.0
 */
export function getSelectParts(options: GetSelectPartsOptions): SelectParts {
  const { container = screen, ...byRoleOptions } = options;
  const select = container.getByRole<HTMLDivElement>("combobox", byRoleOptions);
  const selectValue = within(select).getByRole<HTMLInputElement>("textbox", {
    hidden: true,
  });
  const selectDisplay = select.firstElementChild;
  if (!(selectDisplay instanceof HTMLDivElement)) {
    throw new Error("Unable to find the `Select` display value element");
  }

  return {
    select,
    selectValue,
    selectDisplay,
  };
}
