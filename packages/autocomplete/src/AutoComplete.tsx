import React, { forwardRef } from "react";
import cn from "classnames";
import {
  isListboxOptionProps,
  ListboxOptionProps,
  Option,
  TextField,
} from "@react-md/form";
import { List } from "@react-md/list";
import { ScaleTransition } from "@react-md/transition";
import { BELOW_CENTER_ANCHOR, bem, omit } from "@react-md/utils";

import { HighlightedResult } from "./HighlightedResult";
import { AutoCompleteProps } from "./types";
import { useAutoComplete } from "./useAutoComplete";
import {
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultLabel as DEFAULT_GET_RESULT_LABEL,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
} from "./utils";

const block = bem("rmd-autocomplate");
const listbox = bem("rmd-listbox");

const DEFAULT_FILTER_OPTIONS = {
  trim: true,
  ignoreWhitespace: true,
};

const EMPTY_LIST: string[] = [];

/**
 * An AutoComplete is an accessible combobox widget that allows for real-time
 * suggestions as the user types.
 */
export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
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
      highlightReapeating = false,
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
      disableShowOnFocus,
      closeOnResize = false,
      closeOnScroll = false,
      omitKeys = EMPTY_LIST,
      value: propValue,
      defaultValue,
      beforeResultsChildren,
      afterResultsChildren,
      ...props
    },
    forwardedRef
  ) {
    const { id } = props;
    const comboboxId = `${id}-combobox`;
    const suggestionsId = `${id}-listbox`;
    const isListAutocomplete =
      autoComplete === "list" || autoComplete === "both";
    const isInlineAutocomplete =
      autoComplete === "inline" || autoComplete === "both";

    const {
      ref,
      match,
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
      suggestionsId,
      defaultValue,
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
      isListAutocomplete,
      isInlineAutocomplete,
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
      closeOnResize,
      closeOnScroll,
      disableShowOnFocus,
    });

    return (
      <>
        <TextField
          {...props}
          aria-autocomplete={autoComplete}
          aria-controls={comboboxId}
          aria-activedescendant={activeId}
          autoComplete="off"
          value={propValue ?? match}
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
            {beforeResultsChildren}
            {filteredData.map((datum, i) => {
              const resultId = getResultId(suggestionsId, i);
              let optionProps: ListboxOptionProps | undefined;
              if (isListboxOptionProps(datum)) {
                optionProps = omit(datum, [labelKey, valueKey, ...omitKeys]);
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
                    value={propValue ?? value}
                    enabled={highlight}
                    repeatable={highlightReapeating}
                  >
                    {getResultLabel(datum, labelKey, value)}
                  </HighlightedResult>
                </Option>
              );
            })}
            {afterResultsChildren}
          </List>
        </ScaleTransition>
      </>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

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
      closeOnResize: PropTypes.bool,
      closeOnScroll: PropTypes.bool,
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
      underlineDirection: PropTypes.oneOf(["left", "center", "right"]),
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
      onChange: PropTypes.func,
      containerProps: PropTypes.object,
      listboxStyle: PropTypes.object,
      listboxClassName: PropTypes.string,
      highlightReapeating: PropTypes.bool,
      highlightStyle: PropTypes.object,
      highlightClassName: PropTypes.string,
      disableShowOnFocus: PropTypes.bool,
      omitKeys: PropTypes.arrayOf(PropTypes.string),
      value: PropTypes.string,
      defaultValue: PropTypes.string,
      beforeResultsChildren: PropTypes.node,
      afterResultsChildren: PropTypes.node,
    };
  } catch (e) {}
}
