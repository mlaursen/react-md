import React, { FunctionComponent } from "react";
import CodeSandboxer, {
  CodeSandboxerProps,
  GitInfo,
} from "react-codesandboxer";
import { Button } from "@react-md/button";
import { Omit } from "@react-md/utils";
import GithubSVGIcon from "icons/GithubSVGIcon";
import { Tooltipped } from "@react-md/tooltip";

interface SandboxProps
  extends Omit<CodeSandboxerProps, "gitInfo" | "children"> {
  id: string;
  gitInfo?: GitInfo;
  exampleName: string;
  branch?: string;
}

interface DefaultProps {
  gitInfo: GitInfo;
}

type SandboxWithDefaultProps = SandboxProps & DefaultProps;

const Sandbox: FunctionComponent<SandboxProps> = providedProps => {
  const {
    id,
    exampleName,
    gitInfo,
    branch,
    ...props
  } = providedProps as SandboxWithDefaultProps;
  return (
    <CodeSandboxer {...props} gitInfo={{ ...gitInfo, branch }}>
      {status => {
        console.log("status:", status);
        // console.log("isLoading:", isLoading);
        // console.log("files:", files);
        // console.log("sandboxId:", sandboxId);
        // console.log("sandboxUrl:", sandboxUrl);
        return (
          <Tooltipped
            id={id}
            tooltip="Open this example in an editable codesandbox"
          >
            {({ tooltip, containerProps }) => (
              <Button
                {...containerProps}
                buttonType="icon"
                theme="clear"
                type="submit"
              >
                {tooltip}
                <GithubSVGIcon />
              </Button>
            )}
          </Tooltipped>
        );
      }}
    </CodeSandboxer>
  );
};

const defaultProps: DefaultProps = {
  gitInfo: {
    account: "mlaursen",
    repository: "react-md",
    host: "github",
  },
};

Sandbox.defaultProps = defaultProps;

export default Sandbox;
