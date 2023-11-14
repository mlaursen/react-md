import { forwardRef, type TdHTMLAttributes } from "react";
import { type RadioProps } from "../form/InputToggle.js";
import { Radio } from "../form/Radio.js";
import { type PropsWithRef } from "../types.js";
import { TableCell } from "./TableCell.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export type TableRadioTdHTMLAttributes = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "aria-sort" | "scope" | "onChange" | "onInvalid"
>;

/**
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
   * This allows you to override any props for the checkbox that are not
   * configurable as top-level props.
   *
   * @example
   * Simple Example
   * ```tsx
   * checkboxProps={{
   *   id: "some-custom-id",
   *   ref: checkboxRef,
   * }}
   * ```
   *
   * @see {@link TableRadioSupportedRadioProps}
   * @remarks \@since 6.0.0
   */
  radioProps?: PropsWithRef<RadioProps, HTMLInputElement>;
}

/**
 * **Server Component**
 * This might actually be a client component.
 *
 * @example
 * Simple Example
 * ```tsx
 * import {
 *   Table,
 *   TableBody,
 *   TableCell,
 *   TableRadio,
 *   TableContainer,
 *   TableHeader,
 *   TableRow,
 *   useRadioGroup,
 * } from "@react-md/core";
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
 * @remarks \@since 6.0.0
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
