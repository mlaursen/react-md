import React, { FC, ReactNode } from "react";
import { GridCell } from "@react-md/utils";

export interface ConfigurationCellProps {
  fullWidth?: boolean;
  children: ReactNode;
}

const ConfigurationCell: FC<ConfigurationCellProps> = ({
  fullWidth,
  children,
}) => (
  <GridCell
    clone
    largeDesktop={fullWidth ? { colSpan: 3 } : undefined}
    tablet={{ colSpan: fullWidth ? 2 : 1 }}
  >
    {children}
  </GridCell>
);

export default ConfigurationCell;
