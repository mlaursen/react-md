import type { PropsWithRef } from "@react-md/core";
import type { CheckboxProps } from "@react-md/form";
import { Checkbox } from "@react-md/form";
import type { TdHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { TableCellStickyBehavior } from "./TableCell";
import { TableCell } from "./TableCell";

export type TableCheckboxTdHTMLAttributes = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "aria-sort" | "scope" | "onChange"
>;

export type TableCheckboxSupportedCheckboxProps = Pick<
  CheckboxProps,
  | "name"
  | "value"
  | "icon"
  | "iconStyle"
  | "iconClassName"
  | "iconProps"
  | "checkedIcon"
  | "indeterminateIcon"
  | "checked"
  | "onChange"
  | "defaultChecked"
  | "indeterminate"
  | "aria-controls"
>;

export interface TableCheckboxProps
  extends TableCheckboxTdHTMLAttributes,
    TableCheckboxSupportedCheckboxProps {
  sticky?: TableCellStickyBehavior;
  checkboxProps?: PropsWithRef<CheckboxProps, HTMLInputElement>;
}

export const TableCheckbox = forwardRef<
  HTMLTableCellElement,
  TableCheckboxProps
>(function TableCheckbox(props, ref) {
  const {
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = !ariaLabelledBy ? "Select Row" : undefined,
    "aria-controls": ariaControls,
    name,
    icon,
    iconProps,
    iconStyle,
    iconClassName,
    checkedIcon,
    indeterminateIcon,
    value,
    checked,
    onChange,
    defaultChecked,
    indeterminate,
    checkboxProps,
    onClick,
    ...remaining
  } = props;

  return (
    <TableCell
      {...remaining}
      ref={ref}
      header={false}
      checkbox
      onClick={(event) => {
        onClick?.(event);
        event?.stopPropagation();
      }}
    >
      <Checkbox
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-controls={ariaControls}
        name={name}
        icon={icon}
        iconProps={iconProps}
        iconStyle={iconStyle}
        iconClassName={iconClassName}
        checkedIcon={checkedIcon}
        indeterminateIcon={indeterminateIcon}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        indeterminate={indeterminate}
        {...checkboxProps}
      />
    </TableCell>
  );
});
