import React, { ReactElement, useCallback, useMemo } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useRouter } from "next/router";

import { useJs } from "components/CodePreference";
import NotFoundPage from "components/NotFoundPage";
import { useTheme } from "components/Theme";
import { parseSandbox, SandboxQuery } from "utils/routes";

import SandboxList from "./SandboxList";
import SandboxModal from "./SandboxModal";
import useSandbox from "./useSandbox";
import useFiles from "./useFiles";

interface DemoSandboxProps {
  sandbox: IFiles | null;
}
const EMPTY = {};

export default function DemoSandbox({
  sandbox: defaultSandbox,
}: DemoSandboxProps): ReactElement {
  const router = useRouter();
  const { theme } = useTheme();
  const isJs = useJs();
  const { pkg, name, from, fileName } = parseSandbox(router.query, isJs);
  const { sandbox, loading } = useSandbox(defaultSandbox, {
    js: isJs,
    pkg,
    name,
    theme,
    pathname: router.pathname,
  });
  const files = useFiles(sandbox || EMPTY);
  const folders = useMemo(
    () =>
      Object.values(files).reduce<string[]>(
        (foldersPaths, { itemId }, _i, list) => {
          if (list.find(({ parentId }) => itemId === parentId)) {
            foldersPaths.push(itemId);
          }

          return foldersPaths;
        },
        []
      ),
    [files]
  );

  const onRequestClose = useCallback(() => {
    if (from && from.startsWith("/packages")) {
      router.push(from);
      return;
    }

    router.push(router.pathname);
  }, [from, router]);
  const onFileChange = useCallback(
    (nextFileName: string) => {
      if (nextFileName === fileName || folders.includes(nextFileName)) {
        return;
      }

      const query: SandboxQuery = { pkg, name };
      if (from) {
        query.from = from;
      }

      if (nextFileName !== "src/Demo.tsx") {
        query.fileName = nextFileName;
      }

      router.replace({ pathname: router.pathname, query });
    },
    [folders, router, pkg, name, from, fileName]
  );

  if (!sandbox && !loading && (pkg || name || from)) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "No sandbox found. Run `yarn sandbox` to generate demo sandboxes."
      );
    }

    return <NotFoundPage />;
  }

  return (
    <>
      <SandboxList />
      <SandboxModal
        pkg={pkg}
        name={name}
        fileName={fileName}
        from={from}
        files={files}
        loading={loading}
        folders={folders}
        sandbox={sandbox}
        onFileChange={onFileChange}
        onRequestClose={onRequestClose}
      />
    </>
  );
}
