import { Box, Chip, useToggle } from "@react-md/core";
import CheckCircleIcon from "@react-md/material-icons/CheckCircleIcon";
import type { ReactElement } from "react";

export function SelectableChips(): ReactElement {
  const { toggled: selected, toggle } = useToggle(false);

  return (
    <>
      <Box>
        <Chip selected={selected} onClick={toggle}>
          Default
        </Chip>
        <Chip selected={selected} onClick={toggle} selectedIconAfter>
          Icon After
        </Chip>
        <Chip theme="outline" selected={selected} onClick={toggle}>
          Default
        </Chip>
        <Chip
          theme="outline"
          selected={selected}
          onClick={toggle}
          selectedIconAfter
        >
          Icon After
        </Chip>
        <Chip
          selected={selected}
          onClick={toggle}
          selectedIcon={<CheckCircleIcon />}
        >
          Custom Icon
        </Chip>
        <Chip
          selected={selected}
          onClick={toggle}
          selectedIcon={<CheckCircleIcon />}
          selectedIconAfter
        >
          Custom Icon After
        </Chip>
      </Box>
      <Box>
        <Chip selected={selected} onClick={toggle} disableIconTransition>
          Disable Icon Transition
        </Chip>
        <Chip
          selected={selected}
          onClick={toggle}
          selectedIcon={<CheckCircleIcon />}
          disableIconTransition
        >
          Disable Icon Transition
        </Chip>
      </Box>
      <Box>
        <Chip selected={selected} onClick={toggle} selectedThemed>
          Solid Themed
        </Chip>
        <Chip
          theme="outline"
          selected={selected}
          onClick={toggle}
          selectedThemed
        >
          Outlined Themed
        </Chip>
      </Box>
    </>
  );
}
