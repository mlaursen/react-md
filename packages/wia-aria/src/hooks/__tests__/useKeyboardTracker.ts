import { cleanup, testHook, act } from "react-testing-library";
import useKeyboardTrackerState, {
  useKeyboardTrackerEnabler,
  useKeyboardTrackerDisabler,
  useKeyboardWindowBlurTracker,
  useKeyboardDefaultTracker,
} from "../useKeyboardTrackerState";

let button: HTMLButtonElement | null = null;
let input: HTMLInputElement | null = null;

const createFakeElements = () => {
  input = document.createElement("input");
  input.id = "input-id";
  input.type = "text";
  button = document.createElement("button");
  button.id = "button-id";
  button.type = "button";
  document.body.appendChild(input);
  document.body.appendChild(button);
};

const removeFakeElements = () => {
  if (input) {
    document.body.removeChild(input);
  }

  if (button) {
    document.body.removeChild(button);
  }

  input = null;
  button = null;
};

beforeEach(() => {
  createFakeElements();
  window.addEventListener = jest.fn(window.addEventListener);
  window.removeEventListener = jest.fn(window.removeEventListener);
});

afterEach(() => {
  removeFakeElements();
  cleanup();
});

describe("useKeyboardTrackerEnabler", () => {
  it("should attach a keydown event listener when keyboard mode is not enabled", () => {
    const enable = jest.fn();
    testHook(() => useKeyboardTrackerEnabler(false, enable));

    expect(window.addEventListener).toBeCalledWith("keydown", enable, true);
  });

  it("should not attach a keydown event listener when keyboard mode is enabled", () => {
    const enable = jest.fn();
    testHook(() => useKeyboardTrackerEnabler(true, enable));

    expect(window.addEventListener).not.toBeCalledWith("keydown", enable, true);
  });

  it("should trigger the enable function on keydown", () => {
    const keyDownEvent = new KeyboardEvent("keydown", { bubbles: true });
    const enable = jest.fn();
    testHook(() => useKeyboardTrackerEnabler(false, enable));
    expect(enable).not.toBeCalled();

    act(() => {
      window.dispatchEvent(keyDownEvent);
    });
    expect(enable).toBeCalledTimes(1);

    enable.mockClear();
    expect(enable).not.toBeCalled();
    act(() => {
      (input as HTMLInputElement).dispatchEvent(keyDownEvent);
    });
    expect(enable).toBeCalledTimes(1);

    enable.mockClear();
    expect(enable).not.toBeCalled();
    act(() => {
      (button as HTMLButtonElement).dispatchEvent(keyDownEvent);
    });
    expect(enable).toBeCalledTimes(1);
  });
});

describe("useKeyboardTrackerDisabler", () => {
  it("should attach a mousedown event when keyboard mode is enabled", () => {
    const disable = jest.fn();
    testHook(() => useKeyboardTrackerDisabler(true, disable));

    expect(window.addEventListener).toBeCalledWith("mousedown", disable, true);
  });

  it("should not attach a mousedown event when keyboard mode is disabled", () => {
    const disable = jest.fn();
    testHook(() => useKeyboardTrackerDisabler(false, disable));

    expect(window.addEventListener).not.toBeCalledWith(
      "mousedown",
      disable,
      true
    );
  });

  it("should trigger the disable function on mousdown", () => {
    const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
    const disable = jest.fn();
    testHook(() => useKeyboardTrackerDisabler(true, disable));
    expect(disable).not.toBeCalled();

    act(() => {
      document.body.dispatchEvent(mouseDownEvent);
    });
    expect(disable).toBeCalledTimes(1);

    disable.mockClear();
    expect(disable).not.toBeCalled();
    act(() => {
      (input as HTMLInputElement).dispatchEvent(mouseDownEvent);
    });
    expect(disable).toBeCalledTimes(1);

    disable.mockClear();
    expect(disable).not.toBeCalled();
    act(() => {
      (button as HTMLButtonElement).dispatchEvent(mouseDownEvent);
    });
    expect(disable).toBeCalledTimes(1);
  });
});

describe("useKeyboardWindowBlurTracker", () => {
  it("should attach a window blur event handler when keyboard mode is enabled", () => {
    const setFocusedId = jest.fn();
    testHook(() => useKeyboardWindowBlurTracker(true, setFocusedId));

    // can't test the function exactly since there's a custom handler implementation
    expect(window.addEventListener).toBeCalledWith(
      "blur",
      expect.any(Function)
    );
  });

  it("should not attach a window blur event handler when keyboard mode is disabled", () => {
    const setFocusedId = jest.fn();
    testHook(() => useKeyboardWindowBlurTracker(false, setFocusedId));

    // can't test the function exactly since there's a custom handler implementation
    expect(window.addEventListener).not.toBeCalledWith(
      "blur",
      expect.any(Function)
    );
  });

  it("should call the setFocusedId action with null if the blur target was the window element", () => {
    const blurEvent = new FocusEvent("blur", { bubbles: true });
    const setFocusedId = jest.fn();
    testHook(() => useKeyboardWindowBlurTracker(true, setFocusedId));

    act(() => {
      window.dispatchEvent(blurEvent);
    });

    expect(setFocusedId).toBeCalledWith(null);
  });

  it("should not call the setFocusedId if the blur target was not the window element", () => {
    const blurEvent = new FocusEvent("blur", { bubbles: true });
    const setFocusedId = jest.fn();

    testHook(() => useKeyboardWindowBlurTracker(true, setFocusedId));

    // not sure how to "prove" that the event handler is still called, but adding logs into the
    // main hook shows they are called.
    act(() => {
      (input as HTMLInputElement).dispatchEvent(blurEvent);
      (button as HTMLButtonElement).dispatchEvent(blurEvent);
    });

    expect(setFocusedId).not.toBeCalled();
  });
});

