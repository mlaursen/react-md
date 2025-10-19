import { cnb } from "cnbuilder";
import { type ReactElement, createRef, useEffect, useState } from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import { type MenuItemProps } from "../../menu/MenuItem.js";
import { fuzzySearch } from "../../searching/fuzzy.js";
import {
  act,
  rmdRender,
  screen,
  userEvent,
  within,
} from "../../test-utils/index.js";
import {
  type RafSpy,
  testImmediateRaf,
} from "../../test-utils/vitest/index.js";
import { SrOnly } from "../../typography/SrOnly.js";
import { Autocomplete } from "../Autocomplete.js";
import {
  defaultAutocompleteFilter,
  noopAutocompleteFilter,
} from "../defaults.js";
import { type AutocompleteProps } from "../types.js";

const ERROR_MESSAGE =
  "`Autocomplete` requires the `getOptionLabel` prop for lists that do not contain strings or known object types.";
const FRUITS = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cranberry",
  "Kiwi",
  "Mango",
  "Orange",
  "Peach",
  "Plum",
  "Strawberry",
];

const OBJECT_LIST = [
  { name: "Apple", value: 1 },
  { name: "Apricot", value: 2 },
  { name: "Banana", value: 3 },
];

const FRUIT_OBJECTS = FRUITS.map((fruit) => ({
  label: fruit,
  value: fruit,
}));

const FRUIT_PROPS = {
  label: "Field",
  listboxLabel: "Fruits",
  options: FRUITS,
} satisfies AutocompleteProps<string>;

let raf: RafSpy;

beforeAll(() => {
  raf = testImmediateRaf();
});

afterAll(() => {
  raf.mockRestore();
});

