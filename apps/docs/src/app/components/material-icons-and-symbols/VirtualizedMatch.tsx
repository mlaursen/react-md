import {
  Button,
  box,
  cssUtils,
  useColorScheme,
  type ButtonProps,
} from "react-md";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import styles from "./VirtualizedMatch.module.scss";
import { type MaterialIconAndSymbolName } from "./metadata.js";

export interface VirtualizedMatchProps extends Omit<ButtonProps, "children"> {
  name: MaterialIconAndSymbolName;
  icon: ReactNode;
}

export function VirtualizedMatch(props: VirtualizedMatchProps): ReactElement {
  const { name, icon, className, ...remaining } = props;
  const { selectIcon, selectedIconName } = useMaterialIconsAndSymbols();
  const selected = selectedIconName === name;
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
          selected && colorScheme === "dark" && styles.selectedDark,
          cssUtils({
            textTransform: "capitalize",
            textAlign: "center",
          })
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
