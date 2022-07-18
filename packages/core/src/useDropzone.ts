import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useState } from "react";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 5.1.3 */
export type DropzoneHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onDragEnter" | "onDragOver" | "onDrop" | "onDragLeave"
>;

export interface DropzoneOptions<E extends HTMLElement>
  extends DropzoneHandlers<E> {
  includeWindow?: boolean;
}

export interface DropzoneHookReturnValue<E extends HTMLElement> {
  isOver: boolean;
  isDragging: boolean;
  handlers: Required<DropzoneHandlers<E>>;
}

export function useDropzone<E extends HTMLElement>(
  options: DropzoneOptions<E>
): DropzoneHookReturnValue<E> {
  const {
    onDragOver = noop,
    onDragEnter = noop,
    onDrop = noop,
    onDragLeave = noop,
    includeWindow = false,
  } = options;
  const [isOver, setOver] = useState(false);
  const [isDragging, setDragging] = useState(false);
  useEffect(() => {
    if (!includeWindow) {
      setDragging(false);
      return;
    }

    // TODO: Need to work on performance since dragging into different elements causes it to go
    // from `true` -> `false` -> `true`. I just want to to be false if the user drops dragging
    // in the current window.
    const startDragging = (): void => {
      setDragging(true);
    };

    const stopDragging = (): void => {
      setDragging(false);
    };

    window.addEventListener("dragenter", startDragging, false);
    window.addEventListener("dragleave", stopDragging, false);
    return () => {
      window.removeEventListener("dragenter", startDragging);
      window.removeEventListener("dragleave", stopDragging);
    };
  }, [includeWindow]);

  return {
    isOver,
    isDragging,
    handlers: {
      onDragOver: useCallback(
        (event) => {
          onDragOver(event);
          event.preventDefault();
          event.stopPropagation();
          setOver(true);
        },
        [onDragOver]
      ),
      onDragEnter: useCallback(
        (event) => {
          onDragEnter(event);
          event.preventDefault();
          event.stopPropagation();
          setOver(true);
        },
        [onDragEnter]
      ),
      onDragLeave: useCallback(
        (event) => {
          onDragLeave(event);
          event.preventDefault();
          event.stopPropagation();

          if (
            !event.target ||
            event.currentTarget === event.target ||
            !event.currentTarget.contains(event.target as HTMLElement)
          ) {
            setOver(false);
          }
        },
        [onDragLeave]
      ),
      onDrop: useCallback(
        (event) => {
          onDrop(event);
          event.preventDefault();
          event.stopPropagation();
          setOver(false);
        },
        [onDrop]
      ),
    },
  };
}
