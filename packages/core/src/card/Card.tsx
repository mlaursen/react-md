import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { CardClassNameOptions } from "./styles";
import { card } from "./styles";

/**
 * @remarks \@since 6.0.0 Extends the {@link CardClassNameOptions}.
 */
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardClassNameOptions {}

/**
 * @example
 * Simple Example
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
 * @remarks \@since 6.0.0 Removed the deprecated `raiseable` prop
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  props,
  ref
) {
  const {
    children,
    className,
    bordered = false,
    raisable = false,
    fullWidth = false,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={card({
        className,
        bordered,
        raisable,
        fullWidth,
      })}
    >
      {children}
    </div>
  );
});