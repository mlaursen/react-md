import { useUserInteractionMode } from "@react-md/core/interaction/UserInteractionModeProvider";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function DetectingUserInteractionModeExample(): ReactElement {
  const mode = useUserInteractionMode();

  return (
    <Typography>{`The current interaction mode is "${mode}".`}</Typography>
  );
}
