import React, { CSSProperties, forwardRef, ReactElement, Ref } from "react";
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
import { bem, omit, BELOW_CENTER_ANCHOR } from "@react-md/utils";

import HighlightedResult from "./HighlightedResult";
import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  AutoCompleteHandler,
  AutoCompletion,
} from "./types";
import useAutoComplete, { PositionOptions } from "./useAutoComplete";
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
  data: readonly AutoCompleteData[];

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
   * Boolean if the filter function should still be called when there is no
   * value in the text field. This normally defaults to `false` so that the
   * `data` is just returned, but it can be useful with a custom filter function
   * that returns different data while there is no value.
   */
  filterOnNoValue?: boolean;

  /**
   * An optional className to also apply to the listbox element showing all the
   * matches.
   */
  listboxClassName?: string;

  /**
   * Boolean if the result list labels should be updated so that each matching
   * letter is bolded. This only works when the data list is a list of strings,
   * or the `label` is a string and when the letters appear in order. This will
   * always be `false` if the `filter` prop is set to `"fuzzy"`.
   */
  highlight?: boolean;

  /**
   * An optional style to apply to the `<span>` surrounding the matched text
   * when the `highlight` prop is enabled.
   */
  highlightStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<span>` surrounding the matched text
   * when the `highlight` prop is enabled.
   */
  highlightClassName?: string;

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
   * @see AutoCompleteHandler
   */
  onAutoComplete?: AutoCompleteHandler;
}

const block = bem("rmd-autocomplate");
const listbox = bem("rmd-listbox");

const DEFAULT_FILTER_OPTIONS = {
  trim: true,
  ignoreWhitespace: true,
};

/**
 * An AutoComplete is an accessible combobox widget that allows for real-time
 * suggestions as the user types.
 */
function AutoComplete(
  {
    autoComplete = "list",
    data,
    filter = "case-insensitive",
    filterOptions = DEFAULT_FILTER_OPTIONS,
    filterOnNoValue = false,
    className,
    onBlur,
    onFocus,
    onClick,
    onKeyDown,
    onChange,
    containerProps,
    portal = false,
    portalInto,
    portalIntoId,
    listboxStyle,
    listboxClassName,
    onAutoComplete,
    clearOnAutoComplete = false,
    labelKey = "label",
    valueKey = "value",
    getResultId = DEFAULT_GET_RESULT_ID,
    getResultLabel = DEFAULT_GET_RESULT_LABEL,
    getResultValue = DEFAULT_GET_RESULT_VALUE,
    highlight = false,
    highlightStyle,
    highlightClassName,
    anchor = BELOW_CENTER_ANCHOR,
    listboxWidth = "equal",
    xMargin = 0,
    yMargin = 0,
    vwMargin = 16,
    vhMargin = 16,
    transformOrigin = true,
    preventOverlap = true,
    disableVHBounds = false,
    disableSwapping = true,
    disableHideOnResize = true,
    disableHideOnScroll = true,
    ...props
  }: AutoCompleteProps,
  forwardedRef?: Ref<HTMLInputElement>
): ReactElement {
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
    listboxRef,
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
    filterOnNoValue,
    valueKey,
    getResultId,
    getResultValue,
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
    <>
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
          ref={listboxRef}
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
                {...optionProps}
                id={resultId}
                selected={false}
                focused={resultId === activeId}
                ref={itemRefs[i]}
                onClick={() => handleAutoComplete(i)}
              >
                <HighlightedResult
                  id={`${resultId}-match`}
                  style={highlightStyle}
                  className={highlightClassName}
                  value={value}
                  enabled={isHighlight}
                >
                  {getResultLabel(datum, labelKey, value)}
                </HighlightedResult>
              </Option>
            );
          })}
        </List>
      </ScaleTransition>
    </>
  );
}

const ForwardedAutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  AutoComplete
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedAutoComplete.propTypes = {
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      ).isRequired,
      filter: PropTypes.oneOfType([
        PropTypes.oneOf(["none", "fuzzy", "case-insensitive"]),
        PropTypes.func,
      ]),
      filterOptions: PropTypes.object,
      filterOnNoValue: PropTypes.bool,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      getResultId: PropTypes.func,
      getResultLabel: PropTypes.func,
      getResultValue: PropTypes.func,
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
  } catch (e) {}
}

export default ForwardedAutoComplete;
