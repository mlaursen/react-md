import { Button } from "@react-md/button";
import { Card, CardContent } from "@react-md/card";
import type { UseStateSetter } from "@react-md/core";
import {
  Box,
  loop,
  SkeletonPlaceholder,
  Slide,
  SlideContainer,
  TextContainer,
  Typography,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Resettable } from "src/components/Resettable";

import styles from "./transition.module.scss";

function Content1(): ReactElement {
  return (
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
      accumsan, mi eget rutrum ornare, turpis lacus congue dolor, vitae rhoncus
      orci augue vitae mauris. Curabitur consequat dui nisi. Vestibulum at arcu
      at leo rhoncus commodo. Sed vel quam non ligula blandit maximus id a nisi.
      In convallis nulla vitae tincidunt vestibulum. Sed tincidunt vestibulum
      elit, eu dapibus velit interdum eu. Nullam scelerisque velit in velit
      commodo, id eleifend urna mollis. Orci varius natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus.
    </Typography>
  );
}

function Content2(): ReactElement {
  return (
    <Typography>
      Duis hendrerit felis ut ante varius, eu faucibus neque maximus.
      Suspendisse nunc nibh, suscipit non molestie vulputate, vestibulum non
      lectus. Proin eget purus sollicitudin nunc tristique semper. Mauris sit
      amet tempus turpis, nec blandit augue. Vestibulum rhoncus dolor vel ex
      laoreet vulputate. In consequat metus id velit ullamcorper, eget tempor
      nisi vestibulum. Curabitur egestas ultricies tincidunt.
    </Typography>
  );
}

function Content3(): ReactElement {
  return (
    <Typography>
      Phasellus et mauris tristique, dictum sapien vel, consectetur enim.
      Maecenas volutpat mi eros, ultrices ultrices est placerat sit amet. Nullam
      rutrum ipsum a nisi maximus ullamcorper ac eu massa. In finibus mauris at
      leo porttitor consectetur. Phasellus quam ex, egestas eu diam non,
      ullamcorper dignissim lorem. Ut cursus nunc nec massa eleifend dignissim.
      Nullam lorem turpis, dapibus sit amet scelerisque id, volutpat et ipsum.
      Nulla tristique, lectus vehicula bibendum auctor, sapien ipsum rutrum
      diam, a tempor quam ligula ac nisi. Nam scelerisque venenatis facilisis.
      Donec congue porttitor felis vel finibus. Donec eget est metus. Donec
      vehicula sem elit, sed pharetra nisl eleifend ac. Vestibulum eget dolor in
      est condimentum consequat.
    </Typography>
  );
}

interface SlideState {
  direction: "left" | "right";
  activeIndex: number;
}

interface SlideControlProps {
  index: number;
  setState: UseStateSetter<SlideState>;
  activeIndex: number;
}

function SlideControl({
  index,
  setState,
  activeIndex,
}: SlideControlProps): ReactElement {
  return (
    <Button
      onClick={() =>
        setState((prev) => ({
          direction: prev.activeIndex < index ? "left" : "right",
          activeIndex: index,
        }))
      }
      themeType="contained"
      theme={index === activeIndex ? "primary" : undefined}
    >
      {`Slide ${index + 1}`}
    </Button>
  );
}

function Skeletons(): ReactElement {
  return (
    <Box stacked align="start">
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
      <SkeletonPlaceholder height="1rem" />
    </Box>
  );
}

function Slides(): ReactElement {
  const [state, setState] = useState<SlideState>({
    direction: "left",
    activeIndex: 0,
  });
  const { direction, activeIndex } = state;
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setState((prev) => {
        const activeIndex = loop({
          min: 0,
          max: 2,
          value: prev.activeIndex,
          increment: true,
        });
        return {
          direction: prev.activeIndex < activeIndex ? "left" : "right",
          activeIndex,
        };
      });
    }, 10000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex]);

  return (
    <TextContainer className={styles.slides}>
      <Card>
        <Box>
          <SlideControl
            index={0}
            activeIndex={activeIndex}
            setState={setState}
          />
          <SlideControl
            index={1}
            activeIndex={activeIndex}
            setState={setState}
          />
          <SlideControl
            index={2}
            activeIndex={activeIndex}
            setState={setState}
          />
        </Box>
        <CardContent>
          <SlideContainer direction={direction}>
            <Slide active={activeIndex === 0} timeout={1000}>
              <Content1 />
            </Slide>
            <Slide active={activeIndex === 1} timeout={1000}>
              <Content2 />
            </Slide>
            <Slide active={activeIndex === 2} timeout={1000}>
              <Content3 />
            </Slide>
          </SlideContainer>
        </CardContent>
      </Card>
    </TextContainer>
  );
}

export default function TransitionPage(): ReactElement {
  return (
    <Resettable>
      <Skeletons />
      <Slides />
    </Resettable>
  );
}
