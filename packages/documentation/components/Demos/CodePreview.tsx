import React, {
  FunctionComponent,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Portal } from "@react-md/portal";
import { Collapse } from "@react-md/transition";

import AppBarAction from "components/AppBarAction";
import Button from "components/Button";
import { CodeBlock } from "components/Code";

export interface CodePreviewProps {
  demoId: string;
  demoTitle: string;
  getSandbox: () => Promise<IFiles>;
}

export interface CodeFile {
  fileName: string;
  content: string;
}

import "./code-preview.scss";

const CodePreview: FunctionComponent<CodePreviewProps> = ({
  demoId,
  demoTitle,
  getSandbox,
}) => {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const sandbox = await getSandbox();
      const files = Object.keys(sandbox)
        .filter(fileName => !/package\.json|index.tsx$/.test(fileName))
        .map(fileName => ({
          fileName: fileName
            .substring(fileName.lastIndexOf("/") + 1)
            .replace("Demo", demoTitle.replace(/ /g, "")),
          content: sandbox[fileName].content,
        }));

      setFiles(files);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Fragment>
      <Portal visible intoId={`${demoId}-code-preview`}>
        <Collapse
          collapsed={collapsed}
          onCollapsed={() => {
            if (ref.current) {
              ref.current.focus();
            }
          }}
        >
          <div className="demo__code-preview">
            {files.map(({ fileName, content }) => (
              <Fragment key={fileName}>
                <AppBar
                  theme="default"
                  className="demo__code-preview__file-name"
                >
                  <AppBarTitle>{fileName}</AppBarTitle>
                </AppBar>
                <CodeBlock
                  language={fileName.substring(fileName.indexOf(".") + 1)}
                >
                  {content}
                </CodeBlock>
              </Fragment>
            ))}
            <footer className="demo__code-preview__footer">
              <Button
                id={`${demoId}-hide-code`}
                tooltip="Hide the code for this example"
                buttonType="icon"
                theme="clear"
                onClick={() => setCollapsed(true)}
              >
                <CodeSVGIcon />
              </Button>
            </footer>
          </div>
        </Collapse>
      </Portal>
      <AppBarAction
        id={`${demoId}-show-code`}
        first
        tooltip="Show the code for this example"
        onClick={() => setCollapsed(!collapsed)}
        ref={ref}
      >
        <CodeSVGIcon />
      </AppBarAction>
    </Fragment>
  );
};

export default CodePreview;
