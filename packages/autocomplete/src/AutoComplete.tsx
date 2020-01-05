import React, { FC, forwardRef, Fragment } from "react";
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
import { bem, omit, WithForwardedRef } from "@react-md/utils";

import HighlightLabel from "./HighlightLabel";
import useAutoComplete, { PositionOptions } from "./useAutoComplete";
import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  AutoCompleteHandler,
  AutoCompletion,
} from "./types";
import {
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultLabel as DEFAULT_GET_RESULT_LABEL,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
} from "./utils";

export interface AutoCompleteProps
  extends Omit<TextFieldProps, "type" | "value" | "defaultValue">,
    RenderConditionalPortalProps,
    PositionOptions {
  /**
   * The id to use for the AutoComplete and is required for a11y to fulfill the
   * `combobox` role. This id will be passed directly to the `<input>` element
   * and prefixed for all the other id-required elements.
   */
  id: string;

  /**
   * @see AutoCompletion
   */
  autoComplete?: AutoCompletion;

  /**
   * Boolean if the text field's value should be cleared when the value is
   * autocompleted. This is useful when also adding custom `onAutoComplete`
   * behavior.
   */
  clearOnAutoComplete?: boolean;

  /**
   * The list of data that should be autocompleted based on the provided filter.
   */
  data: AutoCompleteData[];

  /**
   * @see AutoCompleteFilterFunction
   */
  filter?: AutoCompleteFilterFunction;

  /**
   * An optional object of options to provide to the filter function. This will
   * be defaulted to work with the fuzzy filter and case-insensitive filter
   * functions to trim whitespace before doing the comparisons.
   */
  filterOptions?: {};

  /**
   * An optional className to also apply to the listbox element showing all the
   * matches.
   */
  listboxClassName?: string;

  /**
   * The key to use to extract a label from a result when the provided data list
   * is a list of objects.
   */
  labelKey?: string;

  /**
   * The key to use to extract a searchable value string from a result when the
   * provided data list is a list of objects.
   */
  valueKey?: string;

  /**
   * A function to call that will generate an id for each result in the
   * autocomplete's listbox. These ids are required for a11y as it'll be used
   * with the `aria-activedescendant` movement within the autocomplete.
   */
  getResultId?: typeof DEFAULT_GET_RESULT_ID;

  /**
   * A function to call that will get a renderable label or children to display
   * for a result in the autocomplete's list of results. The default behavior
   * will be to return the result itself if it is a string, otherwise try to
   * return the `children` or `labelKey` attribute if it is an object.
   */
  getResultLabel?: typeof DEFAULT_GET_RESULT_LABEL;

  /**
   * A function to call that will extract a searchable value string from each
   * result. This **must** return a string and will prevent the autocomplete
   * from filtering data with the built in filter functions.
   */
  getResultValue?: typeof DEFAULT_GET_RESULT_VALUE;

  /**
   * An optional function that will be called whenever the value of the
   * autocomplete is the empty string. This is useful if you don't want the
   * data list to be shown initially or a custom list of data.
   *
   * This defaults to just returning the `data`.
   */
  getEmptyValueData?: (data: AutoCompleteData[]) => AutoCompleteData[];

  /**
   * @see AutoCompleteHandler
   */
  onAutoComplete?: AutoCompleteHandler;

  /**
   * Boolean if the result list labels should be updated so that each matching
   * letter is bolded. This only works when the data list is a list of strings,
   * or the `label` is a string and when the letters appear in order. This will
   * always be `false` if the `filter` prop is set to `"fuzzy"`.
   */
  highlight?: boolean;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    AutoCompleteProps,
    | "autoComplete"
    | "clearOnAutoComplete"
    | "portal"
    | "highlight"
    | "filter"
    | "filterOptions"
    | "labelKey"
    | "valueKey"
    | "getResultId"
    | "getResultLabel"
    | "getResultValue"
    | "getEmptyValueData"
    | "anchor"
    | "xMargin"
    | "yMargin"
    | "vwMargin"
    | "vhMargin"
    | "transformOrigin"
    | "listboxWidth"
    | "preventOverlap"
    | "disableSwapping"
    | "disableVHBounds"
    | "disableHideOnResize"
    | "disableHideOnScroll"
  >
>;
type WithDefaultProps = AutoCompleteProps & DefaultProps & WithRef;

const block = bem("rmd-autocomplate");
const listbox = bem("rmd-listbox");

/**
 * An AutoComplete is an accessible combobox widget that allows for real-time
 * suggestions as the user types.
 */
const AutoComplete: FC<AutoCompleteProps & WithRef> = providedProps => {
  const {
    autoComplete,
    data,
    filter,
    filterOptions,
    className,
    onBlur,
    onFocus,
    onClick,
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
    clearOnAutoComplete,
    labelKey,
    valueKey,
    getResultId,
    getResultLabel,
    getResultValue,
    getEmptyValueData,
    highlight,
    anchor,
    listboxWidth,
    xMargin,
    yMargin,
    vwMargin,
    vhMargin,
    transformOrigin,
    preventOverlap,
    disableSwapping,
    disableVHBounds,
    disableHideOnResize,
    disableHideOnScroll,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const comboboxId = `${id}-combobox`;
  const suggestionsId = `${id}-listbox`;
  const isHighlight =
    highlight &&
    (filter === "case-insensitive" || typeof filter === "function");

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
    handleClick,
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
    getEmptyValueData,
    onBlur,
    onFocus,
    onClick,
    onChange,
    onKeyDown,
    forwardedRef,
    onAutoComplete,
    clearOnAutoComplete,
    anchor,
    xMargin,
    yMargin,
    vwMargin,
    vhMargin,
    transformOrigin,
    listboxWidth,
    listboxStyle,
    preventOverlap,
    disableSwapping,
    disableVHBounds,
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
        onClick={handleClick}
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
                <HighlightLabel enabled={isHighlight} value={value}>
                  {getResultLabel(datum, labelKey, value)}
                </HighlightLabel>
              </Option>
            );
          })}
        </List>
      </ScaleTransition>
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  portal: false,
  filter: "case-insensitive",
  filterOptions: {
    trim: true,
    ignoreWhitespace: true,
  },
  autoComplete: "list",
  clearOnAutoComplete: false,
  labelKey: "label",
  valueKey: "value",
  getResultId: DEFAULT_GET_RESULT_ID,
  getResultLabel: DEFAULT_GET_RESULT_LABEL,
  getResultValue: DEFAULT_GET_RESULT_VALUE,
  getEmptyValueData: data => data,
  highlight: false,
  anchor: {
    x: "center",
    y: "below",
  },
  xMargin: 0,
  yMargin: 0,
  vwMargin: 16,
  vhMargin: 16,
  transformOrigin: true,
  listboxWidth: "equal",
  preventOverlap: true,
  disableSwapping: false,
  disableVHBounds: false,
  disableHideOnResize: false,
  disableHideOnScroll: true,
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
      getEmptyValueData: PropTypes.func,
      highlight: PropTypes.bool,
      autoComplete: PropTypes.oneOf(["none", "inline", "list", "both"]),
      onAutoComplete: PropTypes.func,
      clearOnAutoComplete: PropTypes.bool,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
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
      listboxWidth: PropTypes.oneOf(["auto", "equal", "min"]),
      vwMargin: PropTypes.number,
      vhMargin: PropTypes.number,
      xMargin: PropTypes.number,
      yMargin: PropTypes.number,
      transformOrigin: PropTypes.bool,
      preventOverlap: PropTypes.bool,
      disableSwapping: PropTypes.bool,
      disableVHBounds: PropTypes.bool,
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
