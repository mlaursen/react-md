"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Chip } from "@react-md/core/chip/Chip";
import { FixedDialog } from "@react-md/core/dialog/FixedDialog";
import { DEFAULT_OPTION_UNSELECTED_ICON } from "@react-md/core/form/Option";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import { BELOW_INNER_RIGHT_ANCHOR } from "@react-md/core/positioning/constants";
import { caseInsensitiveSearch } from "@react-md/core/searching/caseInsensitive";
import { contrastColor } from "@react-md/core/theme/utils";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import EditIcon from "@react-md/material-icons/EditIcon";
import SettingsIcon from "@react-md/material-icons/SettingsIcon";
import {
  type KeyboardEvent,
  type ReactElement,
  useId,
  useRef,
  useState,
} from "react";

import { type GithubLabel, githubLabels } from "@/constants/githubLabels.js";

import styles from "./GithubLabelPickerExample.module.scss";

const noop = (): void => {
  // do nothing
};

export default function GithubLabelPickerExample(): ReactElement {
  const {
    toggled: visible,
    enable: show,
    disable: onRequestClose,
  } = useToggle();
  const fixedTo = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [labels, setLabels] = useState<readonly GithubLabel[]>([]);
  const nextValue = useRef(labels);

  // this is only required since the `setVisible` behavior is set to a no-op
  // function to enforce the listbox is always visible
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      onRequestClose();
    }
  };

  return (
    <div className={styles.container}>
      <Button
        ref={fixedTo}
        onClick={show}
        className={styles.button}
        disableRipple
      >
        Labels <SettingsIcon />
      </Button>
      <Box disablePadding>
        {labels.length === 0 && <Typography margin="none">None yet</Typography>}
        {labels.map(({ name, color }) => (
          <Chip
            key={name}
            style={{
              background: color,
              color: contrastColor(color),
            }}
            disableRipple
          >
            {name}
          </Chip>
        ))}
      </Box>
      <FixedDialog
        aria-labelledby={titleId}
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        visible={visible}
        fixedTo={fixedTo}
        onRequestClose={onRequestClose}
        disableTransition
        onKeyDown={handleKeyDown}
        onExited={() => {
          setLabels(nextValue.current);
        }}
        className={styles.dialog}
      >
        <Typography
          id={titleId}
          as="h5"
          type="caption"
          margin="none"
          className={styles.title}
          textColor="text-primary"
        >
          Apply labels to this issue
        </Typography>
        <Autocomplete
          aria-label="Labels"
          theme="outline"
          autoFocus
          placeholder="Filter labels"
          options={githubLabels.toSorted((a, b) => {
            // sort the selected labels first
            let aIndex = labels.indexOf(a);
            if (aIndex === -1) {
              aIndex = labels.length + githubLabels.indexOf(a);
            }

            let bIndex = labels.indexOf(b);
            if (bIndex === -1) {
              bIndex = labels.length + githubLabels.indexOf(a);
            }

            return aIndex - bIndex;
          })}
          defaultValue={labels}
          onValueChange={(value) => {
            nextValue.current = value;
          }}
          className={styles.autocomplete}
          listboxLabel="Labels"
          disableInlineChips
          disableCloseOnSelect
          disableClearButton
          disableDropdownButton
          updateQueryOnSelect="as-is"
          onKeyDown={handleKeyDown}
          filter={(options) => caseInsensitiveSearch(options)}
          listboxProps={{
            disablePortal: true,
            disableElevation: true,
            disableTransition: true,
            disableSelectedIcon: false,
            disableFixedPositioning: true,
            onKeyDown: handleKeyDown,
          }}
          getOptionProps={({ option, selected }) => {
            return {
              height: "auto",
              className: styles.option,
              rightAddon: selected && <CloseIcon />,
              disableRipple: true,
              children: (
                <Box disablePadding>
                  <Avatar style={{ background: option.color }} />
                  {option.name}
                </Box>
              ),
            };
          }}
          visible
          setVisible={noop}
          // this would really be a dynamic creatable thing to match github, but too much for this demo
          noOptionsChildren={<ListSubheader>No labels</ListSubheader>}
        />
        <List>
          <ListItem
            height="auto"
            className={styles.editLabels}
            leftAddon={DEFAULT_OPTION_UNSELECTED_ICON}
            disableLeftAddonSpacing
            disableTextChildren
          >
            <Box disablePadding>
              <EditIcon />
              <span>Edit labels</span>
            </Box>
          </ListItem>
        </List>
      </FixedDialog>
    </div>
  );
}
