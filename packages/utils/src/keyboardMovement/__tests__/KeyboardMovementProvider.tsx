import { fireEvent, render } from "@testing-library/react";
import {
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

import { UserInteractionModeListener } from "../../mode/UserInteractionModeListener";
import { KeyboardMovementProvider } from "../KeyboardMovementProvider";
import {
  KeyboardMovementBehavior,
  KeyboardMovementConfiguration,
} from "../types";
import {
  KeyboardFocusHandler,
  KeyboardFocusHookOptions,
  useKeyboardFocus,
} from "../useKeyboardFocus";
import { useKeyboardFocusableElement } from "../useKeyboardFocusableElement";

function FocusableChild({
  nodeRef,
  role = "menuitem",
  tabIndex = -1,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  nodeRef?: Ref<HTMLDivElement>;
}): ReactElement {
  const refCallback = useKeyboardFocusableElement(nodeRef);

  return (
    <div {...props} ref={refCallback} role={role} tabIndex={tabIndex}>
      {children}
    </div>
  );
}

interface CustomFocusContainerProps
  extends KeyboardFocusHookOptions<HTMLDivElement> {
  children?: ReactNode;
  disabledIndexes?: number[];
}

function CustomFocusContainer({
  children,
  disabledIndexes = [],
  ...props
}: CustomFocusContainerProps): ReactElement {
  const { onKeyDown, onFocus } = useKeyboardFocus(props);

  return (
    <div role="menu" tabIndex={-1} onFocus={onFocus} onKeyDown={onKeyDown}>
      {children ||
        Array.from({ length: 5 }, (_, i) => (
          <FocusableChild
            aria-disabled={disabledIndexes.includes(i)}
            key={i}
            id={`child-${i + 1}`}
          >
            {`Child ${i + 1}`}
          </FocusableChild>
        ))}
    </div>
  );
}

interface TestProps
  extends KeyboardMovementBehavior,
    KeyboardMovementConfiguration,
    CustomFocusContainerProps {}

function Test({
  children,
  disabledIndexes,
  onFocus,
  onSearch,
  onKeyDown,
  onDecrement,
  onIncrement,
  onJumpToLast,
  onFocusChange,
  onJumpToFirst,
  ...props
}: TestProps): ReactElement {
  return (
    <UserInteractionModeListener>
      <KeyboardMovementProvider {...props}>
        <CustomFocusContainer
          disabledIndexes={disabledIndexes}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onJumpToLast={onJumpToLast}
          onJumpToFirst={onJumpToFirst}
          onFocusChange={onFocusChange}
        >
          {children}
        </CustomFocusContainer>
      </KeyboardMovementProvider>
    </UserInteractionModeListener>
  );
}

const list = [
  "Frozen yogurt",
  "Ice cream sandwhich",
  "Eclair",
  "Cupcake",
  "Gingerbread",
  "Jelly bean",
  "Lollipop",
  "Honeycomb",
  "Custard",
  "Donut",
  "KitKat",
  "Chocolate cake",
  "Vanilla ice cream",
] as const;

interface SearchTestProps
  extends Omit<KeyboardMovementBehavior, "searchable">,
    KeyboardMovementConfiguration {
  disabledNames?: readonly typeof list[number][];
}

function SearchTest({
  disabledNames = [],
  ...props
}: SearchTestProps): ReactElement {
  return (
    <Test {...props} searchable>
      {list.map((name, i) => (
        <FocusableChild
          key={name}
          id={`child-${i + 1}`}
          aria-disabled={disabledNames.includes(name)}
        >
          {name}
        </FocusableChild>
      ))}
    </Test>
  );
}

describe("KeyboardMovementProvider", () => {
  it("should throw an error if a child attempts to attach or detach a ref without a parent KeyboardMovementProvider", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {
      // don't print error to console
    });
    expect(() => render(<CustomFocusContainer />)).toThrowError(
      "KeyboardMovementProvider must be a parent component."
    );
    error.mockRestore();
  });

  it("should default to focusing the first element, not looping, not focusing elements when typing, and the DEFAULT_KEYBOARD_MOVEMENT keys", () => {
    const { getByRole } = render(<Test />);
    const menu = getByRole("menu");
    const child1 = getByRole("menuitem", { name: "Child 1" });
    const child2 = getByRole("menuitem", { name: "Child 2" });
    const child3 = getByRole("menuitem", { name: "Child 3" });
    const child4 = getByRole("menuitem", { name: "Child 4" });
    const child5 = getByRole("menuitem", { name: "Child 5" });

    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });

    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child3);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(child5);
  });

  it("should allow the keyboard focus to be looped", () => {
    const { getByRole } = render(<Test loopable />);
    const menu = getByRole("menu");
    const child1 = getByRole("menuitem", { name: "Child 1" });
    const child2 = getByRole("menuitem", { name: "Child 2" });
    const child3 = getByRole("menuitem", { name: "Child 3" });
    const child4 = getByRole("menuitem", { name: "Child 4" });
    const child5 = getByRole("menuitem", { name: "Child 5" });

    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });

    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child3);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(child1);
  });

  it("should allow the focus to move by typing the first letter of the element", () => {
    const { getByRole, rerender } = render(<SearchTest />);
    const menu = getByRole("menu");
    const frozenYogurt = getByRole("menuitem", { name: "Frozen yogurt" });
    const eclair = getByRole("menuitem", { name: "Eclair" });
    const cupcake = getByRole("menuitem", { name: "Cupcake" });
    const jellyBean = getByRole("menuitem", { name: "Jelly bean" });
    const custard = getByRole("menuitem", { name: "Custard" });
    const chocolateCake = getByRole("menuitem", { name: "Chocolate cake" });

    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });

    fireEvent.focus(menu);
    expect(document.activeElement).toBe(frozenYogurt);

    fireEvent.keyDown(frozenYogurt, { key: "E" });
    expect(document.activeElement).toBe(eclair);

    fireEvent.keyDown(eclair, { key: "J" });
    expect(document.activeElement).toBe(jellyBean);

    fireEvent.keyDown(jellyBean, { key: "C" });
    expect(document.activeElement).toBe(custard);

    fireEvent.keyDown(custard, { key: "C" });
    expect(document.activeElement).toBe(chocolateCake);

    fireEvent.keyDown(custard, { key: "C" });
    expect(document.activeElement).toBe(cupcake);

    fireEvent.keyDown(custard, { key: "C" });
    expect(document.activeElement).toBe(custard);

    fireEvent.keyDown(custard, { key: "E" });
    expect(document.activeElement).toBe(eclair);

    rerender(<SearchTest disabledNames={["Cupcake"]} />);
    expect(document.activeElement).toBe(eclair);

    fireEvent.keyDown(eclair, { key: "C" });
    expect(document.activeElement).toBe(custard);

    fireEvent.keyDown(custard, { key: "E" });
    expect(document.activeElement).toBe(eclair);

    rerender(<SearchTest disabledNames={["Cupcake"]} includeDisabled />);
    expect(document.activeElement).toBe(eclair);

    fireEvent.keyDown(eclair, { key: "C" });
    expect(document.activeElement).toBe(cupcake);
  });

  it("should not focus disabled elements by default", () => {
    const { getByRole, rerender } = render(
      <Test disabledIndexes={[0, 2, 4]} />
    );
    let menu = getByRole("menu");
    let child1 = getByRole("menuitem", { name: "Child 1" });
    let child2 = getByRole("menuitem", { name: "Child 2" });
    let child3 = getByRole("menuitem", { name: "Child 3" });
    let child4 = getByRole("menuitem", { name: "Child 4" });
    let child5 = getByRole("menuitem", { name: "Child 5" });
    expect(child1).toHaveAttribute("aria-disabled", "true");
    expect(child2).not.toHaveAttribute("aria-disabled", "true");
    expect(child3).toHaveAttribute("aria-disabled", "true");
    expect(child4).not.toHaveAttribute("aria-disabled", "true");
    expect(child5).toHaveAttribute("aria-disabled", "true");
    expect(document.activeElement).toBe(document.body);

    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });

    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(child2);

    rerender(<Test disabledIndexes={[0, 2, 4]} loopable key="reset" />);
    menu = getByRole("menu");
    child1 = getByRole("menuitem", { name: "Child 1" });
    child2 = getByRole("menuitem", { name: "Child 2" });
    child3 = getByRole("menuitem", { name: "Child 3" });
    child4 = getByRole("menuitem", { name: "Child 4" });
    child5 = getByRole("menuitem", { name: "Child 5" });
    expect(child1).toHaveAttribute("aria-disabled", "true");
    expect(child2).not.toHaveAttribute("aria-disabled", "true");
    expect(child3).toHaveAttribute("aria-disabled", "true");
    expect(child4).not.toHaveAttribute("aria-disabled", "true");
    expect(child5).toHaveAttribute("aria-disabled", "true");

    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child2);
  });

  it("should maintain focus on the current element if there are no other focusable elements available", () => {
    const { getByRole } = render(<Test disabledIndexes={[2, 3, 4]} />);
    const menu = getByRole("menu");
    const child1 = getByRole("menuitem", { name: "Child 1" });
    const child2 = getByRole("menuitem", { name: "Child 2" });
    const child3 = getByRole("menuitem", { name: "Child 3" });
    const child4 = getByRole("menuitem", { name: "Child 4" });
    const child5 = getByRole("menuitem", { name: "Child 5" });
    expect(child1).not.toHaveAttribute("aria-disabled", "true");
    expect(child2).not.toHaveAttribute("aria-disabled", "true");
    expect(child3).toHaveAttribute("aria-disabled", "true");
    expect(child4).toHaveAttribute("aria-disabled", "true");
    expect(child5).toHaveAttribute("aria-disabled", "true");
    expect(document.activeElement).toBe(document.body);

    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(child1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(child2, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);
  });

  it("should allow disabled elements to be focusable if the includeDisabled prop is true", () => {
    const { getByRole } = render(
      <Test loopable includeDisabled disabledIndexes={[0, 2, 4]} />
    );
    const menu = getByRole("menu");
    const child1 = getByRole("menuitem", { name: "Child 1" });
    const child2 = getByRole("menuitem", { name: "Child 2" });
    const child3 = getByRole("menuitem", { name: "Child 3" });
    const child4 = getByRole("menuitem", { name: "Child 4" });
    const child5 = getByRole("menuitem", { name: "Child 5" });

    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: "Tab" });

    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child1);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child2);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child3);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child4);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(child5);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(child1);
  });

  it("should prevent default behavior if any of the KeyboardFocusContext call event.stopPropagation()", () => {
    const stopPropagation: KeyboardFocusHandler<HTMLDivElement> = ({
      event,
    }) => {
      event.stopPropagation();
    };
    const onFocus = jest.fn((event: FocusEvent<HTMLDivElement>) =>
      event.stopPropagation()
    );
    const onKeyDown = jest.fn((event: KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();
    });
    const onSearch = jest.fn(stopPropagation);
    const onIncrement = jest.fn(stopPropagation);
    const onDecrement = jest.fn(stopPropagation);
    const onJumpToFirst = jest.fn(stopPropagation);
    const onJumpToLast = jest.fn(stopPropagation);
    const { getByRole, rerender } = render(
      <Test
        searchable
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onSearch={onSearch}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onJumpToFirst={onJumpToFirst}
        onJumpToLast={onJumpToLast}
      />
    );
    const menu = getByRole("menu");
    expect(document.activeElement).toBe(document.body);
    expect(onFocus).not.toBeCalled();
    expect(onKeyDown).not.toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();

    fireEvent.focus(menu);
    expect(onFocus).toBeCalled();
    expect(onKeyDown).not.toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    rerender(
      <Test
        searchable
        onSearch={onSearch}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onJumpToFirst={onJumpToFirst}
        onJumpToLast={onJumpToLast}
      />
    );
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "C" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(menu, { key: "End" });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).toBeCalled();
    expect(onJumpToLast).toBeCalled();
    expect(document.activeElement).toBe(document.body);
  });
});
