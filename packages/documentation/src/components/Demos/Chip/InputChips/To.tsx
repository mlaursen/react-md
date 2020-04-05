import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AutoComplete, AutoCompleteHandler } from "@react-md/autocomplete";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Label } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { LazyImage } from "@react-md/media";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";

import contacts, { Contact } from "./contacts";
import styles from "./styles";

interface ToProps {
  isTouch: boolean;
}

const To: FC<ToProps> = ({ isTouch }) => {
  const [chips, setChips] = useState<Contact[]>([]);
  const data = useMemo(
    () =>
      contacts
        .filter(({ id }) => !chips.find((chip) => chip.id === id))
        .map(({ name, avatar, email }) => ({
          label: name,
          leftAvatar: (
            <Avatar>
              <LazyImage src={avatar} />
            </Avatar>
          ),
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
    <div className={styles("to")}>
      <Label htmlFor="input-chips-email" className={styles("label")}>
        To
      </Label>
      <div className={styles("emails")} ref={emailsRef}>
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
          className={styles("email")}
          inline
          highlight
          clearOnAutoComplete
          onAutoComplete={onAutoComplete}
          vhMargin={0}
          vwMargin={0}
          disableSwapping
          disableHideOnScroll={isTouch}
          disableHideOnResize={isTouch}
          listboxClassName={styles("contacts")}
        />
      </div>
    </div>
  );
};

export default To;
