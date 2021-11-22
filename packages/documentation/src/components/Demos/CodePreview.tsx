import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useActionClassName } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

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

  return (
    <Tooltipped id={`${demoId}-show-code`} tooltip="Show Code">
      <LinkButton
        buttonType="icon"
        aria-label="Show Code"
        href={toSandbox({
          pkg: folder,
          name: demoTitle,
          from: `${router.pathname}#${demoId}-title`,
        })}
        className={useActionClassName({ first: true })}
        onClick={sendAnalytics({
          name: EventName.ViewCode,
          lang: pref,
          demoName: demoTitle,
          packageName: folder,
        })}
      >
        <CodeSVGIcon />
      </LinkButton>
    </Tooltipped>
  );
}
