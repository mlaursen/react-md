import cn from "classnames";
import { bem } from "@react-md/utils";

import { AppBarColorInherit, useInheritContext } from "./useInheritContext";

const block = bem("rmd-app-bar");

export interface AppBarActionClassNameProps extends AppBarColorInherit {
  /**
   * An optional className to merge with the nav classes.
   */
  className?: string;

  /**
   * Boolean if this is the first action within the app bar. This is really just
   * used to automatically right-align all the actions by applying
   * `margin-left: auto` to this action.
   */
  first?: boolean;

  /**
   * Boolean if this is the last action within the app bar's row. This will just
   * apply the `$rmd-app-bar-lr-margin` as `margin-right`.
   *
   * NOTE: This should not be used when using an overflow menu.
   */
  last?: boolean;
}

/**
 * This is a hook that will apply the nav classnames to an element. This should
 * really not be used externally and is really just for creating dropdown menus
 * within app bars that have the action styles.
 *
 * @internal
 */
export function useActionClassName({
  first,
  last,
  inheritColor,
  className,
}: AppBarActionClassNameProps = {}): string {
  return cn(
    block("action", {
      first,
      last,
      inherit: useInheritContext(inheritColor),
    }),
    className
  );
}
