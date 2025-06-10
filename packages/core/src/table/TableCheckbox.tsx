"use client";

import { type TdHTMLAttributes, forwardRef } from "react";

import { Checkbox } from "../form/Checkbox.js";
import { type CheckboxProps } from "../form/InputToggle.js";
import { type PropsWithRef } from "../types.js";
import { TableCell } from "./TableCell.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type TableCheckboxTdHTMLAttributes = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "aria-sort" | "scope" | "onChange"
>;

/**
 * @since 6.0.0
 */
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

/**
 * @since 6.0.0 The `id` prop is no longer required since the checkbox's id
 * will automatically be generated as `"checkbox" + useId()`. Use the {@link checkboxProps}
 * to set an `id` manually for the checkbox.
 * @since 6.0.0 The `cellId` prop was removed. Use the `id` prop instead.
 * @since 6.0.0 The default `aria-label` was changed from
 * `"Toggle Row Selection"` to `"Select Row"`.
 */
export interface TableCheckboxProps
  extends TableCheckboxTdHTMLAttributes,
    TableCheckboxSupportedCheckboxProps {
  /**
   * @defaultValue `!props["aria-labelledby"] ? "Select Row" : undefined`
   */
  "aria-label"?: string;

  /** @defaultValue `false` */
  sticky?: boolean;

  /**
   * This allows you to override any props for the checkbox that are not
   * configurable as top-level props.
   *
   * @example Simple Example
   * ```tsx
   * checkboxProps={{
   *   id: "some-custom-id",
   *   ref: checkboxRef,
   * }}
   * ```
   *
   * @see {@link TableCheckboxSupportedCheckboxProps}
   * @since 6.0.0
   */
  checkboxProps?: PropsWithRef<CheckboxProps>;
}

/**
 * **Client Component**
 * The `TableCheckbox` is used to render a `Checkbox` within a `TableCell` by applying
 * some minimal styles.
 *
 * @example Simple Example
 * ```tsx
 * import { useCheckboxGroup } from "@react-md/core/form/useCheckboxGroup";
 * import { Table } from "@react-md/core/table/Table";
 * import { TableBody } from "@react-md/core/table/TableBody";
 * import { TableCell } from "@react-md/core/table/TableCell";
 * import { TableCheckbox } from "@react-md/core/table/TableCheckbox";
 * import { TableContainer } from "@react-md/core/table/TableContainer";
 * import { TableHeader } from "@react-md/core/table/TableHeader";
 * import { TableRow } from "@react-md/core/table/TableRow";
 * import { type ReactElement } from "react";
 *
 * const rows = [
 *   { name: "Frozen Yogurt", type: "Ice Cream" },
 *   { name: "Ice cream sandwich", type: "Ice Cream" },
 *   { name: "Eclair", type: "Pastry" },
 *   // ...other content
 * ] as const;
 *
 * function Example(): ReactElement {
 *   const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
 *     values: rows.map(({ name }) => name),
 *     name: "selected",
 *   });
 *   return (
 *     <TableContainer>
 *       <Table>
 *         <TableHeader>
 *           <TableRow>
 *             <TableCheckbox {...getIndeterminateProps()} />
 *             <TableCell>Name</TableCell>
 *             <TableCell>Type</TableCell>
 *           </TableRow>
 *         </TableHeader>
 *         <TableBody>
 *           {rows.map(({ name, type }) => {
 *             const checkboxProps = getCheckboxProps(name);
 *             const { checked, onChange } = checkboxProps;
 *
 *             return (
 *               <TableRow
 *                 key={name}
 *                 onClick={onChange}
 *                 clickable
 *                 selected={checked}
 *               >
 *                 <TableCheckbox {...checkboxProps} />
 *                 <TableCell>{name}</TableCell>
 *                 <TableCell hAlign="right">{type}</TableCell>
 *               </TableRow>
 *             );
 *           })}
 *         </TableBody>
 *       </Table>
 *     </TableContainer>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 * @since 6.0.0 The `id` prop is no longer required since the checkbox's id
 * will automatically be generated as `"checkbox" + useId()`. Use the {@link checkboxProps}
 * to set an `id` manually for the checkbox.
 * @since 6.0.0 The `cellId` prop was removed. Use the `id` prop instead.
 * @since 6.0.0 The default `aria-label` was changed from
 * `"Toggle Row Selection"` to `"Select Row"`.
 */
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
    onClick = noop,
    ...remaining
  } = props;

  return (
    <TableCell
      {...remaining}
      ref={ref}
      header={false}
      inputToggle
      onClick={(event) => {
        event.stopPropagation();
        onClick(event);
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
