import { InlineCode } from "@react-md/code/InlineCode";
import { Divider } from "@react-md/core/divider/Divider";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { Playground } from "./Playground";

export default function App(): ReactElement {
  return (
    <>
      <TextContainer>
        <Typography>
          Edit the <InlineCode>src/Playground.tsx</InlineCode> to preview
          changes.
        </Typography>
      </TextContainer>
      <Divider />
      <Playground />
    </>
  );
}
