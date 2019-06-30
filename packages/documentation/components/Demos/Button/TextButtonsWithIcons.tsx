import React, { FC } from "react";
import { Button } from "@react-md/button";
import { FontIcon, TextIconSpacing } from "@react-md/icon";
import {
  ChatSVGIcon,
  DeleteSVGIcon,
  DoneSVGIcon,
  SaveSVGIcon,
} from "@react-md/material-icons";
import Container from "./Container";

const TextButtonsWithIcons: FC = () => (
  <Container>
    <Button id="combined-button-1">
      <TextIconSpacing icon={<FontIcon aria-hidden>favorite</FontIcon>}>
        Favorite
      </TextIconSpacing>
    </Button>
    <Button id="combined-button-2" theme="secondary" themeType="outline">
      <TextIconSpacing icon={<ChatSVGIcon />} iconAfter>
        Messages
      </TextIconSpacing>
    </Button>
    <Button id="combined-button-3" theme="warning" themeType="contained">
      <TextIconSpacing icon={<DoneSVGIcon />}>Done</TextIconSpacing>
    </Button>
    <Button id="combined-button-4" theme="error" themeType="contained">
      <TextIconSpacing icon={<DoneSVGIcon />}>
        <TextIconSpacing icon={<DeleteSVGIcon />} iconAfter>
          Delete Forever
        </TextIconSpacing>
      </TextIconSpacing>
    </Button>
    <Button id="combined-button-5" theme="clear" themeType="outline">
      <TextIconSpacing icon={<SaveSVGIcon />}>Save</TextIconSpacing>
    </Button>
    <Button id="combined-button-6" theme="error" themeType="outline" disabled>
      <TextIconSpacing icon={<SaveSVGIcon />}>Save</TextIconSpacing>
    </Button>
  </Container>
);

export default TextButtonsWithIcons;
