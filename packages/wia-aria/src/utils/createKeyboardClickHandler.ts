import { HTMLAttributes } from "react";
import { ACTIVE_DESCENDANT } from "../constants";

export interface ICreateActiveDescendantOptions {
  onKeyDown?: HTMLAttributes<HTMLElement>["onKeyDown"];
  includeSpace?: boolean | null;
}

/**
 * A small util function that will click an active descendant when the
 * Enter or space keys are pressed from a container element.
 */
export default function createKeyboardClickHandler(
  onKeyDown: HTMLAttributes<HTMLElement>["onKeyDown"],
  includeSpace: boolean = true
) {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const currentTarget = event.currentTarget as HTMLElement;
    if (includeSpace === null) {
      // links are normally not clickable via space
      includeSpace = currentTarget.tagName !== "A";
    }

    const isEnter = event.key === "Enter";
    const isSpace = includeSpace && event.key === " ";
    if (!isEnter && !isSpace) {
      return;
    }

    if (isSpace) {
      event.preventDefault();
    }

    const activeId = currentTarget.getAttribute(ACTIVE_DESCENDANT) || "";
    const active = document.getElementById(activeId);
    if (active && !active.getAttribute("aria-disabled")) {
      active.click();
    }
  };
}
