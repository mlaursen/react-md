import React, { FC } from "react";
import { SingletonRouter, withRouter } from "next/router";
import { useActionClassName } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

import LinkButton from "components/LinkButton";
import { toSandbox } from "utils/routes";

export interface CodePreviewProps {
  demoId: string;
  demoTitle: string;
  folder: string;
  router: SingletonRouter;
}

const CodePreview: FC<CodePreviewProps> = ({
  demoId,
  demoTitle,
  folder,
  router,
}) => (
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
    >
      <CodeSVGIcon />
    </LinkButton>
  </Tooltipped>
);

export default withRouter(CodePreview);
