import type { KeyboardFocusElementData } from "../types";
import {
  getFirstFocusableIndex,
  getLastFocusableIndex,
  getNextFocusableIndex,
  getSearchText,
  isNotFocusable,
} from "../utils";

const createWatching = (
  elements: readonly HTMLElement[]
): readonly KeyboardFocusElementData[] =>
  elements.map((element) => ({ element, content: "" }));

const div = document.createElement("div");
div.textContent = "div";
const button = document.createElement("button");
button.textContent = "button";
const input = document.createElement("input");
input.type = "text";
input.value = "input value";

const disabledDiv = document.createElement("div");
disabledDiv.textContent = "div";
disabledDiv.setAttribute("aria-disabled", "true");
const disabledButton = document.createElement("button");
disabledButton.textContent = "button";
disabledButton.disabled = true;
const disabledInput = document.createElement("input");
disabledInput.type = "text";
disabledInput.value = "input value";
disabledInput.disabled = true;

describe("isNotFocusable", () => {
  it("should always return true if there is no element", () => {
    expect(isNotFocusable(undefined, true)).toBe(true);
    expect(isNotFocusable(undefined, false)).toBe(true);
  });

  it("should always return false for non-disabled elements", () => {
    expect(isNotFocusable(div, false)).toBe(false);
    expect(isNotFocusable(div, true)).toBe(false);
    expect(isNotFocusable(button, false)).toBe(false);
    expect(isNotFocusable(button, true)).toBe(false);
    expect(isNotFocusable(input, false)).toBe(false);
    expect(isNotFocusable(input, true)).toBe(false);
  });

  it("should return true if disabled elements are not allowed and the element is disabled or aria-disabled", () => {
    expect(isNotFocusable(disabledDiv, false)).toBe(true);
    expect(isNotFocusable(disabledDiv, true)).toBe(false);
    expect(isNotFocusable(disabledButton, false)).toBe(true);
    expect(isNotFocusable(disabledButton, true)).toBe(false);
    expect(isNotFocusable(disabledInput, false)).toBe(true);
    expect(isNotFocusable(disabledInput, true)).toBe(false);
  });
});

describe("getFirstFocusableIndex", () => {
  it("should return the first focusable element index", () => {
    expect(getFirstFocusableIndex(createWatching([div]), false)).toBe(0);
    expect(getFirstFocusableIndex(createWatching([div]), true)).toBe(0);
    expect(getFirstFocusableIndex(createWatching([button]), false)).toBe(0);
    expect(getFirstFocusableIndex(createWatching([button]), true)).toBe(0);
    expect(getFirstFocusableIndex(createWatching([input]), false)).toBe(0);
    expect(getFirstFocusableIndex(createWatching([input]), true)).toBe(0);
    expect(
      getFirstFocusableIndex(
        createWatching([disabledDiv, disabledButton, disabledInput, div]),
        false
      )
    ).toBe(3);
    expect(
      getFirstFocusableIndex(
        createWatching([disabledDiv, disabledButton, disabledInput, div]),
        true
      )
    ).toBe(0);
  });

  it("should return -1 if there are no focusable elements", () => {
    expect(getFirstFocusableIndex([], false)).toBe(-1);
    expect(getFirstFocusableIndex([], true)).toBe(-1);
    expect(getFirstFocusableIndex(createWatching([disabledDiv]), false)).toBe(
      -1
    );
  });
});

describe("getLastFocusableIndex", () => {
  it("should return the index of the last focusable element", () => {
    expect(getLastFocusableIndex(createWatching([div]), false)).toBe(0);
    expect(getLastFocusableIndex(createWatching([div]), true)).toBe(0);
    expect(getLastFocusableIndex(createWatching([button]), false)).toBe(0);
    expect(getLastFocusableIndex(createWatching([button]), true)).toBe(0);
    expect(getLastFocusableIndex(createWatching([input]), false)).toBe(0);
    expect(getLastFocusableIndex(createWatching([input]), true)).toBe(0);

    expect(
      getLastFocusableIndex(createWatching([div, button, input]), false)
    ).toBe(2);
    expect(
      getLastFocusableIndex(createWatching([div, button, input]), true)
    ).toBe(2);
    expect(
      getLastFocusableIndex(createWatching([div, input, button]), false)
    ).toBe(2);
    expect(
      getLastFocusableIndex(createWatching([div, input, button]), true)
    ).toBe(2);

    expect(
      getLastFocusableIndex(
        createWatching([div, disabledDiv, disabledButton, disabledInput]),
        false
      )
    ).toBe(0);
    expect(
      getLastFocusableIndex(
        createWatching([div, disabledDiv, disabledButton, disabledInput]),
        true
      )
    ).toBe(3);
    expect(
      getLastFocusableIndex(
        createWatching([disabledDiv, disabledButton, div, disabledInput]),
        false
      )
    ).toBe(2);
    expect(
      getLastFocusableIndex(
        createWatching([disabledDiv, disabledButton, div, disabledInput]),
        true
      )
    ).toBe(3);
  });

  it("should return -1 if there are no focusable elements", () => {
    expect(getLastFocusableIndex([], false)).toBe(-1);
    expect(getLastFocusableIndex([], true)).toBe(-1);
    expect(getLastFocusableIndex(createWatching([disabledDiv]), false)).toBe(
      -1
    );
  });
});

