import { cnb } from "cnbuilder";
import {
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
  type TextareaHTMLAttributes,
  forwardRef,
} from "react";

import { textArea } from "./textAreaStyles.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface ResizingTextAreaWrapperProps extends HTMLAttributes<HTMLDivElement> {
  maskId: string;
  maskRef: Ref<HTMLTextAreaElement>;
  defaultValue?: TextareaHTMLAttributes<HTMLTextAreaElement>["defaultValue"];
  rows: number;
  areaStyle?: CSSProperties;
  areaClassName?: string;
  disableTransition?: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export const ResizingTextAreaWrapper = forwardRef<
  HTMLDivElement,
  ResizingTextAreaWrapperProps
>(function ResizingTextAreaWrapper(props, ref) {
  const {
    className,
    rows,
    maskId,
    maskRef,
    areaStyle,
    areaClassName,
    defaultValue,
    disableTransition,
    children,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={cnb(
        "rmd-textarea-container__inner",
        !disableTransition && "rmd-textarea-container__inner--animate",
        className
      )}
    >
      {children}
      <textarea
        aria-hidden
        id={maskId}
        ref={maskRef}
        defaultValue={defaultValue}
        readOnly
        tabIndex={-1}
        rows={rows}
        style={areaStyle}
        className={textArea({
          mask: true,
          resize: "auto",
          className: areaClassName,
        })}
      />
    </div>
  );
});
