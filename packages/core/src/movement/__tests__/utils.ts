import {
  getFirstFocusableIndex,
  getLastFocusableIndex,
  getNextFocusableIndex,
  getSearchText,
  getVirtualFocusDefaultIndex,
  isElementDisabled,
  isNotFocusable,
  recalculateFocusIndex,
} from "../utils";

const button = document.createElement("button");
button.id = "button-1";
const disabledButton = document.createElement("button");
disabledButton.id = "button-2";
disabledButton.disabled = true;
const ariaDisabledButton = document.createElement("button");
ariaDisabledButton.id = "button-3";
ariaDisabledButton.ariaDisabled = "true";
const ariaDisabledFalseButton = document.createElement("button");
ariaDisabledFalseButton.id = "button-4";
ariaDisabledFalseButton.ariaDisabled = "false";

const input = document.createElement("input");
input.id = "input-1";
input.type = "text";
const disabledInput = document.createElement("input");
disabledInput.id = "input-2";
disabledInput.type = "text";
disabledInput.disabled = true;
const ariaDisabledInput = document.createElement("input");
ariaDisabledInput.id = "input-3";
ariaDisabledInput.type = "text";
ariaDisabledInput.ariaDisabled = "true";
const ariaDisabledFalseInput = document.createElement("input");
ariaDisabledFalseInput.id = "input-4";
ariaDisabledFalseInput.type = "text";
ariaDisabledFalseInput.ariaDisabled = "false";

const select = document.createElement("select");
select.id = "select-1";
const disabledSelect = document.createElement("select");
disabledSelect.id = "select-2";
disabledSelect.disabled = true;
const ariaDisabledSelect = document.createElement("select");
ariaDisabledSelect.id = "select-3";
ariaDisabledSelect.ariaDisabled = "true";
const ariaDisabledFalseSelect = document.createElement("select");
ariaDisabledFalseSelect.id = "select-4";
ariaDisabledFalseSelect.ariaDisabled = "false";

const textarea = document.createElement("textarea");
textarea.id = "textarea-1";
const disabledTextarea = document.createElement("textarea");
disabledTextarea.id = "textarea-2";
disabledTextarea.disabled = true;
const ariaDisabledTextarea = document.createElement("textarea");
ariaDisabledTextarea.id = "textarea-3";
ariaDisabledTextarea.ariaDisabled = "true";
const ariaDisabledFalseTextarea = document.createElement("textarea");
ariaDisabledFalseTextarea.id = "textarea-4";
ariaDisabledFalseTextarea.ariaDisabled = "false";

const span = document.createElement("span");
const ariaDisabledSpan = document.createElement("span");
ariaDisabledSpan.ariaDisabled = "true";
const ariaDisabledFalseSpan = document.createElement("span");
ariaDisabledFalseSpan.ariaDisabled = "false";

describe("isElementDisabled", () => {
  it("should correctly identify disabled elements", () => {
    expect(isElementDisabled(button)).toBe(false);
    expect(isElementDisabled(disabledButton)).toBe(true);
    expect(isElementDisabled(ariaDisabledButton)).toBe(true);
    expect(isElementDisabled(ariaDisabledFalseButton)).toBe(false);

    expect(isElementDisabled(input)).toBe(false);
    expect(isElementDisabled(disabledInput)).toBe(true);
    expect(isElementDisabled(ariaDisabledInput)).toBe(true);
    expect(isElementDisabled(ariaDisabledFalseInput)).toBe(false);

    expect(isElementDisabled(select)).toBe(false);
    expect(isElementDisabled(disabledSelect)).toBe(true);
    expect(isElementDisabled(ariaDisabledSelect)).toBe(true);
    expect(isElementDisabled(ariaDisabledFalseSelect)).toBe(false);

    expect(isElementDisabled(textarea)).toBe(false);
    expect(isElementDisabled(disabledTextarea)).toBe(true);
    expect(isElementDisabled(ariaDisabledTextarea)).toBe(true);
    expect(isElementDisabled(ariaDisabledFalseTextarea)).toBe(false);

    expect(isElementDisabled(span)).toBe(false);
    expect(isElementDisabled(ariaDisabledSpan)).toBe(true);
    expect(isElementDisabled(ariaDisabledFalseSpan)).toBe(false);
  });
});

describe("isNotFocusable", () => {
  it("should not allow undefined elements or disabled elements unless the includeDisabled is true", () => {
    expect(isNotFocusable(undefined, true)).toBe(true);
    expect(isNotFocusable(undefined, false)).toBe(true);

    expect(isNotFocusable(button, false)).toBe(false);
    expect(isNotFocusable(disabledButton, false)).toBe(true);
    expect(isNotFocusable(ariaDisabledButton, false)).toBe(true);
    expect(isNotFocusable(ariaDisabledFalseButton, false)).toBe(false);
    expect(isNotFocusable(button, true)).toBe(false);
    expect(isNotFocusable(disabledButton, true)).toBe(false);
    expect(isNotFocusable(ariaDisabledButton, true)).toBe(false);
    expect(isNotFocusable(ariaDisabledFalseButton, true)).toBe(false);
  });
});