describe("useKeyboardDefaultTracker", () => {
  it("should attach a keyup event handler when keyboard mode is enabled", () => {
    testHook(() => useKeyboardDefaultTracker("", jest.fn(), true));

    expect(window.addEventListener).toBeCalledWith(
      "keyup",
      expect.any(Function),
      true
    );
  });

  it("should not attach a keyup event handler when keyboard mode is disabled", () => {
    testHook(() => useKeyboardDefaultTracker("", jest.fn(), false));

    expect(window.addEventListener).not.toBeCalledWith(
      "keyup",
      expect.any(Function),
      true
    );
  });

  it("should trigger the setFocusedId callback with the element's id on Tab, Enter, or Spacebar key presses", () => {
    const setFocusedId = jest.fn();
    testHook(() => useKeyboardDefaultTracker("", setFocusedId, true));

    const tabEvent = new KeyboardEvent("keyup", { key: "Tab", bubbles: true });

    act(() => {
      (input as HTMLInputElement).dispatchEvent(tabEvent);
      (button as HTMLButtonElement).dispatchEvent(tabEvent);
    });
    expect(setFocusedId).toBeCalledWith((input as HTMLInputElement).id);
    expect(setFocusedId).toBeCalledWith((button as HTMLButtonElement).id);

    setFocusedId.mockClear();
    const enterEvent = new KeyboardEvent("keyup", {
      key: "Enter",
      bubbles: true,
    });
    act(() => {
      (input as HTMLInputElement).dispatchEvent(enterEvent);
      (button as HTMLButtonElement).dispatchEvent(enterEvent);
    });
    expect(setFocusedId).toBeCalledWith((input as HTMLInputElement).id);
    expect(setFocusedId).toBeCalledWith((button as HTMLButtonElement).id);

    setFocusedId.mockClear();
    const spaceEvent = new KeyboardEvent("keyup", { key: " ", bubbles: true });
    act(() => {
      (input as HTMLInputElement).dispatchEvent(spaceEvent);
      (button as HTMLButtonElement).dispatchEvent(spaceEvent);
    });
    expect(setFocusedId).toBeCalledWith((input as HTMLInputElement).id);
    expect(setFocusedId).toBeCalledWith((button as HTMLButtonElement).id);
  });

  it("should not trigger the setFocusedId callback if the element does not have an id attribute", () => {
    const buttonWithoutId = document.createElement("button");
    buttonWithoutId.type = "button";
    document.body.appendChild(buttonWithoutId);

    const setFocusedId = jest.fn();
    testHook(() => useKeyboardDefaultTracker("", setFocusedId, true));

    const tabEvent = new KeyboardEvent("keyup", { key: "Tab", bubbles: true });
    const enterEvent = new KeyboardEvent("keyup", {
      key: "Enter",
      bubbles: true,
    });
    const spaceEvent = new KeyboardEvent("keyup", { key: " ", bubbles: true });

    act(() => {
      buttonWithoutId.dispatchEvent(tabEvent);
      buttonWithoutId.dispatchEvent(enterEvent);
      buttonWithoutId.dispatchEvent(spaceEvent);
    });

    expect(setFocusedId).not.toBeCalled();
    document.body.removeChild(buttonWithoutId);
  });

  it("should not trigger the setFocusedId callback if the current focusedId is the same as the element's id", () => {
    const tabEvent = new KeyboardEvent("keyup", { key: "Tab", bubbles: true });
    const setFocusedId = jest.fn();
    testHook(() =>
      useKeyboardDefaultTracker(
        (button as HTMLButtonElement).id,
        setFocusedId,
        true
      )
    );

    act(() => {
      (button as HTMLButtonElement).dispatchEvent(tabEvent);
    });
    expect(setFocusedId).not.toBeCalled();
  });
});

describe("useKeyboardTrackerState", () => {
  it("should return the correct state object", () => {
    let value;
    testHook(() => (value = useKeyboardTrackerState()));
    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState(null)));
    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState(null, false)));
    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState(null, true)));
    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("")));
    expect(value).toMatchObject({
      focusedId: "",
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("", false)));
    expect(value).toMatchObject({
      focusedId: "",
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("", true)));
    expect(value).toMatchObject({
      focusedId: "",
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("default-id")));
    expect(value).toMatchObject({
      focusedId: "default-id",
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("default-id", false)));
    expect(value).toMatchObject({
      focusedId: "default-id",
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });

    testHook(() => (value = useKeyboardTrackerState("default-id", true)));
    expect(value).toMatchObject({
      focusedId: "default-id",
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });
  });

  it.only("should update correctly", () => {
    const btn = button as HTMLButtonElement;
    const inp = input as HTMLInputElement;
    let value;
    testHook(() => (value = useKeyboardTrackerState()));

    // switch to keyboard mode
    act(() => {
      btn.focus();
      btn.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    });

    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });

    // trigger tab from button
    act(() => {
      btn.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
      );

      inp.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Tab", bubbles: true })
      );
    });

    expect(value).toMatchObject({
      focusedId: inp.id,
      isKeyboardMode: true,
      setFocusedId: expect.any(Function),
    });

    // click somewhere on the page
    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(value).toMatchObject({
      focusedId: null,
      isKeyboardMode: false,
      setFocusedId: expect.any(Function),
    });
  });
});
