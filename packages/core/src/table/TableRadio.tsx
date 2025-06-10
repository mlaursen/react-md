"use client";

import { type TdHTMLAttributes, forwardRef } from "react";

import { type RadioProps } from "../form/InputToggle.js";
import { Radio } from "../form/Radio.js";
import { type PropsWithRef } from "../types.js";
import { TableCell } from "./TableCell.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type TableRadioTdHTMLAttributes = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "aria-sort" | "scope" | "onChange" | "onInvalid"
>;

/**
 * @since 6.0.0
 */
export type TableRadioSupportedRadioProps = Pick<
  RadioProps,
  | "name"
  | "value"
  | "icon"
  | "iconStyle"
  | "iconClassName"
  | "iconProps"
  | "checkedIcon"
  | "checked"
  | "onChange"
  | "defaultChecked"
  | "error"
  | "required"
  | "onInvalid"
>;

/**
 * @since 6.0.0
 */
export interface TableRadioProps
  extends TableRadioTdHTMLAttributes,
    TableRadioSupportedRadioProps {
  /**
   * @defaultValue `!props["aria-labelledby"] ? "Select Row" : undefined`
   */
  "aria-label"?: string;

  /** @defaultValue `false` */
  sticky?: boolean;

  /**
   * This allows you to override any props for the radio that are not
   * configurable as top-level props.
   *
   * @example Simple Example
   * ```tsx
   * radioProps={{
   *   id: "some-custom-id",
   *   ref: radioRef,
   * }}
   * ```
   *
   * @see {@link TableRadioSupportedRadioProps}
   * @since 6.0.0
   */
  radioProps?: PropsWithRef<RadioProps>;
}

/**
 * **Client Component**
 * The `TableRadio` is used to render a `Radio` within a `TableCell` by applying
 * some minimal styles.
 *
 * @example Simple Example
 * ```tsx
 * import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
 * import { Table } from "@react-md/core/table/Table";
 * import { TableBody } from "@react-md/core/table/TableBody";
 * import { TableCell } from "@react-md/core/table/TableCell";
 * import { TableContainer } from "@react-md/core/table/TableContainer";
 * import { TableHeader } from "@react-md/core/table/TableHeader";
 * import { TableRadio } from "@react-md/core/table/TableRadio";
 * import { TableRow } from "@react-md/core/table/TableRow";
 * import type { ReactElement } from "react";
 *
 * const rows = [
 *   { name: "Frozen Yogurt", type: "Ice Cream" },
 *   { name: "Ice cream sandwich", type: "Ice Cream" },
 *   { name: "Eclair", type: "Pastry" },
 *   // ...other content
 * ] as const;
 *
 * function Example(): ReactElement {
 *   const { getRadioProps } = useRadioGroup({
 *     name: "selected",
 *   });
 *   return (
 *     <TableContainer>
 *       <Table>
 *         <TableHeader>
 *           <TableRow>
 *             <TableCell header={false} />
 *             <TableCell>Name</TableCell>
 *             <TableCell>Type</TableCell>
 *           </TableRow>
 *         </TableHeader>
 *         <TableBody>
 *           {rows.map(({ name, type }) => {
 *             const radioProps = getRadioProps(name);
 *             const { checked, onChange } = radioProps;
 *
 *             return (
 *               <TableRow
 *                 key={name}
 *                 onClick={onChange}
 *                 clickable
 *                 selected={checked}
 *               >
 *                 <TableRadio {...radioProps} />
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
 * @since 6.0.0
 */
export const TableRadio = forwardRef<HTMLTableCellElement, TableRadioProps>(
  function TableRadio(props, ref) {
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
      value,
      checked,
      onChange,
      defaultChecked,
      radioProps,
      onClick = noop,
      error,
      required,
      onInvalid,
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
        <Radio
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-controls={ariaControls}
          name={name}
          icon={icon}
          iconProps={iconProps}
          iconStyle={iconStyle}
          iconClassName={iconClassName}
          checkedIcon={checkedIcon}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          error={error}
          required={required}
          onChange={onChange}
          onInvalid={onInvalid}
          {...radioProps}
        />
      </TableCell>
    );
  }
);
