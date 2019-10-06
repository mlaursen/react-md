import React, { FC, Fragment, useCallback, useState } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import sandboxJSON from "constants/sandboxes/Tree-FileTreeExample.json";
import SandboxFileTree from "components/DemoSandbox/SandboxFileTree";
import CodePreview from "components/DemoSandbox/CodePreview";
import useAppSizeContext from "components/Layout/useAppSizeContext";
import SandboxModal from "components/DemoSandbox/SandboxModal";

const sandbox = sandboxJSON as IFiles;

const FileTreeExample: FC = () => {
  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSizeContext();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const isTreeVisible = true;

  const [fileName, setFileName] = useState("src/Demo.tsx");
  const onFileChange = useCallback(() => {}, []);
  const hideTree = useCallback(() => {}, []);
  const onRequestClose = useCallback(() => {}, []);
  return (
    <SandboxModal
      pkg="tree"
      name="File Tree Example"
      from=""
      sandbox={sandbox}
      onFileChange={onFileChange}
      onRequestClose={onRequestClose}
    />
  );
};

export default FileTreeExample;
