import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";
import { type ListChildComponentProps } from "react-window";

import { MaterialSymbolOrIcon } from "./MaterialSymbolOrIcon.js";
import styles from "./RenderVirtualizedRow.module.scss";
import { VirtualizedMatch } from "./VirtualizedMatch.js";
import { type CategoryOrIconNames } from "./useVirtualizedWindow.js";
import { getCategoryName } from "./utils.js";

export interface VirtualizedData {
  list: readonly CategoryOrIconNames[];
  columns: number;
}

export type RenderVirtualizedRowProps =
  ListChildComponentProps<VirtualizedData>;

export function RenderVirtualizedRow(
  props: RenderVirtualizedRowProps
): ReactElement {
  const { index, style, data } = props;
  const { list, columns } = data;

  const match = list[index];
  if (typeof match === "string") {
    return (
      <Typography
        style={style}
        type="subtitle-2"
        margin="none"
        textColor="text-secondary"
        className={box({
          className: styles.category,
          align: "end",
        })}
      >
        {getCategoryName(match)}
      </Typography>
    );
  }

  return (
    <Box style={style} align="stretch" grid gridColumns={columns}>
      {match.map((iconName) => (
        <VirtualizedMatch
          key={iconName}
          name={iconName}
          icon={<MaterialSymbolOrIcon iconName={iconName} />}
        />
      ))}
    </Box>
  );
}
