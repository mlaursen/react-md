import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AutoComplete,
  AutoCompleteHandler,
  AutoCompleteData,
} from "@react-md/autocomplete";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Label } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";

import contacts, { Contact } from "./contacts";
import styles from "./To.module.scss";

const To: FC = () => {
  const [chips, setChips] = useState<Contact[]>([]);
  const data = useMemo<(AutoCompleteData & { label: string })[]>(
    () =>
      contacts
        .filter(({ id }) => !chips.find((chip) => chip.id === id))
        .map(({ name, avatar, email }) => ({
          label: name,
          leftAddon: (
            <Avatar>
              <img src={avatar} alt="" />
            </Avatar>
          ),
          leftAddonType: "avatar",
          secondaryText: email,
        })),
    [chips]
  );

  const onAutoComplete = useCallback<AutoCompleteHandler>(
    (result) => {
      const item = result.result as typeof data[0];
      const contact = contacts.find(({ name }) => item.label === name);
      if (!contact) {
        throw new Error();
      }
      setChips((prevChips) => [...prevChips, contact]);
    },
    [data]
  );

  const emailsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = emailsRef.current;
    if (div) {
      div.scrollLeft = div.scrollWidth;
    }
  }, [chips]);
  return (
    <div className={styles.container}>
      <Label htmlFor="input-chips-email" className={styles.spacing}>
        To
      </Label>
      <div className={styles.emails} ref={emailsRef}>
        {chips.map(({ id, name, avatar }) => (
          <Chip
            key={id}
            leftIcon={
              <Avatar>
                <img src={avatar} alt="" />
              </Avatar>
            }
            rightIcon={<AddCircleSVGIcon className={styles.rotate} />}
            className={styles.spacing}
            onClick={() =>
              setChips((prevChips) =>
                prevChips.filter((chip) => chip.id !== id)
              )
            }
          >
            {name}
          </Chip>
        ))}
        <AutoComplete
          id="input-chips-email"
          placeholder="Email"
          theme="none"
          valueKey="label"
          data={data}
          listboxWidth="auto"
          anchor={BELOW_INNER_LEFT_ANCHOR}
          className={styles.email}
          inline
          highlight
          clearOnAutoComplete
          onAutoComplete={onAutoComplete}
          vhMargin={0}
          vwMargin={0}
          disableSwapping
          listboxClassName={styles.listbox}
        />
      </div>
    </div>
  );
};

export default To;
