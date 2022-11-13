import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks
 * \@since 5.1.3
 * \@since 6.0.0 The element type is dynamically inferred on each handler
 * instead of the `DropzoneHandlers` type.
 */
export interface DropzoneHandlers {
  onDrop<E extends HTMLElement>(event: DragEvent<E>): void;
  onDragEnter?<E extends HTMLElement>(event: DragEvent<E>): void;
  onDragOver?<E extends HTMLElement>(event: DragEvent<E>): void;
  onDragLeave?<E extends HTMLElement>(event: DragEvent<E>): void;
}

/**
 * @remarks \@since 6.0.0
 */
export interface DropzoneOptions extends DropzoneHandlers {
  /**
   * Set this to `true` if you do not need to capture drag events from outside
   * the window. i.e. Dragging files into the dropzone.
   *
   * @defaultValue `false`
   * @see {@link DropzoneHookReturnValue.isDragging}
   */
  disableDragging?: boolean;
}

/**
 * @remarks
 * \@since 2.9.0
 * \@since 6.0.0 Returns an object instead of an ordered array of
 * `[isOver: boolean, dropzoneHandlers: DropzoneHandlers]`. Also returns a new
 * `isDragging` state.
 */
export interface DropzoneHookReturnValue {
  /**
   * This will be `true` when the user is dragging something over the dropzone
   * target.
   */
  isOver: boolean;

  /**
   * This will be `true` when the user is dragging anything within the document.
   * The main use case for this is detecting when a user is dragging a file into
   * the document so you can help highlight the dropzone area.
   *
   * This will always be `false` if {@link DropzoneOptions.disableDragging} is
   * `true`.
   */
  isDragging: boolean;

  /**
   * The event handlers that should be passed to the dropzone target.
   */
  dropzoneHandlers: Required<DropzoneHandlers>;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { useDropzone, useFileUpload } from "@react-md/core"
 * import type { CSSProperties, ReactElement } from "react";
 *
 * const style: CSSProperties = {
 *   border: '1px solid blue',
 * };
 *
 * function Example(): ReactElement {
 *   const { onDrop } = useFileUpload()
 *   const { isOver, dropzoneHandlers } = useDropzone({
 *     onDrop(event) {
 *       // normally use the `onDrop` behavior from `useFileUpload` to upload
 *       // files:
 *       // onDrop(event);
 *     },
 *     disableDragging: true,
 *   });
 *
 *   return (
 *     <div {...dropzoneHandlers} style={isOver ? style : {}}>
 *       Drag and drop some files!
 *       {isOver && <UploadSVGIcon />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Dragging Example
 * ```tsx
 * import { useDropzone, useFileUpload } from "@react-md/core"
 * import type { CSSProperties, ReactElement } from "react";
 *
 * const draggingStyle: CSSProperties = {
 *   backgroundColor: "orange",
 * };
 * const overStyle: CSSProperties = {
 *   border: '1px solid blue',
 * };
 *
 * function Example(): ReactElement {
 *   const { onDrop } = useFileUpload()
 *   const { isOver, isDragging, dropzoneHandlers } = useDropzone({
 *     onDrop(event) {
 *       // normally use the `onDrop` behavior from `useFileUpload` to upload
 *       // files:
 *       // onDrop(event);
 *     },
 *   });
 *
 *   return (
 *     <div
 *       {...dropzoneHandlers}
 *       style={{
 *         ...(isDragging && draggingStyle),
 *         ...(isOver && overStyle),
 *       }}
 *     >
 *       Drag and drop some files!
 *       {isOver && <UploadSVGIcon />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * \@since 2.9.0
 * \@since 6.0.0 Supports document-level dragging flag;
 */
export function useDropzone(options: DropzoneOptions): DropzoneHookReturnValue {
  const {
    onDrop,
    onDragOver = noop,
    onDragEnter = noop,
    onDragLeave = noop,
    disableDragging = false,
  } = options;

  const [isOver, setOver] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const draggingTimeout = useRef<number | undefined>();

  useEffect(() => {
    if (disableDragging) {
      return;
    }

    const startDragging = (): void => {
      setDragging(true);
    };

    // Browsers sometimes don't trigger a dragleave event for the entire
    // document, so we have to work around that by using the `dragover` event
    // instead. The `dragover` event will continually fire within the window
    // until the user drops the file or moves the file outside of the window.
    //
    // So we can consider the
    const handler = (): void => {
      window.clearTimeout(draggingTimeout.current);
      draggingTimeout.current = window.setTimeout(() => {
        setDragging(false);
      }, 100);
    };

    window.addEventListener("dragenter", startDragging);
    window.addEventListener("dragover", handler);
    return () => {
      window.clearTimeout(draggingTimeout.current);
      window.removeEventListener("dragenter", startDragging);
      window.removeEventListener("dragover", handler);
    };
  }, [disableDragging]);

  return {
    isOver,
    isDragging,
    dropzoneHandlers: {
      // Note: need to call `event.stopPropagation()` and
      // `event.preventDefault())` for each of these handlers to prevent the
      // default browser behavior when dropping. Only calling within `onDrop`
      // does not work.
      //
      // i.e. dropping an image would preview that image in the current
      // window/tab instead of triggering the drop event.
      onDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        window.clearTimeout(draggingTimeout.current);
        onDrop(event);
        setOver(false);
        setDragging(false);
      },
      onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        window.clearTimeout(draggingTimeout.current);
        onDragOver(event);
        setOver(true);
      },
      onDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();

        onDragEnter(event);
        setOver(true);
      },
      onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        onDragLeave(event);
        setOver(false);
      },
    },
  };
}
