import type {
  CSSTransitionClassNames,
  LabelRequiredForA11y,
  TransitionTimeout,
} from "@react-md/core";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { BaseDialogProps } from "./Dialog";
import { Dialog } from "./Dialog";
import type { BaseSheetClassNameOptions } from "./styles";
import { sheet } from "./styles";

const noop = (): void => {
  // do nothing
};

export const DEFAULT_SHEET_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_SHEET_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
  exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
};

type AllowedDialogProps = Omit<BaseDialogProps, "role" | "type" | "modal">;

export interface BaseSheetProps
  extends AllowedDialogProps,
    BaseSheetClassNameOptions {
  /**
   * @defaultValue `"dialog"`
   */
  role?: "dialog" | "menu" | "none";
}

export type SheetProps = LabelRequiredForA11y<BaseSheetProps>;

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  props,
  ref
) {
  const {
    role = "dialog",
    className,
    position = "left",
    horizontalSize = "media",
    verticalSize = "recommended",
    timeout = DEFAULT_SHEET_TIMEOUT,
    classNames = DEFAULT_SHEET_CLASSNAMES,
    visible,
    temporary = true,
    children,
    onExited = noop,
    ...remaining
  } = props;
  const { disableOverlay } = props;

  // if the sheet mounts while not visible and the conditional mounting isn't
  // enabled, need to default to the offscreen state which is normally handled
  // by the CSSTransition's exit state.
  const offscreen = useRef(!visible && !temporary);
  if (offscreen.current && visible) {
    offscreen.current = false;
  }

  // when sheets are not unmounted on exit, need to set it to hidden so that
  // tabbing no longer focuses any of the elements inside
  const [hidden, setHidden] = useState(!visible && !temporary);
  useEffect(() => {
    if (hidden && visible) {
      setHidden(false);
    }
  }, [hidden, visible]);

  return (
    <Dialog
      {...remaining}
      ref={ref}
      role={role}
      type="custom"
      hidden={remaining.hidden ?? hidden}
      timeout={timeout}
      classNames={classNames}
      visible={visible}
      temporary={temporary}
      onExited={() => {
        onExited();
        setHidden(!temporary);
      }}
      className={sheet({
        position,
        horizontalSize,
        verticalSize,
        offscreen: offscreen.current,
        disableOverlay,
        className,
      })}
    >
      {children}
    </Dialog>
  );
});
