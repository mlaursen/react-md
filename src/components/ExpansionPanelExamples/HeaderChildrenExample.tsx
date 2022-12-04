import { typography, Typography } from "@react-md/core";
import { ExpansionPanel } from "@react-md/expansion-panel";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

const noop = (): void => {
  // do nothing
};

function HeaderChildren(): ReactElement {
  return (
    <>
      <FavoriteIcon />
      <span
        className={typography({ type: null, disableLineWrap: true })}
        style={{ flex: "1 1 auto" }}
      >
        Any content can be displayed, but might require additional styles.
      </span>
    </>
  );
}

export function HeaderChildrenExample(): ReactElement {
  return (
    <ExpansionPanel
      disabled
      expanded
      onExpandClick={noop}
      headerChildren={<HeaderChildren />}
    >
      <Typography margin="none">
        The header applies <code>justify-content: space-between</code> by
        default, so it is recommended to wrap your custom header implementation
        in another DOM node like a <code>{"<div>"}</code>.
      </Typography>
    </ExpansionPanel>
  );
}
