import React, {
  CSSProperties,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { applyRef, bem, useResizeObserver } from "@react-md/utils";

import FloatingLabel from "../label/FloatingLabel";
import useFocusState from "../useFocusState";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import useValuedState from "./useValuedState";
import { useFormTheme } from "../FormThemeProvider";

export type TextAreaResize =
  | "none"
  | "auto"
  | "horizontal"
  | "vertical"
  | "both";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextFieldContainerOptions {
  /**
   * An id to apply to the text area. This is required for a11y.
   */
  id: string;

  /**
   * The value to use for the text field. This will make the component
   * controlled and require the `onChange` prop to be provided as well otherwise
   * this will act as a read only text field.
   */
  value?: string;

  /**
   * The default value for the text field which will make it uncontrolled.  If
   * you manually change the `defaultValue` prop, the input's value **will not
   * change** unless you provide a different `key` as well. Use the `value` prop
   * instead for a controlled input.
   */
  defaultValue?: string;

  /**
   * An optional floating label to use for the text field. This should really
   * only be used when the `theme` prop is not set to `"none"`. This will be
   * wrapped in the `<Label>` component itself and automatically apply the
   * `htmlFor` prop for this text field.
   */
  label?: ReactNode;

  /**
   * An optional style to apply to the label wrapper.
   */
  labelStyle?: CSSProperties;

  /**
   * An optional className to apply to the label wrapper.
   */
  labelClassName?: string;

  /**
   * An optional style to apply to the textarea element. The base `style` prop
   * is applied to the surrounding `div` instead.
   */
  areaStyle?: CSSProperties;

  /**
   * An optional className to apply to the textarea element. The base `style`
   * prop is applied to the surrounding `div` instead.
   */
  areaClassName?: string;

  /**
   * The number of rows to display by default. The textarea will automatically
   * update and animate its height when the users types if the `resize` prop is
   * set to `"auto"`.
   */
  rows?: number;

  /**
   * The maximum number of rows that are allowed. When this is set to `-1`, it
   * will infinitely expand based on the text content.
   */
  maxRows?: number;

  /**
   * Updates the resize ability for the textarea. Native textareas are resizable
   * both horizontally and vertically, but this component will prevent resizing
   * by default and instead animate height changes as the user types.
   */
  resize?: TextAreaResize;

  /**
   * Boolean if the height changes should be animated when the `resize` prop is
   * set to `"auto"`.
   */
  animate?: boolean;

  /**
   * An optional ref to apply to the text field's container div element. The
   * default ref is forwarded on to the `input` element.
   */
  containerRef?: Ref<HTMLDivElement>;
}

const block = bem("rmd-textarea");
const container = bem("rmd-textarea-container");
const PADDING_VARIABLES =
  "var(--rmd-form-text-padding-top, 0px) + var(--rmd-form-textarea-padding, 0px)";

// this is the default of 1.5rem line-height in the styles
const DEFAULT_LINE_HEIGHT = "24";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      style,
      className,
      areaStyle,
      areaClassName,
      containerRef,
      label,
      labelStyle,
      labelClassName,
      rows = 2,
      maxRows = -1,
      resize = "auto",
      theme: propTheme,
      dense = false,
      inline: propInline = false,
      error = false,
      disabled = false,
      animate = true,
      isLeftAddon = true,
      isRightAddon = true,
      underlineDirection: propUnderlineDirection,
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      onChange: propOnChange,
      leftChildren,
      rightChildren,
      ...props
    },
    forwardedRef
  ): ReactElement {
    const { id, value, defaultValue } = props;
    const { theme, underlineDirection } = useFormTheme({
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
    });

    const [focused, onFocus, onBlur] = useFocusState({
      onBlur: propOnBlur,
      onFocus: propOnFocus,
    });

    const [height, setHeight] = useState<number>();
    if (resize !== "auto" && typeof height === "number") {
      setHeight(undefined);
    }

    const [mask, setMask] = useState<HTMLTextAreaElement | null>(null);
    const [scrollable, setScrollable] = useState(false);
    const updateHeight = (): void => {
      if (!mask) {
        return;
      }

      let nextHeight = mask.scrollHeight;
      if (maxRows > 0) {
        const lineHeight = parseFloat(
          window.getComputedStyle(mask).lineHeight || DEFAULT_LINE_HEIGHT
        );
        const maxHeight = maxRows * lineHeight;
        nextHeight = Math.min(maxHeight, nextHeight);

        // only want the textarea to be scrollable if there's a limit on the rows
        // since it'll flash the scrollbar on most OS during the height transition
        if (nextHeight === maxHeight && !scrollable) {
          setScrollable(true);
        } else if (nextHeight !== maxHeight && scrollable) {
          setScrollable(false);
        }
      }

      if (height !== nextHeight) {
        setHeight(nextHeight);
      }
    };

    // the window can be resized while there is text inside the textarea so need to
    // recalculate the height when the width changes as well.
    useResizeObserver({
      disableHeight: true,
      target: mask,
      onResize: updateHeight,
    });
    const [valued, onChange] = useValuedState<HTMLTextAreaElement>({
      value,
      defaultValue,
      onChange: (event) => {
        if (propOnChange) {
          propOnChange(event);
        }

        if (!mask || resize !== "auto") {
          return;
        }

        // to get the height transition to work, you have to set the height on:
        // - the main container element (including padding) that has the height
        //    transition enabled
        // - a child div wrapper (without padding) that has the height transition
        //    enabled
        // - the textarea element (without padding) and without a height transition
        //
        // if it isn't done this way, the height transition will look weird since
        // the text will be fixed to the bottom of the area and more text at the top
        // will become visible as the height transition completes. applying the
        // transition on the two parent elements work because:
        // - the height is set immediately on the text field so it expands to show all
        //    the text
        // - the height is correctly applied to both parent elements, but their height
        //    haven't fully been adjusted due to the animation
        // - the parent divs have overflow visible by default, so the textarea's text
        //    will expand past the boundaries of the divs and not cause the upwards
        //    animation weirdness.
        mask.value = event.currentTarget.value;
        updateHeight();
      },
    });

    const areaRef = useRef<HTMLTextAreaElement | null>(null);
    const refHandler = useCallback(
      (instance: HTMLTextAreaElement | null) => {
        applyRef(instance, forwardedRef);
        areaRef.current = instance;
      },
      [forwardedRef]
    );

    // the container element adds some padding so that the content can scroll and
    // not be covered by the floating label. unfortunately, this means that the entire
    // container is no longer clickable to focus the input. This is used to add that
    // functionality back.
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (areaRef.current && event.target === event.currentTarget) {
          areaRef.current.focus();
        }
      },
      []
    );

    const area = (
      <textarea
        {...props}
        ref={refHandler}
        rows={rows}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={{ ...areaStyle, height }}
        className={cn(
          block({
            scrollable: scrollable || resize === "none",
            floating: label && theme !== "none",
            rh: resize === "horizontal",
            rv: resize === "vertical",
            rn: resize === "auto" || resize === "none",
          }),
          areaClassName
        )}
      />
    );

    let children = area;
    if (resize === "auto") {
      children = (
        <div style={{ height }} className={container("inner", { animate })}>
          {area}
          <textarea
            aria-hidden
            defaultValue={value || defaultValue}
            id={`${id}-mask`}
            ref={setMask}
            readOnly
            rows={rows}
            tabIndex={-1}
            style={areaStyle}
            className={cn(
              block({
                rn: true,
                mask: true,
                floating: label && theme !== "none",
              }),
              areaClassName
            )}
          />
        </div>
      );
    }

    let inline = propInline;
    if (resize === "horizontal" || resize === "both") {
      // have to force it inline or else you won't be able to resize
      // it horizontally.
      inline = true;
    }

    return (
      <TextFieldContainer
        style={{
          ...style,
          height: height
            ? `calc(${PADDING_VARIABLES} + ${height}px)`
            : undefined,
        }}
        className={cn(
          container({
            animate: animate && resize === "auto",
            cursor: !disabled,
          }),
          className
        )}
        ref={containerRef}
        theme={theme}
        error={error}
        active={focused}
        label={!!label}
        dense={dense}
        inline={inline}
        disabled={disabled}
        isLeftAddon={isLeftAddon}
        isRightAddon={isRightAddon}
        leftChildren={leftChildren}
        rightChildren={rightChildren}
        underlineDirection={underlineDirection}
        onClick={!disabled ? handleClick : undefined}
      >
        <FloatingLabel
          style={labelStyle}
          className={labelClassName}
          htmlFor={id}
          error={error}
          active={focused}
          floating={focused || valued}
          valued={valued}
          dense={dense}
          disabled={disabled}
        >
          {label}
        </FloatingLabel>
        {children}
      </TextFieldContainer>
    );
  }
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TextArea.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      areaStyle: PropTypes.object,
      areaClassName: PropTypes.string,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      label: PropTypes.node,
      value: PropTypes.string,
      defaultValue: PropTypes.string,
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      dense: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      placeholder: PropTypes.string,
      underlineDirection: PropTypes.oneOf(["left", "center", "right"]),
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
      animate: PropTypes.bool,
      rows: PropTypes.number,
      maxRows: PropTypes.number,
      resize: PropTypes.oneOf([
        "none",
        "auto",
        "horizontal",
        "vertical",
        "both",
      ]),
      containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onChange: PropTypes.func,
    };
  } catch (e) {}
}

export default TextArea;
