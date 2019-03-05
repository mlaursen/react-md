import React, { FunctionComponent } from "react";
import { TextContainer } from "@react-md/typography";
import Blockquote from "components/Blockquote";

const LibraryWarning: FunctionComponent = () => (
  <TextContainer className="home__goals">
    <Blockquote>
      Before choosing this library, please note that there is only one active
      developer maintaining it at this time for free in personal time. Updates
      might be a bit slow unless more people start contributing.
    </Blockquote>
  </TextContainer>
);

export default LibraryWarning;
