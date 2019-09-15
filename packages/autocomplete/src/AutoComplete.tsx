import React, { CSSProperties, FC, Fragment, forwardRef } from "react";
import cn from "classnames";
import {
  isListboxOptionProps,
  ListboxOptionProps,
  Option,
  TextField,
  TextFieldProps,
} from "@react-md/form";
import { List } from "@react-md/list";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { ScaleTransition } from "@react-md/transition";
import {
  bem,
  omit,
  PositionAnchor,
  PositionWidth,
  WithForwardedRef,
} from "@react-md/utils";

import useAutoComplete from "./useAutoComplete";
import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  AutoCompletion,
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultLabel as DEFAULT_GET_RESULT_LABEL,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
  AutoCompleteHandler,
} from "./utils";

export interface AutoCompleteProps
  extends Omit<TextFieldProps, "type" | "value" | "defaultValue">,
    RenderConditionalPortalProps {
  /**
   * The id to use for the AutoComplete and is required for a11y to fulfill the `combobox` role. This
   * id will be passed directly to the `<input>` element and prefixed for all the other id-required
   * elements.
   */
  id: string;

  /**
   * @see AutoCompletion
   */
  autoComplete?: AutoCompletion;

  /**
   * The list of data that should be autocompleted based on the provided filter.
   */
  data: AutoCompleteData[];

  /**
   * @see AutoCompleteFilterFunction
   */
  filter?: AutoCompleteFilterFunction;

  /**
   * An optional object of options to provide to the filter function. This will be defaulted to work
   * with the fuzzy filter and case-insensitive filter functions to trim whitespace before doing the
   * comarisons.
   */
  filterOptions?: {};

  /**
   * An optional style to also apply to the listbox element showing all the matches.
   */
  listboxStyle?: CSSProperties;

  /**
   * An optional className to also apply to the listbox element showing all the matches.
   */
  listboxClassName?: string;

  /**
   * The sizing behavior for the listbox. It will default to have the same width as the select button,
   * but it is also possible to either have the `min-width` be the width of the select button or just
   * automatically determine the width.
   *
   * The sizing behavior will always ensure that the left and right bounds of the listbox appear within
   * the viewport.
   */
  listboxWidth?: PositionWidth;

  /**
   * The positioning configuration for how the listbox should be anchored to the select button.
   */
  anchor?: PositionAnchor;

  /**
   * Boolean if the select's listbox should not hide if the user resizes the browser while it is visible.
   */
  disableHideOnResize?: boolean;

  /**
   * Boolean if the select's listbox should not hide if the user scrolls the page while it is visible.
   */
  disableHideOnScroll?: boolean;

  /**
   * The key to use to extract a label from a result when the provided data list is a list of objects.
   */
  labelKey?: string;

  /**
   * The key to use to extract a searchable value string from a result when the provided data list is a
   * list of objects.
   */
  valueKey?: string;

  /**
   * A function to call that will generate an id for each result in the autocomplete's listbox. These ids
   * are required for a11y as it'll be used with the `aria-activedescendant` movement within the autocomplete.
   */
  getResultId?: typeof DEFAULT_GET_RESULT_ID;

  /**
   * A function to call that will get a renderable label or children to display for a result in the autocomplete's
   * list of results. The default behavior will be to return the result itself if it is a string, otherwise try
   * to return the `children` or `labelKey` attribute if it is an object.
   */
  getResultLabel?: typeof DEFAULT_GET_RESULT_LABEL;

  /**
   * A function to call that will extract a searchable value string from each result. This **must** return a string
   * and will prevent the autocomplete from filtering data with the built in filter functions.
   */
  getResultValue?: typeof DEFAULT_GET_RESULT_VALUE;

  /**
   * @see AutoCompleteHandler
   */
  onAutoComplete?: AutoCompleteHandler;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    AutoCompleteProps,
    | "autoComplete"
    | "filter"
    | "filterOptions"
    | "labelKey"
    | "valueKey"
    | "getResultId"
    | "getResultLabel"
    | "getResultValue"
    | "anchor"
    | "listboxWidth"
    | "disableHideOnResize"
    | "disableHideOnScroll"
  >
>;
type WithDefaultProps = AutoCompleteProps & DefaultProps & WithRef;

const block = bem("rmd-autocomplate");
const listbox = bem("rmd-listbox");

const AutoComplete: FC<AutoCompleteProps & WithRef> = providedProps => {
  const {
    autoComplete,
    data,
    filter,
    filterOptions,
    className,
    onBlur,
    onFocus,
    onKeyDown,
    onChange,
    containerProps,
    portal,
    portalInto,
    portalIntoId,
    listboxStyle,
    listboxClassName,
    forwardedRef,
    onAutoComplete,
    labelKey,
    valueKey,
    getResultId,
    getResultLabel,
    getResultValue,
    anchor,
    listboxWidth,
    disableHideOnResize,
    disableHideOnScroll,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const comboboxId = `${id}-combobox`;
  const suggestionsId = `${id}-listbox`;

  const {
    ref,
    value,
    visible,
    activeId,
    itemRefs,
    filteredData,
    fixedStyle,
    transitionHooks,
    handleBlur,
    handleFocus,
    handleChange,
    handleKeyDown,
    handleAutoComplete,
  } = useAutoComplete({
    autoComplete,
    suggestionsId,
    data,
    filter,
    filterOptions,
    valueKey,
    getResultId,
    getResultValue,
    onBlur,
    onFocus,
    onChange,
    onKeyDown,
    forwardedRef,
    onAutoComplete,
    anchor,
    listboxWidth,
    listboxStyle,
    disableHideOnResize,
    disableHideOnScroll,
  });

  return (
    <Fragment>
      <TextField
        {...props}
        aria-autocomplete={autoComplete}
        aria-controls={comboboxId}
        aria-activedescendant={activeId}
        autoComplete="off"
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={ref}
        className={cn(block(), className)}
        containerProps={{
          ...containerProps,
          "aria-haspopup": "listbox",
          "aria-owns": suggestionsId,
          "aria-expanded": visible,
          id: comboboxId,
          role: "combobox",
        }}
      />
      <ScaleTransition
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
        vertical
        visible={visible}
        {...transitionHooks}
      >
        <List
          id={suggestionsId}
          role="listbox"
          style={fixedStyle}
          className={cn(listbox({ temporary: true }), listboxClassName)}
        >
          {filteredData.map((datum, i) => {
            const resultId = getResultId(suggestionsId, i);
            let optionProps: ListboxOptionProps | undefined;
            if (isListboxOptionProps(datum)) {
              optionProps = omit(datum, [labelKey, valueKey]);
            }

            return (
              <Option
                key={resultId}
                id={resultId}
                {...optionProps}
                selected={false}
                focused={resultId === activeId}
                ref={itemRefs[i]}
                onClick={() => handleAutoComplete(i)}
              >
                {getResultLabel(datum, labelKey)}
              </Option>
            );
          })}
        </List>
      </ScaleTransition>
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  filter: "case-insensitive",
  filterOptions: {
    trim: true,
    ignoreWhitespace: true,
  },
  labelKey: "label",
  valueKey: "value",
  getResultId: DEFAULT_GET_RESULT_ID,
  getResultLabel: DEFAULT_GET_RESULT_LABEL,
  getResultValue: DEFAULT_GET_RESULT_VALUE,
  autoComplete: "list",
  anchor: {
    x: "center",
    y: "below",
  },
  listboxWidth: "equal",
  disableHideOnResize: false,
  disableHideOnScroll: false,
};

AutoComplete.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  AutoComplete.displayName = "AutoComplete";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AutoComplete.propTypes = {
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      ).isRequired,
      filter: PropTypes.oneOfType([
        PropTypes.oneOf(["none", "fuzzy", "case-insensitive"]),
        PropTypes.func,
      ]),
      filterOptions: PropTypes.object,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      getResultId: PropTypes.func,
      getResultLabel: PropTypes.func,
      getResultValue: PropTypes.func,
      autoComplete: PropTypes.oneOf(["none", "inline", "list", "both"]),
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
      onAutoComplete: PropTypes.func,
      listboxWidth: PropTypes.oneOf(["auto", "equal", "min"]),
      disableHideOnResize: PropTypes.bool,
      disableHideOnScroll: PropTypes.bool,
      style: PropTypes.object,
      className: PropTypes.string,
      inputStyle: PropTypes.object,
      inputClassName: PropTypes.string,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      label: PropTypes.node,
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      dense: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      placeholder: PropTypes.string,
      underlineDirection: PropTypes.oneOf(["left", "right"]),
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLInputElement, AutoCompleteProps>((props, ref) => (
  <AutoComplete {...props} forwardedRef={ref} />
));