describe("getVirtualFocusDefaultIndex", () => {
  it("should return 0 if there is no active descendant id or no focusable elements", () => {
    expect(
      getVirtualFocusDefaultIndex({
        activeDescendantId: "",
        focusables: [button],
      })
    ).toBe(0);

    expect(
      getVirtualFocusDefaultIndex({
        activeDescendantId: "some-element-id",
        focusables: [],
      })
    ).toBe(0);
  });

  it("should return the index of the element matching the activeDescendantId or fallback to 0 if it doesn't exist somehow", () => {
    const focusables = [button, input, select, textarea];
    expect(
      getVirtualFocusDefaultIndex({ focusables, activeDescendantId: "fake" })
    ).toBe(0);
    expect(
      getVirtualFocusDefaultIndex({
        focusables,
        activeDescendantId: "button-1",
      })
    ).toBe(0);
    expect(
      getVirtualFocusDefaultIndex({ focusables, activeDescendantId: "input-1" })
    ).toBe(1);
    expect(
      getVirtualFocusDefaultIndex({
        focusables,
        activeDescendantId: "select-1",
      })
    ).toBe(2);
    expect(
      getVirtualFocusDefaultIndex({
        focusables,
        activeDescendantId: "textarea-1",
      })
    ).toBe(3);
    expect(
      getVirtualFocusDefaultIndex({ focusables, activeDescendantId: "input-1" })
    ).toBe(1);
  });
});

describe("getFirstFocusableIndex", () => {
  it("should return the first focusable element's index or -1", () => {
    expect(
      getFirstFocusableIndex({
        focusables: [],
        includeDisabled: false,
      })
    ).toBe(-1);
    expect(
      getFirstFocusableIndex({
        focusables: [],
        includeDisabled: true,
      })
    ).toBe(-1);

    expect(
      getFirstFocusableIndex({
        focusables: [
          disabledButton,
          disabledSelect,
          disabledInput,
          textarea,
          disabledTextarea,
        ],
        includeDisabled: false,
      })
    ).toBe(3);
    expect(
      getFirstFocusableIndex({
        focusables: [
          disabledButton,
          disabledSelect,
          disabledInput,
          textarea,
          disabledTextarea,
        ],
        includeDisabled: true,
      })
    ).toBe(0);

    expect(
      getFirstFocusableIndex({
        focusables: [
          disabledButton,
          disabledInput,
          disabledTextarea,
          disabledSelect,
          ariaDisabledSpan,
        ],
        includeDisabled: false,
      })
    ).toBe(-1);
  });
});

describe("getLastFocusableIndex", () => {
  it("should return the last focusable element's index or -1", () => {
    expect(
      getLastFocusableIndex({
        focusables: [],
        includeDisabled: false,
      })
    ).toBe(-1);
    expect(
      getLastFocusableIndex({
        focusables: [],
        includeDisabled: true,
      })
    ).toBe(-1);

    expect(
      getLastFocusableIndex({
        focusables: [
          disabledButton,
          select,
          disabledInput,
          textarea,
          disabledTextarea,
        ],
        includeDisabled: false,
      })
    ).toBe(3);
    expect(
      getLastFocusableIndex({
        focusables: [
          disabledButton,
          select,
          disabledInput,
          textarea,
          disabledTextarea,
        ],
        includeDisabled: true,
      })
    ).toBe(4);

    expect(
      getLastFocusableIndex({
        focusables: [
          disabledButton,
          disabledInput,
          disabledTextarea,
          disabledSelect,
          ariaDisabledSpan,
        ],
        includeDisabled: false,
      })
    ).toBe(-1);
  });
});

