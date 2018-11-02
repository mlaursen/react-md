import * as React from "react";
import { Portal } from "@react-md/portal";
import { Tooltip } from "@react-md/tooltip";

export interface ICellTooltipProps {
  style?: React.CSSProperties;
  portal: boolean;
  visible: boolean;
  id: string;
}

const CellTooltip: React.SFC<ICellTooltipProps> = ({ id, style, portal, visible }) => {
  if (portal) {
    return (
      <Portal intoId="overflow-portal-example-tooltip-container" visible={visible}>
        <Tooltip id={id} style={style} className="rmd-tooltip--magic rmd-tooltip--active">
          Tooltip!
        </Tooltip>
      </Portal>
    );
  }

  return <Tooltip id={id}>Tooltip!</Tooltip>;
};

export default CellTooltip;
