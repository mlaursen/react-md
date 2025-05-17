import { Box } from "@react-md/core/box/Box";
import { type BoxGridBreakpointColumns } from "@react-md/core/box/styles";
import { Card } from "@react-md/core/card/Card";
import { cssUtils } from "@react-md/core/cssUtils";
import { type CSSProperties, type ReactElement } from "react";

const GRID_COLUMNS: BoxGridBreakpointColumns = {
  phone: 4,
  tablet: 8,
  desktop: 12,
};

export default function MaterialGridExample(): ReactElement {
  return (
    <>
      <Box grid gridColumns={GRID_COLUMNS} align="stretch">
        {Array.from({ length: 12 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Box>
      <Box grid gridColumns={GRID_COLUMNS} align="stretch">
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i} index={i} style={{ gridColumn: "span 2" }} />
        ))}
      </Box>
      <Box grid gridColumns={GRID_COLUMNS} align="stretch">
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i} index={i} style={{ gridColumn: "span 3" }} />
        ))}
      </Box>
    </>
  );
}

interface CellProps {
  style?: CSSProperties;
  index: number;
}

function Cell({ index, style }: CellProps): ReactElement {
  return (
    <Card
      align="center"
      justify="center"
      style={{ minHeight: "4rem", ...style }}
      className={cssUtils({ textAlign: "center" })}
    >
      {`Cell ${index + 1}`}
    </Card>
  );
}
