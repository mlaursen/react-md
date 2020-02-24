import React, {
  CSSProperties,
  forwardRef,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { cnb } from "cnbuilder";
import { useIcon } from "@react-md/icon";
import { useFixedPositioning } from "@react-md/transition";
import {
  applyRef,
  bem,
  DEFAULT_GET_ITEM_VALUE,
  PositionAnchor,
  PositionWidth,
  useCloseOnOutsideClick,
  useToggle,
} from "@react-md/utils";

import FloatingLabel from "../label/FloatingLabel";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "../text-field/TextFieldContainer";
import useFocusState from "../useFocusState";
import Listbox, { ListboxOptions } from "./Listbox";
import {
  defaultIsOptionDisabled,
  getDisplayLabel as DEFAULT_GET_DISPLAY_LABEL,
  getOptionId as DEFAULT_GET_OPTION_ID,
  getOptionLabel as DEFAULT_GET_OPTION_LABEL,
} from "./utils";

type FakeSelectAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  "placeholder" | "children" | "onChange" | "defaultValue" | "value"
>;

export interface SelectProps
  extends FakeSelectAttributes,
    TextFieldContainerOptions,
    ListboxOptions {
  /**
   * The id for the select component. This is required for a11y and will be used
   * to generate ids for the listbox and each option within the listbox.
   */
  id: string;

  /**
   * Boolean if the select is currently disabled.
   */
  disabled?: boolean;

  /**
   * An optional floating label to use with the select.
   */
  label?: ReactNode;

  /**
   * An optional style to apply to the label element.
   */
  labelStyle?: CSSProperties;

  /**
   * An optional className to apply to the label element.
   */
  labelClassName?: string;

  /**
   * An optional style to apply to the current display value within the
   * `Select`'s button component.
   */
  displayLabelStyle?: CSSProperties;

  /**
   * An optional className to apply to the current display value within the
   * `Select`'s button component.
   */
  displayLabelClassName?: string;

  /**
   * An optional style to apply to the listbox.
   */
  listboxStyle?: CSSProperties;

  /**
   * An optional className to apply to the listbox.
   */
  listboxClassName?: string;

  /**
   * Boolean if the select should act as a read only select field which just
   * allows for all the options to be visible when toggled open.
   */
  readOnly?: boolean;

  /**
   * An optional placeholder text to show while the select is unvalued and is
   * either currently focused or the `label` prop was not provided.
   */
  placeholder?: ReactNode;

  /**
   * A function that gets called whenever the Select's value changes so that the
   * selected option can be converted into a renderable element to show in the
   * Select's button. The default behavior is to use the `getOptionLabel`
   * default behavior. If the option is an object and the `disableLeftAddon`
   * prop has not been disabled, it will then attempt to also extract a
   * `leftIcon` or `leftAvatar` from the option and use the `TextIconSpacing`
   * component with the label + icon/avatar.
   */
  getDisplayLabel?: typeof DEFAULT_GET_DISPLAY_LABEL;

  /**
   * The positioning configuration for how the listbox should be anchored to the
   * select button.
   */
  anchor?: PositionAnchor;

  /**
   * The sizing behavior for the listbox. It will default to have the same width
   * as the select button, but it is also possible to either have the
   * `min-width` be the width of the select button or just automatically
   * determine the width.
   *
   * The sizing behavior will always ensure that the left and right bounds of
   * the listbox appear within the viewport.
   */
  listboxWidth?: PositionWidth;

  /**
   * Boolean if the `Select`'s button display value should not attempt to
   * extract a `leftIcon`/`leftAvatar` from the current selected option to
   * display.
   */
  disableLeftAddon?: boolean;

  /**
   * Boolean if the select's listbox should not hide if the user resizes the
   * browser while it is visible.
   */
  disableHideOnResize?: boolean;

  /**
   * Boolean if the select's listbox should not hide if the user scrolls the
   * page while it is visible.
   */
  disableHideOnScroll?: boolean;

  /**
   * An optional icon to display to the right of the select. This should
   * normally be a dropdown icon to replace the native select's dropdown icon.
   * If this is set to `null`, the native select's dropdown icon will be
   * displayed instead.
   *
   * This defaults to the `IconProvider`'s dropdown icon from the
   * `@react-md/icon` package.
   */
  rightChildren?: ReactNode;
}

const block = bem("rmd-select");
const DEFAULT_ANCHOR: PositionAnchor = {
  x: "center",
  y: "below",
};

/**
 * This component is an accessible version of the `<select>` element that allows
 * for some more custom styles by using the `@react-md/list` package to render
 * the list of options.
 *
 * The `Select` component **must be controlled** with a `value` and `onChange`
 * handler.
 */
function Select(
  {
    onBlur,
    onFocus,
    onKeyDown,
    onClick,
    className,
    label,
    labelStyle,
    labelClassName,
    displayLabelStyle,
    displayLabelClassName,
    listboxStyle,
    listboxClassName,
    anchor = DEFAULT_ANCHOR,
    theme = "outline",
    dense = false,
    inline = false,
    error = false,
    disabled = false,
    isLeftAddon = true,
    isRightAddon = true,
    underlineDirection = "left",
    listboxWidth = "equal",
    portal = true,
    portalInto,
    portalIntoId,
    name,
    options,
    labelKey = "label",
    valueKey = "value",
    getOptionId = DEFAULT_GET_OPTION_ID,
    getOptionLabel = DEFAULT_GET_OPTION_LABEL,
    getOptionValue = DEFAULT_GET_ITEM_VALUE,
    getDisplayLabel = DEFAULT_GET_DISPLAY_LABEL,
    isOptionDisabled = defaultIsOptionDisabled,
    disableLeftAddon = false,
    disableMovementChange = false,
    disableHideOnResize = false,
    disableHideOnScroll = false,
    readOnly,
    placeholder,
    value,
    onChange,
    rightChildren: propRightChildren,
    ...props
  }: SelectProps,
  forwardedRef?: Ref<HTMLDivElement>
): ReactElement {
  const { id } = props;
  const rightChildren = useIcon("dropdown", propRightChildren);

  const valued = typeof value === "number" || !!value;
  const displayValue = useMemo(() => {
    const currentOption =
      options.find(option => getOptionValue(option, valueKey) === value) ||
      null;

    return getDisplayLabel(currentOption, labelKey, !disableLeftAddon);
  }, [
    options,
    getDisplayLabel,
    labelKey,
    disableLeftAddon,
    getOptionValue,
    valueKey,
    value,
  ]);

  const [visible, show, hide] = useToggle(false);
  const [focused, handleFocus, handleBlur] = useFocusState({ onBlur, onFocus });
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      switch (event.key) {
        case " ":
        case "ArrowUp":
        case "ArrowDown":
          // prevent page scroll
          event.preventDefault();
          show();
          break;
        case "Enter": {
          const form = event.currentTarget.closest("form");
          if (form) {
            // the default behavior of pressing the "Enter" key on a form
            // control (input, textarea, select) is to submit a form, so that's
            // what this is attempting to polyfill. Unfortunately, using the
            // form.submit() ignores any `onSubmit` handlers like
            // event.preventDefault() so to work around that, try to first find
            // a submit button and click that instead. If there isn't a submit
            // button as a child of the form, try to find a submit button that
            // has the form attribute set to this current form's id.
            let submit = form.querySelector<HTMLButtonElement>(
              '[type="submit"]'
            );

            if (!submit && form.id) {
              submit = document.querySelector(
                `[type="submit"][form="${form.id}"]`
              );
            }

            if (submit) {
              submit.click();
            }
          }
          break;
        }
        // no default
      }
    },
    [onKeyDown, show]
  );

  const selectRef = useRef<HTMLDivElement | null>(null);
  const ref = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, forwardedRef);
      selectRef.current = instance;
    },
    [forwardedRef]
  );

  useCloseOnOutsideClick({
    enabled: visible,
    element: selectRef.current,
    onOutsideClick: hide,
  });

  const {
    style: fixedStyle,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    fixedTo: () => selectRef.current,
    anchor,
    onScroll: disableHideOnScroll ? undefined : hide,
    onResize: disableHideOnResize ? undefined : hide,
    transformOrigin: true,
    width: listboxWidth,
    onEntering(node) {
      // can't do onEnter since the positioning styles haven't been applied to the
      // dom node at this time. this means the list is the last element in the DOM
      // when portalled, which causes the page to scroll to the end. Moving it to
      // onEntering will ensure the styles have been applied and won't cause page
      // scrolling
      node.focus();
    },
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event);
      }

      show();
    },
    [onClick, show]
  );

  const handleKeyboardClose = useCallback(() => {
    hide();
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, [hide]);

  return (
    <Fragment>
      <TextFieldContainer
        {...props}
        aria-haspopup="listbox"
        aria-disabled={disabled || undefined}
        ref={ref}
        role="button"
        tabIndex={disabled ? undefined : 0}
        label={!!label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={disabled ? undefined : handleKeyDown}
        onClick={disabled ? undefined : handleClick}
        theme={theme}
        error={error}
        active={focused || visible}
        inline={inline}
        disabled={disabled}
        underlineDirection={underlineDirection}
        isLeftAddon={isLeftAddon}
        isRightAddon={isRightAddon}
        rightChildren={rightChildren}
        className={cnb(block({ disabled }), className)}
      >
        <FloatingLabel
          style={labelStyle}
          className={cnb(block("label"), labelClassName)}
          htmlFor={id}
          error={error}
          active={valued && (focused || visible)}
          valued={valued}
          floating={focused || valued || visible}
          dense={dense}
          disabled={disabled}
          component="span"
        >
          {label}
        </FloatingLabel>
        <span
          id={`${id}-value`}
          style={displayLabelStyle}
          className={cnb(
            block("value", {
              disabled,
              readonly: readOnly,
              placeholder: !valued && placeholder,
              "placeholder-active":
                !valued && placeholder && (focused || visible),
            }),
            displayLabelClassName
          )}
        >
          {displayValue || (!valued && placeholder)}
        </span>
      </TextFieldContainer>
      <Listbox
        id={`${id}-listbox`}
        aria-labelledby={id}
        style={{ ...fixedStyle, ...listboxStyle }}
        className={listboxClassName}
        name={name}
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExited={onExited}
        value={value}
        onChange={onChange}
        visible={visible}
        temporary
        onRequestClose={handleKeyboardClose}
        options={options}
        labelKey={labelKey}
        valueKey={valueKey}
        getOptionId={getOptionId}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isOptionDisabled={isOptionDisabled}
        disableMovementChange={disableMovementChange}
      />
    </Fragment>
  );
}

const ForwardedSelect = forwardRef<HTMLDivElement, SelectProps>(Select);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    ForwardedSelect.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      listboxStyle: PropTypes.object,
      listboxClassName: PropTypes.string,
      label: PropTypes.node,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func,
      ]),
      portalIntoId: PropTypes.string,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      getOptionId: PropTypes.func,
      getOptionLabel: PropTypes.func,
      getOptionValue: PropTypes.func,
      getDisplayLabel: PropTypes.func,
      isOptionDisabled: PropTypes.func,
      disableLeftAddon: PropTypes.bool,
      disableMovementChange: PropTypes.bool,
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      dense: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      readOnly: PropTypes.bool,
      disabled: PropTypes.bool,
      placeholder: PropTypes.node,
      underlineDirection: PropTypes.oneOf(["left", "right"]),
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
      disableHideOnResize: PropTypes.bool,
      disableHideOnScroll: PropTypes.bool,
      anchor: PropTypes.shape({
        x: PropTypes.oneOf([
          "inner-left",
          "inner-right",
          "center",
          "left",
          "right",
        ]),
        y: PropTypes.oneOf(["above", "below", "center", "top", "bottom"]),
      }),
      listboxWidth: PropTypes.oneOf(["equal", "min", "auto"]),
    };
  } catch (e) {}
}

export default ForwardedSelect;
