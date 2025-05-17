import { ColorPreview } from "@react-md/code/ColorPreview";
import { InlineCode } from "@react-md/code/InlineCode";
import { tableCell } from "@react-md/core/table/tableCellStyles";
import { tableHeader } from "@react-md/core/table/tableHeaderStyles";
import { tableRow } from "@react-md/core/table/tableRowStyles";
import { table } from "@react-md/core/table/tableStyles";
import { type ReactElement } from "react";

interface Color {
  name: string;
  color: string;
}

const colors: Color[] = [
  { color: "#121212", name: "$dark-theme-background-color" },
  { color: "#424242", name: "$dark-theme-surface-color" },
  {
    color: "rgba(255, 255, 255, 0.87)",
    name: "$dark-theme-text-primary-color",
  },
  {
    color: "rgba(255, 255, 255, 0.6)",
    name: "$dark-theme-text-secondary-color",
  },
  { color: "rgba(255, 255, 255, 0.38)", name: "$dark-theme-text-hint-color" },
  {
    color: "rgba(255, 255, 255, 0.38)",
    name: "$dark-theme-text-disabled-color",
  },
  {
    color: "rgba(255, 255, 255, 0.1)",
    name: "$dark-surface-hover-background-color",
  },
  {
    color: "rgba(255, 255, 255, 0.12)",
    name: "$dark-surface-focus-background-color",
  },
  {
    color: "rgba(255, 255, 255, 0.24)",
    name: "$dark-surface-press-background-color",
  },
  {
    color: "rgba(255, 255, 255, 0.12)",
    name: "$dark-surface-selected-background-color",
  },
  {
    color: "rgba(255, 255, 255, 0.12)",
    name: "$dark-surface-ripple-background-color",
  },
  { color: "#B3B3B3", name: "$icon-dark-theme-color" },
];

export function DarkModeColors(): ReactElement {
  return (
    <table className={table()}>
      <thead className={tableHeader()}>
        <tr className={tableRow({ disableHover: true })}>
          <th className={tableCell({ header: true, isInTableHeader: true })}>
            Name
          </th>
          <th className={tableCell({ header: true, isInTableHeader: true })}>
            Color
          </th>
        </tr>
      </thead>
      <tbody>
        {colors.map(({ name, color }) => (
          <tr key={name} className={tableRow({})}>
            <td className={tableCell()}>
              <InlineCode>{name}</InlineCode>
            </td>
            <td className={tableCell()}>
              <ColorPreview color={color} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
