import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { useActionClassName } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import { useCodePreference } from "components/CodePreference";
import LinkButton from "components/LinkButton";
import { EventName, sendAnalytics } from "utils/analytics";
import { toSandbox } from "utils/routes";

export interface CodePreviewProps {
  demoId: string;
  demoTitle: string;
  folder: string;
}

export default function CodePreview({
  demoId,
  demoTitle,
  folder,
}: CodePreviewProps): ReactElement {
  const router = useRouter();
  const { pref } = useCodePreference();
  const { elementProps, tooltipProps } = useTooltip({
    baseId: `${demoId}-show-code`,
    onClick: sendAnalytics({
      name: EventName.ViewCode,
      lang: pref,
      demoName: demoTitle,
      packageName: folder,
    }),
  });

  return (
    <>
      <LinkButton
        {...elementProps}
        buttonType="icon"
        aria-label="Show Code"
        href={toSandbox({
          pkg: folder,
          name: demoTitle,
          from: `${router.pathname}#${demoId}-title`,
        })}
        className={useActionClassName({ first: true })}
      >
        <CodeSVGIcon />
      </LinkButton>
      <Tooltip {...tooltipProps}>Show Code</Tooltip>
    </>
  );
}
