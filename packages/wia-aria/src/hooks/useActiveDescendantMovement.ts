import { Dispatch, SetStateAction, useState } from "react";
import {
  KeyboardFocusKeys,
  WithKeyboardFocusCallback,
  WithEventHandlers,
  EventHandlersWithKeyDown,
} from "../types.d";
import createKeyboardClickHandler from "../utils/createKeyboardClickHandler";
import getFocusableElements from "../utils/getFocusableElements";
import {
  useKeyboardFocusContext,
  useKeyboardFocusEventHandler,
} from "./useKeyboardFocus";

export interface DefaultIdOptions<E extends HTMLElement> {
  instance: E | null;
  activeId: string;
  defaultActiveId: string | null;
  defaultActiveFirst: boolean;
  defaultActiveIndex: number | undefined;
}

export function getDefaultActiveId<E extends HTMLElement>({
  instance,
  activeId,
  defaultActiveId,
  defaultActiveFirst,
  defaultActiveIndex,
}: DefaultIdOptions<E>) {
  const isIndexed = typeof defaultActiveIndex === "number";
  if (defaultActiveId) {
    return defaultActiveId;
  } else if (!instance) {
    return isIndexed ? activeId : defaultActiveId || "";
  }

  const focusableElements = getFocusableElements(instance);
  if (isIndexed) {
    return focusableElements[defaultActiveIndex as number].id as string;
  }

  const index = defaultActiveFirst ? 0 : focusableElements.length - 1;
  return focusableElements[index].id as string;
}

interface IActiveDescendantMovementOptions<
  H = {},
  E extends HTMLElement = HTMLElement
>
  extends KeyboardFocusKeys,
    WithEventHandlers<H, E>,
    WithKeyboardFocusCallback {
  defaultActiveId: string;
}

export interface IActiveDescendantValues<
  H,
  E extends HTMLElement = HTMLElement
> extends EventHandlersWithKeyDown<H, E> {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
}

export function useActiveDescendantMovement<
  H = {},
  E extends HTMLElement = HTMLElement
>({
  handlers: providedHandlers,
  onKeyboardFocus,
  defaultActiveId,
  ...focusOptions
}: IActiveDescendantMovementOptions<H, E>): IActiveDescendantValues<H, E> {
  const [activeId, setActiveId] = useState(defaultActiveId || "");
  const { setFocusedId } = useKeyboardFocusContext();
  const updateId = (id: string | ((prevId: string) => string)) => {
    if (typeof id === "function") {
      id = id(activeId);
    }

    setActiveId(id);
    setFocusedId(id);
  };

  const updatedHandlers = useKeyboardFocusEventHandler({
    handlers: {
      ...providedHandlers,
      onKeyDown: createKeyboardClickHandler(providedHandlers.onKeyDown),
    },
    onKeyboardFocus: (value, event) => {
      if (onKeyboardFocus) {
        onKeyboardFocus(value, event);
      }

      const { id } = value.element;
      updateId(id);
      if (event.currentTarget) {
        // this might be a bit hacky.. but this is a way to ensure that the element is
        // visible by triggering the native scroll behavior of focus as and then
        // resetting the focus back to the container element so keyboard events continue
        // to work
        value.element.focus();
        event.currentTarget.focus();
      }
    },
    ...focusOptions,
  });

  return {
    activeId,
    setActiveId: updateId,
    handlers: updatedHandlers.handlers,
  };
}
