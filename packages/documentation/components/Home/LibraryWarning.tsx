import React, { FunctionComponent } from "react";
import { TextContainer } from "@react-md/typography";
import Blockquote from "components/Blockquote";

const LibraryWarning: FunctionComponent = () => (
  <TextContainer className="home__goals">
    <Blockquote>
      Before choosing this library, please note that there is only one active
      developer maintaining it at this time for free in personal time so updates
      will be much slower than other libraries.
    </Blockquote>
  </TextContainer>
);

export default LibraryWarning;
