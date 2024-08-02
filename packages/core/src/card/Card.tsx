import { forwardRef, type HTMLAttributes } from "react";
import { Box } from "../box/Box.js";
import {
  type BoxAlignItems,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type BoxOptions,
} from "../box/styles.js";
import { card, type CardClassNameOptions } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-card-background-color"?: string;
    "--rmd-card-color"?: string;
    "--rmd-card-secondary-color"?: string;
  }
}

/**
 * @since 6.0.0 Extends the {@link CardClassNameOptions} and removed the
 * deprecated `raiseable` prop
 */
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardClassNameOptions {
  /**
   * @defaultValue `"stretch"`
   */
  align?: BoxAlignItems;

  /**
   * @defaultValue `"start"`
   */
  justify?: BoxAlignItems;

  /**
   * @see {@link BoxOptions.fullWidth}
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

/**
 * @example Simple Example
 * ```tsx
 * import {
 *   Button,
 *   Card,
 *   CardContent,
 *   CardFooter,
 *   CardHeader,
 *   CardTitle,
 *   CardSubtitle,
 *   Typography,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>Main Title</CardTitle>
 *         <CardSubtitle>A subtitle</CardSubtitle>
 *       </CardHeader>
 *       <CardContent>
 *         <Typography margin="none">
 *           Some paragraph of text.
 *         </Typography>
 *       </CardContent>
 *       <CardFooter>
 *         <Button>Action 1</Button>
 *         <Button>Action 2</Button>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Removed the deprecated `raiseable` prop
 * @since 6.0.0 Uses the `Box` component and displays as `flex` instead of
 * `block`/`inline-block`.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    const {
      children,
      className,
      align = "stretch",
      justify = "stretch",
      bordered,
      raisable,
      fullWidth,
      interactable,
      ...remaining
    } = props;

    return (
      <Box
        {...remaining}
        align={align}
        justify={justify}
        stacked
        fullWidth={fullWidth}
        disableGap
        disablePadding
        ref={ref}
        className={card({
          className,
          bordered,
          raisable,
          interactable,
        })}
      >
        {children}
      </Box>
    );
  }
);
