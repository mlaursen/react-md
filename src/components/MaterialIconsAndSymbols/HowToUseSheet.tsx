import type { TransitionStage } from "@react-md/core";
import {
  Button,
  DialogHeader,
  DialogTitle,
  MaterialIcon,
  MaterialSymbol,
  Sheet,
  Tooltip,
  useToggle,
  useTooltip,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import FullscreenExitIcon from "@react-md/material-icons/FullscreenExitIcon";
import FullscreenIcon from "@react-md/material-icons/FullscreenIcon";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";

import styles from "./HowToUseSheet.module.scss";
import { HowToUseSplitter } from "./HowToUseSplitter";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider";
import { MaterialSymbolsUsage } from "./MaterialSymbolsUsage/MaterialSymbolsUsage";
import { isMaterialSymbol } from "./utils";

export interface HowToUseSheetProps {
  stage: TransitionStage;
}

export function HowToUseSheet({ stage }: HowToUseSheetProps): ReactElement {
  const { iconType, deselectIcon, howToUseVisible, selectedIconName } =
    useMaterialIconsAndSymbols();

  const { toggled, toggle, disable } = useToggle();
  const { elementProps, tooltipProps } = useTooltip();

  let icon: ReactNode;
  let content: ReactNode;
  if (isMaterialSymbol(selectedIconName, iconType)) {
    icon = <MaterialSymbol name={selectedIconName} />;
    content = <MaterialSymbolsUsage />;
  } else {
    icon = <MaterialIcon name={selectedIconName} />;
  }

  return (
    <Sheet
      // kind of hacky, but makes it so there is no transition when the icon
      // type changes
      key={iconType}
      aria-labelledby="how-to-use-title"
      position="right"
      visible={howToUseVisible}
      onRequestClose={deselectIcon}
      className={cnb(styles.sheet, toggled && styles.fullscreen)}
      onExited={disable}
      disableOverlay
      disableScrollLock={!toggled}
    >
      <DialogHeader
        className={cnb(styles.header, toggled && styles.fullscreenHeader)}
      >
        {icon}
        <DialogTitle
          id="how-to-use-title"
          as="h4"
          type="headline-6"
          className={styles.title}
          disableLineWrap
        >
          {selectedIconName.replace(/_/g, " ")}
        </DialogTitle>
        <Button
          aria-label="Full Screen"
          buttonType="icon"
          onClick={toggle}
          {...elementProps}
        >
          {toggled ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
        <Tooltip {...tooltipProps}>
          {`${toggled ? "Exit " : ""}Full Screen`}
        </Tooltip>
        <Button
          aria-label="Close"
          buttonType="icon"
          onClick={deselectIcon}
          hidden={toggled}
        >
          <CloseIcon />
        </Button>
      </DialogHeader>
      {stage !== "exiting" && stage !== "exited" && <HowToUseSplitter />}
      {content}
    </Sheet>
  );
}
