import {
  Box,
  ExpansionPanel,
  box,
  useAppSize,
  useColorScheme,
  type ProvidedExpansionPanelProps,
} from "@react-md/core";
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
