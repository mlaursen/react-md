import React, { FC, Fragment, useCallback } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useRouter } from "next/router";

import NotFoundPage from "components/NotFoundPage";
import { parseSandbox, SandboxQuery } from "utils/routes";

import SandboxList from "./SandboxList";
import SandboxModal from "./SandboxModal";
import useSandbox from "./useSandbox";

interface DemoSandboxProps {
  sandbox: IFiles | null;
}

const DemoSandbox: FC<DemoSandboxProps> = ({ sandbox: defaultSandbox }) => {
  const router = useRouter();
  const { pkg, name, from, fileName } = parseSandbox(router.query);
  const { sandbox, loading } = useSandbox(defaultSandbox, {
    pkg,
    name,
    pathname: router.pathname,
  });

  const onRequestClose = useCallback(() => {
    if (from && from.startsWith("/packages")) {
      router.push(from);
      return;
    }

    router.push(router.pathname);
  }, [from, router]);
  const onFileChange = useCallback(
    (nextFileName: string) => {
      if (
        nextFileName === fileName ||
        ["src", "public"].includes(nextFileName)
      ) {
        return;
      }

      let fn: string | undefined = nextFileName;
      if (fn === "src/Demo.tsx") {
        fn = undefined;
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
    [router, pkg, name, from, fileName]
  );

  if (!sandbox && !loading && (pkg || name || from)) {
    return <NotFoundPage />;
  }

  return (
    <Fragment>
      <SandboxList />
      <SandboxModal
        pkg={pkg}
        name={name}
        fileName={fileName}
        from={from}
        sandbox={sandbox}
        onFileChange={onFileChange}
        onRequestClose={onRequestClose}
      />
    </Fragment>
  );
};

export default DemoSandbox;
