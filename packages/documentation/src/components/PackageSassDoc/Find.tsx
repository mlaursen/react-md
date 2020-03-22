import { AutoComplete, FilterFunction } from "@react-md/autocomplete";
import { Button } from "@react-md/button";
import { Dialog } from "@react-md/dialog";
import { SearchSVGIcon } from "@react-md/material-icons";
import {
  caseInsensitiveFilter,
  ABOVE_CENTER_ANCHOR,
  useAppSize,
} from "@react-md/utils";
import Code from "components/Code/Code";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { FormattedSassDocItem, FormattedVariableItem } from "utils/sassdoc";
import getId from "./getId";
import getType from "./getType";
import styles from "./styles";

interface FindProps {
  items: FormattedSassDocItem[];
}

const Find: FC<FindProps> = ({ items }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const searchables = useMemo(
    () =>
      items.map(item => {
        const { name, packageName } = item;
        const type = getType(item.type);
        let secondaryText: ReactNode = item.type;
        if (type === "variable") {
          const { compiled, value } = item as FormattedVariableItem;
          const display = compiled || value;
          if (!/\r?\n/.test(display)) {
            secondaryText = <Code>{display}</Code>;
          }
        }

        return {
          name,
          to: getId(name, type, packageName),
          secondaryText,
        };
      }),
    [items]
  );

  const filter = useCallback<FilterFunction>((query, data, options) => {
    const filtered = caseInsensitiveFilter(query, data, options);
    if (filtered.length) {
      return filtered;
    }

    return ["No matches..."];
  }, []);
  const { isDesktop } = useAppSize();
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <Button
        id="sassdoc-find"
        aria-label="Find in page"
        onClick={() => setVisible(!visible)}
        buttonType="icon"
        theme="secondary"
        themeType="contained"
        className={styles("find-toggle")}
      >
        <SearchSVGIcon />
      </Button>
      <Dialog
        id="sassdoc-autocomplete-dialog"
        aria-label="Search for SassDoc"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        type="custom"
        className={styles("finder")}
      >
        <AutoComplete
          id="sassdoc-autocomplete"
          portal
          data={searchables}
          labelKey="name"
          valueKey="name"
          placeholder="Search..."
          filter={filter}
          listboxClassName={styles("listbox")}
          clearOnAutoComplete
          onAutoComplete={data => {
            const result = data.result as typeof searchables[0];

            // the router.asPath seems to break while hot reloading
            const href = router.asPath.replace(/#.+$/, "");
            router.push(`${href}#${result.to}`);
            setVisible(false);
          }}
          anchor={ABOVE_CENTER_ANCHOR}
          yMargin={12}
          onKeyDown={event => {
            if (event.key === "Tab") {
              event.preventDefault();
            }
          }}
        />
      </Dialog>
    </>
  );
};

export default Find;
