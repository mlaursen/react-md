import { fireEvent, render } from "@testing-library/react";
import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react";
import { useEffect } from "react";

import { UserInteractionModeProvider } from "../../../interaction/UserInteractionModeProvider";
import { useActiveDescendantContext } from "../activeDescendantContext";
import { ActiveDescendantMovementProvider } from "../ActiveDescendantMovementProvider";
import { KeyboardMovementProvider } from "../KeyboardMovementProvider";
import type {
  KeyboardMovementBehavior,
  KeyboardMovementConfiguration,
} from "../types";
import { useActiveDescendant } from "../useActiveDescendant";
import type { ActiveDescendantFocusHookOptions } from "../useActiveDescendantFocus";
import { useActiveDescendantFocus } from "../useActiveDescendantFocus";

function Descendant({
  id,
  nodeRef,
  role = "option",
  tabIndex = -1,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  id: string;
  nodeRef?: Ref<HTMLDivElement>;
}): ReactElement {
  const { ref, active } = useActiveDescendant({
    id: id,
    ref: nodeRef,
  });

  return (
    <div
      {...props}
      id={id}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={active ? "active" : undefined}
    >
      {children}
    </div>
  );
}

interface ActiveDescendantContainerProps
  extends ActiveDescendantFocusHookOptions<HTMLDivElement> {
  children?: ReactNode;
}

function ActiveDescendantContainer({
  children,
  ...options
}: ActiveDescendantContainerProps): ReactElement {
  const {
    providerProps,
    focusIndex: _focusIndex,
    ...props
  } = useActiveDescendantFocus(options);

  return (
    <div {...props} id="listbox" role="listbox" tabIndex={0}>
      <ActiveDescendantMovementProvider {...providerProps}>
        {children ||
          Array.from({ length: 5 }, (_, i) => (
            <Descendant id={`option-${i + 1}`} key={i}>
              {`Option ${i + 1}`}
            </Descendant>
          ))}
      </ActiveDescendantMovementProvider>
    </div>
  );
}

interface TestProps
  extends KeyboardMovementBehavior,
    KeyboardMovementConfiguration,
    ActiveDescendantFocusHookOptions<HTMLDivElement> {}

function Test({
  onFocus,
  onSearch,
  onKeyDown,
  onDecrement,
  onIncrement,
  onJumpToLast,
  onJumpToFirst,
  defaultActiveId,
  ...props
}: TestProps): ReactElement {
  return (
    <UserInteractionModeProvider>
      <KeyboardMovementProvider {...props}>
        <ActiveDescendantContainer
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onJumpToLast={onJumpToLast}
          onJumpToFirst={onJumpToFirst}
          defaultActiveId={defaultActiveId}
        />
      </KeyboardMovementProvider>
    </UserInteractionModeProvider>
  );
}

describe("ActiveDescendantMovementProvider", () => {
  it("should throw an error if there is not a KeyboardMovementProvider or ActiveDescendantMovementProvider as a parent component", () => {
    function NoKeyboardMovementProvider(): ReactElement {
      return (
        <ActiveDescendantMovementProvider activeId="" setActiveId={() => {}}>
          <Descendant id="child-1">Child 1</Descendant>
        </ActiveDescendantMovementProvider>
      );
    }

    function NoActiveDescendantMovementProvider(): null {
      const { setActiveId } = useActiveDescendantContext();
      useEffect(() => {
        setActiveId("boop");
      }, [setActiveId]);
      return null;
    }

    const error = jest.spyOn(console, "error").mockImplementation(() => {
      // don't print error to console
    });
    expect(() => {
      render(<NoKeyboardMovementProvider />);
    }).toThrowError("KeyboardMovementProvider must be a parent component.");
    expect(() => {
      render(<NoActiveDescendantMovementProvider />);
    }).toThrowError(
      "ActiveDescendantMovementProvider must be a parent component."
    );
    error.mockRestore();
  });

  // TODO
  it("should correctly focus elements when there is no default active id", () => {
    const { getByRole } = render(<Test />);
    const listbox = getByRole("listbox");
    const option1 = getByRole("option", { name: "Option 1" });
    const option2 = getByRole("option", { name: "Option 2" });
    const option3 = getByRole("option", { name: "Option 3" });
    const option4 = getByRole("option", { name: "Option 4" });
    const option5 = getByRole("option", { name: "Option 5" });

    expect(document.activeElement).toBe(document.body);
    expect(listbox).toHaveAttribute("aria-activedescendant", "");
    expect(option1).not.toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    fireEvent.keyDown(document.body, { key: "Tab" });
    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "");

    expect(document.activeElement).toBe(listbox);
    fireEvent.keyDown(listbox, { key: "ArrowUp" });
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-1");
    expect(option1).toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-2");
    expect(option1).not.toHaveClass("active");
    expect(option2).toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");
  });

  it("should allow for a defaultActiveId", () => {
    const { getByRole } = render(<Test defaultActiveId="option-1" />);
    const listbox = getByRole("listbox");
    const option1 = getByRole("option", { name: "Option 1" });
    const option2 = getByRole("option", { name: "Option 2" });

    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: "Tab" });
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-1");
    expect(option1).toHaveClass("active");
    expect(option2).not.toHaveClass("active");

    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-1");
    expect(option1).toHaveClass("active");
    expect(option2).not.toHaveClass("active");

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-2");
    expect(option1).not.toHaveClass("active");
    expect(option2).toHaveClass("active");
  });

  it("should handle looping correctly", () => {
    const { getByRole } = render(<Test loopable />);
    const listbox = getByRole("listbox");
    const option1 = getByRole("option", { name: "Option 1" });
    const option2 = getByRole("option", { name: "Option 2" });
    const option3 = getByRole("option", { name: "Option 3" });
    const option4 = getByRole("option", { name: "Option 4" });
    const option5 = getByRole("option", { name: "Option 5" });

    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: "Tab" });
    expect(listbox).toHaveAttribute("aria-activedescendant", "");
    expect(option1).not.toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "");

    fireEvent.keyDown(listbox, { key: "ArrowUp" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-5");
    expect(option1).not.toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).toHaveClass("active");

    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-1");
    expect(option1).toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");
  });

  it("should handle searching correctly", () => {
    const { getByRole } = render(<Test searchable />);
    const listbox = getByRole("listbox");
    const option1 = getByRole("option", { name: "Option 1" });
    const option2 = getByRole("option", { name: "Option 2" });
    const option3 = getByRole("option", { name: "Option 3" });
    const option4 = getByRole("option", { name: "Option 4" });
    const option5 = getByRole("option", { name: "Option 5" });

    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: "Tab" });
    expect(listbox).toHaveAttribute("aria-activedescendant", "");
    expect(option1).not.toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "");

    fireEvent.keyDown(listbox, { key: "A" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "");
    expect(option1).not.toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    fireEvent.keyDown(listbox, { key: "O" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-1");
    expect(option1).toHaveClass("active");
    expect(option2).not.toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");

    fireEvent.keyDown(listbox, { key: "O" });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute("aria-activedescendant", "option-2");
    expect(option1).not.toHaveClass("active");
    expect(option2).toHaveClass("active");
    expect(option3).not.toHaveClass("active");
    expect(option4).not.toHaveClass("active");
    expect(option5).not.toHaveClass("active");
  });
});
