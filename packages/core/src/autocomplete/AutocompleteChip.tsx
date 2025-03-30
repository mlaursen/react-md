import { forwardRef } from "react";

import { Chip } from "../chip/Chip.js";
import { getIcon } from "../icon/config.js";
import { autocompleteChip } from "./autocompleteStyles.js";
import { type AutocompleteChipProps } from "./types.js";

/**
 * A small wrapper around the `Chip` that defaults the `rightAddon` to the
 * remove icon and adds a default `aria-description`.
 *
 * @see {@link https://next.react-md.dev/components/autocomplete | Autocomplete Demos}
 * @since 6.0.0
 */
export const AutocompleteChip = forwardRef<
  HTMLButtonElement,
  AutocompleteChipProps
>(function AutocompleteChip(props, ref) {
  const {
    "aria-description": propAriaDescription,
    children,
    className,
    removeIcon: propRemoveIcon,
    rightAddon: propRightAddon,
    ...remaining
  } = props;

  let rightAddon = propRightAddon;
  let ariaDescription = propAriaDescription;
  const removeIcon = getIcon("remove", propRemoveIcon);
  if (typeof rightAddon === "undefined") {
    rightAddon = removeIcon;
  }

  if (typeof ariaDescription === "undefined" && typeof children === "string") {
    ariaDescription = `Remove "${children}"`;
  }

  return (
    <Chip
      {...remaining}
      aria-description={ariaDescription}
      ref={ref}
      rightAddon={rightAddon}
      className={autocompleteChip({ className })}
    >
      {children}
    </Chip>
  );
});
