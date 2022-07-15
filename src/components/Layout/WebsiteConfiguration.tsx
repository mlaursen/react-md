import { Button } from "@react-md/button";
import { useColorScheme, useDir } from "@react-md/core";
import { DialogContent, DialogHeader, DialogTitle } from "@react-md/dialog";
import type { ReactElement } from "react";

export function WebsiteConfiguration(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <>
      <DialogHeader>
        <DialogTitle type="headline-5">Configuration</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Button aria-pressed={dir === "rtl"} onClick={toggleDir}>
          {dir}
        </Button>
        <Button
          onClick={() => {
            setColorSchemeMode((mode) => {
              if (mode === "dark") {
                return "system";
              }
              if (mode === "system") {
                return "light";
              }

              return "dark";
            });
          }}
        >
          {colorSchemeMode}
        </Button>
      </DialogContent>
    </>
  );
}
