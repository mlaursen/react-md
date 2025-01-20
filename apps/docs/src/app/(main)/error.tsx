"use client";

import { Button } from "@react-md/core/button/Button";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage(props: ErrorPageProps): ReactElement {
  const { reset } = props;
  // const { error, reset } = props;

  return (
    <TextContainer>
      <Typography type="headline-2">Something went wrong!</Typography>
      <Button onClick={reset}>Try again</Button>
    </TextContainer>
  );
}
