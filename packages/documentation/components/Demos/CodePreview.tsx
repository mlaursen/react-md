import React, { Fragment, FunctionComponent } from "react";
import { AppBarAction } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";
import { useToggle } from "@react-md/utils";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import CodePreviewer from "components/CodePreviewer";

import "./code-preview.scss";

export interface CodePreviewProps {
  demoId: string;
  demoTitle: string;
  getSandbox: () => Promise<IFiles>;
}

export interface CodeFile {
  fileName: string;
  content: string;
}

const CodePreview: FunctionComponent<CodePreviewProps> = ({
  demoId,
  demoTitle,
  getSandbox,
}) => {
  const { toggled: visible, enable: show, disable: hide } = useToggle(false);

  return (
    <Fragment>
      <Tooltipped id={`${demoId}-show-code`} tooltip="Show Code">
        <AppBarAction first onClick={show}>
          <CodeSVGIcon />
        </AppBarAction>
      </Tooltipped>
      <CodePreviewer
        projectName={demoTitle}
        getFiles={getSandbox}
        visible={visible}
        onRequestClose={hide}
      />
    </Fragment>
  );
};

export default CodePreview;
