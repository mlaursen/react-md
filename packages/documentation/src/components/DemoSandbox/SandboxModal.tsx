import React, { FC, useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { Dialog } from "@react-md/dialog";
import { TreeData } from "@react-md/tree";
import { useAppSize } from "@react-md/utils";

import { toTitle } from "utils/toTitle";

import CodePreview from "./CodePreview";
import SandboxFileTree from "./SandboxFileTree";
import SandboxNavigation from "./SandboxNavigation";
import { FileTreeData } from "./useFiles";

import styles from "./SandboxModal.module.scss";

interface SandboxModalProps {
  pkg: string;
  name: string;
  from: string;
  loading: boolean;
  fileName: string;
  folders: readonly string[];
  sandbox: IFiles | null;
  files: TreeData<FileTreeData>;
  onFileChange: (fileName: string) => void;
  onRequestClose: () => void;
}

const SandboxModal: FC<SandboxModalProps> = ({
  pkg,
  name,
  from,
  fileName,
  sandbox,
  files,
  folders,
  loading,
  onFileChange,
  onRequestClose,
}) => {
  const pkgName = toTitle(pkg, " ", true);
  const title = `react-md - ${pkgName} - ${name} Sandbox`;

  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSize();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const [isTreeVisible, setTreeVisible] = useState(isDesktop);
  const showOrToggleTree = useCallback(() => {
    if (isPhone) {
      setTreeVisible(true);
      return;
    }

    setTreeVisible((prevVisible) => !prevVisible);
  }, [isPhone]);
  const hideTree = useCallback(() => setTreeVisible(false), []);

  useEffect(() => {
    setTreeVisible((prevVisible) => {
      if (isDesktop) {
        return true;
      }

      if (prevVisible && isTablet && isLandscape) {
        return true;
      }

      return false;
    });
  }, [fileName, isPhone, isTablet, isDesktop, isLandscape]);

  return (
    <Dialog
      id="sandbox-modal"
      aria-labelledby="sandbox-modal-title"
      portal={false}
      modal
      type="full-page"
      visible={sandbox !== null}
      onRequestClose={onRequestClose}
      className={styles.dialog}
      disableTransition
    >
      <Head>
        <title>{title}</title>
      </Head>
      <SandboxNavigation
        name={`${pkgName} ${name}`}
        fileName={fileName}
        from={from}
        onRequestFiles={showOrToggleTree}
        onRequestClose={onRequestClose}
      />
      <SandboxFileTree
        from={from}
        files={files}
        folders={folders}
        fileName={fileName}
        inline={inline}
        visible={isTreeVisible}
        hideTree={hideTree}
        onFileChange={onFileChange}
        onRequestClose={onRequestClose}
        disableTransition={inline && isDesktop}
      />
      <CodePreview
        loading={loading}
        fileName={fileName}
        sandbox={sandbox}
        offset={inline && isTreeVisible}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
};

export default SandboxModal;
