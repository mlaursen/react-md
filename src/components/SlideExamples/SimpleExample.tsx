import { Button } from "@react-md/button";
import type { SlideDirection } from "@react-md/core";
import { Box, Slide, SlideContainer } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";
import { ExamplePage1 } from "../ExamplePage1";
import { ExamplePage2 } from "../ExamplePage2";
import { ExamplePage3 } from "../ExamplePage3";

interface State {
  direction: SlideDirection;
  activeIndex: number;
}

export function SimpleExample(): ReactElement {
  const [state, setState] = useState<State>({
    direction: "left",
    activeIndex: 0,
  });
  const { direction, activeIndex } = state;

  const setIndex = (index: number): void => {
    setState((prevState) => ({
      direction: prevState.activeIndex < index ? "left" : "right",
      activeIndex: index,
    }));
  };

  return (
    <>
      <Box>
        <Button onClick={() => setIndex(0)}>Page 1</Button>
        <Button onClick={() => setIndex(1)}>Page 2</Button>
        <Button onClick={() => setIndex(2)}>Page 3</Button>
      </Box>
      <SlideContainer direction={direction} style={{ padding: "2rem 1rem" }}>
        <Slide active={activeIndex === 0}>
          <ExamplePage1 />
        </Slide>
        <Slide active={activeIndex === 1}>
          <ExamplePage2 />
        </Slide>
        <Slide active={activeIndex === 2}>
          <ExamplePage3 />
        </Slide>
      </SlideContainer>
    </>
  );
}