describe("getNextFocusableIndex", () => {
  it("should return the current focus index if there are no focusable elements somehow", () => {
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: true,
        currentFocusIndex: 100,
        focusables: [],
      })
    ).toBe(100);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: true,
        currentFocusIndex: 8,
        focusables: [],
      })
    ).toBe(8);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: -1,
        focusables: [],
      })
    ).toBe(-1);
    expect(
      getNextFocusableIndex({
        loopable: false,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 3,
        focusables: [],
      })
    ).toBe(3);
  });

  it("should correctly increment, decrement, and loop when all the elements are focusable", () => {
    const focusables = [button, input, select, textarea, span];
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: true,
        currentFocusIndex: 0,
        focusables: focusables,
      })
    ).toBe(1);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 0,
        focusables: focusables,
      })
    ).toBe(1);

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: true,
        currentFocusIndex: 1,
        focusables: focusables,
      })
    ).toBe(2);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 1,
        focusables: focusables,
      })
    ).toBe(2);

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: true,
        currentFocusIndex: 3,
        focusables: focusables,
      })
    ).toBe(2);

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 3,
        focusables: focusables,
      })
    ).toBe(2);

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: true,
        currentFocusIndex: 4,
        focusables: focusables,
      })
    ).toBe(0);
    expect(
      getNextFocusableIndex({
        loopable: false,
        increment: true,
        includeDisabled: true,
        currentFocusIndex: 4,
        focusables: focusables,
      })
    ).toBe(4);

    expect(
      getNextFocusableIndex({
        loopable: false,
        increment: false,
        includeDisabled: true,
        currentFocusIndex: 4,
        focusables: focusables,
      })
    ).toBe(3);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: true,
        currentFocusIndex: 0,
        focusables: focusables,
      })
    ).toBe(4);
    expect(
      getNextFocusableIndex({
        loopable: false,
        increment: false,
        includeDisabled: true,
        currentFocusIndex: 0,
        focusables: focusables,
      })
    ).toBe(0);
  });

  it("should ignore disabled elements correctly", () => {
    const focusables = [
      disabledButton,
      disabledInput,
      select,
      textarea,
      ariaDisabledSpan,
    ];

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 2,
        focusables,
      })
    ).toBe(3);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: true,
        includeDisabled: false,
        currentFocusIndex: 3,
        focusables,
      })
    ).toBe(2);

    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 2,
        focusables,
      })
    ).toBe(3);
    expect(
      getNextFocusableIndex({
        loopable: true,
        increment: false,
        includeDisabled: false,
        currentFocusIndex: 3,
        focusables,
      })
    ).toBe(2);
  });
});

describe("getSearchText", () => {
  it("should get the first letter from content ignoring icons and hidden elements", () => {
    const button = document.createElement("button");
    button.textContent = "Button";
    const span = document.createElement("span");
    span.textContent = "Span";

    expect(getSearchText(button, false)).toBe("");
    expect(getSearchText(button, true)).toBe("B");
    expect(getSearchText(span, false)).toBe("");
    expect(getSearchText(span, true)).toBe("S");

    const leadingFontIcon = document.createElement("span");
    const fontIcon = document.createElement("span");
    fontIcon.className = "rmd-icon rmd-icon--font";
    fontIcon.textContent = "favorite";
    leadingFontIcon.prepend(fontIcon);
    leadingFontIcon.append(document.createTextNode("Text Content"));
    expect(getSearchText(leadingFontIcon, false)).toBe("");
    expect(getSearchText(leadingFontIcon, true)).toBe("T");

    const leadingHiddenElement = document.createElement("button");
    const hiddenElement = document.createElement("span");
    hiddenElement.hidden = true;
    hiddenElement.textContent = "Waka";
    leadingHiddenElement.prepend(hiddenElement);
    leadingHiddenElement.append(span.cloneNode(true));
    expect(getSearchText(leadingHiddenElement, false)).toBe("");
    expect(getSearchText(leadingHiddenElement, true)).toBe("S");

    const lowercase = document.createElement("span");
    lowercase.textContent = "lowercase";
    expect(getSearchText(lowercase, true)).toBe("L");
  });
});

describe("recalculateFocusIndex", () => {
  const focusables = [button, select, input, textarea];
  beforeEach(() => {
    document.body.append(...focusables);
  });

  afterEach(() => {
    focusables.forEach((element) => element.remove());
  });

  it("should return the index of the document.activeElement if the tabIndexBehavior is not virtual", () => {
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: undefined,
        activeDescendantId: "",
      })
    ).toBe(-1);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: undefined,
        activeDescendantId: "some-active-id",
      })
    ).toBe(-1);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "roving",
        activeDescendantId: "",
      })
    ).toBe(-1);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "roving",
        activeDescendantId: "some-active-id",
      })
    ).toBe(-1);

    select.focus();
    expect(document.activeElement).toBe(select);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: undefined,
        activeDescendantId: "",
      })
    ).toBe(1);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "roving",
        activeDescendantId: "",
      })
    ).toBe(1);

    textarea.focus();
    expect(document.activeElement).toBe(textarea);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: undefined,
        activeDescendantId: "",
      })
    ).toBe(3);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "roving",
        activeDescendantId: "",
      })
    ).toBe(3);
  });

  it("should use the getVirtualFocusDefaultIndex behavior when the tabIndexBehavior is virtual", () => {
    expect(document.activeElement).toBe(document.body);

    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "virtual",
        activeDescendantId: "",
      })
    ).toBe(0);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "virtual",
        activeDescendantId: "button-1",
      })
    ).toBe(0);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "virtual",
        activeDescendantId: "select-1",
      })
    ).toBe(1);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "virtual",
        activeDescendantId: "input-1",
      })
    ).toBe(2);
    expect(
      recalculateFocusIndex({
        focusables,
        tabIndexBehavior: "virtual",
        activeDescendantId: "textarea-1",
      })
    ).toBe(3);
  });
});
