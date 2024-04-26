"use client";
import { Box } from "@react-md/core/box/Box";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { Slide } from "@react-md/core/transition/Slide";
import {
  SlideContainer,
  type SlideDirection,
} from "@react-md/core/transition/SlideContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

interface State {
  page: 1 | 2 | 3;
  direction: SlideDirection;
}

export default function SimpleExample(): ReactElement {
  const [state, setState] = useState<State>({
    page: 1,
    direction: "left",
  });
  const { page, direction } = state;

  const setPage = (page: 1 | 2 | 3): void => {
    setState((prev) => ({
      page,
      direction: prev.page < page ? "left" : "right",
    }));
  };

  return (
    <Box stacked fullWidth>
      <SegmentedButtonContainer>
        <SegmentedButton selected={page === 1} onClick={() => setPage(1)}>
          Page 1
        </SegmentedButton>
        <SegmentedButton selected={page === 2} onClick={() => setPage(2)}>
          Page 2
        </SegmentedButton>
        <SegmentedButton selected={page === 3} onClick={() => setPage(3)}>
          Page 3
        </SegmentedButton>
      </SegmentedButtonContainer>
      <SlideContainer direction={direction}>
        <Slide active={page === 1}>
          <Typography type="headline-4">Page 1</Typography>
        </Slide>
        <Slide active={page === 2}>
          <Typography type="headline-4">Page 2</Typography>
        </Slide>
        <Slide active={page === 3}>
          <Typography type="headline-4">Page 3</Typography>
        </Slide>
      </SlideContainer>
    </Box>
  );
}
