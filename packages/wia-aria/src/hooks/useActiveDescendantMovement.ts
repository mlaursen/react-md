import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";

import createKeyboardClickHandler from "../utils/createKeyboardClickHandler";
import getFocusableElements from "../utils/getFocusableElements";

import { useKeyboardFocusContext } from "./useKeyboardFocus";
import useKeyboardFocusEventHandler, {
  IKeyboardFocusOptions,
} from "./useKeyboardFocusEventHandler";

interface IActiveDescendantMovementOptions<E extends HTMLElement>
  extends Partial<IKeyboardFocusOptions> {
  defaultActiveId?: string | null;
  defaultActiveFirst?: boolean;
  defaultActiveIndex?: number;
}

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

export interface IActiveDescendantProps<E> {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
  onKeyDown: HTMLAttributes<E>["onKeyDown"];
}

export function useActiveDescendantMovement<
  E extends HTMLElement = HTMLElement
>({
  defaultActiveId = null,
  defaultActiveFirst = true,
  defaultActiveIndex,
  onKeyboardFocus,
  onKeyDown,
  ...focusOptions
}: IActiveDescendantMovementOptions<E>): IActiveDescendantProps<E> {
  const [activeId, setActiveId] = useState(defaultActiveId || "");
  const { setFocusedId } = useKeyboardFocusContext();
  const handleKeyDown = useKeyboardFocusEventHandler({
    onKeyDown: createKeyboardClickHandler(onKeyDown),
    onKeyboardFocus: (value, event) => {
      if (onKeyboardFocus) {
        onKeyboardFocus(value, event);
      }

      const { id } = value.element;
      setActiveId(id);
      setFocusedId(id);
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
    setActiveId,
    onKeyDown: handleKeyDown,
  };
}
