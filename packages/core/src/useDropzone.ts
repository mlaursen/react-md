"use client";

import {
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useToggle } from "./useToggle.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 5.1.3
 * @since 6.0.0 The element type is dynamically inferred on each handler
 * instead of the `DropzoneHandlers` type.
 */
export interface DropzoneHandlers {
  onDrop: <E extends HTMLElement>(event: DragEvent<E>) => void;
  onDragEnter?: <E extends HTMLElement>(event: DragEvent<E>) => void;
  onDragOver?: <E extends HTMLElement>(event: DragEvent<E>) => void;
  onDragLeave?: <E extends HTMLElement>(event: DragEvent<E>) => void;
}

/**
 * @since 6.0.0
 */
export interface DropzoneOptions extends DropzoneHandlers {
  /**
   * By default, the `useDropzone` hook will listen to any `dragenter`/`dragover`
   * events on the page and enabling the {@link DragHookReturnValue.isDragging}
   * flag to show that the user is dragging _something_ and they might want to
   * drag that something into the dropzone.
   *
   * So set this option to `true` if that behavior is not required and only
   * drag events on the dropzone element need to be captured.
   *
   * @defaultValue `false`
   * @see {@link DropzoneImplementation.isDragging}
   */
  disableDragging?: boolean;
}

/**
 * @since 2.9.0
 * @since 6.0.0 Renamed from `DropzoneHookReturnValue` to
 * `DropzoneImplementation` to match other naming conventions. Returns an
 * object instead of an ordered array of `[isOver: boolean, dropzoneHandlers:
 * DropzoneHandlers]`. Also returns a new `isDragging` state.
 */
export interface DropzoneImplementation {
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
 * @example Simple Example
 * ```tsx
 * import { useFileUpload } from "@react-md/core/files/useFileUpload";
 * import { useDropzone } from "@react-md/core/useDropzone";
 * import { type CSSProperties, type ReactElement } from "react";
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
 * @example Dragging Example
 * ```tsx
 * import { useFileUpload } from "@react-md/core/files/useFileUpload";
 * import { useDropzone } from "@react-md/core/useDropzone";
 * import { type CSSProperties, type ReactElement } from "react";
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
 * @since 2.9.0
 * @since 6.0.0 Supports document-level dragging flag;
 */
export function useDropzone(options: DropzoneOptions): DropzoneImplementation {
  const {
    onDrop,
    onDragOver = noop,
    onDragEnter = noop,
    onDragLeave = noop,
    disableDragging = false,
  } = options;

  const [isOver, setOver] = useState(false);
  const {
    toggled: isDragging,
    enable: startDragging,
    disable: stopDragging,
  } = useToggle();
  const draggingTimeout = useRef<NodeJS.Timeout>();

  // Browsers sometimes don't trigger a dragleave event for the entire
  // document, so we have to work around that by using the `dragover` event
  // instead. The `dragover` event will continually fire within the window
  // until the user drops the file or moves the file outside of the window.
  const delayedStopDragging = useCallback(() => {
    globalThis.clearTimeout(draggingTimeout.current);
    draggingTimeout.current = globalThis.setTimeout(() => {
      stopDragging();
    }, 100);
  }, [stopDragging]);

  useEffect(() => {
    if (disableDragging) {
      return;
    }

    globalThis.addEventListener("dragenter", startDragging);
    globalThis.addEventListener("dragover", delayedStopDragging);
    return () => {
      globalThis.clearTimeout(draggingTimeout.current);
      globalThis.removeEventListener("dragenter", startDragging);
      globalThis.removeEventListener("dragover", delayedStopDragging);
    };
  }, [delayedStopDragging, disableDragging, startDragging]);

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

        globalThis.clearTimeout(draggingTimeout.current);
        onDrop(event);
        setOver(false);
        stopDragging();
      },
      onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        globalThis.clearTimeout(draggingTimeout.current);
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
        // this stops dragging if the user's File Explorer is somewhat above the dropzone
        // and drags out into the File Explorer
        delayedStopDragging();
      },
    },
  };
}
