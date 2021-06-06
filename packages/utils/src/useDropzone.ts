import { DragEvent, HTMLAttributes, useCallback, useState } from "react";

/** @remarks \@since 2.9.0 */
export type DropzoneHanders<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onDragEnter" | "onDragOver" | "onDrop" | "onDragLeave"
>;

/** @remarks \@since 2.9.0 */
export type DropzoneHookReturnValue<E extends HTMLElement> = [
  boolean,
  DropzoneHanders<E>
];

/**
 * This hook can be used to implement simple drag-and-drop behavior for file
 * uploads or special styles while dragging an element over a part of a page.
 *
 * @example
 * Simple File
 * ```ts
 * const style: CSSProperties = {
 *   border: '1px solid blue',
 * };
 *
 * function Example(): ReactElement {
 *   const { onDrop } = useFileUpload()
 *   const [isOver, handlers] = useDropzone({
 *     onDrop: (event) => {
 *       // normally use the `onDrop` behavior from `useFileUpload` to upload
 *       // files:
 *       // onDrop(event);
 *     }
 *   });
 *
 *   return (
 *     <div {...handlers} style={isOver ? style : {}}>
 *       Drag and drop some files!
 *       {isOver && <UploadSVGIcon />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link useFileUpload} for a more complex example
 * @param options - The {@link DropzoneHanders} that can be merged with the
 * default functionality.
 * @returns the {@link DropzoneHookReturnValue}
 * @remarks \@since 2.9.0
 */
export function useDropzone<E extends HTMLElement>(
  options: DropzoneHanders<E>
): DropzoneHookReturnValue<E> {
  const {
    onDragEnter: propOnDragEnter,
    onDragOver: propOnDragOver,
    onDragLeave: propOnDragLeave,
    onDrop: propOnDrop,
  } = options;
  const [isOver, setOver] = useState(false);

  const onDragOver = useCallback(
    (event: DragEvent<E>) => {
      propOnDragOver?.(event);
      event.preventDefault();
      event.stopPropagation();
      setOver(true);
    },
    [propOnDragOver]
  );
  const onDragEnter = useCallback(
    (event: DragEvent<E>) => {
      propOnDragEnter?.(event);
      event.preventDefault();
      event.stopPropagation();
      setOver(true);
    },
    [propOnDragEnter]
  );
  const onDrop = useCallback(
    (event: DragEvent<E>) => {
      propOnDrop?.(event);
      event.preventDefault();
      event.stopPropagation();
      setOver(false);
    },
    [propOnDrop]
  );
  const onDragLeave = useCallback(
    (event: DragEvent<E>) => {
      propOnDragLeave?.(event);
      event.preventDefault();
      event.stopPropagation();
      setOver(false);
    },
    [propOnDragLeave]
  );

  return [
    isOver,
    {
      onDragOver,
      onDragEnter,
      onDrop,
      onDragLeave,
    },
  ];
}
