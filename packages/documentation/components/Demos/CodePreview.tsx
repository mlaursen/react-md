import React, {
  FunctionComponent,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { AppBar, AppBarTitle, AppBarAction } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { CodeSVGIcon } from "@react-md/material-icons";
import { Portal } from "@react-md/portal";
import { Collapse } from "@react-md/transition";
import { useToggle } from "@react-md/utils";

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

const ignoredFiles = [
  "package.json",
  "src/styles.scss",
  "src/index.tsx",
  "public/index.html",
  ".env",
];

const CodePreview: FunctionComponent<CodePreviewProps> = ({
  demoId,
  demoTitle,
  getSandbox,
}) => {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const { toggled: collapsed, enable, toggle } = useToggle(true);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const sandbox = await getSandbox();
      const files = Object.keys(sandbox)
        .filter(fileName => !ignoredFiles.includes(fileName))
        .map(fileName => ({
          fileName: fileName
            .substring(fileName.lastIndexOf("/") + 1)
            .replace("Demo", demoTitle.replace(/ /g, "")),
          content: sandbox[fileName].content,
        }));

      if (!cancelled) {
        setFiles(files);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Fragment>
      <Portal intoId={`${demoId}-code-preview`}>
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
                buttonType="icon"
                theme="clear"
                onClick={enable}
              >
                <CodeSVGIcon />
              </Button>
            </footer>
          </div>
        </Collapse>
      </Portal>
      <AppBarAction id={`${demoId}-show-code`} first onClick={toggle} ref={ref}>
        <CodeSVGIcon />
      </AppBarAction>
    </Fragment>
  );
};

export default CodePreview;
