import React from "react";
import { NextFC } from "next";
import { useRouter } from "next/router";
import { Button } from "@react-md/button";

import NotFoundPage from "components/NotFoundPage";
import { CodeBlock } from "components/Code";

export interface ErrorProps {
  statusCode: number | undefined;
  message: string;
}

const Error: NextFC<ErrorProps> = ({ statusCode, message }) => {
  const router = useRouter();
  if (statusCode === 404) {
    return <NotFoundPage />;
  }

  return (
    <>
      {message && <CodeBlock>{message}</CodeBlock>}
      <Button id="return-home" onClick={() => router.replace("/")}>
        Return Home
      </Button>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const { statusCode } = res || err || { statusCode: undefined };

  return { statusCode, message: err?.message || "" };
};

export default Error;
