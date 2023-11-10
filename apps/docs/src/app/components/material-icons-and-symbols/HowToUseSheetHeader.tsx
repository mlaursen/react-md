import { IconButton } from "@/components/IconButton.jsx";
import { addAppToast } from "@/toasts.js";
import {
  DialogHeader,
  DialogTitle,
  Tooltip,
  cssUtils,
  useTooltip,
} from "@react-md/core";
import CloseOutlinedIcon from "@react-md/material-icons/CloseOutlinedIcon";
import ShareOutlinedIcon from "@react-md/material-icons/ShareOutlinedIcon";
import { type ReactElement } from "react";
import styles from "./HowToUseSheetHeader.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { MaterialSymbolOrIcon } from "./MaterialSymbolOrIcon.jsx";

export function HowToUseSheetHeader(): ReactElement {
  const { selectedIconName, deselectIcon } = useMaterialIconsAndSymbols();
  const { elementProps, tooltipProps } = useTooltip({
    hoverTime: 0,
    overflowOnly: true,
  });
  const name = (selectedIconName || "").replace(/_/g, " ");

  return (
    <DialogHeader className={styles.header}>
      <MaterialSymbolOrIcon iconName={selectedIconName} />
      <DialogTitle
        {...elementProps}
        as="h4"
        type="headline-6"
        className={cssUtils({
          className: styles.title,
          textTransform: "capitalize",
          textOverflow: "ellipsis",
        })}
      >
        {name}
      </DialogTitle>
      <Tooltip
        {...tooltipProps}
        className={cssUtils({ textTransform: "capitalize" })}
      >
        {name}
      </Tooltip>
      <IconButton
        label="Share"
        tooltip="Copy url to clipboard"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href);
          addAppToast({ toastId: "copied" });
        }}
      >
        <ShareOutlinedIcon />
      </IconButton>
      <IconButton label="Close" onClick={deselectIcon}>
        <CloseOutlinedIcon />
      </IconButton>
    </DialogHeader>
  );
}
