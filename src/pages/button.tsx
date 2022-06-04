import { Button, FloatingActionButton } from "@react-md/button";
import { TextContainer, Typography } from "@react-md/core";
import { SVGIcon } from "@react-md/icon";
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
    <TextContainer style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
            <SVGIcon>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SVGIcon>
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="top-right"
            theme="primary"
          >
            <SVGIcon>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SVGIcon>
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-left"
            theme="clear"
          >
            <SVGIcon>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SVGIcon>
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-right"
          >
            <SVGIcon>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SVGIcon>
          </FloatingActionButton>
        </div>
      </div>
    </TextContainer>
  );
}