describe("Autocomplete", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const inputRef = createRef<HTMLInputElement>();
    const props = {
      ...FRUIT_PROPS,
      inputRef,
      containerProps: {
        "data-testid": "container",
      },
    } satisfies AutocompleteProps<string>;
    const { rerender } = rmdRender(<Autocomplete {...props} />);

    const field = screen.getByRole("combobox", { name: "Field" });
    const container = screen.getByTestId("container");
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current).toBe(field);
    expect(container).toMatchSnapshot();

    rerender(
      <Autocomplete
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should toggle the visibility when the text field is clicked", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
    expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

    expect(() => screen.getByRole("listbox")).toThrow();
    await user.click(autocomplete);

    const listbox = screen.getByRole("listbox", { name: "Fruits" });
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");
    expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

    await user.click(autocomplete);
    expect(listbox).toBeInTheDocument();
  });

  it("should filter the options as the user types", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} />);

    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    await user.tab();
    expect(autocomplete).toHaveFocus();
    expect(() => screen.getByRole("listbox")).toThrow();

    // the listbox should appear if the user types
    await user.type(autocomplete, "a", { skipClick: true });
    const listbox = screen.getByRole("listbox", { name: "Fruits" });
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toBe(screen.getByRole("option", { name: "Apple" }));
    expect(options[1]).toBe(screen.getByRole("option", { name: "Apricot" }));

    await user.click(screen.getByRole("option", { name: "Apricot" }));
    expect(listbox).not.toBeInTheDocument();
    expect(autocomplete).toHaveValue("Apricot");
  });

  it("should allow for a custom filter function", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} filter={fuzzySearch} />);

    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    await user.type(autocomplete, "ae");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toBe(screen.getByRole("option", { name: "Apple" }));
    expect(options[1]).toBe(screen.getByRole("option", { name: "Cranberry" }));
    expect(options[2]).toBe(screen.getByRole("option", { name: "Orange" }));
    expect(options[3]).toBe(screen.getByRole("option", { name: "Strawberry" }));
  });

  it("should allow the filtering to be disabled by providing a noop filter function (like noopAutocompleteFilter)", async () => {
    const user = userEvent.setup();

    // this is how you can manually resolve a promise using events
    const instance = new EventTarget();
    function Test(): ReactElement {
      const [options, setOptions] = useState(FRUITS);
      useEffect(() => {
        instance.addEventListener("fake-filter", () => {
          setOptions(FRUITS.slice(3));
        });
      }, []);

      return (
        <Autocomplete
          {...FRUIT_PROPS}
          options={options}
          filter={noopAutocompleteFilter}
        />
      );
    }

    rmdRender(<Test />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });

    await user.type(autocomplete, "Hello, world!");
    expect(screen.getAllByRole("option")).toHaveLength(FRUITS.length);

    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("fake-filter"));
    });
    expect(screen.getAllByRole("option")).toHaveLength(FRUITS.slice(3).length);
  });

  it("should default the filter function to noopAutocompleteFilter when the input type is search", async () => {
    const user = userEvent.setup();

    // this is how you can manually resolve a promise using events
    const instance = new EventTarget();
    function Test(): ReactElement {
      const [options, setOptions] = useState(FRUITS);
      useEffect(() => {
        instance.addEventListener("fake-filter", () => {
          setOptions(FRUITS.slice(3));
        });
      }, []);

      return <Autocomplete {...FRUIT_PROPS} options={options} type="search" />;
    }

    rmdRender(<Test />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });

    await user.type(autocomplete, "Hello, world!");
    expect(screen.getAllByRole("option")).toHaveLength(FRUITS.length);

    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("fake-filter"));
    });
    expect(screen.getAllByRole("option")).toHaveLength(FRUITS.slice(3).length);
  });

  it("should not filter the options if a value was already selected until the first value change to make it behave like a select", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });

    await user.type(autocomplete, "app");
    let listbox = screen.getByRole("listbox", { name: "Fruits" });
    expect(within(listbox).getAllByRole("option")).toHaveLength(1);
    await user.keyboard("[ArrowDown][Enter]");
    expect(autocomplete).toHaveValue("Apple");
    expect(listbox).not.toBeInTheDocument();

    await user.keyboard("{Alt>}[ArrowDown]{/Alt}");
    listbox = screen.getByRole("listbox", { name: "Fruits" });
    expect(within(listbox).getAllByRole("option")).toHaveLength(FRUITS.length);

    await user.keyboard("[Backspace][Backspace]");
    // NOTE: I don't know if this is a bug in `@testing-library/user-event` or
    // the `triggerManualChangeEvent`, but this should be `App` (and still is
    // in the browser)
    expect(autocomplete).toHaveValue("a");
    // This should be `1` once 🔼 is fixed. it matches `Apple` and `Apricot` when it is `ap`
    expect(within(listbox).getAllByRole("option")).toHaveLength(2);
  });

  it("should be able to render a CircularProgress bar when the loading prop is enabled", () => {
    const { rerender } = rmdRender(<Autocomplete {...FRUIT_PROPS} />);

    expect(() => screen.getByRole("progressbar")).toThrow();

    rerender(<Autocomplete {...FRUIT_PROPS} loading />);
    const progressbar = screen.getByRole("progressbar", { name: "Loading" });
    expect(progressbar).toMatchSnapshot();
  });

  it("should allow the CircularProgress bar props to be configured with loadingProps", () => {
    rmdRender(
      <>
        <SrOnly id="label-id">Wait</SrOnly>
        <Autocomplete
          {...FRUIT_PROPS}
          loading
          loadingProps={{
            "aria-labelledby": "label-id",
            dense: false,
            theme: "primary",
            className: "custom-class-name",
          }}
        />
      </>
    );
    const progressbar = screen.getByRole("progressbar", { name: "Wait" });
    expect(progressbar).toMatchSnapshot();
  });

  it("should prevent the listbox from closing and reopening when the text field, clear button, dropdown button, or any addon is clicked", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    await user.type(autocomplete, "or");

    let listbox = screen.getByRole("listbox", { name: "Fruits" });
    expect(within(listbox).getAllByRole("option")).toHaveLength(1);

    await user.click(screen.getByRole("option", { name: "Orange" }));
    expect(listbox).not.toBeInTheDocument();
    expect(autocomplete).toHaveValue("Orange");
    expect(autocomplete).not.toHaveFocus();

    await user.click(autocomplete);
    listbox = screen.getByRole("listbox", { name: "Fruits" });
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(listbox).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fruits" }));
    expect(listbox).not.toBeInTheDocument();
  });

  it("should attempt to pull menu item props from the options", async () => {
    const user = userEvent.setup();
    const options: (Partial<MenuItemProps> & {
      value: string;
      label: string;
    })[] = FRUITS.map((fruit) => ({
      leftAddon: <FontIcon>favorite</FontIcon>,
      disabled: fruit === "Orange",
      value: fruit,
      label: fruit,
      secondaryText: "Fruit",
    }));

    rmdRender(<Autocomplete {...FRUIT_PROPS} options={options} />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    await user.click(autocomplete);

    expect(screen.getByRole("listbox", { name: "Fruits" })).toMatchSnapshot();
  });

  it("should allot for a default query either as a string or a UseStateInitializer", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(
      <Autocomplete {...FRUIT_PROPS} defaultQuery="Orange" />
    );

    let autocomplete = screen.getByRole("combobox", { name: "Field" });
    expect(autocomplete).toHaveValue("Orange");
    await user.click(autocomplete);
    expect(() => {
      screen.getByRole("option", { name: "Orange", selected: true });
    }).not.toThrow();

    rerender(
      <Autocomplete
        key="remount"
        {...FRUIT_PROPS}
        defaultQuery={() => FRUITS[2]}
      />
    );
    expect(autocomplete).not.toBeInTheDocument();
    autocomplete = screen.getByRole("combobox", { name: "Field" });
    expect(autocomplete).toHaveValue(FRUITS[2]);
    await user.click(autocomplete);
    expect(() => {
      screen.getByRole("option", { name: FRUITS[2], selected: true });
    }).not.toThrow();
  });

  it("should allow for a default value", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Autocomplete
        {...FRUIT_PROPS}
        options={FRUIT_OBJECTS}
        defaultValue={FRUIT_OBJECTS[1]}
      />
    );
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    expect(autocomplete).toHaveValue(FRUIT_OBJECTS[1].label);

    await user.click(autocomplete);
    expect(() => {
      screen.getByRole("option", {
        name: FRUIT_OBJECTS[1].label,
        selected: true,
      });
    }).not.toThrow();
  });

  it("should not set the default value if a query was provided and the filtering is disabled through the noopAutocompleteFilter", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Autocomplete
        {...FRUIT_PROPS}
        filter={noopAutocompleteFilter}
        defaultQuery="Hello, world!"
      />
    );
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    expect(autocomplete).toHaveValue("Hello, world!");
    await user.click(autocomplete);
    expect(() => {
      screen.getByRole("option", { selected: true });
    }).toThrow();
  });

  it("should allow any value to be typed when the allowAnyValue prop is enabled", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} allowAnyValue />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });

    await user.type(autocomplete, "New Value");
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(autocomplete).toHaveValue("New Value");
  });

  it("should default the allowAnyValue to true when the filter is set to noopAutocompleteFilter", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Autocomplete {...FRUIT_PROPS} filter={noopAutocompleteFilter} />
    );
    const autocomplete = screen.getByRole("combobox", { name: "Field" });

    await user.type(autocomplete, "New Value");
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(autocomplete).toHaveValue("New Value");
  });

  it("should allow for a creatable version by inserting an option into the fultered result list", async () => {
    const onValueChange = vi.fn();
    function Test(): ReactElement {
      return (
        <Autocomplete
          label="Fruit"
          placeholder="Apple"
          listboxLabel="Fruits"
          options={FRUIT_OBJECTS}
          onValueChange={onValueChange}
          filter={(options) => {
            const { list, extractor, query } = options;
            const filtered = defaultAutocompleteFilter(options);
            if (query && !list.some((option) => extractor(option) === query)) {
              return [
                ...filtered,
                {
                  label: query,
                  value: query,
                  children: `Add: "${query}"`,
                },
              ];
            }

            return filtered;
          }}
        />
      );
    }

    const user = userEvent.setup();
    rmdRender(<Test />);

    const autocomplete = screen.getByRole("combobox", { name: "Fruit" });

    await user.type(autocomplete, "A");
    let listbox = screen.getByRole("listbox", { name: "Fruits" });
    let options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Apple");
    expect(options[1]).toHaveTextContent("Apricot");
    expect(options[2]).toHaveTextContent('Add: "A"');

    await user.type(autocomplete, " new fruit");
    options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Add: "A new fruit"');
    expect(() => screen.getByText("No Options")).toThrow();

    await user.click(options[0]);
    expect(listbox).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith({
      label: "A new fruit",
      value: "A new fruit",
      children: 'Add: "A new fruit"',
    });
    expect(autocomplete).toHaveValue("A new fruit");

    await user.click(autocomplete);
    listbox = screen.getByRole("listbox", { name: "Fruits" });
    options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(FRUIT_OBJECTS.length);
    expect(() =>
      within(listbox).getByRole("option", { name: 'Add: "A new fruit"' })
    ).toThrow();

    await user.type(autocomplete, "[Backspace]t");
    options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Add: "A new fruit"');
    expect(options[0]).not.toHaveAttribute("aria-selected");
    expect(autocomplete).toHaveValue("A new fruit");

    await user.type(autocomplete, "[Backspace]");
    await user.click(document.body);
    expect(listbox).not.toBeInTheDocument();
    // it should still consider the `A new fruit` selected and revert back to it
    expect(autocomplete).toHaveValue("A new fruit");
  });

  it("should not require the getOptionLabel prop for options that the label can be inferred", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const BASE_PROPS = {
      label: "Autocomplete",
      listboxLabel: "Autocomplete",
    } satisfies Partial<AutocompleteProps<any>>;
    expect(() => {
      const { unmount } = rmdRender(
        <Autocomplete {...BASE_PROPS} options={["a", "b", "c"]} />
      );
      unmount();
    }).not.toThrow();
    expect(() => {
      const { unmount } = rmdRender(
        <Autocomplete
          {...BASE_PROPS}
          options={[{ label: "a" }, { label: "b" }, { label: "c" }]}
          defaultQuery="a"
        />
      );
      unmount();
    }).not.toThrow();
    expect(() => {
      const { unmount } = rmdRender(
        <Autocomplete
          {...BASE_PROPS}
          options={[{ name: "a" }, { name: "b" }, { name: "c" }]}
          defaultQuery="a"
        />
      );
      unmount();
    }).not.toThrow();

    expect(() => {
      const { unmount } = rmdRender(
        // @ts-expect-error Invalid options type
        <Autocomplete
          {...BASE_PROPS}
          options={[
            { first_name: "a" },
            { first_name: "b" },
            { first_name: "c" },
          ]}
          defaultQuery="a"
        />
      );
      unmount();
    }).toThrow();
    error.mockRestore();
  });

  describe("keyboard support", () => {
    it("should allow the listbox to be closed with the escape key while visible or clear out the textbox", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} defaultValue={FRUITS.at(0)} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });

      expect(autocomplete).toHaveValue(FRUITS.at(0));
      await user.click(autocomplete);

      const listbox = screen.getByRole("listbox", { name: "Fruits" });
      await user.keyboard("[Escape]");
      expect(listbox).not.toBeInTheDocument();
      expect(autocomplete).toHaveValue(FRUITS.at(0));

      await user.keyboard("[Escape]");
      expect(autocomplete).toHaveValue("");
    });

    it("should allow keyboard users to force the listbox to appear with ArrowDown and focus the first item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(autocomplete).toHaveFocus();
      expect(() => screen.getByRole("listbox")).toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.keyboard("[ArrowDown]");
      expect(() =>
        screen.getByRole("listbox", { name: "Fruits" })
      ).not.toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "true");
      expect(autocomplete).toHaveAttribute(
        "aria-activedescendant",
        screen.getByRole("option", { name: FRUITS.at(0) }).id
      );
    });

    it("should allow keyboard users to force the listbox to appear with alt+ArrowDown without focusing the first item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(autocomplete).toHaveFocus();
      expect(() => screen.getByRole("listbox")).toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.keyboard("{Alt>}[ArrowDown]{/Alt}");
      expect(() =>
        screen.getByRole("listbox", { name: "Fruits" })
      ).not.toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "true");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
    });

    it("should allow keyboard users to force the listbox to appear with ArrowUp and focus the last item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(autocomplete).toHaveFocus();
      expect(() => screen.getByRole("listbox")).toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.keyboard("[ArrowUp]");
      expect(() =>
        screen.getByRole("listbox", { name: "Fruits" })
      ).not.toThrow();
      expect(autocomplete).toHaveAttribute("aria-expanded", "true");
      expect(autocomplete).toHaveAttribute(
        "aria-activedescendant",
        screen.getByRole("option", { name: FRUITS.at(-1) }).id
      );
    });

    it("should allow the alt+ArrowUp key to move focus to the combobox and close the listbox while the combobox is focused", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.click(autocomplete);
      const listbox = screen.getByRole("listbox", { name: "Fruits" });

      await user.keyboard("[ArrowDown][ArrowDown]");
      expect(autocomplete).toHaveAttribute(
        "aria-activedescendant",
        screen.getByRole("option", { name: FRUITS.at(1) }).id
      );

      await user.keyboard("{Alt>}[ArrowUp]{/Alt}");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(listbox).toBeInTheDocument();

      await user.keyboard("{Alt>}[ArrowUp]{/Alt}");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(listbox).not.toBeInTheDocument();
    });

    it("should reset the keyboard focus when the user types or uses the Home/End/ArrowLeft/ArrowRight keys", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole<HTMLInputElement>("combobox", {
        name: "Field",
      });

      await user.tab();
      await user.keyboard("[ArrowDown]");
      const option1 = screen.getByRole("option", { name: FRUITS.at(0) });

      expect(autocomplete).toHaveAttribute("aria-activedescendant", option1.id);

      await user.keyboard("ap");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.keyboard("[ArrowDown]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", option1.id);
      await user.keyboard("[ArrowLeft]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(autocomplete.selectionStart).toBe(1);

      await user.keyboard("[ArrowDown]");
      expect(autocomplete.selectionStart).toBe(1);
      expect(autocomplete).toHaveAttribute("aria-activedescendant", option1.id);
      await user.keyboard("[ArrowRight]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(autocomplete.selectionStart).toBe(2);

      await user.keyboard("[ArrowDown]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", option1.id);
      await user.keyboard("[Home]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(autocomplete.selectionStart).toBe(0);

      await user.keyboard("[ArrowDown]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", option1.id);
      await user.keyboard("[End]");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
      expect(autocomplete.selectionStart).toBe(2);
    });

    it("should not allow the dropdown button to be tab focused", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      const dropdown = screen.getByRole("button", { name: "Fruits" });

      await user.tab();
      expect(autocomplete).toHaveFocus();

      await user.tab();
      expect(dropdown).not.toHaveFocus();
      expect(document.body).toHaveFocus();
    });

    it("should not prevent the listbox from closing and reopening when the text field, clear button, dropdown button, or any addon is clicked while in keyboard mode", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });

      await user.type(autocomplete, "or");

      let listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(within(listbox).getAllByRole("option")).toHaveLength(1);

      await user.keyboard("[ArrowDown][Enter]");
      expect(listbox).not.toBeInTheDocument();
      expect(autocomplete).toHaveValue("Orange");
      expect(autocomplete).toHaveFocus();

      await user.keyboard("[Alt>][ArrowDown][/Alt]");
      listbox = screen.getByRole("listbox", { name: "Fruits" });
      await user.keyboard("[Escape]");
      expect(listbox).not.toBeInTheDocument();
      expect(autocomplete).toHaveFocus();
    });
  });

  describe("type safety", () => {
    it("should require the extractor for when the options are not a list of strings or a list of objects with a label", async () => {
      const user = userEvent.setup();
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      const { rerender } = rmdRender(
        // @ts-expect-error
        <Autocomplete listboxLabel="Options" options={[0, 1, 2, 3]} />
      );

      await expect(
        user.click(screen.getByRole("button", { name: "Options" }))
      ).rejects.toThrow(ERROR_MESSAGE);

      rerender(
        // @ts-expect-error
        <Autocomplete
          listboxLabel="Options"
          options={[{ children: "A" }, { children: "B" }]}
        />
      );
      await expect(
        user.click(screen.getByRole("button", { name: "Options" }))
      ).rejects.toThrow(ERROR_MESSAGE);
      rerender(
        <Autocomplete
          listboxLabel="Options"
          // @ts-expect-error
          options={["One", "Two", 3, "Four"]}
        />
      );
      await expect(
        user.click(screen.getByRole("button", { name: "Options" }))
      ).rejects.toThrow(ERROR_MESSAGE);

      error.mockRestore();
    });

    it("should infer the option type correctly", () => {
      expect(() =>
        rmdRender(
          <Autocomplete
            options={["a", "b", "c"]}
            value={null}
            setValue={(option) => {
              if (option !== null) {
                // should not error since it is a string
                option.charAt(0);
              }
            }}
            listboxLabel="Label"
          />
        )
      ).not.toThrow();

      expect(() =>
        rmdRender(
          <Autocomplete
            listboxLabel="Label"
            options={OBJECT_LIST}
            getOptionLabel={(option) => {
              // @ts-expect-error
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              option.label;

              return option.name;
            }}
            value={null}
            setValue={(option) => {
              if (option !== null) {
                // should not error since it is a string
                option.name.charAt(0);
                // should not error since it is a number
                option.value.toFixed(0);
              }
            }}
          />
        )
      ).not.toThrow();
    });
  });

  describe("multiselect", () => {
    it("should support multiselect behavior by setting the defaultValue to a list and renders inline chips", async () => {
      const user = userEvent.setup();
      rmdRender(
        <Autocomplete
          data-testid="container"
          {...FRUIT_PROPS}
          defaultValue={[]}
        />
      );

      const container = screen.getByTestId("container");
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(container).toMatchSnapshot();
      await user.click(autocomplete);
      let listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");

      const [firstFruit] = FRUITS;
      await user.click(screen.getByRole("option", { name: firstFruit }));
      expect(listbox).not.toBeInTheDocument();
      expect(autocomplete).toHaveValue("");
      expect(container).toMatchSnapshot();

      const firstFruitChip = screen.getByRole("button", { name: firstFruit });

      await user.click(autocomplete);
      listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(screen.getByRole("option", { name: firstFruit })).toHaveAttribute(
        "aria-selected",
        "true"
      );

      await user.type(autocomplete, "ki[ArrowDown][Enter]");
      expect(listbox).not.toBeInTheDocument();
      expect(autocomplete).toHaveValue("");
      const kiwi = screen.getByRole("button", { name: "Kiwi" });
      expect(firstFruitChip).toBeInTheDocument();

      await user.click(autocomplete);
      listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(screen.getByRole("option", { name: firstFruit })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByRole("option", { name: "Kiwi" })).toHaveAttribute(
        "aria-selected",
        "true"
      );

      await user.click(kiwi);
      expect(kiwi).not.toBeInTheDocument();
      expect(firstFruitChip).toBeInTheDocument();

      await user.click(autocomplete);
      listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(screen.getByRole("option", { name: firstFruit })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByRole("option", { name: "Kiwi" })).not.toHaveAttribute(
        "aria-selected"
      );
    });

    it("should support a defaultValue", async () => {
      const user = userEvent.setup();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          defaultValue={["Apple", "Banana", "Orange"]}
        />
      );

      expect(screen.getByRole("button", { name: "Apple" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Banana" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Orange" })
      ).toBeInTheDocument();

      await user.click(screen.getByRole("combobox", { name: "Field" }));
      expect(screen.getByRole("option", { name: "Apple" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByRole("option", { name: "Banana" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByRole("option", { name: "Orange" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });

    it("should allow the inline chips behavior to be disabled with the disableInlineChips prop", async () => {
      const user = userEvent.setup();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          disableInlineChips
          defaultValue={["Apple"]}
        />
      );

      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(() => screen.getByRole("button", { name: "Apple" })).toThrow();
      await user.click(autocomplete);
      const listbox = screen.getByRole("listbox", { name: "Fruits" });
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");
      expect(screen.getByRole("option", { name: "Apple" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });

    it("should allow the options to be rendered with checkboxes by enabling the checkboxes prop and preventing the listbox from closing by default once clicked", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} checkboxes defaultValue={[]} />);

      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      await user.click(autocomplete);
      const listbox = screen.getByRole("listbox", { name: "Fruits" });

      const apple = screen.getByRole("option", { name: "Apple" });
      expect(apple).not.toHaveAttribute("aria-selected");
      expect(listbox).toMatchSnapshot();

      await user.click(apple);
      expect(listbox).toBeInTheDocument();
      expect(apple).toHaveAttribute("aria-selected", "true");
      expect(listbox).toMatchSnapshot();
    });

    it("should allow the chips to be customized through the getChipProps", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          defaultValue={["Apple", "Orange"]}
          getChipProps={({ index, option }) => ({
            disabled: index === 0,
            className: cnb(option === "Orange" && "custom-class-name"),
            children: `${index + 1}. ${option}`,
            onClick,
          })}
        />
      );

      const apple = screen.getByRole("button", { name: "1. Apple" });
      const orange = screen.getByRole("button", { name: "2. Orange" });
      expect(apple).toBeDisabled();
      expect(orange).toBeEnabled();
      expect(apple).not.toHaveClass("custom-class-name");
      expect(orange).toHaveClass("custom-class-name");

      await user.click(orange);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should allow the selected options to be filtered from the listbox by enabling the filterSelected prop", async () => {
      const user = userEvent.setup();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          defaultValue={["Apple", "Orange"]}
          filterSelected
        />
      );

      await user.click(screen.getByRole("combobox", { name: "Field" }));
      expect(() => screen.getByRole("option", { name: "Apple" })).toThrow();
      expect(() => screen.getByRole("option", { name: "Orange" })).toThrow();
    });
  });

  describe("customizations", () => {
    it("should allow the clear button to be removed", () => {
      const { rerender } = rmdRender(<Autocomplete {...FRUIT_PROPS} />);

      expect(() => screen.getByRole("button", { name: "Clear" })).not.toThrow();

      rerender(<Autocomplete {...FRUIT_PROPS} disableClearButton />);
      expect(() => screen.getByRole("button", { name: "Clear" })).toThrow();
    });

    it("should pass through the visibility prop", () => {
      const { rerender } = rmdRender(<Autocomplete {...FRUIT_PROPS} />);

      const clearButton = screen.getByRole("button", { name: "Clear" });
      expect(clearButton).toMatchSnapshot();

      rerender(
        <Autocomplete {...FRUIT_PROPS} clearButtonVisibility="always" />
      );
      expect(clearButton).toMatchSnapshot();

      rerender(
        <Autocomplete {...FRUIT_PROPS} clearButtonVisibility="active" />
      );
      expect(clearButton).toMatchSnapshot();

      rerender(<Autocomplete {...FRUIT_PROPS} clearButtonVisibility="query" />);
      expect(clearButton).toMatchSnapshot();
    });

    it("should allow the button to be customized through the clearButtonProps", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          clearButtonVisibility="always"
          clearButtonProps={{
            "aria-label": "Close",
            onClick: handleClick,
            className: "custom-class-name",
            buttonType: "text",
            children: <kbd>esc</kbd>,
          }}
        />
      );

      const clearButton = screen.getByRole("button", { name: "Close" });
      expect(clearButton).toMatchSnapshot();

      await user.click(clearButton);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should allow the dropdown button to be removed", () => {
      const { rerender } = rmdRender(<Autocomplete {...FRUIT_PROPS} />);

      expect(() =>
        screen.getByRole("button", { name: "Fruits" })
      ).not.toThrow();

      rerender(<Autocomplete {...FRUIT_PROPS} disableDropdownButton />);
      expect(() => screen.getByRole("button", { name: "Fruits" })).toThrow();
    });

    it("should allow the dropdown button to be customized", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      rmdRender(
        <Autocomplete
          {...FRUIT_PROPS}
          dropdownButtonProps={{
            "aria-label": "Show Fruits",
            className: "custom-class-name",
            onClick: handleClick,
          }}
        />
      );

      const dropdown = screen.getByRole("button", { name: "Show Fruits" });
      expect(dropdown).toMatchSnapshot();

      await user.click(dropdown);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
