import { Button, FloatingActionButton } from "@react-md/button";
import { box, TextContainer, Typography } from "@react-md/core";
import { FavoriteIcon } from "@react-md/material-icons/filled/action";
import type { ReactElement, ReactNode } from "react";

function Heading({
  children,
  first = false,
}: {
  children: ReactNode;
  first?: boolean;
}): ReactElement {
  return (
    <Typography
      type="headline-4"
      style={{ width: "100%" }}
      margin={first ? "none" : "top"}
    >
      {children}
    </Typography>
  );
}

export default function Buttons(): ReactElement {
  return (
    <TextContainer className={box()}>
      <Heading first>Flat</Heading>
      <Button>Button</Button>
      <Button theme="primary">Button</Button>
      <Button theme="secondary">Button</Button>
      <Button theme="warning">Button</Button>
      <Button theme="error">Button</Button>
      <Heading>Outline</Heading>
      <Button themeType="outline">Button</Button>
      <Button theme="primary" themeType="outline">
        Button
      </Button>
      <Button theme="secondary" themeType="outline">
        Button
      </Button>
      <Button theme="warning" themeType="outline">
        Button
      </Button>
      <Button theme="error" themeType="outline">
        Button
      </Button>
      <Heading>Contained</Heading>
      <Button themeType="contained">Button</Button>
      <Button theme="primary" themeType="contained">
        Button
      </Button>
      <Button theme="secondary" themeType="contained">
        Button
      </Button>
      <Button theme="warning" themeType="contained">
        Button
      </Button>
      <Button theme="error" themeType="contained">
        Button
      </Button>
      <Heading>Floating</Heading>
      <div style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            width: 360,
            height: 580,
            margin: "0 auto",
          }}
        >
          <FloatingActionButton positionWithin="container" position="top-left">
            <FavoriteIcon />
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="top-right"
            theme="primary"
          >
            <FavoriteIcon />
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-left"
            theme="clear"
          >
            <FavoriteIcon />
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-right"
          >
            <FavoriteIcon />
          </FloatingActionButton>
        </div>
      </div>
    </TextContainer>
  );
}
