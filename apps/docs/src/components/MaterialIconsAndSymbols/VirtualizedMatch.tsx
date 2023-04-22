import type { ButtonProps } from "@react-md/core";
import { box, Button, useColorScheme } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";

import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider";
import type { MaterialIconAndSymbolName } from "./metadata";
import styles from "./VirtualizedMatch.module.scss";

export interface VirtualizedMatchProps extends Omit<ButtonProps, "children"> {
  name: MaterialIconAndSymbolName;
  icon: ReactNode;
}

export function VirtualizedMatch(props: VirtualizedMatchProps): ReactElement {
  const { name, icon, className, ...remaining } = props;
  const { selectIcon, howToUseVisible, selectedIconName } =
    useMaterialIconsAndSymbols();
  const selected = howToUseVisible && selectedIconName === name;
  const { colorScheme } = useColorScheme();

  return (
    <Button
      {...remaining}
      className={box({
        className: cnb(
          className,
          styles.button,
          selected && styles.selected,
          selected && colorScheme === "light" && styles.selectedLight,
          selected && colorScheme === "dark" && styles.selectedDark
        ),
        stacked: true,
      })}
      onClick={() => {
        selectIcon(name);
      }}
      themeType={selected ? "outline" : "flat"}
    >
      {icon}
      <span>{name.replace(/_/g, " ")}</span>
    </Button>
  );
}
