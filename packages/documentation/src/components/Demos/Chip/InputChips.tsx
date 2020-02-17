import React, { FC, useCallback, useRef, useState } from "react";
import {
  AutoComplete,
  AutoCompleteHandler,
  isResultOf,
} from "@react-md/autocomplete";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Label } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { LazyImage } from "@react-md/media";
import { bem, PositionAnchor, useResizeObserver } from "@react-md/utils";

import people from "constants/people";
import createIdGenerator from "utils/createIdGenerator";

import "./InputChips.scss";

const styles = bem("input-chips");
const guid = createIdGenerator("input-chips-contact");
const anchor: PositionAnchor = {
  x: "inner-left",
  y: "below",
};

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const contacts = Array.from(people, (name, i) => ({
  id: guid(),
  name,
  email: `${name.toLowerCase().replace(/\s|-/g, "")}@email.com`,
  avatar: `https://i.pravatar.cc/40?img=${i}`,
})).reduce<Record<string, Contact>>((lookup, contact) => {
  lookup[contact.id] = contact;
  return lookup;
}, {});

const data = Object.values(contacts).map(({ id, name, email, avatar }) => ({
  id,
  label: name,
  leftAvatar: (
    <Avatar>
      <LazyImage src={avatar} />
    </Avatar>
  ),
  secondaryText: email,
}));

const InputChips: FC = () => {
  const [chips, setChips] = useState<Contact[]>([]);

  const onAutoComplete = useCallback<AutoCompleteHandler>(result => {
    if (!isResultOf<typeof data[0]>(result.result)) {
      throw new Error();
    }
    const { id } = result.result;
    const contact = contacts[id];
    if (!contact) {
      throw new Error();
    }

    setChips(prevChips => [...prevChips, contact]);
  }, []);

  const [stacked, setStacked] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  useResizeObserver({
    target: gridRef.current,
    onResize({ height }) {
      setStacked(height > 48);
    },
    disableWidth: true,
  });

  return (
    <div className={styles()}>
      <Label
        htmlFor="input-chips-email"
        className={styles("label", { chipped: chips.length > 0, stacked })}
      >
        To
      </Label>
      <div className={styles("grid", { stacked })} ref={gridRef}>
        {chips.map(({ id, name, avatar }) => (
          <Chip
            key={id}
            leftIcon={
              <Avatar>
                <LazyImage src={avatar} />
              </Avatar>
            }
            rightIcon={<AddCircleSVGIcon className={styles("remove")} />}
            className={styles("chip")}
            onClick={() =>
              setChips(prevChips => prevChips.filter(chip => chip.id !== id))
            }
          >
            {name}
          </Chip>
        ))}
        <AutoComplete
          id="input-chips-email"
          placeholder="something.@email.com"
          theme="none"
          valueKey="label"
          data={data.filter(({ id }) => !chips.find(chip => chip.id === id))}
          listboxWidth="auto"
          anchor={anchor}
          className={styles("field")}
          inline
          highlight
          clearOnAutoComplete
          onAutoComplete={onAutoComplete}
        />
      </div>
    </div>
  );
};

export default InputChips;
