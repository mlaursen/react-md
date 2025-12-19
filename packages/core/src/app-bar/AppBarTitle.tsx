import { type ReactElement, type Ref } from "react";

import { type TextOverflow } from "../cssUtils.js";
import { Typography, type TypographyProps } from "../typography/Typography.js";
import { type TypographyType } from "../typography/typographyStyles.js";
import { type AppBarTitleClassNameOptions, appBarTitle } from "./styles.js";

/**
 * @since 6.0.0 The `keyline` prop was changed from a boolean to a type
 * union of different keylines: {@link AppBarTitleKeyline}
 * @since 6.0.0 The `noWrap` prop was removed in favor of the `textOverflow`
 * prop inherited through the base `Typography` component. The `textOverflow`
 * will default to `"ellipsis"` which is new as well.
 */
export interface AppBarTitleProps
  extends TypographyProps, AppBarTitleClassNameOptions {
  ref?: Ref<HTMLHeadingElement>;

  /** @defaultValue `"headline-6"` */
  type?: TypographyType;

  /**
   * @defaultValue `"ellipsis"`
   */
  textOverflow?: TextOverflow;
}

/**
 * @example Updating the Keyline
 * ```tsx
 * import { AppBar } from "@react-md/core/app-bar/AppBar";
 * import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <AppBar>
 *       <AppBarTitle keyline="nav">
 *         Offset as if there was a nav button to the left
 *       </AppBarTitle>
 *     </AppBar>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 The `keyline` prop was changed from a boolean to a type
 * union of different keylines: {@link AppBarTitleKeyline}
 * @since 6.0.0 The `noWrap` prop was removed in favor of the `textOverflow`
 * prop inherited through the base `Typography` component. The `textOverflow`
 * will default to `"ellipsis"` which is new as well.
 */
export function AppBarTitle(props: AppBarTitleProps): ReactElement {
  const {
    ref,
    type = "headline-6",
    keyline = "small",
    children,
    className,
    textOverflow = "ellipsis",
    ...remaining
  } = props;

  return (
    <Typography
      {...remaining}
      ref={ref}
      type={type}
      className={appBarTitle({
        keyline,
        className,
      })}
      textOverflow={textOverflow}
    >
      {children}
    </Typography>
  );
}
