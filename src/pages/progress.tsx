import { Button } from "@react-md/button";
import { TextContainer } from "@react-md/core";
import { CircularProgress } from "@react-md/progress";
import type { ReactElement } from "react";

export default function Progress(): ReactElement {
  return (
    <TextContainer>
      <Button theme="disabled">
        <CircularProgress />
        Button
        <CircularProgress />
      </Button>
    </TextContainer>
  );
}
