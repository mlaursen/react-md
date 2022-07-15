import { Button, FloatingActionButton } from "@react-md/button";
import { box, TextContainer, Typography } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
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
      <Heading>Flat Icon</Heading>
      <Button aria-label="Favorite" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="primary">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="secondary">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="warning">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="error">
        <FavoriteIcon />
      </Button>
      <Heading>Outline Icon</Heading>
      <Button aria-label="Favorite" buttonType="icon" themeType="outline">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="primary"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="secondary"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="warning"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="error"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Heading>Contained Icon</Heading>
      <Button aria-label="Favorite" buttonType="icon" themeType="contained">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="primary"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="secondary"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="warning"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="error"
        themeType="contained"
      >
        <FavoriteIcon />
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
      <div style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            width: 360,
            height: 580,
            margin: "0 auto",
          }}
        >
          <FloatingActionButton
            positionWithin="container"
            position="top-left"
            buttonType="text"
          >
            Top left
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="top-right"
            theme="primary"
            buttonType="text"
          >
            Top right
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-left"
            theme="clear"
            buttonType="text"
          >
            Bottom left
          </FloatingActionButton>
          <FloatingActionButton
            positionWithin="container"
            position="bottom-right"
            buttonType="text"
          >
            Bottom right
          </FloatingActionButton>
        </div>
      </div>
      <Heading>Icon Before</Heading>
      <Button>
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="primary">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="secondary">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="warning">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="error">
        <FavoriteIcon />
        Button
      </Button>
      <Button themeType="outline">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="primary" themeType="outline">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="secondary" themeType="outline">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="warning" themeType="outline">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="error" themeType="outline">
        <FavoriteIcon />
        Button
      </Button>
      <Button themeType="contained">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="primary" themeType="contained">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="secondary" themeType="contained">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="warning" themeType="contained">
        <FavoriteIcon />
        Button
      </Button>
      <Button theme="error" themeType="contained">
        <FavoriteIcon />
        Button
      </Button>
      <Heading>Icon After</Heading>
      <Button>
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error">
        Button
        <FavoriteIcon />
      </Button>
      <Button themeType="outline">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary" themeType="outline">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="outline">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning" themeType="outline">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error" themeType="outline">
        Button
        <FavoriteIcon />
      </Button>
      <Button themeType="contained">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary" themeType="contained">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="contained">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning" themeType="contained">
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error" themeType="contained">
        Button
        <FavoriteIcon />
      </Button>
      <Heading>Icon Before and After</Heading>
      <Button>
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button themeType="outline">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary" themeType="outline">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="outline">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning" themeType="outline">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error" themeType="outline">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button themeType="contained">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="primary" themeType="contained">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="secondary" themeType="contained">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="warning" themeType="contained">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
      <Button theme="error" themeType="contained">
        <FavoriteIcon />
        Button
        <FavoriteIcon />
      </Button>
    </TextContainer>
  );
}
