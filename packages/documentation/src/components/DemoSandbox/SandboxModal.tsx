import React, { FC, useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { Dialog } from "@react-md/dialog";
import { bem, useAppSize } from "@react-md/utils";

import { toTitle } from "utils/toTitle";

import "./SandboxModal.scss";
import CodePreview from "./CodePreview";
import SandboxFileTree from "./SandboxFileTree";
import SandboxNavigation from "./SandboxNavigation";

interface SandboxModalProps {
  pkg: string;
  name: string;
  from: string;
  fileName: string;
  sandbox: IFiles | null;
  onFileChange: (fileName: string) => void;
  onRequestClose: () => void;
}

const block = bem("sandbox-modal");

const SandboxModal: FC<SandboxModalProps> = ({
  pkg,
  name,
  from,
  fileName,
  sandbox,
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

    setTreeVisible(prevVisible => !prevVisible);
  }, [isPhone]);
  const hideTree = useCallback(() => setTreeVisible(false), []);

  useEffect(() => {
    setTreeVisible(prevVisible => {
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
      className={block()}
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
        sandbox={sandbox}
        fileName={fileName}
        inline={inline}
        visible={isTreeVisible}
        onFileChange={onFileChange}
        onRequestClose={hideTree}
        disableTransition={inline && isDesktop}
      />
      <CodePreview
        fileName={fileName}
        sandbox={sandbox}
        offset={inline && isTreeVisible}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
};

export default SandboxModal;
