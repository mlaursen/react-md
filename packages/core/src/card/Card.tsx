import { type HTMLAttributes, forwardRef } from "react";

import { Box } from "../box/Box.js";
import { type BoxAlignItems, type BoxOptions } from "../box/styles.js";
import { type CardClassNameOptions, card } from "./styles.js";

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
    CardClassNameOptions,
    Pick<BoxOptions, "align" | "justify" | "fullWidth" | "disableWrap"> {
  /** @defaultValue `"stretch"` */
  align?: BoxAlignItems;

  /** @defaultValue `"start"` */
  justify?: BoxAlignItems;
}

/**
 * @example Simple Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Card } from "@react-md/core/card/Card";
 * import { CardContent } from "@react-md/core/card/CardContent";
 * import { CardFooter } from "@react-md/core/card/CardFooter";
 * import { CardHeader } from "@react-md/core/card/CardHeader";
 * import { CardTitle } from "@react-md/core/card/CardTitle";
 * import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
 * import { Typography } from "@react-md/core/typography/Typography";
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
 * @see {@link https://next.react-md.dev/components/card | Card Demos}
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
      interactable,
      ...remaining
    } = props;

    return (
      <Box
        align={align}
        justify={justify}
        disableWrap
        {...remaining}
        stacked
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
