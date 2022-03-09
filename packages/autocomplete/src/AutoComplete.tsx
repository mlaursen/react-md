import { forwardRef } from "react";
import cn from "classnames";
import type { ListboxOptionProps } from "@react-md/form";
import { isListboxOptionProps, Option, TextField } from "@react-md/form";
import { List } from "@react-md/list";
import { ScaleTransition } from "@react-md/transition";
import { BELOW_CENTER_ANCHOR, bem, omit } from "@react-md/utils";

import { HighlightedResult } from "./HighlightedResult";
import type { AutoCompleteProps } from "./types";
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

const EMPTY_LIST: readonly string[] = [];

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
          nodeRef={listboxRef}
          portal={portal}
          portalInto={portalInto}
          portalIntoId={portalIntoId}
          vertical
          transitionIn={visible}
          {...transitionHooks}
          className={cn(listbox({ temporary: true }), listboxClassName)}
        >
          <List id={suggestionsId} role="listbox" style={fixedStyle}>
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
