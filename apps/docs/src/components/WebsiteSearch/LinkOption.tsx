import { box } from "@react-md/core/box/styles";
import { option } from "@react-md/core/form/optionStyles";
import {
  ListItemLink,
  type ListItemLinkProps,
} from "@react-md/core/list/ListItemLink";
import { useKeyboardMovementContext } from "@react-md/core/movement/useKeyboardMovementProvider";
import { useEnsuredId } from "@react-md/core/useEnsuredId";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { LinkUnstyled } from "../LinkUnstyled.jsx";
import { HeadingStructureIcon } from "./HeadingStructureIcon.jsx";

export interface LinkOptionProps extends ListItemLinkProps {
  href: string;
  isHeading?: boolean;
  isLastHeading?: boolean;
}

export function LinkOption(props: Readonly<LinkOptionProps>): ReactElement {
  const {
    isHeading,
    isLastHeading,
    href,
    leftAddon = isHeading && <HeadingStructureIcon isLast={isLastHeading} />,
    leftAddonType = isHeading ? "media" : undefined,
    ...remaining
  } = props;
  const id = useEnsuredId(undefined, "option");
  const focused = id === useKeyboardMovementContext().activeDescendantId;

  return (
    <ListItemLink
      role="option"
      href={href}
      as={LinkUnstyled}
      {...remaining}
      id={id}
      tabIndex={-1}
      className={option({
        icon: false,
        selected: false,
        className: cnb(focused && "rmd-menu-item--focused"),
      })}
      leftAddon={leftAddon}
      leftAddonType={leftAddonType}
      leftAddonClassName={cnb(
        isHeading &&
          box({
            justify: "space-between",
            disableGap: true,
            disableWrap: true,
            disablePadding: true,
          })
      )}
      disableLeftAddonCenteredMedia
    />
  );
}
