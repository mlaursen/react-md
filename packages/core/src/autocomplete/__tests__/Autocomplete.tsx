import { describe, expect, it, jest } from "@jest/globals";
import { createRef, useEffect, useState, type ReactElement } from "react";
import { Button } from "../../button/Button.js";
import { fuzzySearch } from "../../searching/fuzzy.js";
import { act, rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { SrOnly } from "../../typography/SrOnly.js";
import { Autocomplete, type AutocompleteProps } from "../Autocomplete.js";

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

const FRUIT_PROPS: AutocompleteProps<string> = {
  label: "Field",
  menuLabel: "Fruits",
  options: FRUITS,
};

describe("Autocomplete", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const inputRef = createRef<HTMLInputElement>();
    const props: AutocompleteProps<string> = {
      ...FRUIT_PROPS,
      inputRef,
      containerProps: {
        "data-testid": "container",
      },
    };
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
    expect(listbox).not.toBeInTheDocument();
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
    expect(autocomplete).toHaveAttribute("aria-activedescendant", "");
  });

  it("should filter the options as the user types", async () => {
    const user = userEvent.setup();
    rmdRender(<Autocomplete {...FRUIT_PROPS} />);

    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    await user.tab();
    expect(document.activeElement).toBe(autocomplete);
    expect(() => screen.getByRole("listbox")).toThrow();

    // the listbox should appear if the user types
    await user.type(autocomplete, "an", { skipClick: true });
    const listbox = screen.getByRole("listbox", { name: "Fruits" });
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toBe(screen.getByRole("option", { name: "Banana" }));
    expect(options[1]).toBe(screen.getByRole("option", { name: "Cranberry" }));
    expect(options[2]).toBe(screen.getByRole("option", { name: "Mango" }));
    expect(options[3]).toBe(screen.getByRole("option", { name: "Orange" }));

    await user.click(screen.getByRole("option", { name: "Mango" }));
    expect(listbox).not.toBeInTheDocument();
    expect(autocomplete).toHaveValue("Mango");
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

  it("should allow the filtering to be disabled by enabling the disableFilter prop to manually filter instead", async () => {
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

      return <Autocomplete {...FRUIT_PROPS} options={options} disableFilter />;
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

  // If the value is changed externally, the user **must** disable the filter
  // behavior and filter themselves since it means doing a lot of funky stuff
  // with useEffect
  it("should allow the value to be controlled but will not update the filtered list automatically", async () => {
    function Test(): ReactElement {
      const [value, setValue] = useState("");

      return (
        <>
          <Autocomplete
            {...FRUIT_PROPS}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Button onClick={() => setValue("plu")}>Set Value</Button>
        </>
      );
    }

    const user = userEvent.setup();
    rmdRender(<Test />);
    const autocomplete = screen.getByRole("combobox", { name: "Field" });
    const button = screen.getByRole("button", { name: "Set Value" });

    await user.type(autocomplete, "ana");
    expect(autocomplete).toHaveValue("ana");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(() => screen.getByRole("option", { name: "Banana" })).not.toThrow();

    await user.click(button);
    await user.click(autocomplete);
    expect(autocomplete).toHaveValue("plu");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(() => screen.getByRole("option", { name: "Banana" })).not.toThrow();
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

    it("should allow keyboard users to force the menu to appear with ArrowDown and focus the first item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(document.activeElement).toBe(autocomplete);
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

    it("should allow keyboard users to force the menu to appear with alt+ArrowDown without focusing the first item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(document.activeElement).toBe(autocomplete);
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

    it("should allow keyboard users to force the menu to appear with ArrowUp and focus the last item", async () => {
      const user = userEvent.setup();
      rmdRender(<Autocomplete {...FRUIT_PROPS} />);
      const autocomplete = screen.getByRole("combobox", { name: "Field" });
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");
      expect(autocomplete).toHaveAttribute("aria-activedescendant", "");

      await user.tab();
      expect(document.activeElement).toBe(autocomplete);
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
      expect(document.activeElement).toBe(autocomplete);

      await user.tab();
      expect(document.activeElement).not.toBe(dropdown);
      expect(document.activeElement).toBe(document.body);
    });
  });

  describe("type safety", () => {
    it("should require the extractor for when the options are not a list of strings or a list of objects with a label", () => {
      const error = jest.spyOn(console, "error").mockImplementation(() => {});
      const errorMessage = `A \`TextExtractor\` must be provided to \`Autocomplete\` for lists that do not contain strings`;
      expect(() =>
        // @ts-expect-error
        rmdRender(<Autocomplete options={[0, 1, 2, 3]} />)
      ).toThrow(errorMessage);

      expect(() =>
        rmdRender(
          // @ts-expect-error
          <Autocomplete options={[{ children: "A" }, { children: "B" }]} />
        )
      ).toThrow(errorMessage);
      expect(() =>
        rmdRender(
          // @ts-expect-error
          <Autocomplete options={["One", "Two", 3, "Four"]} />
        )
      ).toThrow(errorMessage);

      error.mockRestore();
    });

    it("should infer the option type correctly", () => {
      expect(() =>
        rmdRender(
          <Autocomplete
            options={["a", "b", "c"]}
            onAutocomplete={(option) => {
              // should not error since it is a string
              option.charAt(0);
            }}
          />
        )
      ).not.toThrow();

      expect(() =>
        rmdRender(
          <Autocomplete
            options={OBJECT_LIST}
            extractor={(option) => {
              // @ts-expect-error
              option.label;

              return option.name;
            }}
            onAutocomplete={(option) => {
              // should not error since it is a string
              option.name.charAt(0);
              // should not error since it is a number
              option.value.toFixed(0);
            }}
          />
        )
      ).not.toThrow();
    });
  });
});
