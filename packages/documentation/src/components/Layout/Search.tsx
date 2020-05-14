import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import {
  AutoComplete,
  AutoCompleteHandler,
  HighlightedResult,
} from "@react-md/autocomplete";
import { SearchSVGIcon } from "@react-md/material-icons";
import { BELOW_INNER_RIGHT_ANCHOR, useToggle } from "@react-md/utils";
import { throttle } from "lodash";

import { RouteMetadata } from "constants/meta/types";

import styles from "./Search.module.scss";
import SearchType from "./SearchType";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<ReadonlyArray<RouteMetadata>>([]);
  const router = useRouter();

  const unmounted = useRef(false);
  const filter = useRef(
    throttle(
      (query: string) => {
        (async function check() {
          const response = await fetch(`/api/search?q=${query}`);
          if (response.ok) {
            const json = await response.json();
            const data = json as ReadonlyArray<RouteMetadata>;
            if (!unmounted.current) {
              setData(data);
            }
          }
        })();
      },
      500,
      { leading: true, trailing: true }
    )
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
    if (!value) {
      setData([]);
      filter.current.cancel();
    } else {
      filter.current(encodeURIComponent(value));
    }
  }, []);

  useEffect(() => {
    unmounted.current = false;

    return () => {
      unmounted.current = true;
    };
  }, []);

  const handleAutoComplete = useCallback<AutoCompleteHandler>(
    (result) => {
      const match = data[result.dataIndex];
      if (match) {
        const { pageUrl, pathname } = match;

        router.push(pageUrl, pathname).then(() => {
          // for some reason, scroll reset does not work for router.push
          if (!pathname.includes("#")) {
            window.scrollTo(0, 0);
          }
        });
        setData([]);
      }
    },
    [data, router]
  );

  const [focused, enable, disable] = useToggle(false);

  return (
    <AutoComplete
      id="main-search"
      filter="none"
      data={data.map(({ title, summary, type }) => ({
        title,
        secondaryText: (
          <HighlightedResult
            enabled
            className={styles.result}
            value={value}
            repeatable={value.length > 2}
          >
            {summary}
          </HighlightedResult>
        ),
        threeLines: true,
        leftAddon: <SearchType type={type} />,
        leftAddonType: "large-media",
        textClassName: styles.option,
      }))}
      labelKey="title"
      valueKey="title"
      onChange={handleChange}
      onFocus={enable}
      onBlur={disable}
      placeholder="Search..."
      dense
      portal
      highlight
      theme="filled"
      className={cn(styles.container, {
        [styles.expanded]: focused,
        // really only transparent on mobile
        [styles.transparent]: !focused,
      })}
      inputClassName={styles.input}
      listboxClassName={styles.listbox}
      clearOnAutoComplete
      listboxWidth="auto"
      leftChildren={<SearchSVGIcon />}
      onAutoComplete={handleAutoComplete}
      anchor={BELOW_INNER_RIGHT_ANCHOR}
    />
  );
};

export default Search;
