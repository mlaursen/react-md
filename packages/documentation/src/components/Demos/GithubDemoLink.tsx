import { ReactElement } from "react";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import GithubLink from "components/GithubLink";

export interface GithubDemoLinkProps {
  id: string;
  href: string;
}

export default function GithubDemoLink({
  id,
  href,
}: GithubDemoLinkProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
  });
  return (
    <>
      <GithubLink {...elementProps} href={href} />
      <Tooltip {...tooltipProps}>View source GitHub</Tooltip>
    </>
  );
}
