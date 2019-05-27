import React, { FC, Fragment, useCallback } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { SingletonRouter, withRouter } from "next/router";

import SandboxList from "./SandboxList";
import SandboxModal from "./SandboxModal";
import useSandbox from "./useSandbox";
import NotFoundPage from "components/NotFoundPage";

interface Query {
  pkg?: string;
  name?: string;
  from?: string;
  fileName?: string;
}

type QueryRecord = Record<string, undefined | string | string[]>;

interface DemoSandboxProps extends Required<Query> {
  sandbox: IFiles | null;
  router: SingletonRouter<Query>;
}

const DemoSandbox: FC<DemoSandboxProps> = ({
  sandbox: defaultSandbox,
  pkg,
  name,
  from,
  fileName,
  router,
}) => {
  const { sandbox, loading } = useSandbox(defaultSandbox, {
    pkg,
    name,
    pathname: router.pathname,
  });

  const onRequestClose = useCallback(() => {
    if (from) {
      router.push(from);
      return;
    }

    router.push(router.pathname);
  }, [from, router]);
  const onFileChange = useCallback(
    (nextFileName: string) => {
      if (nextFileName === fileName) {
        return;
      }

      let fn: string | undefined = nextFileName;
      if (fn === "src/Demo.tsx") {
        fn = undefined;
      }

      const query: QueryRecord = { pkg, name };
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

interface WithRouterProps {
  router: SingletonRouter<Query>;
  sandbox: IFiles | null;
}

const toString = (q: string | string[] | undefined) => {
  if (!q) {
    return "";
  }

  if (Array.isArray(q)) {
    return q[0] || "";
  }

  return q;
};

const WithRouter: FC<WithRouterProps> = ({ router, sandbox }) => {
  const query = router.query || {};
  const pkg = toString(query.pkg);
  const name = toString(query.name);
  const from = toString(query.from);
  const fileName = toString(query.fileName) || "src/Demo.tsx";

  return (
    <DemoSandbox
      pkg={pkg}
      name={name}
      from={from}
      fileName={fileName}
      sandbox={sandbox}
      router={router}
    />
  );
};

export default withRouter(WithRouter);
