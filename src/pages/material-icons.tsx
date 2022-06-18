import { box, Box, Typography } from "@react-md/core";
import type {
  Dispatch,
  ElementType,
  ReactElement,
  SetStateAction,
} from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { TempRadio } from "src/components/TempRadio";
import styles from "./material-icons.module.scss";

type IconType = "filled" | "outlined" | "rounded" | "twotone" | "sharp";
type IconGroup =
  | "all"
  | "action"
  | "alert"
  | "av"
  | "communication"
  | "content"
  | "device"
  | "editor"
  | "file"
  | "hardware"
  | "home"
  | "image"
  | "maps"
  | "navigation"
  | "notification"
  | "places"
  | "social"
  | "toggle";

const ICON_TYPES: readonly IconType[] = [
  "filled",
  "outlined",
  "rounded",
  "twotone",
  "sharp",
];

const ICON_GROUPS: readonly IconGroup[] = [
  "all",
  "action",
  "alert",
  "av",
  "communication",
  "content",
  "device",
  "editor",
  "file",
  "hardware",
  "home",
  "image",
  "maps",
  "navigation",
  "notification",
  "places",
  "social",
  "toggle",
];

const compare = new Intl.Collator("en-US", {
  numeric: true,
  usage: "search",
}).compare;

interface RadioProps<T extends IconType | IconGroup> {
  name: "iconType" | "iconGroup";
  value: T;
  currentValue: T;
  setCurrentValue: Dispatch<SetStateAction<T>>;
}

function Radio<T extends IconType | IconGroup>(
  props: RadioProps<T>
): ReactElement {
  const { name, currentValue, setCurrentValue, value } = props;
  return (
    <TempRadio
      label={value}
      name={name}
      checked={value === currentValue}
      onChange={() => setCurrentValue(value)}
      value={value}
    />
  );
}

type IconReference = [name: string, Component: ElementType];

export default function MaterialIcons(): ReactElement {
  const [search, setSearch] = useState("");
  const [iconType, setIconType] = useState<IconType>("filled");
  const [iconGroup, setIconGroup] = useState<IconGroup>("action");
  const [components, setComponents] = useState<IconReference[]>([]);
  useEffect(() => {
    let cancelled = false;
    const load = async (): Promise<void> => {
      let lookup: Record<string, ElementType> = {};
      const groups = iconGroup === "all" ? ICON_GROUPS : [iconGroup];
      const errors = await Promise.allSettled(
        groups.map(async (group) => {
          if (group === "all") {
            return Promise.resolve({});
          }

          const indexExports = await import(
            `packages/material-icons/src/${iconType}/${group}`
          );
          lookup = { ...lookup, ...indexExports };
        })
      );
      if (process.env.NODE_ENV !== "production") {
        errors.forEach((error) => {
          if (error?.status === "rejected" && error.reason instanceof Error) {
            throw error.reason;
          }
        });
      }

      if (cancelled) {
        return;
      }
      const entries = Object.entries(lookup);
      entries.sort(([aName], [bName]) => compare(aName, bName));

      setComponents(entries);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [iconType, iconGroup]);

  const searchTerm = useDeferredValue(search.toLowerCase());
  const matches = useMemo(() => {
    if (!searchTerm) {
      return components;
    }

    return components.filter(([name]) =>
      name.toLowerCase().includes(searchTerm)
    );
  }, [components, searchTerm]);

  return (
    <>
      <Box>
        {ICON_TYPES.map((value) => (
          <Radio
            key={value}
            name="iconType"
            value={value}
            currentValue={iconType}
            setCurrentValue={setIconType}
          />
        ))}
      </Box>
      <Box>
        {ICON_GROUPS.map((value) => (
          <Radio
            key={value}
            name="iconGroup"
            value={value}
            currentValue={iconGroup}
            setCurrentValue={setIconGroup}
          />
        ))}
      </Box>
      <Box>
        <label>
          Search
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </label>
      </Box>

      <Typography type="subtitle-1" className={box()} margin="none">
        Total Icons {components.length}
      </Typography>
      <Box
        grid
        className={styles.grid}
        justifyContent="start"
        gridAutoType="fill"
      >
        {matches.map(([name, Component]) => (
          <Box
            key={name}
            disablePadding
            justifyContent="center"
            flexDirection="column"
          >
            <Component />
            {name.replace("Icon", "")}
          </Box>
        ))}
      </Box>
    </>
  );
}
