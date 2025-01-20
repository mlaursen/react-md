import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
import { type ProvidedExpansionPanelProps } from "@react-md/core/expansion-panel/useExpansionPanels";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import styles from "./FilterPanel.module.scss";

export interface FilterPanelProps extends ProvidedExpansionPanelProps {
  icon: ReactNode;
  name: ReactNode;
  inline?: boolean;
  children: ReactNode;
}

export function FilterPanel(props: FilterPanelProps): ReactElement {
  const { icon, name, inline, children, ...remaining } = props;
  const { isDesktop } = useAppSize();
  const { colorScheme } = useColorScheme();

  return (
    <ExpansionPanel
      {...remaining}
      className={cnb(
        styles.panel,
        !isDesktop && colorScheme === "dark" && styles.elevationFix
      )}
      headerChildren={
        <span className={box({ disablePadding: true })}>
          {icon}
          {name}
        </span>
      }
    >
      <Box align="start" stacked={!inline} disablePadding>
        {children}
      </Box>
    </ExpansionPanel>
  );
}
