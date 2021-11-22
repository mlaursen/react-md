import { ReactElement, ReactNode } from "react";
import { GridCell } from "@react-md/utils";

export interface ConfigurationCellProps {
  fullWidth?: boolean;
  children: ReactNode;
}

export default function ConfigurationCell({
  fullWidth,
  children,
}: ConfigurationCellProps): ReactElement {
  return (
    <GridCell
      clone
      largeDesktop={fullWidth ? { colSpan: 3 } : undefined}
      tablet={{ colSpan: fullWidth ? 2 : 1 }}
    >
      {children}
    </GridCell>
  );
}