describe("getNextFocusableIndex", () => {
  it("should return the correct index when all the elements are focusable", () => {
    const watching = createWatching([div, button, input]);

    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 0,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(2);

    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 0,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(0);

    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(0);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 0,
      })
    ).toBe(0);

    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(0);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 0,
      })
    ).toBe(2);
  });

  it("should return the correct index when some of the elements are not focusable", () => {
    const watching = createWatching([
      disabledDiv,
      div,
      button,
      disabledInput,
      input,
      disabledButton,
    ]);

    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(4);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 4,
      })
    ).toBe(4);

    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(4);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 4,
      })
    ).toBe(1);

    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 4,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: false,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(1);

    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 4,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 2,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: true,
        watching,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 1,
      })
    ).toBe(4);
  });
});

describe("getSearchText", () => {
  it("should return an empty string if the search behavior is not allowed", () => {
    expect(getSearchText(div, false)).toBe("");
    expect(getSearchText(button, false)).toBe("");
    expect(getSearchText(input, false)).toBe("");
    expect(getSearchText(disabledDiv, false)).toBe("");
    expect(getSearchText(disabledButton, false)).toBe("");
    expect(getSearchText(disabledInput, false)).toBe("");
  });

  it("should return first letter in the element as an uppercase string", () => {
    expect(getSearchText(div, true)).toBe("D");
    expect(getSearchText(button, true)).toBe("B");
    expect(getSearchText(input, true)).toBe("");
  });

  it("should remove font icons, aria-hidden elements, and hidden elements", () => {
    const createFontIcon = (): HTMLElement => {
      const fontIcon = document.createElement("i");
      fontIcon.className = "rmd-icon--font";
      fontIcon.textContent = "close";
      return fontIcon;
    };
    const createAriaHidden = (): HTMLElement => {
      const ariaHidden = document.createElement("div");
      ariaHidden.textContent = "aria hidden";
      ariaHidden.setAttribute("aria-hidden", "true");
      return ariaHidden;
    };
    const createHidden = (): HTMLElement => {
      const hidden = document.createElement("div");
      hidden.textContent = "hidden";
      hidden.hidden = true;
      return hidden;
    };
    const createText = (): Text => document.createTextNode("some div text");

    const leadingIcon = document.createElement("div");
    leadingIcon.appendChild(createFontIcon());
    leadingIcon.appendChild(createText());
    const trailingIcon = document.createElement("div");
    trailingIcon.appendChild(createText());
    trailingIcon.appendChild(createFontIcon());
    const leadingAriaHidden = document.createElement("div");
    leadingAriaHidden.appendChild(createAriaHidden());
    leadingAriaHidden.appendChild(createText());
    const trailingAriaHidden = document.createElement("div");
    trailingAriaHidden.appendChild(createText());
    trailingAriaHidden.appendChild(createAriaHidden());
    const leadingHidden = document.createElement("div");
    leadingHidden.appendChild(createHidden());
    leadingHidden.appendChild(createText());
    const trailingHidden = document.createElement("div");
    trailingHidden.appendChild(createText());
    trailingHidden.appendChild(createHidden());

    expect(leadingIcon).toMatchSnapshot();
    expect(trailingIcon).toMatchSnapshot();
    expect(leadingAriaHidden).toMatchSnapshot();
    expect(trailingAriaHidden).toMatchSnapshot();
    expect(leadingHidden).toMatchSnapshot();
    expect(trailingHidden).toMatchSnapshot();

    expect(getSearchText(leadingIcon, true)).toBe("S");
    expect(getSearchText(trailingIcon, true)).toBe("S");
    expect(getSearchText(leadingAriaHidden, true)).toBe("S");
    expect(getSearchText(trailingAriaHidden, true)).toBe("S");
    expect(getSearchText(leadingHidden, true)).toBe("S");
    expect(getSearchText(trailingHidden, true)).toBe("S");
  });
});
