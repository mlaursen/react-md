"use client";
import { Button, Portal, black, useToggle } from "react-md";
import { type ReactElement } from "react";

export default function SimplePortalExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  return (
    <>
      <Button onClick={toggle}>Toggle Portal</Button>
      {toggled && (
        <Portal>
          <span
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              backgroundColor: black,
              padding: "3rem",
              zIndex: 100,
              transform: "translate(-50%, -50%)",
            }}
          >
            This is rendered out of the normal react tree
          </span>
        </Portal>
      )}
    </>
  );
}
