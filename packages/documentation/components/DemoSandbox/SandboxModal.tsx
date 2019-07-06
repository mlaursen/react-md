import React, { FC, useEffect, useRef } from "react";
import Head from "next/head";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { Dialog } from "@react-md/dialog";
import { bem } from "@react-md/theme";

import { toTitle } from "utils/toTitle";

import "./SandboxModal.scss";
import SandboxNavigation from "./SandboxNavigation";
import CodePreview from "./CodePreview";
import SandboxFileTree from "./SandboxFileTree";
import useAppSizeContext from "components/Layout/useAppSizeContext";
import { useToggle } from "@react-md/utils";

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
  const rendered = useRef(false);
  useEffect(() => {
    rendered.current = true;
  }, []);

  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSizeContext();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const {
    toggled: isTreeVisible,
    disable: hideTree,
    enable: showTree,
    setToggled: setTreeVisible,
  } = useToggle(isDesktop);

  useEffect(() => {
    if (isTreeVisible !== isDesktop) {
      setTreeVisible(isDesktop);
    }
  }, [isDesktop, isTablet, isPhone]);

  useEffect(() => {
    if (isTreeVisible && !isDesktop) {
      setTreeVisible(false);
    }
  }, [isDesktop, fileName]);
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
    >
      <Head>
        <title>{title}</title>
      </Head>
      <SandboxNavigation
        name={`${pkgName} ${name}`}
        fileName={fileName}
        from={from}
        onRequestFiles={showTree}
        onRequestClose={onRequestClose}
      />
      <SandboxFileTree
        sandbox={sandbox}
        fileName={fileName}
        inline={inline}
        visible={isTreeVisible}
        onFileChange={onFileChange}
        onRequestClose={hideTree}
      />
      <CodePreview
        fileName={fileName}
        sandbox={sandbox}
        offset={inline}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
};

export default SandboxModal;
